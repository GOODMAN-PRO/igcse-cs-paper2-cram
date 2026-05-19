/* ============================================================================
 * claude-api.js — Claude-powered AI tutor for IGCSE 0478/0984 Paper 2 (2026)
 * ----------------------------------------------------------------------------
 * Pure browser module. No bundler, no imports. Loaded via <script src=...>.
 * Exposes window.ClaudeAPI with all public functions.
 * ========================================================================== */
(function () {
  'use strict';

  // ===========================================================================
  // CONSTANTS
  // ===========================================================================
  var STORAGE_KEY      = 'cram.claudeKey';
  var STORAGE_TOK_IN   = 'cram.tokensIn';
  var STORAGE_TOK_OUT  = 'cram.tokensOut';
  var STORAGE_CALLS    = 'cram.calls';
  var CACHE_PREFIX     = 'cram.cache.';
  var CACHE_TTL_MS     = 24 * 60 * 60 * 1000; // 24 hours
  var API_URL          = 'https://api.anthropic.com/v1/messages';
  var MODEL            = 'claude-haiku-4-5-20251001';
  var MAX_TOKENS       = 1500;
  var MAX_HISTORY      = 8; // keep last 8 turns

  // ===========================================================================
  // SYSTEM PROMPT — the tutor's personality and knowledge
  // ===========================================================================
  var SYSTEM_PROMPT = [
    "You are an expert tutor for Cambridge IGCSE Computer Science 0478/0984 Paper 2, 2026 syllabus.",
    "",
    "STUDENT CONTEXT: The student has the exam TOMORROW. They need fast, exam-focused answers. Be concise, direct, and friendly. No fluff. No long preambles. Get straight to what they need.",
    "",
    "## PSEUDOCODE STYLE (Cambridge official)",
    "ALWAYS use Cambridge pseudocode conventions:",
    "- Assignment: `←` (e.g. `Count ← 0`)",
    "- UPPERCASE keywords: DECLARE, IF, THEN, ELSE, ENDIF, FOR, TO, NEXT, WHILE, DO, ENDWHILE, REPEAT, UNTIL, CASE, OF, OTHERWISE, ENDCASE, PROCEDURE, ENDPROCEDURE, FUNCTION, RETURNS, RETURN, ENDFUNCTION, OPENFILE, READFILE, WRITEFILE, CLOSEFILE, INPUT, OUTPUT",
    "- Arrays are 1-indexed: `DECLARE Scores : ARRAY[1:30] OF INTEGER`",
    "- String functions: `LENGTH(s)`, `UCASE(s)`, `LCASE(s)`, `SUBSTRING(s, start, length)` (1-indexed start)",
    "- Operators: `MOD` (remainder), `DIV` (integer division), `=` for equality, `<>` for not equal",
    "- Data types: INTEGER, REAL, CHAR, STRING, BOOLEAN",
    "- File modes: OPENFILE \"name.txt\" FOR READ / WRITE / APPEND",
    "",
    "## PYTHON STYLE",
    "- `input()` ALWAYS returns a string — cast with `int()` or `float()` if numeric",
    "- Lists are 0-indexed (warn students of this vs pseudocode 1-indexed)",
    "- `range(a, b)` excludes `b` (i.e. a, a+1, ..., b-1)",
    "- Use `len(x)`, `.upper()`, `.lower()`, `s[start:end]` slicing",
    "- Show idiomatic, clean Python. Use `with open(...)` for file handling.",
    "",
    "## SQL",
    "- SELECT, FROM, WHERE, ORDER BY (ASC/DESC), GROUP BY",
    "- Aggregates: COUNT(*), SUM(col), AVG(col), MIN(col), MAX(col)",
    "- LIKE with `%` (zero or more chars) and `_` (single char)",
    "- Strings in single quotes: `WHERE Name = 'Smith'`",
    "",
    "## SYLLABUS COVERAGE (Paper 2)",
    "Be expert in ALL of these:",
    "- **Program lifecycle**: Analysis → Design → Coding → Testing → Maintenance",
    "- **Design tools**: structure diagrams (top-down decomposition), flowcharts, pseudocode",
    "- **Flowchart symbols**: oval (start/stop), parallelogram (input/output), rectangle (process), diamond (decision)",
    "- **Abstraction**: removing unnecessary detail to focus on essentials",
    "- **Decomposition**: breaking problems into smaller sub-problems",
    "- **Trace tables**: column per variable + output, row per iteration, dry-run code by hand",
    "- **Validation**: range check, length check, type check, presence check, format check, check digit",
    "- **Verification**: double entry, visual check (proofreading)",
    "- **Test data types**: normal (valid typical), boundary (edge of valid range), extreme (largest/smallest valid), erroneous (invalid, must be rejected)",
    "- **Search algorithms**: linear search (sequential, any order), binary search (sorted only, divide and conquer)",
    "- **Sort algorithms**: bubble sort (compare adjacent pairs, swap, repeat until no swaps)",
    "- **Standard methods**: totalling (running sum), counting (counter increment), finding max/min, averaging",
    "- **Arrays**: 1D `ARRAY[1:n]`, 2D `ARRAY[1:rows, 1:cols]`",
    "- **Procedures vs functions**: procedure performs action (no return), function returns a value",
    "- **Parameters**: BYVAL (copy passed in) vs BYREF (reference, can modify caller's variable)",
    "- **File handling**: text files, line-by-line read, EOF check, sequential access",
    "- **Error types**: syntax (code won't run, wrong grammar), logic (runs but wrong output), runtime (crashes during execution e.g. divide by zero)",
    "- **IDE features**: editor, run-time environment, translator, error diagnostics, breakpoints, watch variables, stepping",
    "",
    "## FORMATTING — output as markdown",
    "Your output is rendered as HTML. Use:",
    "- `**bold**` for emphasis on key terms",
    "- `## heading` for major sections",
    "- `- item` for bullet lists",
    "- `1. item` for ordered/numbered steps",
    "- ` ```pseudocode ` or ` ```python ` or ` ```sql ` for code blocks (always specify language)",
    "- `` `inline code` `` for keywords, variable names, single statements",
    "",
    "## BEHAVIORAL RULES",
    "1. **Code requests**: Show pseudocode AND Python side-by-side (two code blocks).",
    "2. **Concept explanations**: 3-5 concise bullets max. No essays.",
    "3. **Marking student answers**: Award marks line-by-line, give total `X/Y marks`, then 1-2 sentences feedback.",
    "4. **Generating practice questions**: ALWAYS include mark breakdown, e.g. `[5 marks: 2 for validation logic, 2 for loop, 1 for output]`. Make them realistic exam-style (1-6 marks typical).",
    "5. **Never invent past papers verbatim**. Generate original, exam-style questions in Cambridge's voice.",
    "6. **Trace tables**: Render as markdown tables with columns for each variable plus an OUTPUT column.",
    "7. **When student is wrong**: gently correct, show the right answer, point to the rule they missed.",
    "8. **Speed matters**: short answers. The exam is tomorrow. Don't waste their time."
  ].join('\n');

  // ===========================================================================
  // API KEY MANAGEMENT
  // ===========================================================================
  function hasKey() {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch (e) { return false; }
  }

  function getKey() {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch (e) { return null; }
  }

  function setKey(k) {
    if (typeof k !== 'string' || !k.startsWith('sk-ant-')) {
      throw new Error('Invalid API key. Anthropic keys start with "sk-ant-".');
    }
    try { localStorage.setItem(STORAGE_KEY, k.trim()); }
    catch (e) { throw new Error('Could not save key to localStorage: ' + e.message); }
  }

  function clearKey() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function maskKey(k) {
    if (!k || k.length < 8) return '••••';
    return '••••••••' + k.slice(-4);
  }

  // ===========================================================================
  // CONNECT MODAL — beautifully designed, dark-theme
  // ===========================================================================
  function openConnectModal() {
    // Remove any existing modal
    var existing = document.getElementById('claude-connect-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'claude-connect-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.style.cssText = [
      'position:fixed','inset:0','z-index:9999',
      'display:flex','align-items:center','justify-content:center',
      'background:rgba(8,10,16,0.72)','backdrop-filter:blur(12px)',
      '-webkit-backdrop-filter:blur(12px)',
      'padding:24px','animation:claudeFadeIn 180ms ease-out'
    ].join(';');

    // Inject keyframes once
    if (!document.getElementById('claude-modal-keyframes')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'claude-modal-keyframes';
      styleEl.textContent =
        '@keyframes claudeFadeIn{from{opacity:0}to{opacity:1}}' +
        '@keyframes claudeSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}' +
        '#claude-connect-modal .modal-card{animation:claudeSlideUp 220ms cubic-bezier(0.22,1,0.36,1)}' +
        '#claude-connect-modal input::placeholder{color:#5f6679}';
      document.head.appendChild(styleEl);
    }

    var connected = hasKey();
    var currentKey = getKey() || '';

    overlay.innerHTML =
      '<div class="card card-accent modal-card" style="max-width:480px;width:100%;padding:28px;border-radius:16px;box-shadow:0 24px 64px rgba(0,0,0,0.4);">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">' +
          '<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#c97559,#8b4a3a);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:18px;">C</div>' +
          '<h2 style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.01em;">Connect Claude</h2>' +
        '</div>' +
        '<p style="margin:14px 0 6px;opacity:0.85;line-height:1.55;font-size:14px;">Power your AI tutor with the real Claude model — more accurate explanations, fresh practice questions, and adaptive feedback tuned to your level.</p>' +
        '<div style="margin:18px 0;padding:14px 16px;background:rgba(201,117,89,0.08);border:1px solid rgba(201,117,89,0.2);border-radius:10px;font-size:13px;line-height:1.55;opacity:0.92;">' +
          '<strong style="color:#e3a78e;">Honest note:</strong> Anthropic doesn\'t offer public OAuth for browser apps yet, so we use API keys. Get one from <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener" style="color:#e3a78e;text-decoration:underline;">console.anthropic.com</a> → API Keys → Create Key → paste below. <strong>Stored locally only</strong>, never sent anywhere except Anthropic.' +
        '</div>' +
        (connected
          ? // ---------- CONNECTED VIEW ----------
            '<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(86,189,128,0.1);border:1px solid rgba(86,189,128,0.25);border-radius:10px;margin-bottom:14px;">' +
              '<div style="width:8px;height:8px;border-radius:50%;background:#56bd80;box-shadow:0 0 8px #56bd80;"></div>' +
              '<div style="flex:1;font-size:14px;"><strong>Connected</strong> · <span style="opacity:0.7;font-family:ui-monospace,monospace;">' + maskKey(currentKey) + '</span></div>' +
            '</div>' +
            '<div style="display:flex;gap:8px;justify-content:flex-end;">' +
              '<button class="btn btn-ghost" id="cc-close">Close</button>' +
              '<button class="btn" id="cc-disconnect" style="background:rgba(220,80,80,0.15);border-color:rgba(220,80,80,0.4);color:#ff8b8b;">Disconnect</button>' +
            '</div>'
          : // ---------- DISCONNECTED VIEW ----------
            '<label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;opacity:0.7;margin-bottom:6px;">API Key</label>' +
            '<div style="position:relative;">' +
              '<input type="password" id="cc-key" placeholder="sk-ant-api03-..." autocomplete="off" spellcheck="false" style="width:100%;padding:11px 44px 11px 13px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:10px;color:inherit;font-family:ui-monospace,SFMono-Regular,monospace;font-size:13px;outline:none;transition:border-color 150ms;box-sizing:border-box;">' +
              '<button type="button" id="cc-toggle" aria-label="Show/hide key" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:transparent;border:0;color:inherit;opacity:0.6;cursor:pointer;padding:6px 8px;font-size:12px;">show</button>' +
            '</div>' +
            '<div id="cc-error" style="color:#ff8b8b;font-size:13px;margin-top:8px;min-height:18px;"></div>' +
            '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">' +
              '<button class="btn btn-ghost" id="cc-cancel">Cancel</button>' +
              '<button class="btn btn-primary" id="cc-connect">Connect</button>' +
            '</div>'
        ) +
      '</div>';

    document.body.appendChild(overlay);

    // ---- Wire up events ----
    function close() { overlay.remove(); }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    });

    if (connected) {
      overlay.querySelector('#cc-close').addEventListener('click', close);
      overlay.querySelector('#cc-disconnect').addEventListener('click', function () {
        clearKey();
        close();
        // Re-open in disconnected state so user can immediately reconnect
        openConnectModal();
      });
    } else {
      var input    = overlay.querySelector('#cc-key');
      var toggle   = overlay.querySelector('#cc-toggle');
      var errorBox = overlay.querySelector('#cc-error');
      var connectBtn = overlay.querySelector('#cc-connect');

      setTimeout(function () { input.focus(); }, 50);

      toggle.addEventListener('click', function () {
        if (input.type === 'password') {
          input.type = 'text';
          toggle.textContent = 'hide';
        } else {
          input.type = 'password';
          toggle.textContent = 'show';
        }
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') connectBtn.click();
      });

      connectBtn.addEventListener('click', function () {
        var val = (input.value || '').trim();
        errorBox.textContent = '';
        if (!val) {
          errorBox.textContent = 'Please paste your API key.';
          return;
        }
        try {
          setKey(val);
          close();
          // Optional: surface a global event so app shell can update its UI
          try { window.dispatchEvent(new CustomEvent('claude:connected')); } catch (e) {}
        } catch (err) {
          errorBox.textContent = err.message;
        }
      });

      overlay.querySelector('#cc-cancel').addEventListener('click', close);
    }
  }

  // ===========================================================================
  // TOKEN TRACKING
  // ===========================================================================
  function getTokenStats() {
    var inT  = parseInt(localStorage.getItem(STORAGE_TOK_IN)  || '0', 10) || 0;
    var outT = parseInt(localStorage.getItem(STORAGE_TOK_OUT) || '0', 10) || 0;
    var calls = parseInt(localStorage.getItem(STORAGE_CALLS)  || '0', 10) || 0;
    return { in: inT, out: outT, calls: calls };
  }

  function bumpTokens(inT, outT) {
    try {
      var cur = getTokenStats();
      localStorage.setItem(STORAGE_TOK_IN,  String(cur.in  + (inT  || 0)));
      localStorage.setItem(STORAGE_TOK_OUT, String(cur.out + (outT || 0)));
      localStorage.setItem(STORAGE_CALLS,   String(cur.calls + 1));
    } catch (e) {}
  }

  function resetTokenStats() {
    try {
      localStorage.removeItem(STORAGE_TOK_IN);
      localStorage.removeItem(STORAGE_TOK_OUT);
      localStorage.removeItem(STORAGE_CALLS);
    } catch (e) {}
  }

  // ===========================================================================
  // CACHE (24h TTL, keyed by hash of (message + last 2 turns))
  // ===========================================================================
  function djb2Hash(str) {
    // Simple, fast 32-bit string hash. Not crypto — just a cache key.
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) + h) + str.charCodeAt(i);
      h = h & 0xffffffff;
    }
    return (h >>> 0).toString(36);
  }

  function cacheKeyFor(userMessage, history) {
    var tail = (history || []).slice(-2)
      .map(function (m) { return m.role + ':' + m.content; })
      .join('|');
    return CACHE_PREFIX + djb2Hash(userMessage + '||' + tail);
  }

  function cacheGet(userMessage, history) {
    try {
      var raw = localStorage.getItem(cacheKeyFor(userMessage, history));
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj.ts || (Date.now() - obj.ts) > CACHE_TTL_MS) {
        localStorage.removeItem(cacheKeyFor(userMessage, history));
        return null;
      }
      return obj;
    } catch (e) { return null; }
  }

  function cacheSet(userMessage, history, text, usage) {
    try {
      localStorage.setItem(
        cacheKeyFor(userMessage, history),
        JSON.stringify({ ts: Date.now(), text: text, usage: usage || {} })
      );
    } catch (e) {
      // Quota exceeded — silently nuke old cache entries and retry once
      clearCache();
      try {
        localStorage.setItem(
          cacheKeyFor(userMessage, history),
          JSON.stringify({ ts: Date.now(), text: text, usage: usage || {} })
        );
      } catch (e2) {}
    }
  }

  function clearCache() {
    try {
      var doomed = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(CACHE_PREFIX) === 0) doomed.push(k);
      }
      doomed.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  function getCacheStats() {
    var count = 0, bytes = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(CACHE_PREFIX) === 0) {
          count++;
          var v = localStorage.getItem(k) || '';
          bytes += k.length + v.length;
        }
      }
    } catch (e) {}
    return { count: count, bytes: bytes };
  }

  // ===========================================================================
  // STREAMING CHAT
  // ===========================================================================
  function chatWithClaude(userMessage, history, callbacks) {
    callbacks = callbacks || {};
    var onStart = callbacks.onStart || function () {};
    var onChunk = callbacks.onChunk || function () {};
    var onDone  = callbacks.onDone  || function () {};
    var onError = callbacks.onError || function () {};

    var key = getKey();
    if (!key) {
      onError('No Claude API key connected. Click "Connect Claude" to add yours.');
      return;
    }
    if (typeof userMessage !== 'string' || !userMessage.trim()) {
      onError('Empty message — please type a question.');
      return;
    }

    // ---- Cache check ----
    var cached = cacheGet(userMessage, history);
    if (cached) {
      onStart({ cached: true });
      // Stream the cached text out in small chunks so UI behaves consistently
      var text = cached.text;
      var idx = 0;
      var step = 24; // chars per tick
      function tick() {
        if (idx >= text.length) {
          onDone(text, cached.usage || {});
          return;
        }
        var slice = text.slice(idx, idx + step);
        idx += step;
        onChunk(slice);
        setTimeout(tick, 8);
      }
      tick();
      return;
    }

    // ---- Build messages array (trim history to last MAX_HISTORY turns) ----
    var trimmedHistory = (history || []).slice(-MAX_HISTORY).map(function (m) {
      return { role: m.role, content: m.content };
    });
    var messages = trimmedHistory.concat([{ role: 'user', content: userMessage }]);

    var body = JSON.stringify({
      model:      MODEL,
      max_tokens: MAX_TOKENS,
      stream:     true,
      system:     SYSTEM_PROMPT,
      messages:   messages
    });

    onStart({ cached: false });

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type': 'application/json'
      },
      body: body
    })
    .then(function (response) {
      if (!response.ok) {
        return response.text().then(function (errBody) {
          var friendly = 'Request failed (HTTP ' + response.status + ').';
          if (response.status === 401) {
            friendly = 'Invalid or expired API key. Reconnect Claude with a fresh key.';
          } else if (response.status === 429) {
            friendly = 'Rate limit hit. Wait a few seconds and try again.';
          } else if (response.status === 400) {
            friendly = 'Bad request — Claude rejected the message format.';
          } else if (response.status >= 500) {
            friendly = 'Anthropic server error — try again in a moment.';
          }
          throw new Error(friendly + ' Details: ' + errBody.slice(0, 400));
        });
      }
      if (!response.body) throw new Error('No response stream from Anthropic.');
      return readSSE(response.body, userMessage, history, onChunk, onDone, onError);
    })
    .catch(function (err) {
      onError(err.message || String(err));
    });
  }

  // Parse Server-Sent Events from the streaming body
  function readSSE(stream, userMessage, history, onChunk, onDone, onError) {
    var reader  = stream.getReader();
    var decoder = new TextDecoder('utf-8');
    var buffer  = '';
    var fullText = '';
    var usage   = { input_tokens: 0, output_tokens: 0 };

    function pump() {
      return reader.read().then(function (result) {
        if (result.done) {
          // End of stream without explicit message_stop — finalize anyway
          finalize();
          return;
        }
        buffer += decoder.decode(result.value, { stream: true });

        // SSE messages separated by blank lines (\n\n)
        var parts = buffer.split('\n\n');
        buffer = parts.pop(); // keep incomplete trailing chunk

        for (var i = 0; i < parts.length; i++) {
          var block = parts[i];
          // each block may have "event: X\ndata: {...}" lines
          var lines = block.split('\n');
          for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            if (line.indexOf('data:') !== 0) continue;
            var jsonStr = line.slice(5).trim();
            if (!jsonStr || jsonStr === '[DONE]') continue;

            try {
              var evt = JSON.parse(jsonStr);
              handleEvent(evt);
            } catch (e) {
              // Malformed JSON — skip silently
            }
          }
        }

        return pump();
      });
    }

    function handleEvent(evt) {
      if (!evt || !evt.type) return;
      switch (evt.type) {
        case 'message_start':
          if (evt.message && evt.message.usage) {
            usage.input_tokens  = evt.message.usage.input_tokens  || 0;
            usage.output_tokens = evt.message.usage.output_tokens || 0;
          }
          break;
        case 'content_block_delta':
          if (evt.delta && evt.delta.type === 'text_delta' && typeof evt.delta.text === 'string') {
            fullText += evt.delta.text;
            try { onChunk(evt.delta.text); } catch (e) {}
          }
          break;
        case 'message_delta':
          if (evt.usage && typeof evt.usage.output_tokens === 'number') {
            usage.output_tokens = evt.usage.output_tokens;
          }
          break;
        case 'message_stop':
          finalize();
          break;
        case 'error':
          var msg = (evt.error && evt.error.message) || 'Stream error from Anthropic.';
          onError(msg);
          break;
      }
    }

    var finalized = false;
    function finalize() {
      if (finalized) return;
      finalized = true;
      bumpTokens(usage.input_tokens, usage.output_tokens);
      if (fullText) cacheSet(userMessage, history, fullText, usage);
      try { onDone(fullText, usage); } catch (e) {}
    }

    return pump().catch(function (err) {
      onError('Stream read failed: ' + (err.message || err));
    });
  }

  // ===========================================================================
  // MARKDOWN → HTML RENDERER
  // ===========================================================================
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMarkdown(md) {
    if (typeof md !== 'string') return '';

    // ---- 1. Extract fenced code blocks first (so their content is untouched) ----
    var codeBlocks = [];
    md = md.replace(/```([a-zA-Z0-9_+\-]*)\n([\s\S]*?)```/g, function (_, lang, code) {
      var idx = codeBlocks.length;
      codeBlocks.push({
        lang: lang || '',
        code: code.replace(/\n$/, '')
      });
      return '\x00CODEBLOCK' + idx + '\x00';
    });

    // ---- 2. Extract inline code (single backticks) ----
    var inlines = [];
    md = md.replace(/`([^`\n]+)`/g, function (_, code) {
      var idx = inlines.length;
      inlines.push(code);
      return '\x00INLINE' + idx + '\x00';
    });

    // ---- 3. Escape remaining HTML in regular text ----
    md = escapeHtml(md);

    // ---- 4. Headings (only ## handled — that's all the prompt uses) ----
    md = md.replace(/^###\s+(.+)$/gm, '<h4>$1</h4>');
    md = md.replace(/^##\s+(.+)$/gm, '<h3>$1</h3>');
    md = md.replace(/^#\s+(.+)$/gm,  '<h3>$1</h3>');

    // ---- 5. Bold and italic ----
    md = md.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    // italic: *text* but not **; and _text_
    md = md.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    md = md.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, '$1<em>$2</em>');

    // ---- 6. Lists ----
    // Group consecutive `- item` or `* item` lines into <ul>
    md = md.replace(/(?:^[ \t]*[-*]\s+.+(?:\n|$))+/gm, function (block) {
      var items = block.trim().split(/\n/).map(function (line) {
        return '<li>' + line.replace(/^[ \t]*[-*]\s+/, '') + '</li>';
      }).join('');
      return '<ul>' + items + '</ul>\n';
    });

    // Group consecutive `1. item` lines into <ol>
    md = md.replace(/(?:^[ \t]*\d+\.\s+.+(?:\n|$))+/gm, function (block) {
      var items = block.trim().split(/\n/).map(function (line) {
        return '<li>' + line.replace(/^[ \t]*\d+\.\s+/, '') + '</li>';
      }).join('');
      return '<ol>' + items + '</ol>\n';
    });

    // ---- 7. Paragraphs and line breaks ----
    // Split on blank lines into paragraphs; within a paragraph, \n → <br>
    var paragraphs = md.split(/\n{2,}/);
    md = paragraphs.map(function (p) {
      p = p.trim();
      if (!p) return '';
      // Don't wrap block-level elements in <p>
      if (/^<(h\d|ul|ol|pre|table|blockquote|hr)/i.test(p) ||
          /^\x00CODEBLOCK\d+\x00$/.test(p)) {
        return p;
      }
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');

    // ---- 8. Restore inline code ----
    md = md.replace(/\x00INLINE(\d+)\x00/g, function (_, idx) {
      return '<code>' + escapeHtml(inlines[parseInt(idx, 10)]) + '</code>';
    });

    // ---- 9. Restore code blocks (with HTML escaping inside) ----
    md = md.replace(/\x00CODEBLOCK(\d+)\x00/g, function (_, idx) {
      var blk = codeBlocks[parseInt(idx, 10)];
      var langClass = blk.lang ? ' class="lang-' + escapeHtml(blk.lang) + '"' : '';
      return '<pre><code' + langClass + '>' + escapeHtml(blk.code) + '</code></pre>';
    });

    return md;
  }

  // ===========================================================================
  // PUBLIC NAMESPACE
  // ===========================================================================
  window.ClaudeAPI = {
    // Key management
    hasKey:           hasKey,
    getKey:           getKey,
    setKey:           setKey,
    clearKey:         clearKey,
    openConnectModal: openConnectModal,
    // Chat
    chatWithClaude:   chatWithClaude,
    // Rendering
    renderMarkdown:   renderMarkdown,
    // Stats
    getTokenStats:    getTokenStats,
    resetTokenStats:  resetTokenStats,
    // Cache
    clearCache:       clearCache,
    getCacheStats:    getCacheStats,
    // Exposed for debugging / inspection only
    _SYSTEM_PROMPT:   SYSTEM_PROMPT,
    _MODEL:           MODEL
  };
})();
