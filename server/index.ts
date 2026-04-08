import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API to save proposal
  app.post("/api/proposals", async (req, res) => {
    try {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials missing");
      }
      
      const id = nanoid(10);
      const { error } = await supabase
        .from("proposals")
        .insert([{ id, data: req.body }]);

      if (error) throw error;
      res.json({ id });
    } catch (err) {
      console.error("Save Error:", err);
      res.status(500).json({ error: "Failed to save proposal" });
    }
  });

  // API to get proposal
  app.get("/api/proposals/:id", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("data")
        .eq("id", req.params.id)
        .single();

      if (error || !data) return res.status(404).json({ error: "Not found" });
      res.json({ ...data.data, id: req.params.id });
    } catch (err) {
      console.error("Load Error:", err);
      res.status(500).json({ error: "Failed to load" });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    // Check if dist/public/index.html exists (production)
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5000;
  if (process.env.NODE_ENV !== "production") {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  }

  // Export app for Vercel
  return app;
}

const appPromise = startServer();
export default appPromise;
