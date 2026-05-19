//
//  ClaudeClient.swift
//  Native async/await streaming Claude API client.
//  For Phase 2 — when you rewrite the tutor and OEQ marking natively.
//
//  Auth: API key from KeychainStore. (No browser-direct header needed —
//        native clients call api.anthropic.com straight.)
//

import Foundation

@MainActor
final class ClaudeClient: ObservableObject {
    @Published var hasKey: Bool = false
    @Published var lastError: String?

    private let model = "claude-haiku-4-5-20251001"
    private let endpoint = URL(string: "https://api.anthropic.com/v1/messages")!
    private let systemPrompt = """
    You are an expert tutor for Cambridge IGCSE Computer Science 0478/0984 Paper 2 (2026 syllabus). \
    The student has the exam tomorrow. Be concise, exam-focused.

    Pseudocode: Cambridge style — ← for assignment, UPPERCASE keywords, 1-indexed arrays, \
    LENGTH/UCASE/LCASE/SUBSTRING(s,start,length), MOD/DIV.

    Python: input() returns string, cast it; lists 0-indexed; range(a,b) excludes b.

    SQL: SELECT/FROM/WHERE/ORDER BY/GROUP BY, aggregates SUM/COUNT/AVG/MIN/MAX, LIKE % and _.

    Format: markdown. **Bold** key terms, ## headings, - lists, code in ```. For practice \
    questions include mark breakdown like [2 marks: validation, 2 marks: loop, 1 mark: output].
    """

    init() {
        self.hasKey = KeychainStore.shared.load(key: "claudeApiKey") != nil
    }

    func setKey(_ key: String) {
        let trimmed = key.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.hasPrefix("sk-ant-") else {
            lastError = "Key must start with sk-ant-"
            return
        }
        KeychainStore.shared.save(key: "claudeApiKey", value: trimmed)
        hasKey = true
        lastError = nil
    }

    func clearKey() {
        KeychainStore.shared.delete(key: "claudeApiKey")
        hasKey = false
    }

    // MARK: - Streaming chat
    struct ChatMessage: Codable {
        let role: String   // "user" | "assistant"
        let content: String
    }

    /// Async sequence of text deltas. Throws on network/auth errors.
    func streamChat(prompt: String, history: [ChatMessage] = []) -> AsyncThrowingStream<String, Error> {
        AsyncThrowingStream { continuation in
            Task {
                do {
                    guard let key = KeychainStore.shared.load(key: "claudeApiKey") else {
                        throw ClaudeError.noKey
                    }

                    let messages = history + [ChatMessage(role: "user", content: prompt)]
                    let body: [String: Any] = [
                        "model": model,
                        "max_tokens": 1500,
                        "stream": true,
                        "system": systemPrompt,
                        "messages": messages.map { ["role": $0.role, "content": $0.content] }
                    ]

                    var request = URLRequest(url: endpoint)
                    request.httpMethod = "POST"
                    request.setValue(key, forHTTPHeaderField: "x-api-key")
                    request.setValue("2023-06-01", forHTTPHeaderField: "anthropic-version")
                    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                    request.httpBody = try JSONSerialization.data(withJSONObject: body)

                    let (bytes, response) = try await URLSession.shared.bytes(for: request)
                    guard let http = response as? HTTPURLResponse else {
                        throw ClaudeError.badResponse
                    }
                    guard 200..<300 ~= http.statusCode else {
                        // Read body for error details
                        var errBody = ""
                        for try await line in bytes.lines { errBody += line + "\n" }
                        throw ClaudeError.http(http.statusCode, errBody)
                    }

                    for try await line in bytes.lines {
                        guard line.hasPrefix("data: ") else { continue }
                        let payload = String(line.dropFirst(6))
                        if payload == "[DONE]" { continue }
                        guard let data = payload.data(using: .utf8),
                              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
                        else { continue }

                        if let type = json["type"] as? String, type == "content_block_delta",
                           let delta = json["delta"] as? [String: Any],
                           let dtype = delta["type"] as? String, dtype == "text_delta",
                           let text = delta["text"] as? String {
                            continuation.yield(text)
                        }
                        if let type = json["type"] as? String, type == "message_stop" {
                            continuation.finish()
                            return
                        }
                    }
                    continuation.finish()
                } catch {
                    continuation.finish(throwing: error)
                }
            }
        }
    }

    enum ClaudeError: LocalizedError {
        case noKey
        case badResponse
        case http(Int, String)
        var errorDescription: String? {
            switch self {
            case .noKey: return "No Claude API key set. Tap Connect Claude in Settings."
            case .badResponse: return "Unexpected response from Anthropic."
            case .http(let code, let body):
                switch code {
                case 401: return "Invalid API key."
                case 429: return "Rate limited — wait a moment and try again."
                case 400: return "Bad request: \(body.prefix(200))"
                default:  return "HTTP \(code): \(body.prefix(200))"
                }
            }
        }
    }
}
