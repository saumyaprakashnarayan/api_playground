import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const profile = await prisma.profile.create({
    data: {
      name: "Saumya Prakash Narayan",
      email: "saumyaprakashnarayan@gmail.com",
      links: {
        create: [
          {
            type: "github",
            url: "https://github.com/saumya",
          },
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/saumya-prakash-narayan/",
          },
          {
            type: "portfolio",
            url: "https://portfolio.dev/",
          },
        ],
      },
    },
  });


  await prisma.education.create({
    data: {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "National Institute of Technology (NIT), Delhi",
      startYear: 2023,
      endYear: 2027,
      profileId: profile.id,
    },
  });


  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "WebRTC",
    "Node.js",
    "Express.js",
    "WebSockets",
    "Prisma",
    "Java",
    "Python",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "Docker Swarm",
    "Kubernetes",
    "Git",
    "GitHub",
    "Jest",
    "Mocha/Chai",
  ];

  const skillRecords = await Promise.all(
    skills.map((skill) =>
      prisma.skill.create({
        data: {
          name: skill,
          profileId: profile.id,
        },
      })
    )
  );

  const skillMap = Object.fromEntries(
    skillRecords.map((s) => [s.name, s.id])
  );



  const aiInterviewer = await prisma.project.create({
    data: {
      title: "AI Interviewer",
      description:
        "AI-powered interview simulation tool generating 500+ technical and behavioral questions. Uses Gemini API to deliver personalized feedback improving interview readiness by 25%. Implemented secure authentication and session handling with 30% reduced API latency through optimization and caching.",
      work: "Personal Project",
      profileId: profile.id,
      links: {
        create: [
          {
            type: "demo",
            url: "https://ai-interviewer-rig4xa96i-vineets-projects-ef673d72.vercel.app/",
          },
        ],
      },
    },
  });

  const sentry = await prisma.project.create({
    data: {
      title: "URL Shortener",
      description:
        "Full-stack URL platform used by 20+ users generating 150+ short links. Optimized redirection logic reducing response latency by 40%. Achieved 95+ Lighthouse score with responsive UI design. Implemented CI/CD on Vercel enabling zero-downtime deployments.",
      work: "Personal Project",
      profileId: profile.id,
      links: {
        create: [
          {
            type: "demo",
            url: "https://shorturl-ten-mocha.vercel.app/",
          },
        ],
      },
    },
  });

  const urlShortener = await prisma.project.create({
    data: {
      title: "URL Shortener",
      description:
        "Full-stack URL platform used by 20+ users generating 150+ short links. Optimized redirection logic reducing response latency by 40%. Achieved 95+ Lighthouse score with responsive UI design. Implemented CI/CD on Vercel enabling zero-downtime deployments.",
      work: "Personal Project",
      profileId: profile.id,
      links: {
        create: [
          {
            type: "demo",
            url: "https://shorturl-ten-mocha.vercel.app/",
          },
        ],
      },
    },
  });

  const cropRotation = await prisma.project.create({
    data: {
      title: "Crop Rotation Detection using Remote Sensing",
      description:
        "Machine learning-based system to analyze crop rotation patterns using multi-temporal satellite imagery. Processed and analyzed 1,000+ satellite images using vegetation indices (NDVI and EVI). Trained classification models achieving 85% accuracy in identifying crop rotation cycles. Integrated GIS-based spatial analysis for visualizing crop transitions.",
      work: "Personal Project",
      profileId: profile.id,
      links: {
        create: [
          {
            type: "github",
            url: "https://github.com/saumya/crop-rotation",
          },
        ],
      },
    },
  });


  const projectSkillMap = [
    { projectId: aiInterviewer.id, skills: ["React.js", "Node.js", "TypeScript"] },
    { projectId: sentry.id, skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"] },
    { projectId: urlShortener.id, skills: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"] },
    { projectId: cropRotation.id, skills: ["Python", "Machine Learning", "PostgreSQL"] },
  ];

  for (const ps of projectSkillMap) {
    for (const skillName of ps.skills) {
      const skillId = skillMap[skillName];
      if (!skillId) continue;

      await prisma.projectSkill.create({
        data: {
          projectId: ps.projectId,
          skillId,
        },
      });
    }
  }

  console.log(" Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
