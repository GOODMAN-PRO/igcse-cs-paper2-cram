# IGCSE CS Paper 2 — Cram Mode

Single-file revision web app for Cambridge IGCSE Computer Science 0478/0984 Paper 2 (2026 syllabus).

Built the night before the exam. Open `index.html` in any modern browser.

## What's inside

- **Algorithm Design** — Program life cycle, computational thinking, full Cambridge pseudocode reference, flowcharts (10 Mermaid examples), validation, test data, error types
- **Algorithms** — Linear/binary search, bubble sort with full traces, standard methods (totalling, counting, max, min, average)
- **Programming** — Python ↔ pseudocode equivalents, arrays (1D + 2D), procedures vs functions, file handling
- **Databases** — SQL terminology, sample table, 25 worked queries, aggregates, DDL, common mistakes
- **Interactive Trace Tables** — 10 problems, fill cells, click Check to grade
- **15-Mark Programming Questions** — 15 full IGCSE-style tasks with Python + pseudocode solutions + marking schemes (218 marks total)
- **Identify Errors** — 10 buggy snippets with reveals
- **Quiz** — 30 random questions from a 100-question bank, scored
- **Python Lab** — Real Python in your browser via Pyodide (no install)
- **AI Tutor** — Rule-based offline tutor with full topic coverage, plus optional Claude integration

## AI Tutor

Two modes:

1. **Offline** (default) — rule-based pattern matching, covers every Paper 2 topic
2. **Claude-powered** — click **Connect Claude** in the header to use your own Anthropic API key. Keys stored locally in your browser only.

Honest note: Anthropic doesn't currently expose a public OAuth provider for browser apps, so the "Connect Claude" flow uses an API key (with the official browser-direct access header). Get a key from [console.anthropic.com](https://console.anthropic.com). Costs are tiny — Haiku 4.5 runs at ~$1/MTok input, and new accounts get $5 free credit which covers heavy cram sessions.

## Tech

- Pure HTML/CSS/JS — single file, no build step needed to run
- Tailwind CSS via CDN
- Pyodide for Python execution
- Mermaid for flowcharts
- Anthropic API (optional, browser-direct)

## Development

Source pieces are in `parts/`. To rebuild `index.html`:

```powershell
cd parts
# Run the PowerShell build script that substitutes part files into _template.html
```

Each `parts/*.html` is a self-contained section. `parts/*.js` are data modules loaded as window globals.

## Credits

Built by orchestrating 10 specialised AI agents in parallel during a single cram session. Each agent wrote one section (content, data, or integration code), then assembled into a single static HTML file.

## License

MIT — share freely with classmates.
