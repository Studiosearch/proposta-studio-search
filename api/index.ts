import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";
import type { IncomingMessage, ServerResponse } from "http";

type VercelRequest = IncomingMessage & { body?: any; url?: string; method?: string; query?: Record<string, string | string[]> };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => VercelResponse;
  end: () => VercelResponse;
};

// Supabase Setup
const supabaseUrl =
  process.env.SUPABASE_URL ||
  "https://fqvhytxfbdxnabqsfapk.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdmh5dHhmYmR4bmFicXNmYXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NzQ3MzAsImV4cCI6MjA5MTI1MDczMH0.vHGMG--KjBJvVAJMWQ65ywEAP_igSUmIFhO_k_KAIrs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Parse URL to extract route info
  // Vercel rewrites /api/(.*) -> /api, so the original path comes in req.url
  // req.url will be something like /api/proposals or /api/proposals/abc123
  const url = req.url || "";
  const pathParts = url.split("?")[0].split("/").filter(Boolean);
  // pathParts examples:
  //   /api/proposals       -> ["api", "proposals"]
  //   /api/proposals/abc   -> ["api", "proposals", "abc"]

  const resource = pathParts[1]; // "proposals"
  const resourceId = pathParts[2]; // e.g. "abc123" or undefined

  // POST /api/proposals — Save a new proposal
  if (req.method === "POST" && resource === "proposals" && !resourceId) {
    try {
      const id = nanoid(10);
      const { error } = await supabase
        .from("proposals")
        .insert([{ id, data: req.body }]);

      if (error) {
        console.error("Supabase insert error:", JSON.stringify(error));
        return res.status(500).json({
          error: `Erro ao salvar proposta: ${error.message || JSON.stringify(error)}`,
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
  if (req.method === "GET" && resource === "proposals" && resourceId) {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("data")
        .eq("id", resourceId)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Proposta não encontrada." });
      }

      return res.status(200).json({ ...data.data, id: resourceId });
    } catch (err: any) {
      console.error("Load Error:", err);
      return res.status(500).json({
        error: `Erro ao carregar proposta: ${err.message || "erro desconhecido"}`,
      });
    }
  }

  // DELETE /api/proposals/:id — Delete a proposal
  if (req.method === "DELETE" && resource === "proposals" && resourceId) {
    try {
      const { error } = await supabase
        .from("proposals")
        .delete()
        .eq("id", resourceId);

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
    error: "Rota não encontrada",
    debug: { method: req.method, url, pathParts },
  });
}
