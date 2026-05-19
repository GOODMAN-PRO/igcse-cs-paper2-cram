window.QUIZ_BANK = [
  // ===== LIFECYCLE (8 questions) =====
  {
    q: 'Which stage of the program development life cycle involves breaking a problem into smaller, manageable parts?',
    a: ['Analysis', 'Design', 'Coding', 'Testing'],
    correct: 0,
    topic: 'lifecycle',
    difficulty: 'easy',
    explain: 'Analysis is where the problem is examined, requirements identified, and the problem decomposed into sub-problems before design begins.'
  },
  {
    q: 'During which life-cycle stage are structure diagrams and flowcharts typically produced?',
    a: ['Analysis', 'Design', 'Coding', 'Maintenance'],
    correct: 1,
    topic: 'lifecycle',
    difficulty: 'easy',
    explain: 'Design is where solutions are planned using tools like structure diagrams, flowcharts, and pseudocode before any code is written.'
  },
  {
    q: 'A program is released and a user reports a bug six months later. The developer fixes it. This is part of which stage?',
    a: ['Testing', 'Design', 'Maintenance', 'Analysis'],
    correct: 2,
    topic: 'lifecycle',
    difficulty: 'medium',
    explain: 'Maintenance covers fixing bugs, adapting to new requirements, and improvements after the program is in use.'
  },
  {
    q: 'Which of these is NOT typically considered part of the analysis stage?',
    a: ['Identifying inputs and outputs', 'Determining requirements', 'Writing pseudocode', 'Identifying the problem'],
    correct: 2,
    topic: 'lifecycle',
    difficulty: 'medium',
    explain: 'Writing pseudocode is a design activity. Analysis focuses on understanding the problem and its requirements.'
  },
  {
    q: 'What is the correct order of stages in the program development life cycle?',
    a: ['Design, Analysis, Coding, Testing', 'Analysis, Design, Coding, Testing', 'Coding, Testing, Design, Analysis', 'Analysis, Coding, Design, Testing'],
    correct: 1,
    topic: 'lifecycle',
    difficulty: 'easy',
    explain: 'The standard order is Analysis (understand), Design (plan), Coding (implement), Testing (verify).'
  },
  {
    q: 'Which design tool shows the hierarchy of modules in a program?',
    a: ['Flowchart', 'Structure diagram', 'Trace table', 'Test plan'],
    correct: 1,
    topic: 'lifecycle',
    difficulty: 'medium',
    explain: 'Structure diagrams show how a problem is decomposed hierarchically into sub-problems and modules.'
  },
  {
    q: 'In the design stage, a programmer writes Cambridge pseudocode. What is the main advantage of doing this before coding?',
    a: ['It runs faster than real code', 'It is language-independent and focuses on logic', 'It checks syntax automatically', 'It compiles to machine code'],
    correct: 1,
    topic: 'lifecycle',
    difficulty: 'hard',
    explain: 'Pseudocode lets the programmer focus on the algorithm without worrying about a specific language\'s syntax rules.'
  },
  {
    q: 'A team produces a list of inputs, processes, outputs and storage requirements. Which stage are they in?',
    a: ['Analysis', 'Design', 'Coding', 'Testing'],
    correct: 0,
    topic: 'lifecycle',
    difficulty: 'medium',
    explain: 'Analysis identifies the IPO (Input, Process, Output) and storage requirements — what the system must do.'
  },

  // ===== CT (5 questions) =====
  {
    q: 'What is decomposition in computational thinking?',
    a: ['Removing unnecessary detail from a problem', 'Breaking a problem into smaller sub-problems', 'Identifying patterns between problems', 'Writing step-by-step instructions'],
    correct: 1,
    topic: 'ct',
    difficulty: 'easy',
    explain: 'Decomposition means breaking a complex problem down into smaller, more manageable parts that can each be solved separately.'
  },
  {
    q: 'A car rental program ignores the colour of cars when calculating prices. This is an example of:',
    a: ['Decomposition', 'Abstraction', 'Iteration', 'Sequencing'],
    correct: 1,
    topic: 'ct',
    difficulty: 'medium',
    explain: 'Abstraction is removing or ignoring details that are not relevant to the problem being solved.'
  },
  {
    q: 'Which of these best describes pattern recognition?',
    a: ['Finding similarities between problems to reuse solutions', 'Hiding details inside a function', 'Repeating a block of code', 'Drawing flowcharts'],
    correct: 0,
    topic: 'ct',
    difficulty: 'hard',
    explain: 'Pattern recognition identifies similarities or trends, allowing solutions to be reused or generalised across problems.'
  },
  {
    q: 'A student decomposes a quiz program into: ask question, check answer, update score, show result. This is BEST described as:',
    a: ['Abstraction', 'Decomposition', 'Validation', 'Verification'],
    correct: 1,
    topic: 'ct',
    difficulty: 'easy',
    explain: 'Breaking the larger quiz problem into smaller named sub-problems is the definition of decomposition.'
  },
  {
    q: 'Which of these is an example of abstraction in a map app?',
    a: ['Listing every pothole on the route', 'Showing roads as lines without their width', 'Including 3D building textures', 'Recording each car\'s number plate'],
    correct: 1,
    topic: 'ct',
    difficulty: 'hard',
    explain: 'Abstraction keeps only the detail needed (roads as lines for navigation) and removes detail irrelevant to the task (exact width, textures).'
  },

  // ===== PSEUDOCODE (12 questions) =====
  {
    q: 'Which symbol is used for assignment in Cambridge pseudocode?',
    a: ['=', '←', ':=', '=='],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'Cambridge pseudocode uses ← for assignment. = is used for equality comparison.'
  },
  {
    q: 'Which loop structure is BEST when you do not know in advance how many iterations are needed?',
    a: ['FOR ... NEXT', 'REPEAT ... UNTIL', 'WHILE ... ENDWHILE', 'Either WHILE or REPEAT'],
    correct: 3,
    topic: 'pseudocode',
    difficulty: 'hard',
    explain: 'FOR loops are for known counts. WHILE and REPEAT are both condition-controlled and used when the count is unknown.'
  },
  {
    q: 'What is the difference between WHILE and REPEAT loops in pseudocode?',
    a: ['WHILE always runs at least once; REPEAT may not', 'REPEAT always runs at least once; WHILE may not', 'They are identical', 'WHILE counts iterations; REPEAT does not'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'medium',
    explain: 'REPEAT ... UNTIL checks the condition at the end, so the body runs at least once. WHILE checks at the start, so it may not run at all.'
  },
  {
    q: 'Which pseudocode keyword is used for reading user input?',
    a: ['READ', 'INPUT', 'GET', 'SCAN'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'Cambridge pseudocode uses INPUT to read from the user and OUTPUT to display values.'
  },
  {
    q: 'Which data type would be used to store the value <code>TRUE</code> in pseudocode?',
    a: ['INTEGER', 'STRING', 'BOOLEAN', 'CHAR'],
    correct: 2,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'BOOLEAN values are TRUE or FALSE. CHAR is a single character, STRING is text, INTEGER is a whole number.'
  },
  {
    q: 'In Cambridge pseudocode, how is a multi-branch decision usually written?',
    a: ['IF ... ELSEIF ... ENDIF', 'CASE OF ... OTHERWISE ... ENDCASE', 'SWITCH ... BREAK', 'SELECT ... WHEN'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'hard',
    explain: 'CASE OF ... ENDCASE is the multi-branch selection structure in Cambridge pseudocode, with OTHERWISE as the default branch.'
  },
  {
    q: 'Which is the correct way to declare a 1D array of 10 integers in Cambridge pseudocode?',
    a: ['DECLARE Nums : ARRAY[1:10] OF INTEGER', 'INTEGER Nums[10]', 'Nums = [10]INT', 'DIM Nums(10) AS INTEGER'],
    correct: 0,
    topic: 'pseudocode',
    difficulty: 'hard',
    explain: 'Cambridge syntax: DECLARE name : ARRAY[lower:upper] OF type. The bounds are inclusive.'
  },
  {
    q: 'What does <code>MOD</code> do in Cambridge pseudocode?',
    a: ['Returns the integer quotient', 'Returns the remainder after division', 'Rounds a number down', 'Returns the absolute value'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'MOD gives the remainder of integer division. For example 17 MOD 5 = 2. DIV gives the quotient.'
  },
  {
    q: 'What is the correct syntax for a count-controlled loop counting from 1 to 5?',
    a: ['FOR i ← 1 TO 5 ... NEXT i', 'FOR i = 1, 5 ... ENDFOR', 'LOOP i FROM 1 UNTIL 5', 'FOR i IN 1..5'],
    correct: 0,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'Cambridge format: FOR variable ← start TO end ... NEXT variable. The end value is inclusive.'
  },
  {
    q: 'Which operator gives logical AND in Cambridge pseudocode?',
    a: ['&&', 'AND', '+', '&'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'easy',
    explain: 'Cambridge pseudocode uses the keywords AND, OR and NOT — not symbolic operators like && or ||.'
  },
  {
    q: 'Which line is a valid string concatenation in pseudocode?',
    a: ['Name ← "Hello" + " World"', 'Name ← "Hello" & " World"', 'Name ← CONCAT("Hello", " World")', 'Name ← "Hello", " World"'],
    correct: 1,
    topic: 'pseudocode',
    difficulty: 'hard',
    explain: 'Cambridge pseudocode uses & for string concatenation. + is reserved for numeric addition.'
  },
  {
    q: 'What is wrong with this loop?<br><code>FOR i &lt;- 1 TO 10<br>&nbsp;&nbsp;OUTPUT i<br>ENDFOR</code>',
    a: ['Missing NEXT i', 'OUTPUT should be PRINT', 'FOR should be REPEAT', 'i should be declared first'],
    correct: 0,
    topic: 'pseudocode',
    difficulty: 'medium',
    explain: 'Cambridge FOR loops must close with NEXT followed by the loop variable, not ENDFOR.'
  },

  // ===== FLOWCHARTS (6 questions) =====
  {
    q: 'In a flowchart, which symbol is used to represent a decision?',
    a: ['Rectangle', 'Parallelogram', 'Diamond (rhombus)', 'Oval'],
    correct: 2,
    topic: 'flowcharts',
    difficulty: 'easy',
    explain: 'A diamond/rhombus indicates a decision with two or more output paths (e.g. Yes/No). Rectangles are processes.'
  },
  {
    q: 'A parallelogram in a flowchart represents:',
    a: ['A decision', 'Input or output', 'A process', 'Start or stop'],
    correct: 1,
    topic: 'flowcharts',
    difficulty: 'easy',
    explain: 'Parallelograms are used for input and output operations. Processes use rectangles.'
  },
  {
    q: 'The start/stop symbol in a flowchart is a:',
    a: ['Rounded rectangle (terminator)', 'Triangle', 'Circle with a dot', 'Diamond'],
    correct: 0,
    topic: 'flowcharts',
    difficulty: 'easy',
    explain: 'Terminators (start/stop) are drawn as rounded rectangles or stadium shapes.'
  },
  {
    q: 'Which shape would be used for the calculation <code>total &lt;- price * quantity</code> in a flowchart?',
    a: ['Diamond', 'Parallelogram', 'Rectangle', 'Oval'],
    correct: 2,
    topic: 'flowcharts',
    difficulty: 'medium',
    explain: 'Assignments and calculations are processes, represented by rectangles.'
  },
  {
    q: 'A flowchart contains a diamond labelled "score >= 50?" with arrows leaving "Yes" and "No". This is which programming construct?',
    a: ['Sequence', 'Selection', 'Iteration', 'Assignment'],
    correct: 1,
    topic: 'flowcharts',
    difficulty: 'medium',
    explain: 'A decision with two branches represents selection (IF/ELSE). Iteration would loop back to a previous step.'
  },
  {
    q: 'In a flowchart, an arrow returning from below a decision back to a process above it represents:',
    a: ['Sequence', 'Selection', 'Iteration (a loop)', 'A subroutine call'],
    correct: 2,
    topic: 'flowcharts',
    difficulty: 'hard',
    explain: 'A backward arrow forms a loop — the decision controls whether to repeat the process, which is iteration.'
  },

  // ===== TRACE (8 questions) =====
  {
    q: 'What does this Python output?<br><code>x = 5<br>for i in range(3):<br>&nbsp;&nbsp;&nbsp;&nbsp;x = x + i<br>print(x)</code>',
    a: ['5', '8', '11', '15'],
    correct: 1,
    topic: 'trace',
    difficulty: 'medium',
    explain: 'Loop iterates i=0,1,2. x becomes 5+0=5, 5+1=6, 6+2=8.'
  },
  {
    q: 'What is output?<br><code>a = 10<br>b = 3<br>print(a // b)<br>print(a % b)</code>',
    a: ['3.33 and 1', '3 and 1', '3 and 0', '4 and 1'],
    correct: 1,
    topic: 'trace',
    difficulty: 'easy',
    explain: '// is integer (floor) division: 10 // 3 = 3. % is modulo: 10 % 3 = 1.'
  },
  {
    q: 'What does this pseudocode output?<br><code>total &lt;- 0<br>FOR i &lt;- 1 TO 4<br>&nbsp;&nbsp;total &lt;- total + i<br>NEXT i<br>OUTPUT total</code>',
    a: ['4', '10', '6', '0'],
    correct: 1,
    topic: 'trace',
    difficulty: 'easy',
    explain: 'Sum of 1+2+3+4 = 10. The loop runs four times with i = 1,2,3,4.'
  },
  {
    q: 'What does this Python output?<br><code>nums = [4, 7, 2, 9, 5]<br>m = nums[0]<br>for n in nums:<br>&nbsp;&nbsp;&nbsp;&nbsp;if n &gt; m:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m = n<br>print(m)</code>',
    a: ['4', '9', '5', '27'],
    correct: 1,
    topic: 'trace',
    difficulty: 'hard',
    explain: 'This finds the maximum value in the list. The largest of 4,7,2,9,5 is 9.'
  },
  {
    q: 'What does this pseudocode output?<br><code>x &lt;- 1<br>WHILE x &lt; 10<br>&nbsp;&nbsp;x &lt;- x * 2<br>ENDWHILE<br>OUTPUT x</code>',
    a: ['8', '10', '16', '32'],
    correct: 2,
    topic: 'trace',
    difficulty: 'medium',
    explain: 'x doubles: 1, 2, 4, 8. After 8 (<10), it becomes 16. 16 is not less than 10, so the loop stops.'
  },
  {
    q: 'What does this Python output?<br><code>s = "Computer"<br>print(s[2:5])</code>',
    a: ['Com', 'mpu', 'mput', 'omp'],
    correct: 1,
    topic: 'trace',
    difficulty: 'medium',
    explain: 'Slicing s[2:5] takes characters at indexes 2, 3, 4 (5 is exclusive): m, p, u → "mpu".'
  },
  {
    q: 'What is output?<br><code>count = 0<br>for i in range(1, 11):<br>&nbsp;&nbsp;&nbsp;&nbsp;if i % 2 == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count = count + 1<br>print(count)</code>',
    a: ['4', '5', '6', '10'],
    correct: 1,
    topic: 'trace',
    difficulty: 'hard',
    explain: 'range(1,11) gives 1..10. Evens are 2,4,6,8,10 — five values, so count = 5.'
  },
  {
    q: 'What does this pseudocode output?<br><code>x &lt;- 7<br>y &lt;- 3<br>IF x &gt; y AND x MOD 2 = 1 THEN<br>&nbsp;&nbsp;OUTPUT "A"<br>ELSE<br>&nbsp;&nbsp;OUTPUT "B"<br>ENDIF</code>',
    a: ['A', 'B', 'AB', 'Nothing'],
    correct: 0,
    topic: 'trace',
    difficulty: 'hard',
    explain: '7 > 3 is TRUE. 7 MOD 2 = 1 is TRUE. TRUE AND TRUE = TRUE, so "A" is output.'
  },

  // ===== VALIDATION (7 questions) =====
  {
    q: 'A program only accepts ages between 0 and 120 inclusive. This is a:',
    a: ['Range check', 'Length check', 'Type check', 'Format check'],
    correct: 0,
    topic: 'validation',
    difficulty: 'easy',
    explain: 'A range check ensures a value falls between an upper and lower bound (inclusive or exclusive).'
  },
  {
    q: 'A program checks that a password is at least 8 characters long. This is a:',
    a: ['Range check', 'Length check', 'Presence check', 'Format check'],
    correct: 1,
    topic: 'validation',
    difficulty: 'easy',
    explain: 'A length check verifies the number of characters in a string meets a minimum or maximum requirement.'
  },
  {
    q: 'A registration form refuses to submit if the email field is left blank. This is a:',
    a: ['Length check', 'Range check', 'Presence check', 'Type check'],
    correct: 2,
    topic: 'validation',
    difficulty: 'easy',
    explain: 'A presence check ensures that data has actually been entered (the field is not empty).'
  },
  {
    q: 'A program rejects "abc" when an integer is expected. This is a:',
    a: ['Format check', 'Type check', 'Range check', 'Length check'],
    correct: 1,
    topic: 'validation',
    difficulty: 'hard',
    explain: 'A type check ensures the data is of the correct data type (integer, real, character, etc.).'
  },
  {
    q: 'A phone number must match the pattern <code>NNN-NNN-NNNN</code> where N is a digit. The check used is:',
    a: ['Type check', 'Length check', 'Format check', 'Range check'],
    correct: 2,
    topic: 'validation',
    difficulty: 'medium',
    explain: 'A format check verifies that data follows a specific pattern (mask), e.g. specific characters in specific positions.'
  },
  {
    q: 'A check digit added to the end of a barcode is used to:',
    a: ['Shorten the barcode', 'Detect errors in the digits read', 'Encrypt the data', 'Compress the data'],
    correct: 1,
    topic: 'validation',
    difficulty: 'medium',
    explain: 'A check digit is computed from the other digits; if the recalculated digit does not match, an error in entry/reading is detected.'
  },
  {
    q: 'Which of these is verification, NOT validation?',
    a: ['Range check on age', 'Format check on a postcode', 'Double-entry of a password', 'Length check on a username'],
    correct: 2,
    topic: 'validation',
    difficulty: 'hard',
    explain: 'Verification confirms data was entered correctly (e.g. by double-entry or visual check). Validation checks data is reasonable/sensible.'
  },

  // ===== TESTING (6 questions) =====
  {
    q: 'For age range 0-120 inclusive, which value is a BOUNDARY test?',
    a: ['60', '0', '"abc"', '-1'],
    correct: 1,
    topic: 'testing',
    difficulty: 'easy',
    explain: 'Boundary values are exactly at the edges of the valid range. 0 (and 120) are the boundaries.'
  },
  {
    q: 'For age range 0-120 inclusive, which is ABNORMAL (invalid) test data?',
    a: ['50', '120', '0', '150'],
    correct: 3,
    topic: 'testing',
    difficulty: 'easy',
    explain: 'Abnormal/erroneous data lies outside the accepted range or is the wrong type. 150 > 120 is invalid.'
  },
  {
    q: 'Which of these is an example of a LOGIC error?',
    a: ['Missing semicolon', 'Using + instead of - in a calculation', 'Dividing by zero at runtime', 'Mistyping a keyword'],
    correct: 1,
    topic: 'testing',
    difficulty: 'medium',
    explain: 'Logic errors produce wrong output even though the program runs. Syntax errors stop compilation; runtime errors crash execution.'
  },
  {
    q: 'A program crashes when the user enters 0 as the divisor. This is a:',
    a: ['Syntax error', 'Logic error', 'Runtime error', 'Compilation error'],
    correct: 2,
    topic: 'testing',
    difficulty: 'hard',
    explain: 'Runtime errors occur while the program executes — division by zero is a classic example.'
  },
  {
    q: 'What is the purpose of a trace table?',
    a: ['Plan the user interface', 'Record values of variables at each step to dry-run code', 'List test cases for testing', 'Document syntax errors'],
    correct: 1,
    topic: 'testing',
    difficulty: 'medium',
    explain: 'Trace tables track variable values line by line, used to manually dry-run an algorithm and check logic.'
  },
  {
    q: 'A test plan includes "normal", "boundary" and "abnormal" data. Which is the strongest reason to test all three?',
    a: ['To make the test plan longer', 'To check that valid, edge, and invalid inputs are all handled correctly', 'To slow execution', 'To find syntax errors'],
    correct: 1,
    topic: 'testing',
    difficulty: 'hard',
    explain: 'Comprehensive testing must cover typical inputs (normal), edge cases (boundary), and rejection of invalid inputs (abnormal).'
  },

  // ===== SEARCH (6 questions) =====
  {
    q: 'Which search algorithm checks each element in order until found or list ends?',
    a: ['Binary search', 'Linear search', 'Bubble sort', 'Hash search'],
    correct: 1,
    topic: 'search',
    difficulty: 'easy',
    explain: 'Linear (sequential) search examines elements one by one. It works on any list, sorted or not.'
  },
  {
    q: 'For binary search to work, the list MUST be:',
    a: ['Unsorted', 'In ascending order or descending order', 'Stored in a 2D array', 'Of size 2^n'],
    correct: 1,
    topic: 'search',
    difficulty: 'easy',
    explain: 'Binary search relies on dividing the search space in half by comparing to the middle element, which only works on sorted data.'
  },
  {
    q: 'For a list of 1000 sorted items, approximately how many comparisons does binary search need in the worst case?',
    a: ['1000', '500', '10', '100'],
    correct: 2,
    topic: 'search',
    difficulty: 'hard',
    explain: 'Binary search is O(log n). log2(1000) ≈ 10, so about 10 comparisons in the worst case.'
  },
  {
    q: 'Which statement about linear search is TRUE?',
    a: ['It requires sorted data', 'It checks the middle element first', 'It is generally faster than binary search on large sorted lists', 'It works on both sorted and unsorted lists'],
    correct: 3,
    topic: 'search',
    difficulty: 'medium',
    explain: 'Linear search makes no assumption about order, so it works on any list. Binary search is faster on sorted data.'
  },
  {
    q: 'Binary search on <code>[3,7,11,15,22,30,41]</code> looking for 22. What is the first value compared?',
    a: ['3', '15', '22', '41'],
    correct: 1,
    topic: 'search',
    difficulty: 'medium',
    explain: 'The middle of 7 items is index 3, value 15. 22 > 15 so the search continues in the upper half.'
  },
  {
    q: 'In the worst case, linear search on n items performs how many comparisons?',
    a: ['1', 'log n', 'n', 'n²'],
    correct: 2,
    topic: 'search',
    difficulty: 'hard',
    explain: 'Worst case is when the item is at the end or absent — every element is compared, so n comparisons.'
  },

  // ===== SORT (5 questions) =====
  {
    q: 'Bubble sort works by:',
    a: ['Finding the smallest item and putting it first', 'Repeatedly comparing adjacent pairs and swapping if out of order', 'Dividing the list in half each pass', 'Building a sorted list element by element'],
    correct: 1,
    topic: 'sort',
    difficulty: 'easy',
    explain: 'Bubble sort compares adjacent pairs and swaps them if they are out of order, "bubbling" larger values to the end.'
  },
  {
    q: 'After one complete pass of bubble sort (ascending) on <code>[5,3,8,1]</code>, the list becomes:',
    a: ['[1,3,5,8]', '[3,5,1,8]', '[3,1,5,8]', '[1,5,3,8]'],
    correct: 1,
    topic: 'sort',
    difficulty: 'medium',
    explain: 'Pass 1: 5,3 swap → 3,5,8,1; 5,8 stay → 3,5,8,1; 8,1 swap → 3,5,1,8. The largest has bubbled to the end.'
  },
  {
    q: 'For a list of n items, how many passes does a basic bubble sort need in the worst case?',
    a: ['1', 'log n', 'n - 1', 'n²'],
    correct: 2,
    topic: 'sort',
    difficulty: 'medium',
    explain: 'In the worst case bubble sort needs n-1 passes; after each pass the next largest item is placed in its final position.'
  },
  {
    q: 'Which optimisation is commonly added to bubble sort?',
    a: ['Sort in random order first', 'Stop early if no swaps occurred in a pass', 'Always do n² passes', 'Compare non-adjacent elements'],
    correct: 1,
    topic: 'sort',
    difficulty: 'hard',
    explain: 'If a pass completes without any swaps, the list is sorted, so the algorithm can terminate early.'
  },
  {
    q: 'Bubble sort\'s worst-case time complexity is approximately:',
    a: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correct: 2,
    topic: 'sort',
    difficulty: 'hard',
    explain: 'Bubble sort makes about n passes, each doing about n comparisons, giving O(n²).'
  },

  // ===== METHODS (4 questions) =====
  {
    q: 'Which line is the standard pattern for TOTALLING values in a loop?',
    a: ['total &lt;- total + value', 'total &lt;- total + 1', 'count &lt;- count + 1', 'total &lt;- value'],
    correct: 0,
    topic: 'methods',
    difficulty: 'easy',
    explain: 'Totalling adds the current value to a running total. Counting adds 1 to a counter each iteration.'
  },
  {
    q: 'Which is the COUNTING pattern in a loop?',
    a: ['total &lt;- total + value', 'count &lt;- count + 1', 'max &lt;- value', 'avg &lt;- total / count'],
    correct: 1,
    topic: 'methods',
    difficulty: 'easy',
    explain: 'Counting increments a counter by 1 (often conditionally) each iteration to tally occurrences.'
  },
  {
    q: 'Which is the correct initialisation for finding the MAXIMUM of a list of positive numbers?',
    a: ['max &lt;- 0 only', 'max &lt;- first item in the list', 'max &lt;- 9999', 'max &lt;- -1'],
    correct: 1,
    topic: 'methods',
    difficulty: 'medium',
    explain: 'Initialising max to the first list item works for any list of numbers, including negatives. Initialising to 0 fails if all values are negative.'
  },
  {
    q: 'A program calculates an average. Which formula is correct?',
    a: ['avg = count / total', 'avg = total + count', 'avg = total / count', 'avg = total * count'],
    correct: 2,
    topic: 'methods',
    difficulty: 'easy',
    explain: 'Average = sum of values ÷ number of values, i.e. total / count.'
  },

  // ===== ARRAYS (6 questions) =====
  {
    q: 'In Cambridge pseudocode, given <code>DECLARE Nums : ARRAY[1:5] OF INTEGER</code>, the FIRST element is accessed by:',
    a: ['Nums[0]', 'Nums[1]', 'Nums(0)', 'Nums.first'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'easy',
    explain: 'Cambridge pseudocode arrays start at the declared lower bound (here 1). Python arrays start at 0.'
  },
  {
    q: 'How many elements are in <code>ARRAY[1:10, 1:5]</code>?',
    a: ['15', '50', '55', '500'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'hard',
    explain: 'A 2D array with dimensions 10 rows × 5 columns has 10 × 5 = 50 elements.'
  },
  {
    q: 'A 2D array <code>Grid[3, 4]</code> typically represents:',
    a: ['A list of 12 items', '3 rows and 4 columns', '3 columns and 4 rows', 'A 1D array of 3 items'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'medium',
    explain: 'By Cambridge convention the first dimension is rows and the second is columns: Grid[row, column].'
  },
  {
    q: 'What does this Python output?<br><code>a = [10, 20, 30, 40]<br>print(a[-1])</code>',
    a: ['10', '40', 'Error', '-1'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'medium',
    explain: 'In Python, negative indexes count from the end. a[-1] is the last element, 40.'
  },
  {
    q: 'A teacher stores marks for 30 students in 5 subjects. The MOST suitable structure is:',
    a: ['Five 1D arrays of 30 each', 'A 2D array of 30 by 5', 'A 1D array of 150', 'Thirty separate variables'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'medium',
    explain: 'A 2D array [30,5] cleanly maps student × subject and is the standard structure for this kind of tabular data.'
  },
  {
    q: 'In Python, what does <code>len([4, 7, 2, 9])</code> return?',
    a: ['3', '4', '22', 'Error'],
    correct: 1,
    topic: 'arrays',
    difficulty: 'easy',
    explain: 'len() returns the number of elements in a list. The list has 4 elements.'
  },

  // ===== FUNCTIONS (6 questions) =====
  {
    q: 'The KEY difference between a procedure and a function is:',
    a: ['Procedures cannot take parameters; functions can', 'Functions return a value; procedures do not', 'Procedures must be global; functions local', 'Functions cannot be called more than once'],
    correct: 1,
    topic: 'functions',
    difficulty: 'easy',
    explain: 'A function returns a value to the caller. A procedure performs an action but does not return a value.'
  },
  {
    q: 'In <code>FUNCTION Area(width : INTEGER, height : INTEGER) RETURNS INTEGER</code>, "width" and "height" are:',
    a: ['Local variables only', 'Parameters', 'Arguments', 'Global variables'],
    correct: 1,
    topic: 'functions',
    difficulty: 'hard',
    explain: 'Names listed in the function definition are parameters. Values passed when calling the function are arguments.'
  },
  {
    q: 'A variable declared inside a function and only usable in that function is:',
    a: ['Global', 'Local', 'Public', 'Constant'],
    correct: 1,
    topic: 'functions',
    difficulty: 'easy',
    explain: 'Variables declared inside a subroutine are local — they exist only while the subroutine runs and cannot be accessed outside it.'
  },
  {
    q: 'A variable declared at the top of a program and accessible everywhere is:',
    a: ['Local', 'Parameter', 'Global', 'Returned'],
    correct: 2,
    topic: 'functions',
    difficulty: 'easy',
    explain: 'Global variables are declared outside subroutines and can be read or written anywhere in the program.'
  },
  {
    q: 'Which is the MAIN benefit of using subroutines (functions/procedures)?',
    a: ['They make programs run faster', 'They allow code reuse and easier maintenance', 'They prevent all logic errors', 'They remove the need for testing'],
    correct: 1,
    topic: 'functions',
    difficulty: 'medium',
    explain: 'Subroutines let the same code be reused, and changes only need to be made in one place — improving maintainability.'
  },
  {
    q: 'What does <code>RETURNS</code> do in a Cambridge pseudocode function header?',
    a: ['Ends the function early', 'Specifies the data type of the value returned', 'Lists parameters', 'Declares local variables'],
    correct: 1,
    topic: 'functions',
    difficulty: 'medium',
    explain: 'RETURNS &lt;type&gt; declares the data type of the value the function will return to the caller.'
  },

  // ===== FILES (4 questions) =====
  {
    q: 'In Cambridge pseudocode, which command opens a file for adding to the end?',
    a: ['OPENFILE "data.txt" FOR READ', 'OPENFILE "data.txt" FOR WRITE', 'OPENFILE "data.txt" FOR APPEND', 'OPENFILE "data.txt" FOR EDIT'],
    correct: 2,
    topic: 'files',
    difficulty: 'medium',
    explain: 'APPEND opens the file and writes new data to the end without overwriting existing content. WRITE overwrites.'
  },
  {
    q: 'What does <code>EOF()</code> stand for in file handling?',
    a: ['Error On File', 'End Of File', 'Empty Output Format', 'Exit On Fail'],
    correct: 1,
    topic: 'files',
    difficulty: 'easy',
    explain: 'EOF (End Of File) is a function that returns TRUE when the end of the file has been reached when reading.'
  },
  {
    q: 'Why is it important to CLOSEFILE after reading or writing?',
    a: ['To free resources and save changes', 'To delete the file', 'To encrypt the data', 'To run the program faster'],
    correct: 0,
    topic: 'files',
    difficulty: 'medium',
    explain: 'Closing releases the file handle and ensures buffered writes are flushed to disk.'
  },
  {
    q: 'A file is opened with <code>OPENFILE "log.txt" FOR WRITE</code> and the file already exists. What happens?',
    a: ['New data is appended to the end', 'The existing content is overwritten/replaced', 'An error is raised', 'The file becomes read-only'],
    correct: 1,
    topic: 'files',
    difficulty: 'hard',
    explain: 'WRITE mode replaces the file\'s contents from the start. Use APPEND to keep existing data and add to the end.'
  },

  // ===== PYTHON (7 questions) =====
  {
    q: 'Which Python statement is equivalent to Cambridge pseudocode <code>OUTPUT "Hello"</code>?',
    a: ['echo("Hello")', 'print("Hello")', 'output("Hello")', 'write("Hello")'],
    correct: 1,
    topic: 'python',
    difficulty: 'easy',
    explain: 'Python uses print() to display output. echo is a shell command, not Python.'
  },
  {
    q: 'In Python, <code>input()</code> always returns:',
    a: ['An integer', 'A float', 'A string', 'The same type the user typed'],
    correct: 2,
    topic: 'python',
    difficulty: 'medium',
    explain: 'input() always returns a string. Convert with int() or float() if a number is needed.'
  },
  {
    q: 'What is the OUTPUT of <code>print(type(3 / 2))</code> in Python 3?',
    a: ['&lt;class \'int\'&gt;', '&lt;class \'float\'&gt;', '&lt;class \'str\'&gt;', '&lt;class \'bool\'&gt;'],
    correct: 1,
    topic: 'python',
    difficulty: 'hard',
    explain: 'In Python 3, / always produces a float (1.5). Integer division uses //.'
  },
  {
    q: 'How do you write a comment in Python?',
    a: ['// This is a comment', '/* This is a comment */', '# This is a comment', '-- This is a comment'],
    correct: 2,
    topic: 'python',
    difficulty: 'easy',
    explain: 'Python uses # for single-line comments. //, /* */ and -- are used in other languages.'
  },
  {
    q: 'Which Python construct corresponds to <code>FOR i &lt;- 1 TO 5</code> in pseudocode?',
    a: ['for i in range(1, 5):', 'for i in range(1, 6):', 'for i in (1, 5):', 'for i = 1 to 5:'],
    correct: 1,
    topic: 'python',
    difficulty: 'hard',
    explain: 'range(1,6) produces 1,2,3,4,5. Python\'s upper bound is exclusive, but Cambridge\'s TO is inclusive — add 1.'
  },
  {
    q: 'What is the output?<br><code>x = "5"<br>y = 3<br>print(x + str(y))</code>',
    a: ['8', '53', 'Error', '5 3'],
    correct: 1,
    topic: 'python',
    difficulty: 'medium',
    explain: 'str(3) converts 3 to "3", then "5" + "3" concatenates strings to give "53".'
  },
  {
    q: 'Which line correctly converts user input to an integer?',
    a: ['x = input("Age? ")', 'x = int(input("Age? "))', 'x = input(int("Age? "))', 'x = integer(input("Age? "))'],
    correct: 1,
    topic: 'python',
    difficulty: 'medium',
    explain: 'input() returns a string. Wrap the call in int() to convert the result to an integer.'
  },

  // ===== SQL (10 questions) =====
  {
    q: 'A table STUDENT has columns ID, Name, Age. Which SQL returns all rows?',
    a: ['GET * FROM STUDENT', 'SELECT * FROM STUDENT', 'FETCH ALL STUDENT', 'SHOW STUDENT'],
    correct: 1,
    topic: 'sql',
    difficulty: 'easy',
    explain: 'SELECT * FROM table returns all columns and all rows from the named table.'
  },
  {
    q: 'Which SQL clause filters which rows are returned?',
    a: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
    correct: 2,
    topic: 'sql',
    difficulty: 'easy',
    explain: 'WHERE specifies a condition that rows must meet to be included. ORDER BY sorts the output.'
  },
  {
    q: 'Table BOOK has Title, Author, Year. Which SQL returns titles published after 2020?',
    a: ['SELECT Title FROM BOOK WHERE Year &gt; 2020', 'SELECT Title FROM BOOK IF Year &gt; 2020', 'SELECT Title WHERE Year &gt; 2020 FROM BOOK', 'GET Title FROM BOOK WHERE Year &gt; 2020'],
    correct: 0,
    topic: 'sql',
    difficulty: 'hard',
    explain: 'Standard order: SELECT columns FROM table WHERE condition. The WHERE clause comes after FROM.'
  },
  {
    q: 'Which clause sorts results in descending order by Age?',
    a: ['SORT BY Age DESC', 'ORDER Age DESC', 'ORDER BY Age DESC', 'GROUP BY Age DESC'],
    correct: 2,
    topic: 'sql',
    difficulty: 'easy',
    explain: 'ORDER BY column DESC sorts results in descending order. ASC (or omitted) sorts ascending.'
  },
  {
    q: 'Table PRODUCT has Price. Which SQL returns the AVERAGE price?',
    a: ['SELECT MEAN(Price) FROM PRODUCT', 'SELECT AVG(Price) FROM PRODUCT', 'SELECT AVERAGE(Price) FROM PRODUCT', 'SELECT SUM(Price) / COUNT(*) FROM PRODUCT ONLY'],
    correct: 1,
    topic: 'sql',
    difficulty: 'easy',
    explain: 'AVG() is the standard SQL aggregate function for arithmetic mean.'
  },
  {
    q: 'Which SQL aggregate gives the number of rows that have a non-NULL value in column X?',
    a: ['SUM(X)', 'COUNT(X)', 'AVG(X)', 'NUM(X)'],
    correct: 1,
    topic: 'sql',
    difficulty: 'hard',
    explain: 'COUNT(X) counts non-NULL values in column X. COUNT(*) counts all rows regardless of NULLs.'
  },
  {
    q: 'Table STUDENT has Name. Which SQL returns all names beginning with "A"?',
    a: ['SELECT Name FROM STUDENT WHERE Name = "A%"', 'SELECT Name FROM STUDENT WHERE Name LIKE "A%"', 'SELECT Name FROM STUDENT WHERE Name LIKE "%A"', 'SELECT Name FROM STUDENT WHERE Name STARTS "A"'],
    correct: 1,
    topic: 'sql',
    difficulty: 'medium',
    explain: 'LIKE with wildcard % matches any sequence of characters. "A%" means starts with A. "%A" would mean ends with A.'
  },
  {
    q: 'Which SQL returns the highest salary in EMPLOYEE?',
    a: ['SELECT TOP(Salary) FROM EMPLOYEE', 'SELECT MAX(Salary) FROM EMPLOYEE', 'SELECT HIGH(Salary) FROM EMPLOYEE', 'SELECT BIGGEST(Salary) FROM EMPLOYEE'],
    correct: 1,
    topic: 'sql',
    difficulty: 'easy',
    explain: 'MAX() is the SQL aggregate function for the largest value in a column. MIN() returns the smallest.'
  },
  {
    q: 'Table ORDER has CustomerID, Amount. Which SQL returns orders between £100 and £500 inclusive?',
    a: ['SELECT * FROM ORDER WHERE Amount IN 100, 500', 'SELECT * FROM ORDER WHERE Amount BETWEEN 100 AND 500', 'SELECT * FROM ORDER WHERE 100 &lt; Amount &lt; 500', 'SELECT * FROM ORDER WHERE Amount RANGE 100,500'],
    correct: 1,
    topic: 'sql',
    difficulty: 'medium',
    explain: 'BETWEEN is inclusive and is the standard way to filter for a range. Chained comparisons like 100 < x < 500 are not valid SQL.'
  },
  {
    q: 'Table STUDENT(ID, Name, Age, Grade). Which SQL returns name and age of students in grade A, sorted by age oldest first?',
    a: ['SELECT Name, Age FROM STUDENT WHERE Grade = "A" ORDER BY Age ASC', 'SELECT Name, Age FROM STUDENT WHERE Grade = "A" ORDER BY Age DESC', 'SELECT * FROM STUDENT WHERE Grade = "A" SORT Age', 'SELECT Name AND Age FROM STUDENT WHERE Grade = "A"'],
    correct: 1,
    topic: 'sql',
    difficulty: 'hard',
    explain: 'Filter with WHERE Grade = "A", then ORDER BY Age DESC for oldest first.'
  },

  // ===== ERRORS (0 questions specified, but we need 100 total — distribution sums to 100 already without 'errors') =====
];
