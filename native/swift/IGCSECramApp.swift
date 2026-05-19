//
//  IGCSECramApp.swift
//  IGCSECram — multi-platform app entry point
//
//  Works on macOS, iPadOS, iOS from a single target.
//

import SwiftUI

@main
struct IGCSECramApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.dark)  // matches the web app's dark theme
                #if os(macOS)
                .frame(minWidth: 900, minHeight: 600)
                #endif
        }
        #if os(macOS)
        .windowStyle(.titleBar)
        .commands {
            // Custom menu commands for macOS
            CommandGroup(replacing: .newItem) {
                Button("New Question") {
                    // Hook this up to a notification or @Environment to trigger
                }
                .keyboardShortcut("n", modifiers: .command)
            }
            CommandGroup(after: .help) {
                Link("GitHub Repo",
                     destination: URL(string: "https://github.com/GOODMAN-PRO/igcse-cs-paper2-cram")!)
                Link("Live Web App",
                     destination: URL(string: "https://goodman-pro.github.io/igcse-cs-paper2-cram/")!)
            }
        }
        #endif
    }
}
