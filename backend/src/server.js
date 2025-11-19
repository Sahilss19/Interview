import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

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
app.get("/", (req, res) => {
  res.json({ msg: "api is working" });
});

app.get("/about", (req, res) => {
  res.json({ msg: "about api is working" });
});

// Start server
const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || ENV.PORT || 3000;
    app.listen(PORT, () => console.log("Server running on:", PORT));
  } catch (err) {
    console.error("Server start error:", err);
  }
};

start();
