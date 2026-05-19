/* ===========================================================================
 * IGCSE CS Paper 2 Cram — Main Orchestrator
 * ========================================================================= */

// ===========================================================================
// NAVIGATION
// ===========================================================================
const NAV_STRUCTURE = [
  { cat: 'Start', items: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'checklist', label: 'Last-Minute Checklist' },
    { id: 'cheat', label: 'Cheat Sheet' },
  ]},
  { cat: 'Algorithm Design', items: [
    { id: 'lifecycle', label: 'Program Life Cycle' },
    { id: 'ct', label: 'Computational Thinking' },
    { id: 'pseudocode', label: 'Pseudocode Reference' },
    { id: 'flowcharts', label: 'Flowcharts' },
    { id: 'trace', label: 'Trace Tables' },
    { id: 'validation', label: 'Validation & Verification' },
    { id: 'testing', label: 'Testing & Test Data' },
    { id: 'search', label: 'Searching' },
    { id: 'sort', label: 'Sorting (Bubble)' },
    { id: 'methods', label: 'Standard Methods' },
  ]},
  { cat: 'Programming', items: [
    { id: 'python', label: 'Python Equivalents' },
    { id: 'arrays', label: 'Arrays / Lists' },
    { id: 'funcs', label: 'Procedures & Functions' },
    { id: 'files', label: 'File Handling' },
  ]},
  { cat: 'Databases', items: [
    { id: 'sql', label: 'SQL & Tables' },
  ]},
  { cat: 'Practice & AI', items: [
    { id: 'q15', label: '15-mark Questions' },
    { id: 'errors', label: 'Identify Errors' },
    { id: 'quiz', label: 'Quiz (30 random)' },
    { id: 'pylab', label: 'Python Lab' },
    { id: 'tutor', label: 'AI Tutor (Claude)' },
    { id: 'mistakes', label: 'Common Mistakes' },
  ]},
];

const viewed = new Set(JSON.parse(localStorage.getItem('cram.viewed') || '[]'));
const allIds = NAV_STRUCTURE.flatMap(c => c.items.map(i => i.id));

function buildNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  nav.innerHTML = '';
  for (const cat of NAV_STRUCTURE) {
    const h = document.createElement('div');
    h.className = 'nav-cat';
    h.textContent = cat.cat;
    nav.appendChild(h);
    for (const it of cat.items) {
      const d = document.createElement('div');
      d.className = 'nav-item';
      d.id = 'nav-' + it.id;
      d.onclick = () => showSection(it.id);
      d.innerHTML = `<span class="heat ${viewed.has(it.id) ? 'h3' : 'h0'}"></span>${it.label}`;
      nav.appendChild(d);
    }
  }
  updateProgress();
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  const nav = document.getElementById('nav-' + id);
  if (sec) sec.classList.add('active');
  if (nav) nav.classList.add('active');
  viewed.add(id);
  localStorage.setItem('cram.viewed', JSON.stringify([...viewed]));
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { try { window.mermaid && window.mermaid.run({ querySelector: '.mermaid' }); } catch (e) {} }, 50);
}

function updateProgress() {
  const pt = document.getElementById('progText');
  const pb = document.getElementById('progBar');
  if (pt) pt.textContent = `${viewed.size}/${allIds.length}`;
  if (pb) pb.style.width = (viewed.size / allIds.length * 100) + '%';
  for (const id of allIds) {
    const el = document.getElementById('nav-' + id);
    if (el) {
      const dot = el.querySelector('.heat');
      if (dot) dot.className = 'heat ' + (viewed.has(id) ? 'h3' : 'h0');
    }
  }
}

// ===========================================================================
// DASHBOARD TOPIC GRID
// ===========================================================================
function buildTopicGrid() {
  const grid = document.getElementById('topicGrid');
  if (!grid) return;
  const items = [
    ['lifecycle', 'Program Life Cycle', 'Analysis · Design · Code · Test'],
    ['pseudocode', 'Pseudocode', 'IF · FOR · WHILE · REPEAT'],
    ['flowcharts', 'Flowcharts', '10 worked examples'],
    ['trace', 'Trace Tables', 'Interactive — 10 problems'],
    ['validation', 'Validation', '6 types + 2 verification methods'],
    ['testing', 'Test Data', 'Normal / Boundary / Extreme / Erroneous'],
    ['search', 'Searching', 'Linear vs Binary'],
    ['sort', 'Sorting', 'Bubble sort with full trace'],
    ['python', 'Python', 'Side-by-side with pseudocode'],
    ['sql', 'SQL', 'SELECT · WHERE · aggregates'],
    ['q15', '15-Mark Questions', '15 full programming tasks'],
    ['pylab', 'Python Lab', 'Run real code in browser'],
    ['quiz', 'Quiz', '100-question bank · scored'],
    ['tutor', 'AI Tutor', 'Claude-powered with offline fallback'],
  ];
  grid.innerHTML = items.map(([id, t, d]) => `
    <div class="card" onclick="showSection('${id}')">
      <div class="font-semibold mb-1">${t}</div>
      <div class="text-xs text-zinc-500">${d}</div>
    </div>`).join('');
}

// ===========================================================================
// TRACE TABLE PRACTICE
// ===========================================================================
function buildTracePractice() {
  const container = document.getElementById('tracePractice');
  if (!container || !window.TRACE_PROBLEMS) return;
  container.innerHTML = window.TRACE_PROBLEMS.map((p, idx) => {
    const head = p.cols.map(c => `<th>${c}</th>`).join('');
    const body = p.rows.map((r, ri) =>
      `<tr>${r.map((v, ci) =>
        `<td class="editable" contenteditable="true" data-p="${idx}" data-r="${ri}" data-c="${ci}" data-expected="${String(v).replace(/"/g,'&quot;')}"></td>`
      ).join('')}</tr>`
    ).join('');
    const diffBadge = p.difficulty === 'easy' ? 'badge-green' : p.difficulty === 'medium' ? 'badge-amber' : 'badge-red';
    return `<div class="card mb-4">
      <div class="flex items-baseline justify-between mb-2">
        <h3 class="font-semibold">${p.title || 'Problem ' + (idx+1)}</h3>
        <div class="flex gap-2"><span class="badge ${diffBadge}">${p.difficulty || ''}</span><span class="badge badge-blue">${p.topic || ''}</span></div>
      </div>
      ${p.desc}
      <table class="trace"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
      <div class="flex gap-2">
        <button class="btn btn-primary" onclick="checkTrace(${idx})">Check</button>
        <button class="btn btn-ghost" onclick="showTrace(${idx})">Reveal Answers</button>
        <button class="btn btn-ghost" onclick="resetTrace(${idx})">Reset</button>
      </div>
      <div class="text-sm mt-2" id="traceResult-${idx}"></div>
    </div>`;
  }).join('');
}

function checkTrace(idx) {
  const cells = document.querySelectorAll(`[data-p="${idx}"]`);
  let correct = 0, total = 0;
  cells.forEach(c => {
    const exp = (c.dataset.expected || '').trim();
    const got = c.textContent.trim();
    c.classList.remove('correct', 'wrong');
    if (exp === '' || exp === '—') return;
    total++;
    if (got.toLowerCase() === exp.toLowerCase() || got === exp) {
      c.classList.add('correct');
      correct++;
    } else if (got !== '') {
      c.classList.add('wrong');
    }
  });
  const el = document.getElementById('traceResult-' + idx);
  if (el) el.innerHTML = `<span class="badge ${correct === total ? 'badge-green' : 'badge-amber'}">${correct} / ${total} correct</span>`;
}
function showTrace(idx) {
  document.querySelectorAll(`[data-p="${idx}"]`).forEach(c => {
    c.textContent = c.dataset.expected || '';
    if (c.dataset.expected && c.dataset.expected.trim() !== '') c.classList.add('correct');
  });
}
function resetTrace(idx) {
  document.querySelectorAll(`[data-p="${idx}"]`).forEach(c => {
    c.textContent = '';
    c.classList.remove('correct','wrong');
  });
  const el = document.getElementById('traceResult-' + idx);
  if (el) el.innerHTML = '';
}

// ===========================================================================
// 15-MARK QUESTIONS RENDERER
// ===========================================================================
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildQ15() {
  const c = document.getElementById('q15container');
  if (!c || !window.Q15) return;
  c.innerHTML = window.Q15.map((q, i) => {
    const total = q.marking.reduce((s, [,v]) => s + v, 0);
    return `<div class="card mb-5">
      <div class="flex items-baseline justify-between flex-wrap gap-2">
        <h3 class="font-semibold">${q.title}</h3>
        <div class="flex gap-2"><span class="badge badge-purple">${q.marks} marks</span><span class="badge badge-blue">${q.topic}</span></div>
      </div>
      <div class="text-sm mt-2">${q.text}</div>
      <details class="mt-3"><summary>Python solution</summary><pre>${escapeHtml(q.py)}</pre></details>
      <details class="mt-2"><summary>Pseudocode solution</summary><pre>${q.pseudo}</pre></details>
      <details class="mt-2"><summary>Marking breakdown (${total} marks)</summary>
        <table class="trace mt-2"><thead><tr><th style="text-align:left;padding-left:1rem">Criterion</th><th>Marks</th></tr></thead>
        <tbody>${q.marking.map(([k,v]) => `<tr><td style="text-align:left">${k}</td><td>${v}</td></tr>`).join('')}
        <tr><td style="text-align:left"><strong>Total</strong></td><td><strong>${total}</strong></td></tr></tbody></table>
      </details>
      <div class="mt-3 flex gap-2">
        <button class="btn btn-ghost" onclick="loadInLab(window.Q15[${i}].py)">Open in Python Lab ↗</button>
        <button class="btn btn-ghost" onclick="askClaudeAbout(${i})"><span class="claude-logo">C</span> Discuss with Claude</button>
      </div>
    </div>`;
  }).join('');
}

function loadInLab(code) {
  showSection('pylab');
  const ed = document.getElementById('pyCode');
  if (ed) ed.value = code;
  const ins = document.getElementById('pyInputs');
  if (ins) ins.value = '';
}

function askClaudeAbout(qIdx) {
  showSection('tutor');
  const q = window.Q15[qIdx];
  if (!q) return;
  const inp = document.getElementById('chatIn');
  if (inp) {
    inp.value = `Help me understand ${q.title}. Walk me through the approach, then ask me a check question.`;
    chatSend();
  }
}

// ===========================================================================
// AI TUTOR — Local Bridge (Claude Max) > Claude API key > rule-based fallback
// ===========================================================================
let chatHistory = [];
let chatBusy = false;

// Local bridge state (server.mjs at /api/* — uses Claude Code OAuth → Max plan)
const localBridge = { available: false, detected: false };

async function detectLocalBridge() {
  try {
    const r = await fetch('/api/health', { signal: AbortSignal.timeout(1500) });
    if (r.ok) {
      const data = await r.json();
      localBridge.available = data.status === 'ok';
    }
  } catch { localBridge.available = false; }
  localBridge.detected = true;
  updateTutorStatus();
  return localBridge.available;
}

function appendChat(html, who) {
  const log = document.getElementById('chatLog');
  if (!log) return null;
  const div = document.createElement('div');
  div.className = 'chat-msg ' + (who === 'user' ? 'chat-user' : 'chat-bot');
  div.innerHTML = html;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
  return div;
}

function clearChat() {
  chatHistory = [];
  const log = document.getElementById('chatLog');
  if (log) log.innerHTML = '';
  greetUser();
}

function greetUser() {
  let greet;
  if (localBridge.available) {
    greet = `<div><strong>Connected via Claude Max</strong> (local bridge → Claude Agent SDK). Real Claude, no API key, billed to your subscription.</div>
       <div class="text-xs text-zinc-500 mt-2">Try: <em>"explain trace tables with an example"</em> · <em>"generate a 15-mark question on files"</em> · <em>"mark this answer: ..."</em> · <em>"compare linear and binary search"</em></div>`;
  } else if (window.ClaudeAPI && window.ClaudeAPI.hasKey()) {
    greet = `<div><strong>Connected to Claude</strong> via API key. I have the full 2026 IGCSE syllabus in mind. Ask anything.</div>
       <div class="text-xs text-zinc-500 mt-2">Try: <em>"explain trace tables with an example"</em> · <em>"generate a 10-mark question on file handling"</em> · <em>"check this answer: ..."</em></div>`;
  } else {
    greet = `<div>Hi. I'm your IGCSE CS Paper 2 tutor. Running on rule-based fallback (offline). For real Claude AI: run <span class="mono">node server.mjs</span> locally (Max plan, free) or click <strong>Connect Claude</strong> in the header (API key).</div>
       <div class="text-xs text-zinc-500 mt-2">Try: <em>"what is abstraction"</em> · <em>"python code for bubble sort"</em> · <em>"difference between validation and verification"</em> · <em>"give me a question"</em></div>`;
  }
  appendChat(greet, 'bot');
  updateTutorStatus();
}

function updateTutorStatus() {
  const status = document.getElementById('tutorStatus');
  const tokenEl = document.getElementById('tokenUsage');
  const lbl = document.getElementById('connectLabel');
  if (localBridge.available) {
    if (status) status.innerHTML = `<span class="pulse-dot"></span> Claude Max · local bridge · haiku-4.5`;
    if (lbl) lbl.textContent = 'Max bridge live';
    if (tokenEl) tokenEl.textContent = 'Auth: Claude Code OAuth · Billed to your Max plan';
  } else if (window.ClaudeAPI && window.ClaudeAPI.hasKey()) {
    if (status) status.innerHTML = `<span class="pulse-dot"></span> Claude connected (API key) · haiku-4.5`;
    if (lbl) lbl.textContent = 'Claude connected';
    const stats = window.ClaudeAPI.getTokenStats();
    if (tokenEl) tokenEl.textContent = `Tokens — in: ${stats.in.toLocaleString()} · out: ${stats.out.toLocaleString()} · calls: ${stats.calls}`;
  } else {
    if (status) status.textContent = 'Offline mode (rule-based). For Max: run local bridge. For API key: click Connect Claude.';
    if (lbl) lbl.textContent = 'Connect Claude';
    if (tokenEl) tokenEl.textContent = '';
  }
}

async function chatSend() {
  if (chatBusy) return;
  const inp = document.getElementById('chatIn');
  const text = (inp.value || '').trim();
  if (!text) return;
  inp.value = '';
  appendChat(escapeHtml(text), 'user');

  if (localBridge.available) {
    await sendToLocalBridge(text);
  } else if (window.ClaudeAPI && window.ClaudeAPI.hasKey()) {
    await sendToClaude(text);
  } else {
    setTimeout(() => appendChat(ruleBasedRespond(text), 'bot'), 150);
  }
}

async function sendToLocalBridge(userMessage) {
  chatBusy = true;
  const sendBtn = document.getElementById('chatSendBtn');
  if (sendBtn) { sendBtn.disabled = true; sendBtn.textContent = 'Thinking...'; }

  const botDiv = appendChat('<span class="chat-streaming"></span>', 'bot');
  botDiv.classList.add('chat-streaming');
  const renderFn = (window.ClaudeAPI && window.ClaudeAPI.renderMarkdown)
    ? window.ClaudeAPI.renderMarkdown
    : (t) => '<p>' + escapeHtml(t).replace(/\n/g, '<br>') + '</p>';
  let fullText = '';

  try {
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userMessage, history: chatHistory }),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);

    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        let ev;
        try { ev = JSON.parse(line.slice(6)); } catch { continue; }
        if (ev.type === 'chunk') {
          fullText += ev.text;
          botDiv.innerHTML = renderFn(fullText) + '<span class="chat-streaming"></span>';
          const log = document.getElementById('chatLog');
          if (log) log.scrollTop = log.scrollHeight;
        } else if (ev.type === 'done') {
          botDiv.classList.remove('chat-streaming');
          botDiv.innerHTML = renderFn(fullText);
          chatHistory.push({ role: 'user', content: userMessage });
          chatHistory.push({ role: 'assistant', content: fullText });
          if (chatHistory.length > 16) chatHistory = chatHistory.slice(-16);
        } else if (ev.type === 'error') {
          throw new Error(ev.message || 'bridge error');
        }
      }
    }
  } catch (e) {
    botDiv.classList.remove('chat-streaming');
    botDiv.innerHTML = `<div class="text-red-300"><strong>Local bridge error:</strong> ${escapeHtml(String(e.message || e))}</div>
      <div class="text-xs text-zinc-500 mt-2">Check the terminal where you ran <span class="mono">node server.mjs</span>. Falling back to offline mode.</div>
      <div class="mt-2">${ruleBasedRespond(userMessage)}</div>`;
  } finally {
    chatBusy = false;
    if (sendBtn) { sendBtn.disabled = false; sendBtn.textContent = 'Send'; }
  }
}

async function sendToClaude(userMessage) {
  chatBusy = true;
  document.getElementById('chatSendBtn').disabled = true;
  document.getElementById('chatSendBtn').textContent = 'Thinking...';

  const botDiv = appendChat('<span class="chat-streaming"></span>', 'bot');
  botDiv.classList.add('chat-streaming');
  let buffer = '';

  await window.ClaudeAPI.chatWithClaude(userMessage, chatHistory, {
    onStart: () => {
      botDiv.innerHTML = '<span class="chat-streaming"></span>';
    },
    onChunk: (txt) => {
      buffer += txt;
      botDiv.innerHTML = window.ClaudeAPI.renderMarkdown(buffer) + '<span class="chat-streaming"></span>';
      const log = document.getElementById('chatLog');
      log.scrollTop = log.scrollHeight;
    },
    onDone: (fullText, usage) => {
      botDiv.classList.remove('chat-streaming');
      botDiv.innerHTML = window.ClaudeAPI.renderMarkdown(fullText);
      chatHistory.push({ role: 'user', content: userMessage });
      chatHistory.push({ role: 'assistant', content: fullText });
      if (chatHistory.length > 16) chatHistory = chatHistory.slice(-16);
      chatBusy = false;
      document.getElementById('chatSendBtn').disabled = false;
      document.getElementById('chatSendBtn').textContent = 'Send';
      updateTutorStatus();
    },
    onError: (msg) => {
      botDiv.classList.remove('chat-streaming');
      botDiv.innerHTML = `<div class="text-red-300"><strong>Error:</strong> ${escapeHtml(msg)}</div>
        <div class="text-xs text-zinc-500 mt-2">Falling back to offline mode for this question.</div>
        <div class="mt-2">${ruleBasedRespond(userMessage)}</div>`;
      chatBusy = false;
      document.getElementById('chatSendBtn').disabled = false;
      document.getElementById('chatSendBtn').textContent = 'Send';
    }
  });
}

// ---------- Rule-based fallback (offline) -----------------------------------

const RB_TOPICS = {
  lifecycle: { match: /life ?cycle|stages? of (a )?program|development cycle/i,
    a: `<strong>Program Development Life Cycle</strong> — 4 stages:
<ol class="list-decimal pl-5 mt-1 text-sm space-y-1">
  <li><strong>Analysis</strong>: understand the problem · abstraction · decomposition · identify inputs/processes/outputs/storage</li>
  <li><strong>Design</strong>: structure diagrams · flowcharts · pseudocode</li>
  <li><strong>Coding</strong>: write actual code in Python/Java/VB</li>
  <li><strong>Testing</strong>: run with Normal/Boundary/Extreme/Erroneous data</li>
</ol>` },
  abstraction: { match: /abstract/i, a: `<strong>Abstraction</strong> means hiding irrelevant detail to focus on what matters. <em>Example:</em> the London Tube map ignores exact distances.` },
  decomposition: { match: /decompos|break.{0,10}down|sub-?problem/i, a: `<strong>Decomposition</strong> means breaking a large problem into smaller sub-problems that can be solved separately.` },
  pseudocode: { match: /pseudo|pseudocode|cambridge syntax/i, a: `Cambridge pseudocode uses <span class="mono">←</span> for assignment, UPPERCASE keywords, and 1-indexed arrays. Major constructs: <span class="mono">IF…THEN…ELSE…ENDIF</span>, <span class="mono">CASE OF…ENDCASE</span>, <span class="mono">FOR…NEXT</span>, <span class="mono">WHILE…ENDWHILE</span>, <span class="mono">REPEAT…UNTIL</span>, <span class="mono">PROCEDURE…ENDPROCEDURE</span>, <span class="mono">FUNCTION…RETURNS…ENDFUNCTION</span>.` },
  flowchart: { match: /flow ?chart|flowchart symbol|diamond|parallelogram/i, a: `<strong>Flowchart symbols:</strong>
<ul class="list-disc pl-5 mt-1 text-sm space-y-1">
  <li>Oval — Start / Stop</li>
  <li>Parallelogram — Input / Output</li>
  <li>Rectangle — Process (assignment / calculation)</li>
  <li>Diamond — Decision (yes / no)</li>
  <li>Arrow — Direction of flow</li>
  <li>Circle — Connector</li>
</ul>` },
  trace: { match: /trace table|trace tabel|trace.{0,10}value/i, a: `A <strong>trace table</strong> records every change of every variable as you walk through code. One column per variable + one for OUTPUT. One row per <em>change</em> (not per line).` },
  validation: { match: /\bvalidat/i, a: `<strong>Validation</strong> checks data is sensible:
<ul class="list-disc pl-5 mt-1 text-sm space-y-1">
  <li>Range · Length · Type · Presence · Format · Check digit</li>
</ul>` },
  verification: { match: /verifi|double entry|visual check/i, a: `<strong>Verification</strong> checks data was entered correctly:
<ul class="list-disc pl-5 mt-1 text-sm space-y-1">
  <li>Double entry · Visual check</li>
</ul>` },
  testdata: { match: /test data|normal data|boundary|erroneous|abnormal data|extreme/i, a: `Four types of test data: <strong>Normal</strong> (valid typical), <strong>Boundary</strong> (edge of valid range), <strong>Extreme</strong> (largest/smallest valid), <strong>Erroneous</strong> (invalid — should be rejected). For range 0–100: Normal 50, Boundary 0/100, Extreme 100, Erroneous -1 or "abc".` },
  linear: { match: /linear search/i, a: `<strong>Linear search:</strong> check each element from start to end. Works on unsorted data. Worst case: n comparisons.
<pre>Found ← False
Index ← 1
WHILE Index &lt;= n AND Found = False DO
  IF List[Index] = Target THEN
    Found ← True
    Position ← Index
  ENDIF
  Index ← Index + 1
ENDWHILE</pre>` },
  binary: { match: /binary search/i, a: `<strong>Binary search:</strong> list MUST be sorted. Check middle, eliminate half. Much faster than linear (O(log n)).` },
  bubble: { match: /bubble sort|sorting/i, a: `<strong>Bubble sort:</strong> compare adjacent pairs, swap if out of order. Repeat passes until no swaps.` },
  sql: { match: /\bsql\b|select|database|query|primary key|table|record|field/i, a: `<strong>SQL skeleton:</strong> <span class="mono">SELECT field(s) FROM table WHERE condition ORDER BY field ASC|DESC;</span>. Aggregates: <span class="mono">COUNT, SUM, AVG, MIN, MAX</span>. LIKE wildcards: <span class="mono">%</span> any chars, <span class="mono">_</span> exactly one.` },
  arrays: { match: /\barray|list|2d array/i, a: `Pseudocode arrays are 1-indexed: <span class="mono">ARRAY[1:n] OF TYPE</span>. Python lists are 0-indexed.` },
  files: { match: /file handling|openfile|readfile|writefile/i, a: `<strong>File handling pseudocode:</strong>
<pre>OPENFILE "f.txt" FOR READ
WHILE NOT EOF("f.txt") DO
  READFILE "f.txt", Line
  OUTPUT Line
ENDWHILE
CLOSEFILE "f.txt"</pre>` },
  functions: { match: /function|procedure|parameter|argument/i, a: `<strong>Procedure</strong> performs action, no return. <strong>Function</strong> returns a value (RETURNS type, RETURN value). <strong>Parameter</strong>: variable in definition. <strong>Argument</strong>: actual value passed in.` },
  diffValVer: { match: /(difference|differ).*(validation.{0,12}verification|verification.{0,12}validation)/i, a: `<strong>Validation</strong> checks if data is sensible (range/length/type/etc). <strong>Verification</strong> checks if data was entered correctly (double entry / visual check).` },
  diffWhile: { match: /(difference|differ).*(while.{0,12}repeat|repeat.{0,12}while)/i, a: `<strong>WHILE</strong> = pre-test, condition checked first, may run 0 times. <strong>REPEAT…UNTIL</strong> = post-test, always runs at least once.` },
  diffSearch: { match: /(difference|differ|compar).*(linear.{0,15}binary|binary.{0,15}linear)/i, a: `<strong>Linear search</strong>: any order, slow on big lists. <strong>Binary search</strong>: needs sorted list, halves range each step, much faster.` },
  errortypes: { match: /syntax error|logic error|runtime error|types of error/i, a: `Three error types: <strong>Syntax</strong> (language rule broken, won't run), <strong>Logic</strong> (runs but wrong output), <strong>Runtime</strong> (crashes during execution).` },
  datatypes: { match: /data ?type|integer|real|string|boolean|char/i, a: `Data types: <span class="mono">INTEGER</span>, <span class="mono">REAL</span>, <span class="mono">CHAR</span>, <span class="mono">STRING</span>, <span class="mono">BOOLEAN</span>, <span class="mono">DATE</span>.` },
  operators: { match: /operator|mod|div|and|or|not/i, a: `<strong>Arithmetic:</strong> + − * / DIV MOD. <strong>Comparison:</strong> = &lt;&gt; &lt; &gt; &lt;= &gt;=. <strong>Logical:</strong> AND OR NOT. DIV = integer division, MOD = remainder.` },
};

const RB_CODE = {
  linear: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  binary: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
  bubble: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break
    return arr`,
  validation: `while True:
    age = int(input("Age (0-120): "))
    if 0 <= age <= 120:
        break
    print("Out of range")`,
  average: `total = 0
for i in range(10):
    total += int(input(f"Number {i+1}: "))
print("Average:", total / 10)`,
  max: `biggest = int(input("First: "))
for i in range(9):
    n = int(input(f"Number {i+2}: "))
    if n > biggest:
        biggest = n
print(biggest)`,
  file: `f = open("data.txt", "r")
total = 0
for line in f:
    total += int(line.strip())
f.close()
print(total)`,
};

const RB_QUESTIONS = [
  'State the four stages of the program development life cycle and what happens at each. (8)',
  'Describe each of the six validation types and give a real-world example of each. (6)',
  'Explain the difference between validation and verification, with an example of each. (4)',
  'Write pseudocode for a linear search of an array of 20 integers for a target value. (5)',
  'Trace this code with input 4, 2, 7, 3, 9: Max ← 0; FOR i ← 1 TO 5; INPUT N; IF N > Max THEN Max ← N; NEXT i; OUTPUT Max',
  'A program records exam marks (0–100). Give one example each of normal, boundary, extreme and erroneous test data. (4)',
  'Write SQL to find the names of all employees in the Sales department earning more than 30000. (3)',
  'Explain why a binary search is faster than a linear search for large datasets. State a requirement of the data. (3)',
  'Write a pseudocode function that takes a string and returns its reverse. (5)',
  'Describe the difference between WHILE and REPEAT loops, and give an example use of each. (4)',
  'Write pseudocode for a bubble sort of an array of 10 integers. (6)',
  'Explain three types of programming error, giving an example of each. (6)',
];

function ruleBasedRespond(q) {
  const lo = q.toLowerCase();

  if (/^(hi|hello|hey|yo)\b/.test(lo)) return "Hey. Ask about any Paper 2 topic. Try 'explain trace tables' or 'give me a question'.";
  if (/help|what can you|topics/.test(lo) && lo.length < 40) {
    return `I cover (offline mode): life cycle, abstraction, decomposition, pseudocode, flowcharts, trace tables, validation/verification, test data, linear/binary search, bubble sort, arrays, functions, file handling, SQL, error types, data types, operators.<br>For richer answers, <strong>Connect Claude</strong> in the header.`;
  }

  if (/give.*question|ask me|test me|practice question|exam question/.test(lo)) {
    return `<strong>Practice question:</strong> ${RB_QUESTIONS[Math.floor(Math.random() * RB_QUESTIONS.length)]}<br><br><em class="text-zinc-500">Try answering, then ask Claude to mark it (Connect Claude in header).</em>`;
  }

  if (/code|python.*for|show.*code|how.*write/.test(lo)) {
    for (const [key, code] of Object.entries(RB_CODE)) {
      if (lo.includes(key)) return `Python for <strong>${key}</strong>:<pre>${escapeHtml(code)}</pre>`;
    }
    if (/search/.test(lo)) return `Linear:<pre>${escapeHtml(RB_CODE.linear)}</pre>Binary:<pre>${escapeHtml(RB_CODE.binary)}</pre>`;
    if (/sort/.test(lo)) return `Bubble sort:<pre>${escapeHtml(RB_CODE.bubble)}</pre>`;
    if (/average|mean/.test(lo)) return `Average:<pre>${escapeHtml(RB_CODE.average)}</pre>`;
    if (/file/.test(lo)) return `File:<pre>${escapeHtml(RB_CODE.file)}</pre>`;
    if (/largest|max/.test(lo)) return `Maximum:<pre>${escapeHtml(RB_CODE.max)}</pre>`;
    if (/validat/.test(lo)) return `Validation:<pre>${escapeHtml(RB_CODE.validation)}</pre>`;
  }

  for (const t of Object.values(RB_TOPICS)) {
    if (t.match.test(q)) return t.a;
  }

  if (lo.includes('15') && lo.includes('mark')) return `Open the <strong>15-mark Questions</strong> section — 15 full programming questions with model answers.`;
  if (lo.includes('loop')) return `Three loops: <span class="mono">FOR</span> (count-controlled), <span class="mono">WHILE</span> (pre-test, may run 0 times), <span class="mono">REPEAT…UNTIL</span> (post-test, always runs at least once).`;

  return `Try keywords like <em>pseudocode</em>, <em>trace table</em>, <em>validation</em>, <em>flowchart</em>, <em>bubble sort</em>, <em>binary search</em>, <em>SQL</em>, <em>file handling</em>, or "explain X" / "code for X" / "difference between X and Y". For richer answers, <strong>Connect Claude</strong> in the header.`;
}

// ===========================================================================
// PYTHON LAB (Pyodide)
// ===========================================================================
let pyodide = null;
async function loadPyodideAsync() {
  const statusEl = document.getElementById('pyStatus');
  if (statusEl) { statusEl.textContent = 'loading (~10MB)...'; statusEl.className = 'text-amber-400'; }
  try {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    if (statusEl) { statusEl.textContent = 'ready'; statusEl.className = 'text-green-400'; }
  } catch (e) {
    if (statusEl) { statusEl.textContent = 'failed to load (check internet)'; statusEl.className = 'text-red-400'; }
  }
}

async function runPy() {
  const out = document.getElementById('pyOut');
  if (!pyodide) {
    out.textContent = 'Loading Python runtime, hold on...';
    await loadPyodideAsync();
    if (!pyodide) return;
  }
  out.textContent = '';
  const code = document.getElementById('pyCode').value;
  const inputs = document.getElementById('pyInputs').value;
  pyodide.runPython(`
import sys, io
sys.stdin = io.StringIO(${JSON.stringify(inputs + '\n')})
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
`);
  try {
    await pyodide.runPythonAsync(code);
  } catch (e) {
    out.textContent = String(e);
    return;
  }
  const stdout = pyodide.runPython('sys.stdout.getvalue()');
  out.textContent = stdout || '(no output)';
}

const PY_EXAMPLES = {
  hello: { code: `print("Hello, IGCSE!")
name = input("Your name: ")
print(f"Welcome, {name}.")`, inputs: 'Alex' },
  avg: { code: `total = 0
for i in range(10):
    n = int(input(f"Number {i+1}: "))
    total += n
print("Average:", total / 10)`, inputs: '10\n20\n30\n40\n50\n60\n70\n80\n90\n100' },
  validate: { code: `while True:
    age = int(input("Age (0-120): "))
    if 0 <= age <= 120:
        break
    print("Out of range, try again")
print("Accepted:", age)`, inputs: '-5\n200\n42' },
  linear: { code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

nums = [4, 8, 2, 7, 1, 9, 3]
target = int(input("Search for: "))
pos = linear_search(nums, target)
print(f"Found at index {pos}" if pos >= 0 else "Not found")`, inputs: '7' },
  binary: { code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1

nums = [1, 3, 5, 7, 9, 11, 13, 15]
target = int(input("Search for: "))
pos = binary_search(nums, target)
print(f"Found at index {pos}" if pos >= 0 else "Not found")`, inputs: '7' },
  bubble: { code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped: break
    return arr

nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
print("Before:", nums)
print("After: ", bubble_sort(nums))`, inputs: '' },
  freq: { code: `text = input("Enter a word: ").lower()
counts = {}
for ch in text:
    if ch.isalpha():
        counts[ch] = counts.get(ch, 0) + 1
for ch in sorted(counts):
    print(f"{ch}: {counts[ch]}")`, inputs: 'computerscience' },
  file: { code: `f = open("data.txt", "w")
f.write("first\\n")
f.write("second\\n")
f.write("third\\n")
f.close()

f = open("data.txt", "r")
for line in f:
    print(line.strip())
f.close()`, inputs: '' },
  caesar: { code: `def caesar(text, shift):
    result = ""
    for ch in text:
        if ch.isupper():
            result += chr((ord(ch) - 65 + shift) % 26 + 65)
        elif ch.islower():
            result += chr((ord(ch) - 97 + shift) % 26 + 97)
        else:
            result += ch
    return result

msg = input("Message: ")
n = int(input("Shift: "))
print("Encrypted:", caesar(msg, n))
print("Decrypted:", caesar(caesar(msg, n), -n))`, inputs: 'Hello World\n3' },
};

function loadExample() {
  const sel = document.getElementById('pyExamples').value;
  if (!sel) return;
  const ex = PY_EXAMPLES[sel];
  if (ex) {
    document.getElementById('pyCode').value = ex.code;
    document.getElementById('pyInputs').value = ex.inputs;
  }
}

// ===========================================================================
// QUIZ
// ===========================================================================
function shuffle(arr) { return arr.map(v => [Math.random(), v]).sort((a,b) => a[0]-b[0]).map(v => v[1]); }

function buildQuiz() {
  const c = document.getElementById('quizContainer');
  if (!c || !window.QUIZ_BANK) return;
  const qs = shuffle([...window.QUIZ_BANK]).slice(0, 30);
  window._quiz = qs;
  c.innerHTML = `<div class="card mb-4">
    <p class="text-sm">30 random questions from a bank of ${window.QUIZ_BANK.length}. Pick an answer for each, then <strong>Submit</strong>.</p>
  </div>` +
    qs.map((q, i) => `
      <div class="card mb-3" id="qcard-${i}">
        <div class="text-sm font-semibold mb-2">Q${i+1}. ${q.q}</div>
        <div class="space-y-1.5 text-sm">
          ${q.a.map((opt, oi) => `<label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-zinc-900"><input type="radio" name="q${i}" value="${oi}"> ${opt}</label>`).join('')}
        </div>
      </div>
    `).join('') +
    `<div class="card card-accent mt-4">
      <button class="btn btn-primary" onclick="gradeQuiz()">Submit & Grade</button>
      <button class="btn btn-ghost" onclick="buildQuiz()">New Questions</button>
      <div id="quizResult" class="mt-3"></div>
    </div>`;
}

function gradeQuiz() {
  const qs = window._quiz;
  let correct = 0;
  qs.forEach((q, i) => {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    const card = document.getElementById('qcard-' + i);
    const chosen = sel ? parseInt(sel.value) : -1;
    if (chosen === q.correct) {
      card.style.borderColor = '#15803d';
      correct++;
    } else {
      card.style.borderColor = '#991b1b';
      const labels = card.querySelectorAll('label');
      labels.forEach((l, li) => {
        if (li === q.correct) l.style.background = '#052e16';
        if (li === chosen && chosen !== q.correct) l.style.background = '#2e0510';
      });
      if (q.explain) {
        const exp = document.createElement('div');
        exp.className = 'text-xs text-zinc-400 mt-2 italic';
        exp.textContent = '↳ ' + q.explain;
        card.appendChild(exp);
      }
    }
  });
  const pct = Math.round((correct / qs.length) * 100);
  const grade = pct >= 90 ? "You're ready." : pct >= 70 ? 'Solid — patch the weak spots.' : pct >= 50 ? 'Borderline — review the red sections above.' : 'Open the cheat sheet and tutor now.';
  document.getElementById('quizResult').innerHTML = `<div class="text-lg font-bold">${correct} / ${qs.length} (${pct}%)</div><div class="text-sm text-zinc-400 mt-1">${grade}</div>`;
}

// ===========================================================================
// CHECKLIST RESTORATION (misc.html has inline onchange handlers writing to localStorage)
// ===========================================================================
function restoreChecklist() {
  const list = document.getElementById('cklist');
  if (!list) return;
  list.querySelectorAll('input[type=checkbox]').forEach((cb, i) => {
    const saved = localStorage.getItem('cram.ck.' + i);
    if (saved === '1') cb.checked = true;
  });
}

// ===========================================================================
// INIT
// ===========================================================================
window.addEventListener('claude:connected', updateTutorStatus);
window.addEventListener('claude:disconnected', updateTutorStatus);

buildNav();
buildTopicGrid();
buildTracePractice();
buildQ15();
buildQuiz();
restoreChecklist();
updateTutorStatus();

// Detect local bridge before greeting, so we show the right welcome message
detectLocalBridge().finally(() => greetUser());

if (window.mermaid) {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      primaryColor: '#1a1a24',
      primaryTextColor: '#e7e7ea',
      primaryBorderColor: '#7c3aed',
      lineColor: '#a1a1aa',
      secondaryColor: '#101018',
      tertiaryColor: '#0d0d14'
    }
  });
  setTimeout(() => { try { mermaid.run({ querySelector: '.mermaid' }); } catch (e) {} }, 100);
}

setTimeout(() => loadPyodideAsync(), 1500);
