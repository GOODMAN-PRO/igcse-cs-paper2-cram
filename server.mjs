/* ============================================================================
 * IGCSE Cram — Local Claude Bridge
 * ----------------------------------------------------------------------------
 * Serves the cram app AND proxies chat requests through the Claude Agent SDK,
 * which uses your existing Claude Code auth (i.e. your Claude Max subscription).
 *
 * Run: node server.mjs   (or: npm start)
 * Then open: http://localhost:3737/
 * ========================================================================== */
import { query } from '@anthropic-ai/claude-agent-sdk';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3737;
const ROOT = path.dirname(fileURLToPath(import.meta.url));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
  '.md':   'text/markdown; charset=utf-8',
};

const SYSTEM_PROMPT = `You are an expert tutor for Cambridge IGCSE Computer Science 0478/0984 Paper 2 (2026 syllabus). The student has the exam TOMORROW — be concise, direct, exam-focused. No long preambles.

PSEUDOCODE STYLE (Cambridge official):
- Assignment with ← (e.g. Count ← 0)
- UPPERCASE keywords: DECLARE, IF/THEN/ELSE/ENDIF, FOR/TO/NEXT, WHILE/DO/ENDWHILE, REPEAT/UNTIL, CASE/OF/OTHERWISE/ENDCASE, PROCEDURE/ENDPROCEDURE, FUNCTION/RETURNS/RETURN/ENDFUNCTION, OPENFILE/READFILE/WRITEFILE/CLOSEFILE, INPUT, OUTPUT
- Arrays 1-indexed: DECLARE Scores : ARRAY[1:30] OF INTEGER
- String fns: LENGTH(s), UCASE(s), LCASE(s), SUBSTRING(s, start, length)
- Operators: MOD, DIV, = for equality, <> for not equal

PYTHON STYLE:
- input() returns string — cast with int()/float() if numeric
- Lists 0-indexed (warn if mixing with pseudocode)
- range(a, b) excludes b

SQL: SELECT, FROM, WHERE, ORDER BY ASC/DESC, GROUP BY. Aggregates: COUNT, SUM, AVG, MIN, MAX. LIKE % and _.

SYLLABUS TOPICS to cover authoritatively:
- Program lifecycle (Analysis → Design → Coding → Testing)
- Abstraction, decomposition, computational thinking
- Flowcharts (oval/parallelogram/rectangle/diamond), pseudocode, structure diagrams
- Trace tables (column per variable + output, row per change)
- Validation (range/length/type/presence/format/check digit), verification (double entry/visual check)
- Test data (normal/boundary/extreme/erroneous)
- Linear search, binary search (sorted required), bubble sort with Swapped flag
- Standard methods: totalling, counting, max/min, average
- Arrays 1D/2D, procedures vs functions, parameters vs arguments, local vs global
- File handling (text files, EOF, sequential)
- Error types (syntax/logic/runtime)

FORMATTING: Markdown output. **bold** key terms, ## headings, - bullet lists, code blocks with language hints. Show pseudocode AND Python when relevant. For practice questions, ALWAYS include mark breakdown like [2 marks: validation, 2 marks: loop, 1 mark: output].

Don't reproduce real past papers — generate original exam-style questions in the same shape.`;

// ============================================================================
// SERVER
// ============================================================================
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Health endpoint — used by the browser app to auto-detect this bridge
  if (req.method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'ok',
      via: 'claude-agent-sdk',
      auth: 'claude-code-max',
    }));
  }

  // Chat endpoint — streaming Claude responses via SSE
  if (req.method === 'POST' && url.pathname === '/api/chat') {
    return handleChat(req, res);
  }

  // Static file serving
  if (req.method === 'GET') {
    let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
    const fullPath = path.join(ROOT, filePath);

    // Path traversal guard
    if (!fullPath.startsWith(ROOT)) {
      res.writeHead(403); return res.end('Forbidden');
    }

    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        res.writeHead(403); return res.end('Forbidden');
      }
      const ext = path.extname(fullPath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      return fs.createReadStream(fullPath).pipe(res);
    } catch {
      res.writeHead(404); return res.end('Not found');
    }
  }

  res.writeHead(405); res.end('Method not allowed');
});

// ============================================================================
// CHAT HANDLER — uses Claude Agent SDK → your Claude Max plan
// ============================================================================
async function handleChat(req, res) {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'invalid json' }));
    }

    const { prompt, history = [] } = parsed;
    if (!prompt || typeof prompt !== 'string') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'missing prompt' }));
    }

    // Start SSE stream
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    res.write(`: ok\n\n`); // keep-alive ping

    const send = (obj) => {
      try { res.write(`data: ${JSON.stringify(obj)}\n\n`); } catch {}
    };

    // Build conversation context as a single prompt with history
    const fullPrompt = history.length > 0
      ? `Previous conversation:\n` +
        history.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n') +
        `\n\nUSER: ${prompt}\n\nReply as the IGCSE tutor.`
      : prompt;

    let lastEmittedLength = 0;

    try {
      for await (const message of query({
        prompt: fullPrompt,
        options: {
          systemPrompt: SYSTEM_PROMPT,
          allowedTools: [],          // no tool use needed for tutoring
          permissionMode: 'bypassPermissions',
          model: 'claude-haiku-4-5-20251001',  // fast + cheap (uses Max plan tokens)
          maxTurns: 1,
        }
      })) {
        if (message.type === 'assistant' && message.message) {
          const content = message.message.content;
          if (Array.isArray(content)) {
            // Combine all text blocks in this message
            let fullText = '';
            for (const block of content) {
              if (block.type === 'text' && block.text) fullText += block.text;
            }
            // Emit only the new portion (delta)
            if (fullText.length > lastEmittedLength) {
              const delta = fullText.slice(lastEmittedLength);
              lastEmittedLength = fullText.length;
              send({ type: 'chunk', text: delta });
            }
          }
        } else if (message.type === 'result') {
          // Final result — no more assistant messages coming
          break;
        }
      }
      send({ type: 'done' });
    } catch (e) {
      console.error('[chat error]', e);
      const msg = String(e?.message || e);
      send({ type: 'error', message: msg });
    } finally {
      try { res.end(); } catch {}
    }
  });
}

// ============================================================================
// START
// ============================================================================
server.listen(PORT, () => {
  console.log('');
  console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  IGCSE Cram — Claude bridge running');
  console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`  Open:  http://localhost:${PORT}/`);
  console.log('  Auth:  Claude Code → your Claude Max subscription');
  console.log('  Model: claude-haiku-4-5-20251001');
  console.log('');
  console.log('  The browser app will auto-detect this server and use it for AI');
  console.log('  tutoring. No API key needed. Press Ctrl-C to stop.');
  console.log('');
});

process.on('SIGINT', () => {
  console.log('\n  bye\n');
  process.exit(0);
});
