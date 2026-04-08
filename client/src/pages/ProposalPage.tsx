import { useEffect, useState } from "react";
import { useParams } from "wouter";
import ProposalDocument from "@/components/ProposalDocument";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { PersonalizationState } from "@/hooks/usePersonalization";
import { translations } from "@/lib/translations";

export default function ProposalPage() {
  const params = useParams();
  const idValue = params.id || params.slug;
  const [data, setData] = useState<(PersonalizationState & { formattedTotal: string; totalValue: number; id?: string }) | null>(null);
  const [loading, setLoading] = useState(!!idValue);

  useEffect(() => {
    if (idValue) {
      fetch(`/api/proposals/${idValue}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [idValue]);

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

  return (
    <div className="min-h-screen bg-[#f3efe9]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 pb-0 pt-4 md:px-6 md:pt-6">
        <div></div>
        <p className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-black/40 md:block">
           Studio Search · {data.clientName || "Proposta"}
        </p>
      </div>

      <ProposalDocument personalization={data} standalone />
    </div>
  );
}
