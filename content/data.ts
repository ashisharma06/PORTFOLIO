export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
};

export type Achievement = {
  title: string;
  result: string;
  date: string;
  organizer?: string;
  location?: string;
  description?: string;
};

export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type Project = {
  title: string;
  tagline: string;
  year: string;
  bullets: string[];
  tech: string[];
  links: ProjectLinks;
};

export type Education = {
  institution: string;
  location: string;
  period: string;
  qualification: string;
  score?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const profile: Profile = {
  name: "Ashish Sharma",
  role: "Frontend Developer & CSE (Data Science) Student",
  location: "Bengaluru, India",
  email: "ashish060206@gmail.com",
  github: "https://github.com/ashisharma06",
  linkedin: "https://www.linkedin.com/in/ashish-sharma-13b195295",
};

export const summary =
  "Computer Science Engineering student with hands-on experience in React, JavaScript, and modern frontend development. Built data visualization platforms handling 55,000+ rows and secured Runner-Up position in AI Verse Hackathon 2026. Passionate about creating scalable web applications and user-centric interfaces.";

export const achievements: Achievement[] = [
  {
    title: "AI Verse Hackathon",
    result: "Runner-Up",
    date: "Feb 2026",
    organizer: "upGrad",
    location: "Bengaluru",
    description:
      "Worked in a team to design and present an innovative AI-based solution within a limited time frame.",
  },
  {
    title: "NMIT Hacks 2026",
    result: "Render Track Winner (2nd Prize)",
    date: "Mar 2026",
    description:
      "48-hour hackathon at Nitte Meenakshi Institute of Technology, Bengaluru. Earned $800 in Render credits.",
  },
  {
    title: "Smart India Hackathon (Internal Round, AMC Engineering College)",
    result: "Participant",
    date: "Sep 2025",
  },
  {
    title: "VIBE-A-THON 2026",
    result: "Participant",
    date: "May 2026",
    description:
      "24-hour hackathon at Nitte Meenakshi Institute of Technology, Bengaluru.",
  },
];

// TODO: replace PASTE_DOCUMIND_REPO_URL with the exact DocuMind repository URL.
const DOCUMIND_REPO_URL = "PASTE_DOCUMIND_REPO_URL";
const docuMindGithub =
  DOCUMIND_REPO_URL === "PASTE_DOCUMIND_REPO_URL"
    ? "https://github.com/ashisharma06"
    : DOCUMIND_REPO_URL;

export const projects: Project[] = [
  {
    title: "Dashify",
    tagline: "No-Code Data Visualization Platform",
    year: "2026",
    bullets: [
      "React-based platform converting CSV and Excel data into interactive dashboards",
      "dynamic chart generation and dark mode support",
      "optimized rendering for datasets exceeding 55,000 rows",
      "deployed on Vercel",
    ],
    tech: ["React", "JavaScript", "Vercel"],
    links: {
      live: "https://dashify-cyan.vercel.app/",
    },
  },
  {
    title: "BlogSeek",
    tagline: "Multi-Source Blog Discovery Platform",
    year: "2026",
    bullets: [
      "responsive platform built with Next.js, TypeScript and Framer Motion to search technical articles from DEV.to, Hashnode and Hacker News in one interface",
      "REST/GraphQL integration layer normalizing different API responses into a common data model, fetching sources concurrently with Promise.allSettled() and de-duplicating articles before rendering",
    ],
    tech: ["Next.js", "TypeScript", "Framer Motion", "REST", "GraphQL"],
    links: {
      live: "https://blogseek.vercel.app/",
    },
  },
  {
    title: "DocuMind",
    tagline: "RAG-Based PDF Q&A System",
    year: "2026",
    bullets: [
      "Retrieval-Augmented Generation pipeline using LangChain, Google Gemini and ChromaDB answering questions grounded strictly in uploaded PDF content to prevent hallucinated responses",
      "semantic chunking, persistent vector embeddings and a Streamlit interface",
    ],
    tech: ["Python", "LangChain", "Gemini", "ChromaDB", "Streamlit"],
    links: {
      github: docuMindGithub,
    },
  },
  {
    title: "Commit Story",
    tagline: "GitHub History Visualizer",
    year: "2026",
    bullets: [
      "Next.js (App Router) and TypeScript app turning any public GitHub user's repository history into a terminal-style visual timeline and AI-written narrative, with a username-to-repo picker flow",
      "GitHub REST API (Octokit) integration with pagination, rate-limit handling and Zod validation",
      'unit-tested analysis engine (Vitest) detecting project "eras", contributor leaderboards, commit streaks and activity patterns',
      "per-era stories streamed with the Vercel AI SDK and Google Gemini, grounded only in real commit data",
      "deployed on Vercel",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Octokit",
      "Zod",
      "Vitest",
      "Vercel AI SDK",
      "Gemini",
    ],
    links: {
      live: "https://commit-story-mu.vercel.app/",
      // TODO: add Commit Story GitHub repository URL
      github: "",
    },
  },
];

export const education: Education[] = [
  {
    institution: "AMC Engineering College",
    location: "Bengaluru",
    period: "2023 to 2027",
    qualification: "B.E. in Computer Science and Engineering (Data Science)",
    score: "CGPA 7.35",
  },
  {
    institution: "Kendriya Vidyalaya MEG & Centre",
    location: "Bengaluru",
    period: "2023",
    qualification: "Class X & XII",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["Next.js", "React.js", "Node.js", "GSAP", "Framer Motion"],
  },
  {
    category: "Web Technologies",
    items: ["HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
];
