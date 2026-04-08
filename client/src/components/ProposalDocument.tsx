import { Check } from "lucide-react";
import { translations } from "@/lib/translations";
import { serviceModules } from "@/lib/proposals";
import type { PersonalizationState } from "@/hooks/usePersonalization";

import logoImg from "../assets/logo.png";
import coverSideImg from "../assets/cover-side.png";

type ProposalDocumentProps = {
  personalization: PersonalizationState & { 
    formattedTotal: string;
    totalValue: number;
  };
  standalone?: boolean;
};

export default function ProposalDocument({ personalization: p, standalone = false }: ProposalDocumentProps) {
  const t = translations[p.language].document;
  const selectedModules = serviceModules.filter(m => p.services.includes(m.id));

  return (
    <div className={standalone ? "min-h-screen bg-[#f3efe9] px-0 py-0" : "print:p-0"}>
      <div className={standalone ? "mx-auto max-w-[1120px]" : "w-full"}>
        <div className="space-y-4 print:space-y-0">
          
          {/* Header & Cover */}
          <section className="relative overflow-hidden rounded-[34px] bg-[#212429] text-white shadow-[0_30px_100px_rgba(16,18,22,0.24)] min-h-[720px] print:rounded-none print:shadow-none">
            <div className="absolute inset-0 bg-[#212429]" />
            <div className="absolute left-0 top-[78%] h-[1px] w-[120px] bg-[#c8ff1a] shadow-[0_0_18px_2px_rgba(200,255,26,0.4)]" />

            <div className="relative z-10 flex h-full min-h-[720px] flex-col px-8 py-8 md:px-12 md:py-10">
              <div className="flex items-start justify-between gap-4">
                <div className="relative flex items-center justify-center p-2 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
                  <img src={logoImg} alt="Studio Search" className="h-8 w-auto md:h-12 invert brightness-[200%] mix-blend-screen grayscale" />
                </div>
                <p className="pt-2 text-xl font-light tracking-[0.02em] text-white/50 md:text-2xl uppercase">Proposta</p>
              </div>

              <div className="mt-16 max-w-[820px] md:mt-24">
                <p contentEditable suppressContentEditableWarning className="text-[0.72rem] uppercase tracking-[0.32em] text-white/38 outline-none">{t.commercialProposal}</p>
                <h1 className="text-balance mt-8 text-[3.2rem] font-extralight leading-[0.98] tracking-[-0.045em] text-white md:text-[5.4rem]">
                  <span contentEditable suppressContentEditableWarning className="outline-none focus:text-[#c8ff1a]">{t.merit}</span>
                  <br />
                  <span contentEditable suppressContentEditableWarning className="outline-none focus:text-[#c8ff1a] text-[#c8ff1a] opacity-90">{t.direction}</span>
                </h1>
              </div>

              <div className="mt-auto grid gap-5 pt-10 md:grid-cols-[1fr_auto] md:items-end">
                <div className="space-y-4">
                  <p className="text-sm font-light tracking-[0.06em] text-white/40">{p.date} · {p.clientName}</p>
                  <div className="flex flex-wrap gap-2 max-w-[600px]">
                    {selectedModules.map((m) => (
                      <span key={m.id} className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                        {m.title[p.language]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intro Section */}
          <section className="relative overflow-hidden rounded-[34px] border border-black/8 bg-[#f5f2ed] shadow-sm min-h-[500px] print:rounded-none print:break-before-page">
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(32,35,41,1)_1px,transparent_1px),linear-gradient(90deg,rgba(32,35,41,1)_1px,transparent_1px)] [background-size:60px_60px]" />
            
            <div className="absolute inset-y-0 right-0 w-[40%] xl:w-[35%] overflow-hidden hidden md:block print:block">
               <img src={coverSideImg} alt="" className="h-full w-full object-cover object-right opacity-90" />
            </div>

            <div className="relative z-10 grid gap-12 px-8 py-10 md:px-12 md:py-16 lg:grid-cols-[1fr_0.8fr]">
              <div className="max-w-[700px]">
                <h2 className="text-[2.6rem] font-extralight leading-[0.95] tracking-[-0.05em] text-[#1f2328] md:text-[4.2rem]">
                  Olá,
                  <br />
                  <span className="text-[#3c3f44]">{p.clientName}</span>
                </h2>
                <div className="mt-10 h-px w-24 bg-[#c8ff1a]" />
                <p contentEditable suppressContentEditableWarning className="mt-10 text-[1.1rem] font-light leading-9 text-black/60 outline-none border-[#c8ff1a] italic">
                  {t.studioIntro}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {selectedModules.map(m => (
                    <span key={m.id} className="rounded-full border border-black/10 bg-white/50 px-5 py-2 text-[0.7rem] uppercase tracking-widest text-black/60 backdrop-blur-sm">
                      {m.title[p.language]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Deliverables Modules */}
          <div className="space-y-4 print:space-y-8">
             {selectedModules.map((m) => (
                <section key={m.id} className="relative overflow-hidden rounded-[34px] border border-black/8 bg-[#f5f2ed] p-8 md:p-12 shadow-sm print:rounded-none print:break-before-page">
                   <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-black/40 mb-3">{t.solutionProposed}</p>
                        <div className="flex items-center gap-3 mb-6">
                           <h3 contentEditable suppressContentEditableWarning className="text-[2.2rem] font-extralight leading-none tracking-tighter text-black outline-none">{m.title[p.language]}</h3>
                           <span className={`px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-wider font-medium ${m.isRecurring ? "bg-[#c8ff1a]/20 text-black/70" : "bg-black/5 text-black/40"}`}>
                             {m.isRecurring ? (p.language === 'pt' ? 'Mensal' : 'Mensile') : (p.language === 'pt' ? 'Projeto' : 'Progetto')}
                           </span>
                        </div>
                        <p contentEditable suppressContentEditableWarning className="mt-6 text-sm leading-7 text-black/50 outline-none">{m.description[p.language]}</p>
                        
                        {!m.isRecurring && (
                          <div className="mt-8 pt-8 border-t border-black/5">
                             <p className="text-[0.6rem] uppercase tracking-widest text-black/30 mb-1">
                               {p.language === 'pt' ? 'Investimento do Projeto' : 'Investimento del Progetto'}
                             </p>
                             <p className="text-2xl font-light text-black/80">
                               {new Intl.NumberFormat(p.language === 'pt' ? 'pt-BR' : 'it-IT', { style: 'currency', currency: p.currency === 'BRL' ? 'BRL' : 'EUR' }).format(p.serviceValues[m.id] || 0)}
                             </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        {m.deliverables.map((d, i) => (
                          <div key={i} className="bg-white/60 rounded-[28px] border border-black/5 p-6 backdrop-blur-sm">
                             <h4 contentEditable suppressContentEditableWarning className="text-lg font-medium tracking-tight mb-4 outline-none">{d.title[p.language]}</h4>
                             <ul className="space-y-3">
                               {d.items[p.language].map((item, ii) => (
                                 <li key={ii} className="flex items-start gap-4">
                                    <div className="mt-1.5 size-4 rounded-full bg-[#c8ff1a] flex items-center justify-center shrink-0">
                                      <Check className="size-3 text-black" />
                                    </div>
                                    <span contentEditable suppressContentEditableWarning className="text-[0.95rem] font-light leading-7 text-black/70 outline-none w-full">{item}</span>
                                 </li>
                               ))}
                             </ul>
                          </div>
                        ))}
                      </div>
                   </div>
                </section>
             ))}
          </div>

          {/* Timeline & Payment */}
          <section className="grid gap-4 lg:grid-cols-2 print:grid-cols-1 print:break-before-page">
            <div className="rounded-[34px] border border-black/8 bg-[#f5f2ed] p-8 md:p-12 shadow-sm print:rounded-none">
               <h3 contentEditable suppressContentEditableWarning className="text-3xl font-extralight tracking-tighter mb-8 outline-none">{t.timeline}</h3>
               <div className="space-y-4 font-light text-black/60">
                  {["Briefing e Imersão Estretégica", "Direção Criativa e Conceito", "Desenvolvimento e Aprovações", "Entrega Final e Publicação"].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/50 rounded-2xl">
                      <span className="text-[#c8ff1a] font-medium">{String(i + 1).padStart(2, '0')}</span>
                      <p contentEditable suppressContentEditableWarning className="outline-none">{step}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div id="commercial-conditions" className="rounded-[34px] bg-[#212429] p-8 md:p-12 shadow-xl text-white relative overflow-hidden print:rounded-none">
               <div className="absolute right-0 top-0 h-full w-2 bg-[#b9a6ff]" />
               <h3 contentEditable suppressContentEditableWarning className="text-3xl font-extralight tracking-tighter mb-8 outline-none">{t.financialConditions}</h3>
               
               <div className="space-y-6">
                  {/* Breakout: Projeto + Entrada */}
                  {selectedModules.some(m => !m.isRecurring) && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-2 font-medium">
                        {selectedModules.filter(m => !m.isRecurring).map(m => m.title[p.language]).join(" + ")}
                      </p>
                      <p className="text-2xl font-light text-white tracking-tight">
                        {new Intl.NumberFormat(p.language === 'pt' ? 'pt-BR' : 'it-IT', { style: 'currency', currency: p.currency === 'BRL' ? 'BRL' : 'EUR' }).format(
                          selectedModules.filter(m => !m.isRecurring).reduce((acc, m) => acc + (p.serviceValues[m.id] || 0), 0)
                        )}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">entrada +</p>
                      <p className="text-xl font-light">{new Intl.NumberFormat(p.language === 'pt' ? 'pt-BR' : 'it-IT', { style: 'currency', currency: p.currency === 'BRL' ? 'BRL' : 'EUR' }).format(p.entryValue)}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">
                        {p.language === 'pt' ? 'Serviços Mensais' : 'Servizi Mensili'} 
                      </p>
                      <p className="text-xl font-light">
                        {p.installments}x de {new Intl.NumberFormat(p.language === 'pt' ? 'pt-BR' : 'it-IT', { style: 'currency', currency: p.currency === 'BRL' ? 'BRL' : 'EUR' }).format(
                          selectedModules.filter(m => m.isRecurring).reduce((acc, m) => acc + (p.serviceValues[m.id] || 0), 0)
                        )}
                      </p>
                      <p className="text-[0.6rem] text-white/30 truncate mt-1">({selectedModules.filter(m => m.isRecurring).map(m => m.title[p.language]).join(", ")})</p>
                    </div>
                  </div>
                   <div className="mt-2 text-xs text-white/30 italic">
                    * {p.paymentCondition}
                   </div>
               </div>
            </div>
          </section>

          {/* Footer Card - Kick-off & WhatsApp */}
          <section className="rounded-[34px] border border-black/8 bg-[#f5f2ed] p-10 md:p-16 text-center shadow-sm relative overflow-hidden print:rounded-none print:break-before-page">
             <div className="max-w-[850px] mx-auto relative z-10">
               <p contentEditable suppressContentEditableWarning className="text-2xl md:text-3xl font-extralight tracking-tight text-black/80 leading-[1.4] mb-12 outline-none focus:text-black">
                 {t.closing}
               </p>
               
               <a 
                 href="https://wa.me/5511997711480" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 bg-[#c8ff1a] hover:bg-[#d9ff4d] text-black font-semibold px-10 py-5 rounded-2xl transition duration-300 group shadow-lg no-print"
               >
                 <span className="text-sm uppercase tracking-[0.15em]">{t.whatsapp}</span>
               </a>

               <div className="mt-16 flex flex-wrap justify-center gap-8">
                  <div className="text-[0.6rem] uppercase tracking-[0.25em] text-black/40 font-medium">contato@studiosearch.com.br</div>
                  <div className="text-[0.6rem] uppercase tracking-[0.25em] text-black/40 font-medium">@studiosearch_</div>
               </div>
             </div>

             {/* Background branding element */}
             <div className="absolute -bottom-12 -right-12 size-64 bg-black/5 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c8ff1a]" />
          </section>

        </div>
      </div>
    </div>
  );
}
