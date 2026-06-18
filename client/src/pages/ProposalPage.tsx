import { useEffect, useState } from "react";
import { useParams } from "wouter";
import ProposalDocument from "@/components/ProposalDocument";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { PersonalizationState } from "@/hooks/usePersonalization";
import { translations } from "@/lib/translations";
import { supabase } from "@/lib/supabase";

export default function ProposalPage() {
  const params = useParams();
  const idValue = params.id || params.slug;
  const [data, setData] = useState<(PersonalizationState & { formattedTotal: string; totalValue: number; id?: string }) | null>(null);
  const [loading, setLoading] = useState(!!idValue);

  useEffect(() => {
    if (idValue) {
      supabase
        .from("proposals")
        .select("data")
        .eq("id", idValue)
        .single()
        .then(({ data: proposalData, error }) => {
          if (error || !proposalData) {
            setData(null);
          } else {
            setData({ ...proposalData.data, id: idValue as string });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [idValue]);

  useEffect(() => {
    if (data && 'customOverridesList' in data) {
      const overrides = (data as any).customOverridesList as string[];
      if (overrides && overrides.length > 0) {
        setTimeout(() => {
          const editables = document.querySelectorAll('[contentEditable]');
          overrides.forEach((text, i) => {
            if (editables[i] && text) {
              editables[i].textContent = text;
            }
          });
        }, 100); // small delay to ensure DOM is fully painted
      }
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3efe9] flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-[#1f2328]" />
      </div>
    );
  }

  if (params.id && !data) {
    return (
      <div className="min-h-screen bg-[#f3efe9] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-light">Proposta não encontrada</h1>
        <a href="/" className="text-sm border-b border-black">Voltar ao início</a>
      </div>
    );
  }

  // Fallback for demo or if no data loaded
  if (!data) {
    return (
      <div className="min-h-screen bg-[#f3efe9] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-light">Selecione uma proposta no dashboard</h1>
        <a href="/" className="text-sm border-b border-black">Ir para o Dashboard</a>
      </div>
    );
  }

  if (data) {
    const FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;
    let isExpired = false;
    
    if ((data as any).createdAt) {
      isExpired = Date.now() - (data as any).createdAt > FIFTEEN_DAYS;
    } else if (data.date) {
      const parts = data.date.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts.map(Number);
        const dateObj = new Date(year, month - 1, day);
        if (!isNaN(dateObj.getTime())) {
          isExpired = Date.now() - dateObj.getTime() > FIFTEEN_DAYS;
        }
      }
    }

    if (isExpired) {
      return (
        <div className="min-h-screen bg-[#f3efe9] flex flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="max-w-md bg-white text-black p-12 rounded-[34px] shadow-sm border border-black/5">
            <h1 className="text-[2rem] font-extralight tracking-tight mb-4">Sua proposta expirou</h1>
            <p className="text-black/60 font-light leading-relaxed mb-8 text-[0.95rem]">
              O prazo de validade de 15 dias desta proposta chegou ao fim. Por favor, entre em contato conosco para atualizarmos as condições.
            </p>
            <a 
              href="https://wa.me/5511997711480" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-3 bg-[#c8ff1a] hover:bg-[#d9ff4d] text-black font-semibold px-8 py-4 rounded-2xl transition duration-300 tracking-wider text-sm uppercase"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      );
    }
  }

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!data?.id) return;
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', data.id);
      if (error) throw error;
      window.location.href = '/';
    } catch (e) {
      console.error(e);
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3efe9]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 pb-0 pt-4 md:px-6 md:pt-6">
        {/* Botão admin imperceptivel - dot no canto */}
        <div className="relative">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              title=""
              className="w-2 h-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-500 cursor-default"
              style={{ outline: 'none', border: 'none' }}
            />
          ) : (
            <div className="flex items-center gap-2 bg-black/5 backdrop-blur-sm rounded-xl px-3 py-1.5 animate-in fade-in duration-200">
              <span className="text-[0.6rem] text-black/40 uppercase tracking-wider">Excluir proposta?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-[0.6rem] text-red-500/70 hover:text-red-600 uppercase tracking-wider font-medium transition disabled:opacity-50"
              >
                {deleting ? '...' : 'Sim'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-[0.6rem] text-black/30 hover:text-black/50 uppercase tracking-wider transition"
              >
                Não
              </button>
            </div>
          )}
        </div>

        <p className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-black/40 md:block">
           Studio Search · {data.clientName || "Proposta"}
        </p>
      </div>

      <ProposalDocument personalization={data} standalone />
    </div>
  );
}
