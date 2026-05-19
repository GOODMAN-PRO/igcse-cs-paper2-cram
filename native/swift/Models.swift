//
//  Models.swift
//  Codable types for the data files (oeq.json, quiz.json, traces.json, q15.json).
//  Used in Phase 2 when you rewrite individual screens natively.
//

import Foundation

// MARK: - Open-Ended Question
struct OEQ: Codable, Identifiable {
    var id: String { topic + "-" + String(q.hashValue) }
    let q: String
    let marks: Int
    let topic: String
    let difficulty: String
    let model: String
    let points: [String]
}

// MARK: - Quiz MCQ
struct QuizQuestion: Codable, Identifiable {
    var id: String { String(q.hashValue) }
    let q: String
    let a: [String]
    let correct: Int
    let topic: String
    let difficulty: String
    let explain: String
}

// MARK: - Trace Table Problem
struct TraceProblem: Codable, Identifiable {
    var id: String { title }
    let title: String
    let desc: String
    let cols: [String]
    let rows: [[String]]      // each row is a list of expected cell values; '' = don't grade
    let topic: String
    let difficulty: String
}

// MARK: - 15-Mark Programming Question
struct ProgrammingQuestion: Codable, Identifiable {
    var id: String { title }
    let title: String
    let marks: Int
    let topic: String
    let text: String   // HTML
    let py: String
    let pseudo: String // HTML with syntax-highlight spans
    let marking: [MarkingItem]

    struct MarkingItem: Codable {
        let criterion: String
        let marks: Int

        // The JSON is an array like ["Array declared", 1]; this custom decoder handles it
        init(from decoder: Decoder) throws {
            var container = try decoder.unkeyedContainer()
            self.criterion = try container.decode(String.self)
            self.marks = try container.decode(Int.self)
        }
        func encode(to encoder: Encoder) throws {
            var container = encoder.unkeyedContainer()
            try container.encode(criterion)
            try container.encode(marks)
        }
    }
}

// MARK: - Convenience loaders
enum DataLoader {
    static func load<T: Decodable>(_ resource: String, as type: T.Type) -> T? {
        guard let url = Bundle.main.url(forResource: resource, withExtension: "json") else {
            print("Missing bundle resource: \(resource).json")
            return nil
        }
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            print("Decode error for \(resource).json: \(error)")
            return nil
        }
    }

    static func oeq() -> [OEQ] { load("oeq", as: [OEQ].self) ?? [] }
    static func quiz() -> [QuizQuestion] { load("quiz", as: [QuizQuestion].self) ?? [] }
    static func traces() -> [TraceProblem] { load("traces", as: [TraceProblem].self) ?? [] }
    static func programmingQuestions() -> [ProgrammingQuestion] { load("q15", as: [ProgrammingQuestion].self) ?? [] }
}
