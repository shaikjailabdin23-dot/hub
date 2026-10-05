export const quizzesData = {
  'variables-and-data-types': {
    title: 'Variables & Data Types Mastery Quiz',
    topicSlug: 'variables-and-data-types',
    hubSlug: 'technical',
    difficulty: 'Beginner',
    passingScore: 70,
    questions: [
      {
        question: 'Which keyword in modern JavaScript declares a block-scoped variable that CANNOT be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'const declares a block-scoped variable whose identifier reference cannot be reassigned.',
      },
      {
        question: 'Which of the following is considered a primitive data type in JavaScript?',
        options: ['Array', 'Object', 'Boolean', 'Date'],
        correctAnswer: 2,
        explanation: 'Boolean is one of the 7 primitive types in JavaScript. Arrays and Dates are specialized Objects.',
      },
      {
        question: 'What will typeof NaN return in JavaScript?',
        options: ['"undefined"', '"number"', '"nan"', '"object"'],
        correctAnswer: 1,
        explanation: 'In JavaScript, NaN (Not a Number) is technically a numeric data type, so typeof NaN evaluates to "number".',
      },
      {
        question: 'What happens when you attempt to reassign a const variable?',
        options: ['Silent warning is printed', 'TypeError is thrown', 'Variable becomes undefined', 'Value changes successfully'],
        correctAnswer: 1,
        explanation: 'Attempting to reassign a const variable throws a TypeError: Assignment to constant variable.',
      },
    ],
  },
  'react-fundamentals': {
    title: 'React Fundamentals Quiz',
    topicSlug: 'react-fundamentals',
    hubSlug: 'technical',
    difficulty: 'Intermediate',
    passingScore: 70,
    questions: [
      {
        question: 'What is the primary role of the Virtual DOM in React?',
        options: [
          'To connect directly to the MongoDB database',
          'To optimize real DOM manipulations using efficient diffing algorithms',
          'To replace CSS styles with JavaScript',
          'To compile JSX into Python',
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM keeps a lightweight representation of the UI in memory and batches updates to minimize costly real DOM reflows.',
      },
      {
        question: 'Which React Hook is primarily used for handling side effects like API fetching?',
        options: ['useState', 'useRef', 'useEffect', 'useMemo'],
        correctAnswer: 2,
        explanation: 'useEffect allows functional components to execute side effects like data fetching, subscriptions, and timers.',
      },
      {
        question: 'How do you pass data from a parent component to a child component in React?',
        options: ['Via Global Variables', 'Via Props', 'Via HTML ID tags', 'Via LocalStorage only'],
        correctAnswer: 1,
        explanation: 'Props (short for properties) are the standard unidirectional mechanism for parents to send data to children.',
      },
      {
        question: 'What is the consequence of omitting a dependency array in useEffect?',
        options: [
          'The effect will never execute',
          'The effect will execute on every single component render',
          'An immediate compilation error occurs',
          'The component unmounts automatically',
        ],
        correctAnswer: 1,
        explanation: 'Omitting the dependency array causes useEffect to re-run after every render, which can lead to performance degradation or infinite loops.',
      },
    ],
  },
  'arrays-and-dp-essentials': {
    title: 'DSA & Dynamic Programming Quiz',
    topicSlug: 'arrays-and-dp-essentials',
    hubSlug: 'technical',
    difficulty: 'Advanced',
    passingScore: 70,
    questions: [
      {
        question: 'What is the time complexity of accessing an array element by its index?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 0,
        explanation: 'Because array elements are stored in contiguous memory addresses, accessing element [i] requires a simple pointer offset calculation in O(1) constant time.',
      },
      {
        question: 'What distinguishes Dynamic Programming from standard Divide and Conquer?',
        options: [
          'DP only works on sorted arrays',
          'DP addresses problems with overlapping subproblems by caching results',
          'DP uses binary search trees exclusively',
          'Divide and Conquer never uses recursion',
        ],
        correctAnswer: 1,
        explanation: 'Both break problems into subproblems, but DP is specifically tailored for overlapping subproblems where caching avoids redundant work.',
      },
      {
        question: 'What is the technique called when you use recursion combined with a lookup table/cache?',
        options: ['Tabulation', 'Memoization', 'Greedy Selection', 'Backtracking'],
        correctAnswer: 1,
        explanation: 'Top-down Dynamic Programming is known as Memoization, where intermediate return values are stored in a map or cache.',
      },
      {
        question: 'What is the worst-case time complexity of standard Bubble Sort on an array of length N?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
        correctAnswer: 2,
        explanation: 'Bubble sort requires nested passes over the array, yielding O(N^2) time complexity in the worst and average cases.',
      },
    ],
  },
  'mongodb-and-database-design': {
    title: 'Database & MongoDB Quiz',
    topicSlug: 'mongodb-and-database-design',
    hubSlug: 'technical',
    difficulty: 'Intermediate',
    passingScore: 70,
    questions: [
      {
        question: 'What format does MongoDB use natively to store documents on disk?',
        options: ['Plain XML', 'BSON (Binary JSON)', 'CSV format', 'SQL Tables'],
        correctAnswer: 1,
        explanation: 'MongoDB stores records as BSON, a binary-encoded serialization of JSON that supports additional data types like Date and raw binary.',
      },
      {
        question: 'Which Mongoose method finds a single document matching criteria and updates it atomically?',
        options: ['findOneAndUpdate', 'updateBatch', 'searchAndReplace', 'createOrUpdate'],
        correctAnswer: 0,
        explanation: 'findOneAndUpdate finds a matching document, applies updates, and can return either the original or updated document.',
      },
      {
        question: 'What data structure does MongoDB primarily use for secondary indexes?',
        options: ['Linked List', 'B-Tree', 'Hash Table only', 'Stack'],
        correctAnswer: 1,
        explanation: 'MongoDB uses B-Trees to index fields, enabling fast O(log N) lookups, range queries, and sorting.',
      },
    ],
  },
};
