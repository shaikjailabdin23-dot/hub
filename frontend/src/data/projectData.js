export const projectCategories = [
  'All Categories',
  'Personal Projects',
  'Academic Projects',
  'Web Projects',
  'Java Projects',
  'Python Projects',
  'AI Projects',
  'Open Source',
  'Hackathon Projects',
];

export const fullnessLabsProject = {
  _id: 'fullnesslabs-featured-01',
  title: 'FullnessLabs',
  category: 'Web Projects',
  role: 'C.O',
  technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  githubUrl: 'https://github.com/chinnu554/',
  demoUrl: 'https://fullnesslabs.netlify.app/',
  problemStatement:
    'Students and beginners often struggle to manage their learning activities, technical skills, career preparation, and projects in one organized platform. Information is usually scattered across different websites and applications, making it difficult to track learning progress, manage projects, and prepare for future career opportunities.',
  description:
    'FullnessLabs is a web-based learning and career management platform designed to bring learning, technical skills, career development, and project management into one centralized system. The platform provides users with an organized environment to manage their learning journey, explore technical skills, work on projects, and track their career development. It is built using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage.',
  challenges:
    'Unifying disparate curriculum, project management, and career tracking workflows into an intuitive and synchronized full-stack architecture.',
  solutions:
    'Engineered a scalable MERN stack with RESTful APIs, responsive dashboard components, and dynamic user progress tracking.',
  user: {
    name: 'C.O (Alex Johnson)',
    branch: 'Web Engineering',
    college: 'Global Institute of Technology',
  },
  createdAt: new Date().toISOString(),
};

export const hub23Project = {
  _id: 'hub23-featured-02',
  title: 'HUB23',
  category: 'Web Projects',
  role: 'Developer',
  technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  githubUrl: 'https://github.com/shaikjailabdin23-dot/',
  demoUrl: 'https://hub23.lovable.app/',
  problemStatement:
    'Students and users face different challenges in managing their learning, skills, projects, tasks, career activities, and technical resources in one place. Using multiple platforms for different activities can make information difficult to organize and track. HUB23 is designed to provide a centralized digital hub that helps users organize and manage different activities through a single web platform.',
  description:
    'HUB23 is a centralized web platform designed to bring multiple useful activities and resources into one simple and organized environment. It helps users manage their learning, technical skills, projects, tasks, career development, and other digital activities from a single platform. The application uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management. The goal of HUB23 is to provide a flexible and user-friendly platform that can be extended to solve different user and management problems.',
  challenges:
    'Consolidating fragmented resource trackers, task management, and career readiness tools into an integrated digital hub with high extensibility.',
  solutions:
    'Architected a modular full-stack MERN application featuring decoupled service layers, dynamic routing, and an intuitive user interface.',
  user: {
    name: 'Developer (Shaik Jailabdin)',
    branch: 'Computer Science and Engineering',
    college: 'Global Institute of Technology',
  },
  createdAt: new Date().toISOString(),
};

export const initialProjectsList = [fullnessLabsProject, hub23Project];
