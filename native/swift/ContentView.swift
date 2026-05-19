//
//  ContentView.swift
//  Phase 1: WKWebView wrapper loading the bundled index.html
//
//  When you go Phase 2, replace specific tabs/sections with native SwiftUI views
//  and keep the WebView for the rest.
//

import SwiftUI

struct ContentView: View {
    @State private var isReady = false
    @State private var loadError: String?

    var body: some View {
        ZStack {
            Color(red: 0.027, green: 0.027, blue: 0.043)  // #07070b
                .ignoresSafeArea()

            if let err = loadError {
                VStack(spacing: 16) {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.system(size: 48))
                        .foregroundStyle(.red)
                    Text("Couldn't load the app bundle")
                        .font(.headline)
                    Text(err)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                    Button("Open Web Version") {
                        if let url = URL(string: "https://goodman-pro.github.io/igcse-cs-paper2-cram/") {
                            #if os(macOS)
                            NSWorkspace.shared.open(url)
                            #else
                            UIApplication.shared.open(url)
                            #endif
                        }
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()
            } else if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
                WebView(url: url, isReady: $isReady, loadError: $loadError)
                    .ignoresSafeArea(edges: [.bottom])

                if !isReady {
                    VStack(spacing: 12) {
                        ProgressView()
                            .scaleEffect(1.3)
                        Text("Loading cram mode…")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            } else {
                Text("index.html not found in bundle — check folder references in Xcode target.")
                    .foregroundStyle(.red)
                    .padding()
            }
        }
    }
}

#Preview {
    ContentView()
}
