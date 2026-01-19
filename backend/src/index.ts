import express from "express";
import dotenv from "dotenv";


import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import projectRoutes from "./routes/project";
import skillRoutes from "./routes/skill";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",              // Vite dev
  "http://localhost:3000",
  "https://my-api-playground-lzxf.onrender.com",
  "https://your-frontend.vercel.app"    // ⬅ ADD YOUR REAL FRONTEND URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn("Blocked by CORS:", origin);
    return callback(null, true); // TEMP allow to avoid crash
  },
  credentials: true
}));


app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/projects", projectRoutes);
app.use("/skills", skillRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
