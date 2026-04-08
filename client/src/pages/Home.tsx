import { usePersonalization } from "@/hooks/usePersonalization";
import { translations } from "@/lib/translations";
import { serviceModules } from "@/lib/proposals";
import ProposalDocument from "@/components/ProposalDocument";
import { Globe, User, Briefcase, CreditCard, Download, Share2 } from "lucide-react";

import logoImg from "@/assets/logo.png";

export default function Home() {
  const p = usePersonalization();
  const t = translations[p.language];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await response.json();
      const shareUrl = `${window.location.origin}/view/${data.id}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(`Link da proposta gerado e copiado: ${shareUrl}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar link de compartilhamento");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3efe9]">
      <div className="mx-auto max-w-[1600px] px-4 py-4 md:px-6 md:py-6">
        <div className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="space-y-4 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)] xl:overflow-y-auto pr-2 custom-scrollbar no-print">
            {/* Header */}
            <div className="rounded-[28px] border border-black/8 bg-[#f7f4ef] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center rounded-xl bg-[#1c1f24] p-2 overflow-hidden border border-white/5">
                  <img src={logoImg} alt="Studio Search" className="h-8 w-auto invert brightness-[200%] mix-blend-screen scale-110" />
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-black/35">Studio Search</p>
                  <p className="mt-1 text-sm font-medium text-black/70">{t.sidebar.title}</p>
                </div>
              </div>
            </div>

            {/* Language & Currency */}
            <div className="rounded-[28px] border border-black/8 bg-white/70 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="size-4 text-black/40" />
                <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-black/40 font-semibold">{t.sidebar.language} & {t.sidebar.currency}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex bg-[#f3efe9] rounded-xl p-1">
                  <button 
                    onClick={() => p.updateField("language", "pt")}
                    className={`flex-1 py-2 text-[0.65rem] uppercase tracking-wider rounded-lg transition ${p.language === "pt" ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"}`}
                  >
                    PT
                  </button>
                  <button 
                    onClick={() => p.updateField("language", "it")}
                    className={`flex-1 py-2 text-[0.65rem] uppercase tracking-wider rounded-lg transition ${p.language === "it" ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"}`}
                  >
                    IT
                  </button>
                </div>
                <div className="flex bg-[#f3efe9] rounded-xl p-1">
                  <button 
                    onClick={() => p.updateField("currency", "BRL")}
                    className={`flex-1 py-2 text-[0.65rem] uppercase tracking-wider rounded-lg transition ${p.currency === "BRL" ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"}`}
                  >
                    R$
                  </button>
                  <button 
                    onClick={() => p.updateField("currency", "EUR")}
                    className={`flex-1 py-2 text-[0.65rem] uppercase tracking-wider rounded-lg transition ${p.currency === "EUR" ? "bg-white shadow-sm text-black" : "text-black/40 hover:text-black"}`}
                  >
                    €
                  </button>
                </div>
              </div>
            </div>

            {/* Client Data */}
            <div className="rounded-[28px] border border-black/8 bg-white/70 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <User className="size-4 text-black/40" />
                <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-black/40 font-semibold">{t.sidebar.clientData}</h3>
              </div>
              <input 
                type="text"
                value={p.clientName}
                onChange={(e) => p.updateField("clientName", e.target.value)}
                placeholder={t.sidebar.clientName}
                className="w-full bg-[#f3efe9] border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#c8ff1a] transition"
              />
            </div>

            {/* Services */}
            <div className="rounded-[28px] border border-black/8 bg-white/70 p-6 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="size-4 text-black/40" />
                <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-black/40 font-semibold">{t.sidebar.services}</h3>
              </div>
              <div className="space-y-3">
                {serviceModules.map((s) => (
                  <div key={s.id} className="space-y-2">
                    <label 
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${p.services.includes(s.id) ? "bg-[#c8ff1a]/10 border border-[#c8ff1a]/30" : "bg-[#f3efe9] border border-transparent hover:bg-[#ebf0e6]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={p.services.includes(s.id)}
                          onChange={() => p.toggleService(s.id)}
                          className="rounded border-black/10 text-[#212429] focus:ring-0"
                        />
                        <span className="text-[0.68rem] font-medium text-black/80">{s.title[p.language]}</span>
                      </div>
                    </label>
                    {p.services.includes(s.id) && (
                      <div className="flex items-center gap-2 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="text-[0.55rem] uppercase tracking-wider text-black/30 font-bold whitespace-nowrap">Valor ({p.currency === "BRL" ? "R$" : "€"})</span>
                        <input 
                          type="number"
                          value={p.serviceValues[s.id] || 0}
                          onChange={(e) => p.updateServiceValue(s.id, Number(e.target.value))}
                          className="flex-1 bg-white border border-black/5 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-[#c8ff1a] transition outline-none shadow-sm h-8"
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Financial */}
            <div className="rounded-[28px] border border-black/8 bg-[#1c1f24] p-6 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="size-4 text-white/40" />
                <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 font-semibold">{t.sidebar.financial}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-wider text-white/30 mb-2">{t.sidebar.investment} (Soma)</p>
                    <p className="text-2xl font-light tracking-tighter text-[#c8ff1a]">{p.formattedTotal}</p>
                  </div>
                  <div className="w-24">
                    <p className="text-[0.6rem] uppercase tracking-wider text-white/30 mb-2">Meses/Rec.</p>
                    <input 
                      type="number"
                      min="1"
                      value={p.installments}
                      onChange={(e) => p.updateField("installments", Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#c8ff1a] transition outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <label className="block text-[0.6rem] uppercase tracking-wider text-white/30 mb-2 font-medium">
                    {t.sidebar.entry}
                  </label>
                  <input 
                    type="number"
                    value={p.entryValue}
                    onChange={(e) => p.updateField("entryValue", Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-[#c8ff1a] transition outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[0.6rem] uppercase tracking-wider text-white/30 mb-2 font-medium">
                    {t.sidebar.paymentTerms}
                  </label>
                  <input 
                    type="text"
                    value={p.paymentCondition}
                    onChange={(e) => p.updateField("paymentCondition", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-[#c8ff1a] transition outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button 
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl transition group border border-white/10"
                >
                  <Share2 className="size-4 group-hover:scale-110 transition opacity-60" />
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] font-bold">Gerar Link</span>
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex flex-col items-center justify-center gap-2 bg-[#c8ff1a] hover:bg-[#d9ff4d] text-black py-4 rounded-2xl transition group shadow-glow"
                >
                  <Download className="size-4 group-hover:scale-110 transition" />
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] font-bold text-black/80">Gerar PDF</span>
                </button>
              </div>
            </div>
          </aside>

          <main className="min-h-screen">
            <ProposalDocument 
              personalization={p}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
