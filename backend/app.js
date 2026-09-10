import "dotenv/config";
import express from "express";
import cors from "cors";
import giftRoutes from "./routes/giftRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sentimentRoutes from "./sentiment/index.js";

const app = express();
const port = process.env.PORT || 3060;

app.use(cors());
app.use(express.json());

// Mount gift routes -> /api/gifts, /api/gifts/:id
app.use("/api", giftRoutes);

// Mount search routes -> /api/search
app.use("/api", searchRoutes);

// Mount auth routes -> /api/auth/register, /api/auth/login
app.use("/api/auth", authRoutes);

// Mount sentiment routes -> /api/sentiment/analyze
app.use("/api/sentiment", sentimentRoutes);

app.get("/", (req, res) => {
  res.send("Fullstack Capstone Project API is running");
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
