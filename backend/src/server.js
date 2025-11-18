import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { fileURLToPath } from "url"; // ✔ required for __dirname

const app = express();

// ✔ REAL __dirname for ESM
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

// Simple routes
app.get("/", (req, res) => {
  res.json({ msg: "api is working" });
});

app.get("/about", (req, res) => {
  res.json({ msg: "about api is working" });
});

// ===============================
// 🚀 PRODUCTION — SERVE FRONTEND
// ===============================
if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist"); // ✔ fixed path

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ===============================
// 🚀 START SERVER
// ===============================
const start = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server running on:", ENV.PORT);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

start();
