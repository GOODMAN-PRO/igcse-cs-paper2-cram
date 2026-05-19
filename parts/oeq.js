window.OEQ_BANK = [
  // ============ LIFECYCLE (4) ============
  {
    q: `Describe the purpose of the <strong>analysis</strong> stage in the program development life cycle.`,
    marks: 3,
    topic: 'lifecycle',
    difficulty: 'easy',
    model: `Analysis is the first stage where the problem is investigated to understand exactly what is required. It involves:
<ul>
<li>Decomposing the problem into smaller sub-problems.</li>
<li>Identifying the inputs, processes and outputs (the IPO).</li>
<li>Identifying the requirements/specification that the final program must meet.</li>
</ul>`,
    points: [
      'Problem is broken down/decomposed into smaller parts (1)',
      'Inputs, processes and outputs are identified (1)',
      'A specification/list of requirements is produced (1)'
    ]
  },
  {
    q: `State <strong>two</strong> differences between <strong>alpha testing</strong> and <strong>beta testing</strong>.`,
    marks: 2,
    topic: 'lifecycle',
    difficulty: 'medium',
    model: `<ul>
<li>Alpha testing is carried out by employees/developers within the company; beta testing is carried out by selected members of the public/end users outside the company.</li>
<li>Alpha testing happens before beta testing in the life cycle; beta testing happens once alpha testing is complete and the product is nearly finished.</li>
</ul>`,
    points: [
      'Alpha is in-house/by employees; beta is by external users/public (1)',
      'Alpha happens first/before release; beta happens later/closer to release (1)'
    ]
  },
  {
    q: `Describe what happens during the <strong>maintenance</strong> stage of the program development life cycle.`,
    marks: 3,
    topic: 'lifecycle',
    difficulty: 'medium',
    model: `Maintenance takes place after the program has been released. During this stage:
<ul>
<li>Errors (bugs) reported by users are identified and corrected.</li>
<li>The program is updated to keep it compatible with new hardware or operating systems.</li>
<li>New features may be added or existing features improved in response to user feedback.</li>
</ul>`,
    points: [
      'Bugs/errors found after release are fixed (1)',
      'Program is updated for compatibility with new hardware/software (1)',
      'New features added/improvements made based on user feedback (1)'
    ]
  },
  {
    q: `Explain why <strong>design</strong> is carried out before <strong>coding</strong> in the program development life cycle.`,
    marks: 4,
    topic: 'lifecycle',
    difficulty: 'medium',
    model: `<ul>
<li>Design produces a clear plan (e.g. flowcharts, pseudocode, structure diagrams) that programmers follow, which makes coding faster and more accurate.</li>
<li>It allows the structure of the solution to be checked against the requirements before any code is written, so problems can be caught early.</li>
<li>It is much cheaper and easier to change a design than to change finished code, so errors caught at this stage save time and money.</li>
<li>It allows the task to be split between team members because each module/sub-problem is clearly defined.</li>
</ul>`,
    points: [
      'Produces a plan/blueprint (flowchart/pseudocode) to follow when coding (1)',
      'Errors/missing requirements can be identified before coding starts (1)',
      'Cheaper/easier to correct mistakes in design than in code (1)',
      'Allows the work to be divided between programmers/teams (1)'
    ]
  },

  // ============ CT - abstraction/decomposition (3) ============
  {
    q: `Describe what is meant by <strong>abstraction</strong> when designing a computer system.`,
    marks: 2,
    topic: 'ct',
    difficulty: 'easy',
    model: `Abstraction means removing or hiding unnecessary detail to focus on what is essential to the problem. For example, a London Tube map shows the connections between stations but ignores exact distances and curves of the track.`,
    points: [
      'Removing/hiding unnecessary detail (1)',
      'To focus on the essentials of the problem, with a valid example (1)'
    ]
  },
  {
    q: `A programmer is designing a game. Describe how <strong>decomposition</strong> could be used during the design.`,
    marks: 3,
    topic: 'ct',
    difficulty: 'medium',
    model: `Decomposition is the process of breaking a large problem into smaller, more manageable sub-problems. For a game, the programmer could break the system into separate parts such as:
<ul>
<li>Player input/controls.</li>
<li>The graphics/rendering.</li>
<li>The scoring and high-score system.</li>
</ul>
Each sub-problem is then easier to solve individually and can be assigned to different team members.`,
    points: [
      'Definition: breaking a problem into smaller sub-problems (1)',
      'Two or more valid sub-tasks for a game identified (input, graphics, scoring etc.) (1)',
      'Benefit: easier to solve individually / can be shared between programmers (1)'
    ]
  },
  {
    q: `Compare <strong>abstraction</strong> and <strong>decomposition</strong> as computational thinking techniques.`,
    marks: 4,
    topic: 'ct',
    difficulty: 'hard',
    model: `<ul>
<li>Both are computational thinking techniques used to simplify a problem before coding.</li>
<li>Abstraction removes unnecessary detail so that only what is relevant remains; decomposition splits the problem into smaller sub-problems.</li>
<li>Abstraction focuses on <em>what</em> details to ignore; decomposition focuses on <em>how</em> the problem is divided.</li>
<li>They are often used together — a complex problem is first decomposed, then abstraction is applied to each sub-problem.</li>
</ul>`,
    points: [
      'Both are computational thinking/problem-solving techniques (1)',
      'Abstraction: removing unnecessary detail; decomposition: breaking into sub-problems (1)',
      'Abstraction simplifies detail; decomposition simplifies size/structure (1)',
      'They are complementary/used together in design (1)'
    ]
  },

  // ============ PSEUDOCODE (4) ============
  {
    q: `Write pseudocode that asks the user to enter ten numbers and outputs their average.`,
    marks: 4,
    topic: 'pseudocode',
    difficulty: 'easy',
    model: `<pre><span class="kw">DECLARE</span> Total : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Number : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Average : <span class="kw">REAL</span>
Total ← 0
<span class="kw">FOR</span> Count ← 1 <span class="kw">TO</span> 10
   <span class="kw">OUTPUT</span> <span class="str">"Enter a number: "</span>
   <span class="kw">INPUT</span> Number
   Total ← Total + Number
<span class="kw">NEXT</span> Count
Average ← Total / 10
<span class="kw">OUTPUT</span> <span class="str">"Average is "</span>, Average</pre>`,
    points: [
      'Total initialised to 0 (1)',
      'FOR loop running exactly 10 times (1)',
      'INPUT inside the loop and added to a running total (1)',
      'Average calculated (Total/10) and output after the loop (1)'
    ]
  },
  {
    q: `Write pseudocode using a <strong>WHILE</strong> loop that repeatedly asks the user to enter a password until they enter the correct one (<code>"letmein"</code>).`,
    marks: 4,
    topic: 'pseudocode',
    difficulty: 'medium',
    model: `<pre><span class="kw">DECLARE</span> Password : <span class="kw">STRING</span>
<span class="kw">OUTPUT</span> <span class="str">"Enter password: "</span>
<span class="kw">INPUT</span> Password
<span class="kw">WHILE</span> Password &lt;&gt; <span class="str">"letmein"</span> <span class="kw">DO</span>
   <span class="kw">OUTPUT</span> <span class="str">"Incorrect, try again: "</span>
   <span class="kw">INPUT</span> Password
<span class="kw">ENDWHILE</span>
<span class="kw">OUTPUT</span> <span class="str">"Access granted"</span></pre>`,
    points: [
      'Initial INPUT of Password before the loop (priming read) (1)',
      'WHILE condition tests Password &lt;&gt; "letmein" (1)',
      'INPUT inside the loop to update Password (1)',
      'Correct ENDWHILE and an output after the loop (1)'
    ]
  },
  {
    q: `Write pseudocode using a <strong>FOR</strong> loop that outputs the 7-times table from 7×1 up to 7×12.`,
    marks: 3,
    topic: 'pseudocode',
    difficulty: 'easy',
    model: `<pre><span class="kw">FOR</span> Count ← 1 <span class="kw">TO</span> 12
   <span class="kw">OUTPUT</span> Count, <span class="str">" x 7 = "</span>, Count * 7
<span class="kw">NEXT</span> Count</pre>`,
    points: [
      'FOR loop from 1 to 12 (1)',
      'Multiplication Count * 7 calculated inside loop (1)',
      'OUTPUT inside loop showing the product (1)'
    ]
  },
  {
    q: `Write pseudocode that uses a <strong>nested IF</strong> statement to output the grade for a percentage <code>Mark</code>: 70+ = "A", 50–69 = "B", 40–49 = "C", below 40 = "Fail".`,
    marks: 5,
    topic: 'pseudocode',
    difficulty: 'medium',
    model: `<pre><span class="kw">IF</span> Mark &gt;= 70 <span class="kw">THEN</span>
   <span class="kw">OUTPUT</span> <span class="str">"A"</span>
<span class="kw">ELSE</span>
   <span class="kw">IF</span> Mark &gt;= 50 <span class="kw">THEN</span>
      <span class="kw">OUTPUT</span> <span class="str">"B"</span>
   <span class="kw">ELSE</span>
      <span class="kw">IF</span> Mark &gt;= 40 <span class="kw">THEN</span>
         <span class="kw">OUTPUT</span> <span class="str">"C"</span>
      <span class="kw">ELSE</span>
         <span class="kw">OUTPUT</span> <span class="str">"Fail"</span>
      <span class="kw">ENDIF</span>
   <span class="kw">ENDIF</span>
<span class="kw">ENDIF</span></pre>`,
    points: [
      'Tests Mark &gt;= 70 and outputs "A" (1)',
      'Tests Mark &gt;= 50 (inside ELSE) and outputs "B" (1)',
      'Tests Mark &gt;= 40 (inside ELSE) and outputs "C" (1)',
      'Final ELSE outputs "Fail" (1)',
      'Correct nesting with matching ENDIFs (1)'
    ]
  },
  // ============ FLOWCHARTS (3) ============
  {
    q: `Describe what each of the following flowchart shapes represents: <strong>parallelogram</strong>, <strong>rectangle</strong>, <strong>diamond</strong>.`,
    marks: 3,
    topic: 'flowcharts',
    difficulty: 'easy',
    model: `<ul>
<li><strong>Parallelogram:</strong> input or output.</li>
<li><strong>Rectangle:</strong> a process (calculation, assignment etc.).</li>
<li><strong>Diamond:</strong> a decision — a condition with two or more outgoing arrows (Yes/No).</li>
</ul>`,
    points: [
      'Parallelogram = input/output (1)',
      'Rectangle = process/calculation (1)',
      'Diamond = decision (with Yes/No branches) (1)'
    ]
  },
  {
    q: `Explain why a programmer might draw a <strong>flowchart</strong> before writing code.`,
    marks: 3,
    topic: 'flowcharts',
    difficulty: 'medium',
    model: `<ul>
<li>A flowchart gives a clear visual representation of the algorithm, which is easier to follow than text alone.</li>
<li>It helps to identify logic errors and missing branches before any code is written.</li>
<li>It can be shared with non-programmers (e.g. clients) to confirm the design, and it acts as documentation that programmers can refer back to during coding and maintenance.</li>
</ul>`,
    points: [
      'Visual/clear representation of the algorithm (1)',
      'Helps spot logic errors / missing steps early (1)',
      'Useful for communication/documentation between team members or with clients (1)'
    ]
  },
  {
    q: `A flowchart contains the steps: <em>INPUT N → IF N &lt; 0 THEN OUTPUT "Negative" ELSE OUTPUT N * N</em>. Describe what the flowchart does and identify which symbols would be used at each stage.`,
    marks: 4,
    topic: 'flowcharts',
    difficulty: 'medium',
    model: `<ul>
<li>The flowchart inputs a number N (parallelogram symbol).</li>
<li>It then tests whether N is less than 0 (diamond — decision).</li>
<li>If the condition is true, it outputs "Negative" (parallelogram).</li>
<li>If the condition is false, it calculates N × N and outputs the square (rectangle for process, parallelogram for output).</li>
</ul>
The flowchart reports whether a number is negative or, if not, outputs its square.`,
    points: [
      'Input N uses a parallelogram (1)',
      'Decision N &lt; 0 uses a diamond (1)',
      'Outputs use parallelograms; calculation N*N uses a rectangle (1)',
      'Overall description: outputs "Negative" or the square of N (1)'
    ]
  },

  // ============ TRACE (4) ============
  {
    q: `Trace the following algorithm with inputs <code>5, 3, 8</code> and state the final output.
<pre><span class="kw">DECLARE</span> Max : <span class="kw">INTEGER</span>
<span class="kw">INPUT</span> Max
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 2
   <span class="kw">INPUT</span> N
   <span class="kw">IF</span> N &gt; Max <span class="kw">THEN</span>
      Max ← N
   <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Max</pre>`,
    marks: 4,
    topic: 'trace',
    difficulty: 'medium',
    model: `<ul>
<li>First INPUT: Max = 5.</li>
<li>Iteration 1: N = 3. 3 &gt; 5 is false, so Max stays 5.</li>
<li>Iteration 2: N = 8. 8 &gt; 5 is true, so Max ← 8.</li>
<li>Output: <strong>8</strong></li>
</ul>`,
    points: [
      'Max initialised from first INPUT as 5 (1)',
      'Iteration 1: N=3, condition false, Max unchanged (1)',
      'Iteration 2: N=8, condition true, Max becomes 8 (1)',
      'Final output: 8 (1)'
    ]
  },
  {
    q: `Trace the following algorithm and state the value of <code>Total</code> at the end.
<pre>Total ← 0
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 5
   <span class="kw">IF</span> i <span class="kw">MOD</span> 2 = 0 <span class="kw">THEN</span>
      Total ← Total + i
   <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i</pre>`,
    marks: 3,
    topic: 'trace',
    difficulty: 'medium',
    model: `<ul>
<li>i=1: 1 MOD 2 = 1, not 0, skip.</li>
<li>i=2: 2 MOD 2 = 0, Total = 0 + 2 = 2.</li>
<li>i=3: skip.</li>
<li>i=4: Total = 2 + 4 = 6.</li>
<li>i=5: skip.</li>
<li>Final Total = <strong>6</strong>.</li>
</ul>`,
    points: [
      'Correctly identifies even numbers (2 and 4) are added (1)',
      'Total after i=2 is 2; after i=4 is 6 (1)',
      'Final answer: 6 (1)'
    ]
  },
  {
    q: `Complete a trace table for the algorithm below with input <code>X = 12</code> and state the output.
<pre>Count ← 0
<span class="kw">WHILE</span> X &gt; 1 <span class="kw">DO</span>
   X ← X <span class="kw">DIV</span> 2
   Count ← Count + 1
<span class="kw">ENDWHILE</span>
<span class="kw">OUTPUT</span> Count</pre>`,
    marks: 4,
    topic: 'trace',
    difficulty: 'hard',
    model: `<table border="1" cellpadding="4">
<tr><th>Iteration</th><th>X (start)</th><th>X DIV 2</th><th>Count</th></tr>
<tr><td>1</td><td>12</td><td>6</td><td>1</td></tr>
<tr><td>2</td><td>6</td><td>3</td><td>2</td></tr>
<tr><td>3</td><td>3</td><td>1</td><td>3</td></tr>
</table>
After iteration 3, X = 1 so loop exits. Output: <strong>3</strong>.`,
    points: [
      'After iteration 1: X=6, Count=1 (1)',
      'After iteration 2: X=3, Count=2 (1)',
      'After iteration 3: X=1, Count=3, loop terminates (1)',
      'Final output: 3 (1)'
    ]
  },
  {
    q: `Trace the algorithm below for the array <code>Nums = [4, 7, 2, 9, 5]</code> and state what is output.
<pre>Found ← 0
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 5
   <span class="kw">IF</span> Nums[i] &gt; 5 <span class="kw">THEN</span>
      Found ← Found + 1
   <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Found</pre>`,
    marks: 3,
    topic: 'trace',
    difficulty: 'easy',
    model: `<ul>
<li>i=1: Nums[1]=4, 4&gt;5 false.</li>
<li>i=2: 7&gt;5 true, Found=1.</li>
<li>i=3: 2&gt;5 false.</li>
<li>i=4: 9&gt;5 true, Found=2.</li>
<li>i=5: 5&gt;5 false (strict greater-than).</li>
<li>Output: <strong>2</strong>.</li>
</ul>`,
    points: [
      'Identifies 7 and 9 satisfy &gt;5 (1)',
      'Notes 5 is NOT counted because condition is strict &gt; (1)',
      'Final output: 2 (1)'
    ]
  },

  // ============ VALIDATION (3) ============
  {
    q: `Explain why a program that accepts a person's age should include <strong>validation</strong>.`,
    marks: 2,
    topic: 'validation',
    difficulty: 'easy',
    model: `Validation ensures that the data entered is reasonable and of the correct type/range before processing. For age, this prevents values such as negative numbers, letters or impossible ages (e.g. 250) from being stored, which could cause errors or produce meaningless results later.`,
    points: [
      'Ensures input is sensible/reasonable/within the expected range (1)',
      'Prevents errors or incorrect results from invalid data (e.g. negative ages, letters) (1)'
    ]
  },
  {
    q: `Describe <strong>three</strong> different types of validation check, giving an example of data each would be suitable for.`,
    marks: 3,
    topic: 'validation',
    difficulty: 'medium',
    model: `<ul>
<li><strong>Range check:</strong> ensures the value is between two limits — e.g. an age between 0 and 120.</li>
<li><strong>Length check:</strong> ensures the data has the correct number of characters — e.g. a UK phone number with 11 digits.</li>
<li><strong>Type check:</strong> ensures the data is of the correct data type — e.g. age must be an integer, not a string.</li>
</ul>
(Other valid checks: format check — postcode "LL9 9LL"; presence check — required field not blank; check digit — for ISBN/credit card.)`,
    points: [
      'One valid check named with a correct example (1)',
      'A second different valid check named with a correct example (1)',
      'A third different valid check named with a correct example (1)'
    ]
  },
  {
    q: `Write pseudocode that validates an input <code>Mark</code> so that it must be an integer in the range 0 to 100 inclusive. The user must be re-prompted until valid data is entered.`,
    marks: 4,
    topic: 'validation',
    difficulty: 'medium',
    model: `<pre><span class="kw">DECLARE</span> Mark : <span class="kw">INTEGER</span>
<span class="kw">OUTPUT</span> <span class="str">"Enter mark (0-100): "</span>
<span class="kw">INPUT</span> Mark
<span class="kw">WHILE</span> Mark &lt; 0 <span class="kw">OR</span> Mark &gt; 100 <span class="kw">DO</span>
   <span class="kw">OUTPUT</span> <span class="str">"Invalid. Re-enter: "</span>
   <span class="kw">INPUT</span> Mark
<span class="kw">ENDWHILE</span>
<span class="kw">OUTPUT</span> <span class="str">"Accepted"</span></pre>`,
    points: [
      'Initial INPUT before the loop (priming read) (1)',
      'WHILE condition checks &lt; 0 OR &gt; 100 (uses OR correctly) (1)',
      'INPUT inside the loop (re-prompt) (1)',
      'Loop ends only when value is valid; outputs after loop (1)'
    ]
  },
  // ============ TESTING (3) ============
  {
    q: `State what is meant by <strong>normal</strong>, <strong>boundary</strong>, <strong>extreme</strong> and <strong>erroneous</strong> test data. Give one example of each for an input that should be an integer between 1 and 100.`,
    marks: 4,
    topic: 'testing',
    difficulty: 'medium',
    model: `<ul>
<li><strong>Normal:</strong> typical, valid data inside the range — e.g. 50.</li>
<li><strong>Boundary:</strong> data on the limits of acceptability — e.g. 1 or 100.</li>
<li><strong>Extreme:</strong> data at the very edge of the valid range (often used interchangeably with boundary at IGCSE) — e.g. 1 and 100.</li>
<li><strong>Erroneous:</strong> data that should be rejected — e.g. -5, 101, "hello".</li>
</ul>`,
    points: [
      'Normal: any valid value inside range (e.g. 50) (1)',
      'Boundary: value on the edge of valid range (1 or 100) (1)',
      'Extreme: highest/lowest valid (or similar) value (1)',
      'Erroneous: invalid data that should be rejected (e.g. -5 / "abc") (1)'
    ]
  },
  {
    q: `A program calculates discount as 10% for amounts over £50 and 0% otherwise. Suggest <strong>three</strong> test values and state what each tests.`,
    marks: 3,
    topic: 'testing',
    difficulty: 'medium',
    model: `<ul>
<li>£50 — boundary; tests the exact boundary where discount should still be 0% (no discount given).</li>
<li>£50.01 (or £51) — boundary just above the limit; tests that discount applies once amount exceeds £50.</li>
<li>£100 — normal data clearly inside the discount range; tests typical operation gives 10% discount.</li>
</ul>`,
    points: [
      'A boundary value (e.g. 50) testing the edge of the condition (1)',
      'A value just over the boundary (e.g. 50.01 or 51) testing the &gt; 50 path (1)',
      'A normal value (e.g. 100) clearly in range (1)'
    ]
  },
  {
    q: `Describe the difference between a <strong>syntax error</strong> and a <strong>logic error</strong>. Give one example of each.`,
    marks: 4,
    topic: 'testing',
    difficulty: 'medium',
    model: `<ul>
<li>A <strong>syntax error</strong> breaks the rules of the programming language so the program cannot run/compile. Example: <code>prin("Hello")</code> in Python — the keyword is misspelt.</li>
<li>A <strong>logic error</strong> follows the language rules so the program runs, but produces the wrong output because the logic is wrong. Example: writing <code>Average ← Total * Count</code> instead of <code>Total / Count</code> when calculating an average.</li>
</ul>`,
    points: [
      'Syntax error: breaks language rules / prevents program running (1)',
      'Valid syntax-error example (1)',
      'Logic error: program runs but gives wrong/unexpected output (1)',
      'Valid logic-error example (1)'
    ]
  },
  // ============ SEARCH (3) ============
  {
    q: `State <strong>two</strong> differences between a <strong>linear search</strong> and a <strong>binary search</strong>.`,
    marks: 2,
    topic: 'search',
    difficulty: 'easy',
    model: `<ul>
<li>A linear search checks each item in turn from the start, whereas a binary search checks the middle item and discards half the list each time.</li>
<li>A linear search works on any list (sorted or not), whereas a binary search requires the list to be sorted first.</li>
</ul>
(Other valid points: linear is slower for large lists; binary is more complex to implement.)`,
    points: [
      'Linear checks each item in turn; binary checks middle and halves the list (1)',
      'Linear works on unsorted lists; binary requires sorted data (1)'
    ]
  },
  {
    q: `Describe how a <strong>binary search</strong> works to find a value in an ordered list.`,
    marks: 4,
    topic: 'search',
    difficulty: 'medium',
    model: `<ul>
<li>The list must be in order first.</li>
<li>The algorithm looks at the middle item of the list.</li>
<li>If the middle item is the value being searched for, the search ends successfully.</li>
<li>If the value is less than the middle item, the algorithm discards the upper half and repeats on the lower half; if the value is greater, it discards the lower half and repeats on the upper half. The process continues until the value is found or there are no items left (so it is not in the list).</li>
</ul>`,
    points: [
      'List is sorted first / must be in order (1)',
      'Compare target with the middle item of the current list (1)',
      'If less than middle, search lower half; if greater, search upper half (1)',
      'Repeat until found or list is empty / no items remain (1)'
    ]
  },
  {
    q: `A list of 1000 sorted items is searched. Explain why a binary search would generally be more efficient than a linear search on this list.`,
    marks: 3,
    topic: 'search',
    difficulty: 'medium',
    model: `<ul>
<li>A linear search would, in the worst case, compare every one of the 1000 items, taking up to 1000 comparisons.</li>
<li>A binary search halves the list with each comparison, so 1000 items would need at most about 10 comparisons (since 2¹⁰ = 1024).</li>
<li>Therefore the binary search requires far fewer comparisons, making it much faster for large sorted lists.</li>
</ul>`,
    points: [
      'Linear worst case = up to 1000 comparisons / one comparison per item (1)',
      'Binary halves the list each time / ~10 comparisons for 1000 items (1)',
      'Conclusion: binary is much faster/fewer comparisons on large sorted lists (1)'
    ]
  },

  // ============ SORT (2) ============
  {
    q: `Describe how a <strong>bubble sort</strong> sorts a list of numbers into ascending order.`,
    marks: 4,
    topic: 'sort',
    difficulty: 'medium',
    model: `<ul>
<li>Compare the first pair of adjacent items in the list.</li>
<li>If they are in the wrong order (first &gt; second), swap them.</li>
<li>Move along the list, repeating the comparison and swap for each adjacent pair to the end. After the first pass, the largest value is in the last position.</li>
<li>Repeat the passes; on each pass the next-largest value "bubbles" to its correct place. Stop when a pass occurs with no swaps (the list is sorted).</li>
</ul>`,
    points: [
      'Compare adjacent pairs of items (1)',
      'Swap if they are in the wrong order (1)',
      'Repeat passes through the list (1)',
      'Stop when a pass completes with no swaps / list is sorted (1)'
    ]
  },
  {
    q: `Identify <strong>two</strong> drawbacks of a bubble sort compared with other sorting algorithms.`,
    marks: 2,
    topic: 'sort',
    difficulty: 'medium',
    model: `<ul>
<li>It is slow/inefficient on large lists because it makes many comparisons and swaps (worst case n² comparisons).</li>
<li>It is inefficient on already-sorted or nearly-sorted lists when written without the optimisation flag — it still makes a full pass to check.</li>
</ul>
(Other valid: many swaps even when items already nearly in place; performs worse than insertion/quick/merge sort for the same data.)`,
    points: [
      'Slow on large lists / many comparisons (n² behaviour) (1)',
      'Inefficient / does many swaps; worse than other sorts on large data (1)'
    ]
  },

  // ============ METHODS (2) ============
  {
    q: `A program needs to find the largest value in an array <code>Scores[1:20]</code>. Describe the algorithm (totalling/finding-max technique) you would use.`,
    marks: 3,
    topic: 'methods',
    difficulty: 'medium',
    model: `<ul>
<li>Initialise a variable <code>Max</code> to the first element of the array (<code>Scores[1]</code>).</li>
<li>Loop through the rest of the array from index 2 to 20. For each element, compare it with <code>Max</code>.</li>
<li>If the current element is greater than <code>Max</code>, replace <code>Max</code> with the current element. After the loop, <code>Max</code> holds the largest value.</li>
</ul>`,
    points: [
      'Initialise Max to first element (or to a very small value) (1)',
      'Loop through the rest of the array (1)',
      'IF current element &gt; Max THEN Max ← current element (1)'
    ]
  },
  {
    q: `Describe the steps of a <strong>totalling</strong> and <strong>averaging</strong> algorithm using an array of 50 numbers.`,
    marks: 3,
    topic: 'methods',
    difficulty: 'easy',
    model: `<ul>
<li>Set a variable <code>Total</code> to 0 before the loop.</li>
<li>Loop through all 50 array elements, adding each one to <code>Total</code>.</li>
<li>After the loop, calculate the average as <code>Total / 50</code> and output it.</li>
</ul>`,
    points: [
      'Total initialised to 0 (1)',
      'Loop through array adding each element to Total (1)',
      'Average = Total / 50 after the loop (1)'
    ]
  },

  // ============ ARRAYS (3) ============
  {
    q: `Explain the difference between a <strong>one-dimensional</strong> and a <strong>two-dimensional</strong> array. Give one example of data that would suit each.`,
    marks: 3,
    topic: 'arrays',
    difficulty: 'easy',
    model: `<ul>
<li>A one-dimensional (1D) array is a linear list of items accessed by a single index — e.g. <code>Scores[1:30]</code> storing one score per student.</li>
<li>A two-dimensional (2D) array is like a table with rows and columns, accessed by two indices — e.g. <code>Marks[1:30, 1:5]</code> storing 5 subject marks for each of 30 students.</li>
<li>A 2D array is useful when data has a natural rows-and-columns structure (timetables, grids, matrices).</li>
</ul>`,
    points: [
      '1D = single list with one index, valid example (1)',
      '2D = table with rows and columns, two indices, valid example (1)',
      '2D is suitable for tabular/grid data (1)'
    ]
  },
  {
    q: `Write pseudocode that inputs 10 names into an array <code>Names[1:10]</code> and then outputs them in reverse order.`,
    marks: 4,
    topic: 'arrays',
    difficulty: 'medium',
    model: `<pre><span class="kw">DECLARE</span> Names : <span class="kw">ARRAY</span>[1:10] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 10
   <span class="kw">OUTPUT</span> <span class="str">"Enter name: "</span>
   <span class="kw">INPUT</span> Names[i]
<span class="kw">NEXT</span> i
<span class="kw">FOR</span> i ← 10 <span class="kw">TO</span> 1 <span class="kw">STEP</span> -1
   <span class="kw">OUTPUT</span> Names[i]
<span class="kw">NEXT</span> i</pre>`,
    points: [
      'Array declared correctly with 10 elements (1)',
      'FOR loop to INPUT into Names[i] from 1 to 10 (1)',
      'Second FOR loop runs from 10 down to 1 (STEP -1 or equivalent) (1)',
      'OUTPUT Names[i] inside the second loop (1)'
    ]
  },
  {
    q: `An array <code>Temps[1:7]</code> stores the temperature for each day of the week. Write pseudocode to count how many days had a temperature above 25.`,
    marks: 4,
    topic: 'arrays',
    difficulty: 'medium',
    model: `<pre><span class="kw">DECLARE</span> Count : <span class="kw">INTEGER</span>
Count ← 0
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 7
   <span class="kw">IF</span> Temps[i] &gt; 25 <span class="kw">THEN</span>
      Count ← Count + 1
   <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Count, <span class="str">" days above 25"</span></pre>`,
    points: [
      'Count initialised to 0 (1)',
      'FOR loop from 1 to 7 to traverse the array (1)',
      'IF Temps[i] &gt; 25 THEN Count ← Count + 1 (1)',
      'OUTPUT Count after the loop (1)'
    ]
  },

  // ============ FUNCTIONS (3) ============
  {
    q: `Compare a <strong>procedure</strong> and a <strong>function</strong> as types of subroutine.`,
    marks: 4,
    topic: 'functions',
    difficulty: 'medium',
    model: `<ul>
<li>Both are named blocks of code (subroutines) that can be called from elsewhere in a program.</li>
<li>A function returns a single value to the call point; a procedure does not return a value.</li>
<li>A function is typically called as part of an expression (e.g. <code>x ← Square(5) + 1</code>); a procedure is called as a complete statement (e.g. <code>CALL DrawLine</code>).</li>
<li>Both can take parameters, but a function is normally used when a result is needed back, and a procedure when an action is to be performed.</li>
</ul>`,
    points: [
      'Both are named subroutines / can take parameters (1)',
      'Function returns a value; procedure does not (1)',
      'Function called within an expression; procedure called as a statement (1)',
      'Function used to compute/return; procedure used to perform actions (1)'
    ]
  },
  {
    q: `Explain the difference between <strong>passing a parameter by value</strong> and the use of <strong>local</strong> and <strong>global</strong> variables in subroutines.`,
    marks: 5,
    topic: 'functions',
    difficulty: 'hard',
    model: `<ul>
<li>A parameter passed by value gives the subroutine a copy of the data; the original variable in the calling code cannot be changed by the subroutine.</li>
<li>A local variable is declared inside a subroutine and exists only while the subroutine runs; its scope is limited to that subroutine.</li>
<li>A global variable is declared outside any subroutine and can be accessed and changed by any subroutine in the program.</li>
<li>Using local variables and parameters by value makes subroutines self-contained, reusable and easier to debug.</li>
<li>Global variables can cause side-effects: a change in one place affects the rest of the program, making bugs harder to find.</li>
</ul>`,
    points: [
      'By value = a copy is passed; original is unchanged (1)',
      'Local variable: only exists inside subroutine / limited scope (1)',
      'Global variable: accessible everywhere in the program (1)',
      'Local + parameters make subroutines self-contained/reusable (1)',
      'Global variables risk side-effects / harder to maintain (1)'
    ]
  },
  {
    q: `Write pseudocode for a <strong>function</strong> <code>Cube</code> that takes an integer parameter and returns the cube of that integer. Then show how it would be called to output the cube of 4.`,
    marks: 3,
    topic: 'functions',
    difficulty: 'medium',
    model: `<pre><span class="kw">FUNCTION</span> Cube(N : <span class="kw">INTEGER</span>) <span class="kw">RETURNS</span> <span class="kw">INTEGER</span>
   <span class="kw">RETURN</span> N * N * N
<span class="kw">ENDFUNCTION</span>

<span class="com">// Calling the function</span>
<span class="kw">OUTPUT</span> Cube(4)</pre>`,
    points: [
      'Correct FUNCTION header with parameter and RETURNS type (1)',
      'RETURN of N*N*N (or equivalent) (1)',
      'Function called correctly within an OUTPUT statement (1)'
    ]
  },

  // ============ FILES (2) ============
  {
    q: `Describe how a program can <strong>read</strong> data from a text file line by line and output each line.`,
    marks: 3,
    topic: 'files',
    difficulty: 'medium',
    model: `<pre><span class="kw">OPENFILE</span> <span class="str">"data.txt"</span> <span class="kw">FOR</span> <span class="kw">READ</span>
<span class="kw">WHILE</span> <span class="kw">NOT</span> <span class="kw">EOF</span>(<span class="str">"data.txt"</span>) <span class="kw">DO</span>
   <span class="kw">READFILE</span> <span class="str">"data.txt"</span>, Line
   <span class="kw">OUTPUT</span> Line
<span class="kw">ENDWHILE</span>
<span class="kw">CLOSEFILE</span> <span class="str">"data.txt"</span></pre>
The file is opened for reading, a loop runs until the end-of-file marker is reached, each line is read into a variable and output, then the file is closed.`,
    points: [
      'OPENFILE … FOR READ before reading (1)',
      'Loop continues WHILE NOT EOF (1)',
      'READFILE into variable + OUTPUT, then CLOSEFILE at the end (1)'
    ]
  },
  {
    q: `Explain why it is important to <strong>close</strong> a file once a program has finished using it.`,
    marks: 2,
    topic: 'files',
    difficulty: 'easy',
    model: `<ul>
<li>Closing the file flushes/saves any data still in the buffer so that changes are written to disk and not lost.</li>
<li>It releases the file so other programs/users can access it and frees system resources used to keep the file open.</li>
</ul>`,
    points: [
      'Ensures buffered data is saved / changes written to disk (1)',
      'Releases the file/resources so it can be used by other processes (1)'
    ]
  },

  // ============ PYTHON (3) ============
  {
    q: `Write a Python program that asks the user for an integer and outputs whether it is <strong>even</strong> or <strong>odd</strong>.`,
    marks: 3,
    topic: 'python',
    difficulty: 'easy',
    model: `<pre><span class="kw">num</span> = <span class="fn">int</span>(<span class="fn">input</span>(<span class="str">"Enter an integer: "</span>))
<span class="kw">if</span> num % <span class="num">2</span> == <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">"Even"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Odd"</span>)</pre>`,
    points: [
      'input() used and converted with int() (1)',
      'Correct use of % operator with == 0 (1)',
      'if/else with two correct outputs (1)'
    ]
  },
  {
    q: `Write a Python program that reads 5 numbers into a list and outputs the largest of them. Do not use the built-in <code>max()</code> function.`,
    marks: 5,
    topic: 'python',
    difficulty: 'medium',
    model: `<pre><span class="kw">nums</span> = []
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    nums.<span class="fn">append</span>(<span class="fn">int</span>(<span class="fn">input</span>(<span class="str">"Enter a number: "</span>)))

largest = nums[<span class="num">0</span>]
<span class="kw">for</span> n <span class="kw">in</span> nums:
    <span class="kw">if</span> n &gt; largest:
        largest = n
<span class="fn">print</span>(<span class="str">"Largest is"</span>, largest)</pre>`,
    points: [
      'Empty list created and 5 numbers appended via a loop (1)',
      'Numbers converted to int on input (1)',
      'Variable initialised to first element (or very small value) (1)',
      'Loop through list comparing each value to current largest (1)',
      'Output of the largest value after the loop (1)'
    ]
  },
  {
    q: `A student writes this Python code intending to print the average of the numbers 4, 8 and 6. Identify the error and explain how to correct it.
<pre>nums = [<span class="num">4</span>, <span class="num">8</span>, <span class="num">6</span>]
total = <span class="num">0</span>
<span class="kw">for</span> n <span class="kw">in</span> nums:
    total + n
<span class="fn">print</span>(total / <span class="fn">len</span>(nums))</pre>`,
    marks: 3,
    topic: 'python',
    difficulty: 'medium',
    model: `<ul>
<li>The line <code>total + n</code> calculates a value but never stores it; <code>total</code> stays 0 throughout the loop.</li>
<li>It should be <code>total = total + n</code> (or <code>total += n</code>) so that each number is added to <code>total</code>.</li>
<li>After fixing, <code>total</code> = 18 and the program prints 6.0 — the correct average.</li>
</ul>`,
    points: [
      'Identifies that total is never updated / total + n has no effect (1)',
      'Correction: total = total + n (or total += n) (1)',
      'States that after fixing, the output is the correct average (e.g. 6.0) (1)'
    ]
  },

  // ============ SQL (4) ============
  {
    q: `Describe what is meant by a <strong>primary key</strong> in a database table.`,
    marks: 2,
    topic: 'sql',
    difficulty: 'easy',
    model: `A primary key is a field (or combination of fields) that <strong>uniquely identifies each record</strong> in a table. Its values cannot be null and cannot be duplicated, so it is used to distinguish one record from any other in the same table.`,
    points: [
      'Uniquely identifies each record in the table (1)',
      'No duplicate values / cannot be null (1)'
    ]
  },
  {
    q: `A table <code>BOOK</code> has fields: <code>BookID, Title, Author, Year, Price</code>. Write an SQL query that returns the <code>Title</code> and <code>Author</code> of all books published <strong>after 2020</strong>, ordered by <code>Title</code> in ascending order.`,
    marks: 3,
    topic: 'sql',
    difficulty: 'medium',
    model: `<pre><span class="kw">SELECT</span> Title, Author
<span class="kw">FROM</span> BOOK
<span class="kw">WHERE</span> Year &gt; <span class="num">2020</span>
<span class="kw">ORDER BY</span> Title <span class="kw">ASC</span>;</pre>`,
    points: [
      'SELECT Title, Author FROM BOOK (1)',
      'WHERE Year &gt; 2020 (1)',
      'ORDER BY Title (ASC optional but implied) (1)'
    ]
  },
  {
    q: `A table <code>STUDENT</code> contains fields: <code>StudentID, Name, YearGroup, Mark</code>. Write an SQL query that returns the <strong>average mark</strong> for students in <code>YearGroup = 11</code>.`,
    marks: 3,
    topic: 'sql',
    difficulty: 'medium',
    model: `<pre><span class="kw">SELECT</span> <span class="fn">AVG</span>(Mark)
<span class="kw">FROM</span> STUDENT
<span class="kw">WHERE</span> YearGroup = <span class="num">11</span>;</pre>`,
    points: [
      'SELECT with AVG(Mark) (1)',
      'FROM STUDENT (1)',
      'WHERE YearGroup = 11 (1)'
    ]
  },
  {
    q: `A table <code>MEMBER</code> has fields: <code>MemberID, FirstName, Surname, JoinDate, Active</code>. Write an SQL query that returns the <code>FirstName</code> and <code>Surname</code> of all <strong>active</strong> members whose surname begins with the letter <strong>S</strong>.`,
    marks: 4,
    topic: 'sql',
    difficulty: 'hard',
    model: `<pre><span class="kw">SELECT</span> FirstName, Surname
<span class="kw">FROM</span> MEMBER
<span class="kw">WHERE</span> Active = <span class="kw">TRUE</span>
  <span class="kw">AND</span> Surname <span class="kw">LIKE</span> <span class="str">"S%"</span>;</pre>
(<code>Active = TRUE</code> or <code>Active = 1</code> are both acceptable depending on syntax used.)`,
    points: [
      'SELECT FirstName, Surname FROM MEMBER (1)',
      'WHERE Active = TRUE (or = 1) (1)',
      'AND Surname LIKE "S%" (1)',
      'Use of LIKE with "S%" wildcard correctly placed (1)'
    ]
  },

  // ============ ERRORS (3) ============
  {
    q: `Identify <strong>two</strong> errors in the following pseudocode and describe how to correct each one. The intention is to input 5 numbers and output their total.
<pre>Total ← 0
<span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 4
   <span class="kw">INPUT</span> Number
   Total ← Total * Number
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> Total</pre>`,
    marks: 4,
    topic: 'errors',
    difficulty: 'medium',
    model: `<ul>
<li><strong>Error 1:</strong> The loop runs from 1 to 4, only 4 iterations. It should be <code>FOR i ← 1 TO 5</code> so all five numbers are input.</li>
<li><strong>Error 2:</strong> The line <code>Total ← Total * Number</code> multiplies instead of adds, and because Total is 0 the result will always be 0. It should be <code>Total ← Total + Number</code>.</li>
</ul>`,
    points: [
      'Identifies loop should be 1 TO 5 (1)',
      'States correction (FOR i ← 1 TO 5) (1)',
      'Identifies Total * Number should be Total + Number (1)',
      'States correction (Total ← Total + Number) (1)'
    ]
  },
  {
    q: `Identify <strong>three</strong> errors in this pseudocode that should validate that <code>Age</code> is between 0 and 120 inclusive.
<pre><span class="kw">INPUT</span> Age
<span class="kw">WHILE</span> Age &lt; 0 <span class="kw">AND</span> Age &gt; 120
   <span class="kw">OUTPUT</span> <span class="str">"Invalid"</span>
<span class="kw">ENDWHILE</span></pre>`,
    marks: 3,
    topic: 'errors',
    difficulty: 'hard',
    model: `<ul>
<li><strong>Error 1:</strong> The condition uses <code>AND</code> — a value cannot be both less than 0 AND greater than 120 simultaneously. It should be <code>OR</code>.</li>
<li><strong>Error 2:</strong> There is no <code>INPUT</code> inside the loop, so the value of <code>Age</code> never changes — this would cause an infinite loop if entered.</li>
<li><strong>Error 3:</strong> The condition uses strict <code>&lt;</code> and <code>&gt;</code>, which would exclude 0 and 120 but the question says inclusive — should be <code>&lt; 0 OR &gt; 120</code> (these are fine), or equivalently use <code>NOT (Age &gt;= 0 AND Age &lt;= 120)</code>. (Many mark schemes accept the original boundaries; the main two errors are AND and missing INPUT.)</li>
</ul>`,
    points: [
      'AND should be OR in the condition (1)',
      'Missing INPUT Age inside the loop to re-prompt (1)',
      'Any third valid error (e.g. no ENDWHILE check, boundaries inclusive, missing prompt) (1)'
    ]
  },
  {
    q: `A student writes the pseudocode below intending to output the squares of the numbers 1 to 5. Identify the error and explain how to correct it.
<pre><span class="kw">FOR</span> i ← 1 <span class="kw">TO</span> 5
   Square ← i + i
   <span class="kw">OUTPUT</span> Square
<span class="kw">NEXT</span> i</pre>`,
    marks: 2,
    topic: 'errors',
    difficulty: 'easy',
    model: `<ul>
<li>The line <code>Square ← i + i</code> doubles the value instead of squaring it. For i = 3 it would output 6 instead of 9.</li>
<li>The correction is <code>Square ← i * i</code> (or <code>i ^ 2</code>) so the value is squared correctly.</li>
</ul>`,
    points: [
      'Identifies i + i doubles instead of squaring (1)',
      'Correction: Square ← i * i (1)'
    ]
  },

  // ============ DATATYPES (1) ============
  {
    q: `State the most appropriate data type for each of the following items and justify your choice.
<ol>
<li>The price of an item in pounds and pence.</li>
<li>Whether a student has paid (yes/no).</li>
<li>A student's surname.</li>
</ol>`,
    marks: 6,
    topic: 'datatypes',
    difficulty: 'medium',
    model: `<ol>
<li><strong>Price:</strong> REAL (floating-point) — because the value has a decimal/fractional part (e.g. 4.99).</li>
<li><strong>Paid:</strong> BOOLEAN — because there are exactly two possible values (TRUE/FALSE or yes/no).</li>
<li><strong>Surname:</strong> STRING — because it stores a sequence of characters/letters of variable length.</li>
</ol>`,
    points: [
      'Price: REAL (1)',
      'Justification: needs decimal places for pence (1)',
      'Paid: BOOLEAN (1)',
      'Justification: only two possible values (TRUE/FALSE) (1)',
      'Surname: STRING (1)',
      'Justification: stores a sequence of characters/letters (1)'
    ]
  }
];
