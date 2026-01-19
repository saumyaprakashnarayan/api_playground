import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();


router.get("/", async (_, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});


router.get("/top", async (_, res) => {
  try {
    const skills = await prisma.skill.groupBy({
      by: ["name"],
      _count: true,
      orderBy: {
        _count: {
          name: "desc",
        },
      },
    });

    res.json(skills);
  } catch (error) {
    console.error("Error fetching top skills:", error);
    res.status(500).json({ error: "Failed to fetch top skills" });
  }
});

export default router;
