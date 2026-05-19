# Native (Mac / iPad / iPhone)

This folder is the **handoff package** for building native Apple apps from the web app in the parent directory.

## Start here

📄 **[HANDOFF.md](./HANDOFF.md)** — full plan, architecture decisions, App Store prep

## Starter Swift files

In `swift/` — drop into a new multi-platform Xcode project:

- `IGCSECramApp.swift` — `@main` app entry
- `ContentView.swift` — root view with WebView
- `WebView.swift` — multi-platform `WKWebView` wrapper
- `ClaudeClient.swift` — native streaming Claude API client (Phase 2)
- `KeychainStore.swift` — secure API key storage
- `Models.swift` — `Codable` types for the bundled data

## Quick start

1. On Mac, clone the repo:
   ```bash
   git clone https://github.com/GOODMAN-PRO/igcse-cs-paper2-cram.git
   cd igcse-cs-paper2-cram
   ```
2. Open Xcode → New Project → **Multiplatform App** → name `IGCSECram` → save inside `native/`
3. Drop the contents of `swift/` into the new project, replacing the auto-generated files
4. Drag `../index.html` and `../parts/` into the project as **folder references** (blue folder icon, not yellow)
5. Cmd-R on the Mac target → app should launch

Full Phase 2 native rewrite plan, Claude integration patterns, and App Store prep are in `HANDOFF.md`.
