// AI Chat Controller for Career & Roadmap Advisor (Powered by Gemini 2.5 Flash)

const SYSTEM_PROMPT = `You are Antigravity AI, the elite AI Career, Skills & Roadmap Mentor for the "HUB LEARNING" Engineering Platform.
Your mission is to guide engineering students and aspiring developers step-by-step to master technical skills, bridge skill gaps, build capstone portfolios, and achieve job readiness.

You have deep knowledge of the 11 Engineering Career Tracks available on the platform:
1. Software Developer: Algorithmic Problem Solving, C++/Java/Python, DSA (Arrays, Stacks, Trees, Graphs, DP), OS (Processes, Threads, Sockets), DBMS (PostgreSQL, Indexing), Low-Level System Design.
2. Web Developer: Semantic HTML5, CSS3/Flexbox/Grid, ES6+ JavaScript, Tailwind CSS, React.js (Hooks, Context, Zustand), Vite, Next.js, SEO & Web Vitals.
3. Full Stack Developer: Frontend React/Tailwind, Backend Node.js/Express, REST & GraphQL, Databases (PostgreSQL, MongoDB, Prisma), Docker containerization, AWS/Render deployments.
4. Data Analyst: Excel (Pivot tables, VLOOKUP, Power Query), SQL (Aggregations, Window Functions, CTEs), Power BI & Tableau, Python (Pandas, NumPy, Matplotlib, Seaborn), Business Storytelling.
5. Data Scientist: Advanced Linear Algebra, Multivariable Calculus, Probability & Statistics, Machine Learning (Scikit-Learn, XGBoost), Deep Learning (PyTorch/TensorFlow, CNNs, RNNs), MLOps.
6. AI/ML Engineer: PyTorch, Hugging Face Transformers, Large Language Models (LLMs), RAG (LangChain, LlamaIndex), Vector Databases (Pinecone, ChromaDB), Model Fine-tuning (LoRA, QLoRA), MLflow.
7. Cybersecurity Engineer: Network Fundamentals (TCP/IP, Wireshark), Linux Systems, Ethical Hacking & Pentesting (Kali Linux, Burp Suite), SIEM (Splunk), Cryptography, OWASP Top 10.
8. Cloud Engineer: Linux Administration, Networking (VPC, CIDR, Subnets), Cloud Providers (AWS/Azure/GCP), Infrastructure as Code (Terraform), Containers & Orchestration (Docker, Kubernetes).
9. DevOps Engineer: Version Control & Branching, CI/CD Pipelines (GitHub Actions), Docker, Kubernetes (Deployments, Services, Helm), Monitoring (Prometheus & Grafana), Site Reliability Engineering.
10. Mobile App Developer: Dart & Flutter, React Native, Cross-Platform Architecture, State Management (Riverpod, Redux), Native Device APIs, iOS App Store & Google Play Store publishing.
11. UI/UX Designer: User Research & Personas, Information Architecture, Wireframing & Prototyping (Figma), Visual Design & Typography, Design Systems & Component Tokens, Usability Testing.

Guidelines:
- Keep answers crisp, structured, student-friendly, and actionable with clear markdown bullet points and bold highlights.
- Suggest specific learning milestones, study orders, and real-world project deliverables.
- When asked what to learn first, provide a concrete chronological stage breakdown (Beginner -> Intermediate -> Advanced).
- Provide coding tips, architecture patterns, and interview strategies when relevant.`;

// Intelligent fallback generator when API key is not yet provided or network is unreachable
const generateFallbackResponse = (message, currentCareer, studentProfile) => {
  const msgLower = (message || '').toLowerCase();
  const career = currentCareer || 'Software Developer';

  if (msgLower.includes('start') || msgLower.includes('begin') || msgLower.includes('first') || msgLower.includes('roadmap') || msgLower.includes('learn')) {
    return `### 🚀 Recommended Roadmap Order for **${career}**

Here is your optimal step-by-step learning progression:

1. **Stage 1: Core Fundamentals (Weeks 1-4)**
   - Master syntax, programming foundations, and command-line version control (*Git & GitHub*).
   - *Deliverable:* Build 3 interactive console utilities or static portfolio pages.

2. **Stage 2: Core Engineering & Frameworks (Weeks 5-8)**
   - Dive into the primary tech stack for **${career}** (e.g., React, Node.js, Python, or Cloud tools).
   - Understand component state lifecycles, REST APIs, and asynchronous operations.
   - *Deliverable:* Complete a full CRUD application with database integration.

3. **Stage 3: Advanced Architecture & Systems (Weeks 9-12)**
   - Deep dive into databases, testing, performance optimization, and CI/CD pipelines.
   - *Deliverable:* Publish a production-ready Capstone Project on GitHub with live deployment.

4. **Stage 4: Placement & Interview Prep (Weeks 13-16)**
   - Master technical screening questions, DSA problems, and STAR behavioral frameworks in the Career Hub.

💡 *Tip: Check out the visual roadmap flowchart in the Career Hub to mark your completed milestones!*

---
*(Note: Running in offline guidance mode. Add your \`GEMINI_API_KEY\` in \`backend/.env\` to activate live Gemini 2.5 Flash reasoning.)*`;
  }

  if (msgLower.includes('project') || msgLower.includes('capstone') || msgLower.includes('portfolio') || msgLower.includes('build')) {
    return `### 📁 Top Recommended Projects for **${career}**

Employers evaluate demonstrable hands-on capability. Here are 3 portfolio projects that stand out to tech recruiters:

- 🟢 **Beginner Project: Responsive Interactive Utility**
  - Focus: Clean UI layout, state handling, and external API consumption.
  - *Tech:* HTML5/CSS3/React or Core Python scripts.

- 🟡 **Intermediate Project: Full-Stack SaaS Application**
  - Focus: User Authentication (JWT), Relational Database schema (PostgreSQL), and RESTful CRUD endpoints.
  - *Tech:* React, Node.js/Express, Docker, and PostgreSQL.

- 🔴 **Advanced Project: Scalable Enterprise Capstone**
  - Focus: Rate limiting, Redis caching, CI/CD automated deployment, and unit test coverage.
  - *Tech:* Microservices / Cloud deployment on AWS or Render.

💡 *Explore the Project Hub for detailed architecture guides and source code structures!*

---
*(Note: Running in offline guidance mode. Add your \`GEMINI_API_KEY\` in \`backend/.env\` to activate live Gemini 2.5 Flash reasoning.)*`;
  }

  if (msgLower.includes('interview') || msgLower.includes('job') || msgLower.includes('resume') || msgLower.includes('salary')) {
    return `### 💼 Interview & Career Strategy for **${career}**

To successfully clear technical screenings:

1. **Technical Whiteboarding:** Practice the curated Top 50 coding problems in our **Coding Hub**.
2. **Core CS Fundamentals:** Be prepared to explain Operating Systems (Threads/Concurrency), Databases (ACID, Indexing), and Networking (HTTP/TCP).
3. **STAR Method for Behavioral Rounds:** Structure answers around Situation, Task, Action, and Measurable Result.
4. **ATS Resume Optimization:** Include concrete metrics (e.g. *"Optimized API latency by 35% using Redis caching"*).

💡 *Check the Interview Prep tab in the Career Hub for role-specific interview checklists and questions!*

---
*(Note: Running in offline guidance mode. Add your \`GEMINI_API_KEY\` in \`backend/.env\` to activate live Gemini 2.5 Flash reasoning.)*`;
  }

  return `### 🤖 Antigravity Career Advisor (${career})

Hello! I'm here to help you navigate your engineering journey:

- **Roadmap Guidance:** Ask *"What should I learn next for ${career}?"*
- **Skill Gap Diagnosis:** Ask *"How do I prepare for technical interviews?"*
- **Project Ideas:** Ask *"Suggest capstone projects for my resume"*
- **Career Transitions:** Ask *"How do I switch from Web Dev to AI/ML Engineer?"*

Feel free to ask any question about your curriculum, technical concepts, or industry milestones!

---
*(Note: Running in offline guidance mode. Add your \`GEMINI_API_KEY\` in \`backend/.env\` to activate live Gemini 2.5 Flash reasoning.)*`;
};

// @desc    Handle AI Career Chat Message using Gemini 2.5 Flash
// @route   POST /api/ai/chat
// @access  Public / Optional Auth
const chatWithAi = async (req, res) => {
  try {
    const { message, conversationHistory = [], currentCareer = 'Software Developer', studentProfile = {} } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // If API key is not configured, return high-quality offline rule-based response
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
      const fallbackReply = generateFallbackResponse(message, currentCareer, studentProfile);
      return res.status(200).json({
        success: true,
        reply: fallbackReply,
        model: `${model} (offline mode)`,
        isLive: false,
        notice: 'Add GEMINI_API_KEY in backend/.env to enable live Gemini 2.5 Flash AI.',
      });
    }

    // Prepare contents array for Gemini 2.5 Flash API
    const formattedContents = [];

    // Add conversation history if provided
    if (Array.isArray(conversationHistory)) {
      conversationHistory.slice(-8).forEach((item) => {
        if (item.text && item.sender) {
          formattedContents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      });
    }

    // Add current user prompt with student context
    const contextPrompt = `Student Context:
- Target Career Track: ${currentCareer}
- Education: ${studentProfile.education || 'B.Tech'} in ${studentProfile.branch || 'CSE'} (${studentProfile.year || '3rd Year'})
- Current Verified Skills: ${(studentProfile.currentSkills || []).join(', ') || 'HTML, CSS, JavaScript, Git'}
- Career Goal: ${studentProfile.careerGoal || 'Software Engineer at Top Tech Company'}

User Question: ${message.trim()}`;

    formattedContents.push({
      role: 'user',
      parts: [{ text: contextPrompt }],
    });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1200,
      },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('[Gemini API Warning]:', data?.error?.message || response.statusText);
      // Fallback to offline engine if API returns error (e.g. invalid key or rate limit)
      const fallbackReply = generateFallbackResponse(message, currentCareer, studentProfile);
      return res.status(200).json({
        success: true,
        reply: `${fallbackReply}\n\n*(Gemini API Note: ${data?.error?.message || 'API request issue, fallback response provided'})*`,
        model: `${model} (fallback)`,
        isLive: false,
      });
    }

    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      generateFallbackResponse(message, currentCareer, studentProfile);

    return res.status(200).json({
      success: true,
      reply: replyText,
      model: model,
      isLive: true,
    });
  } catch (error) {
    console.error('[AI Chat Error]:', error);
    const fallbackReply = generateFallbackResponse(req.body?.message || '', req.body?.currentCareer, req.body?.studentProfile);
    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      model: 'gemini-2.5-flash (offline fallback)',
      isLive: false,
    });
  }
};

module.exports = {
  chatWithAi,
};
