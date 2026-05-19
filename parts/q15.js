window.Q15 = [
  {
    title: 'Q1 — Class Average and Pass Count',
    marks: 15,
    topic: 'arrays',
    text: `<p>A teacher records the test marks of 25 students. Each mark is an integer from 0 to 100 inclusive. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Declares an array of 25 elements to store the marks.</li>
<li>(b) Reads 25 marks from the user, validating that each is in the range 0 to 100 (re-prompt on invalid input).</li>
<li>(c) Calculates and outputs the class average to 2 decimal places.</li>
<li>(d) Counts and outputs how many students scored 50 or above (the pass count).</li>
<li>(e) Finds and outputs the highest mark in the array.</li>
</ul>`,
    py: `# Q1 — Class Average and Pass Count
marks = [0] * 25

for i in range(25):
    while True:
        m = int(input("Enter mark " + str(i + 1) + ": "))
        if 0 &lt;= m &lt;= 100:
            marks[i] = m
            break
        print("Invalid mark. Must be 0 to 100.")

total = 0
passes = 0
highest = marks[0]

for i in range(25):
    total = total + marks[i]
    if marks[i] &gt;= 50:
        passes = passes + 1
    if marks[i] &gt; highest:
        highest = marks[i]

average = total / 25
print("Average:", round(average, 2))
print("Number passing:", passes)
print("Highest mark:", highest)`,
    pseudo: `<span class="kw">DECLARE</span> Marks : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">25</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Total, Passes, Highest, i, M : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Average : <span class="kw">REAL</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">25</span>
  <span class="kw">REPEAT</span>
    <span class="kw">OUTPUT</span> <span class="str">"Enter mark "</span>, i
    <span class="kw">INPUT</span> M
    <span class="kw">IF</span> M &lt; <span class="num">0</span> <span class="kw">OR</span> M &gt; <span class="num">100</span> <span class="kw">THEN</span>
      <span class="kw">OUTPUT</span> <span class="str">"Invalid mark. Must be 0 to 100."</span>
    <span class="kw">ENDIF</span>
  <span class="kw">UNTIL</span> M &gt;= <span class="num">0</span> <span class="kw">AND</span> M &lt;= <span class="num">100</span>
  Marks[i] ← M
<span class="kw">NEXT</span> i

Total ← <span class="num">0</span>
Passes ← <span class="num">0</span>
Highest ← Marks[<span class="num">1</span>]

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">25</span>
  Total ← Total + Marks[i]
  <span class="kw">IF</span> Marks[i] &gt;= <span class="num">50</span> <span class="kw">THEN</span>
    Passes ← Passes + <span class="num">1</span>
  <span class="kw">ENDIF</span>
  <span class="kw">IF</span> Marks[i] &gt; Highest <span class="kw">THEN</span>
    Highest ← Marks[i]
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i

Average ← Total / <span class="num">25</span>
<span class="kw">OUTPUT</span> <span class="str">"Average: "</span>, Average
<span class="kw">OUTPUT</span> <span class="str">"Number passing: "</span>, Passes
<span class="kw">OUTPUT</span> <span class="str">"Highest mark: "</span>, Highest`,
    marking: [
      ['Array of size 25 declared / initialised correctly', 1],
      ['Loop to read 25 marks into array', 2],
      ['Validation that mark is in range 0 to 100 with re-prompt', 3],
      ['Total accumulated and average calculated correctly', 2],
      ['Average output to 2 decimal places', 1],
      ['Pass count loop with correct >= 50 condition', 3],
      ['Highest mark found correctly (initialised, compared)', 2],
      ['All three results output with sensible labels', 1]
    ]
  },
  {
    title: 'Q2 — Word Frequency from File',
    marks: 15,
    topic: 'files',
    text: `<p>A file <code>words.txt</code> contains one word per line. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Opens <code>words.txt</code> for reading.</li>
<li>(b) Asks the user to enter a target word.</li>
<li>(c) Counts how many times the target word appears in the file (comparison must be case-insensitive).</li>
<li>(d) Identifies the longest word in the file (if two words tie, output the first one encountered).</li>
<li>(e) Outputs the count and the longest word. If the file is empty, output an appropriate message instead.</li>
<li>(f) Closes the file at the end.</li>
</ul>`,
    py: `# Q2 — Word Frequency from File
target = input("Enter target word: ").lower()

count = 0
longest = ""
found_any = False

f = open("words.txt", "r")
for line in f:
    word = line.strip()
    if word == "":
        continue
    found_any = True
    if word.lower() == target:
        count = count + 1
    if len(word) &gt; len(longest):
        longest = word
f.close()

if not found_any:
    print("File is empty.")
else:
    print("Count of '" + target + "':", count)
    print("Longest word:", longest)`,
    pseudo: `<span class="kw">DECLARE</span> Target, Word, Longest : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Count : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> FoundAny : <span class="kw">BOOLEAN</span>

<span class="kw">OUTPUT</span> <span class="str">"Enter target word: "</span>
<span class="kw">INPUT</span> Target
Target ← LCASE(Target)

Count ← <span class="num">0</span>
Longest ← <span class="str">""</span>
FoundAny ← <span class="kw">FALSE</span>

<span class="kw">OPENFILE</span> <span class="str">"words.txt"</span> <span class="kw">FOR READ</span>
<span class="kw">WHILE NOT</span> EOF(<span class="str">"words.txt"</span>)
  <span class="kw">READFILE</span> <span class="str">"words.txt"</span>, Word
  <span class="kw">IF</span> Word &lt;&gt; <span class="str">""</span> <span class="kw">THEN</span>
    FoundAny ← <span class="kw">TRUE</span>
    <span class="kw">IF</span> LCASE(Word) = Target <span class="kw">THEN</span>
      Count ← Count + <span class="num">1</span>
    <span class="kw">ENDIF</span>
    <span class="kw">IF</span> LENGTH(Word) &gt; LENGTH(Longest) <span class="kw">THEN</span>
      Longest ← Word
    <span class="kw">ENDIF</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDWHILE</span>
<span class="kw">CLOSEFILE</span> <span class="str">"words.txt"</span>

<span class="kw">IF</span> FoundAny = <span class="kw">FALSE</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"File is empty."</span>
<span class="kw">ELSE</span>
  <span class="kw">OUTPUT</span> <span class="str">"Count: "</span>, Count
  <span class="kw">OUTPUT</span> <span class="str">"Longest word: "</span>, Longest
<span class="kw">ENDIF</span>`,
    marking: [
      ['File opened correctly for reading', 1],
      ['Target word input from user', 1],
      ['Loop reads through file line by line until EOF', 2],
      ['Case-insensitive comparison (using LCASE/lower)', 2],
      ['Counter incremented correctly when match found', 2],
      ['Longest word tracked with correct length comparison', 3],
      ['Empty file handled with appropriate message', 2],
      ['File closed and results output', 2]
    ]
  },
  {
    title: 'Q3 — Login System with Lockout',
    marks: 15,
    topic: 'mixed',
    text: `<p>A system stores 5 username and password pairs in two parallel arrays. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Declares two parallel arrays of size 5: <code>Usernames</code> and <code>Passwords</code>, and initialises them with sample data.</li>
<li>(b) Allows the user up to 3 attempts to log in.</li>
<li>(c) On each attempt, prompts for a username and password and checks BOTH match a pair (same index).</li>
<li>(d) On a successful match, outputs <code>Welcome &lt;username&gt;</code> and stops further attempts.</li>
<li>(e) If 3 attempts fail, outputs <code>Account locked</code> and stops.</li>
</ul>`,
    py: `# Q3 — Login System with Lockout
usernames = ["alice", "bob", "carol", "dave", "eve"]
passwords = ["pass1", "pass2", "pass3", "pass4", "pass5"]

attempts = 0
logged_in = False

while attempts &lt; 3 and not logged_in:
    u = input("Username: ")
    p = input("Password: ")
    found = False
    for i in range(5):
        if usernames[i] == u and passwords[i] == p:
            found = True
            print("Welcome " + u)
            logged_in = True
            break
    if not found:
        attempts = attempts + 1
        if attempts &lt; 3:
            print("Incorrect. Attempts left:", 3 - attempts)

if not logged_in:
    print("Account locked")`,
    pseudo: `<span class="kw">DECLARE</span> Usernames : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Passwords : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> U, P : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Attempts, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> LoggedIn, Found : <span class="kw">BOOLEAN</span>

Usernames[<span class="num">1</span>] ← <span class="str">"alice"</span> : Passwords[<span class="num">1</span>] ← <span class="str">"pass1"</span>
Usernames[<span class="num">2</span>] ← <span class="str">"bob"</span>   : Passwords[<span class="num">2</span>] ← <span class="str">"pass2"</span>
Usernames[<span class="num">3</span>] ← <span class="str">"carol"</span> : Passwords[<span class="num">3</span>] ← <span class="str">"pass3"</span>
Usernames[<span class="num">4</span>] ← <span class="str">"dave"</span>  : Passwords[<span class="num">4</span>] ← <span class="str">"pass4"</span>
Usernames[<span class="num">5</span>] ← <span class="str">"eve"</span>   : Passwords[<span class="num">5</span>] ← <span class="str">"pass5"</span>

Attempts ← <span class="num">0</span>
LoggedIn ← <span class="kw">FALSE</span>

<span class="kw">WHILE</span> Attempts &lt; <span class="num">3</span> <span class="kw">AND</span> LoggedIn = <span class="kw">FALSE</span>
  <span class="kw">OUTPUT</span> <span class="str">"Username: "</span> : <span class="kw">INPUT</span> U
  <span class="kw">OUTPUT</span> <span class="str">"Password: "</span> : <span class="kw">INPUT</span> P
  Found ← <span class="kw">FALSE</span>
  <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">5</span>
    <span class="kw">IF</span> Usernames[i] = U <span class="kw">AND</span> Passwords[i] = P <span class="kw">THEN</span>
      Found ← <span class="kw">TRUE</span>
      <span class="kw">OUTPUT</span> <span class="str">"Welcome "</span>, U
      LoggedIn ← <span class="kw">TRUE</span>
    <span class="kw">ENDIF</span>
  <span class="kw">NEXT</span> i
  <span class="kw">IF</span> Found = <span class="kw">FALSE</span> <span class="kw">THEN</span>
    Attempts ← Attempts + <span class="num">1</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDWHILE</span>

<span class="kw">IF</span> LoggedIn = <span class="kw">FALSE</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"Account locked"</span>
<span class="kw">ENDIF</span>`,
    marking: [
      ['Two parallel arrays declared and initialised with sample data', 2],
      ['Attempts counter declared and initialised to 0', 1],
      ['Outer loop runs while attempts < 3 AND not logged in', 2],
      ['Both username and password inputs taken each attempt', 1],
      ['Inner loop checks both arrays at matching index', 3],
      ['Successful match outputs "Welcome <username>" and exits loop', 2],
      ['Attempts incremented only on failed attempt', 2],
      ['After 3 failed attempts outputs "Account locked"', 2]
    ]
  },
  {
    title: 'Q4 — Palindrome Detector',
    marks: 15,
    topic: 'arrays',
    text: `<p>A palindrome reads the same forwards and backwards (e.g. 1 2 3 2 1). Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Asks the user for the number of elements N, where 3 &lt;= N &lt;= 10. Re-prompt until valid.</li>
<li>(b) Reads N integers from the user into an array.</li>
<li>(c) Outputs the array elements in reverse order.</li>
<li>(d) Determines whether the array is a palindrome (without sorting it).</li>
<li>(e) Outputs either <code>This is a palindrome</code> or <code>This is not a palindrome</code>.</li>
</ul>`,
    py: `# Q4 — Palindrome Detector
while True:
    n = int(input("Enter N (3 to 10): "))
    if 3 &lt;= n &lt;= 10:
        break
    print("Invalid. N must be 3 to 10.")

nums = [0] * n
for i in range(n):
    nums[i] = int(input("Enter number " + str(i + 1) + ": "))

# Output reversed
print("Reversed:")
for i in range(n - 1, -1, -1):
    print(nums[i])

# Check palindrome
is_palindrome = True
for i in range(n // 2):
    if nums[i] != nums[n - 1 - i]:
        is_palindrome = False
        break

if is_palindrome:
    print("This is a palindrome")
else:
    print("This is not a palindrome")`,
    pseudo: `<span class="kw">DECLARE</span> Nums : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">10</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> N, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> IsPalindrome : <span class="kw">BOOLEAN</span>

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter N (3 to 10): "</span>
  <span class="kw">INPUT</span> N
  <span class="kw">IF</span> N &lt; <span class="num">3</span> <span class="kw">OR</span> N &gt; <span class="num">10</span> <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Invalid. N must be 3 to 10."</span>
  <span class="kw">ENDIF</span>
<span class="kw">UNTIL</span> N &gt;= <span class="num">3</span> <span class="kw">AND</span> N &lt;= <span class="num">10</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> N
  <span class="kw">OUTPUT</span> <span class="str">"Enter number "</span>, i
  <span class="kw">INPUT</span> Nums[i]
<span class="kw">NEXT</span> i

<span class="kw">OUTPUT</span> <span class="str">"Reversed:"</span>
<span class="kw">FOR</span> i ← N <span class="kw">TO</span> <span class="num">1</span> <span class="kw">STEP</span> -<span class="num">1</span>
  <span class="kw">OUTPUT</span> Nums[i]
<span class="kw">NEXT</span> i

IsPalindrome ← <span class="kw">TRUE</span>
<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> N <span class="kw">DIV</span> <span class="num">2</span>
  <span class="kw">IF</span> Nums[i] &lt;&gt; Nums[N - i + <span class="num">1</span>] <span class="kw">THEN</span>
    IsPalindrome ← <span class="kw">FALSE</span>
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i

<span class="kw">IF</span> IsPalindrome = <span class="kw">TRUE</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"This is a palindrome"</span>
<span class="kw">ELSE</span>
  <span class="kw">OUTPUT</span> <span class="str">"This is not a palindrome"</span>
<span class="kw">ENDIF</span>`,
    marking: [
      ['Input N with re-prompt loop until valid (3 to 10)', 3],
      ['Range check for 3 to 10 inclusive', 1],
      ['Array declared and N integers read in correctly', 2],
      ['Loop to output array in reverse order', 2],
      ['Palindrome flag initialised to TRUE', 1],
      ['Correct comparison of element i with element N-i+1', 3],
      ['Flag set to FALSE on any mismatch', 1],
      ['Final IF/ELSE outputs correct message', 2]
    ]
  },
  {
    title: 'Q5 — Vote Counter for 3 Candidates',
    marks: 15,
    topic: 'loops',
    text: `<p>An election has 3 candidates: A, B, and C. Votes are entered one at a time. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Reads votes from the user one by one, in a loop.</li>
<li>(b) Counts votes for A, B, and C. Stops when the user enters 'X'.</li>
<li>(c) If the user enters any other character, outputs <code>Invalid vote</code> and continues (does NOT crash or stop).</li>
<li>(d) After 'X' is entered, outputs the count for each candidate (A, B, C).</li>
<li>(e) Determines and outputs the winner. If two or more candidates tie for top, output <code>Tie</code>.</li>
</ul>`,
    py: `# Q5 — Vote Counter for 3 Candidates
count_a = 0
count_b = 0
count_c = 0

while True:
    v = input("Enter vote (A/B/C, X to stop): ").upper()
    if v == "X":
        break
    elif v == "A":
        count_a = count_a + 1
    elif v == "B":
        count_b = count_b + 1
    elif v == "C":
        count_c = count_c + 1
    else:
        print("Invalid vote")

print("A:", count_a)
print("B:", count_b)
print("C:", count_c)

# Determine winner
highest = count_a
if count_b &gt; highest:
    highest = count_b
if count_c &gt; highest:
    highest = count_c

tied = 0
winner = ""
if count_a == highest:
    tied = tied + 1
    winner = "A"
if count_b == highest:
    tied = tied + 1
    winner = "B"
if count_c == highest:
    tied = tied + 1
    winner = "C"

if tied &gt; 1:
    print("Tie")
else:
    print("Winner:", winner)`,
    pseudo: `<span class="kw">DECLARE</span> CountA, CountB, CountC, Highest, Tied : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> V, Winner : <span class="kw">STRING</span>

CountA ← <span class="num">0</span>
CountB ← <span class="num">0</span>
CountC ← <span class="num">0</span>

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter vote (A/B/C, X to stop): "</span>
  <span class="kw">INPUT</span> V
  V ← UCASE(V)
  <span class="kw">CASE OF</span> V
    <span class="str">"A"</span> : CountA ← CountA + <span class="num">1</span>
    <span class="str">"B"</span> : CountB ← CountB + <span class="num">1</span>
    <span class="str">"C"</span> : CountC ← CountC + <span class="num">1</span>
    <span class="str">"X"</span> : <span class="com">// stop sentinel</span>
    <span class="kw">OTHERWISE</span> <span class="kw">OUTPUT</span> <span class="str">"Invalid vote"</span>
  <span class="kw">ENDCASE</span>
<span class="kw">UNTIL</span> V = <span class="str">"X"</span>

<span class="kw">OUTPUT</span> <span class="str">"A: "</span>, CountA
<span class="kw">OUTPUT</span> <span class="str">"B: "</span>, CountB
<span class="kw">OUTPUT</span> <span class="str">"C: "</span>, CountC

Highest ← CountA
<span class="kw">IF</span> CountB &gt; Highest <span class="kw">THEN</span> Highest ← CountB <span class="kw">ENDIF</span>
<span class="kw">IF</span> CountC &gt; Highest <span class="kw">THEN</span> Highest ← CountC <span class="kw">ENDIF</span>

Tied ← <span class="num">0</span>
<span class="kw">IF</span> CountA = Highest <span class="kw">THEN</span> Tied ← Tied + <span class="num">1</span> : Winner ← <span class="str">"A"</span> <span class="kw">ENDIF</span>
<span class="kw">IF</span> CountB = Highest <span class="kw">THEN</span> Tied ← Tied + <span class="num">1</span> : Winner ← <span class="str">"B"</span> <span class="kw">ENDIF</span>
<span class="kw">IF</span> CountC = Highest <span class="kw">THEN</span> Tied ← Tied + <span class="num">1</span> : Winner ← <span class="str">"C"</span> <span class="kw">ENDIF</span>

<span class="kw">IF</span> Tied &gt; <span class="num">1</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"Tie"</span>
<span class="kw">ELSE</span>
  <span class="kw">OUTPUT</span> <span class="str">"Winner: "</span>, Winner
<span class="kw">ENDIF</span>`,
    marking: [
      ['Three counters declared and initialised to 0', 1],
      ['Loop reads votes until X is entered', 2],
      ['Correct incrementing for A, B and C', 3],
      ['Invalid input handled with error message (no crash)', 2],
      ['All three counts output with labels', 2],
      ['Highest value among A/B/C found', 2],
      ['Winner identified when one candidate has highest', 2],
      ['Tie detected when 2 or more share highest count', 1]
    ]
  },
  {
    title: 'Q6 — Temperature Conversion Table',
    marks: 12,
    topic: 'loops',
    text: `<p>Write a program that produces a temperature conversion table. Specifically:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Ask the user for a low temperature and a high temperature in Celsius. Validate that both are in the range -100 to 100 and that low &lt; high. Re-prompt until valid.</li>
<li>(b) Ask the user for a positive step size (must be &gt; 0).</li>
<li>(c) Output a table with three columns: Celsius, Fahrenheit, Kelvin.</li>
<li>(d) Use the formulas: F = C * 9/5 + 32 and K = C + 273.15.</li>
<li>(e) The table should run from low to high inclusive, in increments of the step size.</li>
</ul>`,
    py: `# Q6 — Temperature Conversion Table
while True:
    low = float(input("Enter low Celsius: "))
    high = float(input("Enter high Celsius: "))
    if -100 &lt;= low &lt;= 100 and -100 &lt;= high &lt;= 100 and low &lt; high:
        break
    print("Invalid. low &lt; high, both in -100 to 100.")

while True:
    step = float(input("Enter step size: "))
    if step &gt; 0:
        break
    print("Step must be greater than 0.")

print("Celsius | Fahrenheit | Kelvin")
c = low
while c &lt;= high:
    f = c * 9 / 5 + 32
    k = c + 273.15
    print(round(c, 2), "|", round(f, 2), "|", round(k, 2))
    c = c + step`,
    pseudo: `<span class="kw">DECLARE</span> Low, High, Step, C, F, K : <span class="kw">REAL</span>

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter low Celsius: "</span>  : <span class="kw">INPUT</span> Low
  <span class="kw">OUTPUT</span> <span class="str">"Enter high Celsius: "</span> : <span class="kw">INPUT</span> High
  <span class="kw">IF</span> Low &lt; -<span class="num">100</span> <span class="kw">OR</span> Low &gt; <span class="num">100</span> <span class="kw">OR</span> High &lt; -<span class="num">100</span> <span class="kw">OR</span> High &gt; <span class="num">100</span> <span class="kw">OR</span> Low &gt;= High <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Invalid range."</span>
  <span class="kw">ENDIF</span>
<span class="kw">UNTIL</span> Low &gt;= -<span class="num">100</span> <span class="kw">AND</span> High &lt;= <span class="num">100</span> <span class="kw">AND</span> Low &lt; High

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter step size: "</span>
  <span class="kw">INPUT</span> Step
<span class="kw">UNTIL</span> Step &gt; <span class="num">0</span>

<span class="kw">OUTPUT</span> <span class="str">"Celsius | Fahrenheit | Kelvin"</span>
C ← Low
<span class="kw">WHILE</span> C &lt;= High
  F ← C * <span class="num">9</span> / <span class="num">5</span> + <span class="num">32</span>
  K ← C + <span class="num">273.15</span>
  <span class="kw">OUTPUT</span> C, <span class="str">" | "</span>, F, <span class="str">" | "</span>, K
  C ← C + Step
<span class="kw">ENDWHILE</span>`,
    marking: [
      ['Validation that low and high are in range -100 to 100', 2],
      ['Validation that low < high with re-prompt', 2],
      ['Step size input validated as > 0', 1],
      ['Loop iterates from low to high inclusive in steps', 2],
      ['Correct Fahrenheit formula C * 9/5 + 32', 2],
      ['Correct Kelvin formula C + 273.15', 1],
      ['Table headers and rows output cleanly', 2]
    ]
  },
  {
    title: 'Q7 — Quiz with Score Tracking',
    marks: 15,
    topic: 'arrays',
    text: `<p>Design a 5-question text quiz. Use parallel arrays to hold questions and correct answers. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Stores 5 quiz questions in one array and the 5 correct answers in a parallel array.</li>
<li>(b) Asks each question in order and reads the user's answer.</li>
<li>(c) Compares the user's answer to the correct answer in a case-insensitive way.</li>
<li>(d) Maintains a running score, adding 1 for each correct answer.</li>
<li>(e) At the end, outputs the score (out of 5), the percentage, and a comment: <code>Excellent</code> for &gt;= 4, <code>Good</code> for &gt;= 3, otherwise <code>Try again</code>.</li>
</ul>`,
    py: `# Q7 — Quiz with Score Tracking
questions = [
    "What is the capital of France?",
    "What is 7 * 8?",
    "Which planet is known as the Red Planet?",
    "What is H2O commonly called?",
    "Who wrote Hamlet?"
]
answers = ["Paris", "56", "Mars", "Water", "Shakespeare"]

score = 0
for i in range(5):
    print(questions[i])
    user = input("Your answer: ")
    if user.lower() == answers[i].lower():
        score = score + 1
        print("Correct")
    else:
        print("Wrong. Answer was:", answers[i])

percent = score / 5 * 100
print("Score:", score, "/ 5")
print("Percentage:", percent, "%")

if score &gt;= 4:
    print("Excellent")
elif score &gt;= 3:
    print("Good")
else:
    print("Try again")`,
    pseudo: `<span class="kw">DECLARE</span> Questions : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Answers : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> User : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Score, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Percent : <span class="kw">REAL</span>

Questions[<span class="num">1</span>] ← <span class="str">"What is the capital of France?"</span>   : Answers[<span class="num">1</span>] ← <span class="str">"Paris"</span>
Questions[<span class="num">2</span>] ← <span class="str">"What is 7 * 8?"</span>                  : Answers[<span class="num">2</span>] ← <span class="str">"56"</span>
Questions[<span class="num">3</span>] ← <span class="str">"Which planet is the Red Planet?"</span>  : Answers[<span class="num">3</span>] ← <span class="str">"Mars"</span>
Questions[<span class="num">4</span>] ← <span class="str">"What is H2O called?"</span>             : Answers[<span class="num">4</span>] ← <span class="str">"Water"</span>
Questions[<span class="num">5</span>] ← <span class="str">"Who wrote Hamlet?"</span>               : Answers[<span class="num">5</span>] ← <span class="str">"Shakespeare"</span>

Score ← <span class="num">0</span>
<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">5</span>
  <span class="kw">OUTPUT</span> Questions[i]
  <span class="kw">INPUT</span> User
  <span class="kw">IF</span> LCASE(User) = LCASE(Answers[i]) <span class="kw">THEN</span>
    Score ← Score + <span class="num">1</span>
    <span class="kw">OUTPUT</span> <span class="str">"Correct"</span>
  <span class="kw">ELSE</span>
    <span class="kw">OUTPUT</span> <span class="str">"Wrong. Answer was: "</span>, Answers[i]
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i

Percent ← Score / <span class="num">5</span> * <span class="num">100</span>
<span class="kw">OUTPUT</span> <span class="str">"Score: "</span>, Score, <span class="str">" / 5"</span>
<span class="kw">OUTPUT</span> <span class="str">"Percentage: "</span>, Percent

<span class="kw">IF</span> Score &gt;= <span class="num">4</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"Excellent"</span>
<span class="kw">ELSE</span>
  <span class="kw">IF</span> Score &gt;= <span class="num">3</span> <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Good"</span>
  <span class="kw">ELSE</span>
    <span class="kw">OUTPUT</span> <span class="str">"Try again"</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDIF</span>`,
    marking: [
      ['Two parallel arrays declared and populated with 5 items', 2],
      ['Loop iterates through all 5 questions', 1],
      ['Each question output and user answer read', 2],
      ['Case-insensitive comparison using LCASE / lower', 2],
      ['Score correctly incremented on match', 2],
      ['Immediate feedback (Correct / Wrong) per question', 2],
      ['Percentage calculated correctly (score / 5 * 100)', 2],
      ['Correct branching for Excellent / Good / Try again', 2]
    ]
  },
  {
    title: 'Q8 — Bank Account with Overdraft Prevention',
    marks: 15,
    topic: 'validation',
    text: `<p>Simulate a simple bank account with a starting balance of £100. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Displays a menu with 4 options: 1 = Deposit, 2 = Withdraw, 3 = View Balance, 4 = Quit.</li>
<li>(b) Validates the menu choice — must be 1, 2, 3, or 4. Re-prompt on invalid.</li>
<li>(c) For Deposit, prompts for amount and validates it is &gt; 0 before adding to balance.</li>
<li>(d) For Withdraw, prompts for amount and validates it is &gt; 0 AND &lt;= balance (no overdraft allowed).</li>
<li>(e) For View Balance, outputs the current balance.</li>
<li>(f) Counts deposit and withdrawal transactions. On Quit, outputs the total number of transactions.</li>
</ul>`,
    py: `# Q8 — Bank Account
balance = 100.0
transactions = 0

while True:
    print("1=Deposit 2=Withdraw 3=Balance 4=Quit")
    choice = int(input("Choice: "))
    if choice &lt; 1 or choice &gt; 4:
        print("Invalid choice")
        continue
    if choice == 4:
        break
    elif choice == 1:
        amt = float(input("Amount to deposit: "))
        if amt &gt; 0:
            balance = balance + amt
            transactions = transactions + 1
        else:
            print("Deposit must be greater than 0")
    elif choice == 2:
        amt = float(input("Amount to withdraw: "))
        if amt &lt;= 0:
            print("Withdrawal must be greater than 0")
        elif amt &gt; balance:
            print("Insufficient funds")
        else:
            balance = balance - amt
            transactions = transactions + 1
    elif choice == 3:
        print("Balance: £", balance)

print("Total transactions:", transactions)`,
    pseudo: `<span class="kw">DECLARE</span> Balance, Amount : <span class="kw">REAL</span>
<span class="kw">DECLARE</span> Choice, Transactions : <span class="kw">INTEGER</span>

Balance ← <span class="num">100.00</span>
Transactions ← <span class="num">0</span>

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"1=Deposit 2=Withdraw 3=Balance 4=Quit"</span>
  <span class="kw">REPEAT</span>
    <span class="kw">INPUT</span> Choice
    <span class="kw">IF</span> Choice &lt; <span class="num">1</span> <span class="kw">OR</span> Choice &gt; <span class="num">4</span> <span class="kw">THEN</span>
      <span class="kw">OUTPUT</span> <span class="str">"Invalid choice"</span>
    <span class="kw">ENDIF</span>
  <span class="kw">UNTIL</span> Choice &gt;= <span class="num">1</span> <span class="kw">AND</span> Choice &lt;= <span class="num">4</span>

  <span class="kw">CASE OF</span> Choice
    <span class="num">1</span> : <span class="kw">OUTPUT</span> <span class="str">"Amount: "</span>
        <span class="kw">INPUT</span> Amount
        <span class="kw">IF</span> Amount &gt; <span class="num">0</span> <span class="kw">THEN</span>
          Balance ← Balance + Amount
          Transactions ← Transactions + <span class="num">1</span>
        <span class="kw">ELSE</span>
          <span class="kw">OUTPUT</span> <span class="str">"Must be &gt; 0"</span>
        <span class="kw">ENDIF</span>
    <span class="num">2</span> : <span class="kw">OUTPUT</span> <span class="str">"Amount: "</span>
        <span class="kw">INPUT</span> Amount
        <span class="kw">IF</span> Amount &lt;= <span class="num">0</span> <span class="kw">THEN</span>
          <span class="kw">OUTPUT</span> <span class="str">"Must be &gt; 0"</span>
        <span class="kw">ELSE</span>
          <span class="kw">IF</span> Amount &gt; Balance <span class="kw">THEN</span>
            <span class="kw">OUTPUT</span> <span class="str">"Insufficient funds"</span>
          <span class="kw">ELSE</span>
            Balance ← Balance - Amount
            Transactions ← Transactions + <span class="num">1</span>
          <span class="kw">ENDIF</span>
        <span class="kw">ENDIF</span>
    <span class="num">3</span> : <span class="kw">OUTPUT</span> <span class="str">"Balance: "</span>, Balance
  <span class="kw">ENDCASE</span>
<span class="kw">UNTIL</span> Choice = <span class="num">4</span>

<span class="kw">OUTPUT</span> <span class="str">"Total transactions: "</span>, Transactions`,
    marking: [
      ['Balance initialised to 100 and transactions to 0', 1],
      ['Menu displayed and choice input in a loop', 1],
      ['Menu choice validated 1 to 4 with re-prompt', 2],
      ['Deposit branch: amount > 0 check and balance updated', 3],
      ['Withdraw branch: amount > 0 AND amount <= balance', 3],
      ['Overdraft prevented with clear error message', 1],
      ['View balance outputs current balance', 1],
      ['Transactions counter incremented only on successful op', 2],
      ['Quit exits loop and outputs total transactions', 1]
    ]
  },
  {
    title: 'Q9 — Bubble Sort Names Alphabetically',
    marks: 13,
    topic: 'sorting',
    text: `<p>Write a program that sorts 10 names alphabetically using a bubble sort. Specifically:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Read 10 names from the user into a string array.</li>
<li>(b) Implement bubble sort to sort the array alphabetically. Comparison must be case-insensitive (e.g. "alice" and "Alice" compare equal in ordering).</li>
<li>(c) Preserve the original case of each name when outputting (do not lowercase the stored names).</li>
<li>(d) After sorting, output all 10 names in alphabetical order, one per line.</li>
</ul>`,
    py: `# Q9 — Bubble Sort Names
names = [""] * 10
for i in range(10):
    names[i] = input("Enter name " + str(i + 1) + ": ")

# Bubble sort, case-insensitive compare
for i in range(9):
    for j in range(9 - i):
        if names[j].lower() &gt; names[j + 1].lower():
            temp = names[j]
            names[j] = names[j + 1]
            names[j + 1] = temp

print("Sorted names:")
for i in range(10):
    print(names[i])`,
    pseudo: `<span class="kw">DECLARE</span> Names : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">10</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Temp : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> i, j : <span class="kw">INTEGER</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">10</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter name "</span>, i
  <span class="kw">INPUT</span> Names[i]
<span class="kw">NEXT</span> i

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">9</span>
  <span class="kw">FOR</span> j ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">10</span> - i
    <span class="kw">IF</span> LCASE(Names[j]) &gt; LCASE(Names[j + <span class="num">1</span>]) <span class="kw">THEN</span>
      Temp ← Names[j]
      Names[j] ← Names[j + <span class="num">1</span>]
      Names[j + <span class="num">1</span>] ← Temp
    <span class="kw">ENDIF</span>
  <span class="kw">NEXT</span> j
<span class="kw">NEXT</span> i

<span class="kw">OUTPUT</span> <span class="str">"Sorted names:"</span>
<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">10</span>
  <span class="kw">OUTPUT</span> Names[i]
<span class="kw">NEXT</span> i`,
    marking: [
      ['Array of 10 strings declared and populated', 2],
      ['Outer bubble sort loop (n-1 passes)', 2],
      ['Inner loop with shrinking range each pass', 2],
      ['Case-insensitive comparison (LCASE / lower)', 2],
      ['Swap performed using temporary variable', 2],
      ['Original case preserved (does not overwrite with LCASE)', 1],
      ['Sorted names output in order', 2]
    ]
  },
  {
    title: 'Q10 — Student Data from File with Class Averages',
    marks: 15,
    topic: 'files',
    text: `<p>A file <code>students.txt</code> contains one student record per line in the format <code>name,class,mark</code>, for example <code>Alice,10A,75</code>. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Opens <code>students.txt</code> and reads every line.</li>
<li>(b) For each line, splits the line on the comma into name, class, and mark (cast mark to integer).</li>
<li>(c) Maintains an array of unique class names, a parallel array of totals for each class, and a parallel array of student counts per class.</li>
<li>(d) Outputs each class with its average mark and the number of students in it.</li>
<li>(e) Outputs the overall average mark across all students.</li>
<li>(f) Closes the file.</li>
</ul>`,
    py: `# Q10 — Student Data from File
classes = []
totals = []
counts = []
overall_total = 0
overall_count = 0

f = open("students.txt", "r")
for line in f:
    line = line.strip()
    if line == "":
        continue
    parts = line.split(",")
    if len(parts) != 3:
        continue
    name = parts[0]
    cls = parts[1]
    mark = int(parts[2])

    # Find class index
    found = -1
    for i in range(len(classes)):
        if classes[i] == cls:
            found = i
            break

    if found == -1:
        classes.append(cls)
        totals.append(mark)
        counts.append(1)
    else:
        totals[found] = totals[found] + mark
        counts[found] = counts[found] + 1

    overall_total = overall_total + mark
    overall_count = overall_count + 1
f.close()

for i in range(len(classes)):
    avg = totals[i] / counts[i]
    print("Class", classes[i], "average:", round(avg, 2), "students:", counts[i])

if overall_count &gt; 0:
    print("Overall average:", round(overall_total / overall_count, 2))
else:
    print("No data")`,
    pseudo: `<span class="kw">DECLARE</span> Classes : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">50</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Totals, Counts : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">50</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> NumClasses, OverallTotal, OverallCount, Mark, Found, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Line, Name, Cls : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Avg : <span class="kw">REAL</span>

NumClasses ← <span class="num">0</span>
OverallTotal ← <span class="num">0</span>
OverallCount ← <span class="num">0</span>

<span class="kw">OPENFILE</span> <span class="str">"students.txt"</span> <span class="kw">FOR READ</span>
<span class="kw">WHILE NOT</span> EOF(<span class="str">"students.txt"</span>)
  <span class="kw">READFILE</span> <span class="str">"students.txt"</span>, Line
  <span class="com">// split Line on commas into Name, Cls, Mark</span>
  Name ← <span class="fn">FIELD</span>(Line, <span class="num">1</span>)
  Cls  ← <span class="fn">FIELD</span>(Line, <span class="num">2</span>)
  Mark ← <span class="fn">INT</span>(<span class="fn">FIELD</span>(Line, <span class="num">3</span>))

  Found ← <span class="num">0</span>
  <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> NumClasses
    <span class="kw">IF</span> Classes[i] = Cls <span class="kw">THEN</span>
      Found ← i
    <span class="kw">ENDIF</span>
  <span class="kw">NEXT</span> i

  <span class="kw">IF</span> Found = <span class="num">0</span> <span class="kw">THEN</span>
    NumClasses ← NumClasses + <span class="num">1</span>
    Classes[NumClasses] ← Cls
    Totals[NumClasses] ← Mark
    Counts[NumClasses] ← <span class="num">1</span>
  <span class="kw">ELSE</span>
    Totals[Found] ← Totals[Found] + Mark
    Counts[Found] ← Counts[Found] + <span class="num">1</span>
  <span class="kw">ENDIF</span>

  OverallTotal ← OverallTotal + Mark
  OverallCount ← OverallCount + <span class="num">1</span>
<span class="kw">ENDWHILE</span>
<span class="kw">CLOSEFILE</span> <span class="str">"students.txt"</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> NumClasses
  Avg ← Totals[i] / Counts[i]
  <span class="kw">OUTPUT</span> <span class="str">"Class "</span>, Classes[i], <span class="str">" avg: "</span>, Avg, <span class="str">" students: "</span>, Counts[i]
<span class="kw">NEXT</span> i

<span class="kw">OUTPUT</span> <span class="str">"Overall average: "</span>, OverallTotal / OverallCount`,
    marking: [
      ['File opened correctly for reading', 1],
      ['Read loop until EOF', 1],
      ['Each line split on commas into name, class, mark', 2],
      ['Mark cast to integer', 1],
      ['Parallel arrays for classes, totals, counts maintained', 3],
      ['Lookup loop to find existing class index', 2],
      ['New class appended correctly when not found', 1],
      ['Class average calculated and output per class', 2],
      ['Overall average across all students output, file closed', 2]
    ]
  },
  {
    title: 'Q11 — Caesar Cipher Encryption',
    marks: 15,
    topic: 'strings',
    text: `<p>The Caesar cipher shifts each letter of plaintext by a fixed number N to produce ciphertext. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Asks the user for plaintext and a shift value N. Validate N is in range 1 to 25. Re-prompt on invalid.</li>
<li>(b) Encrypts the plaintext by shifting each letter forward by N positions.</li>
<li>(c) Preserves case: uppercase letters stay uppercase, lowercase letters stay lowercase. Letters wrap around (Z+1 → A, z+1 → a).</li>
<li>(d) Leaves non-letter characters (spaces, digits, punctuation) unchanged.</li>
<li>(e) Outputs the ciphertext.</li>
<li>(f) Asks if the user wants to decrypt. If yes, asks for ciphertext and shift and outputs the original plaintext.</li>
</ul>`,
    py: `# Q11 — Caesar Cipher
def encrypt(text, shift):
    out = ""
    for ch in text:
        code = ord(ch)
        if code &gt;= ord("A") and code &lt;= ord("Z"):
            out = out + chr((code - ord("A") + shift) % 26 + ord("A"))
        elif code &gt;= ord("a") and code &lt;= ord("z"):
            out = out + chr((code - ord("a") + shift) % 26 + ord("a"))
        else:
            out = out + ch
    return out

plaintext = input("Enter plaintext: ")
while True:
    shift = int(input("Enter shift (1 to 25): "))
    if 1 &lt;= shift &lt;= 25:
        break
    print("Invalid shift")

cipher = encrypt(plaintext, shift)
print("Ciphertext:", cipher)

choice = input("Decrypt? (Y/N): ").upper()
if choice == "Y":
    c_text = input("Enter ciphertext: ")
    while True:
        s = int(input("Enter shift (1 to 25): "))
        if 1 &lt;= s &lt;= 25:
            break
        print("Invalid shift")
    print("Plaintext:", encrypt(c_text, 26 - s))`,
    pseudo: `<span class="kw">FUNCTION</span> <span class="fn">Encrypt</span>(Text : <span class="kw">STRING</span>, Shift : <span class="kw">INTEGER</span>) <span class="kw">RETURNS</span> <span class="kw">STRING</span>
  <span class="kw">DECLARE</span> Out, Ch : <span class="kw">STRING</span>
  <span class="kw">DECLARE</span> i, Code : <span class="kw">INTEGER</span>
  Out ← <span class="str">""</span>
  <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> LENGTH(Text)
    Ch ← MID(Text, i, <span class="num">1</span>)
    Code ← ASC(Ch)
    <span class="kw">IF</span> Code &gt;= ASC(<span class="str">"A"</span>) <span class="kw">AND</span> Code &lt;= ASC(<span class="str">"Z"</span>) <span class="kw">THEN</span>
      Out ← Out &amp; CHR((Code - ASC(<span class="str">"A"</span>) + Shift) <span class="kw">MOD</span> <span class="num">26</span> + ASC(<span class="str">"A"</span>))
    <span class="kw">ELSE</span>
      <span class="kw">IF</span> Code &gt;= ASC(<span class="str">"a"</span>) <span class="kw">AND</span> Code &lt;= ASC(<span class="str">"z"</span>) <span class="kw">THEN</span>
        Out ← Out &amp; CHR((Code - ASC(<span class="str">"a"</span>) + Shift) <span class="kw">MOD</span> <span class="num">26</span> + ASC(<span class="str">"a"</span>))
      <span class="kw">ELSE</span>
        Out ← Out &amp; Ch
      <span class="kw">ENDIF</span>
    <span class="kw">ENDIF</span>
  <span class="kw">NEXT</span> i
  <span class="kw">RETURN</span> Out
<span class="kw">ENDFUNCTION</span>

<span class="kw">DECLARE</span> Plain, Cipher, Choice : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Shift : <span class="kw">INTEGER</span>

<span class="kw">OUTPUT</span> <span class="str">"Enter plaintext: "</span> : <span class="kw">INPUT</span> Plain
<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter shift (1-25): "</span>
  <span class="kw">INPUT</span> Shift
<span class="kw">UNTIL</span> Shift &gt;= <span class="num">1</span> <span class="kw">AND</span> Shift &lt;= <span class="num">25</span>

Cipher ← <span class="fn">Encrypt</span>(Plain, Shift)
<span class="kw">OUTPUT</span> <span class="str">"Ciphertext: "</span>, Cipher

<span class="kw">OUTPUT</span> <span class="str">"Decrypt? (Y/N): "</span> : <span class="kw">INPUT</span> Choice
<span class="kw">IF</span> UCASE(Choice) = <span class="str">"Y"</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"Enter ciphertext: "</span> : <span class="kw">INPUT</span> Cipher
  <span class="kw">REPEAT</span>
    <span class="kw">INPUT</span> Shift
  <span class="kw">UNTIL</span> Shift &gt;= <span class="num">1</span> <span class="kw">AND</span> Shift &lt;= <span class="num">25</span>
  <span class="kw">OUTPUT</span> <span class="str">"Plaintext: "</span>, <span class="fn">Encrypt</span>(Cipher, <span class="num">26</span> - Shift)
<span class="kw">ENDIF</span>`,
    marking: [
      ['Plaintext and shift input, shift validated 1 to 25', 2],
      ['Loop through each character of the plaintext', 1],
      ['Uppercase A-Z handled with wrap-around using MOD 26', 3],
      ['Lowercase a-z handled with wrap-around (separate branch)', 2],
      ['Non-letter characters preserved unchanged', 2],
      ['Ciphertext built and output', 1],
      ['Decrypt path: prompt for Y/N and re-input ciphertext + shift', 2],
      ['Decryption uses inverse shift (26 - shift) or reverse logic', 2]
    ]
  },
  {
    title: 'Q12 — Multiple-Choice Quiz with Validation',
    marks: 15,
    topic: 'validation',
    text: `<p>Design a 5-question multiple-choice quiz. Each question has 4 options (A, B, C, D) and one correct answer. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Stores the 5 questions, options, and correct answers (parallel arrays).</li>
<li>(b) Displays each question along with its four options.</li>
<li>(c) Reads the user's answer and validates it is A, B, C, or D (case-insensitive). Re-prompt on invalid.</li>
<li>(d) Gives immediate feedback after each question: <code>Correct</code> or <code>Wrong, answer was X</code>.</li>
<li>(e) Tracks the running score and outputs the total score and percentage at the end.</li>
</ul>`,
    py: `# Q12 — MCQ Quiz with Validation
questions = [
    "Capital of Japan?",
    "Largest planet?",
    "2 + 2 * 3 = ?",
    "Boolean operator for 'both true'?",
    "Binary 1011 in decimal?"
]
options = [
    "A) Tokyo B) Beijing C) Seoul D) Bangkok",
    "A) Earth B) Mars C) Jupiter D) Saturn",
    "A) 12 B) 8 C) 10 D) 6",
    "A) OR B) AND C) NOT D) XOR",
    "A) 9 B) 10 C) 11 D) 12"
]
correct = ["A", "C", "B", "B", "C"]

score = 0
for i in range(5):
    print(questions[i])
    print(options[i])
    while True:
        ans = input("Your answer (A/B/C/D): ").upper()
        if ans in ["A", "B", "C", "D"]:
            break
        print("Invalid. Enter A, B, C, or D.")

    if ans == correct[i]:
        print("Correct")
        score = score + 1
    else:
        print("Wrong, answer was", correct[i])

percent = score / 5 * 100
print("Score:", score, "/ 5")
print("Percentage:", percent, "%")`,
    pseudo: `<span class="kw">DECLARE</span> Questions, Options : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Correct : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">5</span>] <span class="kw">OF</span> <span class="kw">CHAR</span>
<span class="kw">DECLARE</span> Ans : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Score, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Percent : <span class="kw">REAL</span>

<span class="com">// initialise arrays here ...</span>
Score ← <span class="num">0</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">5</span>
  <span class="kw">OUTPUT</span> Questions[i]
  <span class="kw">OUTPUT</span> Options[i]
  <span class="kw">REPEAT</span>
    <span class="kw">OUTPUT</span> <span class="str">"Your answer (A/B/C/D): "</span>
    <span class="kw">INPUT</span> Ans
    Ans ← UCASE(Ans)
    <span class="kw">IF</span> Ans &lt;&gt; <span class="str">"A"</span> <span class="kw">AND</span> Ans &lt;&gt; <span class="str">"B"</span> <span class="kw">AND</span> Ans &lt;&gt; <span class="str">"C"</span> <span class="kw">AND</span> Ans &lt;&gt; <span class="str">"D"</span> <span class="kw">THEN</span>
      <span class="kw">OUTPUT</span> <span class="str">"Invalid. Enter A, B, C or D."</span>
    <span class="kw">ENDIF</span>
  <span class="kw">UNTIL</span> Ans = <span class="str">"A"</span> <span class="kw">OR</span> Ans = <span class="str">"B"</span> <span class="kw">OR</span> Ans = <span class="str">"C"</span> <span class="kw">OR</span> Ans = <span class="str">"D"</span>

  <span class="kw">IF</span> Ans = Correct[i] <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Correct"</span>
    Score ← Score + <span class="num">1</span>
  <span class="kw">ELSE</span>
    <span class="kw">OUTPUT</span> <span class="str">"Wrong, answer was "</span>, Correct[i]
  <span class="kw">ENDIF</span>
<span class="kw">NEXT</span> i

Percent ← Score / <span class="num">5</span> * <span class="num">100</span>
<span class="kw">OUTPUT</span> <span class="str">"Score: "</span>, Score, <span class="str">" / 5"</span>
<span class="kw">OUTPUT</span> <span class="str">"Percentage: "</span>, Percent`,
    marking: [
      ['Three parallel arrays for questions, options, correct answers', 2],
      ['Outer loop iterates over all 5 questions', 1],
      ['Question and four options displayed each round', 2],
      ['Validation loop: re-prompt until A/B/C/D entered', 3],
      ['Case-insensitive comparison using UCASE / upper', 1],
      ['Score incremented only on correct answer', 2],
      ['Immediate feedback: Correct or Wrong, answer was X', 2],
      ['Final score and percentage output', 2]
    ]
  },
  {
    title: 'Q13 — Computer-Guesses-Your-Number (Binary Search)',
    marks: 13,
    topic: 'searching',
    text: `<p>The user thinks of a secret integer between 1 and 100 inclusive. The computer tries to guess it using binary search. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Maintains a search range [low, high], initially [1, 100].</li>
<li>(b) On each step, computes guess = (low + high) DIV 2 and asks the user "H/L/C?" (higher / lower / correct).</li>
<li>(c) Updates low or high based on the user's reply. Counts the number of guesses made.</li>
<li>(d) Stops when the user answers C and outputs the number of guesses needed.</li>
<li>(e) Validates user input — only H, L, C accepted (re-prompt on others).</li>
<li>(f) If at any point low &gt; high (i.e. the user's answers are inconsistent), outputs <code>Cheating detected</code> and stops.</li>
</ul>`,
    py: `# Q13 — Binary Search Guess
low = 1
high = 100
guesses = 0
cheating = False

while True:
    if low &gt; high:
        cheating = True
        break

    guess = (low + high) // 2
    guesses = guesses + 1
    print("My guess:", guess)

    while True:
        reply = input("H (higher) / L (lower) / C (correct): ").upper()
        if reply in ["H", "L", "C"]:
            break
        print("Invalid. Enter H, L, or C.")

    if reply == "C":
        print("Got it in", guesses, "guesses")
        break
    elif reply == "H":
        low = guess + 1
    elif reply == "L":
        high = guess - 1

if cheating:
    print("Cheating detected")`,
    pseudo: `<span class="kw">DECLARE</span> Low, High, Guess, Guesses : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Reply : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Cheating, Done : <span class="kw">BOOLEAN</span>

Low ← <span class="num">1</span>
High ← <span class="num">100</span>
Guesses ← <span class="num">0</span>
Cheating ← <span class="kw">FALSE</span>
Done ← <span class="kw">FALSE</span>

<span class="kw">WHILE</span> Done = <span class="kw">FALSE</span> <span class="kw">AND</span> Cheating = <span class="kw">FALSE</span>
  <span class="kw">IF</span> Low &gt; High <span class="kw">THEN</span>
    Cheating ← <span class="kw">TRUE</span>
  <span class="kw">ELSE</span>
    Guess ← (Low + High) <span class="kw">DIV</span> <span class="num">2</span>
    Guesses ← Guesses + <span class="num">1</span>
    <span class="kw">OUTPUT</span> <span class="str">"My guess: "</span>, Guess

    <span class="kw">REPEAT</span>
      <span class="kw">OUTPUT</span> <span class="str">"H / L / C ?"</span>
      <span class="kw">INPUT</span> Reply
      Reply ← UCASE(Reply)
    <span class="kw">UNTIL</span> Reply = <span class="str">"H"</span> <span class="kw">OR</span> Reply = <span class="str">"L"</span> <span class="kw">OR</span> Reply = <span class="str">"C"</span>

    <span class="kw">CASE OF</span> Reply
      <span class="str">"C"</span> : Done ← <span class="kw">TRUE</span>
      <span class="str">"H"</span> : Low ← Guess + <span class="num">1</span>
      <span class="str">"L"</span> : High ← Guess - <span class="num">1</span>
    <span class="kw">ENDCASE</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDWHILE</span>

<span class="kw">IF</span> Cheating = <span class="kw">TRUE</span> <span class="kw">THEN</span>
  <span class="kw">OUTPUT</span> <span class="str">"Cheating detected"</span>
<span class="kw">ELSE</span>
  <span class="kw">OUTPUT</span> <span class="str">"Got it in "</span>, Guesses, <span class="str">" guesses"</span>
<span class="kw">ENDIF</span>`,
    marking: [
      ['low and high initialised to 1 and 100', 1],
      ['Guess counter initialised to 0', 1],
      ['Main loop that continues until C or cheating', 1],
      ['Guess computed as (low + high) DIV 2', 2],
      ['Reply input validated to H, L, or C with re-prompt', 2],
      ['low and high updated correctly on H and L', 3],
      ['Number of guesses output on C', 1],
      ['Cheating detected when low > high', 2]
    ]
  },
  {
    title: 'Q14 — Library Book Checkout System',
    marks: 15,
    topic: 'mixed',
    text: `<p>A library stores 8 books, each with a unique BookID (1 to 8), Title, Author, and an Available flag. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Initialises four parallel arrays of size 8: BookID, Title, Author, Available (all true at start).</li>
<li>(b) Displays a menu: 1 = View all, 2 = Search by title (partial, case-insensitive), 3 = Checkout, 4 = Return, 5 = Quit. Validate menu choice with re-prompt.</li>
<li>(c) View all: lists every book with status (Available / On loan).</li>
<li>(d) Search: ask for substring, output every book whose title contains it.</li>
<li>(e) Checkout: ask for BookID, validate it is 1..8. If available, mark unavailable; otherwise output <code>Already on loan</code>.</li>
<li>(f) Return: ask for BookID. If currently on loan, mark available; otherwise output <code>That book is not on loan</code>.</li>
</ul>`,
    py: `# Q14 — Library Book Checkout
book_id = [1, 2, 3, 4, 5, 6, 7, 8]
title   = ["1984", "Hobbit", "Dune", "Emma", "Frankenstein",
           "Gatsby", "Hamlet", "Iliad"]
author  = ["Orwell", "Tolkien", "Herbert", "Austen", "Shelley",
           "Fitzgerald", "Shakespeare", "Homer"]
available = [True] * 8

while True:
    print("1=View 2=Search 3=Checkout 4=Return 5=Quit")
    while True:
        choice = int(input("Choice: "))
        if 1 &lt;= choice &lt;= 5:
            break
        print("Invalid")

    if choice == 5:
        break
    elif choice == 1:
        for i in range(8):
            status = "Available" if available[i] else "On loan"
            print(book_id[i], title[i], "by", author[i], "-", status)
    elif choice == 2:
        sub = input("Search title: ").lower()
        for i in range(8):
            if sub in title[i].lower():
                print(book_id[i], title[i])
    elif choice == 3:
        bid = int(input("BookID: "))
        if bid &lt; 1 or bid &gt; 8:
            print("Invalid BookID")
        elif available[bid - 1]:
            available[bid - 1] = False
            print("Checked out")
        else:
            print("Already on loan")
    elif choice == 4:
        bid = int(input("BookID: "))
        if bid &lt; 1 or bid &gt; 8:
            print("Invalid BookID")
        elif not available[bid - 1]:
            available[bid - 1] = True
            print("Returned")
        else:
            print("That book is not on loan")`,
    pseudo: `<span class="kw">DECLARE</span> BookID : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">8</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Title, Author : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">8</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Available : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">8</span>] <span class="kw">OF</span> <span class="kw">BOOLEAN</span>
<span class="kw">DECLARE</span> Choice, BID, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Sub : <span class="kw">STRING</span>

<span class="com">// initialise arrays (omitted for brevity)</span>
<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">8</span> : Available[i] ← <span class="kw">TRUE</span> <span class="kw">NEXT</span> i

<span class="kw">REPEAT</span>
  <span class="kw">OUTPUT</span> <span class="str">"1=View 2=Search 3=Checkout 4=Return 5=Quit"</span>
  <span class="kw">REPEAT</span>
    <span class="kw">INPUT</span> Choice
  <span class="kw">UNTIL</span> Choice &gt;= <span class="num">1</span> <span class="kw">AND</span> Choice &lt;= <span class="num">5</span>

  <span class="kw">CASE OF</span> Choice
    <span class="num">1</span> : <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">8</span>
          <span class="kw">IF</span> Available[i] <span class="kw">THEN</span>
            <span class="kw">OUTPUT</span> BookID[i], Title[i], <span class="str">" Available"</span>
          <span class="kw">ELSE</span>
            <span class="kw">OUTPUT</span> BookID[i], Title[i], <span class="str">" On loan"</span>
          <span class="kw">ENDIF</span>
        <span class="kw">NEXT</span> i
    <span class="num">2</span> : <span class="kw">INPUT</span> Sub
        <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> <span class="num">8</span>
          <span class="kw">IF</span> LCASE(Sub) <span class="kw">IN</span> LCASE(Title[i]) <span class="kw">THEN</span>
            <span class="kw">OUTPUT</span> BookID[i], Title[i]
          <span class="kw">ENDIF</span>
        <span class="kw">NEXT</span> i
    <span class="num">3</span> : <span class="kw">INPUT</span> BID
        <span class="kw">IF</span> BID &lt; <span class="num">1</span> <span class="kw">OR</span> BID &gt; <span class="num">8</span> <span class="kw">THEN</span>
          <span class="kw">OUTPUT</span> <span class="str">"Invalid BookID"</span>
        <span class="kw">ELSE</span>
          <span class="kw">IF</span> Available[BID] = <span class="kw">TRUE</span> <span class="kw">THEN</span>
            Available[BID] ← <span class="kw">FALSE</span>
          <span class="kw">ELSE</span>
            <span class="kw">OUTPUT</span> <span class="str">"Already on loan"</span>
          <span class="kw">ENDIF</span>
        <span class="kw">ENDIF</span>
    <span class="num">4</span> : <span class="kw">INPUT</span> BID
        <span class="kw">IF</span> BID &lt; <span class="num">1</span> <span class="kw">OR</span> BID &gt; <span class="num">8</span> <span class="kw">THEN</span>
          <span class="kw">OUTPUT</span> <span class="str">"Invalid BookID"</span>
        <span class="kw">ELSE</span>
          <span class="kw">IF</span> Available[BID] = <span class="kw">FALSE</span> <span class="kw">THEN</span>
            Available[BID] ← <span class="kw">TRUE</span>
          <span class="kw">ELSE</span>
            <span class="kw">OUTPUT</span> <span class="str">"That book is not on loan"</span>
          <span class="kw">ENDIF</span>
        <span class="kw">ENDIF</span>
  <span class="kw">ENDCASE</span>
<span class="kw">UNTIL</span> Choice = <span class="num">5</span>`,
    marking: [
      ['Four parallel arrays initialised correctly', 2],
      ['Menu displayed and choice validated 1 to 5', 2],
      ['View all lists every book with status string', 2],
      ['Search uses substring + case-insensitive match', 2],
      ['Checkout validates BookID is 1 to 8', 1],
      ['Checkout marks unavailable / errors if already out', 2],
      ['Return marks available / errors if not on loan', 2],
      ['Loop continues until Quit (5) selected', 2]
    ]
  },
  {
    title: 'Q15 — CSV Calculator',
    marks: 15,
    topic: 'files',
    text: `<p>A file <code>data.csv</code> stores marks. Line 1 holds column headers, for example <code>Name,Math,English,Science</code>. Each subsequent line stores one student, for example <code>Alex,75,82,90</code>. Write a program that:</p>
<ul class="list-disc pl-6 mt-2 text-sm space-y-1">
<li>(a) Opens <code>data.csv</code> and reads the header line first. Determine the number of numeric columns (= total columns − 1).</li>
<li>(b) For each subsequent line, splits on commas. If the row does not have the right number of fields, output <code>Warning: skipping malformed line</code> and continue.</li>
<li>(c) Maintains running sums for each numeric column.</li>
<li>(d) Tracks the student with the highest total across all subjects.</li>
<li>(e) After reading the whole file, outputs the sum and the average for each numeric column.</li>
<li>(f) Outputs the name of the highest scorer and their total.</li>
</ul>`,
    py: `# Q15 — CSV Calculator
f = open("data.csv", "r")
header_line = f.readline().strip()
headers = header_line.split(",")
num_cols = len(headers) - 1

sums = [0] * num_cols
count = 0
best_name = ""
best_total = -1

for line in f:
    line = line.strip()
    if line == "":
        continue
    parts = line.split(",")
    if len(parts) != num_cols + 1:
        print("Warning: skipping malformed line")
        continue

    name = parts[0]
    total = 0
    valid = True
    row_vals = []
    for i in range(num_cols):
        try:
            val = int(parts[i + 1])
        except ValueError:
            valid = False
            break
        row_vals.append(val)
        total = total + val

    if not valid:
        print("Warning: skipping malformed line")
        continue

    for i in range(num_cols):
        sums[i] = sums[i] + row_vals[i]
    count = count + 1

    if total &gt; best_total:
        best_total = total
        best_name = name

f.close()

if count == 0:
    print("No valid rows")
else:
    for i in range(num_cols):
        avg = sums[i] / count
        print(headers[i + 1], "sum:", sums[i], "avg:", round(avg, 2))
    print("Top scorer:", best_name, "total:", best_total)`,
    pseudo: `<span class="kw">DECLARE</span> Sums : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">10</span>] <span class="kw">OF</span> <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Headers : <span class="kw">ARRAY</span>[<span class="num">1</span>:<span class="num">10</span>] <span class="kw">OF</span> <span class="kw">STRING</span>
<span class="kw">DECLARE</span> NumCols, Count, Total, BestTotal, Val, i : <span class="kw">INTEGER</span>
<span class="kw">DECLARE</span> Line, Name, BestName : <span class="kw">STRING</span>
<span class="kw">DECLARE</span> Avg : <span class="kw">REAL</span>

<span class="kw">OPENFILE</span> <span class="str">"data.csv"</span> <span class="kw">FOR READ</span>
<span class="kw">READFILE</span> <span class="str">"data.csv"</span>, Line
<span class="com">// parse header line, set NumCols and Headers[]</span>
NumCols ← COUNTFIELDS(Line, <span class="str">","</span>) - <span class="num">1</span>
<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> NumCols
  Headers[i] ← <span class="fn">FIELD</span>(Line, i + <span class="num">1</span>)
  Sums[i] ← <span class="num">0</span>
<span class="kw">NEXT</span> i

Count ← <span class="num">0</span>
BestName ← <span class="str">""</span>
BestTotal ← -<span class="num">1</span>

<span class="kw">WHILE NOT</span> EOF(<span class="str">"data.csv"</span>)
  <span class="kw">READFILE</span> <span class="str">"data.csv"</span>, Line
  <span class="kw">IF</span> COUNTFIELDS(Line, <span class="str">","</span>) &lt;&gt; NumCols + <span class="num">1</span> <span class="kw">THEN</span>
    <span class="kw">OUTPUT</span> <span class="str">"Warning: skipping malformed line"</span>
  <span class="kw">ELSE</span>
    Name ← <span class="fn">FIELD</span>(Line, <span class="num">1</span>)
    Total ← <span class="num">0</span>
    <span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> NumCols
      Val ← <span class="fn">INT</span>(<span class="fn">FIELD</span>(Line, i + <span class="num">1</span>))
      Sums[i] ← Sums[i] + Val
      Total ← Total + Val
    <span class="kw">NEXT</span> i
    Count ← Count + <span class="num">1</span>
    <span class="kw">IF</span> Total &gt; BestTotal <span class="kw">THEN</span>
      BestTotal ← Total
      BestName ← Name
    <span class="kw">ENDIF</span>
  <span class="kw">ENDIF</span>
<span class="kw">ENDWHILE</span>
<span class="kw">CLOSEFILE</span> <span class="str">"data.csv"</span>

<span class="kw">FOR</span> i ← <span class="num">1</span> <span class="kw">TO</span> NumCols
  Avg ← Sums[i] / Count
  <span class="kw">OUTPUT</span> Headers[i], <span class="str">" sum: "</span>, Sums[i], <span class="str">" avg: "</span>, Avg
<span class="kw">NEXT</span> i
<span class="kw">OUTPUT</span> <span class="str">"Top scorer: "</span>, BestName, <span class="str">" total: "</span>, BestTotal`,
    marking: [
      ['File opened and header line read separately', 2],
      ['Number of numeric columns derived from header', 1],
      ['Read loop iterates through remaining lines until EOF', 1],
      ['Field count check, malformed lines skipped with warning', 3],
      ['Running sums maintained for each numeric column', 2],
      ['Total per student computed across numeric columns', 2],
      ['Highest-scoring student tracked by total', 2],
      ['Per-column sum and average output for each column', 1],
      ['Top scorer name and total output, file closed', 1]
    ]
  }
];
