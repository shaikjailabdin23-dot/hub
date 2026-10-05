export const jobStatuses = [
  'Interested',
  'Applied',
  'Shortlisted',
  'Interview',
  'Selected',
  'Rejected',
];

export const initialJobApplications = [
  {
    id: 'job-1',
    company: 'Stripe',
    position: 'Junior Full Stack Engineer',
    applicationDate: '2026-08-15',
    status: 'Interview',
    interviewDate: '2026-09-28',
    result: 'Round 2 Scheduled',
    notes: 'Cover letter highlighted MERN stack, payment gateway capstone, and REST API design.',
  },
  {
    id: 'job-2',
    company: 'Atlassian',
    position: 'Frontend Software Associate',
    applicationDate: '2026-08-20',
    status: 'Applied',
    interviewDate: '',
    result: 'Under Review',
    notes: 'Applied through college campus referral. Emphasized React component architecture and CSS glassmorphism.',
  },
  {
    id: 'job-3',
    company: 'Microsoft',
    position: 'Software Engineering Intern',
    applicationDate: '2026-08-01',
    status: 'Shortlisted',
    interviewDate: '2026-10-05',
    result: 'Online Assessment Cleared (95%)',
    notes: 'Completed HackerRank OA with 2/2 DSA problems solved. Reviewing Azure and multithreading.',
  },
  {
    id: 'job-4',
    company: 'Innovate Labs',
    position: 'Full Stack React / Node Developer',
    applicationDate: '2026-07-10',
    status: 'Selected',
    interviewDate: '2026-07-25',
    result: 'Offer Extended ($85k / Campus)',
    notes: 'Received positive feedback on capstone project presentation and clean GitHub repository structure.',
  },
];

export const interviewGuides = [
  {
    id: 'technical-interview',
    title: 'Technical & System Architecture Interview',
    icon: 'server',
    duration: '60 mins',
    summary: 'Deep dive into computer science fundamentals, database schema design, REST APIs, and system scalability trade-offs.',
    keyTopics: ['REST vs GraphQL', 'SQL vs NoSQL trade-offs', 'Caching with Redis', 'Load Balancing & Horizontal Scaling'],
    sampleQuestions: [
      'How would you design a rate limiter for an Express backend API?',
      'Explain the difference between horizontal and vertical scaling with real-world examples.',
      'How does MongoDB handle indexing and what are the drawbacks of excessive indexes?',
    ],
  },
  {
    id: 'coding-interview',
    title: 'DSA Live Coding Whiteboard Interview',
    icon: 'terminal',
    duration: '45 mins',
    summary: 'Pair-programming with an engineer solving algorithmic challenges on arrays, trees, dynamic programming, and graphs.',
    keyTopics: ['Time & Space Big-O analysis', 'Handling edge cases (null, empty, overflows)', 'Thinking aloud and dry-running code'],
    sampleQuestions: [
      'Solve the Two Sum problem in O(N) time and explain your space complexity.',
      'Reverse a singly linked list in-place in O(1) auxiliary space.',
      'Find the longest palindromic substring in a given string.',
    ],
  },
  {
    id: 'behavioral-interview',
    title: 'Behavioral & Leadership Principles (STAR)',
    icon: 'users',
    duration: '45 mins',
    summary: 'Evaluates culture fit, team collaboration, conflict resolution, and handling high-pressure project deadlines.',
    keyTopics: ['STAR Framework: Situation, Task, Action, Result', 'Conflict resolution', 'Growth mindset and handling failure'],
    sampleQuestions: [
      'Tell me about a time you had a strong disagreement with a technical decision made by your teammate.',
      'Describe a scenario where you faced a tight project deadline and had to prioritize features.',
      'Tell me about a project that failed or had serious bugs, and what you learned from the experience.',
    ],
  },
  {
    id: 'hr-interview',
    title: 'HR & Cultural Alignment Discussion',
    icon: 'smile',
    duration: '30 mins',
    summary: 'Discussion regarding career aspirations, company values alignment, compensation expectations, and work environment preferences.',
    keyTopics: ['Why this company?', 'Long-term career aspirations', 'Salary negotiation and benefit evaluation'],
    sampleQuestions: [
      'Where do you see yourself in 3 to 5 years as an engineer?',
      'Why are you excited about our mission and engineering culture over other opportunities?',
    ],
  },
];

export const resumeTips = [
  {
    title: 'Quantify Your Accomplishments',
    description: 'Use numbers, metrics, and percentages (e.g., "Reduced API response times by 40% via Redis caching" instead of "Worked on backend performance").',
  },
  {
    title: 'Keep It Strictly to One Page',
    description: 'For university students and new graduates, a tight, impactful 1-page resume is industry standard and respects recruiter time.',
  },
  {
    title: 'Include Live GitHub & Demo Links',
    description: 'Every project listed should have a clickable link to clean, well-documented source code and a live deployed demo.',
  },
  {
    title: 'Tailor Tech Stacks to the Job Description',
    description: 'Ensure the keywords and technologies mentioned in the job posting (e.g., React, TypeScript, MongoDB) appear prominently in your Skills and Projects sections.',
  },
];
