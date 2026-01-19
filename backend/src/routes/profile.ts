import { Router } from "express";
import { prisma } from "../prisma";
import { middleware } from "../middleware";

const router = Router();

/**
 * GET /profile
 */
router.get("/", async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        education: true,
        skills: true,
        projects: true,
        links: true,
      },
    });

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/**
 * POST /profile (protected) - Create or Update profile
 */
router.post("/", middleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Try to update existing profile, or create if doesn't exist
    const profile = await prisma.profile.upsert({
      where: { email: email || "unique-default" },
      update: { name, email },
      create: { name, email },
      include: {
        education: true,
        skills: true,
        projects: true,
        links: true,
      },
    });

    res.json(profile);
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

export default router;
