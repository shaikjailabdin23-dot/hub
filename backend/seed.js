const bcrypt = require('bcryptjs');
const Hub = require('./models/Hub');
const Topic = require('./models/Topic');
const Quiz = require('./models/Quiz');
const User = require('./models/User');
const Project = require('./models/Project');

const seedData = async () => {
  try {
    const hubCount = await Hub.countDocuments();
    if (hubCount > 0) {
      console.log('[Seed] Database already contains data. Verifying projects...');
      const fullnessExists = await Project.findOne({ title: 'FullnessLabs' });
      const existingUser = await User.findOne();
      if (!fullnessExists && existingUser) {
        await Project.create({
          user: existingUser._id,
          title: 'FullnessLabs',
          problemStatement:
            'Students and beginners often struggle to manage their learning activities, technical skills, career preparation, and projects in one organized platform. Information is usually scattered across different websites and applications, making it difficult to track learning progress, manage projects, and prepare for future career opportunities.',
          description:
            'FullnessLabs is a web-based learning and career management platform designed to bring learning, technical skills, career development, and project management into one centralized system. The platform provides users with an organized environment to manage their learning journey, explore technical skills, work on projects, and track their career development. It is built using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage.',
          category: 'Web Projects',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
          role: 'C.O',
          githubUrl: 'https://github.com/chinnu554/',
          demoUrl: 'https://fullnesslabs.netlify.app/',
        });
        console.log('[Seed] FullnessLabs project verified and seeded.');
      }

      const hub23Exists = await Project.findOne({ title: 'HUB23' });
      if (!hub23Exists && existingUser) {
        await Project.create({
          user: existingUser._id,
          title: 'HUB23',
          problemStatement:
            'Students and users face different challenges in managing their learning, skills, projects, tasks, career activities, and technical resources in one place. Using multiple platforms for different activities can make information difficult to organize and track. HUB23 is designed to provide a centralized digital hub that helps users organize and manage different activities through a single web platform.',
          description:
            'HUB23 is a centralized web platform designed to bring multiple useful activities and resources into one simple and organized environment. It helps users manage their learning, technical skills, projects, tasks, career development, and other digital activities from a single platform. The application uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management. The goal of HUB23 is to provide a flexible and user-friendly platform that can be extended to solve different user and management problems.',
          category: 'Web Projects',
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
          role: 'Developer',
          githubUrl: 'https://github.com/shaikjailabdin23-dot/',
          demoUrl: 'https://hub23.lovable.app/',
        });
        console.log('[Seed] HUB23 project verified and seeded.');
      }

      const designatedAdmin = await User.findOne({ email: 'shaikjailabdin23@gmail.com' });
      if (!designatedAdmin) {
        const salt = await bcrypt.genSalt(10);
        const adminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
        await User.create({
          name: 'Shaik Jailabdin',
          email: 'shaikjailabdin23@gmail.com',
          password: adminPass,
          role: 'admin',
          college: 'Hub Learning Administration',
          branch: 'System Architecture & Engineering',
          year: 'Faculty / Admin',
          semester: 'Staff',
          streak: 30,
          loginCount: 5,
          modulesUsed: ['Admin Dashboard', 'Project Hub', 'Technical Hub', 'Coding Hub'],
        });
        console.log('[Seed] Designated Admin verified and seeded: shaikjailabdin23@gmail.com');
      }

      const adminExists = await User.findOne({ email: 'admin@hub.edu' });
      if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        await User.create({
          name: 'Platform Administrator',
          email: 'admin@hub.edu',
          password: adminPassword,
          role: 'admin',
          college: 'Hub Learning Administration',
          branch: 'System Engineering',
          year: 'Faculty / Admin',
          semester: 'Staff',
          streak: 30,
          loginCount: 3,
          modulesUsed: ['Admin Dashboard', 'Project Hub'],
        });
        console.log('[Seed] Admin user verified and seeded: admin@hub.edu');
      }

      // Seed initial real activities if Activity collection is empty
      const Activity = require('./models/Activity');
      const actCount = await Activity.countDocuments();
      if (actCount === 0 && existingUser) {
        await Activity.insertMany([
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'login',
            module: 'Auth',
            details: { loginCount: 1 },
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'technical_hub',
            module: 'Technical Hub',
            details: { topic: 'Programming Fundamentals' },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'coding_hub',
            module: 'Coding Hub',
            details: { problem: 'Two Sum', status: 'Accepted' },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'developer_tools',
            module: 'Developer Tools',
            details: { tool: 'VS Code' },
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          },
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'project_view',
            module: 'Project Hub',
            details: { projectTitle: 'HUB23' },
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
          },
          {
            user: existingUser._id,
            userName: existingUser.name,
            userEmail: existingUser.email,
            type: 'career_hub',
            module: 'Career Hub',
            details: { selectedCareer: 'Software Developer' },
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          },
        ]);
        console.log('[Seed] Initial activity records seeded for analytics.');
      }
      return;
    }

    console.log('[Seed] Seeding initial Hub Learning Website data...');

    // 1. Seed Demo User
    const salt = await bcrypt.genSalt(10);
    const demoPassword = await bcrypt.hash('password123', salt);
    const demoUser = await User.create({
      name: 'Alex Johnson',
      email: 'student@hub.edu',
      password: demoPassword,
      college: 'Global Institute of Technology',
      branch: 'Computer Science and Engineering',
      year: '3rd Year',
      semester: '6th Semester',
      streak: 7,
    });
    console.log('[Seed] Created demo user: student@hub.edu / password123');

    // 2. Seed 5 Main Hubs
    const hubs = [
      {
        name: 'Technical Hub',
        slug: 'technical',
        description: 'Master core computer science fundamentals, programming languages, web engineering, systems, and modern AI.',
        category: 'Core Engineering',
        icon: 'code-laptop',
        color: '#6c63ff',
        gradient: 'linear-gradient(135deg, #6c63ff 0%, #3b82f6 100%)',
        topicsCount: 9,
      },
      {
        name: 'Skills Hub',
        slug: 'skills',
        description: 'Cultivate high-impact soft skills, analytical thinking, executive productivity, and professional workplace readiness.',
        category: 'Professional Growth',
        icon: 'sparkles',
        color: '#00d4ff',
        gradient: 'linear-gradient(135deg, #00d4ff 0%, #06b6d4 100%)',
        topicsCount: 5,
      },
      {
        name: 'Coding Hub',
        slug: 'coding',
        description: 'Level up Data Structures & Algorithms, solve curated interview problems with hints and solutions, and explore code templates.',
        category: 'Problem Solving',
        icon: 'terminal',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        topicsCount: 14,
      },
      {
        name: 'Career Hub',
        slug: 'career',
        description: 'Build an industry-grade resume, track job applications, conquer technical/HR interviews, and define your career roadmap.',
        category: 'Career Acceleration',
        icon: 'briefcase',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        topicsCount: 5,
      },
      {
        name: 'Project Hub',
        slug: 'project',
        description: 'Design, build, showcase, and manage real-world student capstones and portfolio-worthy software applications.',
        category: 'Applied Building',
        icon: 'rocket',
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        topicsCount: 8,
      },
    ];

    const createdHubs = await Hub.insertMany(hubs);
    const hubMap = {};
    createdHubs.forEach((h) => {
      hubMap[h.slug] = h._id;
    });

    // 3. Seed Comprehensive Technical Topics
    const topics = [
      {
        title: 'Variables & Data Types',
        slug: 'variables-and-data-types',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Programming Fundamentals',
        difficulty: 'Beginner',
        estimatedTime: '20 mins',
        description: 'Learn how computers store and interpret data using variables and foundational data types.',
        whatIsIt: 'A variable is a labeled container in memory used to store data values. Data types define what kind of data the variable can hold—such as numbers, text, or boolean flags.',
        whyLearnIt: 'Variables are the building blocks of every computer program. Without them, programs could not remember user inputs, compute values, or maintain state.',
        simpleExplanation: 'Imagine labeled storage boxes in your room: one labeled "Shoes", one labeled "Books". In code, "let score = 95" creates a box named "score" with the number 95 inside.',
        realWorldExample: 'When you log into your banking app, your account balance ($1,420.50) is stored in a numeric variable, and your account name is stored in a string variable.',
        whereUsed: 'Every programming language, framework, mobile app, and backend server relies on variables.',
        keyPoints: [
          'Primitive types: Number, String, Boolean, Null, Undefined, BigInt, Symbol',
          'Reference types: Objects, Arrays, Functions',
          'Scope defines where a variable is accessible (global, block, function scope)',
          'Immutability: Const creates read-only references; Let allows reassignment',
        ],
        advantages: [
          'Enables dynamic calculations and interactive programs',
          'Reduces duplication by reusing stored values',
          'Improves code readability through meaningful variable naming',
        ],
        commonMistakes: [
          'Confusing assignment (=) with equality (== or ===)',
          'Using uninitialized variables causing "undefined" errors',
          'Overusing global variables which can cause naming collisions and bugs',
        ],
        codeExample: {
          language: 'javascript',
          code: `// Declaring variables with modern JavaScript
const studentName = "Alex Johnson"; // String (constant)
let completedCredits = 45;         // Number (reassignable)
const isEnrolled = true;            // Boolean

// Object holding structured student data
const studentProfile = {
  name: studentName,
  credits: completedCredits,
  active: isEnrolled,
};

console.log(\`Student: \${studentProfile.name}, Credits: \${studentProfile.credits}\`);`,
          explanation: 'Uses const for values that never change reference and let for values that can be updated.',
        },
        practiceQuestions: [
          {
            question: 'What is the main difference between "let" and "const" in modern JavaScript?',
            hint: 'Think about whether you can reassign the variable.',
            answer: '"let" allows reassignment to a new value, whereas "const" creates an immutable binding that cannot be reassigned.',
          },
          {
            question: 'What happens if you use a variable before declaring it with "let"?',
            hint: 'Temporal Dead Zone (TDZ).',
            answer: 'A ReferenceError is thrown because let declarations are hoisted into a Temporal Dead Zone until initialized.',
          },
        ],
        relatedTopics: ['Operators & Expressions', 'Functions & Scope', 'Object Oriented Programming'],
      },
      {
        title: 'React Fundamentals & Component Architecture',
        slug: 'react-fundamentals',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Web Development',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        description: 'Understand modern React: component lifecycle, hooks (useState, useEffect), props, and the Virtual DOM.',
        whatIsIt: 'React is a declarative, component-based JavaScript library for building fast and interactive user interfaces using reusable building blocks called components.',
        whyLearnIt: 'React powers the frontend of modern industry leaders like Meta, Netflix, and Airbnb. It offers the fastest route to building dynamic, scalable single-page applications.',
        simpleExplanation: 'Instead of writing one massive 5,000-line HTML file, React lets you build small Lego blocks (Navbar, Card, Button) and snap them together into an entire website.',
        realWorldExample: 'A Twitter or Instagram feed where liking a post updates the heart icon and follower count instantly without refreshing the browser page.',
        whereUsed: 'SaaS platforms, web applications, dashboards, e-commerce storefronts, and cross-platform mobile apps via React Native.',
        keyPoints: [
          'Virtual DOM reconciles changes efficiently using a diffing algorithm',
          'Props allow parent components to pass data down to children',
          'State represents local mutable data that triggers UI re-renders when updated',
          'Hooks (useState, useEffect, useContext) let functional components manage state and side effects',
        ],
        advantages: [
          'High component reusability and modularity',
          'Blazing fast DOM updates via Virtual DOM diffing',
          'Massive global developer ecosystem and career demand',
        ],
        commonMistakes: [
          'Directly mutating state variables instead of calling setter functions (e.g. state.count = 5 instead of setCount(5))',
          'Omitting dependency arrays in useEffect causing infinite render loops',
          'Prop drilling through dozens of nested components instead of using Context API',
        ],
        codeExample: {
          language: 'jsx',
          code: `import React, { useState } from 'react';

function CounterCard({ title = "Study Streak" }) {
  const [days, setDays] = useState(7);

  const incrementStreak = () => {
    setDays((prevDays) => prevDays + 1);
  };

  return (
    <div className="counter-card">
      <h3>{title}</h3>
      <p className="counter-value">{days} Days</p>
      <button onClick={incrementStreak} className="btn-primary">
        +1 Day Streak
      </button>
    </div>
  );
}`,
          explanation: 'Demonstrates useState hook for reactive UI updates and props destructuring with default parameters.',
        },
        practiceQuestions: [
          {
            question: 'Why should you never mutate React state directly?',
            hint: 'How does React know when to re-render the component?',
            answer: 'React relies on reference equality checks (Object.is) to detect state changes. Direct mutation does not trigger re-rendering.',
          },
        ],
        relatedTopics: ['JavaScript ES6+', 'REST APIs & Axios', 'State Management & Context API'],
      },
      {
        title: 'Arrays & Dynamic Programming Essentials',
        slug: 'arrays-and-dp-essentials',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Data Structures & Algorithms',
        difficulty: 'Advanced',
        estimatedTime: '45 mins',
        description: 'Master array memory representations, two-pointer techniques, and the memoization / tabulation concepts of Dynamic Programming.',
        whatIsIt: 'Arrays are contiguous memory blocks storing elements of the same type. Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them down into overlapping subproblems and caching results.',
        whyLearnIt: 'Array algorithms and Dynamic Programming form the backbone of FAANG/Tier-1 software engineering coding interviews and high-performance search systems.',
        simpleExplanation: 'Remembering your past answers so you never have to recalculate them. If someone asks you: "What is 1+1+1+1?", you say 4. If they add another "+ 1", you instantly say 5 because you remember 4!',
        realWorldExample: 'Google Maps finding the shortest route between two cities or spell check algorithms calculating the minimum edit distance between typos.',
        whereUsed: 'Search engines, route planning, genomic sequence alignment, compiler optimization, game AI engines.',
        keyPoints: [
          'Contiguous memory allocation allows O(1) random access by index',
          'Two Pointers & Sliding Window reduce O(N^2) brute force array problems to O(N)',
          'Top-down DP: Recursion + Memoization (caching return values)',
          'Bottom-up DP: Iteration + Tabulation (building up base cases)',
        ],
        advantages: [
          'Turns exponential time algorithms (O(2^N)) into linear or polynomial time (O(N))',
          'Guarantees optimal solutions for problems with optimal substructure',
        ],
        commonMistakes: [
          'Out-of-bounds array indexing errors',
          'Failing to identify the base cases in recursive DP functions',
          'Using excessive memory when a problem only needs the previous 2 states (space optimization)',
        ],
        codeExample: {
          language: 'javascript',
          code: `// Fibonacci with Tabulation (O(N) Time, O(1) Space)
function fibonacci(n) {
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

console.log("Fibonacci(10):", fibonacci(10)); // 55`,
          explanation: 'Optimized space approach storing only the last two computed states instead of maintaining an entire array.',
        },
        practiceQuestions: [
          {
            question: 'What two properties must a problem have to be solved with Dynamic Programming?',
            hint: 'Subproblems and structure.',
            answer: '1) Optimal Substructure (an optimal solution can be constructed from optimal subproblem solutions) and 2) Overlapping Subproblems.',
          },
        ],
        relatedTopics: ['Recursion & Backtracking', 'Big-O Complexity', 'Sorting & Searching'],
      },
      {
        title: 'Database Design & MongoDB CRUD',
        slug: 'mongodb-and-database-design',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Databases',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        description: 'Explore document-oriented NoSQL databases, Mongoose schema modeling, normalization vs denormalization, and CRUD operations.',
        whatIsIt: 'MongoDB is a leading NoSQL document database that stores data in flexible, JSON-like BSON documents. Mongoose is an Object Data Modeling (ODM) library for Node.js.',
        whyLearnIt: 'Modern full-stack web applications demand fast schema iteration and intuitive data structures that match frontend JSON objects seamlessly.',
        simpleExplanation: 'Relational databases store data like rigid Excel spreadsheets. MongoDB stores data like digital file folders filled with flexible JSON index cards.',
        realWorldExample: 'An e-commerce order system storing user information, purchased items array, and delivery status all inside a single structured order document.',
        whereUsed: 'Node.js/Express stacks (MERN), content management systems, IoT event logs, social media feeds.',
        keyPoints: [
          'Collections are equivalent to tables; documents are equivalent to rows',
          'Primary key _id is automatically generated as a 24-character hex ObjectId',
          'Mongoose provides schema validation, middleware hooks, and type casting',
          'Indexing (B-Tree) drastically speeds up query execution from O(N) to O(log N)',
        ],
        advantages: [
          'Schemaless flexibility allows rapid agile product development',
          'Native JSON compatibility simplifies frontend-backend data exchange',
          'Horizontal scaling via sharding and high availability with replica sets',
        ],
        commonMistakes: [
          'Embedding unlimited arrays inside documents exceeding the 16MB document limit',
          'Not creating indexes on frequently queried fields leading to collection scans',
        ],
        codeExample: {
          language: 'javascript',
          code: `const mongoose = require('mongoose');

// Define Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  studentsEnrolled: { type: Number, default: 0 },
  tags: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// CRUD: Create & Read
async function manageCourses() {
  const Course = mongoose.model('Course', CourseSchema);
  const newCourse = await Course.create({
    title: 'Full Stack Web Mastery',
    tags: ['react', 'node', 'mongodb']
  });
  const found = await Course.find({ isActive: true });
  return found;
}`,
          explanation: 'Demonstrates Mongoose schema creation, validation rules, and async/await document insertion.',
        },
        practiceQuestions: [
          {
            question: 'When should you reference documents instead of embedding them in MongoDB?',
            hint: 'Think about array growth and 16MB limits.',
            answer: 'Use referencing when data has a 1-to-many relationship with unbounded growth, or when the data is queried independently across multiple collections.',
          },
        ],
        relatedTopics: ['REST APIs', 'Node.js & Express', 'SQL vs NoSQL'],
      },
      {
        title: 'Computer Networks: OSI Model & HTTP/HTTPS',
        slug: 'computer-networks-osi-http',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Computer Networks',
        difficulty: 'Beginner',
        estimatedTime: '25 mins',
        description: 'Understand how packets travel across the globe: the 7-layer OSI model, TCP vs UDP, DNS resolution, and TLS/HTTPS encryption.',
        whatIsIt: 'Computer networking is the practice of interconnecting computers to share data and resources using standardized protocols like TCP/IP and HTTP.',
        whyLearnIt: 'Every API request, database query, video stream, and security handshake relies on understanding network transport, latency, and protocols.',
        simpleExplanation: 'Just like mailing a letter requires paper, envelope, address, post office, truck, and mailbox, the OSI model defines the 7 steps to move data from your phone to a server.',
        realWorldExample: 'Typing "google.com" in your browser: DNS translates the name to an IP, TCP establishes a 3-way handshake, TLS encrypts the session, and HTTP GET fetches the homepage.',
        whereUsed: 'Web browsers, backend microservices, CDNs, cloud infrastructure, game servers.',
        keyPoints: [
          '7 OSI Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application',
          'TCP provides reliable, ordered transmission; UDP provides fast, connectionless delivery',
          'HTTP/HTTPS operates on Layer 7; HTTPS encrypts payloads using TLS/SSL on port 443',
          'DNS acts as the phonebook of the internet, mapping hostnames to IP addresses',
        ],
        advantages: [
          'Standardized layered architecture allows different vendors and systems to communicate seamlessly',
          'HTTPS guarantees data integrity, privacy, and server authentication',
        ],
        commonMistakes: [
          'Assuming HTTP requests are secure without TLS certificate verification',
          'Confusing port numbers: HTTP uses 80, HTTPS uses 443, SSH uses 22',
        ],
        codeExample: {
          language: 'bash',
          code: `# Inspecting HTTP response headers with curl
curl -I https://jsonplaceholder.typicode.com/posts/1

# Expected response:
# HTTP/2 200
# content-type: application/json; charset=utf-8
# cache-control: max-age=43200`,
          explanation: 'Demonstrates fetching headers to inspect response status codes, content-types, and cache headers.',
        },
        practiceQuestions: [
          {
            question: 'What is the purpose of the TCP 3-Way Handshake?',
            hint: 'SYN, SYN-ACK, ACK.',
            answer: 'It establishes a synchronized, reliable connection and sequence numbers between client and server before data transfer begins.',
          },
        ],
        relatedTopics: ['REST APIs', 'Cybersecurity Fundamentals', 'Web Security'],
      },
      {
        title: 'Operating Systems: Processes, Threads & Concurrency',
        slug: 'operating-systems-concurrency',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Operating Systems',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        description: 'Dive deep into the OS kernel: process scheduling, virtual memory paging, multithreading, race conditions, and deadlocks.',
        whatIsIt: 'An Operating System manages computer hardware resources (CPU, RAM, disk) and provides common services for application software.',
        whyLearnIt: 'Understanding how the CPU schedules tasks and manages memory is essential for writing high-performance backend systems and debugging memory leaks.',
        simpleExplanation: 'A process is an entire restaurant. Threads are the individual chefs and waiters working inside the same restaurant, sharing the kitchen pantry (memory).',
        realWorldExample: 'Your web browser running each tab in a separate process so that if one tab crashes, your entire browser does not go down.',
        whereUsed: 'Linux, Windows, macOS, container runtimes (Docker), server kernels, embedded microcontrollers.',
        keyPoints: [
          'Process: Program in execution with its own isolated address space',
          'Thread: Lightweight unit of execution within a process sharing heap memory',
          'Deadlock: Situation where two or more processes are unable to proceed because each holds a resource the other needs',
          'Virtual Memory uses paging to give processes the illusion of contiguous physical RAM',
        ],
        advantages: [
          'Concurrency allows servers to handle thousands of simultaneous client requests',
          'Memory isolation protects the operating system and other running applications from crashing',
        ],
        commonMistakes: [
          'Race conditions caused by unsynchronized access to shared mutable memory',
          'Creating too many threads resulting in thrashing and heavy context-switching overhead',
        ],
        codeExample: {
          language: 'javascript',
          code: `// Node.js Event Loop non-blocking concurrency
console.log('1. Script begins');

setTimeout(() => {
  console.log('3. Timer callback executed from MacroTask queue');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Promise resolved from MicroTask queue');
});

console.log('4. Script ends synchronous execution');`,
          explanation: 'Demonstrates non-blocking asynchronous event loop scheduling in the V8 JavaScript runtime.',
        },
        practiceQuestions: [
          {
            question: 'What are the 4 Coffman conditions required for a deadlock to occur?',
            hint: 'Mutual exclusion, hold & wait, no preemption, circular wait.',
            answer: '1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait.',
          },
        ],
        relatedTopics: ['Programming Fundamentals', 'Cloud Virtual Machines', 'Computer Architecture'],
      },
      {
        title: 'Cybersecurity: Authentication, JWT & Encryption',
        slug: 'cybersecurity-authentication-jwt',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Cybersecurity',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        description: 'Protect applications: password hashing with bcrypt, JSON Web Tokens (JWT), CORS, XSS, CSRF, and symmetric vs asymmetric encryption.',
        whatIsIt: 'Cybersecurity encompasses technologies, processes, and controls designed to protect systems, networks, programs, and data from cyber attacks.',
        whyLearnIt: 'Data breaches cost companies millions of dollars and compromise user trust. Secure coding is an indispensable skill for every professional software engineer.',
        simpleExplanation: 'A JWT is like a sealed, digitally stamped concert wristband. The bouncer (server) does not need to look up your ticket in a database; the wristband signature proves you are allowed in.',
        realWorldExample: 'Online banking authentication where passwords are never saved in plaintext, requests expire after inactivity, and data is protected with AES-256 encryption.',
        whereUsed: 'Authentication systems, OAuth2 / OpenID Connect, payment gateways, encrypted messaging.',
        keyPoints: [
          'Authentication verifies WHO you are; Authorization verifies WHAT you are permitted to do',
          'Passwords must be hashed using adaptive algorithms like bcrypt with random salt',
          'JWT consists of three base64url encoded parts: Header, Payload, and Signature',
          'Symmetric encryption (AES) uses one secret key; Asymmetric (RSA/ECC) uses public/private key pairs',
        ],
        advantages: [
          'Stateless JWT authentication scales effortlessly across distributed server clusters',
          'Salted hashes prevent precomputed rainbow table attacks',
        ],
        commonMistakes: [
          'Storing sensitive secrets (passwords, social security numbers) inside the unencrypted JWT payload',
          'Hardcoding API keys and JWT secrets in public Git repositories',
        ],
        codeExample: {
          language: 'javascript',
          code: `const jwt = require('jsonwebtoken');

// Generating a secure signed JWT
function signUserToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verifying token in incoming request
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // Expired or tampered token
  }
}`,
          explanation: 'Demonstrates token generation with expiration and cryptographic signature verification.',
        },
        practiceQuestions: [
          {
            question: 'Why should you never store plaintext passwords in a database?',
            hint: 'What happens if the database is leaked?',
            answer: 'If the database is compromised, attackers can immediately access user accounts across all sites where they reused the password. Passwords must always be hashed with bcrypt/Argon2.',
          },
        ],
        relatedTopics: ['Web Development', 'Computer Networks', 'Database Security'],
      },
      {
        title: 'Cloud Computing: AWS, Containers & Serverless',
        slug: 'cloud-computing-aws-docker',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'Cloud Computing',
        difficulty: 'Intermediate',
        estimatedTime: '25 mins',
        description: 'Discover scalable infrastructure: IaaS vs PaaS vs SaaS, Docker containers, Kubernetes orchestration, and AWS cloud primitives.',
        whatIsIt: 'Cloud computing is the on-demand delivery of IT resources over the Internet with pay-as-you-go pricing, eliminating the need to buy and maintain physical data centers.',
        whyLearnIt: 'Virtually all modern software applications are hosted on cloud providers like AWS, GCP, and Azure. Containerization with Docker has become the universal deployment standard.',
        simpleExplanation: 'Instead of buying a generator to power your house, you plug into the electric grid and pay for only the electricity you consume.',
        realWorldExample: 'Netflix streaming millions of movies concurrently by automatically spinning up hundreds of AWS EC2 instances during peak evening hours.',
        whereUsed: 'Enterprise SaaS, streaming platforms, mobile backends, Big Data pipelines.',
        keyPoints: [
          'Three service models: IaaS (AWS EC2), PaaS (Heroku/Render), SaaS (Google Workspace)',
          'Docker packages code and dependencies into portable, isolated containers',
          'Serverless (AWS Lambda) executes code only in response to events without managing servers',
          'Object storage (AWS S3) provides virtually limitless, highly durable file storage',
        ],
        advantages: [
          'Zero upfront capital expenditure for hardware',
          'Instant global scale and elastic resource provisioning',
          'Built-in redundancy, backups, and disaster recovery',
        ],
        commonMistakes: [
          'Leaving public read/write permissions on AWS S3 buckets causing data leaks',
          'Building bloated Docker images by not utilizing multi-stage builds',
        ],
        codeExample: {
          language: 'dockerfile',
          code: `# Production Node.js Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]`,
          explanation: 'A lightweight Alpine-based container packaging a Node.js microservice.',
        },
        practiceQuestions: [
          {
            question: 'What is the primary difference between a Virtual Machine and a Docker Container?',
            hint: 'Kernel sharing vs guest OS.',
            answer: 'A VM bundles a complete guest OS with its own kernel, while a Docker container shares the host OS kernel, making containers vastly lighter and faster to start.',
          },
        ],
        relatedTopics: ['Operating Systems', 'Web Development', 'DevOps & CI/CD'],
      },
      {
        title: 'AI & Machine Learning Foundations',
        slug: 'ai-and-machine-learning-foundations',
        hub: hubMap['technical'],
        hubSlug: 'technical',
        category: 'AI & Machine Learning',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        description: 'Demystify artificial intelligence: supervised vs unsupervised learning, neural networks, loss functions, NLP, and Generative AI.',
        whatIsIt: 'Machine Learning is a branch of artificial intelligence that gives computers the ability to learn and improve from experience without being explicitly programmed.',
        whyLearnIt: 'AI is transforming every industry on earth—from medical diagnostics and autonomous vehicles to generative code assistants and language models.',
        simpleExplanation: 'Traditional programming gives the computer rules and data to get answers. Machine Learning gives the computer data and answers so it figures out the rules itself!',
        realWorldExample: 'Spotify recommending new songs you love based on millions of listening patterns or ChatGPT generating code from human prompts.',
        whereUsed: 'Recommendation engines, fraud detection, computer vision, voice assistants, autonomous driving.',
        keyPoints: [
          'Supervised Learning: Trained on labeled data (classification, regression)',
          'Unsupervised Learning: Discovers hidden patterns in unlabeled data (clustering)',
          'Neural Networks consist of interconnected nodes (neurons) organized into layers',
          'Transformers & Attention mechanisms power modern Large Language Models (LLMs)',
        ],
        advantages: [
          'Can solve complex pattern recognition problems that humans cannot program with simple if/else rules',
          'Continuously improves accuracy as more training data is acquired',
        ],
        commonMistakes: [
          'Overfitting: Model memorizes the training data perfectly but fails on unseen real-world data',
          'Ignoring data quality: "Garbage in, garbage out"',
        ],
        codeExample: {
          language: 'python',
          code: `# Simple linear regression intuition with scikit-learn
import numpy as np
from sklearn.linear_model import LinearRegression

# Study hours vs Exam scores
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([55, 65, 75, 85, 95])

model = LinearRegression()
model.fit(X, y)

# Predict score for 6 hours of study
predicted = model.predict([[6]])
print(f"Predicted Score: {predicted[0]:.1f}") # Output: 105.0 (capped at 100)`,
          explanation: 'Supervised learning model learning the linear relationship between study hours and exam performance.',
        },
        practiceQuestions: [
          {
            question: 'What is overfitting in machine learning and how can it be prevented?',
            hint: 'High variance on test data.',
            answer: 'Overfitting occurs when a model learns noise in training data. It is prevented using regularization, cross-validation, and more training data.',
          },
        ],
        relatedTopics: ['Data Structures & Algorithms', 'Python Programming', 'Linear Algebra & Statistics'],
      },
    ];

    await Topic.insertMany(topics);
    console.log(`[Seed] Seeded ${topics.length} rich curriculum topics.`);

    // 4. Seed Quizzes for the topics
    const quizzes = [
      {
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
            question: 'What happens when you reassign a const variable?',
            options: ['Silent warning', 'TypeError is thrown', 'Variable becomes undefined', 'Value changes successfully'],
            correctAnswer: 1,
            explanation: 'Attempting to reassign a const variable throws a TypeError: Assignment to constant variable.',
          },
        ],
      },
      {
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
      {
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
      {
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
      {
        title: 'Computer Networks & HTTP Quiz',
        topicSlug: 'computer-networks-osi-http',
        hubSlug: 'technical',
        difficulty: 'Beginner',
        passingScore: 70,
        questions: [
          {
            question: 'Which layer of the OSI model does HTTP/HTTPS operate on?',
            options: ['Transport (Layer 4)', 'Network (Layer 3)', 'Application (Layer 7)', 'Data Link (Layer 2)'],
            correctAnswer: 2,
            explanation: 'HTTP, DNS, FTP, and SMTP are Layer 7 (Application Layer) protocols.',
          },
          {
            question: 'What is the default port for secure HTTPS traffic?',
            options: ['80', '8080', '443', '21'],
            correctAnswer: 2,
            explanation: 'Port 80 is used for unencrypted HTTP, and port 443 is the standard port for TLS/HTTPS traffic.',
          },
          {
            question: 'Which protocol guarantees ordered packet delivery and error checking?',
            options: ['UDP', 'TCP', 'IP', 'ICMP'],
            correctAnswer: 1,
            explanation: 'Transmission Control Protocol (TCP) provides connection-oriented, reliable, and ordered byte-stream transmission.',
          },
        ],
      },
      {
        title: 'Operating Systems & Concurrency Quiz',
        topicSlug: 'operating-systems-concurrency',
        hubSlug: 'technical',
        difficulty: 'Intermediate',
        passingScore: 70,
        questions: [
          {
            question: 'What do multiple threads within the same process share?',
            options: ['CPU registers', 'Their call stack', 'Heap memory and address space', 'Program counter'],
            correctAnswer: 2,
            explanation: 'Threads within the same process share the heap and data segments, but each thread possesses its own private call stack and registers.',
          },
          {
            question: 'What condition describes two threads trying to modify shared data simultaneously with unpredictable outcomes?',
            options: ['Deadlock', 'Race condition', 'Context switch', 'Starvation'],
            correctAnswer: 1,
            explanation: 'A race condition occurs when concurrent threads access and manipulate shared state without proper synchronization.',
          },
        ],
      },
      {
        title: 'Cybersecurity & Auth Quiz',
        topicSlug: 'cybersecurity-authentication-jwt',
        hubSlug: 'technical',
        difficulty: 'Intermediate',
        passingScore: 70,
        questions: [
          {
            question: 'Why is salt added before hashing a password with bcrypt?',
            options: [
              'To speed up the hashing calculation',
              'To ensure identical passwords generate distinct hashes, defeating rainbow table attacks',
              'To compress the password into fewer bytes',
              'To allow decryption of the password if forgotten',
            ],
            correctAnswer: 1,
            explanation: 'A cryptographic salt adds random data to the password before hashing, guaranteeing that identical passwords produce completely different hash outputs.',
          },
          {
            question: 'How many period-separated parts comprise a standard JWT?',
            options: ['2 (Header, Body)', '3 (Header, Payload, Signature)', '4 (Issuer, User, Roles, Key)', '1'],
            correctAnswer: 1,
            explanation: 'A JWT is structured as header.payload.signature, each base64url encoded.',
          },
        ],
      },
    ];

    await Quiz.insertMany(quizzes);
    console.log(`[Seed] Seeded ${quizzes.length} comprehensive topic quizzes.`);

    // 5. Seed Flagship Projects: FullnessLabs & HUB23
    await Project.deleteMany({});
    await Project.create({
      user: demoUser._id,
      title: 'FullnessLabs',
      problemStatement:
        'Students and beginners often struggle to manage their learning activities, technical skills, career preparation, and projects in one organized platform. Information is usually scattered across different websites and applications, making it difficult to track learning progress, manage projects, and prepare for future career opportunities.',
      description:
        'FullnessLabs is a web-based learning and career management platform designed to bring learning, technical skills, career development, and project management into one centralized system. The platform provides users with an organized environment to manage their learning journey, explore technical skills, work on projects, and track their career development. It is built using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage.',
      category: 'Web Projects',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      role: 'C.O',
      githubUrl: 'https://github.com/chinnu554/',
      demoUrl: 'https://fullnesslabs.netlify.app/',
    });

    await Project.create({
      user: demoUser._id,
      title: 'HUB23',
      problemStatement:
        'Students and users face different challenges in managing their learning, skills, projects, tasks, career activities, and technical resources in one place. Using multiple platforms for different activities can make information difficult to organize and track. HUB23 is designed to provide a centralized digital hub that helps users organize and manage different activities through a single web platform.',
      description:
        'HUB23 is a centralized web platform designed to bring multiple useful activities and resources into one simple and organized environment. It helps users manage their learning, technical skills, projects, tasks, career development, and other digital activities from a single platform. The application uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management. The goal of HUB23 is to provide a flexible and user-friendly platform that can be extended to solve different user and management problems.',
      category: 'Web Projects',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      role: 'Developer',
      githubUrl: 'https://github.com/shaikjailabdin23-dot/',
      demoUrl: 'https://hub23.lovable.app/',
    });
    console.log('[Seed] FullnessLabs & HUB23 projects seeded successfully into Project Hub.');
    console.log('[Seed] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seed Error]:', error);
  }
};

module.exports = seedData;

// Allow direct CLI execution: node seed.js
if (require.main === module) {
  require('dotenv').config();
  const mongoose = require('mongoose');
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hub_learning';
  mongoose.connect(uri)
    .then(() => {
      console.log('Connected for direct seeding...');
      return seedData();
    })
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
