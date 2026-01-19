import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import projectRoutes from "./routes/project";
import skillRoutes from "./routes/skill";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081', 'https://my-api-playground-lzxf.onrender.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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
