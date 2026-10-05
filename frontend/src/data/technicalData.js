export const technicalCategories = [
  'All',
  'Programming Fundamentals',
  'Web Development',
  'DSA',
  'Databases',
  'Operating Systems',
  'Computer Networks',
  'AI & ML',
  'Software Engineering',
];

export const technicalTopics = [
  // 1. Programming Basics & How Code Executes
  {
    id: 'programming-basics',
    slug: 'programming-basics',
    title: 'Programming Basics & How Code Executes',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '25 mins',
    description: 'Master the translation pipeline from source code to Abstract Syntax Trees (AST), Bytecode, Assembly, Machine Code, and CPU execution.',
    whatIsIt: 'Programming is the formal practice of expressing computational algorithms as human-readable source code, which is systematically translated into binary machine instructions (0s and 1s) that microprocessors execute natively on computer hardware.',
    deepDive: `When you write and run code, it undergoes a multi-stage compilation or interpretation pipeline:
1. Lexical Analysis (Tokenization): Source code text is broken down into atomic tokens (keywords, identifiers, operators, literals).
2. Syntax Analysis (Parsing): Tokens are structured into an Abstract Syntax Tree (AST) representing the formal grammar and hierarchical relationships of the code.
3. Semantic Analysis & Type Checking: The compiler verifies type compatibility, scope visibility, and variable declarations.
4. Intermediate Code Generation & Optimization: Code is converted into an intermediate representation (like LLVM IR, Java Bytecode, or V8 Bytecode) where dead code elimination, loop unrolling, and inline expansion occur.
5. Code Generation: The optimizer emits native machine assembly code specifically targeted to the CPU architecture (x86_64, ARM64, RISC-V).
6. Execution in CPU: Instructions are fetched into the CPU Instruction Register, decoded by the Control Unit, executed in the Arithmetic Logic Unit (ALU), and results are written back to registers or cache (L1/L2/L3) and RAM.`,
    memoryAllocation: `How the program is organized in memory during execution:
• Text/Code Segment: Read-only memory region storing compiled binary machine instructions.
• Data Segment: Stores initialized global, static, and constant variables.
• BSS Segment: Stores uninitialized global and static variables, zero-filled by the OS loader.
• Stack: Fast, contiguous, LIFO memory automatically managed by the CPU for local variables, parameters, and activation frames.
• Heap: Dynamic, non-contiguous memory dynamically allocated at runtime (via malloc, new, or object instantiations) and reclaimed manually or by Garbage Collectors.`,
    typesAndRules: `Fundamental Execution Models & Rules:
1. Compiled Execution (C, C++, Rust, Go): Ahead-of-time (AOT) compilation directly into native binary executables. Provides maximum CPU performance, zero runtime interpreter overhead, and direct memory manipulation.
2. Interpreted Execution (Python, Ruby, PHP): Interpreters read and evaluate source code or bytecode line-by-line in a virtual machine runtime, prioritizing developer speed and dynamic scripting.
3. JIT-Compiled Hybrid (JavaScript V8, Java HotSpot, C# CLR): Code starts interpreted as bytecode, while the Just-In-Time (JIT) compiler identifies "hot" functions and compiles them into highly optimized native machine code at runtime.
4. Determinism Rule: Given the same program state and inputs, a deterministic algorithm must always produce identical outputs across identical hardware architectures.`,
    simpleExplanation: 'Think of writing code like composing a musical score. The notes on paper are source code, the conductor reading and orchestrating the score is the runtime/interpreter, and the physical instruments producing real sound waves are the CPU transistors vibrating with electrical charges.',
    whyLearnIt: 'Understanding how code executes beneath the syntax enables you to debug performance bottlenecks, avoid cache misses, optimize algorithmic complexity, and write memory-efficient software systems.',
    realWorldExample: 'High-frequency trading (HFT) engines optimize execution pipelines down to individual CPU cache lines and instruction cycles to execute financial orders in under 500 nanoseconds.',
    whereUsed: 'Operating system kernels, game engines, database engines, browsers, embedded microcontrollers, and cloud virtualization layers.',
    keyPoints: [
      'The CPU only executes binary machine instructions encoded for its specific Instruction Set Architecture (ISA).',
      'The Lexer, Parser, and AST form the backbone of compilers, linters, and code formatters.',
      'Modern runtimes combine Interpretation for fast startup with JIT compilation for peak execution speed.',
      'Memory is strictly divided into Code, Data, Stack, and Heap segments by the OS loader.',
    ],
    advantages: [
      'Enables systematic problem decomposition into deterministic logical steps.',
      'Provides complete control over digital hardware, sensors, and network interfaces.',
      'Forms the prerequisite foundation for all software engineering and algorithmic problem-solving.',
    ],
    commonMistakes: [
      'Assuming all programming languages execute in the same manner without considering runtime compilation models.',
      'Ignoring CPU cache locality and memory hierarchy when writing high-throughput data pipelines.',
      'Neglecting compiler warnings and error outputs that identify subtle semantic flaws.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Low-level demonstration of data representation and execution timing
function demonstrateExecutionPipeline() {
  const label = "CPU Pipeline Benchmark";
  console.time(label);

  // Allocating typed continuous memory buffer (mimicking low-level array layout)
  const buffer = new ArrayBuffer(1024); // 1 KB of raw memory
  const view = new Int32Array(buffer);  // 32-bit (4-byte) integer view

  // Sequential memory writes (CPU Cache Friendly)
  for (let i = 0; i < view.length; i++) {
    view[i] = i * 2;
  }

  // Linear accumulation
  let sum = 0;
  for (let i = 0; i < view.length; i++) {
    sum += view[i];
  }

  console.timeEnd(label);
  console.log(\`Processed \${view.length} contiguous 32-bit integers. Total Sum: \${sum}\`);
}

demonstrateExecutionPipeline();`,
      explanation: 'Uses typed ArrayBuffers to demonstrate how memory allocation and sequential CPU cache lines operate in low-level memory arrays.',
    },
    practiceQuestions: [
      {
        question: 'What is the role of an Abstract Syntax Tree (AST) in a compiler or interpreter?',
        hint: 'Think about converting raw characters into a grammatical hierarchy.',
        answer: 'An AST is a tree representation of the abstract syntactic structure of source code. It validates grammatical correctness, enables type checking, and serves as the input for optimization passes and bytecode generation.',
      },
      {
        question: 'What is Just-In-Time (JIT) compilation and how does it combine advantages of compilation and interpretation?',
        hint: 'Think about running bytecode initially and compiling hot spots.',
        answer: 'JIT compilation starts by interpreting bytecode for instant startup, then profiles execution to detect frequently executed "hot" code paths, compiling them into optimized native machine code during execution.',
      },
      {
        question: 'Why is accessing memory in the CPU L1/L2 cache thousands of times faster than fetching from main RAM?',
        hint: 'Physical proximity and electronic transit delays.',
        answer: 'L1/L2 caches reside directly on the CPU silicon die with dedicated wide bus channels and SRAM circuitry (access time ~1-4 cycles), whereas accessing DRAM requires off-chip memory bus traversal taking ~100-300 CPU cycles.',
      },
    ],
    relatedTopics: ['variables-and-data-types', 'operators-and-conditions', 'functions-and-oop'],
  },

  // 2. Variables & Data Types
  {
    id: 'variables-and-data-types',
    slug: 'variables-and-data-types',
    title: 'Variables, Data Types & Memory Allocation',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '30 mins',
    description: 'In-depth exploration of memory addresses, Stack vs Heap storage, primitive vs reference types, hoisting, mutability, and scoping rules.',
    whatIsIt: 'A variable is a named symbolic identifier bound to a specific memory address in RAM. A Data Type defines the size in bytes, internal bit representation, and legal operations that can be performed on the value stored at that address.',
    deepDive: `Variables act as symbolic aliases for memory addresses:
• When you declare 'let x = 42', the runtime reserves 8 bytes (or 4 bytes depending on language/architecture) in memory and registers 'x' in the lexical environment scope table.
• Primitive Values (numbers, booleans, characters, pointers) contain raw values directly within their assigned memory slots.
• Reference Types (objects, arrays, strings in dynamic languages) store a memory address pointer (usually 64 bits/8 bytes) on the Stack that points to the actual data structure allocated dynamically on the Heap.
• Value Copy vs Reference Copy: Copying a primitive copies the literal bits to a brand new stack slot (independent mutation). Copying an object copies only the memory pointer; both variables now point to the exact same heap memory block.
• Temporal Dead Zone (TDZ): In modern JavaScript, 'let' and 'const' declarations are hoisted to the top of their enclosing block scope during parsing, but remain uninitialized until execution reaches the declaration line. Accessing them beforehand throws a ReferenceError.`,
    memoryAllocation: `Memory Allocation Mechanics (Stack vs Heap):
1. Stack Allocation:
   - Size: Fixed and determined at compile time or upon entering a function frame.
   - Speed: Blazing fast ($O(1)$ push/pop via Stack Pointer register ESP/RSP).
   - Lifetime: Scope-bound. Automatically destroyed when the function call stack frame pops.
   - Content: Local primitives, function parameters, return addresses, and heap object pointers.
2. Heap Allocation:
   - Size: Dynamic and expandable at runtime.
   - Speed: Slower ($O(1)$ to $O(N)$ allocator search for contiguous free memory chunks).
   - Lifetime: Persists until explicitly freed (C/C++) or collected by the Garbage Collector (JS/Java/Python) when reference count or reachability graph drops to zero.
   - Content: Objects, hash maps, dynamically sized arrays, closures.`,
    typesAndRules: `Classification of Types & Governing Rules:
1. Primitive Data Types:
   - Integer (int8, int16, int32, int64): Signed/Unsigned two's complement binary representation.
   - Floating-Point (float32, double64): IEEE 754 standard (sign bit, exponent, mantissa).
   - Boolean (bool): 1 byte representing true (1) or false (0).
   - Character (char): UTF-8 (1-4 bytes) or UTF-16 (2 bytes).
2. Reference & Composite Types:
   - Arrays (contiguous memory blocks), Structs/Objects (keyed attribute maps), Tuples, Interfaces.
3. Variable Declaration Rules:
   - 'const': Immutable binding. The memory reference cannot be reassigned; however, nested object properties remain mutable unless frozen (Object.freeze()).
   - 'let': Block-scoped mutable binding. Exists only within the enclosing { } block.
   - 'var': Legacy function-scoped binding with hoisting to function top, prone to leak outside loops.
4. Naming Conventions:
   - camelCase for variables/functions ('userAccountBalance').
   - PascalCase for classes/interfaces ('UserProfileManager').
   - UPPER_SNAKE_CASE for compile-time constants ('MAX_RETRY_LIMIT').`,
    simpleExplanation: 'Imagine an office filing system. A Primitive is writing a phone number directly on a sticky note and putting it in your desk drawer (Stack). A Reference is putting a giant binder in the basement warehouse (Heap) and putting only the warehouse shelf address on your sticky note (Pointer).',
    whyLearnIt: 'Understanding data types and memory allocation prevents memory leaks, pointer bugs, unexpected object mutation side effects, and integer overflow vulnerabilities.',
    realWorldExample: 'NASA\'s Ariane 5 rocket exploded in 1996 due to a software crash caused by converting a 64-bit floating-point velocity value into a 16-bit signed integer, triggering an unhandled hardware integer overflow.',
    whereUsed: 'All software architectures, relational database schema design, protocol buffers, and network serialization formats.',
    keyPoints: [
      'Primitives are stored directly on the Stack; Reference objects reside on the Heap with a Stack pointer.',
      'Passing objects to functions passes the reference by value; mutations affect the original object.',
      'IEEE 754 floating-point arithmetic can introduce rounding inaccuracies (e.g., 0.1 + 0.2 !== 0.3).',
      'Always prefer "const" by default, and use "let" strictly when reassignment is required.',
    ],
    advantages: [
      'Provides strong type safety and structural predictability across application logic.',
      'Prevents uninitialized memory access errors and buffer overflow security flaws.',
      'Enables the compiler and JIT engines to aggressively optimize memory layout.',
    ],
    commonMistakes: [
      'Directly mutating an object or array passed into a pure function instead of creating an immutable copy.',
      'Assuming "const obj = {}" freezes the object properties (it only prevents reassignment of the variable binding).',
      'Confusing loose equality (==) with strict equality (===), triggering unexpected implicit type coercion.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Deep Dive: Memory references, mutation, and cloning
const originalStudent = {
  id: 101,
  name: "Ayesha",
  skills: ["JavaScript", "Python"],
};

// Shallow Copy (Pointer reference copy for nested arrays)
const shallowCopy = { ...originalStudent };

// Mutating nested array in shallow copy affects the original object!
shallowCopy.skills.push("Rust");

console.log("Original skills:", originalStudent.skills); // ["JavaScript", "Python", "Rust"] -> Side effect!

// True Deep Clone (Allocates completely independent Heap memory)
const deepClone = structuredClone(originalStudent);
deepClone.skills.push("Go");

console.log("Original after deep clone push:", originalStudent.skills); // ["JavaScript", "Python", "Rust"]
console.log("Deep cloned skills:", deepClone.skills);                   // ["JavaScript", "Python", "Rust", "Go"]`,
      explanation: 'Demonstrates stack pointer references, shallow copy mutations, and deep cloning with structuredClone() to prevent accidental shared memory bugs.',
    },
    practiceQuestions: [
      {
        question: 'Why does 0.1 + 0.2 evaluate to 0.30000000000000004 in IEEE 754 floating-point standard?',
        hint: 'Binary fractions cannot represent 1/10 infinitely without repeating binary expansions.',
        answer: 'In base-2 binary floating-point representation, fractions like 0.1 (1/10) and 0.2 (1/5) result in infinitely repeating binary decimals, similar to 1/3 in base-10. Rounding this infinite binary mantissa to 53 bits creates minute precision truncation.',
      },
      {
        question: 'What is the difference between Stack memory and Heap memory in terms of speed and lifecycle?',
        hint: 'Contiguous LIFO vs dynamic non-contiguous allocation.',
        answer: 'Stack memory is extremely fast, contiguous LIFO memory whose lifecycle is strictly tied to function activation frames. Heap memory is flexible dynamic memory that persists until explicitly deallocated or garbage collected.',
      },
      {
        question: 'What is the Temporal Dead Zone (TDZ) for let and const variables in JavaScript?',
        hint: 'What happens between hoisting and initialization?',
        answer: 'The TDZ is the period between entering a block scope (when let/const variables are bound) and the execution of the actual declaration line where the variable is initialized. Accessing the variable in the TDZ triggers a ReferenceError.',
      },
    ],
    relatedTopics: ['programming-basics', 'operators-and-conditions', 'functions-and-oop'],
  },

  // 3. Operators & Conditions
  {
    id: 'operators-and-conditions',
    slug: 'operators-and-conditions',
    title: 'Operators, Conditions, Bitwise & Control Flow',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '25 mins',
    description: 'Master boolean algebra, short-circuit evaluation, bitwise masking, CPU branch prediction, and conditional jump tables.',
    whatIsIt: 'Operators are symbolic tokens that perform computations, comparisons, and bitwise manipulations on operands. Conditional control flow directs the instruction pointer to different execution branches based on evaluated boolean expressions.',
    deepDive: `How conditional execution works at the hardware and bytecode level:
• Comparison and CPU Flags: When evaluating 'if (a > b)', the ALU executes a subtraction instruction (CMP a, b) and sets hardware status flags in the CPU status register:
  - Zero Flag (ZF): Set if a == b.
  - Sign Flag (SF): Set if the result is negative.
  - Overflow Flag (OF): Set if arithmetic overflow occurred.
• Branch Instructions: The CPU evaluates these flags and conditionally alters the Program Counter (PC/EIP) using jump instructions (JZ, JNZ, JGE, JLE).
• Branch Prediction: Modern CPU pipelines pre-fetch and execute instructions before a branch condition finishes calculating. If the CPU predicts correctly, execution is seamless; if mispredicted, the entire pipeline must be flushed, costing 15-20 CPU cycles.
• Short-Circuit Evaluation: Logical operators ('&&', '||') evaluate left-to-right and terminate evaluation as soon as the outcome is guaranteed:
  - In 'A && B': If A is falsy, B is never executed.
  - In 'A || B': If A is truthy, B is never executed.
• Switch Statements & Jump Tables: When a switch statement has multiple contiguous cases, compilers generate an $O(1)$ Jump Table (array of code pointers) rather than $O(N)$ sequential condition checks.`,
    memoryAllocation: `Memory & Register Allocation during Branching:
• Condition variables are loaded directly into high-speed CPU registers (EAX, EBX, EDX).
• Ternary and short-circuit expressions avoid allocating stack activation frames for small conditional evaluations.
• Bitwise operations (AND, OR, XOR, NOT, SHIFT) execute in a single CPU clock cycle (0.3 nanoseconds) directly on register bits without touching RAM.`,
    typesAndRules: `Types of Operators & Operational Precedence Rules:
1. Arithmetic Operators: '+', '-', '*', '/', '%', '**' (Exponentiation).
2. Comparison Operators: '===', '!==' (Strict), '==', '!=' (Loose with type coercion), '>', '<', '>=', '<='.
3. Logical Operators: '&&' (Logical AND), '||' (Logical OR), '!' (Logical NOT), '??' (Nullish Coalescing - checks strictly null/undefined).
4. Bitwise Operators:
   - '&' (Bitwise AND): Used for masking specific bits.
   - '|' (Bitwise OR): Used for setting bit flags.
   - '^' (Bitwise XOR): Used for parity checks, toggling, and finding unique elements.
   - '~' (Bitwise NOT): Inverts all bits.
   - '<<' (Left Shift): Multiplies integer by $2^k$.
   - '>>' (Sign-Preserving Right Shift): Divides integer by $2^k$.
5. Operator Precedence:
   Parentheses () > Member Access . > Unary/Logical NOT ! > Multiplication/Division > Addition/Subtraction > Relational > Equality > Logical AND > Logical OR > Ternary > Assignment =.`,
    simpleExplanation: 'Think of conditional branching like a railway track switch. The oncoming train (instruction pointer) is directed down Track A or Track B based on the position of the mechanical lever (boolean comparison condition).',
    whyLearnIt: 'Mastering operators and branch mechanics enables you to write clean guard clauses, design bitmask permission systems, and write branchless code for ultra-high-performance computing.',
    realWorldExample: 'Operating system file permissions (Linux chmod 755: rwxr-xr-x) use 3-bit binary bitmasks (4=Read, 2=Write, 1=Execute) where bitwise OR (|) grants permissions and bitwise AND (&) checks permissions instantly.',
    whereUsed: 'Authentication gates, role-based access control (RBAC), graphics shaders, network packet parsing, and cryptographic algorithms.',
    keyPoints: [
      'Use strict equality (===) to prevent unexpected implicit type coercion bugs.',
      'Short-circuit evaluation is commonly used for safe optional property access and default fallback assignments.',
      'Bitwise operations provide $O(1)$ constant-time bitflag manipulations with minimal memory overhead.',
      'Clean guard clauses (early returns) reduce cognitive complexity and avoid deeply nested if-else pyramids.',
    ],
    advantages: [
      'Empowers software to make intelligent, deterministic decisions across diverse inputs.',
      'Bitwise masking compresses multiple boolean flags into a single 8-bit or 32-bit integer.',
      'Short-circuit evaluation guards against null-pointer and undefined exceptions.',
    ],
    commonMistakes: [
      'Accidentally using the assignment operator (=) instead of comparison (===) inside an if condition.',
      'Using logical OR (||) instead of nullish coalescing (??) when 0 or false are valid, legitimate values.',
      'Omitting "break" in traditional switch statements, leading to unintentional fall-through bugs.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// In-depth: Role-Based Bitmask Permission System
const PERMISSIONS = {
  READ:    1 << 0, // 0001 (1)
  WRITE:   1 << 1, // 0010 (2)
  DELETE:  1 << 2, // 0100 (4)
  ADMIN:   1 << 3, // 1000 (8)
};

// Grant READ and WRITE permissions using bitwise OR (|)
let userRole = PERMISSIONS.READ | PERMISSIONS.WRITE; // 0011 (3)

// Function to check permission using bitwise AND (&)
function hasPermission(role, permission) {
  return (role & permission) === permission;
}

// Function with Early Guard Clauses and Nullish Coalescing (??)
function deleteResource(user, resourceId) {
  // Guard Clause 1: Check authentication
  if (!user?.id) {
    return { success: false, reason: "Unauthorized: User not logged in." };
  }

  // Guard Clause 2: Check permissions via bitmask
  const permissions = user.permissions ?? 0;
  if (!hasPermission(permissions, PERMISSIONS.DELETE)) {
    return { success: false, reason: "Forbidden: Missing DELETE permission." };
  }

  return { success: true, message: \`Resource \${resourceId} deleted successfully.\` };
}

console.log("Has Write?", hasPermission(userRole, PERMISSIONS.WRITE));   // true
console.log("Has Delete?", hasPermission(userRole, PERMISSIONS.DELETE)); // false
console.log(deleteResource({ id: "usr_42", permissions: userRole }, "doc_999"));`,
      explanation: 'Demonstrates bitwise bitmask flags for permission systems, strict boolean evaluation, and early guard clause patterns.',
    },
    practiceQuestions: [
      {
        question: 'What is the exact behavioral difference between logical OR (||) and nullish coalescing (??)?',
        hint: 'How do they treat 0, "", and false?',
        answer: 'Logical OR (||) returns the right operand if the left operand is ANY falsy value (0, "", false, null, undefined, NaN). Nullish coalescing (??) returns the right operand ONLY if the left operand is strictly null or undefined.',
      },
      {
        question: 'How does bitwise XOR (^) allow finding a single non-duplicate number in an array where every other element appears twice?',
        hint: 'A ^ A = 0, and A ^ 0 = A.',
        answer: 'Bitwise XOR is commutative and self-inverting: X ^ X = 0 and X ^ 0 = X. XORing all elements together cancels out all pairs (leaving 0), leaving only the unique single number.',
      },
      {
        question: 'What is CPU branch misprediction and why can sorted arrays be processed faster in conditional loops than unsorted arrays?',
        hint: 'Consider how the hardware instruction pipeline anticipates decisions.',
        answer: 'CPUs use branch predictors to anticipate if-else branches. With a sorted array, conditions like "x > 128" transition smoothly from false to true, allowing the predictor to achieve >95% accuracy. Unsorted data causes random branch decisions, triggering frequent pipeline flushes.',
      },
    ],
    relatedTopics: ['variables-and-data-types', 'loops-and-iteration', 'programming-basics'],
  },

  // 4. Loops & Iteration
  {
    id: 'loops-and-iteration',
    slug: 'loops-and-iteration',
    title: 'Loops, Iteration Mechanics & Performance',
    category: 'Programming Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '25 mins',
    description: 'Explore for, while, do-while, iterators, generators, loop unrolling, and time complexity in iterative algorithms.',
    whatIsIt: 'Loops are control structures that repeatedly execute a designated code block as long as a loop continuation condition evaluates to true. Iteration is the process of stepping through a collection of elements sequentially.',
    deepDive: `Iteration Mechanics at the Machine & Language Level:
• Loop Anatomy:
  1. Initialization: Executed once before loop begins (e.g., let i = 0).
  2. Condition Test: Evaluated before every iteration; if false, loop terminates.
  3. Loop Body: Instructions executed per iteration.
  4. Post-Iteration Step: Mutates the loop variable (e.g., i++), then jumps back to Condition Test.
• Loop Unrolling (Compiler Optimization): Compilers replicate the loop body multiple times to reduce the number of comparison tests and conditional branch jump instructions, improving CPU throughput.
• Iterators & Iterable Protocol: Modern languages abstract iteration via Symbol.iterator and generator functions (yield), allowing lazy evaluation of infinite streams without loading all data into memory at once.
• Functional Iteration: Methods like map(), filter(), and reduce() abstract loop state, encouraging immutability and declarative pipeline chaining.`,
    memoryAllocation: `Memory Behavior During Loops:
• Local variables declared inside loop blocks using 'let'/'const' have their lexical bindings refreshed per iteration.
• Closures inside loops: In legacy JavaScript ('var i'), all closure callbacks shared the same mutable reference. With 'let i', each iteration receives a distinct scope binding on the stack.
• Memory Accumulation: Creating objects inside tight loops (e.g., inside a 1,000,000-iteration loop) generates heavy heap allocation pressure, triggering frequent Garbage Collection (GC) pauses.`,
    typesAndRules: `Types of Loops & Selection Criteria:
1. 'for' Loop: Ideal for index-based, bounded array traversals where step count is known.
2. 'while' Loop: Ideal for state-driven loops where termination depends on dynamic conditions (e.g., reading a network stream).
3. 'do-while' Loop: Guaranteed to execute the loop body at least once before testing the condition.
4. 'for...of': Iterates over iterable values (Arrays, Strings, Sets, Maps) cleanly without manual index tracking.
5. 'for...in': Iterates over enumerable property keys of an object (avoid for arrays due to prototype traversal and non-deterministic order).
6. Termination Rules:
   - 'break': Immediately terminates the loop and transfers control outside the loop block.
   - 'continue': Skips the remainder of the current iteration and jumps directly to the increment/condition test.`,
    simpleExplanation: 'Imagine an automated factory conveyor belt. The robot arm repeats: "Pick up box, inspect barcode, apply shipping label" for every box on the belt until the sensor detects no more boxes.',
    whyLearnIt: 'Loops are fundamental to data processing, matrix computations, searching algorithms, batch API processing, and animation rendering engines.',
    realWorldExample: 'A video game rendering loop (Game Loop) running 60 or 120 times per second: processes player inputs, updates physics calculations, and renders frame buffers to the GPU.',
    whereUsed: 'Array search algorithms, database table scanning, batch email dispatching, audio signal processing, and numerical simulations.',
    keyPoints: [
      'Always ensure loop termination invariants to prevent infinite loops that freeze the CPU thread.',
      'Be vigilant against off-by-one errors (using <= length instead of < length).',
      'For heavy data processing, avoid object allocations inside tight loop bodies to minimize GC overhead.',
      'Use break and continue strategically to exit early as soon as the target state is reached.',
    ],
    advantages: [
      'Eliminates repetitive manual code, scaling effortlessly from 10 items to 10,000,000 items.',
      'Provides predictable $O(N)$ linear time complexity for collection processing.',
      'Enables generator-based lazy streams that process massive files with constant $O(1)$ memory.',
    ],
    commonMistakes: [
      'Off-by-one errors causing Array IndexOutOfBounds or undefined value lookups.',
      'Forgetting to increment/update the loop counter in while loops, resulting in infinite loops.',
      'Modifying an array\'s length or mutating indices while iterating over it, causing skipped elements.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Comparison: Classical Loop vs Optimized Iteration vs Lazy Generator
const dataSet = Array.from({ length: 5 }, (_, i) => i + 1);

// 1. Classical Index-based For Loop (Maximum Raw Performance)
let totalSum = 0;
for (let i = 0; i < dataSet.length; i++) {
  totalSum += dataSet[i];
}

// 2. Functional Chain (Declarative & Immutable)
const doubledEvens = dataSet
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2);

// 3. Lazy Generator Iterator (O(1) Memory for Infinite/Large Sequences)
function* fibonacciSequence(limit) {
  let [a, b] = [0, 1];
  while (limit-- > 0) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log("Total Sum:", totalSum);                 // 15
console.log("Doubled Evens:", doubledEvens);         // [4, 8]
console.log("Fibonacci Stream:", [...fibonacciSequence(6)]); // [0, 1, 1, 2, 3, 5]`,
      explanation: 'Demonstrates index iteration, declarative functional pipelines, and memory-efficient generator iterators.',
    },
    practiceQuestions: [
      {
        question: 'What is an off-by-one error in loop iteration and how can it be systematically avoided?',
        hint: 'Consider 0-indexed arrays and <= vs <.',
        answer: 'An off-by-one error occurs when a loop iterates one time too many or one time too few, typically by using "<=" instead of "<" with 0-indexed array lengths. It is avoided by using standard idioms like "i < array.length" or "for...of" loops.',
      },
      {
        question: 'Why can allocating objects inside a tight loop with millions of iterations severely degrade application performance?',
        hint: 'Think about heap allocation rates and Garbage Collector pauses.',
        answer: 'Creating objects inside tight loops rapidly fills Young Generation Heap memory. This triggers frequent Garbage Collector (GC) scavenge cycles that pause JavaScript execution (Stop-the-World pauses) to reclaim short-lived objects.',
      },
      {
        question: 'How do generator functions (function*) achieve O(1) space complexity when generating large sequences?',
        hint: 'Think about lazy evaluation and pausing execution.',
        answer: 'Generators compute and yield one item at a time on demand. They pause execution state and resume only when .next() is called, avoiding allocating the entire sequence in memory at once.',
      },
    ],
    relatedTopics: ['operators-and-conditions', 'variables-and-data-types', 'functions-and-oop'],
  },

  // 5. Functions & OOP
  {
    id: 'functions-and-oop',
    slug: 'functions-and-oop',
    title: 'Functions, Execution Context, Closures & OOP',
    category: 'Programming Fundamentals',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Master call stacks, execution contexts, lexical scope, closures, prototypes, and the 4 Pillars of Object-Oriented Programming.',
    whatIsIt: 'Functions are reusable, encapsulated blocks of logic that accept inputs, execute computations, and return outputs. Object-Oriented Programming (OOP) is a design paradigm that structures code into objects bundling internal state (attributes) and behaviors (methods).',
    deepDive: `Execution Contexts, Call Stack & Prototype Chains:
1. Global & Function Execution Context:
   - When a function is called, the JavaScript engine creates a new Function Execution Context containing:
     a) Variable Environment (local variables, inner functions).
     b) Scope Chain (links to outer lexical environments).
     c) 'this' Binding (determined by call-site: default, implicit, explicit via call/apply/bind, or lexical via arrow functions).
2. The Call Stack:
   - A LIFO data structure in memory. Calling a function pushes its activation frame; returning pops it.
   - Stack Overflow occurs when recursive functions exceed the maximum stack frame depth without reaching a base case.
3. Closures:
   - A closure is a function that retains access to its lexical outer scope variables even after the outer function has finished executing and popped off the call stack.
4. Prototype Chain & OOP:
   - JavaScript uses Prototypal Inheritance: every object has an internal [[Prototype]] link. If a property is not found on the instance, the engine traverses up the prototype chain until found or reaching null.
   - ES6 'class' syntax is syntactic sugar over prototypal inheritance.`,
    memoryAllocation: `Memory Allocation in Functions & Objects:
• Primitive arguments are passed by value (copied onto the function's stack frame).
• Object arguments are passed by reference sharing (the pointer is copied on the stack, pointing to the original heap object).
• Closures retain heap references to their enclosed outer variables, preventing those variables from being garbage collected as long as the closure reference is reachable.`,
    typesAndRules: `The 4 Pillars of Object-Oriented Programming & Governing Principles:
1. Encapsulation: Bundling data and methods operating on that data within a class, restricting direct outside access to internal state using private fields (#field).
2. Abstraction: Hiding complex internal implementation details and exposing only clean, essential public interfaces.
3. Inheritance: Reusing and extending attributes and methods from a parent class to child classes via 'extends' and 'super()'.
4. Polymorphism: Allowing child classes to override parent methods to provide specialized behavior while sharing a common interface.
5. SOLID Principles:
   - Single Responsibility Principle: A class should have one, and only one, reason to change.
   - Open/Closed Principle: Open for extension, closed for modification.
   - Liskov Substitution Principle: Subclasses must be substitutable for their base classes.
   - Interface Segregation Principle: Prefer small, client-specific interfaces over bloated ones.
   - Dependency Inversion Principle: Depend on abstractions, not concrete implementations.`,
    simpleExplanation: 'Think of a class as an architectural blueprint for a car, and an object instance as the actual car built from that blueprint. Encapsulation keeps the engine internals hidden beneath the hood; you interact with the car using a clean abstracted interface: the steering wheel and gas pedal.',
    whyLearnIt: 'Functions and OOP structure enterprise codebases into modular, reusable, testable, and maintainable software architectures.',
    realWorldExample: 'Payment gateway SDKs (like Stripe or PayPal) use abstract PaymentMethod base classes with polymorphic implementations (CreditCardPayment, ApplePayPayment, CryptoPayment) sharing a unified .processPayment() interface.',
    whereUsed: 'Enterprise backend services, UI component hierarchies, domain-driven design (DDD), game entity component systems, and SDK development.',
    keyPoints: [
      'Closures capture their lexical environment, enabling powerful encapsulation and factory patterns.',
      'Arrow functions do not bind their own "this"; they inherit "this" lexically from their enclosing scope.',
      'Prefer composition over deep inheritance hierarchies to avoid fragile base class anti-patterns.',
      'Encapsulate mutable state using private class fields (#) to maintain data integrity.',
    ],
    advantages: [
      'Promotes clean separation of concerns and high code reusability.',
      'Polymorphism allows adding new features without rewriting existing consumer code.',
      'Encapsulation protects sensitive internal state from unauthorized external mutation.',
    ],
    commonMistakes: [
      'Creating memory leaks by unintentionally holding closure references in global event listeners.',
      'Losing "this" context when passing class methods as callback functions without binding or arrow functions.',
      'Over-engineering simple functional problems with rigid, deeply nested inheritance hierarchies.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Comprehensive OOP Architecture: Encapsulation, Inheritance & Polymorphism
class BankAccount {
  #balance; // Private field (Encapsulation)

  constructor(accountHolder, initialDeposit) {
    this.accountHolder = accountHolder;
    this.#balance = Math.max(0, initialDeposit);
  }

  // Abstraction: Controlled public interface
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive.");
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  // Base method for Polymorphic override
  calculateMonthlyFee() {
    return 5.0; // Base maintenance fee
  }
}

// Inheritance & Polymorphism
class PremiumSavingsAccount extends BankAccount {
  constructor(accountHolder, initialDeposit, interestRate) {
    super(accountHolder, initialDeposit);
    this.interestRate = interestRate;
  }

  // Polymorphic Override
  calculateMonthlyFee() {
    return 0.0; // Waived fee for premium accounts
  }

  applyInterest() {
    const interest = this.getBalance() * (this.interestRate / 100);
    this.deposit(interest);
    return interest;
  }
}

const myAccount = new PremiumSavingsAccount("Elena Rostova", 5000, 4.5);
myAccount.deposit(1500);
myAccount.applyInterest();

console.log(\`Holder: \${myAccount.accountHolder}\`);
console.log(\`Balance: $\${myAccount.getBalance().toFixed(2)}\`);
console.log(\`Monthly Fee: $\${myAccount.calculateMonthlyFee()}\`);`,
      explanation: 'Demonstrates private class fields (#balance), inheritance with super(), and polymorphic method overriding.',
    },
    practiceQuestions: [
      {
        question: 'What is a closure in JavaScript and what is a practical real-world use case for it?',
        hint: 'Lexical scope retention after outer function execution.',
        answer: 'A closure is a function that retains access to variables in its outer lexical scope even after that outer function has returned. Practical use cases include data privacy (private variables), function currying, and memoization caches.',
      },
      {
        question: 'How does the "this" keyword differ between standard function declarations and arrow functions?',
        hint: 'Dynamic call-site binding vs lexical scope inheritance.',
        answer: 'Standard functions bind "this" dynamically based on how and where the function was called (call-site). Arrow functions do not bind their own "this"; they inherit "this" lexically from their enclosing parent scope at the time of definition.',
      },
      {
        question: 'What is the Liskov Substitution Principle (LSP) in SOLID design?',
        hint: 'Subtypes must be cleanly substitutable for base types without breaking code.',
        answer: 'LSP states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness or functionality of the program.',
      },
    ],
    relatedTopics: ['programming-basics', 'variables-and-data-types', 'react-fundamentals'],
  },

  // 6. React Fundamentals
  {
    id: 'react-fundamentals',
    slug: 'react-fundamentals',
    title: 'React Fundamentals, Virtual DOM & Fiber Architecture',
    category: 'Web Development',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Deep dive into React Reconciliation, Virtual DOM diffing heuristics, Fiber tree scheduling, Hook linked lists, and re-render optimization.',
    whatIsIt: 'React is a declarative, component-based UI library that manages state-driven user interfaces by maintaining a lightweight in-memory Virtual DOM and efficiently synchronizing changes to the real browser DOM via a reconciliation algorithm.',
    deepDive: `React Under-the-Hood: Virtual DOM, Diffing & Fiber Engine:
1. Virtual DOM & Reconciliation Diffing:
   - The Virtual DOM is a tree of plain JavaScript objects representing the desired UI hierarchy.
   - Traditional tree diffing is $O(N^3)$. React achieves $O(N)$ linear diffing using two heuristics:
     a) Elements of different types produce completely different trees (unmounts old, mounts new).
     b) Lists use 'key' props to match child elements across renders, preventing unnecessary DOM recreations.
2. React Fiber Architecture:
   - Prior to React 16, rendering was synchronous (Stack Reconciler), freezing the main thread on large trees.
   - React Fiber breaks rendering into incremental units of work (Fiber nodes).
   - Fiber Phase 1 (Render/Reconciliation): Asynchronous & interruptible. Computes the work-in-progress tree and determines DOM mutations (Effect List).
   - Fiber Phase 2 (Commit): Synchronous. Applies computed DOM mutations to the real browser DOM in one atomic operation.
3. How Hooks Work Internally:
   - Inside a Fiber node, hooks are stored as a singly linked list.
   - Every time a component renders, React iterates through the linked list in strict order. This is why Hooks must NEVER be called inside conditions, loops, or nested functions.`,
    memoryAllocation: `Memory Management & React Lifecycles:
• Fiber Nodes: Lightweight heap objects storing component type, state, props, memoizedState (hooks linked list), child, sibling, and return pointers.
• Synthetic Events: React uses a single root event listener at the document root (Event Delegation) to minimize memory overhead rather than attaching individual listeners to thousands of DOM nodes.
• Memoization: 'useMemo' and 'useCallback' retain references to cached calculations and function pointers on the heap to avoid re-allocating references on every render pass.`,
    typesAndRules: `Core React Rules & Hook Principles:
1. Rules of Hooks:
   - Only call Hooks at the top level of React function components.
   - Only call Hooks from React function components or custom Hooks.
   - Always declare all reactive dependencies in useEffect, useMemo, and useCallback dependency arrays.
2. State Immutability Rule:
   - Never mutate state directly (e.g., state.count = 5). Always provide a new reference (e.g., setState(prev => ({ ...prev, count: 5 }))) so React's shallow equality check (Object.is) detects the change and schedules a re-render.
3. Component Lifecycle Stages:
   - Mounting: Initial creation, hook initialization, DOM insertion.
   - Updating: Triggered by props change, state change, or parent re-render.
   - Unmounting: Component removal, cleanup functions in useEffect executed to clear timers and subscriptions.`,
    simpleExplanation: 'Imagine an architect drawing a floor plan on paper (Virtual DOM). When a client requests a new window, the architect marks only the exact wall that needs changing (Diffing) and gives instructions to the construction crew to swap only that brick, rather than bulldozing the entire house (Real DOM).',
    whyLearnIt: 'React powers the world\'s most complex web applications (Meta, Netflix, Airbnb, Uber) and is the most demanded frontend technology in modern engineering.',
    realWorldExample: 'Facebook\'s News Feed dynamically renders thousands of interactive posts, live video players, and real-time comment streams without stuttering by using React Fiber time-slicing.',
    whereUsed: 'Single-page applications (SPAs), Next.js full-stack frameworks, React Native mobile apps, enterprise admin dashboards, and design systems.',
    keyPoints: [
      'React uses an O(N) heuristic diffing algorithm based on element types and unique list keys.',
      'React Fiber enables interruptible rendering and smooth 60fps animations via time-sliced work loops.',
      'Hooks are stored as a linked list inside Fiber nodes, enforcing the Rule of Hooks.',
      'State must be updated immutably to trigger reactive re-render cycles properly.',
    ],
    advantages: [
      'Declarative UI paradigm makes component state predictable and easy to reason about.',
      'Virtual DOM minimization prevents expensive layout thrashing in browser reflow cycles.',
      'Vast global ecosystem with rich component libraries, state management tools, and SSR frameworks.',
    ],
    commonMistakes: [
      'Using array index as key props for dynamic lists, causing input state corruption during reordering/deletion.',
      'Omitting dependencies in useEffect dependency arrays, creating stale closure bugs.',
      'Over-using useMemo and useCallback for trivial calculations where memoization overhead exceeds calculation cost.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Production-Grade React Component: Custom Hook, Memoization & Lifecycle Cleanup
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Custom Hook for Debounced Search Queries
function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    // Cleanup function: clears timer on unmount or when value changes
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

export function LiveSearchFilter({ items }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  // useMemo: Only re-calculates filtered array when debouncedQuery or items change
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, items]);

  // useCallback: Stable function reference preventing child re-renders
  const handleClear = useCallback(() => setQuery(''), []);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Filter topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && <button onClick={handleClear}>Clear</button>}
      <ul>
        {filteredItems.map((item) => (
          // Stable unique identifier key (Never use array index for dynamic lists)
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}`,
      explanation: 'Demonstrates custom hooks, timer cleanup in useEffect, useMemo for filter optimization, and stable list key usage.',
    },
    practiceQuestions: [
      {
        question: 'Why must React Hooks never be called inside conditional statements or loops?',
        hint: 'How are hooks tracked in the underlying Fiber node?',
        answer: 'React tracks hook state by indexing a singly linked list on the component\'s Fiber node. Placing hooks inside conditions alters the call order across renders, causing state and effect pointers to mismatch with different hooks.',
      },
      {
        question: 'What is the difference between React Fiber and the legacy Stack Reconciler?',
        hint: 'Synchronous blocking vs interruptible time-sliced rendering.',
        answer: 'The Stack Reconciler performed recursive, synchronous tree traversal that could not be paused, freezing the main thread on large trees. Fiber structures work as a linked list of fibers, allowing React to pause, prioritize, and resume rendering work across animation frames.',
      },
      {
        question: 'Why is using array index as a "key" prop problematic for dynamic lists in React?',
        hint: 'What happens when items are deleted or re-ordered?',
        answer: 'When items are inserted, deleted, or reordered, array indices shift. React associates DOM nodes and component internal state (like input values) with keys, causing the wrong component instances to reuse existing state.',
      },
    ],
    relatedTopics: ['functions-and-oop', 'rest-apis-and-node', 'variables-and-data-types'],
  },

  // 7. Node.js & Express REST APIs
  {
    id: 'rest-apis-and-node',
    slug: 'rest-apis-and-node',
    title: 'Node.js, Event Loop, Express & REST Architecture',
    category: 'Web Development',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Master the libuv Event Loop, non-blocking asynchronous I/O, V8 engine integration, middleware chains, and stateless REST design.',
    whatIsIt: 'Node.js is an open-source, cross-platform JavaScript runtime built on Google\'s V8 engine that executes asynchronous, event-driven JavaScript on the server. Express.js is a minimalist web framework for building HTTP web servers and RESTful APIs.',
    deepDive: `Node.js Architecture & The libuv Event Loop:
1. Single-Threaded Event Loop + Multi-Threaded libuv Worker Pool:
   - JavaScript execution runs on a single main thread, preventing thread deadlocks and synchronization locks.
   - Heavy asynchronous I/O tasks (file system fs, DNS lookups, crypto hashing, compression) are delegated to libuv's C++ Thread Pool (default 4 threads).
2. The 6 Event Loop Phases:
   - Phase 1 (Timers): Executes callbacks scheduled by setTimeout() and setInterval().
   - Phase 2 (Pending Callbacks): Executes I/O callbacks deferred to the next loop iteration.
   - Phase 3 (Idle, Prepare): Internal libuv phase.
   - Phase 4 (Poll): Retrieves new I/O events; calculates how long it should block and wait for I/O.
   - Phase 5 (Check): Executes setImmediate() callbacks.
   - Phase 6 (Close Callbacks): Executes socket/handle close callbacks (e.g., socket.on('close')).
   - Microtask Queue (process.nextTick & Promise.then): Drained immediately after every phase before moving to the next!`,
    memoryAllocation: `Memory Management & Garbage Collection in V8:
• V8 Heap Sizing: Typically 1.4 GB (32-bit) or 2.0-4.0 GB (64-bit) by default.
• Generational Garbage Collection:
  - Young Generation (Nursery & Intermediate): Fast semi-space copying collector (Scavenge) for short-lived objects.
  - Old Generation (Old Pointer & Old Data): Mark-Sweep-Compact collector for surviving long-lived objects.
• Buffers: Raw binary data allocated outside the V8 heap in C++ memory via Buffer.alloc() for high-performance network socket streaming.`,
    typesAndRules: `RESTful Architecture Constraints & HTTP Protocol Rules:
1. Statelessness: Every HTTP request from client to server must contain all information required to understand and process the request. No session state is stored on the server between requests.
2. Uniform Interface:
   - Resource Identification via URIs (e.g., '/api/v1/users/42').
   - Standard HTTP Methods:
     • GET: Safe & Idempotent. Retrieves a resource.
     • POST: Non-idempotent. Creates a new resource.
     • PUT: Idempotent. Replaces an entire resource.
     • PATCH: Non-idempotent/Idempotent. Partially modifies a resource.
     • DELETE: Idempotent. Removes a resource.
3. HTTP Status Codes:
   - 2xx Success: 200 OK, 201 Created, 204 No Content.
   - 3xx Redirection: 301 Moved Permanently, 304 Not Modified.
   - 4xx Client Error: 400 Bad Request, 401 Unauthorized (unauthenticated), 403 Forbidden (authenticated but unauthorized), 404 Not Found, 409 Conflict.
   - 5xx Server Error: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.`,
    simpleExplanation: 'Think of Node.js like a fast-food counter clerk (the single Event Loop thread). The clerk takes your order instantly, hands the ticket to the kitchen chefs (the background libuv Worker Pool), and immediately moves to serve the next customer without waiting for the burger to cook.',
    whyLearnIt: 'Node.js and RESTful microservices power the backend infrastructure of enterprise tech giants (PayPal, Netflix, LinkedIn, Uber) due to unmatched I/O concurrency.',
    realWorldExample: 'PayPal migrated from Java to Node.js and doubled their throughput requests per second while reducing response latency by 35% with 33% fewer lines of code.',
    whereUsed: 'REST APIs, GraphQL gateways, real-time WebSocket servers, microservices, cloud Lambda serverless functions, and CLI tools.',
    keyPoints: [
      'Node.js uses a single-threaded event loop with non-blocking asynchronous I/O powered by libuv.',
      'Microtasks (Promises, process.nextTick) are processed before any other Event Loop phase.',
      'REST APIs must be strictly stateless, relying on JWT or authorization tokens per request.',
      'Express uses a middleware pipeline pattern (req, res, next) for modular request handling.',
    ],
    advantages: [
      'Unifies frontend and backend engineering under a single language (JavaScript/TypeScript).',
      'Handles tens of thousands of concurrent I/O connections with minimal memory footprint.',
      'World\'s largest package registry ecosystem (npm) with millions of reusable libraries.',
    ],
    commonMistakes: [
      'Blocking the single-threaded Event Loop with heavy CPU computation (e.g., giant synchronous JSON.parse or crypto loops).',
      'Forgetting to return after res.status().json() inside middleware, causing "Headers already sent" runtime crashes.',
      'Not implementing global unhandled rejection and exception handlers, leading to unhandled server crashes.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Production-Ready Express.js REST API with Middleware & Async Error Handling
import express from 'express';

const app = express();
app.use(express.json()); // Body-parser middleware

// In-memory mock database store
const usersDB = new Map([
  [1, { id: 1, name: "Siddharth", role: "admin" }],
  [2, { id: 2, name: "Kavya", role: "student" }],
]);

// Custom Logging & Timing Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.url} -> \${res.statusCode} (\${duration}ms)\`);
  });
  next(); // Pass control to next middleware
});

// RESTful Route: GET single user
app.get('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = usersDB.get(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: \`User with ID \${id} was not found.\`,
    });
  }

  return res.status(200).json({ success: true, data: user });
});

// RESTful Route: POST create user
app.post('/api/v1/users', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'name' and 'role'.",
    });
  }

  const newId = usersDB.size + 1;
  const newUser = { id: newId, name, role };
  usersDB.set(newId, newUser);

  return res.status(201).json({ success: true, data: newUser });
});

export default app;`,
      explanation: 'Demonstrates Express middleware pipeline, standard REST status codes (200, 201, 400, 404), and JSON payload validation.',
    },
    practiceQuestions: [
      {
        question: 'What happens if a developer performs a heavy synchronous CPU task (like calculating 10^9 primes) on the Node.js main thread?',
        hint: 'How does this affect incoming network requests for other users?',
        answer: 'Because the Event Loop runs on a single thread, heavy synchronous CPU work blocks the thread completely. The server becomes unresponsive, unable to process any incoming HTTP requests, timers, or I/O events until the calculation completes.',
      },
      {
        question: 'What is the priority order between process.nextTick, Promise.then (microtasks), and setTimeout(fn, 0) (macrotask)?',
        hint: 'Microtasks execute immediately after the current operation.',
        answer: 'process.nextTick executes first, followed by resolved Promise microtasks, and finally setTimeout(fn, 0) in the Timers phase of the Event Loop.',
      },
      {
        question: 'What makes an HTTP method "Idempotent" in REST architecture?',
        hint: 'What happens if the same request is sent multiple times?',
        answer: 'An HTTP method is idempotent if making the same request multiple identical times produces the exact same server state as making it once. GET, PUT, and DELETE are idempotent; POST is non-idempotent.',
      },
    ],
    relatedTopics: ['react-fundamentals', 'database-design-crud', 'cybersecurity-auth-jwt'],
  },

  // 8. Arrays & Dynamic Programming
  {
    id: 'arrays-and-dp-essentials',
    slug: 'arrays-and-dp-essentials',
    title: 'Arrays, Memory Layout & Dynamic Programming',
    category: 'DSA',
    difficulty: 'Intermediate',
    estimatedTime: '35 mins',
    description: 'Contiguous memory addressing, CPU cache lines, dynamic resizing amortized analysis, and Dynamic Programming (Memoization vs Tabulation).',
    whatIsIt: 'An Array is a contiguous block of homogeneous memory locations indexed by integers. Dynamic Programming (DP) is an algorithmic paradigm that solves complex optimization problems by breaking them down into simpler overlapping subproblems and caching intermediate solutions.',
    deepDive: `Array Memory Addressing & DP Mathematical Formulations:
1. Array Hardware Memory Addressing:
   - In memory, an array stores elements at consecutive physical addresses.
   - The address of element at index $i$ is computed in $O(1)$ constant time:
     $$\\text{Address}(A[i]) = \\text{BaseAddress} + (i \\times \\text{ElementSizeBytes})$$
   - Cache Locality: Because elements are contiguous, loading $A[0]$ into the CPU pulls an entire 64-byte Cache Line into L1 cache, making subsequent sequential reads ($A[1], A[2]$) nearly instantaneous.
2. Dynamic Arrays (Vector / ArrayList / JS Array):
   - Backed by a fixed-size contiguous buffer on the heap.
   - When capacity is reached during push(), the array allocates a new buffer of double size ($2\\times$), copies all $N$ elements over, and reclaims old memory.
   - Amortized Time Complexity: While occasional resize takes $O(N)$, the amortized cost per append is $O(1)$.
3. The Two Core Properties of Dynamic Programming:
   a) Optimal Substructure: The optimal solution to the overall problem contains within it the optimal solutions to its subproblems.
   b) Overlapping Subproblems: The same subproblems are solved repeatedly during recursive computation.
4. Top-Down Memoization vs Bottom-Up Tabulation:
   - Top-Down: Recursion + Cache (Memo table). Solves only required subproblems on-demand.
   - Bottom-Up: Iterative array table ($DP[i]$). Solves subproblems in topological order starting from base cases, eliminating recursion stack overhead.`,
    memoryAllocation: `Memory Considerations in DP:
• Memoization recursion stack consumes $O(N)$ stack memory frame depth, vulnerable to stack overflow on deep recursion ($N > 10,000$).
• Tabulation uses $O(N)$ or $O(N \\times W)$ heap memory.
• Space Optimization: In problems like Fibonacci, Climbing Stairs, or House Robber where $DP[i]$ depends only on $DP[i-1]$ and $DP[i-2]$, space can be optimized from $O(N)$ down to $O(1)$ constant memory by maintaining just two variables.`,
    typesAndRules: `Standard Dynamic Programming Patterns:
1. 1D DP: Climbing Stairs, Fibonacci, House Robber, Coin Change, Longest Increasing Subsequence (LIS).
2. 2D DP Grid / Matrix: Unique Paths, Minimum Path Sum, Longest Common Subsequence (LCS), Edit Distance.
3. 0/1 Knapsack & Subset Sum: Decision trees of taking vs skipping items under capacity constraints.
4. DP State Transition Formulation:
   - Step 1: Define the State ($DP[i]$ = answer for input $i$).
   - Step 2: Establish the Base Cases ($DP[0] = 0, DP[1] = 1$).
   - Step 3: Formulate the State Transition Equation ($DP[i] = \\min(DP[i-c] + 1)$).
   - Step 4: Determine the Computation Direction (increasing loop index).`,
    simpleExplanation: 'Imagine writing 1+1+1+1 on a piece of paper. You ask a friend: "What is that?" They answer "4". You write another "+1" at the end and ask: "What is it now?" They immediately say "5" without re-counting from scratch because they remembered the previous answer. That is Dynamic Programming.',
    whyLearnIt: 'Array algorithms and Dynamic Programming represent the core of technical coding interviews at Google, Meta, Amazon, Apple, and Microsoft.',
    realWorldExample: 'Google Maps route planning algorithms (Dijkstra/A* with DP heuristics) and DNA sequence alignment tools (Needleman-Wunsch algorithm) use 2D Dynamic Programming tables to find optimal paths.',
    whereUsed: 'Financial portfolio optimization, text diffing engines (git diff), spell checkers, compiler instruction scheduling, and shortest-path routing protocols.',
    keyPoints: [
      'Array indexing is O(1) because contiguous memory allows direct arithmetic memory offset calculation.',
      'Dynamic programming turns exponential O(2^N) recursive algorithms into polynomial O(N) or O(N^2) linear time.',
      'Always identify if the problem possesses Optimal Substructure and Overlapping Subproblems.',
      'Optimize space from O(N) to O(1) whenever DP state transitions only require the previous k variables.',
    ],
    advantages: [
      'Guarantees globally optimal solutions for complex combinatorial problems.',
      'Dramatically reduces CPU execution time from centuries to milliseconds for large inputs.',
      'Cache-friendly memory layout ensures maximal CPU hardware acceleration.',
    ],
    commonMistakes: [
      'Attempting DP on problems without optimal substructure (where local decisions permanently invalidate global optimal solutions).',
      'Failing to initialize the base cases correctly in bottom-up DP tables.',
      'Exceeding maximum recursion call stack depth in Top-Down Memoization instead of using Tabulation.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Dynamic Programming: Coin Change Problem (Minimum coins to make amount)
// Time Complexity: O(amount * coins.length) | Space Complexity: O(amount)

function coinChange(coins, amount) {
  // DP array: dp[i] represents minimum coins needed for amount i
  // Initialize with Infinity (representing unreachable amount)
  const dp = new Array(amount + 1).fill(Infinity);

  // Base case: 0 amount requires 0 coins
  dp[0] = 0;

  // Bottom-up computation
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        // State Transition Equation: dp[i] = min(dp[i], dp[i - coin] + 1)
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Space-Optimized Fibonacci: O(N) Time, O(1) Memory
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

console.log("Min coins for amount 11 with [1, 2, 5]:", coinChange([1, 2, 5], 11)); // 3 (5 + 5 + 1)
console.log("Fibonacci(10) with O(1) Space:", fibonacciOptimized(10));             // 55`,
      explanation: 'Demonstrates bottom-up tabulation for the Coin Change problem and O(1) space optimization for Fibonacci state transitions.',
    },
    practiceQuestions: [
      {
        question: 'Why does an array lookup A[i] take O(1) constant time regardless of array size?',
        hint: 'Think about contiguous physical memory addresses.',
        answer: 'Arrays reside in contiguous memory. The CPU calculates the exact target memory address in a single arithmetic instruction: BaseAddress + (i * elementSize), and retrieves the value in O(1) time without traversing intermediate elements.',
      },
      {
        question: 'What is the key difference between Greedy algorithms and Dynamic Programming?',
        hint: 'Can greedy decisions be rolled back?',
        answer: 'Greedy algorithms make the locally optimal choice at each step without reconsidering past decisions, which fails when local choices prevent global optimality. Dynamic Programming explores all overlapping subproblem choices and guarantees global optimality.',
      },
      {
        question: 'How does memoization reduce the time complexity of the recursive Fibonacci function from O(2^N) to O(N)?',
        hint: 'Draw the recursive call tree with and without caching.',
        answer: 'Naïve recursion computes subproblems repeatedly, creating a binary tree of depth N with 2^N calls. Memoization caches the result of each subproblem fib(k) upon first calculation, ensuring each subproblem is computed exactly once in O(1) time.',
      },
    ],
    relatedTopics: ['programming-basics', 'functions-and-oop', 'database-design-crud'],
  },

  // 9. Database Design & MongoDB CRUD
  {
    id: 'database-design-crud',
    slug: 'database-design-crud',
    title: 'Database Architecture, Indexing, B-Trees & MongoDB',
    category: 'Databases',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'ACID vs BASE, B-Tree and B+ Tree indexing mechanics, normalization vs denormalization, document store internals, and query execution plans.',
    whatIsIt: 'A Database is an organized, structured collection of persistent data managed by a Database Management System (DBMS). Databases range from Relational (RDBMS - PostgreSQL, MySQL) emphasizing schema integrity and ACID transactions, to Document NoSQL (MongoDB) prioritizing horizontal scalability and flexible schema design.',
    deepDive: `Database Storage Engines & B+ Tree Indexing Internals:
1. B-Trees & B+ Trees:
   - Without an index, finding a record requires a full table scan ($O(N)$ disk reads).
   - Databases use B+ Trees on disk. In a B+ Tree:
     a) Internal nodes hold search keys and child disk pointers.
     b) All data/records reside exclusively in leaf nodes.
     c) Leaf nodes are linked horizontally in a doubly linked list, making range queries ($O(\\log N + K)$) blazing fast.
2. ACID Properties (Relational):
   - Atomicity: All operations in a transaction succeed or all rollback (All-or-Nothing).
   - Consistency: Data must satisfy all schema rules, constraints, and cascades.
   - Isolation: Concurrent transactions execute without cross-interference (Read Committed, Serializable).
   - Durability: Once committed, data is written to Write-Ahead Logs (WAL) and survives power outages.
3. BASE Properties (NoSQL):
   - Basically Available, Soft state, Eventual consistency.
4. MongoDB Document Engine (WiredTiger):
   - Stores documents in binary JSON format (BSON).
   - Uses write-ahead logging (Journaling) and in-memory page caches for ultra-fast writes.`,
    memoryAllocation: `Database Memory Hierarchy & Caching:
• Buffer Pool / Page Cache: RAM cache retaining recently read data pages to prevent slow disk I/O.
• Working Set: The portion of data and indexes actively used during normal operations. If the working set exceeds RAM capacity, severe disk thrashing occurs.
• Write-Ahead Logging (WAL / Journal): Appends changes sequentially to disk before writing to data pages, maximizing write throughput.`,
    typesAndRules: `Schema Design & Modeling Rules:
1. Normalization (Relational - 1NF, 2NF, 3NF):
   - Eliminates duplicate data and transitive dependencies using foreign keys.
   - Trade-off: Requires expensive JOIN operations during queries.
2. Denormalization & Embedding (Document NoSQL):
   - Embed 1-to-few relationships (e.g., embedding User addresses inside the User document).
   - Reference 1-to-many or many-to-many relationships using ObjectIds to prevent unbounded document growth (16MB MongoDB document limit).
3. Indexing Guidelines:
   - Index fields frequently used in WHERE, SORT, and JOIN/lookup filters.
   - Compound Indexes: Follow the Equality, Sort, Range (ESR) rule.`,
    simpleExplanation: 'Searching a database without an index is like flipping through every single page of a 1,000-page book to find the word "Architecture". A B+ Tree Index is the index section at the back of the book, taking you directly to the exact page in seconds.',
    whyLearnIt: 'Databases are the single source of truth for all modern commercial applications; slow database queries are the #1 cause of web application latency.',
    realWorldExample: 'Uber uses B-tree spatial indexes (Geohashes and R-Trees) in their distributed database cluster to match drivers with riders within a 5-mile radius in under 50 milliseconds.',
    whereUsed: 'Banking ledgers, e-commerce inventories, social media feeds, user authentication stores, and telemetry systems.',
    keyPoints: [
      'B+ Tree indexes reduce lookup time from O(N) full table scan down to O(log N) disk reads.',
      'Relational databases enforce ACID guarantees; NoSQL systems prioritize horizontal scalability and flexible schema.',
      'Always design MongoDB schemas around your application\'s primary read/write query access patterns.',
      'Use explain() to inspect query execution plans and ensure queries use index scans instead of collection scans.',
    ],
    advantages: [
      'Guarantees persistent, durable storage across application restarts and hardware failures.',
      'Indexes provide sub-millisecond retrieval speeds across millions of records.',
      'Transactions maintain perfect financial and business data integrity.',
    ],
    commonMistakes: [
      'Over-indexing every field, which degrades INSERT and UPDATE performance because every index must be rewritten on writes.',
      'Allowing unbounded array growth in MongoDB documents exceeding the 16MB document size limit.',
      'Performing unindexed queries in production, causing 100% CPU utilization and database crashes under load.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// MongoDB & Mongoose Schema Design with Compound Indexing and Transactions
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Automatically creates a unique B-Tree index
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
      index: true,
    },
    // Embedded 1-to-few relationship
    profile: {
      firstName: String,
      lastName: String,
      bio: String,
    },
    completedTopics: [{ type: String }],
  },
  { timestamps: true }
);

// Compound Index following ESR (Equality, Sort, Range) rule
userSchema.index({ role: 1, createdAt: -1 });

// Atomic Transaction Example (Transferring balance/milestones safely)
async function awardMilestoneAtomic(userId, milestoneId) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const User = mongoose.model('User', userSchema);
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { completedTopics: milestoneId } },
      { session }
    );

    // Commit all operations atomically
    await session.commitTransaction();
    console.log("Milestone awarded atomically!");
  } catch (err) {
    // Rollback entire transaction on error
    await session.abortTransaction();
    console.error("Transaction aborted:", err.message);
  } finally {
    session.endSession();
  }
}`,
      explanation: 'Demonstrates Mongoose schema modeling, compound B-Tree indexes, embedded subdocuments, and atomic multi-document transactions.',
    },
    practiceQuestions: [
      {
        question: 'Why are B+ Trees preferred over Binary Search Trees (BST) for on-disk database indexing?',
        hint: 'Consider disk block read size and tree height.',
        answer: 'B+ Trees have a high branching factor (fan-out of 100+ keys per node), keeping the tree extremely shallow (height 3-4 for millions of records). Each node fits perfectly into a 4KB/8KB disk page, minimizing slow physical disk I/O reads compared to tall binary trees.',
      },
      {
        question: 'What is the ESR (Equality, Sort, Range) rule when designing compound database indexes?',
        hint: 'In what order should indexed fields be arranged?',
        answer: 'When creating compound indexes, fields tested for exact Equality should come first, fields used for Sorting should come second, and fields with Range filters (<, >, between) should come last to allow the index to satisfy filtering and sorting in a single scan.',
      },
      {
        question: 'What is the N+1 Query Problem in ORMs/ODMs and how is it resolved?',
        hint: 'Querying a list and then querying details for each item in a loop.',
        answer: 'The N+1 problem occurs when an application executes 1 query to fetch a list of N parent items, and then executes N separate individual queries to fetch children for each parent. It is resolved using batch fetching (SQL JOINs, Mongoose .populate(), or DataLoader).',
      },
    ],
    relatedTopics: ['rest-apis-and-node', 'arrays-and-dp-essentials', 'cybersecurity-auth-jwt'],
  },

  // 10. Computer Networks: OSI Model & HTTP/HTTPS
  {
    id: 'computer-networks-osi',
    slug: 'computer-networks-osi',
    title: 'Computer Networks: OSI Model, TCP/IP, TLS 1.3 & WebSockets',
    category: 'Computer Networks',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Master the 7-Layer OSI Model, TCP 3-way handshake & congestion control, UDP, DNS resolution, TLS 1.3 encryption, and WebSockets.',
    whatIsIt: 'Computer Networking is the engineering discipline of interconnecting autonomous computing devices to exchange data using standardized communication protocol suites (OSI Model and TCP/IP stack).',
    deepDive: `The 7-Layer OSI Model & Protocol Encapsulation:
1. Layer 7 - Application (HTTP, HTTPS, WebSockets, DNS, SSH, SMTP): User-facing protocols and API payloads.
2. Layer 6 - Presentation (TLS/SSL, JSON, gzip, JPEG): Data formatting, encryption, and compression.
3. Layer 5 - Session (RPC, NetBIOS): Manages continuous communication sessions between endpoints.
4. Layer 4 - Transport (TCP, UDP):
   - TCP: Connection-oriented, reliable, guaranteed order, flow control (Sliding Window), congestion control (Slow Start, Fast Retransmit).
   - UDP: Connectionless, unreliable, low-latency datagrams (used in gaming, VoIP, live streaming, DNS).
5. Layer 3 - Network (IP, ICMP, BGP, OSPF): Logical packet addressing (IPv4/IPv6) and routing across autonomous systems.
6. Layer 2 - Data Link (Ethernet, Wi-Fi 802.11, ARP): Physical MAC addressing and frame delivery over local network segment.
7. Layer 1 - Physical (Fiber optics, Copper cables, Radio waves): Raw physical bit transmission of electromagnetic signals.

The TCP 3-Way Handshake:
1. Client -> Server: SYN (Synchronize sequence number).
2. Server -> Client: SYN-ACK (Acknowledge sequence number + Synchronize server sequence).
3. Client -> Server: ACK (Acknowledge). Connection established!

TLS 1.3 Cryptographic Handshake (1-RTT):
- Exchanges cryptographic keys using Elliptic-Curve Diffie-Hellman (ECDHE) and authenticates server certificates via Public Key Infrastructure (PKI) in a single round-trip.`,
    memoryAllocation: `Network Packet Buffers & Socket Descriptors:
• Socket Buffer: OS kernel memory queues (SO_RCVBUF, SO_SNDBUF) storing incoming and outgoing packets.
• Packet Encapsulation: As data descends the stack, each layer prepends a header (Application Data -> TCP Segment -> IP Packet -> Ethernet Frame) without copying payload bytes.`,
    typesAndRules: `Network Protocols & Governing Rules:
1. TCP vs UDP Decision Matrix:
   - Choose TCP for: Financial transactions, web pages, REST APIs, email, file transfers (where data corruption/loss is fatal).
   - Choose UDP for: Multiplayer video games, video calls (Zoom/WebRTC), DNS queries (where low latency matters more than a dropped packet).
2. HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC):
   - HTTP/1.1: Sequential request pipelining with Head-of-Line (HoL) blocking.
   - HTTP/2: Binary framing, multiplexing multiple streams over a single TCP connection, header compression (HPACK).
   - HTTP/3: Runs over QUIC (UDP), eliminating TCP-level Head-of-Line blocking and supporting 0-RTT handshakes.
3. WebSockets Protocol:
   - Upgrades an HTTP connection via 'Upgrade: websocket' header to establish a persistent, bidirectional, full-duplex TCP communication channel.`,
    simpleExplanation: 'Imagine sending a letter internationally. You write the letter (Application), translate it to English (Presentation), put it in an addressed envelope (Network IP), hand it to the mail carrier (Data Link), who transports the physical paper across roads and planes (Physical).',
    whyLearnIt: 'Understanding networking fundamentals is essential for designing low-latency APIs, debugging CORS and proxy errors, configuring microservice meshes, and architecting global CDNs.',
    realWorldExample: 'Netflix uses global Content Delivery Networks (Open Connect CDN) strategically placed inside Internet Service Providers (ISPs) to stream 4K video streams with minimal network latency and zero buffering.',
    whereUsed: 'Cloud microservices, API gateways, load balancers (NGINX, Envoy), WebRTC video conferencing, distributed consensus systems, and IoT networks.',
    keyPoints: [
      'Data is encapsulated with headers at each OSI layer and decapsulated at the destination.',
      'TCP guarantees ordered, loss-less delivery via ACK packets and sequence numbers; UDP prioritizes speed.',
      'TLS 1.3 establishes encrypted symmetric session keys in a single round-trip (1-RTT).',
      'WebSockets provide persistent, full-duplex communication ideal for real-time applications.',
    ],
    advantages: [
      'Standardized protocol layers allow diverse hardware and operating systems to communicate seamlessly worldwide.',
      'Multiplexed protocols (HTTP/2, HTTP/3) allow hundreds of assets to load concurrently over a single socket.',
      'End-to-end encryption (TLS 1.3) protects user data from Man-in-the-Middle (MitM) eavesdropping.',
    ],
    commonMistakes: [
      'Using polling (setInterval HTTP requests) instead of WebSockets or Server-Sent Events (SSE) for real-time updates.',
      'Assuming network calls are instantaneous and reliable (violating the Fallacies of Distributed Computing).',
      'Misconfiguring CORS (Cross-Origin Resource Sharing) headers on backend API servers.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// In-Depth: Low-Level TCP Socket Client & Server in Node.js
import net from 'net';

// 1. Create a raw TCP Server (Layer 4 Transport)
const server = net.createServer((socket) => {
  console.log(\`[TCP Server] Client connected from \${socket.remoteAddress}:\${socket.remotePort}\`);

  // Handle incoming data stream
  socket.on('data', (buffer) => {
    console.log(\`[TCP Server] Received: \${buffer.toString().trim()}\`);
    // Echo response back to client
    socket.write(\`ACK: \${buffer.toString().trim()}\\n\`);
  });

  socket.on('end', () => console.log('[TCP Server] Client disconnected.'));
});

server.listen(8080, () => {
  console.log('[TCP Server] Listening on port 8080...');

  // 2. Create a TCP Client to initiate the 3-Way Handshake
  const client = net.createConnection({ port: 8080 }, () => {
    console.log('[TCP Client] Handshake complete! Connected to server.');
    client.write('Ping: Hello over raw TCP socket!');
  });

  client.on('data', (data) => {
    console.log(\`[TCP Client] Server Response: \${data.toString().trim()}\`);
    client.end(); // Graceful TCP 4-Way Teardown
    server.close();
  });
});`,
      explanation: 'Demonstrates low-level Layer 4 TCP socket creation, connection handshakes, binary data streams, and graceful teardown.',
    },
    practiceQuestions: [
      {
        question: 'Why does HTTP/3 use UDP (via QUIC) instead of TCP?',
        hint: 'Think about packet loss and Head-of-Line (HoL) blocking.',
        answer: 'In HTTP/2 over TCP, if a single packet is lost, TCP pauses all multiplexed streams until that packet is retransmitted (Head-of-Line blocking). HTTP/3 runs over QUIC (built on UDP), allowing independent stream recovery so packet loss in one stream never blocks other streams.',
      },
      {
        question: 'What are the three steps in the TCP 3-Way Handshake?',
        hint: 'SYN, SYN-ACK, ACK.',
        answer: '1. Client sends SYN (synchronize sequence number). 2. Server responds with SYN-ACK (acknowledging client and synchronizing server sequence). 3. Client replies with ACK (acknowledging server sequence). The connection is then established.',
      },
      {
        question: 'What is the purpose of DNS (Domain Name System) and how does recursive DNS resolution work?',
        hint: 'Converting domain names to IP addresses starting from root servers.',
        answer: 'DNS translates human-readable domain names (example.com) into numerical IP addresses (93.184.216.34). A recursive resolver queries Root Name Servers, then TLD (.com) servers, and finally Authoritative Name Servers to resolve the IP address.',
      },
    ],
    relatedTopics: ['rest-apis-and-node', 'operating-systems-processes', 'cybersecurity-auth-jwt'],
  },

  // 11. Operating Systems: Processes & Concurrency
  {
    id: 'operating-systems-processes',
    slug: 'operating-systems-processes',
    title: 'Operating Systems: Processes, Threads & Concurrency',
    category: 'Operating Systems',
    difficulty: 'Advanced',
    estimatedTime: '35 mins',
    description: 'Process Control Blocks (PCB), user vs kernel mode, context switching, CPU scheduling algorithms, mutexes, semaphores, and deadlocks.',
    whatIsIt: 'An Operating System (OS) is the fundamental system software that manages computer hardware resources (CPU, RAM, Disks, I/O devices) and provides core execution abstractions (Processes, Threads, Virtual Memory, File Systems) for software applications.',
    deepDive: `Process Architecture, Virtual Memory & Concurrency Primitives:
1. Process vs Thread:
   - Process: An independent, isolated executing program with its own private Virtual Address Space, Process Control Block (PCB), file descriptors, and security tokens.
   - Thread: The smallest schedulable unit of CPU execution within a process. Threads of the same process share the same heap memory, data segment, and code segment, but maintain their own private Stack and Program Counter.
2. User Mode vs Kernel Mode:
   - Ring 3 (User Mode): Restricted CPU execution mode where user applications run. Cannot directly access hardware.
   - Ring 0 (Kernel Mode): Privileged mode with full access to all CPU instructions and physical memory.
   - System Calls (Syscalls): Traps execution from User Mode to Kernel Mode (e.g., read, write, fork, execve).
3. Context Switching Overhead:
   - When the OS scheduler preempts a running process, it saves CPU registers to the PCB, flushes the Translation Lookaside Buffer (TLB cache), switches the page table base register (CR3), and loads the new process state.
4. Synchronization Primitives:
   - Mutex (Mutual Exclusion): Binary lock allowing only one thread to enter a Critical Section.
   - Semaphore: Counter-based primitive controlling access to a finite pool of resources.
   - Spinlock: Busy-waits in a CPU loop; ideal only for very short lock intervals.
5. The 4 Coffman Deadlock Conditions:
   - 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.`,
    memoryAllocation: `Virtual Memory & Paging Mechanics:
• Virtual Address Space (e.g., 48-bit address space = 256 TB virtual memory).
• Page Tables: Translate virtual memory addresses into physical RAM frames using the Memory Management Unit (MMU).
• Page Fault: Occurs when a virtual page is not loaded in physical RAM; the OS pauses execution, reads the page from disk/swap into RAM, updates the page table, and resumes execution.`,
    typesAndRules: `CPU Scheduling Algorithms & Concurrency Rules:
1. CPU Schedulers:
   - First-Come, First-Served (FCFS): Non-preemptive, suffers from Convoy Effect.
   - Shortest Job First (SJF): Optimal average waiting time, but requires knowing job duration beforehand.
   - Round Robin (RR): Preemptive time-sliced scheduling with a fixed time quantum.
   - Completely Fair Scheduler (CFS - Linux): Uses a Red-Black Tree to track virtual runtime (vruntime) of processes.
2. Race Conditions: Occur when multiple threads access and mutate shared memory concurrently without synchronization, making final state dependent on unpredictable execution timing.`,
    simpleExplanation: 'Think of a Process as an independent house with its own private yard and fence. Threads are family members living inside the same house who share the kitchen and living room (Heap memory), but have their own private bedrooms (Stack memory).',
    whyLearnIt: 'Understanding operating system internals allows you to architect multi-threaded systems, prevent deadlocks, optimize thread pool sizing, and write ultra-low-latency backend software.',
    realWorldExample: 'The NGINX web server uses an asynchronous, single-threaded master-worker process architecture that scales to 500,000 concurrent connections with minimal context-switch overhead.',
    whereUsed: 'OS kernels (Linux, Windows NT, macOS Darwin), multi-threaded database engines, container runtimes (Docker/runc), and game engines.',
    keyPoints: [
      'Threads share process heap memory but maintain private stacks and CPU register states.',
      'Context switches incur performance costs due to CPU cache and TLB invalidation.',
      'Deadlocks require all 4 Coffman conditions; breaking any one condition prevents deadlocks.',
      'Virtual memory provides process memory isolation and allows programs to exceed physical RAM capacity.',
    ],
    advantages: [
      'Process memory isolation protects the operating system and user applications from rogue crashes.',
      'Multi-threading maximizes multi-core CPU utilization for parallel computations.',
      'Virtual memory paging transparently handles memory swapping to disk without code changes.',
    ],
    commonMistakes: [
      'Creating thousands of OS threads instead of using asynchronous event loops or thread pools, exhausting system memory.',
      'Failing to acquire locks in a globally consistent order, resulting in fatal circular wait deadlocks.',
      'Over-synchronizing with coarse-grained locks, destroying multi-core parallel performance.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Node.js Worker Threads: True Multi-Core CPU Parallelism
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

if (isMainThread) {
  // Main Thread: Orchestrator
  console.log(\`[Main Thread PID: \${process.pid}] Spawning parallel Worker Thread...\`);

  const worker = new Worker(__filename, {
    workerData: { targetNumber: 40 },
  });

  worker.on('message', (result) => {
    console.log(\`[Main Thread] Received computed result from Worker: \${result}\`);
  });

  worker.on('error', (err) => console.error('[Main Thread] Worker Error:', err));
  worker.on('exit', (code) => console.log(\`[Main Thread] Worker stopped with exit code \${code}\`));
} else {
  // Worker Thread: Executes heavy CPU task in parallel on separate OS thread
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const result = fibonacci(workerData.targetNumber);
  parentPort.postMessage(result);
}`,
      explanation: 'Demonstrates multi-threading in Node.js using worker_threads to execute heavy CPU tasks on separate OS threads without blocking the main event loop.',
    },
    practiceQuestions: [
      {
        question: 'What are the 4 Coffman Conditions required for a Deadlock to occur in an operating system?',
        hint: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
        answer: '1. Mutual Exclusion (resources cannot be shared). 2. Hold and Wait (processes holding resources request new ones). 3. No Preemption (resources cannot be forcibly taken). 4. Circular Wait (a circular chain of processes where each waits for a resource held by the next).',
      },
      {
        question: 'What is the difference between a process context switch and a thread context switch?',
        hint: 'Think about virtual memory page tables and TLB caches.',
        answer: 'A thread context switch within the same process is faster because memory page tables, TLB cache, and virtual address spaces remain unchanged. A process context switch requires switching memory page tables (CR3 register) and flushing the CPU TLB cache.',
      },
      {
        question: 'What is a Page Fault in virtual memory management?',
        hint: 'What happens when referenced memory is not currently in physical RAM?',
        answer: 'A Page Fault is a hardware trap raised by the MMU when a program accesses a virtual memory page not currently mapped in physical RAM. The OS fetches the page from disk storage into an available RAM frame and resumes execution.',
      },
    ],
    relatedTopics: ['computer-networks-osi', 'programming-basics', 'cloud-computing-aws'],
  },

  // 12. Cybersecurity: Authentication & JWT
  {
    id: 'cybersecurity-authentication-jwt',
    slug: 'cybersecurity-authentication-jwt',
    title: 'Cybersecurity: Authentication, Authorization, JWT & Cryptography',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Symmetric vs asymmetric encryption, password hashing with salt & work factors, JWT anatomy & signature verification, and OWASP Top 10 vulnerabilities.',
    whatIsIt: 'Cybersecurity is the discipline of protecting computer systems, networks, and software applications from malicious attacks, unauthorized access, data breaches, and identity theft through cryptography, secure architecture, and access control models.',
    deepDive: `Cryptographic Foundations, JWT Mechanics & Attack Vectors:
1. Symmetric vs Asymmetric Cryptography:
   - Symmetric (AES-256, ChaCha20): Same secret key is used for encryption and decryption. Ultra-fast, ideal for bulk data and disk encryption.
   - Asymmetric (RSA, ECC, Ed25519): Uses a Public Key (distributed openly for encryption/verification) and a Private Key (kept secret for decryption/signing).
2. Password Hashing (Why Plaintext/MD5/SHA256 are Broken):
   - Fast hash functions (SHA-256) are vulnerable to GPU brute-force attacks (billions of guesses/second) and Rainbow Tables.
   - Secure Key Derivation Functions (bcrypt, Argon2, PBKDF2):
     a) Salt: Cryptographically random bytes appended to passwords before hashing to defeat precomputed rainbow tables.
     b) Work Factor (Cost): Intentionally slow CPU & memory-intensive iterations that make brute-force cracking computationally infeasible.
3. JSON Web Tokens (JWT) Anatomy:
   - Encoded string with 3 base64url parts separated by dots: Header.Payload.Signature.
     • Header: Alg & Type (e.g., {"alg": "HS256", "typ": "JWT"}).
     • Payload: Claims (e.g., {"sub": "usr_101", "role": "admin", "exp": 1728000000}).
     • Signature: HMACSHA256(base64Url(Header) + "." + base64Url(Payload), secret).
4. OWASP Top Vulnerabilities:
   - XSS (Cross-Site Scripting): Malicious scripts injected into trusted web pages (mitigated via Content Security Policy and HttpOnly cookies).
   - CSRF (Cross-Site Request Forgery): Unauthorized commands transmitted from a trusted user (mitigated via SameSite cookies and Anti-CSRF tokens).
   - SQL / NoSQL Injection: Untrusted inputs altering database queries (mitigated via parameterized queries / ORMs).`,
    memoryAllocation: `Cryptographic Memory Security:
• Timing Attack Resistance: Comparing hashes with 'crypto.timingSafeEqual()' executes in constant time ($O(1)$) to prevent attackers from deducing secret bytes via microsecond network timing variations.
• Secure Zeroing: Overwriting memory buffers containing decrypted passwords and private keys immediately after use to prevent memory scraping attacks.`,
    typesAndRules: `Authentication vs Authorization & Token Best Practices:
1. Authentication (AuthN): "Who are you?" (verifying identity via passwords, biometric passkeys, MFA).
2. Authorization (AuthZ): "What are you permitted to do?" (RBAC permissions, ABAC policies).
3. JWT Storage Security Rules:
   - NEVER store sensitive access tokens in browser 'localStorage' (vulnerable to XSS theft).
   - Store access tokens in memory or 'HttpOnly', 'Secure', 'SameSite=Strict' cookies inaccessible to JavaScript.
   - Use short-lived Access Tokens (15 mins) paired with rotating Refresh Tokens stored securely in database revocation lists.`,
    simpleExplanation: 'Think of Authentication as showing your passport to airport security (proving who you are). Authorization is the boarding pass that only allows you onto Flight 402 and seated in Seat 14B, but forbids you from entering the cockpit.',
    whyLearnIt: 'Security vulnerabilities cause billions of dollars in enterprise data breaches and regulatory fines (GDPR, HIPAA); writing secure code is a core requirement for senior software engineers.',
    realWorldExample: 'The Equifax data breach (affecting 147 million people) occurred because of an unpatched Apache Struts vulnerability allowing remote command injection due to insecure deserialization.',
    whereUsed: 'OAuth2 / OpenID Connect single sign-on (Google/GitHub login), banking APIs, zero-trust cloud architectures, and encrypted messaging protocols.',
    keyPoints: [
      'Passwords must always be hashed with bcrypt/Argon2 using a unique random salt and high work factor.',
      'JWT signatures verify data authenticity and tamper-evidence, but payload data is readable by anyone (not encrypted).',
      'Mitigate XSS by storing auth tokens in HttpOnly cookies and sanitizing all user inputs.',
      'Use constant-time comparison algorithms to prevent side-channel timing attacks.',
    ],
    advantages: [
      'Stateless JWT authentication scales effortlessly across distributed microservice clusters without shared session stores.',
      'End-to-end asymmetric encryption guarantees confidentiality and non-repudiation.',
      'Protects enterprise customer data and brand reputation against unauthorized intrusions.',
    ],
    commonMistakes: [
      'Storing sensitive passwords, API keys, or Social Security Numbers in JWT payloads.',
      'Using weak symmetric HMAC secrets easily crackable with dictionary attacks (e.g. secret="secret123").',
      'Trusting the "none" algorithm in JWT headers, allowing attackers to forge arbitrary admin claims.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Secure Authentication Implementation: Hashing & Timing-Safe Token Verification
import crypto from 'crypto';

// 1. Password Hashing using Node.js crypto (PBKDF2 with Salt & High Cost)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex'); // 16-byte random salt
  const iterations = 100000;                           // High work factor
  const keylen = 64;                                    // 64-byte hash length
  const digest = 'sha512';

  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return { salt, hash, iterations };
}

// 2. Timing-Safe Password Verification (Prevents Timing Attacks)
function verifyPassword(password, storedSalt, storedHash, iterations = 100000) {
  const keylen = 64;
  const digest = 'sha512';
  const computedHash = crypto.pbkdf2Sync(password, storedSalt, iterations, keylen, digest).toString('hex');

  const storedBuffer = Buffer.from(storedHash, 'hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');

  // crypto.timingSafeEqual prevents timing attacks by running in constant time
  return crypto.timingSafeEqual(storedBuffer, computedBuffer);
}

// Demo
const credentials = hashPassword("SuperSecretP@ssword2026");
console.log("Generated Salt:", credentials.salt);
console.log("Hashed Password:", credentials.hash.substring(0, 32) + "...");

console.log("Valid Password Match?", verifyPassword("SuperSecretP@ssword2026", credentials.salt, credentials.hash)); // true
console.log("Wrong Password Match?", verifyPassword("WrongPassword123", credentials.salt, credentials.hash));        // false`,
      explanation: 'Demonstrates secure password hashing with random salting, 100,000 iterations, and constant-time timingSafeEqual verification.',
    },
    practiceQuestions: [
      {
        question: 'Why does a JWT signature guarantee data integrity but NOT data confidentiality?',
        hint: 'How is the payload encoded versus signed?',
        answer: 'A JWT payload is simply base64url-encoded JSON text, meaning anyone who intercepts the token can decode and read its contents. The signature only guarantees that the payload has not been modified or forged by an unauthorized party since issuance.',
      },
      {
        question: 'What is a timing attack in password or token verification, and how does crypto.timingSafeEqual mitigate it?',
        hint: 'Comparing strings with === stops at the first mismatched character.',
        answer: 'Standard string equality (===) stops checking as soon as the first mismatched byte is encountered, returning faster for wrong early characters. Attackers measure these sub-microsecond differences to guess secret bytes one by one. timingSafeEqual always compares all bytes in constant time.',
      },
      {
        question: 'What is the difference between Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)?',
        hint: 'Executing unauthorized script in victim browser vs tricking victim browser into sending unwanted request.',
        answer: 'XSS injects malicious JavaScript into a trusted website to steal cookies and session data. CSRF tricks an authenticated user\'s browser into sending unauthorized requests (like transferring money) to a vulnerable site where the user is currently logged in.',
      },
    ],
    relatedTopics: ['rest-apis-and-node', 'database-design-crud', 'cloud-computing-aws'],
  },

  // 13. Cloud Computing: AWS & Containers
  {
    id: 'cloud-computing-aws-docker',
    slug: 'cloud-computing-aws-docker',
    title: 'Cloud Computing: AWS Architecture, Docker & Serverless',
    category: 'Cloud Computing',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    description: 'Hypervisors vs Linux namespaces & cgroups, Docker layered image architectures, serverless execution lifecycles, and auto-scaling microservices.',
    whatIsIt: 'Cloud Computing is the on-demand delivery of computing power, database storage, applications, and IT resources over the internet with pay-as-you-go pricing. Containerization (Docker) bundles application source code with all dependencies into immutable, portable execution units.',
    deepDive: `Virtualization vs Containerization & Serverless Mechanics:
1. Virtual Machines (Hypervisors Type 1 / Type 2 - VMware, KVM):
   - Virtualizes physical hardware. Each VM runs a complete guest operating system with virtual kernel, memory drivers, and virtual disk, creating heavy overhead (gigabytes of storage and minute-long boot times).
2. Containers (Docker, containerd, runc):
   - Virtualizes the operating system kernel. All containers share the host Linux kernel while maintaining isolated user spaces using two Linux kernel primitives:
     a) Namespaces: Isolates process trees (pid), network interfaces (net), mount points (mnt), and user IDs.
     b) Control Groups (cgroups): Restricts and meters hardware resource consumption (CPU percentage, RAM limits, disk I/O bandwidth).
3. Docker Image Layering & Copy-on-Write (UnionFS):
   - Docker images consist of read-only immutable layers cached independently.
   - When a container starts, Docker creates a thin read-write container layer on top using Copy-on-Write (CoW).
4. Serverless (AWS Lambda):
   - Event-driven computing where cloud providers manage all server provisioning and scaling.
   - Cold Start vs Warm Start: Initial invocation provisions an ephemeral micro-container (~100-300ms); subsequent invocations reuse the warm container instance.`,
    memoryAllocation: `Cloud Resource Allocation & cgroup Limits:
• Memory Limits (OOM Killer): If a container exceeds its allocated cgroup RAM limit (e.g., 'docker run -m 512m'), the Linux kernel Out-Of-Memory (OOM) Killer immediately terminates the container process with exit code 137.
• CPU Quotas: cgroups allocate CPU bandwidth via CFS quotas (e.g., 0.5 CPU = 50ms execution slice per 100ms CFS period).`,
    typesAndRules: `Cloud Service Models & Core AWS Services:
1. Service Models:
   - IaaS (Infrastructure as a Service - AWS EC2, S3): You manage the OS, runtime, and apps; provider manages physical hardware.
   - PaaS (Platform as a Service - AWS Elastic Beanstalk, Heroku): You manage application code; provider manages OS, patching, and scaling.
   - SaaS (Software as a Service - Google Workspace, Salesforce): Fully managed consumer software.
2. Core AWS Architecture Components:
   - Compute: EC2 (Virtual Servers), ECS/EKS (Docker/Kubernetes orchestration), Lambda (Serverless).
   - Storage: S3 (Object storage with 99.999999999% durability), EBS (Block storage for EC2).
   - Networking: VPC (Virtual Private Cloud), CloudFront (Global CDN), Route 53 (DNS).
   - Databases: RDS (Managed PostgreSQL/MySQL), DynamoDB (Serverless NoSQL Key-Value).
3. The AWS Shared Responsibility Model:
   - AWS is responsible for "Security OF the Cloud" (physical data centers, hardware, virtualization layer).
   - Customer is responsible for "Security IN the Cloud" (customer data, IAM roles, firewall security groups, encryption).`,
    simpleExplanation: 'A Virtual Machine is like building a standalone single-family house with its own plumbing, electrical grid, and foundation. A Docker Container is like renting a private apartment in a high-rise building where all units share the same building foundation and main water supply (host OS kernel), but have private locked doors.',
    whyLearnIt: 'Over 90% of global enterprises operate on cloud infrastructure (AWS, Azure, GCP); containerization and cloud architecture are essential skills for DevOps and software engineers.',
    realWorldExample: 'Amazon Prime Video handles millions of simultaneous NFL live stream viewers by auto-scaling stateless microservices across thousands of EC2 and ECS container instances across multiple AWS availability zones.',
    whereUsed: 'Continuous Integration / Continuous Deployment (CI/CD) pipelines, scalable microservices, big data batch processing, and global web applications.',
    keyPoints: [
      'Docker containers share the host Linux kernel using namespaces (isolation) and cgroups (resource limits).',
      'Docker image layers are cached and immutable, enabling fast builds and minimal disk storage.',
      'AWS Lambda scales to zero when idle, eliminating idle server costs for intermittent workloads.',
      'Always configure resource limits (CPU/memory) on containers to prevent runaway process crashes.',
    ],
    advantages: [
      'Solves the "It works on my machine" problem by guaranteeing identical runtime environments.',
      'Horizontal auto-scaling dynamically scales infrastructure up during traffic spikes and down during lulls.',
      'Sub-second container startup times enable rapid deployments and automated zero-downtime rolling updates.',
    ],
    commonMistakes: [
      'Running containers as the root user inside Dockerfiles, creating severe security container breakout risks.',
      'Creating bloated Docker images by not using multi-stage builds and lightweight Alpine/Distroless base images.',
      'Storing persistent application state inside container filesystems instead of mounted cloud volumes or databases.',
    ],
    codeExample: {
      language: 'javascript',
      code: `# Multi-Stage Production Dockerfile for Node.js Application
# Stage 1: Build & Dependencies (Optimized Layer Caching)
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Run as non-root user
USER node

# Copy dependencies and source from builder stage
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "server.js"]`,
      explanation: 'Demonstrates a production multi-stage Dockerfile utilizing layer caching, Alpine Linux for minimal image size, and non-root security principles.',
    },
    practiceQuestions: [
      {
        question: 'How do Linux Namespaces and Control Groups (cgroups) enable Docker containerization?',
        hint: 'Isolation vs Resource Limits.',
        answer: 'Namespaces provide process isolation (giving each container its own private view of process IDs, network interfaces, and file system mounts). Control Groups (cgroups) enforce resource metering and limits on CPU, RAM, and I/O bandwidth.',
      },
      {
        question: 'What is a "Cold Start" in serverless computing (like AWS Lambda) and how can it be mitigated?',
        hint: 'Provisioning container runtime from scratch on first invocation.',
        answer: 'A cold start occurs when an invocation requires downloading code, starting a new container runtime, and initializing dependencies. It can be mitigated using lightweight package bundles, keeping containers warm with scheduled pings, or using Provisioned Concurrency.',
      },
      {
        question: 'Why are Multi-Stage Docker builds recommended for production deployments?',
        hint: 'Separating build tools from final runtime images.',
        answer: 'Multi-stage builds allow using heavy compilers, SDKs, and build dependencies in early stages, while copying only the final compiled artifacts into a tiny, secure production runtime image (reducing image size from 1GB+ down to <100MB).',
      },
    ],
    relatedTopics: ['operating-systems-processes', 'cybersecurity-auth-jwt', 'rest-apis-and-node'],
  },

  // 14. AI & Machine Learning Foundations
  {
    id: 'ai-ml-foundations',
    slug: 'ai-ml-foundations',
    title: 'AI & Machine Learning: Mathematics, Neural Networks & Gradient Descent',
    category: 'AI & ML',
    difficulty: 'Advanced',
    estimatedTime: '35 mins',
    description: 'Vector spaces, dot products, loss functions (MSE, Cross-Entropy), backpropagation, gradient descent optimization, and transformer attention mechanisms.',
    whatIsIt: 'Artificial Intelligence (AI) is the engineering field dedicated to creating computational systems capable of performing tasks typically requiring human intelligence. Machine Learning (ML) is a subset of AI where mathematical models learn statistical patterns from data to make predictions without being explicitly programmed.',
    deepDive: `Mathematical Foundations & Neural Network Forward/Backward Pass:
1. Vectors, Matrices & Tensors:
   - Data is represented as multidimensional numerical arrays (Tensors).
   - An artificial neuron computes a weighted linear combination of inputs plus a bias term, passed through a non-linear activation function ($f$):
     $$z = \\sum_{i=1}^n (w_i x_i) + b = W^T X + b, \\quad a = \\sigma(z)$$
2. Activation Functions:
   - ReLU (Rectified Linear Unit): $f(x) = \\max(0, x)$ — prevents vanishing gradients in deep networks.
   - Sigmoid: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$ — maps inputs to $(0, 1)$ probabilities.
   - Softmax: Normalizes a vector of raw logits into a probability distribution summing to 1.
3. Loss Functions:
   - Mean Squared Error (MSE): Used for continuous regression tasks ($L = \\frac{1}{N}\\sum(y - \\hat{y})^2$).
   - Categorical Cross-Entropy: Used for discrete classification tasks ($L = -\\sum y_i \\log(\\hat{y}_i)$).
4. Gradient Descent & Backpropagation:
   - Training minimizes the Loss function by computing the partial derivatives of the Loss with respect to every weight ($\\frac{\\partial L}{\\partial W}$) using the Calculus Chain Rule (Backpropagation).
   - Weights are updated iteratively in the opposite direction of the gradient:
     $$W_{\\text{new}} = W_{\\text{old}} - \\alpha \\nabla L(W)$$
     where $\\alpha$ is the Learning Rate.
5. Modern Transformers & Self-Attention:
   - Replaced recurrence (RNNs) by calculating token attention scores in parallel using Query, Key, and Value matrices:
     $$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$`,
    memoryAllocation: `GPU VRAM Memory Management & Tensor Tiling:
• High Bandwidth Memory (HBM): GPUs use thousands of parallel tensor cores operating on contiguous VRAM matrix tiles.
• Gradient Accumulation: Allows training massive models exceeding GPU VRAM capacity by accumulating gradients across smaller mini-batches before executing the optimizer step.`,
    typesAndRules: `Machine Learning Paradigms & Evaluation Rules:
1. Supervised Learning: Model trains on labeled input-output pairs (Linear Regression, Random Forests, Neural Networks).
2. Unsupervised Learning: Model discovers hidden patterns in unlabeled data (K-Means Clustering, PCA Dimensionality Reduction).
3. Reinforcement Learning (RL): Agent learns optimal behavior policy via rewards and penalties in an environment (Q-Learning, PPO).
4. Overfitting vs Underfitting:
   - Underfitting (High Bias): Model is too simple to capture patterns (poor train & test accuracy).
   - Overfitting (High Variance): Model memorizes training noise and fails on unseen test data (high train accuracy, poor test accuracy).
   - Regularization techniques: L1 (Lasso), L2 (Ridge/Weight Decay), Dropout, Early Stopping.`,
    simpleExplanation: 'Imagine being blindfolded on a foggy mountain and trying to reach the lowest valley. You feel the slope of the ground under your feet (the gradient) and take a step downhill in the steepest downward direction (gradient descent). You repeat this step-by-step until the ground is flat (minimum loss).',
    whyLearnIt: 'AI and Machine Learning are transforming every industry from autonomous driving, drug discovery, and conversational LLMs to automated fraud detection.',
    realWorldExample: 'OpenAI\'s ChatGPT and Google Gemini use multi-billion parameter Transformer neural networks trained on petabytes of text data using GPU clusters to predict the most statistically probable next token.',
    whereUsed: 'Large Language Models (LLMs), computer vision systems, recommendation engines (Spotify, YouTube), fraud detection, and medical imaging diagnostics.',
    keyPoints: [
      'Neural networks learn by adjusting weights via Backpropagation and Gradient Descent optimization.',
      'Non-linear activation functions (ReLU, Sigmoid) allow neural networks to learn complex non-linear decision boundaries.',
      'Overfitting occurs when a model memorizes training noise; mitigate with Dropout and validation splits.',
      'Transformer self-attention computes relationships between all tokens in parallel using Q, K, V dot products.',
    ],
    advantages: [
      'Solves high-dimensional perceptual problems (vision, speech, natural language) impossible with rule-based programming.',
      'Automatically extracts complex latent features from massive unstructured datasets.',
      'Continuously improves prediction accuracy as more training data is ingested.',
    ],
    commonMistakes: [
      'Data leakage: Evaluating models on test data that was accidentally included in the training dataset.',
      'Setting learning rates too high (causing gradient divergence) or too low (causing glacial training convergence).',
      'Failing to normalize or standardize feature scales, causing gradient descent oscillations.',
    ],
    codeExample: {
      language: 'javascript',
      code: `// Pure JavaScript Implementation: Single-Neuron Perceptron with Gradient Descent
// Learns a Linear Decision Boundary (y = 2x + 1) from scratch

class LinearNeuron {
  constructor(learningRate = 0.05) {
    this.weight = Math.random(); // Initial random weight
    this.bias = Math.random();   // Initial random bias
    this.learningRate = learningRate;
  }

  // Forward Pass: y_hat = w * x + b
  predict(x) {
    return this.weight * x + this.bias;
  }

  // Train one epoch using Gradient Descent and Mean Squared Error Loss
  trainEpoch(trainingData) {
    let totalLoss = 0;
    let dWeight = 0;
    let dBias = 0;
    const N = trainingData.length;

    for (const { x, y } of trainingData) {
      const yHat = this.predict(x);
      const error = yHat - y; // (Prediction - Target)
      totalLoss += error ** 2;

      // Partial Derivatives (Gradients via Chain Rule)
      dWeight += (2 / N) * error * x;
      dBias += (2 / N) * error;
    }

    // Gradient Descent Update Step: W = W - (alpha * dW)
    this.weight -= this.learningRate * dWeight;
    this.bias -= this.learningRate * dBias;

    return totalLoss / N; // Mean Squared Error
  }
}

// Training Dataset: y = 2x + 1
const dataset = [
  { x: 1, y: 3 },
  { x: 2, y: 5 },
  { x: 3, y: 7 },
  { x: 4, y: 9 },
  { x: 5, y: 11 },
];

const neuron = new LinearNeuron(0.02);
console.log(\`Initial Weights -> Weight: \${neuron.weight.toFixed(3)}, Bias: \${neuron.bias.toFixed(3)}\`);

// Train for 500 epochs
for (let epoch = 1; epoch <= 500; epoch++) {
  const loss = neuron.trainEpoch(dataset);
  if (epoch % 100 === 0) {
    console.log(\`Epoch \${epoch}: Loss = \${loss.toFixed(5)}, Weight = \${neuron.weight.toFixed(3)}, Bias = \${neuron.bias.toFixed(3)}\`);
  }
}

console.log(\`Trained Model Prediction for x=10: \${neuron.predict(10).toFixed(2)} (Expected: 21.00)\`);`,
      explanation: 'Demonstrates a complete neural perceptron forward pass, MSE loss calculation, analytical gradient computation, and gradient descent weight updates in pure JavaScript.',
    },
    practiceQuestions: [
      {
        question: 'What is the role of the Chain Rule of Calculus in the Backpropagation algorithm?',
        hint: 'How do errors flow backward through layered functions?',
        answer: 'A deep neural network is a composition of nested mathematical functions. The Chain Rule allows computing the partial derivative of the final loss with respect to any intermediate weight by multiplying the local derivatives step-by-step backward through each layer.',
      },
      {
        question: 'What is the difference between Overfitting and Underfitting, and how is Overfitting prevented?',
        hint: 'High Variance vs High Bias.',
        answer: 'Underfitting (high bias) occurs when a model is too simple to learn the data patterns. Overfitting (high variance) occurs when a model memorizes training noise and fails on unseen test data. Overfitting is prevented using Dropout, L1/L2 regularization, cross-validation, and early stopping.',
      },
      {
        question: 'Why are non-linear activation functions (like ReLU) necessary in multi-layer neural networks?',
        hint: 'What happens when you compose multiple linear transformations?',
        answer: 'A composition of purely linear transformations (W2 * (W1 * x)) is mathematically equivalent to a single linear transformation (W3 * x), unable to solve non-linear problems (like XOR). Non-linear activation functions enable neural networks to approximate arbitrary complex non-linear functions.',
      },
    ],
    relatedTopics: ['arrays-and-dp-essentials', 'programming-basics', 'database-design-crud'],
  },
];

export default technicalTopics;
