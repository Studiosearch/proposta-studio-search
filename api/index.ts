import express from "express";
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || "https://fqvhytxfbdxnabqsfapk.supabase.co";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdmh5dHhmYmR4bmFicXNmYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NzQ3MzAsImV4cCI6MjA5MTI1MDczMH0.vHGMG--KjBJvVAJMWQ65ywEAP_igSUmIFhO_k_KAIrs";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());

// API to save proposal
app.post(["/api/proposals", "/proposals", "/"], async (req, res) => {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Configuração do banco de dados pendente no Vercel." });
    }
    
    const id = nanoid(10);
    const { error } = await supabase
      .from("proposals")
      .insert([{ id, data: req.body }]);

    if (error) throw error;
    res.json({ id });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ error: "Erro ao salvar proposta." });
  }
});

// API to get proposal
app.get(["/api/proposals/:id", "/proposals/:id", "/:id"], async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("proposals")
      .select("data")
      .eq("id", req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ error: "Proposta não encontrada." });
    res.json({ ...data.data, id: req.params.id });
  } catch (err) {
    console.error("Load Error:", err);
    res.status(500).json({ error: "Erro ao carregar proposta." });
  }
});

// API to delete proposal
app.delete(["/api/proposals/:id", "/proposals/:id", "/:id"], async (req, res) => {
  try {
    const { error } = await supabase
      .from("proposals")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete proposal" });
  }
});

export default app;
