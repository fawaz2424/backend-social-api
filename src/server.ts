import postRoutes from "./presentation/routes/postRoutes";
import userRoutes from "./presentation/routes/userRoutes";
import authRoutes from "./presentation/routes/authRoutes";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongoConnection";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", postRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Backend Social API is running ✅" });
});

const port = Number(process.env.PORT) || 3000;

console.log("Starting DB connection...");

connectDB()
  .then(() => {
    console.log("DB connected, starting server...");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });