//
//  WebView.swift
//  Multi-platform WKWebView wrapper. Loads the bundled index.html and grants
//  it access to relative resources in the same bundle directory.
//

import SwiftUI
import WebKit

#if os(macOS)
typealias PlatformViewRepresentable = NSViewRepresentable
typealias PlatformView = NSView
#else
typealias PlatformViewRepresentable = UIViewRepresentable
typealias PlatformView = UIView
#endif

struct WebView: PlatformViewRepresentable {
    let url: URL
    @Binding var isReady: Bool
    @Binding var loadError: String?

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    // MARK: - macOS path
    #if os(macOS)
    func makeNSView(context: Context) -> WKWebView {
        makeWebView(context: context)
    }
    func updateNSView(_ webView: WKWebView, context: Context) {
        loadIfNeeded(webView)
    }
    #else
    // MARK: - iOS / iPadOS path
    func makeUIView(context: Context) -> WKWebView {
        makeWebView(context: context)
    }
    func updateUIView(_ webView: WKWebView, context: Context) {
        loadIfNeeded(webView)
    }
    #endif

    private func makeWebView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()

        // Allow JavaScript (default true, but explicit is good)
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        config.defaultWebpagePreferences = prefs

        // Persistent data store so localStorage / IndexedDB survive between launches
        config.websiteDataStore = .default()

        // Inline media playback (relevant for any future video)
        #if !os(macOS)
        config.allowsInlineMediaPlayback = true
        #endif

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator

        #if os(macOS)
        webView.setValue(false, forKey: "drawsBackground")  // let our dark bg show through
        #else
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        #endif

        return webView
    }

    private func loadIfNeeded(_ webView: WKWebView) {
        guard webView.url == nil else { return }
        // Grant access to the entire bundle dir so relative paths (parts/, etc.) work
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }

    // MARK: - Coordinator (delegate)
    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
        let parent: WebView
        init(parent: WebView) { self.parent = parent }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            DispatchQueue.main.async { self.parent.isReady = true }
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            DispatchQueue.main.async { self.parent.loadError = error.localizedDescription }
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            DispatchQueue.main.async { self.parent.loadError = error.localizedDescription }
        }

        // Open external links in the OS browser instead of inside the WebView
        func webView(_ webView: WKWebView,
                     decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = navigationAction.request.url,
               navigationAction.navigationType == .linkActivated,
               !url.isFileURL {
                #if os(macOS)
                NSWorkspace.shared.open(url)
                #else
                UIApplication.shared.open(url)
                #endif
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }
    }
}
