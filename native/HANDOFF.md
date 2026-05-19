# Handoff: IGCSE CS Paper 2 → Native Apple Apps

Target: ship **macOS + iPadOS + iPhone** apps from the existing web app.
Source: [github.com/GOODMAN-PRO/igcse-cs-paper2-cram](https://github.com/GOODMAN-PRO/igcse-cs-paper2-cram)

---

## TL;DR

The fastest path is a **multi-platform SwiftUI app** with a `WKWebView` that loads the bundled `index.html` from the app bundle. Single codebase covers macOS / iPadOS / iOS. You can be on TestFlight in a day. Phase 2 is rewriting screens natively for App-Store-quality polish.

This folder (`native/swift/`) contains all the Swift source files you need. Drop them into a new Xcode project (instructions below) and you have a working app.

---

## What's in the web app (feature inventory)

| Feature | Implementation | Native fit |
|---|---|---|
| Content reference (lifecycle, pseudocode, flowcharts, SQL, etc.) | Static HTML sections | Keep web for Phase 1; later → SwiftUI views with `AttributedString` |
| Trace tables (10 interactive problems) | JS + `contenteditable` cells | Keep web Phase 1; later → SwiftUI `TextField` grid |
| 15-mark questions (15 full programming tasks) | JS-rendered from `Q15` data | Could be native list + detail; markdown rendering |
| Quiz (30 random from 100 MCQ bank) | JS shuffled, scored | Easy native rewrite |
| Open-ended questions (50 with AI marking) | JS + `<textarea>` + Claude call | Native rewrite is high-value here |
| AI tutor (chat) | Claude streaming via SSE | Native: `URLSession.bytes` for streaming |
| Python lab (Pyodide ~10MB) | Web only | **Drop on native** — link out to web; or use embedded Python |
| Flowcharts (Mermaid SVG) | Web only | Pre-render to SVG/PNG → bundle as image assets |
| Progress tracking | `localStorage` | `UserDefaults` or `@AppStorage` |
| Claude integration | Direct browser fetch + local Node bridge | Native: direct API call from app; macOS could re-implement Claude Code OAuth |

Data assets (already shaped as JSON-like JS objects, easy to convert):

| Data | Count | Path in web app |
|---|---|---|
| Trace problems | 10 | `parts/traces.js` (`window.TRACE_PROBLEMS`) |
| 15-mark questions | 15 | `parts/q15.js` (`window.Q15`) |
| Quiz MCQs | 100 | `parts/quiz.js` (`window.QUIZ_BANK`) |
| Open-ended questions | 50 | `parts/oeq.js` (`window.OEQ_BANK`) |

These need to be converted to `.json` files for native consumption (see "Data extraction" below).

---

## Recommended phasing

### Phase 1 — WKWebView wrapper (estimate: 1 day)

- Native Xcode project, multi-platform target (iOS / iPadOS / macOS)
- `WKWebView` loads `Bundle.main.url(forResource: "index", withExtension: "html")`
- All existing web features work as-is
- Add a native top toolbar with title and "Connect Claude" button (already in the web header — keep it)
- Add native splash screen and app icon
- **Ship to TestFlight**

### Phase 2 — Native screens for top-3 use cases (estimate: 1–2 weeks)

Rewrite these screens natively, keep the rest in WebView:

1. **Quiz** — native SwiftUI list, smooth swipe-through, haptics on grade
2. **Open-ended questions** — native textareas, native Claude streaming chat, save/restore answer state via `@AppStorage`
3. **AI tutor** — native chat UI, markdown rendering (`AttributedString` from markdown)

### Phase 3 — App-Store-grade polish (estimate: ongoing)

- Apple Pencil support for trace tables (PencilKit overlay)
- Widgets: "Question of the day", progress streak
- iCloud sync of progress + answers across devices
- Notifications: "exam in 3 days, recommended topics: X, Y"
- Haptics, sound, Live Activities
- macOS menu bar item

---

## Phase 1: setting up the Xcode project

### 1. Create the Xcode project

1. Xcode → File → New → Project
2. **Multiplatform → App**
3. Name: `IGCSECram` (or your branded name)
4. Interface: **SwiftUI**
5. Language: **Swift**
6. Bundle ID: `com.yourname.igcsecram`
7. Save it inside the repo at `native/IGCSECram/`

### 2. Add the web bundle

Copy the existing web app into the Xcode bundle:

1. Right-click project → **Add Files to "IGCSECram"**
2. Select `../../index.html` (and the entire repo root)
3. **Important**: Choose "**Create folder references**" (NOT "Create groups") so Xcode preserves the folder structure for `WKWebView` to navigate
4. Check both iOS and macOS targets
5. Click Add

Now `index.html` will be available at `Bundle.main.url(forResource: "index", withExtension: "html")`.

### 3. Replace generated `ContentView.swift` and `*App.swift`

Use the files in `native/swift/`. Drop these in:

- `IGCSECramApp.swift` — replace the generated `@main` app
- `ContentView.swift` — replace the generated content view
- `WebView.swift` — `WKWebView` representable
- `ClaudeClient.swift` — native API client (if doing Phase 2 Claude integration)
- `KeychainStore.swift` — secure API key storage

### 4. Info.plist requirements

In your target's **Info** tab, add:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <false/>
  <key>NSAllowsLocalNetworking</key>
  <true/>
</dict>
```

For the WebView's localStorage to persist, no extra config needed — `WKWebView` persists by default.

For the WebView to call `api.anthropic.com` directly (Phase 1), no ATS exception needed — Anthropic uses TLS.

### 5. App Sandbox (macOS)

In **Signing & Capabilities** → **App Sandbox**:

- ✅ Outgoing Connections (Client) — required for Claude API
- ❌ Incoming Connections (Server) — not needed unless you embed the local bridge (advanced)
- ✅ User Selected File (Read/Write) — only if you let users save trace tables to disk

### 6. Build & run

- macOS: target → "My Mac" → Cmd-R
- iPad: target → iPad Pro simulator → Cmd-R
- iPhone: target → iPhone 16 Pro simulator → Cmd-R

You should see the cram app load in the WebView.

---

## Data extraction (for Phase 2 native rewrites)

To convert the JS data files into Swift-friendly JSON:

```bash
cd /path/to/igcse-cram
node -e "
const TRACES = require('./parts/traces.js'); // adjust to read window.TRACE_PROBLEMS
const fs = require('fs');
fs.writeFileSync('native/data/traces.json', JSON.stringify(window.TRACE_PROBLEMS, null, 2));
// etc for q15, quiz, oeq
"
```

Or easier: open the deployed site, run in console:
```js
copy(JSON.stringify(window.OEQ_BANK, null, 2));
```
Then paste into `native/data/oeq.json`.

Swift `Codable` models for each:

```swift
struct OEQ: Codable, Identifiable {
    let id = UUID()
    let q: String
    let marks: Int
    let topic: String
    let difficulty: String
    let model: String
    let points: [String]

    private enum CodingKeys: String, CodingKey {
        case q, marks, topic, difficulty, model, points
    }
}

struct QuizQuestion: Codable, Identifiable {
    let id = UUID()
    let q: String
    let a: [String]
    let correct: Int
    let topic: String
    let difficulty: String
    let explain: String
}

struct TraceProblem: Codable, Identifiable {
    let id = UUID()
    let title: String
    let desc: String
    let cols: [String]
    let rows: [[String]]
    let topic: String
    let difficulty: String
}

struct ProgrammingQuestion: Codable, Identifiable {
    let id = UUID()
    let title: String
    let marks: Int
    let topic: String
    let text: String
    let py: String
    let pseudo: String
    let marking: [[CodableValue]]  // [String, Int] tuples — needs custom decoding
}
```

Bundle the JSON files into the Xcode target (same flow as adding `index.html`).

Load:

```swift
let url = Bundle.main.url(forResource: "oeq", withExtension: "json")!
let data = try Data(contentsOf: url)
let bank = try JSONDecoder().decode([OEQ].self, from: data)
```

---

## Claude integration on native (Phase 2)

### Option A: API Key (works on all three platforms)

User pastes their Anthropic API key once → stored in **Keychain** → `URLSession` calls `api.anthropic.com` directly with `x-api-key` header.

See `ClaudeClient.swift` for a full streaming implementation. Highlights:

```swift
var request = URLRequest(url: URL(string: "https://api.anthropic.com/v1/messages")!)
request.httpMethod = "POST"
request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
request.setValue("2023-06-01", forHTTPHeaderField: "anthropic-version")
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
// no anthropic-dangerous-direct-browser-access header needed — this is a native client

let body = ["model": "claude-haiku-4-5-20251001",
            "max_tokens": 1500,
            "stream": true,
            "system": systemPrompt,
            "messages": history]
request.httpBody = try JSONSerialization.data(withJSONObject: body)

let (bytes, response) = try await URLSession.shared.bytes(for: request)
for try await line in bytes.lines {
    if line.hasPrefix("data: ") {
        let json = String(line.dropFirst(6))
        // parse SSE event, extract delta.text, append to UI
    }
}
```

Store the API key in Keychain (see `KeychainStore.swift`) — not `UserDefaults`. The user paid for it.

### Option B: Claude Code OAuth (macOS only)

If your Mac users have Claude Code installed and authenticated with Max, you can read their auth token directly:

- Location: `~/.claude/credentials.json` (or via the Claude Code SDK)
- Has `access_token`, `refresh_token`, expiry
- Call API with `Authorization: Bearer <access_token>` instead of `x-api-key`

This is what the local bridge (`server.mjs`) does on the web. You can do the same in Swift on macOS.

```swift
// Pseudocode — actual file format may change between Claude Code versions
let credPath = FileManager.default.homeDirectoryForCurrentUser
    .appendingPathComponent(".claude/credentials.json")
let data = try Data(contentsOf: credPath)
struct ClaudeCreds: Codable { let access_token: String; let expires_at: Double }
let creds = try JSONDecoder().decode(ClaudeCreds.self, from: data)
request.setValue("Bearer \(creds.access_token)", forHTTPHeaderField: "Authorization")
```

NB: Apple's App Sandbox restricts arbitrary file access. To read `~/.claude/`, either:
1. Disable sandbox (App Store won't accept)
2. Use a security-scoped bookmark after user grants permission once
3. Distribute outside the App Store (Developer ID signed `.app`)

For App Store distribution, **stick with API key**. For personal/DTC, OAuth path works.

### Option C: Anthropic's official Swift SDK

Anthropic ships `swift-sdk` on GitHub: [https://github.com/anthropics/anthropic-sdk-swift](https://github.com/anthropics/anthropic-sdk-swift) (as of 2026 there's an official Swift package).

```swift
import Anthropic

let client = AnthropicClient(apiKey: keychainKey)
let stream = client.messages.stream(
    model: "claude-haiku-4-5",
    maxTokens: 1500,
    system: systemPrompt,
    messages: history
)
for try await event in stream {
    if case .contentBlockDelta(let delta) = event {
        // append delta.text to UI
    }
}
```

If the SDK is available, use it. Cleaner than rolling your own.

---

## Replacing web-only components

### Pyodide (Python lab)

- **iOS/iPadOS**: Apple disallows JIT, so Pyodide will work via WKWebView only (no native acceleration). Keep the WKWebView for this screen if you want Python.
- **macOS**: Same options as iOS, OR ship Python.framework as a private framework (~30MB) and run scripts natively.
- **Easier**: Cut Python lab from native version. Link out to the GitHub Pages URL: "Run Python in browser →". Honest, no extra weight.

### Mermaid (flowcharts)

- Run Mermaid once during build → export each diagram as `.svg`
- Bundle SVGs as assets
- In SwiftUI: `Image("flowchart-bubble-sort")` or load SVG via `WebKit` mini-view
- Or: use `Charts.framework` for native diagrams (overkill for fixed flowcharts)

### Tailwind / dark theme

- Native SwiftUI theming via `Color` + `.preferredColorScheme(.dark)`
- All the purple accents map to a custom `Color("AccentPurple")` in Asset catalog
- Match the web color tokens: `#7c3aed` accent, `#0a0a0f` background, `#101018` card

### Markdown rendering

Use `AttributedString(markdown:)`:
```swift
Text(try! AttributedString(markdown: aiResponseMarkdown))
```

Handles **bold**, *italic*, `code`, links automatically. For full styling, parse manually or use [`MarkdownUI`](https://github.com/gonzalezreal/swift-markdown-ui) (third-party SwiftUI library).

---

## Platform-specific UX patterns

### macOS

- `NavigationSplitView` with sidebar (replaces the current web sidebar)
- Keyboard shortcuts: ⌘K to focus search, ⌘1-9 to switch sections, ⌘N for next question
- Toolbar with model picker, Claude connection status, progress
- Window restoration: save last viewed section
- Menu bar item with "Question of the day" for quick access

### iPad (iPadOS)

- Same `NavigationSplitView` (Apple's pattern works for both)
- **Apple Pencil + PencilKit** for trace tables — write in cells like paper
- Drag-drop pseudocode into Python lab to translate
- Split-screen with Safari (claude.ai in the other pane)

### iPhone

- Tab bar at bottom: **Learn / Practice / Quiz / Tutor / Profile**
- Compact card layouts
- Swipe between questions in quiz/OEQ mode
- Bottom sheet for filters
- "Cheat sheet" mode that's printable / share-able

---

## App Store metadata (when ready)

### Name suggestions
- **CramMode** — clean, brandable, expandable beyond IGCSE
- **Paper 2 Tutor** — descriptive, SEO for "IGCSE paper 2"
- **CodeCram** — broader appeal, but less specific
- **Spec ↔ Code** — references the syllabus

### Description (template)
> IGCSE Computer Science Paper 2 revision built by a student who had the exam tomorrow. Full 2026 syllabus coverage: pseudocode, flowcharts, trace tables, search/sort, validation, SQL, Python. 100 quiz questions, 50 AI-marked exam questions, 15 full programming tasks with model answers. Optional Claude AI tutor for live grading.

### Age rating
- 12+ (educational, no objectionable content)
- No data collection if local-only

### Privacy
- **No analytics, no tracking, no accounts**
- Local-only data (UserDefaults + Keychain for API key)
- Anthropic API calls are user-initiated (disclose in privacy policy if using API)

### Screenshots (suggested)
1. Dashboard with progress
2. Pseudocode reference open
3. Trace table mid-fill with one row marked correct
4. AI tutor mid-stream
5. Quiz scored 28/30
6. Open-ended question with AI marking complete (showing Marks: 4/4)

---

## Detailed Phase 2 SwiftUI sketch (for the AI tutor)

```swift
struct TutorView: View {
    @State private var messages: [Message] = []
    @State private var input = ""
    @State private var isStreaming = false
    @StateObject private var claude = ClaudeClient()

    var body: some View {
        VStack(spacing: 0) {
            ScrollViewReader { proxy in
                ScrollView {
                    ForEach(messages) { msg in
                        MessageBubble(message: msg)
                            .id(msg.id)
                    }
                }
                .onChange(of: messages.count) { _, _ in
                    if let last = messages.last {
                        withAnimation { proxy.scrollTo(last.id, anchor: .bottom) }
                    }
                }
            }
            HStack {
                TextField("Ask the tutor...", text: $input)
                    .textFieldStyle(.roundedBorder)
                Button("Send") { Task { await send() } }
                    .disabled(input.isEmpty || isStreaming)
            }
            .padding()
        }
        .navigationTitle("AI Tutor")
    }

    func send() async {
        let userMsg = Message(role: .user, content: input)
        messages.append(userMsg)
        let prompt = input
        input = ""
        isStreaming = true
        defer { isStreaming = false }

        var assistant = Message(role: .assistant, content: "")
        messages.append(assistant)
        let assistantIdx = messages.count - 1

        do {
            for try await chunk in claude.streamChat(prompt: prompt, history: Array(messages.dropLast())) {
                messages[assistantIdx].content += chunk
            }
        } catch {
            messages[assistantIdx].content = "Error: \(error.localizedDescription)"
        }
    }
}

struct Message: Identifiable {
    let id = UUID()
    let role: Role
    var content: String
    enum Role { case user, assistant }
}
```

The `ClaudeClient.streamChat` is in `native/swift/ClaudeClient.swift`.

---

## Files in this handoff

- `HANDOFF.md` — this document
- `swift/IGCSECramApp.swift` — multi-platform `@main` app
- `swift/ContentView.swift` — root view (WKWebView in Phase 1)
- `swift/WebView.swift` — `UIViewRepresentable` / `NSViewRepresentable` wrapper
- `swift/ClaudeClient.swift` — async/await Claude streaming client
- `swift/KeychainStore.swift` — secure API key storage
- `swift/Models.swift` — `Codable` types for the data files

Drop into a new multi-platform SwiftUI Xcode project and you're 80% of the way to Phase 1 ship.

---

## Open questions to clarify before starting

1. **Distribution**: App Store or DTC (Developer ID + notarised)?
2. **Monetisation**: free? IAP for AI tutor? Paid app?
3. **Backend**: local-only forever, or eventually a server (multi-device sync, shared question banks)?
4. **Privacy**: any analytics needed, or pure local-only? (Local-only ships faster, less risk.)
5. **Apple Developer account**: do you have one set up? ($99/year for App Store distribution.)

When you've decided these, the Phase 2 scope crystallises.

---

## Quick start checklist

- [ ] Clone the repo on the Mac: `git clone https://github.com/GOODMAN-PRO/igcse-cs-paper2-cram.git`
- [ ] Open Xcode 15+ (or whatever's current)
- [ ] Create new Multiplatform App project at `native/IGCSECram/`
- [ ] Drop the Swift files from `native/swift/` into the project
- [ ] Add `index.html` and `parts/` to the bundle as folder references
- [ ] Update bundle ID, signing
- [ ] Cmd-R on Mac target → see app
- [ ] Cmd-R on iPad target → see app
- [ ] Cmd-R on iPhone target → see app
- [ ] Connect Apple Developer team → archive → TestFlight
- [ ] Send TestFlight link to a few friends → collect feedback
- [ ] Phase 2 native rewrites

Good luck. The hard part (content) is done. Native is mostly plumbing now.
