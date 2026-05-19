window.TRACE_PROBLEMS = [
  {
    title: 'P1 — FOR loop totalling',
    desc: `<p class="text-sm mb-2">A simple FOR loop reads three numbers and accumulates a total. Trace with inputs <strong>5, 3, 8</strong>.</p>
<pre><span class="kw">Total</span> &#8592; <span class="num">0</span>
<span class="kw">FOR</span> i &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="num">3</span>
  <span class="kw">INPUT</span> Num
  Total &#8592; Total + Num
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Total</pre>`,
    cols: ['i', 'Num', 'Total', 'OUTPUT'],
    rows: [
      ['—', '—', '0', ''],
      ['1', '5', '5', ''],
      ['2', '3', '8', ''],
      ['3', '8', '16', ''],
      ['', '', '', '16']
    ],
    topic: 'loops',
    difficulty: 'easy'
  },
  {
    title: 'P2 — Maximum of 5 numbers',
    desc: `<p class="text-sm mb-2">Find the largest of five numbers using a running maximum. Trace with inputs <strong>3, 7, 4, 9, 2</strong>.</p>
<pre><span class="kw">INPUT</span> Max
<span class="kw">FOR</span> i &#8592; <span class="num">2</span> <span class="kw">TO</span> <span class="num">5</span>
  <span class="kw">INPUT</span> Num
  <span class="kw">IF</span> Num &gt; Max <span class="kw">THEN</span>
    Max &#8592; Num
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Max</pre>`,
    cols: ['i', 'Num', 'Max', 'OUTPUT'],
    rows: [
      ['—', '—', '3', ''],
      ['2', '7', '7', ''],
      ['3', '4', '7', ''],
      ['4', '9', '9', ''],
      ['5', '2', '9', ''],
      ['', '', '', '9']
    ],
    topic: 'standard methods',
    difficulty: 'easy'
  },
  {
    title: 'P3 — Nested IF for grade',
    desc: `<p class="text-sm mb-2">A nested IF statement assigns a letter grade. Trace with input <strong>72</strong>.</p>
<pre><span class="kw">INPUT</span> Mark
<span class="kw">IF</span> Mark &gt;= <span class="num">80</span> <span class="kw">THEN</span>
  Grade &#8592; <span class="str">"A"</span>
<span class="kw">ELSE</span>
  <span class="kw">IF</span> Mark &gt;= <span class="num">60</span> <span class="kw">THEN</span>
    Grade &#8592; <span class="str">"B"</span>
  <span class="kw">ELSE</span>
    Grade &#8592; <span class="str">"C"</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDIF</span>
<span class="kw">OUTPUT</span> Grade</pre>`,
    cols: ['Mark', 'Mark >= 80', 'Mark >= 60', 'Grade', 'OUTPUT'],
    rows: [
      ['72', 'FALSE', 'TRUE', '"B"', ''],
      ['', '', '', '', '"B"']
    ],
    topic: 'selection',
    difficulty: 'easy'
  },
  {
    title: 'P4 — WHILE loop until sentinel 0',
    desc: `<p class="text-sm mb-2">A pre-condition WHILE loop sums values until the sentinel <code>0</code> is entered. Trace with inputs <strong>5, 8, 3, 0</strong>.</p>
<pre><span class="kw">Sum</span> &#8592; <span class="num">0</span>
<span class="kw">INPUT</span> Num
<span class="kw">WHILE</span> Num &lt;&gt; <span class="num">0</span> <span class="kw">DO</span>
  Sum &#8592; Sum + Num
  <span class="kw">INPUT</span> Num
<span class="kw">ENDWHILE</span>
<span class="kw">OUTPUT</span> Sum</pre>`,
    cols: ['Num', 'Sum', 'Num <> 0', 'OUTPUT'],
    rows: [
      ['—', '0', '—', ''],
      ['5', '0', 'TRUE', ''],
      ['5', '5', '', ''],
      ['8', '5', 'TRUE', ''],
      ['8', '13', '', ''],
      ['3', '13', 'TRUE', ''],
      ['3', '16', '', ''],
      ['0', '16', 'FALSE', ''],
      ['', '', '', '16']
    ],
    topic: 'loops',
    difficulty: 'medium'
  },
  {
    title: 'P5 — String reversal with SUBSTRING',
    desc: `<p class="text-sm mb-2">Reverse a string by prepending each character to a result. Trace with input <strong>"Hello"</strong>.</p>
<pre>Word &#8592; <span class="str">"Hello"</span>
Rev &#8592; <span class="str">""</span>
<span class="kw">FOR</span> i &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="fn">LENGTH</span>(Word)
  Ch &#8592; <span class="fn">SUBSTRING</span>(Word, i, <span class="num">1</span>)
  Rev &#8592; Ch &amp; Rev
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Rev</pre>`,
    cols: ['i', 'Ch', 'Rev', 'OUTPUT'],
    rows: [
      ['—', '—', '""', ''],
      ['1', '"H"', '"H"', ''],
      ['2', '"e"', '"eH"', ''],
      ['3', '"l"', '"leH"', ''],
      ['4', '"l"', '"lleH"', ''],
      ['5', '"o"', '"olleH"', ''],
      ['', '', '', '"olleH"']
    ],
    topic: 'strings',
    difficulty: 'medium'
  },
  {
    title: 'P6 — Count of even numbers',
    desc: `<p class="text-sm mb-2">Count how many of five inputs are even using <code>MOD</code>. Trace with inputs <strong>4, 7, 2, 9, 6</strong>.</p>
<pre><span class="kw">Count</span> &#8592; <span class="num">0</span>
<span class="kw">FOR</span> i &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="num">5</span>
  <span class="kw">INPUT</span> Num
  <span class="kw">IF</span> Num <span class="kw">MOD</span> <span class="num">2</span> = <span class="num">0</span> <span class="kw">THEN</span>
    Count &#8592; Count + <span class="num">1</span>
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Count</pre>`,
    cols: ['i', 'Num', 'Num MOD 2', 'Count', 'OUTPUT'],
    rows: [
      ['—', '—', '—', '0', ''],
      ['1', '4', '0', '1', ''],
      ['2', '7', '1', '1', ''],
      ['3', '2', '0', '2', ''],
      ['4', '9', '1', '2', ''],
      ['5', '6', '0', '3', ''],
      ['', '', '', '', '3']
    ],
    topic: 'standard methods',
    difficulty: 'medium'
  },
  {
    title: 'P7 — CASE OF for grade points',
    desc: `<p class="text-sm mb-2">A CASE OF statement maps a letter grade to points. Trace with inputs <strong>'B', 'F', 'A'</strong>.</p>
<pre><span class="kw">FOR</span> i &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="num">3</span>
  <span class="kw">INPUT</span> Grade
  <span class="kw">CASE OF</span> Grade
    <span class="str">'A'</span>: Points &#8592; <span class="num">4</span>
    <span class="str">'B'</span>: Points &#8592; <span class="num">3</span>
    <span class="str">'C'</span>: Points &#8592; <span class="num">2</span>
    <span class="kw">OTHERWISE</span> Points &#8592; <span class="num">0</span>
  <span class="kw">ENDCASE</span>
  <span class="kw">OUTPUT</span> Points
<span class="kw">NEXT</span> i</pre>`,
    cols: ['i', 'Grade', 'Points', 'OUTPUT'],
    rows: [
      ['1', "'B'", '3', '3'],
      ['2', "'F'", '0', '0'],
      ['3', "'A'", '4', '4']
    ],
    topic: 'selection',
    difficulty: 'medium'
  },
  {
    title: 'P8 — REPEAT UNTIL validation',
    desc: `<p class="text-sm mb-2">A post-condition REPEAT loop validates an age in the range 0&ndash;120 and re-prompts on bad input. Trace with inputs <strong>-5, 200, 42</strong>. Note: <span class="kw">"Invalid"</span> is output twice before acceptance.</p>
<pre><span class="kw">REPEAT</span>
  <span class="kw">INPUT</span> Age
  <span class="kw">IF</span> Age &lt; <span class="num">0</span> <span class="kw">OR</span> Age &gt; <span class="num">120</span> <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Invalid"</span>
  <span class="kw">ENDIF</span>
<span class="kw">UNTIL</span> Age &gt;= <span class="num">0</span> <span class="kw">AND</span> Age &lt;= <span class="num">120</span>
<span class="kw">OUTPUT</span> <span class="str">"Accepted: "</span>, Age</pre>`,
    cols: ['Age', 'Age < 0 OR Age > 120', 'UNTIL condition', 'OUTPUT'],
    rows: [
      ['-5', 'TRUE', 'FALSE', '"Invalid"'],
      ['200', 'TRUE', 'FALSE', '"Invalid"'],
      ['42', 'FALSE', 'TRUE', ''],
      ['', '', '', '"Accepted: 42"']
    ],
    topic: 'selection',
    difficulty: 'medium'
  },
  {
    title: 'P9 — Sum and average of array',
    desc: `<p class="text-sm mb-2">Iterate an array of five integers, accumulate the total, then compute the average. The array <code>Nums</code> is pre-filled with <strong>[4, 7, 2, 9, 5]</strong>.</p>
<pre><span class="kw">DECLARE</span> Nums : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="com">// Nums = [4, 7, 2, 9, 5] (pre-filled)</span>
Total &#8592; <span class="num">0</span>
<span class="kw">FOR</span> i &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="num">5</span>
  Total &#8592; Total + Nums[i]
<span class="kw">NEXT</span> i
Average &#8592; Total / <span class="num">5</span>
<span class="kw">OUTPUT</span> Total, Average</pre>`,
    cols: ['i', 'Nums[i]', 'Total', 'Average', 'OUTPUT'],
    rows: [
      ['—', '—', '0', '—', ''],
      ['1', '4', '4', '—', ''],
      ['2', '7', '11', '—', ''],
      ['3', '2', '13', '—', ''],
      ['4', '9', '22', '—', ''],
      ['5', '5', '27', '—', ''],
      ['', '', '27', '5.4', '27, 5.4']
    ],
    topic: 'arrays',
    difficulty: 'hard'
  },
  {
    title: 'P10 — Bubble sort: one outer pass',
    desc: `<p class="text-sm mb-2">Trace a single outer pass of bubble sort on the array <strong>[5, 2, 8, 1]</strong>. Track each cell of the array and the swap variable <code>Temp</code>.</p>
<pre><span class="kw">DECLARE</span> Arr : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">4</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="com">// Arr = [5, 2, 8, 1]</span>
<span class="kw">FOR</span> j &#8592; <span class="num">1</span> <span class="kw">TO</span> <span class="num">3</span>
  <span class="kw">IF</span> Arr[j] &gt; Arr[j+<span class="num">1</span>] <span class="kw">THEN</span>
    Temp &#8592; Arr[j]
    Arr[j] &#8592; Arr[j+<span class="num">1</span>]
    Arr[j+<span class="num">1</span>] &#8592; Temp
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> j</pre>`,
    cols: ['j', 'Arr[1]', 'Arr[2]', 'Arr[3]', 'Arr[4]', 'Temp'],
    rows: [
      ['—', '5', '2', '8', '1', '—'],
      ['1', '2', '5', '8', '1', '5'],
      ['2', '2', '5', '8', '1', '5'],
      ['3', '2', '5', '1', '8', '8']
    ],
    topic: 'sorting',
    difficulty: 'hard'
  }
];
