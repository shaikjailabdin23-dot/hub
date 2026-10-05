// Precise, industry-standard flowchart roadmap data for all 11 career paths (roadmap.sh style)
export const careerFlowchartData = {
  'Software Developer': {
    title: 'Software Developer',
    icon: '💻',
    category: 'Core Computer Science & Systems',
    targetAudience: 'Target audience for this roadmap is beginners & CS students aiming for Software Engineering (SDE I/II) roles.',
    description: 'Master algorithmic problem solving, core computer science, memory management, databases, and system design fundamentals.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'sd-c-prog', name: 'Programming Fundamentals', tech: 'C / Python / Java', docsUrl: '/technical-hub?category=Programming%20Fundamentals' },
          { id: 'sd-oop', name: 'Object-Oriented Programming', tech: 'Classes, OOP Principles', docsUrl: '/technical-hub?category=Programming%20Fundamentals' },
          { id: 'sd-git', name: 'Git & GitHub', tech: 'Version Control, PRs', docsUrl: '/developer-tools/git' },
        ],
        checkpoints: [
          { id: 'cp-sd-1', title: 'Checkpoint - Core Logic & CLI', desc: 'Build 20 algorithmic console utilities (Matrix math, Palindromes, Fibonacci)' },
          { id: 'cp-sd-2', title: 'Checkpoint - OOP Banking Model', desc: 'Object-oriented bank account and transaction manager with encapsulation' },
        ],
        note: 'Recommendation: Master memory pointers and execution stack in C/C++ or Java first before jumping into high-level frameworks.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'sd-dsa-arrays', name: 'Arrays & Strings', tech: '2-Pointers, Sliding Window', docsUrl: '/coding-hub' },
          { id: 'sd-dsa-lists', name: 'Linked Lists & Stacks', tech: 'Pointers, Monotonic Stacks', docsUrl: '/coding-hub' },
          { id: 'sd-dsa-trees', name: 'Trees & Graphs', tech: 'BST, BFS/DFS, Traversals', docsUrl: '/coding-hub' },
          { id: 'sd-dsa-dp', name: 'Dynamic Programming', tech: 'Memoization & Tabulation', docsUrl: '/coding-hub' },
        ],
        checkpoints: [
          { id: 'cp-sd-3', title: 'Checkpoint - 50 LeetCode Mediums', desc: 'Solve curated problems on Arrays, Binary Trees, and Searching algorithms' },
          { id: 'cp-sd-4', title: 'Checkpoint - Custom Data Structure Lib', desc: 'Implement Generic HashMap, Min-Heap, and Graph Traversal library from scratch' },
        ],
        note: 'DSA is the primary screening benchmark at FAANG & top tier engineering firms. Practice daily on Coding Hub.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'sd-os', name: 'Operating Systems', tech: 'Processes, Threads, Concurrency', docsUrl: '/technical-hub?category=Computer%20Fundamentals' },
          { id: 'sd-db-sql', name: 'Databases & SQL', tech: 'PostgreSQL, MySQL, Indexing', docsUrl: '/technical-hub?category=Databases' },
          { id: 'sd-networks', name: 'Computer Networks', tech: 'TCP/IP, HTTP/3, Sockets', docsUrl: '/technical-hub?category=Computer%20Fundamentals' },
        ],
        checkpoints: [
          { id: 'cp-sd-5', title: 'Checkpoint - Multi-Threaded TCP Server', desc: 'Build an asynchronous TCP echo server with worker threads and socket polling' },
          { id: 'cp-sd-6', title: 'Checkpoint - E-Commerce DB Schema', desc: 'Design normalized 3NF relational schema with ACID transactions and B-Tree indexes' },
        ],
        note: 'Understand Virtual Memory, Deadlocks, Mutex locks, and ACID transactions for system architecture interviews.',
      },
      {
        rowNumber: 4,
        topics: [
          { id: 'sd-rest-api', name: 'REST & GraphQL APIs', tech: 'Express / Spring Boot / FastAPI', docsUrl: '/developer-tools/nodejs' },
          { id: 'sd-system-design', name: 'Low-Level System Design', tech: 'Design Patterns, SOLID Principles', docsUrl: '/technical-hub' },
          { id: 'sd-testing', name: 'Unit Testing & CI/CD', tech: 'Jest / JUnit, GitHub Actions', docsUrl: '/developer-tools/docker' },
        ],
        checkpoints: [
          { id: 'cp-sd-7', title: 'Checkpoint - Production SaaS Service', desc: 'Build scalable REST API backend with rate limiting, caching, and 90% test coverage' },
        ],
        note: 'Apply SOLID principles, Factory, and Observer design patterns to produce maintainable enterprise codebases.',
      },
    ],
  },

  'Web Developer': {
    title: 'Web Developer',
    icon: '🌐',
    category: 'Frontend & Modern Web Engineering',
    targetAudience: 'Target audience for this roadmap is students wanting to build fast, beautiful, and responsive web experiences.',
    description: 'Learn semantic HTML5, modern CSS3, ES6+ JavaScript, responsive layouts, package management, React, and browser APIs.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'wd-html', name: 'HTML5 Semantic', tech: 'Accessibility, Semantic Tags', docsUrl: '/technical-hub?category=Web%20Development' },
          { id: 'wd-css', name: 'CSS3 Styling', tech: 'Box Model, Flexbox, CSS Grid', docsUrl: '/technical-hub?category=Web%20Development' },
          { id: 'wd-js', name: 'Modern JavaScript', tech: 'ES6+, DOM, Async/Await', docsUrl: '/technical-hub?category=Web%20Development' },
        ],
        checkpoints: [
          { id: 'cp-wd-1', title: 'Checkpoint - Static Webpages', desc: 'Build semantic personal portfolio and product landing pages with pure HTML/CSS' },
          { id: 'cp-wd-2', title: 'Checkpoint - Interactive JS Apps', desc: 'Develop weather dashboard and interactive calculator using fetch API and DOM events' },
        ],
        note: 'Build at least 2 complete responsive layouts with CSS Flexbox & Grid before starting JavaScript frameworks.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'wd-npm', name: 'npm & Package Management', tech: 'Dependencies, Scripts', docsUrl: '/developer-tools/npm' },
          { id: 'wd-git', name: 'Git Version Control', tech: 'Branches, Merge, GitHub', docsUrl: '/developer-tools/git' },
          { id: 'wd-tailwind', name: 'Tailwind CSS', tech: 'Utility-First, Responsive Design', docsUrl: '/developer-tools/tailwind' },
        ],
        checkpoints: [
          { id: 'cp-wd-3', title: 'Checkpoint - Collaborative Work', desc: 'Publish open-source repository with automated branches, README, and GitHub Pages' },
          { id: 'cp-wd-4', title: 'Checkpoint - Styled UI Component Kit', desc: 'Create reusable glassmorphic UI cards, modaled dialogs, and navigation drawers' },
        ],
        note: 'Package managers and utility CSS accelerate UI workflows and match modern production tech stacks.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'wd-react', name: 'React.js Core', tech: 'Components, Hooks, State, Props', docsUrl: '/developer-tools/react' },
          { id: 'wd-router', name: 'React Router', tech: 'SPA Routing, URL Parameters', docsUrl: '/developer-tools/react' },
          { id: 'wd-state', name: 'Context & State Mgmt', tech: 'Context API, Zustand, Redux', docsUrl: '/developer-tools/react' },
        ],
        checkpoints: [
          { id: 'cp-wd-5', title: 'Checkpoint - Frontend React App', desc: 'Build an E-commerce store with live cart, search filter, and category navigation' },
        ],
        note: 'Understand useEffect dependencies, re-rendering lifecycles, and component memoization for smooth 60fps UX.',
      },
      {
        rowNumber: 4,
        topics: [
          { id: 'wd-api', name: 'REST & GraphQL Integration', tech: 'Axios, TanStack Query', docsUrl: '/technical-hub' },
          { id: 'wd-perf', name: 'Performance & SEO', tech: 'Lighthouse, Web Vitals, Lazy Load', docsUrl: '/technical-hub' },
          { id: 'wd-deploy', name: 'Vercel / Netlify Deploy', tech: 'Custom Domains, CI/CD Deploy', docsUrl: '/developer-tools/railway' },
        ],
        checkpoints: [
          { id: 'cp-wd-6', title: 'Checkpoint - Production Web Portfolio', desc: 'Deploy 100/100 Lighthouse score portfolio with dark/light themes and analytics' },
        ],
        note: 'Optimize image formats (WebP/AVIF), lazy-load heavy bundles, and test on low-end mobile viewports.',
      },
    ],
  },

  'Full Stack Developer': {
    title: 'Full Stack Developer',
    icon: '⚡',
    category: 'End-to-End Web & Cloud Systems',
    targetAudience: 'Target audience for this roadmap is engineers wanting to master both frontend client and backend cloud infrastructure.',
    description: 'Build complete applications from React frontends to Node.js/Express backends, MongoDB/PostgreSQL databases, and Docker deployment.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'fs-html-css', name: 'HTML & CSS Foundations', tech: 'Flexbox, Grid, Semantics', docsUrl: '/technical-hub?category=Web%20Development' },
          { id: 'fs-js-es6', name: 'JavaScript Deep Dive', tech: 'Event Loop, Promises, Closures', docsUrl: '/developer-tools/nodejs' },
          { id: 'fs-git', name: 'Git & GitHub', tech: 'Branching, PRs, CI Setup', docsUrl: '/developer-tools/git' },
        ],
        checkpoints: [
          { id: 'cp-fs-1', title: 'Checkpoint - Static Webpages', desc: 'Create pixel-perfect responsive layouts with CSS animations and clean semantic markup' },
          { id: 'cp-fs-2', title: 'Checkpoint - Interactive Webapps', desc: 'Build asynchronous client applications consuming public REST API endpoints' },
        ],
        note: 'Master JavaScript asynchronous patterns (Event Loop, Microtasks, Async/Await) as it powers both frontend and backend.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'fs-react', name: 'React.js Ecosystem', tech: 'Vite, Hooks, Custom Hooks', docsUrl: '/developer-tools/react' },
          { id: 'fs-tailwind', name: 'Tailwind CSS', tech: 'Modern Design Systems', docsUrl: '/developer-tools/tailwind' },
          { id: 'fs-npm', name: 'npm & Tooling', tech: 'Modules, Bundlers, ESLint', docsUrl: '/developer-tools/npm' },
        ],
        checkpoints: [
          { id: 'cp-fs-3', title: 'Checkpoint - Frontend Single Page App', desc: 'Develop full interactive dashboard with search, filtering, and theme switcher' },
        ],
        note: 'You can pick any backend programming language. Our top recommendation is Node.js because you are already familiar with JavaScript.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'fs-node', name: 'Node.js Runtime', tech: 'Event Loop, Streams, File System', docsUrl: '/developer-tools/nodejs' },
          { id: 'fs-express', name: 'Express.js Framework', tech: 'Middlewares, Routing, CORS', docsUrl: '/developer-tools/nodejs' },
          { id: 'fs-db-mongo', name: 'MongoDB / Mongoose', tech: 'NoSQL Schema, Aggregations', docsUrl: '/developer-tools/mongodb' },
          { id: 'fs-db-postgres', name: 'PostgreSQL & Prisma', tech: 'Relational Models, SQL, ORM', docsUrl: '/technical-hub?category=Databases' },
        ],
        checkpoints: [
          { id: 'cp-fs-4', title: 'Checkpoint - RESTful CRUD Backend', desc: 'Build production REST API with error handling middleware, logging, and database models' },
          { id: 'cp-fs-5', title: 'Checkpoint - Auth & Security Layer', desc: 'Implement JWT authentication, bcrypt password hashing, rate limiting, and role-based access' },
        ],
        note: 'Never store plain text passwords. Always use bcrypt hashing and HTTP-only secure cookie tokens.',
      },
      {
        rowNumber: 4,
        topics: [
          { id: 'fs-docker', name: 'Docker & Containers', tech: 'Dockerfiles, Compose, Networking', docsUrl: '/developer-tools/docker' },
          { id: 'fs-redis', name: 'Redis Caching & PubSub', tech: 'In-Memory Cache, Rate Limiting', docsUrl: '/developer-tools/redis' },
          { id: 'fs-deploy', name: 'Cloud Deployment', tech: 'Render, Railway, AWS EC2, S3', docsUrl: '/developer-tools/railway' },
        ],
        checkpoints: [
          { id: 'cp-fs-6', title: 'Checkpoint - Production SaaS Platform', desc: 'Deploy full MERN / PERN platform with real-time sockets, payments, and Docker containers' },
        ],
        note: 'Dockerize both frontend and backend services for reproducible builds in dev and production.',
      },
    ],
  },

  'Data Analyst': {
    title: 'Data Analyst',
    icon: '📊',
    category: 'Data Analytics & Business Intelligence',
    targetAudience: 'Target audience is students aiming to turn raw data into actionable business intelligence and dashboards.',
    description: 'Master advanced Excel, SQL querying, Python data analysis with Pandas/NumPy, data visualization, and Power BI/Tableau dashboards.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'da-excel', name: 'Excel Advanced', tech: 'XLOOKUP, Pivot Tables, Macros', docsUrl: '/technical-hub' },
          { id: 'da-sql-basic', name: 'SQL Fundamentals', tech: 'SELECT, WHERE, GROUP BY, HAVING', docsUrl: '/technical-hub?category=Databases' },
          { id: 'da-sql-joins', name: 'SQL JOINs & Subqueries', tech: 'INNER/LEFT JOIN, CTEs, Window Funcs', docsUrl: '/technical-hub?category=Databases' },
        ],
        checkpoints: [
          { id: 'cp-da-1', title: 'Checkpoint - Financial Excel Model', desc: 'Build an automated multi-tab sales performance tracker with dynamic pivot charts' },
          { id: 'cp-da-2', title: 'Checkpoint - Complex SQL Query Suite', desc: 'Write 30 analytical queries calculating cohort retention, running totals, and rank' },
        ],
        note: 'SQL is the most critical skill for data analysts. Master Window Functions (ROW_NUMBER, RANK, LAG/LEAD).',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'da-py-core', name: 'Python for Data', tech: 'Data Types, Functions, OOP', docsUrl: '/technical-hub?category=Programming%20Fundamentals' },
          { id: 'da-pandas', name: 'Pandas & NumPy', tech: 'DataFrames, Series, Vectorization', docsUrl: '/technical-hub' },
          { id: 'da-cleaning', name: 'Data Cleaning & Wrangling', tech: 'Null Handling, Type Casting, Regex', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-da-3', title: 'Checkpoint - Data Wrangling Pipeline', desc: 'Clean a messy real-world 100,000 row dataset with outlier removal and imputation' },
        ],
        note: '80% of data work is cleaning and preprocessing. Learn how to handle missing data and duplicates properly.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'da-viz-py', name: 'Data Visualization', tech: 'Matplotlib, Seaborn, Plotly', docsUrl: '/technical-hub' },
          { id: 'da-powerbi', name: 'Power BI / Tableau', tech: 'DAX Formulas, Interactive Dashboards', docsUrl: '/technical-hub' },
          { id: 'da-stats', name: 'Statistics & Probability', tech: 'Mean/Median, Variance, A/B Testing', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-da-4', title: 'Checkpoint - Executive Power BI Dashboard', desc: 'Build an interactive multi-page business KPI dashboard with slicers and drill-throughs' },
          { id: 'cp-da-5', title: 'Checkpoint - A/B Test Statistical Report', desc: 'Conduct hypothesis testing and compute p-values for product feature experiment' },
        ],
        note: 'Focus on choosing the right chart type: Bar for comparisons, Line for trends, Scatter for correlation.',
      },
    ],
  },

  'Data Scientist': {
    title: 'Data Scientist',
    icon: '🔬',
    category: 'Data Science & Applied Machine Learning',
    targetAudience: 'Target audience is students aiming to build predictive models, statistical algorithms, and data-driven intelligence.',
    description: 'Master statistical modeling, linear algebra, Python ML pipelines with Scikit-Learn, feature engineering, and model deployment.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'ds-python', name: 'Python & Scientific Computing', tech: 'NumPy, Pandas, Vectorized Math', docsUrl: '/technical-hub?category=Programming%20Fundamentals' },
          { id: 'ds-math', name: 'Linear Algebra & Calculus', tech: 'Vectors, Matrices, Derivatives', docsUrl: '/technical-hub' },
          { id: 'ds-stats', name: 'Probability & Distributions', tech: 'Normal/Poisson, Bayes Theorem', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-ds-1', title: 'Checkpoint - Statistical Data Audit', desc: 'Perform descriptive statistics, skewness analysis, and hypothesis testing on Kaggle data' },
        ],
        note: 'Strong grasp of vector dot products, matrix transposition, and partial derivatives is essential for machine learning.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'ds-eda', name: 'Exploratory Data Analysis', tech: 'Seaborn, Correlation Matrices', docsUrl: '/technical-hub' },
          { id: 'ds-feat-eng', name: 'Feature Engineering', tech: 'One-Hot, Scaling, PCA, Imputation', docsUrl: '/technical-hub' },
          { id: 'ds-scikit', name: 'Scikit-Learn ML Core', tech: 'Train/Test Split, Pipelines, K-Fold', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-ds-2', title: 'Checkpoint - Supervised ML Classifier', desc: 'Build customer churn predictor using Random Forests & XGBoost with 92%+ ROC-AUC' },
          { id: 'cp-ds-3', title: 'Checkpoint - Real Estate Regression Model', desc: 'Train regularized Ridge/Lasso regression pipeline with automated feature selection' },
        ],
        note: 'Feature engineering and data quality consistently beat raw model hyperparameter complexity.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'ds-unsupervised', name: 'Unsupervised Learning', tech: 'K-Means, DBSCAN, t-SNE', docsUrl: '/technical-hub' },
          { id: 'ds-eval', name: 'Model Evaluation Metrics', tech: 'Precision/Recall, F1, Confusion Matrix', docsUrl: '/technical-hub' },
          { id: 'ds-deploy', name: 'Streamlit & FastAPI Deploy', tech: 'Model Serialization (Pickle/ONNX)', docsUrl: '/developer-tools/nodejs' },
        ],
        checkpoints: [
          { id: 'cp-ds-4', title: 'Checkpoint - Interactive ML Web App', desc: 'Deploy live Streamlit web application serving trained scikit-learn models for real-time predictions' },
        ],
        note: 'Always evaluate models using precision/recall trade-offs when dealing with imbalanced real-world datasets.',
      },
    ],
  },

  'AI/ML Engineer': {
    title: 'AI/ML Engineer',
    icon: '🤖',
    category: 'Artificial Intelligence & Deep Learning',
    targetAudience: 'Target audience is engineers wanting to build generative AI, LLM systems, computer vision models, and deep neural networks.',
    description: 'Learn PyTorch, Neural Networks, Computer Vision (CNNs), NLP Transformers, Large Language Models (LLMs), LangChain, RAG, and Vector DBs.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'ai-python', name: 'Python & PyTorch Core', tech: 'Tensors, Autograd, CUDA', docsUrl: '/technical-hub' },
          { id: 'ai-nn', name: 'Neural Networks Basics', tech: 'Perceptrons, Activations, Backprop', docsUrl: '/technical-hub' },
          { id: 'ai-opt', name: 'Optimization & Losses', tech: 'SGD, AdamW, Cross-Entropy, MSE', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-ai-1', title: 'Checkpoint - Neural Net From Scratch', desc: 'Implement multi-layer perceptron with manual forward and backward passes using NumPy' },
        ],
        note: 'PyTorch is the industry-standard deep learning framework. Master torch.Tensor memory layouts and GPU device transfers.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'ai-cv', name: 'Computer Vision (CNNs)', tech: 'ResNet, Convolutions, OpenCV', docsUrl: '/technical-hub' },
          { id: 'ai-nlp', name: 'NLP & Transformers', tech: 'Self-Attention, BERT, Hugging Face', docsUrl: '/technical-hub' },
          { id: 'ai-fine-tuning', name: 'Model Fine-Tuning & LoRA', tech: 'PEFT, LoRA, QLoRA', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-ai-2', title: 'Checkpoint - Vision Classifier', desc: 'Train and fine-tune ResNet-50 on medical imaging dataset with data augmentation' },
          { id: 'cp-ai-3', title: 'Checkpoint - Custom LLM Fine-Tune', desc: 'Fine-tune an open-source Llama / Mistral model on domain-specific conversational data' },
        ],
        note: 'Self-Attention mechanism is the foundational breakthrough behind modern Transformer architectures and LLMs.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'ai-rag', name: 'RAG & Vector Databases', tech: 'Embeddings, Pinecone, ChromaDB', docsUrl: '/technical-hub' },
          { id: 'ai-langchain', name: 'LangChain & AI Agents', tech: 'Chains, Memory, Tool Calling', docsUrl: '/technical-hub' },
          { id: 'ai-fastapi', name: 'ML Serving & Quantization', tech: 'FastAPI, vLLM, ONNX, Docker', docsUrl: '/developer-tools/docker' },
        ],
        checkpoints: [
          { id: 'cp-ai-4', title: 'Checkpoint - Autonomous RAG Agent', desc: 'Build PDF knowledge assistant with semantic vector retrieval, reranking, and citation generation' },
        ],
        note: 'Retrieval Augmented Generation (RAG) and Vector search are essential production skills for modern Generative AI engineering.',
      },
    ],
  },

  'Cybersecurity Engineer': {
    title: 'Cybersecurity Engineer',
    icon: '🛡️',
    category: 'Security Operations & Ethical Hacking',
    targetAudience: 'Target audience is students aiming for roles in Cyber Defense, Penetration Testing, SOC Analysis, and Security Engineering.',
    description: 'Master networking protocols, Linux security, cryptography, OWASP web application security, ethical hacking, and SIEM analysis.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'sec-net', name: 'Computer Networking', tech: 'TCP/IP, OSI Model, Subnets, DNS', docsUrl: '/technical-hub?category=Computer%20Fundamentals' },
          { id: 'sec-linux', name: 'Linux Security & Bash', tech: 'Permissions, sudo, systemd, SSH', docsUrl: '/developer-tools/linux' },
          { id: 'sec-crypto', name: 'Cryptography & PKI', tech: 'AES, RSA, TLS Handshake, Hashing', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-sec-1', title: 'Checkpoint - Wireshark Packet Analysis', desc: 'Capture and inspect network traffic to identify unencrypted credentials and DNS anomalies' },
          { id: 'cp-sec-2', title: 'Checkpoint - Linux Hardening Protocol', desc: 'Implement CIS Benchmark security controls, firewall rules (UFW), and SSH key hardening' },
        ],
        note: 'Deep networking knowledge is non-negotiable. Learn how packets move across switches, routers, and firewalls.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'sec-owasp', name: 'OWASP Top 10 Web Vulnerabilities', tech: 'SQLi, XSS, CSRF, SSRF, Auth Bypass', docsUrl: '/technical-hub' },
          { id: 'sec-pentest', name: 'Penetration Testing Tools', tech: 'Nmap, Burp Suite, Metasploit', docsUrl: '/technical-hub' },
          { id: 'sec-auth', name: 'Identity & Access Mgmt', tech: 'OAuth 2.0, SAML, RBAC, MFA', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-sec-3', title: 'Checkpoint - OWASP Lab Exploitation', desc: 'Demonstrate automated detection and manual exploitation of SQL Injection and XSS attacks' },
          { id: 'cp-sec-4', title: 'Checkpoint - Port Scanning & Audit', desc: 'Perform full vulnerability scan using Nmap scripts and compile remediation report' },
        ],
        note: 'Always practice ethical hacking only on authorized test environments (TryHackMe, HackTheBox, DVWA).',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'sec-siem', name: 'SOC & SIEM Operations', tech: 'Splunk, ELK, Log Analysis', docsUrl: '/technical-hub' },
          { id: 'sec-incident', name: 'Incident Response & Forensics', tech: 'Memory Dumps, Malware Analysis', docsUrl: '/technical-hub' },
          { id: 'sec-cloud', name: 'Cloud Security & Compliance', tech: 'AWS IAM, GuardDuty, Zero Trust', docsUrl: '/developer-tools/docker' },
        ],
        checkpoints: [
          { id: 'cp-sec-5', title: 'Checkpoint - Threat Hunting SIEM Dashboard', desc: 'Configure Splunk / Elastic SIEM alerts for brute-force logins and privilege escalation' },
        ],
        note: 'Understand the Zero Trust security philosophy: "Never trust, always verify every access request."',
      },
    ],
  },

  'Cloud Engineer': {
    title: 'Cloud Engineer',
    icon: '☁️',
    category: 'Cloud Infrastructure & Architecture',
    targetAudience: 'Target audience is students wanting to architect, deploy, and manage secure and scalable cloud infrastructure on AWS, Azure, or GCP.',
    description: 'Learn cloud compute, VPC networking, storage services, Infrastructure as Code (Terraform), serverless functions, and auto-scaling.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'cld-foundations', name: 'Cloud Fundamentals', tech: 'IaaS, PaaS, SaaS, Availability Zones', docsUrl: '/technical-hub' },
          { id: 'cld-linux', name: 'Linux & Shell Scripting', tech: 'Bash, SSH Keys, Cron, Processes', docsUrl: '/developer-tools/linux' },
          { id: 'cld-net', name: 'Cloud Networking (VPC)', tech: 'Subnets, Route Tables, NAT Gateways', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-cld-1', title: 'Checkpoint - Secure VPC Architecture', desc: 'Design dual-AZ VPC with public and private subnets, security groups, and Internet Gateway' },
        ],
        note: 'Isolate database instances and backend workloads inside private subnets with no direct public IP addresses.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'cld-compute', name: 'Compute & Auto-Scaling', tech: 'AWS EC2, Launch Templates, ALB', docsUrl: '/technical-hub' },
          { id: 'cld-storage', name: 'Storage & Databases', tech: 'S3 Buckets, RDS, DynamoDB', docsUrl: '/developer-tools/mongodb' },
          { id: 'cld-iam', name: 'IAM & Security Policies', tech: 'Roles, Least Privilege, MFA', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-cld-2', title: 'Checkpoint - High-Availability Web Cluster', desc: 'Deploy Auto-Scaling Group behind an Application Load Balancer with multi-AZ health checks' },
          { id: 'cp-cld-3', title: 'Checkpoint - Secure S3 Data Lake', desc: 'Configure encrypted S3 storage with bucket policies, lifecycle transitions, and CDN' },
        ],
        note: 'Always adhere to the Principle of Least Privilege when drafting IAM JSON permission policies.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'cld-iac', name: 'Infrastructure as Code (IaC)', tech: 'Terraform, HCL Syntax, State Files', docsUrl: '/technical-hub' },
          { id: 'cld-serverless', name: 'Serverless Compute', tech: 'AWS Lambda, API Gateway, EventBridge', docsUrl: '/developer-tools/nodejs' },
          { id: 'cld-mon', name: 'Monitoring & Observability', tech: 'CloudWatch, Cost Explorer, Alerts', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-cld-4', title: 'Checkpoint - Terraform Automated Cloud', desc: 'Provision entire enterprise multi-tier infrastructure using modularized Terraform code' },
          { id: 'cp-cld-5', title: 'Checkpoint - Serverless Event Pipeline', desc: 'Build event-driven image processing pipeline triggered by S3 uploads with Lambda' },
        ],
        note: 'Treat cloud infrastructure as code. Store Terraform state files in remote encrypted backends with locking.',
      },
    ],
  },

  'DevOps Engineer': {
    title: 'DevOps Engineer',
    icon: '♾️',
    category: 'CI/CD, Automation & Reliability',
    targetAudience: 'Target audience is students aiming to bridge software development and IT operations through automated delivery pipelines.',
    description: 'Master Docker containerization, CI/CD pipelines, Kubernetes orchestration, Infrastructure as Code, and Prometheus/Grafana monitoring.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'dev-linux', name: 'Linux System Administration', tech: 'Systemd, Cron, Bash Automation', docsUrl: '/developer-tools/linux' },
          { id: 'dev-git', name: 'Git & Trunk-Based Dev', tech: 'Semantic Versioning, Branch Strategy', docsUrl: '/developer-tools/git' },
          { id: 'dev-docker', name: 'Docker & Containerization', tech: 'Multi-Stage Dockerfiles, Images', docsUrl: '/developer-tools/docker' },
        ],
        checkpoints: [
          { id: 'cp-dev-1', title: 'Checkpoint - Multi-Stage Container', desc: 'Containerize full-stack application reducing image size from 1.2GB down to under 80MB' },
        ],
        note: 'Use Alpine or Distroless base images and never run container processes as root in production.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'dev-cicd', name: 'CI/CD Automation Pipelines', tech: 'GitHub Actions, GitLab CI, Jenkins', docsUrl: '/developer-tools/git' },
          { id: 'dev-k8s', name: 'Kubernetes Orchestration', tech: 'Pods, Deployments, Services, Ingress', docsUrl: '/developer-tools/docker' },
          { id: 'dev-helm', name: 'Helm & Package Mgmt', tech: 'Helm Charts, Values Templating', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-dev-2', title: 'Checkpoint - Automated CI/CD Pipeline', desc: 'Build GitHub Actions pipeline with automated linting, unit tests, security scans, and Docker push' },
          { id: 'cp-dev-3', title: 'Checkpoint - K8s Multi-Pod Cluster', desc: 'Deploy rolling update application cluster with horizontal pod autoscaling (HPA) and ConfigMaps' },
        ],
        note: 'Automate testing, container vulnerability scanning, and linting on every single pull request.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'dev-iac', name: 'Terraform & Ansible', tech: 'Declarative Config, Idempotency', docsUrl: '/technical-hub' },
          { id: 'dev-prom', name: 'Prometheus & Grafana', tech: 'Metrics, PromQL, Alertmanager', docsUrl: '/technical-hub' },
          { id: 'dev-logs', name: 'Logging & Tracing', tech: 'ELK Stack, OpenTelemetry, Jaeger', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-dev-4', title: 'Checkpoint - Production SRE Dashboard', desc: 'Configure real-time Grafana dashboard monitoring CPU, memory, request latencies, and 5xx error rates' },
        ],
        note: 'Establish the 4 Golden Signals of SRE: Latency, Traffic, Errors, and Saturation.',
      },
    ],
  },

  'Mobile App Developer': {
    title: 'Mobile App Developer',
    icon: '📱',
    category: 'Cross-Platform & Native Mobile Engineering',
    targetAudience: 'Target audience is students wanting to develop smooth, engaging iOS and Android applications.',
    description: 'Learn React Native / Flutter, mobile UI layouts, device hardware APIs, state management, offline database storage, and app publishing.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'mob-js-ts', name: 'JavaScript & TypeScript', tech: 'Types, ES6+, Async Patterns', docsUrl: '/technical-hub?category=Web%20Development' },
          { id: 'mob-core', name: 'React Native / Flutter Core', tech: 'View, Flexbox, Widget Trees', docsUrl: '/developer-tools/react' },
          { id: 'mob-nav', name: 'Mobile Navigation', tech: 'Stack, Tabs, Drawer Navigation', docsUrl: '/developer-tools/react' },
        ],
        checkpoints: [
          { id: 'cp-mob-1', title: 'Checkpoint - Multi-Screen UI Layout', desc: 'Build responsive mobile application with smooth tab bar navigation and custom splash screen' },
        ],
        note: 'React Native uses CSS Flexbox with column as the default flex-direction.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'mob-state', name: 'Mobile State Management', tech: 'Redux Toolkit, Zustand, Context', docsUrl: '/developer-tools/react' },
          { id: 'mob-device-api', name: 'Device Hardware APIs', tech: 'Camera, Geolocation, Storage, Haptics', docsUrl: '/technical-hub' },
          { id: 'mob-offline', name: 'Offline Storage & DBs', tech: 'AsyncStorage, SQLite, WatermelonDB', docsUrl: '/developer-tools/mongodb' },
        ],
        checkpoints: [
          { id: 'cp-mob-2', title: 'Checkpoint - Location & Camera App', desc: 'Build photo journaling mobile app capturing GPS coordinates and storing photos locally' },
          { id: 'cp-mob-3', title: 'Checkpoint - Offline-First Mobile Sync', desc: 'Implement local SQLite database that queues mutations and syncs when internet reconnects' },
        ],
        note: 'Design mobile apps with offline-first mentalities to ensure resilience in low-connectivity areas.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'mob-notifications', name: 'Push Notifications', tech: 'FCM, Apple APNs, Background Tasks', docsUrl: '/technical-hub' },
          { id: 'mob-perf', name: 'App Performance & 60fps', tech: 'FlatList Optimization, Hermes Engine', docsUrl: '/technical-hub' },
          { id: 'mob-release', name: 'App Store & Play Store', tech: 'Signing, EAS Build, Fastlane', docsUrl: '/technical-hub' },
        ],
        checkpoints: [
          { id: 'cp-mob-4', title: 'Checkpoint - Published Mobile App', desc: 'Generate signed release Android APK / iOS build bundle optimized for store submission' },
        ],
        note: 'Always use FlatList with getItemLayout and memoized renderItem for smooth infinite scrolling lists.',
      },
    ],
  },

  'UI/UX Designer': {
    title: 'UI/UX Designer',
    icon: '🎨',
    category: 'Product Design & User Experience',
    targetAudience: 'Target audience is designers and engineers wanting to craft intuitive, accessible, and delightful digital user interfaces.',
    description: 'Master Figma, design tokens, visual hierarchy, user research, wireframing, interactive prototyping, and developer handoff specs.',
    rows: [
      {
        rowNumber: 1,
        topics: [
          { id: 'ui-principles', name: 'Design Principles & Gestalt', tech: 'Proximity, Contrast, Alignment, Scale', docsUrl: '/developer-tools/figma' },
          { id: 'ui-typography', name: 'Typography & Color Theory', tech: 'Type Scales, 60-30-10 Rule, Contrast', docsUrl: '/developer-tools/figma' },
          { id: 'ui-figma-core', name: 'Figma Auto-Layout & Vectors', tech: 'Constraints, Frames, Pen Tool', docsUrl: '/developer-tools/figma' },
        ],
        checkpoints: [
          { id: 'cp-ui-1', title: 'Checkpoint - Low-Fidelity Wireframes', desc: 'Create user journey flows and skeletal low-fi wireframes for multi-step onboarding' },
          { id: 'cp-ui-2', title: 'Checkpoint - Reusable Figma UI Kit', desc: 'Design master component library with buttons, form inputs, badges, and modal popups' },
        ],
        note: 'Figma Auto-Layout mirrors CSS Flexbox. Mastering auto-layout makes developer handoff seamless.',
      },
      {
        rowNumber: 2,
        topics: [
          { id: 'ui-systems', name: 'Design Systems & Tokens', tech: 'Design Variables, Semantic Spacing', docsUrl: '/developer-tools/figma' },
          { id: 'ui-prototyping', name: 'Interactive Prototyping', tech: 'Smart Animate, Micro-Interactions', docsUrl: '/developer-tools/figma' },
          { id: 'ui-research', name: 'User Research & Personas', tech: 'User Interviews, Empathy Mapping', docsUrl: '/developer-tools/figma' },
        ],
        checkpoints: [
          { id: 'cp-ui-3', title: 'Checkpoint - High-Fidelity Prototype', desc: 'Build an interactive clickable prototype with micro-animations and realistic transition states' },
          { id: 'cp-ui-4', title: 'Checkpoint - Usability Testing Report', desc: 'Conduct 5 user testing sessions, synthesize friction points, and iterate on UI design' },
        ],
        note: 'Micro-interactions and subtle feedback loops significantly improve user engagement and retention.',
      },
      {
        rowNumber: 3,
        topics: [
          { id: 'ui-a11y', name: 'Accessibility (WCAG 2.1)', tech: 'Contrast Ratios, Screen Readers', docsUrl: '/developer-tools/figma' },
          { id: 'ui-handoff', name: 'Developer Handoff Specs', tech: 'Design Tokens, CSS Export, Redlines', docsUrl: '/developer-tools/figma' },
          { id: 'ui-portfolio', name: 'Case Study Storytelling', desc: 'Problem, Research, Iteration, Impact', docsUrl: '/developer-tools/figma' },
        ],
        checkpoints: [
          { id: 'cp-ui-5', title: 'Checkpoint - Complete UX Case Study', desc: 'Publish an end-to-end design case study portfolio demonstrating problem-to-solution impact' },
        ],
        note: 'Always ensure minimum 4.5:1 text-to-background contrast ratio to meet WCAG AA compliance.',
      },
    ],
  },
};
