import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// Routes
app.get("/health", (req, res) => res.status(200).send({ success: true }));

// =============================================
// 🚀 PRODUCTION — SERVE FRONTEND THROUGH BACKEND
// =============================================
if (ENV.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // serve static assets
  app.use(express.static(distPath));

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// =============================================
// 🚀 START SERVER
// =============================================
const start = async () => {
  await connectDB();

  const PORT = process.env.PORT || ENV.PORT || 3000;

  // VERY IMPORTANT FOR NIXPACKS:
  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on:", PORT);
  });
};

start();
