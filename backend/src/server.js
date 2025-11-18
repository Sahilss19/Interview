import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// ----- FIX dirname -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// FIXED CORS
app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    credentials: true,
  })
);

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// Test routes
app.get("/", (req, res) => {
  res.json({ msg: "API is working" });
});

app.get("/about", (req, res) => {
  res.json({ msg: "about api is working" });
});

// Production serve
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log("Server running on port", ENV.PORT)
    );
  } catch (err) {
    console.error("Server start error:", err);
  }
};

startServer();
