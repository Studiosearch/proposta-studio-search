import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";
import { URL } from "url";

// Supabase Setup
const supabaseUrl =
  process.env.SUPABASE_URL ||
  "https://fqvhytxfbdxnabqsfapk.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdmh5dHhmYmR4bmFicXNmYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NzQ3MzAsImV4cCI6MjA5MTI1MDczMH0.vHGMG--KjBJvVAJMWQ65ywEAP_igSUmIFhO_k_KAIrs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Parse query params from the rewritten URL
  // vercel.json sends: /api?resource=proposals&id=xxx
  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const resource = req.query?.resource || parsedUrl.searchParams.get("resource");
  const resourceId = req.query?.id || parsedUrl.searchParams.get("id");

  // Also try to extract from the URL path as fallback
  // (when running locally or if rewrites don't work)
  let finalResource = resource;
  let finalId = resourceId;

  if (!finalResource) {
    const pathParts = (parsedUrl.pathname || "").split("/").filter(Boolean);
    // /api/proposals/abc -> ["api", "proposals", "abc"]
    if (pathParts[0] === "api") {
      finalResource = pathParts[1];
      finalId = pathParts[2] || finalId;
    } else {
      finalResource = pathParts[0];
      finalId = pathParts[1] || finalId;
    }
  }

  // POST /api/proposals — Save a new proposal
  if (req.method === "POST" && finalResource === "proposals" && !finalId) {
    try {
      const id = nanoid(10);
      const body = req.body;

      if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "Body da requisição inválido ou vazio" });
      }

      const { error } = await supabase
        .from("proposals")
        .insert([{ id, data: body }]);

      if (error) {
        console.error("Supabase insert error:", JSON.stringify(error));
        return res.status(500).json({
          error: `Erro ao salvar no banco: ${error.message || JSON.stringify(error)}`,
        });
      }

      return res.status(200).json({ id });
    } catch (err: any) {
      console.error("Save Error:", err);
      return res.status(500).json({
        error: `Erro ao salvar proposta: ${err.message || "erro desconhecido"}`,
      });
    }
  }

  // GET /api/proposals/:id — Load a proposal
  if (req.method === "GET" && finalResource === "proposals" && finalId) {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("data")
        .eq("id", finalId)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Proposta não encontrada." });
      }

      return res.status(200).json({ ...data.data, id: finalId });
    } catch (err: any) {
      console.error("Load Error:", err);
      return res.status(500).json({
        error: `Erro ao carregar proposta: ${err.message || "erro desconhecido"}`,
      });
    }
  }

  // DELETE /api/proposals/:id — Delete a proposal
  if (req.method === "DELETE" && finalResource === "proposals" && finalId) {
    try {
      const { error } = await supabase
        .from("proposals")
        .delete()
        .eq("id", finalId);

      if (error) {
        return res.status(500).json({
          error: `Erro ao deletar proposta: ${error.message || JSON.stringify(error)}`,
        });
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      console.error("Delete Error:", err);
      return res.status(500).json({
        error: `Erro ao deletar proposta: ${err.message || "erro desconhecido"}`,
      });
    }
  }

  // Fallback — route not matched
  return res.status(404).json({
    error: "Rota da API não encontrada",
    debug: { method: req.method, url: req.url, resource: finalResource, id: finalId },
  });
}
