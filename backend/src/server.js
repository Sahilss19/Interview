import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// Proper dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// Inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Backend API test
app.get("/api", (req, res) => {
  res.json({ msg: "api is working" });
});

// Health
app.get("/health", (req, res) => {
  res.status(200).send({ success: true });
});

// ===================================
// 🚀 PRODUCTION — SERVE FRONTEND
// ===================================
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  console.log("Serving frontend from:", distPath);

  // Serve static files
  app.use(express.static(distPath));

  // React fallback
  app.get("/*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ===================================
// 🚀 START SERVER
// ===================================
const start = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || ENV.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on:", PORT);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

start();
