export const developerToolCategories = [
  'All Tools',
  'Code & Editor',
  'Version Control',
  'Backend & Runtime',
  'Database & Caching',
  'Design & API',
  'Cloud & Deployment',
  'AI Assistants',
  'DevOps & Systems',
];

export const developerTools = [
  // 1. VS Code
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    category: 'Source Code Editor',
    group: 'Code & Editor',
    description: 'Extensible, high-performance source code editor built on Electron, Monaco Editor, and the Language Server Protocol (LSP).',
    brandColor: '#007acc',
    accentGradient: 'linear-gradient(135deg, #007acc 0%, #0098ff 100%)',
    iconText: '💻',
    websiteUrl: 'https://code.visualstudio.com',
    details: {
      whatIsIt: 'Visual Studio Code (VS Code) is an open-source, extensible source code editor developed by Microsoft. It combines the speed of a lightweight text editor with native debugging, Git version control, syntax highlighting, and an ecosystem of tens of thousands of extensions.',
      underTheHood: `Architectural Breakdown of VS Code Internals:
1. Multi-Process Architecture (Electron Base):
   - Main Process: Manages window lifecycles, file system access, and native OS integrations.
   - Renderer Process: Runs Chromium to render the UI tree (DOM/CSS) using the Monaco Editor core.
   - Extension Host Process: Runs all installed plugins (Prettier, ESLint, Python) in a separate Node.js process to ensure extensions NEVER freeze or lag the main UI thread.
2. Language Server Protocol (LSP):
   - Decouples language intelligence (IntelliSense, type checking, autocomplete, go-to-definition) from the editor.
   - VS Code sends JSON-RPC messages over standard I/O to dedicated background language servers (TypeScript tsserver, Pyright, gopls, rust-analyzer).
3. Text Buffer Piece Table:
   - Uses a dual-buffer piece tree data structure to store file edits with $O(\\log N)$ insert/delete performance, allowing instant opening of 500MB+ log files with minimal RAM overhead.`,
      coreRulesAndWorkflows: `Core Configuration & Workflow Rules:
• Workspace Settings: Configure project-specific rules in '.vscode/settings.json' and commit them so the entire engineering team shares identical formatting.
• Multi-Cursor Editing: Use Ctrl+D (Cmd+D) for sequential word selection and Alt+Click for arbitrary multi-line insertion points.
• Command Palette (Ctrl+Shift+P / Cmd+Shift+P): The central nerve center to trigger all commands without memorizing dozens of complex shortcuts.
• Recommended Extensions in '.vscode/extensions.json': Enforces standard linters and formatters across repository contributors automatically.`,
      keyFeatures: [
        'Language Server Protocol (LSP) providing sub-millisecond type hints and autocomplete.',
        'Isolated Extension Host process preventing third-party plugins from locking the UI.',
        'Integrated Debugger with conditional breakpoints, call stack inspection, and variable watches.',
        'Dev Containers & Remote-SSH enabling editing directly inside Docker containers or remote cloud VMs.',
      ],
      realWorldCaseStudy: 'Over 74% of professional software engineers (Stack Overflow Developer Survey) use VS Code as their primary IDE across companies like Meta, Google, Microsoft, and Amazon.',
      commonPitfalls: [
        'Installing dozens of unverified, heavy extensions that degrade startup time and drain battery.',
        'Committing private API keys and credentials inside workspace launch.json debug configurations.',
        'Confusing User Settings (global across all projects) with Workspace Settings (local to current repository).',
      ],
      codeWalkthrough: {
        title: 'Production .vscode/settings.json Configuration',
        code: `// .vscode/settings.json - Industry Standard Formatting & Linting
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.tabSize": 2,
  "editor.renderWhitespace": "selection",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}`,
        explanation: 'Enforces automatic Prettier formatting on save, ESLint auto-fixing, import organization, bracket colorization, and trailing whitespace cleanup.',
      },
      studentTip: 'Install "Error Lens" to display compiler and linting errors inline on the exact line of code, and "GitLens" to see commit blame history line-by-line.',
      interviewQuestions: [
        {
          question: 'What is the Language Server Protocol (LSP) and why was its introduction revolutionary for code editors?',
          hint: 'Think about M languages multiplied by N editors.',
          answer: 'Before LSP, supporting M languages in N editors required M × N custom plugins. LSP standardized language features over a JSON-RPC protocol, reducing the matrix to M + N: one language server serves VS Code, Neovim, Sublime, and Helix simultaneously.',
        },
        {
          question: 'Why does VS Code run extensions in an isolated Extension Host process rather than the renderer process?',
          hint: 'What happens if an extension has an infinite loop or heavy CPU calculation?',
          answer: 'By isolating extensions in a separate Node.js process, a rogue extension performing heavy CPU work or hitting an infinite loop cannot block the Chromium UI renderer, keeping typing and editor scrolling smooth.',
        },
      ],
    },
  },

  // 2. Terminal & Shell
  {
    id: 'terminal',
    name: 'Terminal & Shell (Bash / Zsh / PowerShell)',
    category: 'CLI Environment',
    group: 'Code & Editor',
    description: 'Direct command-line interface to execute operating system syscalls, manage pipelines, and automate build workflows.',
    brandColor: '#22c55e',
    accentGradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    iconText: '🖥️',
    websiteUrl: 'https://www.gnu.org/software/bash/',
    details: {
      whatIsIt: 'A Terminal is a text-based interface used to interact directly with the operating system kernel. A Shell (such as Bash, Zsh, or PowerShell) is a command language interpreter that executes commands read from standard input devices or from scripts.',
      underTheHood: `Standard Streams & UNIX Pipeline Architecture:
1. File Descriptors & Standard Streams:
   - When a process starts, the OS kernel attaches three standard streams:
     • stdin (FD 0): Standard Input stream.
     • stdout (FD 1): Standard Output stream.
     • stderr (FD 2): Standard Error stream.
2. UNIX Pipelines (|):
   - The pipe operator connects the stdout buffer of Process A directly into the stdin buffer of Process B via an OS kernel ring buffer without writing intermediate files to disk.
3. Process Forking & Exec:
   - When you type a command (e.g. 'ls -la'), the shell calls 'fork()' to clone itself as a child process, followed by 'execve()' to replace the child address space with the target binary executable.`,
      coreRulesAndWorkflows: `CLI Conventions & Shell Rules:
• Stream Redirection: '>' overwrites file, '>>' appends to file, '2>&1' redirects stderr into stdout.
• Exit Status Codes: An exit code of '0' represents success; any non-zero integer ($1-255$) indicates a failure or error.
• Chaining Operators: '&&' executes the second command ONLY if the first succeeds; '||' executes if the first fails; ';' executes unconditionally.
• Environment Variables: Prepend commands with temporary variables (e.g. 'PORT=5000 node server.js') or persist them in '~/.bashrc' / '~/.zshrc'.`,
      keyFeatures: [
        'Composing complex data processing pipelines using UNIX pipes (|), grep, awk, and sed.',
        'Automated background process management using &, nohup, and systemd services.',
        'File permission manipulation via chmod (octal bitmasks) and chown.',
        'Scriptable automation for CI/CD pipelines, Docker container entrypoints, and server provisioning.',
      ],
      realWorldCaseStudy: 'Every cloud server (AWS EC2, Google Cloud Compute, Kubernetes nodes) is managed headlessly via SSH terminals; DevOps engineers deploy and debug clusters exclusively through CLI commands.',
      commonPitfalls: [
        'Running recursive deletion commands (rm -rf) with unquoted variable paths (e.g. rm -rf $DIR/ where DIR is empty, deleting the root directory!).',
        'Confusing stdout (1) with stderr (2) and wondering why error logs are not redirected to output files.',
        'Forgetting that environment variables defined in child subshells do not propagate back up to parent shells without "export" or "source".',
      ],
      codeWalkthrough: {
        title: 'Essential DevOps Shell Commands & Text Processing',
        code: `# 1. Process Inspection: Find process holding port 5000 and kill it
lsof -i :5000 | awk 'NR>1 {print $2}' | xargs kill -9

# 2. Text Stream Processing: Count unique 404 errors in access log
grep " 404 " /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -nr | head -n 10

# 3. Secure File Permissions (Owner: Read/Write/Execute, Others: Read)
chmod 755 deploy.sh
chmod 600 id_rsa_private_key

# 4. Background Execution with logging
nohup node server.js > server.log 2>&1 &
echo "Process started with PID: $!"`,
        explanation: 'Demonstrates awk text column filtering, stream pipelines, octal permission hardening (chmod 600 for keys), and nohup background execution.',
      },
      studentTip: 'Use "Ctrl+R" to reverse-search your command history instantly, and create shell aliases (e.g., alias gs="git status") in your ~/.zshrc or ~/.bashrc to save hours of typing.',
      interviewQuestions: [
        {
          question: 'What is the difference between hard links and symbolic (soft) links in Linux filesystems?',
          hint: 'Think about inode numbers and original file deletion.',
          answer: 'A hard link points directly to the same underlying filesystem inode as the original file; deleting the original leaves the file data intact until all hard links are removed. A symbolic link is a separate file containing the text path to the target; if the original is deleted, the symlink becomes broken.',
        },
        {
          question: 'What does "2>&1" mean in shell redirection?',
          hint: 'File descriptor 2 and file descriptor 1.',
          answer: 'It redirects file descriptor 2 (stderr) into file descriptor 1 (stdout), ensuring both standard output and error messages are merged into the same stream or output file.',
        },
      ],
    },
  },

  // 3. Git
  {
    id: 'git',
    name: 'Git Version Control',
    category: 'Distributed VCS',
    group: 'Version Control',
    description: 'Cryptographic Directed Acyclic Graph (DAG) system tracking code snapshots, branches, merges, and commit histories.',
    brandColor: '#f05032',
    accentGradient: 'linear-gradient(135deg, #f05032 0%, #ea580c 100%)',
    iconText: '🌿',
    websiteUrl: 'https://git-scm.com',
    details: {
      whatIsIt: 'Git is a distributed version control system designed to handle everything from small to massive enterprise projects with speed and data integrity. Every Git clone is a full-fledged repository with complete history and snapshot tracking capabilities.',
      underTheHood: `The 4 Fundamental Git Object Types & DAG Internals:
1. Object Database ('.git/objects/'):
   - Git stores data as an immutable content-addressable key-value store indexed by 40-character SHA-1 (or SHA-256) hashes:
     • Blob: Stores pure raw file contents (no metadata or filename).
     • Tree: Represents directories; maps filenames to blob hashes and permissions.
     • Commit: Stores top-level tree hash, parent commit hash(es), author, timestamp, and commit message.
     • Annotated Tag: Permanent labeled pointer to a specific commit object.
2. The Directed Acyclic Graph (DAG):
   - Commits form a DAG where each commit points backward to its parent commit(s).
3. The Three Trees (States):
   - Working Directory (actual disk files) $\\to$ Staging Area / Index (prepared snapshot) $\\to$ Repository History (.git database).`,
      coreRulesAndWorkflows: `Git Governing Rules & Best Practices:
• Atomic Commits: Each commit should encapsulate one single logical change or bug fix.
• Never Rebase Public Main: Rebasing rewrites commit SHA hashes; rebasing a shared branch breaks collaborator histories.
• Feature Branch Workflow: Never code directly on 'main'. Always create a branch ('feature/user-auth'), commit, push, and open a Pull Request.
• .gitignore Rules: Never commit 'node_modules/', '.env' secrets, build output ('dist/'), or IDE files ('.vscode/').`,
      keyFeatures: [
        'Immutable snapshot history with cryptographically verified SHA-1/SHA-256 hashes.',
        'Instant $O(1)$ branch creation and switching by moving a 41-byte pointer file (HEAD).',
        'Interactive Rebasing (git rebase -i) for squashing and cleaning up commit history.',
        'Binary search debugging with "git bisect" to find the exact commit that introduced a bug in $O(\\log N)$ steps.',
      ],
      realWorldCaseStudy: 'The Linux kernel repository contains over 1,200,000 commits managed by 20,000+ contributors across the globe with zero data corruption.',
      commonPitfalls: [
        'Committing sensitive API keys, database passwords, or .env files into Git history.',
        'Using "git push --force" on shared branches, overwriting teammates’ committed work.',
        'Accidentally resolving merge conflicts incorrectly by accepting incoming changes without testing.',
      ],
      codeWalkthrough: {
        title: 'Advanced Git Feature Branch & Cleanup Workflow',
        code: `# 1. Create and switch to a new feature branch
git checkout -b feature/auth-jwt

# 2. Stage only specific changes interactively
git add -p

# 3. Commit with semantic conventional message
git commit -m "feat(auth): implement bcrypt password hashing and jwt token signing"

# 4. Pull latest main and rebase cleanly
git checkout main
git pull origin main
git checkout feature/auth-jwt
git rebase main

# 5. Interactive squash of messy local WIP commits before PR
git rebase -i HEAD~3

# 6. Push to remote and open Pull Request
git push -u origin feature/auth-jwt`,
        explanation: 'Demonstrates interactive staging, semantic conventional commits, rebasing on top of main, squashing commits, and pushing feature branches.',
      },
      studentTip: 'If you ever make a mistake or lose a commit in Git, run "git reflog". Git keeps a log of every HEAD pointer change for 30 days, allowing you to recover any lost commit.',
      interviewQuestions: [
        {
          question: 'What is the difference between "git merge" and "git rebase"?',
          hint: 'Preserving non-linear history vs creating a linear commit history.',
          answer: '"git merge" creates a new merge commit combining two branch histories, preserving the exact non-linear timeline. "git rebase" replays your branch commits on top of the target branch, creating a clean linear history by rewriting commit SHA hashes.',
        },
        {
          question: 'What is the Staging Area (Index) in Git and why is it useful?',
          hint: 'The buffer between working directory and commit history.',
          answer: 'The Staging Area is an intermediate layer that allows developers to selectively organize, review, and format atomic commits. You can edit 5 files on disk but stage and commit only 2 of them.',
        },
      ],
    },
  },

  // 4. GitHub
  {
    id: 'github',
    name: 'GitHub & CI/CD Actions',
    category: 'VCS Cloud Platform',
    group: 'Version Control',
    description: 'Enterprise code collaboration platform featuring Pull Requests, automated CI/CD workflows, and issue tracking.',
    brandColor: '#24292e',
    accentGradient: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
    iconText: '🐙',
    websiteUrl: 'https://github.com',
    details: {
      whatIsIt: 'GitHub is the world’s largest cloud hosting platform for Git repositories. It provides collaborative tools including Pull Requests, Code Review, GitHub Actions CI/CD, project boards, and security dependency alerts.',
      underTheHood: `GitHub Actions & Webhook Event Lifecycle:
1. Event Triggers: Actions listen to Git events (push, pull_request, release, schedule cron).
2. Runner Micro-VMs:
   - When an event fires, GitHub orchestrates an ephemeral Ubuntu, Windows, or macOS virtual machine.
   - The runner pulls the repository, sets up runtime environments (Node.js, Python), runs test suites, builds production bundles, and deploys artifacts.
3. Secret Encryption (NaCl):
   - GitHub Secrets (API keys, deployment tokens) are encrypted using public-key cryptography (libsodium/NaCl) before storage, decrypted only within the ephemeral runner runtime.`,
      coreRulesAndWorkflows: `Collaboration & Branch Protection Rules:
• Branch Protection: Require at least 1-2 approved peer reviews and passing CI checks before merging into 'main'.
• Pull Request Descriptions: Include Problem Statement, Solution Architecture, Screenshots, and Test Checklist.
• Issue Linking: Use keywords like "Closes #42" in commit messages or PR descriptions to automatically close tracked issues upon merge.
• Semantic Release: Tag releases with SemVer (e.g. v1.2.0) triggering automated build deployments.`,
      keyFeatures: [
        'GitHub Actions: Automated build, test, lint, and deployment pipelines.',
        'Pull Request Code Reviews with line-by-line comments and multi-file diffs.',
        'Dependabot: Automated security vulnerability scanning and dependency update PRs.',
        'GitHub Pages: Free static website hosting for portfolios and documentation.',
      ],
      realWorldCaseStudy: 'Over 100 million developers and 90% of Fortune 100 companies build and deploy software on GitHub, managing billions of automated CI/CD runs every month.',
      commonPitfalls: [
        'Pushing raw unencrypted credentials or .env secrets to public repositories.',
        'Merging Pull Requests without running automated unit tests or lint checks.',
        'Neglecting README documentation, making projects unusable for recruiters and collaborators.',
      ],
      codeWalkthrough: {
        title: 'Production GitHub Actions CI/CD Workflow (.github/workflows/ci.yml)',
        code: `# .github/workflows/ci.yml - Automated Testing & Build Pipeline
name: Continuous Integration

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter
        run: npm run lint

      - name: Execute Automated Test Suite
        run: npm test

      - name: Build Production Bundle
        run: npm run build`,
        explanation: 'Automates checkout, dependency caching, linting, unit testing, and production builds on every push and PR.',
      },
      studentTip: 'Apply for the "GitHub Student Developer Pack" to get free access to GitHub Copilot, free domain names, cloud credits on DigitalOcean/AWS, and premium development tools.',
      interviewQuestions: [
        {
          question: 'What is Continuous Integration (CI) and why is it essential in modern software engineering teams?',
          hint: 'Automating builds and tests whenever code is merged.',
          answer: 'Continuous Integration is the practice of automatically building and running automated test suites whenever developers push code changes. It detects bugs and integration regressions within minutes rather than weeks before production deployment.',
        },
        {
          question: 'What is the purpose of Branch Protection Rules on GitHub?',
          hint: 'Protecting main from direct pushes and broken builds.',
          answer: 'Branch protection rules enforce that no code can be pushed directly to production branches. It requires passing CI tests, up-to-date branch status, and approved peer reviews before merging.',
        },
      ],
    },
  },

  // 5. Docker
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'Containerization',
    group: 'DevOps & Systems',
    description: 'Linux container engine packaging application code, runtime, system libraries, and configs into lightweight, immutable images.',
    brandColor: '#2496ed',
    accentGradient: 'linear-gradient(135deg, #2496ed 0%, #0284c7 100%)',
    iconText: '🐳',
    websiteUrl: 'https://www.docker.com',
    details: {
      whatIsIt: 'Docker is an open-source platform that automates the deployment of applications inside lightweight, portable, self-sufficient containers. Containers share the host OS kernel while providing isolated process spaces, file systems, and network stacks.',
      underTheHood: `Containerization Kernel Primitives & UnionFS Architecture:
1. Linux Kernel Namespaces (Isolation):
   - pid (Process IDs): Container sees only its own process tree (PID 1).
   - net (Networking): Isolated virtual ethernet pairs and IP routing tables.
   - mnt (Mount points): Isolated file system hierarchy.
   - ipc, uts, user: Inter-process communication and hostname isolation.
2. Control Groups (cgroups - Resource Limits):
   - Restricts and meters CPU percentage, RAM allocation, and disk I/O bandwidth per container.
3. UnionFS & Layer Caching:
   - Docker images consist of stacked read-only immutable layers.
   - Copy-on-Write (CoW): A thin read-write layer is placed on top when the container boots.`,
      coreRulesAndWorkflows: `Docker Best Practices:
• Multi-Stage Builds: Use heavy compilers in builder stages and copy only final compiled binaries into tiny Alpine or Distroless images.
• Order Matters in Dockerfile: Place rarely changed layers (package.json, npm install) BEFORE frequently changed layers (source code) to maximize layer caching.
• Non-Root Security: Never run container processes as the default root user ('USER node').
• Docker Compose: Define multi-container stacks (Node backend + MongoDB + Redis) in 'docker-compose.yml'.`,
      keyFeatures: [
        'Guarantees "Runs on my machine == Runs in production" environment consistency.',
        'Sub-second boot times and minimal RAM footprint compared to heavy Virtual Machines.',
        'Docker Compose for one-command local orchestration of multi-tier applications.',
        'Immutable, portable image distribution via Docker Hub and AWS ECR registries.',
      ],
      realWorldCaseStudy: 'Netflix and Uber run hundreds of thousands of microservice containers concurrently, dynamically scaling container instances up and down in response to real-time traffic spikes.',
      commonPitfalls: [
        'Creating bloated 1GB+ container images by including development dependencies and build tools in production images.',
        'Storing database files directly in the ephemeral container filesystem instead of persistent named Docker Volumes.',
        'Running containers as root, exposing host machines to container breakout exploits.',
      ],
      codeWalkthrough: {
        title: 'Production Multi-Stage Dockerfile & Docker Compose',
        code: `# Dockerfile - Multi-Stage Production Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Lean Production Runtime (<100MB)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
        explanation: 'Builds assets in stage 1, then creates an isolated, non-root Alpine production image containing only production dependencies and compiled code.',
      },
      studentTip: 'Always add a .dockerignore file containing "node_modules", ".git", and ".env" to prevent copying gigabytes of local junk into the Docker build context.',
      interviewQuestions: [
        {
          question: 'What is the fundamental architectural difference between a Docker Container and a Virtual Machine (VM)?',
          hint: 'Kernel sharing vs Guest Operating System.',
          answer: 'A VM runs a complete guest operating system on top of a hypervisor with its own virtual kernel and virtual hardware, costing gigabytes of RAM and minutes to boot. A Docker container shares the host OS kernel and uses kernel namespaces and cgroups for process isolation, booting in milliseconds with negligible overhead.',
        },
        {
          question: 'What happens to data written inside a container when the container is stopped and removed?',
          hint: 'Ephemeral container layer vs Docker Volumes.',
          answer: 'Data written to the writable container layer is ephemeral and permanently lost when the container is removed. To persist data across container lifecycles (e.g. database data), you must mount Docker Volumes or host bind mounts.',
        },
      ],
    },
  },

  // 6. Postman
  {
    id: 'postman',
    name: 'Postman API Platform',
    category: 'API Development & Testing',
    group: 'Design & API',
    description: 'Complete API platform to design, mock, test, document, and debug REST, GraphQL, gRPC, and WebSocket endpoints.',
    brandColor: '#ff6c37',
    accentGradient: 'linear-gradient(135deg, #ff6c37 0%, #ea580c 100%)',
    iconText: '🚀',
    websiteUrl: 'https://www.postman.com',
    details: {
      whatIsIt: 'Postman is an API platform used by over 30 million developers to construct, test, and document HTTP requests. It provides visual request builders, automated JavaScript test assertions, environment variables, mock servers, and API monitors.',
      underTheHood: `HTTP Client & Sandbox Execution Lifecycle:
1. Pre-Request Script: Executes JavaScript in a V8 sandbox to compute HMAC signatures, timestamps, or dynamic query params before the request leaves your machine.
2. Network Engine: Dispatches the HTTP/HTTPS request, handles TLS certificates, follows redirects, and captures raw request/response headers and body bytes.
3. Test Script Execution: Evaluates JavaScript Chai assertions (pm.test, pm.expect) on response status, latency, and JSON schema payloads.
4. Newman CLI Runner: Executes entire Postman collections headlessly inside CI/CD terminal pipelines.`,
      coreRulesAndWorkflows: `API Testing Conventions:
• Environment Management: Store base URLs ('{{baseUrl}}') and JWT tokens ('{{authToken}}') in Postman Environments (Local, Staging, Production).
• Automatic Token Capture: Use test scripts on Login endpoints to automatically parse response tokens into environment variables.
• Status Code Assertions: Always assert expected HTTP response codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found).
• Collections Organization: Group endpoints logically by domain resource (Users, Auth, Products, Orders).`,
      keyFeatures: [
        'Visual request builder for GET, POST, PUT, PATCH, DELETE with headers, query params, and JSON payloads.',
        'Automated test assertions using JavaScript (pm.test, pm.expect, tv4 JSON schema validation).',
        'Dynamic environment and global variables with automated variable chaining.',
        'Newman CLI for running automated API regression suites inside GitHub Actions and CI/CD pipelines.',
      ],
      realWorldCaseStudy: 'Stripe, Twilio, and Shopify publish official Postman Collections so third-party developers can test API integrations with zero setup time.',
      commonPitfalls: [
        'Hardcoding environment-specific URLs (http://localhost:5000) inside requests instead of using {{baseUrl}} variables.',
        'Manually copy-pasting auth tokens for every request instead of writing an automatic token extraction script.',
        'Exporting and committing Postman environment files containing sensitive production API keys to public repositories.',
      ],
      codeWalkthrough: {
        title: 'Automated JWT Token Extraction & Assertion Script',
        code: `// Postman Tests Tab on POST /api/v1/auth/login
pm.test("Status code is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Response contains valid JWT access token", function () {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("token");
  pm.expect(jsonData.success).to.eql(true);

  // Automatically save token to environment variable for subsequent requests
  pm.environment.set("authToken", jsonData.token);
  console.log("Auth token stored in environment:", jsonData.token.substring(0, 15) + "...");
});

pm.test("Response time is acceptable (< 300ms)", function () {
  pm.expect(pm.response.responseTime).to.be.below(300);
});`,
        explanation: 'Tests HTTP status, response structure, response latency, and automatically binds the returned JWT to {{authToken}} for all subsequent requests.',
      },
      studentTip: 'In the Authorization tab of your Postman Collection, set Type to "Bearer Token" and Value to "{{authToken}}". All requests in the folder will inherit auth automatically!',
      interviewQuestions: [
        {
          question: 'What is the purpose of Newman in an API development lifecycle?',
          hint: 'Command-line runner for Postman collections.',
          answer: 'Newman is Postman’s command-line collection runner. It allows engineering teams to execute Postman test suites headlessly within CI/CD pipelines (like GitHub Actions or Jenkins) to prevent deploying broken APIs.',
        },
        {
          question: 'Why should API test suites assert both positive (200/201) and negative (400/401/404) scenarios?',
          hint: 'Testing security gates, validation, and error handling.',
          answer: 'Negative testing verifies that the API properly rejects invalid input formats, enforces authentication barriers, respects permission boundaries, and returns standardized error payloads without crashing the server.',
        },
      ],
    },
  },

  // 7. Figma
  {
    id: 'figma',
    name: 'Figma & Design Systems',
    category: 'UI/UX Design Platform',
    group: 'Design & API',
    description: 'Collaborative vector design and prototyping platform with Auto Layout, Design Tokens, and Dev Mode code inspection.',
    brandColor: '#f24e1e',
    accentGradient: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
    iconText: '🎨',
    websiteUrl: 'https://www.figma.com',
    details: {
      whatIsIt: 'Figma is the cloud-native, collaborative vector graphics editor and prototyping tool used worldwide by product designers and frontend developers. It allows real-time UI design, interactive prototyping, and design system token management.',
      underTheHood: `WebAssembly, WebGL & Real-Time CRDT Collaboration:
1. C++ Compiled to WebAssembly (Wasm):
   - Figma’s core rendering engine is written in C++ and compiled to WebAssembly, running high-performance 60fps canvas operations in the browser.
2. WebGL Hardware Acceleration:
   - Renders vector nodes, gradients, and shadows directly through the GPU using custom WebGL shaders rather than slow DOM nodes.
3. Conflict-Free Replicated Data Types (CRDTs):
   - Multi-user real-time collaboration uses operational transforms and CRDT algorithms over WebSockets to synchronize canvas modifications without server merge locks.`,
      coreRulesAndWorkflows: `Design-to-Code Conventions:
• Auto Layout (Flexbox equivalent): Use Auto Layout with vertical/horizontal direction, padding, and gap to ensure designs translate 1-to-1 to CSS Flexbox.
• Design Tokens: Define centralized Color Styles, Typography scales, and Spacing units that map directly to CSS custom properties (--accent, --bg-primary).
• Components & Variants: Build atomic components (Buttons, Inputs, Cards) with boolean, text, and variant props matching React component props.
• Dev Mode: Toggle Dev Mode (Shift+D) to inspect exact CSS values, padding measurements, and copy code snippets.`,
      keyFeatures: [
        'Auto Layout matching CSS Flexbox specifications (gap, padding, space-between).',
        'Design Tokens and Component Libraries supporting unified enterprise Design Systems.',
        'Dev Mode: CSS box-model inspection, typography values, and asset export (SVG, PNG, WebP).',
        'Interactive Prototyping with animated micro-interactions and smart animate transitions.',
      ],
      realWorldCaseStudy: 'Airbnb, Uber, and Microsoft manage centralized Design Systems in Figma, keeping thousands of engineers and designers synchronized on unified UI component libraries.',
      commonPitfalls: [
        'Designing with absolute positioning instead of Auto Layout, making responsive frontend translation impossible.',
        'Hardcoding random ad-hoc colors and hex codes instead of using established Design Token styles.',
        'Exporting heavy raster PNG assets instead of scalable, lightweight SVG vector graphics for icons.',
      ],
      codeWalkthrough: {
        title: 'Translating Figma Design Tokens to CSS Custom Properties',
        code: `/* design-tokens.css - Sourced directly from Figma Variables */
:root {
  /* Color Palette Tokens */
  --color-primary-50:  #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb; /* Brand Blue */
  --color-primary-700: #1d4ed8;

  /* Typography Scale */
  --font-family-base: 'Inter', -apple-system, sans-serif;
  --font-size-sm:   0.875rem; /* 14px */
  --font-size-base: 1.000rem; /* 16px */
  --font-size-xl:   1.250rem; /* 20px */
  --font-size-2xl:  1.500rem; /* 24px */

  /* Spacing Grid (8pt system) */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.50rem; /* 8px */
  --space-4: 1.00rem; /* 16px */
  --space-6: 1.50rem; /* 24px */
}`,
        explanation: 'Shows how Figma Design Tokens are translated directly into CSS custom properties using an 8-point spatial grid system.',
      },
      studentTip: 'Hold the "Alt" (or "Option") key in Figma while hovering between two UI elements to see the exact pixel distance and margin spacing between them.',
      interviewQuestions: [
        {
          question: 'How does Figma’s Auto Layout feature correlate to CSS layout mechanics?',
          hint: 'Flexbox direction, gap, and alignment.',
          answer: 'Figma Auto Layout is a direct visual implementation of CSS Flexbox: direction corresponds to flex-direction, item spacing corresponds to gap, padding maps to CSS padding, and resizing rules (Fill container, Hug contents, Fixed) map to flex-grow, flex-shrink, and width/height.',
        },
        {
          question: 'What is the role of Design Tokens in a modern software engineering workflow?',
          hint: 'Single source of truth for visual styles.',
          answer: 'Design Tokens are platform-agnostic key-value pairs representing design decisions (colors, typography, spacing). They synchronize designers and developers, allowing style changes in Figma to automatically update web, iOS, and Android applications via automated build pipelines.',
        },
      ],
    },
  },

  // 8. Node.js
  {
    id: 'nodejs',
    name: 'Node.js Runtime',
    category: 'Backend JavaScript Engine',
    group: 'Backend & Runtime',
    description: 'Asynchronous event-driven JavaScript runtime built on Chrome V8 and libuv for building scalable network servers.',
    brandColor: '#339933',
    accentGradient: 'linear-gradient(135deg, #339933 0%, #16a34a 100%)',
    iconText: '🟢',
    websiteUrl: 'https://nodejs.org',
    details: {
      whatIsIt: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Chrome’s V8 engine, it employs a non-blocking, event-driven I/O model that makes it lightweight and efficient for data-intensive real-time applications.',
      underTheHood: `V8 Engine, libuv & Non-Blocking Event Loop Architecture:
1. V8 Engine:
   - Compiles JavaScript directly into native machine code using Ignition (interpreter) and TurboFan (optimizing compiler).
2. libuv C Library (The Event Loop):
   - Bridges JS with OS asynchronous I/O (epoll on Linux, kqueue on macOS, IOCP on Windows).
   - Manages a 4-thread Worker Pool for expensive blocking operations (file system access, DNS lookup, crypto password hashing).
3. The 6 Event Loop Phases:
   - Timers (setTimeout/setInterval) $\\to$ Pending Callbacks $\\to$ Idle/Prepare $\\to$ Poll (retrieves new I/O events) $\\to$ Check (setImmediate) $\\to$ Close Callbacks.
   - Microtask Queue (process.nextTick, Promise.then) executes between every phase.`,
      coreRulesAndWorkflows: `Backend Architecture Rules:
• Never Block the Event Loop: Never execute synchronous CPU-heavy computations (synchronous crypto, giant loops) on the main thread; offload to Worker Threads or microservices.
• Always Handle Errors: Implement global error-handling middleware in Express; uncaught rejections crash the Node.js process.
• Graceful Shutdown: Listen to 'SIGTERM' and 'SIGINT' signals to close database connections and finish active HTTP requests before exiting.
• Cluster Mode / PM2: Run multiple Node.js worker processes across all available CPU cores in production.`,
      keyFeatures: [
        'Single-threaded event loop handling tens of thousands of concurrent I/O connections.',
        'libuv thread pool handling non-blocking file system operations and cryptography.',
        'Built-in Stream API for processing multi-gigabyte files with minimal RAM footprint.',
        'Powers world-class web frameworks including Express.js, NestJS, Next.js, and Fastify.',
      ],
      realWorldCaseStudy: 'PayPal transitioned their backend from Java to Node.js, doubling requests handled per second while decreasing average response latency by 35%.',
      commonPitfalls: [
        'Blocking the single main thread with heavy synchronous CPU loops, making the entire server unresponsive for all users.',
        'Memory leaks caused by global array accumulation or uncleared event listeners in long-running processes.',
        'Failing to handle asynchronous Promise rejections, triggering unhandledRejection crashes.',
      ],
      codeWalkthrough: {
        title: 'Production Express.js Server with Graceful Shutdown',
        code: `// server.js - Production Node.js Server
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

const server = app.listen(process.env.PORT || 5000, async () => {
  console.log(\`Server running on port \${process.env.PORT || 5000}\`);
  await mongoose.connect(process.env.MONGODB_URI);
});

// Graceful Shutdown on SIGTERM (Docker/Kubernetes termination)
process.on('SIGTERM', async () => {
  console.log('SIGTERM received: Closing HTTP server & Database...');
  server.close(async () => {
    await mongoose.connection.close();
    console.log('Process terminated gracefully.');
    process.exit(0);
  });
});`,
        explanation: 'Demonstrates Express server setup, health check endpoints, and graceful SIGTERM shutdown hooks for cloud containers.',
      },
      studentTip: 'Use "node --watch server.js" in modern Node.js (v18+) to automatically restart your server on file changes without needing to install nodemon!',
      interviewQuestions: [
        {
          question: 'How does Node.js handle concurrent I/O requests when JavaScript is single-threaded?',
          hint: 'Delegating I/O to libuv and operating system kernel non-blocking mechanisms.',
          answer: 'Node.js delegates network and file I/O operations to libuv and the underlying OS kernel (epoll/kqueue). The OS handles I/O asynchronously in the background. When ready, the kernel notifies libuv, which pushes the callback onto the Event Loop for execution without blocking the main JS thread.',
        },
        {
          question: 'What is the priority difference between process.nextTick() and setImmediate()?',
          hint: 'Microtask queue vs Check phase.',
          answer: 'process.nextTick() runs immediately after the current operation before the Event Loop continues to the next phase (Microtask queue). setImmediate() runs in the Check phase of the Event Loop during the next iteration.',
        },
      ],
    },
  },

  // 9. npm & npx
  {
    id: 'npm',
    name: 'npm & npx Package Ecosystem',
    category: 'Package Manager',
    group: 'Backend & Runtime',
    description: 'Node Package Manager managing dependency graphs, semantic versioning, lockfiles, and on-demand script execution.',
    brandColor: '#cb3837',
    accentGradient: 'linear-gradient(135deg, #cb3837 0%, #b91c1c 100%)',
    iconText: '📦',
    websiteUrl: 'https://www.npmjs.com',
    details: {
      whatIsIt: 'npm is the default package manager for the JavaScript runtime environment Node.js. It consists of a command-line client (npm), a cloud registry of over 2 million reusable packages, and npx, a package runner that executes CLI binaries on demand without global installation.',
      underTheHood: `Dependency Resolution Tree & Lockfile Mechanics:
1. Semantic Versioning (SemVer: MAJOR.MINOR.PATCH):
   - ^1.2.3 (Caret): Allows backwards-compatible updates (minor and patch: >=1.2.3 <2.0.0).
   - ~1.2.3 (Tilde): Allows only patch updates (>=1.2.3 <1.3.0).
   - 1.2.3 (Exact): Strict pinning.
2. package-lock.json:
   - Stores the complete, deterministic dependency graph with exact cryptographic integrity hashes (SHA-512) and resolved URLs to guarantee identical builds across every developer machine and CI/CD server.
3. npx Execution Cache:
   - Downloads temporary binaries (like create-vite or prisma) to an isolated temp cache, executes them, and deletes them without polluting global system paths.`,
      coreRulesAndWorkflows: `npm Workflow Rules:
• Use 'npm ci' in CI/CD: 'npm ci' bypasses dependency calculation and installs strictly from 'package-lock.json', providing 2-3x faster and 100% deterministic installs.
• Separate devDependencies: Use 'npm i -D' for build tools (vite, eslint, prettier) so production container images remain minimal.
• Security Audits: Regularly run 'npm audit' to identify and patch known CVE vulnerabilities in nested dependencies.
• Keep Dependencies Updated: Use 'npm outdated' to evaluate pending library updates.`,
      keyFeatures: [
        'Deterministic package locking via package-lock.json with SHA-512 subresource integrity.',
        'npm scripts (npm run dev, npm run build) for unified workflow execution.',
        'npx runner for executing packages on-demand without global machine installations.',
        'Automated vulnerability scanning and security patching via npm audit.',
      ],
      realWorldCaseStudy: 'The npm registry serves over 100 billion package downloads per month, anchoring the entire global JavaScript and TypeScript software ecosystem.',
      commonPitfalls: [
        'Committing node_modules/ into Git repositories (often adding 500MB+ of binary files!).',
        'Deleting package-lock.json when resolving conflicts instead of regenerating it properly with npm install.',
        'Using "npm install" on CI servers instead of "npm ci", leading to unpredictable dependency drift and build failures.',
      ],
      codeWalkthrough: {
        title: 'Essential npm CLI Commands for Production Engineering',
        code: `# 1. Initialize a clean modern project
npm init -y

# 2. Install production dependencies
npm install express mongoose dotenv cors

# 3. Install development tools
npm install -D nodemon eslint prettier vitest

# 4. Deterministic clean install for CI/CD pipelines
npm ci --only=production

# 5. Security audit & auto-fix vulnerabilities
npm audit fix

# 6. Execute binary on the fly without installing globally
npx create-vite my-app --template react`,
        explanation: 'Covers dependency separation (-D), CI deterministic builds (npm ci), security audits, and running one-off CLI tools via npx.',
      },
      studentTip: 'Always commit "package-lock.json" to your Git repository! Without it, your teammates or deployment server might install slightly newer versions of dependencies that break your code.',
      interviewQuestions: [
        {
          question: 'What is the critical difference between "npm install" and "npm ci"?',
          hint: 'Overwriting lockfile vs strictly reading lockfile.',
          answer: '"npm install" reads package.json, calculates dependencies, and can update package-lock.json if valid newer versions exist. "npm ci" requires a package-lock.json, deletes the existing node_modules folder, and installs exact pinned versions without modifying the lockfile, ensuring 100% reproducible builds.',
        },
        {
          question: 'What does the caret (^) and tilde (~) mean in package.json versioning?',
          hint: 'Minor updates vs Patch updates.',
          answer: 'The caret (^1.2.0) allows automatic updates to any compatible Minor and Patch versions (up to <2.0.0). The tilde (~1.2.0) allows automatic updates only to Patch versions (up to <1.3.0).',
        },
      ],
    },
  },

  // 10. Vite
  {
    id: 'vite',
    name: 'Vite Next-Gen Bundler',
    category: 'Build Tool & Bundler',
    group: 'Code & Editor',
    description: 'Lightning-fast frontend build tool leveraging native ES Modules (ESM) in development and Rollup for production bundles.',
    brandColor: '#646cff',
    accentGradient: 'linear-gradient(135deg, #646cff 0%, #bd34fe 100%)',
    iconText: '⚡',
    websiteUrl: 'https://vite.dev',
    details: {
      whatIsIt: 'Vite (French for "quick", pronounced /vit/) is a next-generation frontend development tool and module bundler created by Evan You. It delivers near-instant server starts and lightning-fast Hot Module Replacement (HMR) by serving source code over native browser ES Modules.',
      underTheHood: `Native ESM & Esbuild Pre-Bundling Architecture:
1. Development Mode (No Bundling):
   - Legacy bundlers (Webpack) bundle your entire application before starting the dev server ($O(N)$ wait time).
   - Vite transforms files on-demand as the browser requests them over native HTTP/2 ES Module imports ($<script type="module">), making dev server start time $O(1)$ constant time regardless of app size.
2. Esbuild Dependency Pre-Bundling:
   - Vite pre-bundles CommonJS and UMD dependencies using Esbuild (written in Go), which is 10-100x faster than traditional JavaScript-based bundlers.
3. Production Mode (Rollup / Rolldown):
   - Compiles and optimizes assets using Rollup/Rolldown with tree-shaking, code-splitting, CSS minification, and chunk preloading.`,
      coreRulesAndWorkflows: `Vite Configuration Rules:
• Environment Variables: Prepend client-side environment variables with 'VITE_' (e.g. 'VITE_API_URL') to expose them to 'import.meta.env'.
• Dynamic Imports for Code Splitting: Use 'React.lazy(() => import("./Page"))' to split heavy pages into independent on-demand JS chunks.
• Path Aliasing: Configure '@/' shortcuts in 'vite.config.js' for clean import statements.
• Proxy Configuration: Use the 'server.proxy' setting to route API calls during development without CORS issues.`,
      keyFeatures: [
        'Instant server start times by leveraging native browser ES modules.',
        'Sub-millisecond Hot Module Replacement (HMR) preserving component state during edits.',
        'Optimized production builds with aggressive tree-shaking and dynamic code-splitting.',
        'Out-of-the-box TypeScript, JSX, CSS Modules, and PostCSS support with zero configuration.',
      ],
      realWorldCaseStudy: 'Vite has become the standard build engine for React, Vue, Svelte, and SolidJS, replacing create-react-app across modern frontend engineering teams.',
      commonPitfalls: [
        'Attempting to access "process.env" in frontend code instead of Vite\'s standard "import.meta.env".',
        'Forgetting to prepend client environment variables with "VITE_", causing them to be undefined in production.',
        'Overloading the production bundle with heavy dependencies without dynamic code splitting.',
      ],
      codeWalkthrough: {
        title: 'Production vite.config.js with Path Aliases & Proxy',
        code: `// vite.config.js - Production Setup
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});`,
        explanation: 'Configures React plugin, path aliases (@/components), local API dev proxying, and vendor chunk separation for optimized browser caching.',
      },
      studentTip: 'To create a brand new React application with Vite, run "npm create vite@latest my-app -- --template react" in your terminal. It sets up a lightning-fast project in 10 seconds!',
      interviewQuestions: [
        {
          question: 'Why is Vite’s development server dramatically faster than Webpack?',
          hint: 'Serving unbundled native ES Modules vs bundling all files upfront.',
          answer: 'Webpack bundles the entire application dependency graph before launching the server. Vite serves source code as unbundled native ES Modules directly to the browser on-demand, and uses Go-based Esbuild to pre-bundle third-party modules 50x faster.',
        },
        {
          question: 'What is Hot Module Replacement (HMR) and how does Vite optimize it?',
          hint: 'Swapping edited files without full page reloads.',
          answer: 'HMR swaps an updated module in the running browser without performing a full page reload, preserving application state. Vite’s HMR operates over native ESM imports, meaning the time to update a module remains constant regardless of total application size.',
        },
      ],
    },
  },

  // 11. MongoDB
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose ODM',
    category: 'NoSQL Document Store',
    group: 'Database & Caching',
    description: 'Document database storing schema-flexible JSON/BSON records with B+ Tree indexing and aggregation pipelines.',
    brandColor: '#47a248',
    accentGradient: 'linear-gradient(135deg, #47a248 0%, #15803d 100%)',
    iconText: '🍃',
    websiteUrl: 'https://www.mongodb.com',
    details: {
      whatIsIt: 'MongoDB is a leading document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents. Paired with the Mongoose ODM for Node.js, it allows rapid schema design, data validation, and aggregation pipelines.',
      underTheHood: `WiredTiger Storage Engine & BSON Internals:
1. Binary JSON (BSON):
   - Stores documents in a binary-encoded format supporting typed integers, floating-points, dates, and ObjectIds (12-byte unique timestamps).
2. WiredTiger Engine:
   - In-Memory Cache: Keeps working sets in RAM to minimize physical disk I/O reads.
   - B+ Tree On-Disk Indexing: Maintains shallow, wide tree structures on disk for $O(\\log N)$ lookups.
   - Journaling (WAL): Appends write operations to sequential journal logs before committing to data files to prevent data loss on crashes.
3. Multi-Document ACID Transactions:
   - Uses snapshot isolation across replica set sessions to guarantee All-or-Nothing atomicity.`,
      coreRulesAndWorkflows: `Schema Modeling Guidelines:
• 1-to-Few: Embed child documents directly (e.g. User addresses array inside User document).
• 1-to-Many / Many-to-Many: Reference ObjectIds across collections to prevent hitting the 16MB single document limit.
• Indexing (ESR Rule): Create compound indexes following Equality $\\to$ Sort $\\to$ Range order.
• Query Execution Analysis: Always inspect slow queries using '.explain("executionStats")' to verify index usage.`,
      keyFeatures: [
        'Schemaless BSON flexibility allowing agile feature iterations without SQL migrations.',
        'High-speed B+ Tree compound, text, geospatial, and unique indexes.',
        'Aggregation Pipeline ($match, $group, $project, $lookup) for analytics and transformations.',
        'Multi-document ACID transactions with rollback capabilities.',
      ],
      realWorldCaseStudy: 'Forbes migrated to MongoDB, reducing content publishing times by 58% and scaling to millions of daily readers with zero downtime.',
      commonPitfalls: [
        'Allowing unbounded array growth inside documents, eventually crashing on the 16MB document size limit.',
        'Performing unindexed queries in production, causing 100% CPU spikes from full collection scans (COLLSCAN).',
        'Storing sensitive plaintext passwords instead of salted bcrypt hashes.',
      ],
      codeWalkthrough: {
        title: 'Mongoose Schema, Compound Index & Aggregation Pipeline',
        code: `// models/Order.js - Production Mongoose Model
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' },
    totalAmount: { type: Number, required: true, min: 0 },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Compound Index following ESR rule (Equality: status, Sort/Range: createdAt)
orderSchema.index({ status: 1, createdAt: -1 });

// Aggregation Pipeline: Calculate Total Revenue by Status
export async function getRevenueByStatus() {
  const Order = mongoose.model('Order', orderSchema);
  return await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: '$status', totalRevenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    { $sort: { totalRevenue: -1 } },
  ]);
}`,
        explanation: 'Demonstrates Mongoose schema validation, compound indexing, embedded item arrays, and an aggregation pipeline grouping revenue by order status.',
      },
      studentTip: 'Use MongoDB Compass (the official GUI desktop app) to visually inspect collections, view indexes, and build aggregation pipelines with real-time stage previews!',
      interviewQuestions: [
        {
          question: 'When should you choose Document Embedding versus Document Referencing in MongoDB?',
          hint: 'Think about data growth, document limits, and query access patterns.',
          answer: 'Embed when data is 1-to-few, bounded in size, and always read together with the parent document. Reference (using ObjectIds) when data has 1-to-many or unbounded growth (e.g. comments, logs) to prevent exceeding the 16MB document limit, or when data is queried independently.',
        },
        {
          question: 'What is the purpose of the MongoDB Aggregation Pipeline?',
          hint: 'Multi-stage data transformation and analytics.',
          answer: 'The Aggregation Pipeline processes documents through sequential stages ($match, $project, $group, $sort, $lookup). Each stage transforms the stream of documents, enabling complex filtering, joins, groupings, and mathematical calculations directly on the database engine.',
        },
      ],
    },
  },

  // 12. Redis
  {
    id: 'redis',
    name: 'Redis In-Memory Data Store',
    category: 'Caching & Key-Value Store',
    group: 'Database & Caching',
    description: 'Ultra-low latency in-memory data store used for caching, session management, rate limiting, and pub/sub message brokers.',
    brandColor: '#dc382d',
    accentGradient: 'linear-gradient(135deg, #dc382d 0%, #991b1b 100%)',
    iconText: '⚡',
    websiteUrl: 'https://redis.io',
    details: {
      whatIsIt: 'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, streaming engine, and message broker. By operating entirely in RAM, Redis delivers sub-millisecond response times for millions of operations per second.',
      underTheHood: `Single-Threaded In-Memory Architecture & Data Structures:
1. In-Memory Operation:
   - Data resides entirely in RAM, avoiding slow physical disk seeks and page cache overhead.
2. Single-Threaded Event Loop (Multiplexing):
   - Executes commands sequentially using an $O(1)$ event multiplexer (epoll/kqueue).
   - Eliminates thread context switches, mutex locking, and race conditions.
3. Native Data Structures:
   - Strings, Hashes, Lists (linked lists), Sets (hash tables), Sorted Sets (Skip Lists with $O(\\log N)$ ranking), Bitmaps, HyperLogLogs.
4. Persistence Options:
   - RDB (Redis Database): Point-in-time snapshot dumps to disk at specified intervals.
   - AOF (Append-Only File): Logs every write operation sequentially for maximum durability.`,
      coreRulesAndWorkflows: `Caching Patterns & Cache Invalidation:
• Cache-Aside Pattern: Application checks Redis first; if cache miss, query MongoDB/PostgreSQL, write result to Redis with TTL, and return.
• Time-To-Live (TTL): Always attach an expiration TTL ('EX 3600') to prevent stale data and unbounded RAM consumption.
• Cache Invalidation: Invalidate or update the cached key immediately whenever a database record is modified.
• Eviction Policies: Configure 'allkeys-lru' (Least Recently Used) to automatically evict old keys when RAM memory capacity is reached.`,
      keyFeatures: [
        'Sub-millisecond latency ($<1\\text{ms}$) across millions of operations per second.',
        'Rich native data structures: Hashes, Sets, Sorted Sets (Skip Lists), Streams.',
        'Built-in Key Expiration (TTL) and LRU/LFU memory eviction algorithms.',
        'Pub/Sub messaging and distributed locks (Redlock) for microservice coordination.',
      ],
      realWorldCaseStudy: 'Twitter (X) uses Redis clusters to store and serve millions of active user timelines directly from RAM in under 5 milliseconds.',
      commonPitfalls: [
        'Failing to set Time-To-Live (TTL) expiration on cache keys, eventually triggering Out-Of-Memory (OOM) crashes.',
        'Cache Stampede (Thundering Herd): When a popular key expires, thousands of concurrent requests hit the primary database at once.',
        'Using heavy $O(N)$ commands like "KEYS *" in production, blocking the single Redis thread.',
      ],
      codeWalkthrough: {
        title: 'Cache-Aside Pattern & Rate Limiting in Node.js with Redis',
        code: `// cacheService.js - Redis Cache-Aside Implementation
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
await redisClient.connect();

// Cache-Aside Wrapper
export async function getOrSetCache(key, ttlSeconds, fetchCallback) {
  // 1. Check Redis Cache
  const cachedData = await redisClient.get(key);
  if (cachedData) {
    return JSON.parse(cachedData); // Cache Hit!
  }

  // 2. Cache Miss: Fetch from primary database
  const freshData = await fetchCallback();

  // 3. Store in Redis with TTL expiration
  if (freshData) {
    await redisClient.set(key, JSON.stringify(freshData), { EX: ttlSeconds });
  }

  return freshData;
}

// API Rate Limiting (Max 100 requests per minute per IP)
export async function isRateLimited(ipAddress) {
  const key = \`rate_limit:\${ipAddress}\`;
  const requests = await redisClient.incr(key);
  if (requests === 1) {
    await redisClient.expire(key, 60); // 1 minute window
  }
  return requests > 100;
}`,
        explanation: 'Implements the Cache-Aside caching pattern with JSON serialization and an atomic IP rate-limiter using Redis INCR and EXPIRE.',
      },
      studentTip: 'Never run "KEYS *" in a production Redis instance because it scans every single key in memory synchronously. Always use "SCAN" for incremental cursor-based iterations!',
      interviewQuestions: [
        {
          question: 'What is a Cache Stampede (Thundering Herd problem) and how can it be mitigated?',
          hint: 'What happens when a hot cache key expires under heavy traffic?',
          answer: 'A Cache Stampede occurs when a high-traffic cache key expires, causing thousands of concurrent requests to experience a cache miss simultaneously and hammer the primary database. It is mitigated using distributed mutex locks, probabilistic early expiration (XFetch), or background cache refresh jobs.',
        },
        {
          question: 'Why is Redis single-threaded yet capable of handling millions of requests per second?',
          hint: 'RAM operations, no lock contention, and non-blocking I/O multiplexing.',
          answer: 'Redis operations execute entirely in RAM (nanosecond access), eliminating disk latency. Because it is single-threaded, there is zero thread context-switch overhead and no mutex locking contention. It uses OS I/O multiplexing (epoll/kqueue) to handle thousands of concurrent client connections.',
        },
      ],
    },
  },

  // 13. Browser DevTools
  {
    id: 'devtools',
    name: 'Browser DevTools & Profiling',
    category: 'Inspection & Performance',
    group: 'Code & Editor',
    description: 'Comprehensive built-in browser inspection suite to debug DOM, CSS box models, network waterfalls, and JavaScript CPU/memory profiles.',
    brandColor: '#4285f4',
    accentGradient: 'linear-gradient(135deg, #4285f4 0%, #2563eb 100%)',
    iconText: '🔍',
    websiteUrl: 'https://developer.chrome.com/docs/devtools/',
    details: {
      whatIsIt: 'Browser Developer Tools (Chrome DevTools, Firefox Developer Tools) is a set of web authoring and debugging tools built directly into modern web browsers. It provides deep visibility into the DOM tree, CSS cascade, network timing waterfalls, JavaScript breakpoints, memory heap snapshots, and Core Web Vitals.',
      underTheHood: `Chrome DevTools Protocol (CDP) & V8 Profiler Internals:
1. Chrome DevTools Protocol (CDP):
   - DevTools communicates with the browser kernel over a JSON-RPC WebSocket connection using CDP domains (DOM, Network, Page, Runtime, Profiler).
2. Elements & CSS Box Model Engine:
   - Inspects computed CSS rules, cascade specificity, flexbox/grid overlays, and layout reflow triggers.
3. Network Timing Waterfall:
   - Breaks down request lifecycle: Queuing $\\to$ DNS Lookup $\\to$ Initial Connection $\\to$ TLS Handshake $\\to$ TTFB (Time to First Byte) $\\to$ Content Download.
4. Memory Heap Profiler:
   - Takes sampling heap snapshots to trace retaining paths of detached DOM nodes and memory leaks.`,
      coreRulesAndWorkflows: `Professional Debugging Workflows:
• Console Mastery: Use 'console.table()' for tabular object data, 'console.time()' for execution benchmarking, and '$0' to reference the currently selected DOM node.
• Network Throttling: Test applications under "Fast 3G" or "Slow 3G" network throttling to experience realistic mobile loading speeds.
• DOM & Layout Inspection: Inspect box model margins, paddings, and flex layouts to fix alignment bugs.
• Lighthouse Audits: Audit Performance, Accessibility (a11y), Best Practices, and SEO metrics.`,
      keyFeatures: [
        'Elements Tab: Real-time live editing of HTML attributes and CSS rules with instant visual feedback.',
        'Network Tab: Request waterfalls, payload inspection, header auditing, and response mocking.',
        'Sources Tab: Interactive JavaScript debugging with step-over, step-into, and conditional breakpoints.',
        'Performance & Memory Tabs: CPU flame charts, heap snapshots, and FPS frame rate monitoring.',
      ],
      realWorldCaseStudy: 'Frontend teams use Chrome DevTools Performance Profiler to eliminate main-thread layout thrashing and achieve top Core Web Vitals scores for Google search rankings.',
      commonPitfalls: [
        'Debugging production build minified code without enabling Source Maps (.map files).',
        'Forgetting to check "Preserve Log" in the Network tab when debugging form submissions that redirect.',
        'Testing page performance with caching enabled instead of checking "Disable Cache".',
      ],
      codeWalkthrough: {
        title: 'High-Impact DevTools Console & Debugging Techniques',
        code: `// 1. Tabular data visualization
const users = [
  { id: 1, name: "Ayesha", role: "Admin", active: true },
  { id: 2, name: "Marcus", role: "Student", active: false },
];
console.table(users);

// 2. High-precision execution benchmarking
console.time("Array Transformation");
const result = Array.from({ length: 1000000 }, (_, i) => i * 2);
console.timeEnd("Array Transformation");

// 3. Conditional Breakpoint in Code
function processOrder(order) {
  if (order.totalAmount < 0) {
    debugger; // Pauses execution in DevTools Sources tab ONLY on invalid data
  }
  return order.totalAmount * 1.18;
}`,
        explanation: 'Demonstrates console.table formatting, microsecond timer benchmarking, and programmatic "debugger" breakpoints.',
      },
      studentTip: 'Press "Ctrl+Shift+P" (or "Cmd+Shift+P") inside Chrome DevTools to open the DevTools Command Menu: type "Capture full size screenshot" to take an instant full-page high-resolution screenshot!',
      interviewQuestions: [
        {
          question: 'What is Time to First Byte (TTFB) in the Network tab and what causes high TTFB?',
          hint: 'Time from sending the HTTP request to receiving the first byte of response.',
          answer: 'TTFB measures the duration from when the client sends the HTTP request to when the browser receives the first byte of response. High TTFB is caused by slow DNS resolution, server-side CPU processing latency, slow unindexed database queries, or network routing distance.',
        },
        {
          question: 'What is a Detached DOM Tree memory leak and how do you find it using DevTools?',
          hint: 'DOM node removed from page but referenced by JavaScript.',
          answer: 'A Detached DOM Tree occurs when a DOM node is removed from the visible page, but a JavaScript variable or event listener still retains a memory reference to it. It is diagnosed using the Memory tab Heap Snapshot by filtering for "Detached HTMLElement" instances.',
        },
      ],
    },
  },

  // 14. Linux & SysAdmin
  {
    id: 'linux',
    name: 'Linux & System Administration',
    category: 'Operating System & DevOps',
    group: 'DevOps & Systems',
    description: 'Enterprise Linux server administration, systemd service management, SSH tunneling, cron scheduling, and process isolation.',
    brandColor: '#fcc624',
    accentGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    iconText: '🐧',
    websiteUrl: 'https://www.kernel.org',
    details: {
      whatIsIt: 'Linux is the open-source Unix-like operating system kernel powering over 90% of global cloud servers, supercomputers, and Docker containers. Mastering Linux system administration is essential for deploying, monitoring, and securing production backend infrastructure.',
      underTheHood: `Linux Kernel Subsystems & Systemd Architecture:
1. Kernel Space vs User Space:
   - System Calls (Syscalls) allow user processes to request hardware services (read, write, socket, fork) across Ring 3 to Ring 0 boundary.
2. Systemd Init System (PID 1):
   - Initializes the system and manages background service daemons (.service unit files), automated restarts, dependency ordering, and centralized logging (journalctl).
3. The Virtual File System (VFS):
   - In UNIX/Linux, "Everything is a file" (hardware devices in /dev, process metrics in /proc, system configurations in /etc).
4. SSH Cryptography (Port 22):
   - Asymmetric public-key authentication (Ed25519/RSA) protecting remote cloud terminal sessions.`,
      coreRulesAndWorkflows: `Server Security & Administration Rules:
• Principle of Least Privilege: Never run daily tasks or web servers as the 'root' superuser; use 'sudo' with dedicated service accounts.
• SSH Key Authentication: Disable password-based SSH login ('PasswordAuthentication no' in /etc/ssh/sshd_config) and use Ed25519 public keys.
• Firewall Hardening: Configure UFW (Uncomplicated Firewall) to allow only essential ports (22 SSH, 80 HTTP, 443 HTTPS).
• Automated Backups: Schedule recurring database dumps and log rotations using 'cron' jobs.`,
      keyFeatures: [
        'Systemd service management with automated failure recovery and restart policies.',
        'Process monitoring and resource profiling using top, htop, ps, and kill.',
        'Network inspection and port binding analysis via ss, netstat, and curl.',
        'Automated task scheduling via crontab expressions.',
      ],
      realWorldCaseStudy: 'Every top cloud infrastructure provider (AWS, Google Cloud, Microsoft Azure) runs Linux at its core, orchestrating billions of virtual machines worldwide.',
      commonPitfalls: [
        'Leaving default SSH port 22 open with weak password authentication, vulnerable to brute-force bot attacks.',
        'Granting recursive 777 permissions (chmod -R 777), allowing any user or script to overwrite and execute critical system files.',
        'Failing to monitor disk usage (/var/log filling up 100% of disk space and freezing the OS).',
      ],
      codeWalkthrough: {
        title: 'Production systemd Service File (/etc/systemd/system/app.service)',
        code: `# /etc/systemd/system/hub-api.service - Production Systemd Daemon
[Unit]
Description=Hub Learning Backend API Service
After=network.target mongodb.service

[Service]
Type=simple
User=deployer
WorkingDirectory=/var/www/hub-api
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=5000

# Security Hardening
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target

# Terminal Commands to enable and inspect
# sudo systemctl daemon-reload
# sudo systemctl enable --now hub-api
# sudo journalctl -u hub-api -f`,
        explanation: 'Configures a production systemd service daemon with non-root execution, automated restart on crash, and journalctl logging.',
      },
      studentTip: 'Generate modern, secure Ed25519 SSH keys with "ssh-keygen -t ed25519 -C your_email@example.com". They are shorter, vastly more secure, and faster than legacy RSA keys!',
      interviewQuestions: [
        {
          question: 'What is the purpose of systemd in modern Linux distributions?',
          hint: 'Init system and PID 1.',
          answer: 'systemd is the first process started by the Linux kernel (PID 1). It initializes system hardware, manages background service lifecycles, handles parallel service startup, configures cgroups resource limits, and centralizes system logging through journalctl.',
        },
        {
          question: 'What is the difference between TCP port 80 and port 443?',
          hint: 'HTTP vs HTTPS encryption.',
          answer: 'Port 80 is the default port for unencrypted plaintext HTTP traffic. Port 443 is the standard port for encrypted HTTPS traffic secured with TLS/SSL cryptographic certificates.',
        },
      ],
    },
  },

  // 15. Vercel
  {
    id: 'vercel',
    name: 'Vercel Edge Platform',
    category: 'Frontend Cloud & Serverless',
    group: 'Cloud & Deployment',
    description: 'Serverless deployment platform optimized for Next.js, React, and global Edge Network CDN caching.',
    brandColor: '#000000',
    accentGradient: 'linear-gradient(135deg, #1f2937 0%, #000000 100%)',
    iconText: '▲',
    websiteUrl: 'https://vercel.com',
    details: {
      whatIsIt: 'Vercel is a cloud platform for frontend developers, providing the speed and reliability of a global Edge Network CDN combined with serverless compute. It offers zero-configuration continuous deployments from GitHub, instant preview URLs for every pull request, and native Next.js optimization.',
      underTheHood: `Global Anycast Edge Network & Serverless Execution:
1. Anycast Edge Routing:
   - Routes user requests to the geographically nearest Point of Presence (PoP) across 100+ global edge locations for sub-10ms static asset delivery.
2. Serverless & Edge Functions:
   - Serverless: Ephemeral Node.js micro-containers running on AWS Lambda.
   - Edge Functions: Ultra-lightweight V8 isolates booting in $<5\\text{ms}$ with zero cold starts.
3. Automated Preview Branch Deployments:
   - Every Git push triggers a distinct production-identical preview deployment with a unique immutable URL.`,
      coreRulesAndWorkflows: `Deployment Conventions:
• Environment Variables: Configure Production, Preview, and Development environment variables securely in the Vercel Dashboard.
• Build Commands: Ensure 'package.json' has standard 'build' and 'start' scripts.
• Edge Middleware: Intercept and rewrite requests at the edge before hitting origin servers for A/B testing and geolocation redirects.
• Analytics & Core Web Vitals: Monitor real-world user page speeds with Vercel Speed Insights.`,
      keyFeatures: [
        'Instant zero-config deployments triggered on Git push to GitHub, GitLab, or Bitbucket.',
        'Preview Deployments generated for every pull request with collaborative visual comments.',
        'Global Edge Network caching assets within milliseconds of global end users.',
        'Native optimization for Next.js (SSR, ISR, Server Components, and Image Optimization).',
      ],
      realWorldCaseStudy: 'Companies like OpenAI, TikTok, The Washington Post, and Loom host their web applications on Vercel to handle billions of global page views.',
      commonPitfalls: [
        'Exceeding serverless function execution timeouts (10s on free tiers) with heavy long-running operations.',
        'Forgetting to configure environment variables in project settings before triggering production deployments.',
        'Writing stateful server logic that assumes an in-memory variable persists between serverless invocations.',
      ],
      codeWalkthrough: {
        title: 'Production vercel.json Configuration with Security Headers',
        code: `// vercel.json - Security Headers & SPA Routing
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api.yourdomain.com/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
        explanation: 'Configures enterprise security HTTP headers and single-page application (SPA) client-side routing rewrites.',
      },
      studentTip: 'Link your GitHub repository to Vercel and check the "Preview URL" posted automatically by the Vercel bot on every Pull Request to verify your live UI before merging to main!',
      interviewQuestions: [
        {
          question: 'What is the difference between Vercel Serverless Functions and Edge Functions?',
          hint: 'AWS Lambda Node.js containers vs V8 isolates.',
          answer: 'Serverless Functions run in Node.js container environments with full access to Node APIs, but incur short cold-start times (~150ms). Edge Functions run on lightweight V8 isolates distributed across global edge nodes with near-zero cold starts (<5ms) and ultra-low latency, but operate on web-standard APIs (Fetch, Request, Response) without full Node native modules.',
        },
        {
          question: 'How do Preview Deployments improve engineering quality in Agile teams?',
          hint: 'Testing isolated pull requests in real cloud environments before production merge.',
          answer: 'Preview deployments create an exact live replica of the application for every Pull Request. QA testers, designers, and stakeholders can test interactive features, responsive behavior, and API integrations in a production environment before code is merged into main.',
        },
      ],
    },
  },

  // 16. Netlify
  {
    id: 'netlify',
    name: 'Netlify Cloud Platform',
    category: 'JAMstack & Web Hosting',
    group: 'Cloud & Deployment',
    description: 'Developer platform unifying continuous Git deployments, serverless functions, form processing, and custom redirect engines.',
    brandColor: '#00c7b7',
    accentGradient: 'linear-gradient(135deg, #00c7b7 0%, #0284c7 100%)',
    iconText: '🌐',
    websiteUrl: 'https://www.netlify.com',
    details: {
      whatIsIt: 'Netlify is an all-in-one cloud platform for automating modern web projects. It pioneered the JAMstack architecture (JavaScript, APIs, Markup), offering automated continuous deployments from Git, instant rollbacks, serverless functions, and built-in form handling.',
      underTheHood: `High-Availability Multi-Cloud CDN & Build Bot Internals:
1. Netlify High-Performance Edge:
   - Distributes cached static assets across multi-cloud edge CDNs with instant atomic cache invalidation.
2. Atomic Deploys & Instant Rollbacks:
   - Deploys are atomic: all assets are uploaded and verified before traffic is switched instantly via DNS pointer updates. If a bug is found, you can rollback to any previous release in 1 second.
3. Build Bots & Plugins:
   - Dedicated Docker containers execute your build commands, optimize HTML/CSS/images, and deploy to edge storage.`,
      coreRulesAndWorkflows: `Netlify Configuration Rules:
• The _redirects File: Add a 'public/_redirects' file with '/* /index.html 200' to ensure React Router single-page apps do not return 404s on browser refresh.
• Netlify Forms: Add a 'netlify' attribute to HTML <form> tags to capture contact form submissions without writing any backend server code.
• Netlify.toml: Store declarative build commands, environment variables, and header rules in version-controlled 'netlify.toml'.`,
      keyFeatures: [
        'Atomic Git deployments with sub-second instant rollbacks to any previous release.',
        'Netlify Forms: Capture and notify contact form submissions with zero server code.',
        'Deploy Previews with collaborative feedback tools for design reviews.',
        'Custom edge routing and URL rewrites via simple _redirects rules.',
      ],
      realWorldCaseStudy: 'Peloton, Mailchimp, and Victoria Beckham Beauty use Netlify to power high-speed digital storefronts and marketing platforms.',
      commonPitfalls: [
        'Forgetting the /* /index.html 200 redirect rule in React/Vite SPAs, causing 404 errors whenever users refresh nested routes.',
        'Exceeding free build minute allocations by running un-cached heavy compilation suites.',
      ],
      codeWalkthrough: {
        title: 'Production netlify.toml Configuration File',
        code: `# netlify.toml - Declarative Build & Redirect Settings
[build]
  command = "npm run build"
  publish = "dist"

# Single-Page Application (SPA) Routing Rule
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security Headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"`,
        explanation: 'Defines build output directory, 200 SPA client-side routing rewrites, and security headers in a single version-controlled configuration file.',
      },
      studentTip: 'Create a file named "_redirects" inside your "public/" folder with the exact line: "/* /index.html 200". This permanently prevents React Router 404 bugs on Netlify!',
      interviewQuestions: [
        {
          question: 'What is an "Atomic Deploy" in web hosting and why is it important?',
          hint: 'Preventing partial asset mismatches during live updates.',
          answer: 'An Atomic Deploy ensures that all HTML, JS, CSS, and image assets of a new release are completely uploaded and verified before web traffic is pointed to the new version. This guarantees users never experience half-updated pages or missing asset 404 errors during deployments.',
        },
        {
          question: 'Why do single-page applications (React/Vue) return 404 on page refresh without a redirect rule?',
          hint: 'Server looking for physical file on disk vs client-side routing.',
          answer: 'When a user visits "/dashboard", the web server looks for a physical file named "dashboard/index.html" on disk. Because single-page applications have only one real file ("index.html") and route paths client-side, the server returns 404 unless configured to rewrite all paths to "/index.html" with status 200.',
        },
      ],
    },
  },

  // 17. Render
  {
    id: 'render',
    name: 'Render Cloud Application Platform',
    category: 'Full-Stack Cloud Hosting',
    group: 'Cloud & Deployment',
    description: 'Unified cloud platform to host full-stack Node.js Express APIs, Docker containers, background workers, and managed PostgreSQL databases.',
    brandColor: '#46e3b7',
    accentGradient: 'linear-gradient(135deg, #46e3b7 0%, #10b981 100%)',
    iconText: '☁️',
    websiteUrl: 'https://render.com',
    details: {
      whatIsIt: 'Render is a modern cloud alternative to Heroku and AWS that makes it easy to host backend APIs, static frontends, background workers, Docker containers, and managed PostgreSQL databases with automated SSL, continuous Git deployments, and DDoS protection.',
      underTheHood: `Kubernetes Container Orchestration & Native Buildpacks:
1. Native Buildpacks & Docker Support:
   - Automatically detects Node.js, Python, Go, or Ruby runtimes, or builds custom multi-stage Dockerfiles.
2. Health Checks & Zero-Downtime Deploys:
   - Provisions a new container instance, waits for the specified health check endpoint (/api/health) to return 200 OK, switches live traffic, and shuts down the old container.
3. Private Networking:
   - Databases and internal microservices communicate over secure internal private VPC networks without exposing ports to the public internet.`,
      coreRulesAndWorkflows: `Backend Deployment Rules:
• Port Binding: Always bind your backend server to 'process.env.PORT' (Render assigns dynamic internal port numbers).
• Health Checks: Configure a lightweight health check endpoint in Render settings to verify database readiness before routing live traffic.
• Environment Secret Groups: Create reusable Secret Groups in Render to share database connection strings across multiple web services.
• Blue-Green Deployments: Render automatically performs zero-downtime rolling updates on every Git push.`,
      keyFeatures: [
        'Free web service tier for hosting Node.js, Express, and Python backend APIs.',
        'Fully managed PostgreSQL and Redis databases with automated backups.',
        'Zero-downtime rolling deployments with automated health check verification.',
        'Automated free Let’s Encrypt SSL certificates and global DDoS protection.',
      ],
      realWorldCaseStudy: 'Red Bull and 9GAG run high-throughput production web applications and database clusters on Render.',
      commonPitfalls: [
        'Hardcoding port 5000 in code instead of using process.env.PORT, preventing Render from routing traffic.',
        'Free tier web services spin down after 15 minutes of inactivity, causing a 30-50s cold start delay on the first user request.',
      ],
      codeWalkthrough: {
        title: 'Production Express Port Binding & Health Check for Render',
        code: `// server.js - Render Compatible Express Server
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Essential Health Check for Render Zero-Downtime Deploys
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// CRITICAL: Bind to process.env.PORT (assigned dynamically by Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server listening on 0.0.0.0:\${PORT}\`);
});`,
        explanation: 'Binds server to 0.0.0.0 with process.env.PORT and provides a lightweight /healthz endpoint for zero-downtime rolling deploys.',
      },
      studentTip: 'Free tier services on Render sleep after 15 minutes of inactivity. For portfolio projects, use a free cron monitoring service (like cron-job.org or UptimeRobot) to ping your /healthz endpoint every 10 minutes to keep your server awake!',
      interviewQuestions: [
        {
          question: 'Why must backend servers listen on 0.0.0.0 rather than 127.0.0.1 in cloud container environments like Render or Docker?',
          hint: 'Loopback interface vs all network interfaces.',
          answer: '127.0.0.1 (localhost) listens only to requests originating from inside the same container. 0.0.0.0 binds the server to all available network interfaces, allowing the host load balancer and outside network requests to reach the application.',
        },
        {
          question: 'What is a Zero-Downtime Deployment (Blue-Green) and how does Render achieve it?',
          hint: 'Spinning up new version before terminating old version.',
          answer: 'Zero-downtime deployment ensures the application remains online without dropping requests during updates. Render boots the new container version, tests its health endpoint, redirects the load balancer to the new container once healthy, and gracefully stops the old container.',
        },
      ],
    },
  },

  // 18. Railway
  {
    id: 'railway',
    name: 'Railway Cloud Infrastructure',
    category: 'Infrastructure as Code',
    group: 'Cloud & Deployment',
    description: 'Instant infrastructure orchestration platform to deploy interconnected microservices, databases, and cron jobs with zero configuration.',
    brandColor: '#0b0d0e',
    accentGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    iconText: '🚂',
    websiteUrl: 'https://railway.app',
    details: {
      whatIsIt: 'Railway is an infrastructure cloud platform that allows developers to provision databases, web services, and cron jobs in seconds. It connects to your GitHub repository and automatically detects build requirements using Nixpacks, providing instant visual architectural management.',
      underTheHood: `Nixpacks Build Engine & Ephemeral Container Orchestration:
1. Nixpacks Build Engine:
   - Analyzes project files (package.json, requirements.txt, go.mod, Cargo.toml) and generates a reproducible container image using the Nix package ecosystem.
2. Private Mesh Networking:
   - Services inside the same Railway project communicate over a private IPv6 network without exposing database ports to the public internet.
3. Variable Referencing:
   - Dynamic variable referencing (\${{Postgres.DATABASE_URL}}) automatically injects connection credentials into backend services without manual copy-pasting.`,
      coreRulesAndWorkflows: `Railway Conventions:
• Variable Chaining: Link database connection strings directly to application services using dynamic template variables.
• Volume Mounts: Attach persistent SSD storage volumes to database containers.
• Canvas Architecture View: Visually map relationships between your frontend, backend API, MongoDB, and Redis containers on the project canvas.`,
      keyFeatures: [
        'One-click template provisioning for MongoDB, PostgreSQL, MySQL, and Redis.',
        'Nixpacks automatic environment detection for any programming language.',
        'Dynamic environment variable referencing across interconnected microservices.',
        'Visual architecture canvas showing real-time CPU, RAM, and network metrics.',
      ],
      realWorldCaseStudy: 'Fast-growing startups and hackathon winners deploy full-stack microservice architectures on Railway in under 2 minutes.',
      commonPitfalls: [
        'Running databases without attaching persistent volume storage, risking data loss on container redeployments.',
      ],
      codeWalkthrough: {
        title: 'Railway Variable Referencing & Connecting Services',
        code: `# Example Railway Environment Variable Configuration
# Inside Backend Web Service Settings:
PORT=5000
NODE_ENV=production

# Dynamic variable referencing linking MongoDB plugin automatically:
MONGODB_URI=\${{MongoDB.MONGO_URL}}
REDIS_URL=\${{Redis.REDIS_URL}}

# Client Frontend Settings:
VITE_API_BASE_URL=https://\${{Backend.RAILWAY_PUBLIC_DOMAIN}}`,
        explanation: 'Demonstrates dynamic variable referencing in Railway, eliminating hardcoded database connection credentials.',
      },
      studentTip: 'Use Railway’s "Template" feature to deploy a full-stack MERN or PostgreSQL starter in 60 seconds with database and server pre-configured!',
      interviewQuestions: [
        {
          question: 'What is the advantage of Private Mesh Networking between backend APIs and databases?',
          hint: 'Security and latency.',
          answer: 'Private mesh networking allows services to communicate over an internal private network without exposing database ports to the public internet. This eliminates brute-force attack vectors and reduces latency by keeping data transit inside the cloud provider’s internal high-speed backbone.',
        },
      ],
    },
  },

  // 19. ChatGPT
  {
    id: 'chatgpt',
    name: 'ChatGPT & Prompt Engineering',
    category: 'Conversational AI Assistant',
    group: 'AI Assistants',
    description: 'Generative AI assistant for algorithmic problem solving, code explanation, architecture planning, and debugging stack traces.',
    brandColor: '#10a37f',
    accentGradient: 'linear-gradient(135deg, #10a37f 0%, #059669 100%)',
    iconText: '🤖',
    websiteUrl: 'https://chatgpt.com',
    details: {
      whatIsIt: 'ChatGPT is a state-of-the-art conversational AI developed by OpenAI. It assists software engineers across every phase of development: architectural design, algorithm optimization, debugging stack traces, writing unit tests, and explaining complex legacy codebases.',
      underTheHood: `Transformer LLMs & Autoregressive Inference:
1. Transformer Architecture:
   - Based on the multi-head Self-Attention mechanism, computing relationships between all tokens in a prompt in parallel.
2. Context Window & Tokenization:
   - Source code is broken down into numerical sub-word tokens (e.g. using Byte-Pair Encoding). Models process prompts within fixed context windows (128k+ tokens).
3. Reinforcement Learning from Human Feedback (RLHF):
   - Fine-tuned using RLHF and DPO (Direct Preference Optimization) to follow complex programming instructions safely and deterministically.`,
      coreRulesAndWorkflows: `Effective Prompt Engineering Rules:
• Give System Role & Context: Specify "You are a Principal React & Node.js Engineer reviewing enterprise code".
• Provide Concrete Constraints: Specify "Optimize for $O(N)$ time and $O(1)$ auxiliary space complexity; avoid external libraries".
• Few-Shot Examples: Provide sample input/output test vectors to guide deterministic code generation.
• Iterative Refinement: Ask the AI to critique its own code for edge cases and memory leaks before finalizing.`,
      keyFeatures: [
        'Step-by-step code explanation and pseudocode translation.',
        'Debugging error stack traces and pinpointing off-by-one errors.',
        'Writing comprehensive unit test suites covering edge cases.',
        'Translating code between programming languages (Python to Rust, Java to TypeScript).',
      ],
      realWorldCaseStudy: 'Engineering teams at top technology companies use AI assistants to accelerate boilerplate drafting, reduce documentation lookup time, and generate test suites 50% faster.',
      commonPitfalls: [
        'Blindly copy-pasting AI-generated code without verifying time complexity, edge cases, or security implications.',
        'Sharing confidential company API keys, proprietary algorithms, or customer data in public AI prompts.',
        'Assuming AI output is always correct without running unit tests (AI Hallucination).',
      ],
      codeWalkthrough: {
        title: 'Structured Prompt Engineering Template for Senior Developers',
        code: `// Structured Prompt Template for Complex Algorithmic Tasks:
/*
ROLE: You are a Senior Backend Systems Architect.
CONTEXT: We are building a high-throughput Express.js + Redis rate limiter.
TASK: Write a sliding-window rate limiting middleware.
CONSTRAINTS:
  1. Use Redis Sorted Sets (ZADD, ZREMRANGEBYSCORE, ZCARD).
  2. Must handle 10,000 req/sec without race conditions.
  3. Time complexity per check must be O(log N).
  4. Output clean TypeScript with inline comments and error handling.
*/`,
        explanation: 'Demonstrates a structured prompt format incorporating Role, Context, Task, and Constraints to generate enterprise-grade code.',
      },
      studentTip: 'When solving LeetCode or DSA problems, never ask the AI for the raw answer immediately! Instead, prompt: "Give me 3 progressive hints for this problem without showing the code."',
      interviewQuestions: [
        {
          question: 'What is an AI Hallucination in Large Language Models and how can engineers safeguard against it?',
          hint: 'Placing confident but factually incorrect information.',
          answer: 'An AI hallucination occurs when an LLM generates syntactically confident but factually incorrect code or non-existent API methods due to statistical pattern completion. Engineers safeguard against it by enforcing strict TypeScript type checking, running automated unit tests, and conducting peer code reviews.',
        },
      ],
    },
  },

  // 20. GitHub Copilot
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'AI Pair Programmer',
    group: 'AI Assistants',
    description: 'AI pair programmer embedded into your code editor providing context-aware inline completions and conversational debugging.',
    brandColor: '#6e40c9',
    accentGradient: 'linear-gradient(135deg, #6e40c9 0%, #3b82f6 100%)',
    iconText: '✨',
    websiteUrl: 'https://github.com/features/copilot',
    details: {
      whatIsIt: 'GitHub Copilot is an AI pair programmer integrated directly into VS Code, Visual Studio, JetBrains, and Neovim. Powered by OpenAI models, it turns natural language comments into working code, autocompletes repetitive patterns, and provides inline chat debugging inside your editor.',
      underTheHood: `Neighboring Tabs & Prompt Context Synthesis:
1. Context Retrieval Engine:
   - When your cursor moves, Copilot gathers context from:
     • Current file code above and below cursor.
     • Open neighboring tabs in your editor.
     • Recent file edits and language server definitions.
2. Token Stream & Low-Latency Speculative Decoding:
   - Streams completions with sub-100ms latency directly into the Monaco ghost-text editor buffer.
3. Copilot Chat:
   - Integrated editor side panel with slash commands (/explain, /fix, /tests, /doc) and workspace-aware symbol indexing (@workspace).`,
      coreRulesAndWorkflows: `Copilot Best Practices:
• Write Descriptive Comments: Write a clear JSDoc comment describing inputs, outputs, and edge cases to generate accurate algorithms.
• Keyboard Shortcuts: Press 'Tab' to accept a suggestion, 'Alt + ]' / 'Alt + [' to cycle through alternative suggestions, and 'Ctrl + Enter' to view 10 completions in a split pane.
• Use Slash Commands: Use '/tests' to generate unit tests and '/fix' to debug syntax errors in selected code blocks.
• Keep Relevant Files Open: Open related interfaces and types in neighboring editor tabs so Copilot indexes them for type accuracy.`,
      keyFeatures: [
        'Context-aware multi-line code autocompletions directly in your editor.',
        'Inline Copilot Chat with workspace symbol indexing (@workspace).',
        'Automatic unit test and JSDoc documentation generator.',
        'Free access for verified students through the GitHub Student Developer Pack.',
      ],
      realWorldCaseStudy: 'GitHub research shows that developers using Copilot complete programming tasks 55% faster and report higher coding satisfaction.',
      commonPitfalls: [
        'Blindly hitting Tab to accept suggestions without reviewing business logic or potential security bugs.',
        'Allowing Copilot to insert outdated, deprecated library APIs without checking version compatibility.',
      ],
      codeWalkthrough: {
        title: 'Guiding Copilot with JSDoc Comments and TypeScript Types',
        code: `// Step 1: Define strict TypeScript interfaces
interface UserPayload {
  id: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
}

/**
 * Validates and signs an encrypted JWT token with a 7-day expiration.
 * @param {UserPayload} user - The authenticated user object
 * @returns {string} Signed JWT Bearer token
 * @throws {Error} If JWT_SECRET environment variable is missing
 */
// Step 2: Press Tab to let Copilot complete the implementation:
export function generateAuthToken(user: UserPayload): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );
}`,
        explanation: 'Demonstrates how clear TypeScript interfaces and JSDoc comments guide Copilot to generate secure, production-ready code with exact error handling.',
      },
      studentTip: 'In VS Code, select any complex function, right click, choose "Copilot" -> "Explain This", or press "Ctrl+I" (Cmd+I) to open inline Copilot chat to refactor code in place!',
      interviewQuestions: [
        {
          question: 'How does GitHub Copilot select context from your project to provide accurate code suggestions?',
          hint: 'Cursor position, neighboring tabs, and workspace symbols.',
          answer: 'Copilot analyzes the code immediately surrounding your cursor, imports and type definitions, and open neighboring tabs in your editor. For Copilot Chat, it indexes the entire workspace codebase to locate referenced classes, methods, and configurations.',
        },
      ],
    },
  },
];

export default developerTools;
