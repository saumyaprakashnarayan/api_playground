// Mock data for development/demo when API is unavailable

import type { Profile, Project, Skill } from './types/api';

export const mockProfile: Profile = {
  name: "Saumya Prakash Narayan",
  email: "saumyaprakashnarayan@gmail.com",
  education: [
    {
      institution: "National Institute of Technology (NIT), Delhi",
      degree: "B.Tech in Computer Science and Engineering",
      field: "Computer Science",
      startDate: "2023",
      endDate: "2027"
    }
  ],
  skills: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Prisma", "Gemini API"],
  workExperience: [
    {
      company: "Personal Projects",
      position: "Full-stack Developer",
      startDate: "2025",
      endDate: "Present",
      description: "Building production-grade applications using modern tech stack with focus on performance optimization and user experience."
    }
  ],
  links: {
    github: "https://github.com/saumya",
    linkedin: "https://www.linkedin.com/in/saumya-prakash-narayan/",
    portfolio: "https://portfolio.dev"
  }
};

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Interviewer",
    description: "AI-powered interview simulation tool generating 500+ technical and behavioral questions. Uses Gemini API to deliver personalized feedback improving interview readiness by 25%. Implemented secure authentication and session handling with 30% reduced API latency.",
    link: "https://ai-interviewer-rig4xa96i-vineets-projects-ef673d72.vercel.app/",
    skills: ["React.js", "Node.js", "Gemini API", "TypeScript"]
  },
  {
    id: "2",
    title: "URL Shortener",
    description: "Full-stack URL platform used by 20+ users generating 150+ short links. Optimized redirection logic reducing response latency by 40%. Achieved 95+ Lighthouse score with responsive UI design and CI/CD on Vercel.",
    link: "https://shorturl-ten-mocha.vercel.app/",
    skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "3",
    title: "Crop Rotation Detection",
    description: "Machine learning system analyzing crop rotation patterns using multi-temporal satellite imagery. Processed 1,000+ satellite images using vegetation indices (NDVI and EVI). Trained classification models achieving 85% accuracy.",
    link: "https://github.com/saumya",
    skills: ["Python", "Machine Learning", "Satellite Imagery", "GIS"]
  },
  {
    id: "4",
    title: "VibeNet",
    description: "Social networking application focused on real-time interaction and seamless user experience.",
    link: "https://github.com/saumya/vibenet",
    skills: ["Node.js", "Express.js", "MongoDB", "WebSockets"]
  }
];

export const mockTopSkills: Skill[] = [
  { name: "React.js", count: 2 },
  { name: "Node.js", count: 3 },
  { name: "TypeScript", count: 2 },
  { name: "PostgreSQL", count: 2 },
  { name: "Python", count: 1 },
  { name: "Prisma", count: 1 }
];

// Filter projects by skill
export const filterProjectsBySkill = (skill: string): Project[] => {
  return mockProjects.filter(project =>
    project.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
};
