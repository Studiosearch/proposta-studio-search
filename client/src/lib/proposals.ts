import type { Language } from "./translations";

export type ServiceModule = {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  isRecurring: boolean;
  deliverables: {
    title: Record<Language, string>;
    intro?: Record<Language, string>;
    items: Record<Language, string[]>;
  }[];
  defaultPrice: number;
};

export const serviceModules: ServiceModule[] = [
  {
    id: "site-single",
    title: { pt: "Site de Página Única", it: "Sito Web Pagina Singola" },
    description: { pt: "Criação de um site one-page objetivo e direto focado na marca.", it: "Creazione di un sito one-page obiettivo e diretto focalizzato sul brand." },
    isRecurring: false,
    defaultPrice: 2000,
    deliverables: [{ 
      title: { pt: "Especificações Técnicas", it: "Specifiche Tecniche" }, 
      items: { 
        pt: ["Uma página única", "Animações personalizadas", "Aplicação de Branding", "Acervo de imagens ou imagens enviadas", "Copyright profissional", "SEO (Otimização para buscadores)", "Conexões com redes sociais e Google", "Menu âncora", "Otimizações de tráfego orgânico"], 
        it: ["Pagina singola", "Animazioni personalizzate", "Applicazione di Branding", "Archivio immagini o immagini inviate", "Copyright professionale", "SEO (Ottimizzazione motori di ricerca)", "Connessioni con social e Google", "Menu ancora", "Ottimizzazioni per traffico organico"] 
      } 
    }]
  },
  {
    id: "landing-page",
    title: { pt: "Landing Page", it: "Landing Page" },
    description: { pt: "Página focada 100% em conversão de vendas e captura de leads.", it: "Pagina focalizzata al 100% sulla conversione delle vendite e lead generation." },
    isRecurring: false,
    defaultPrice: 2500,
    deliverables: [{ 
      title: { pt: "Especificações Técnicas", it: "Specifiche Tecniche" }, 
      items: { 
        pt: ["Uma página única", "Animações personalizadas", "Aplicação de Branding", "Acervo de imagens ou imagens enviadas", "Copyright focado em conversão", "SEO básico", "Conexões com redes sociais e Google", "Otimizações de tráfego orgânico"], 
        it: ["Pagina singola", "Animazioni personalizzate", "Applicazione di Branding", "Archivio immagini o immagini inviate", "Copyright focalizzato sulla conversione", "SEO base", "Connessioni con social e Google", "Ottimizzazioni per traffico organico"] 
      } 
    }]
  },
  {
    id: "site-multiple",
    title: { pt: "Site Completo (Até 6 Páginas)", it: "Sito Web Completo (Fino a 6 pagine)" },
    description: { pt: "Site institucional completo com estrutura robusta e captação inclusa.", it: "Sito istituzionale completo con struttura robusta e acquisizione inclusa." },
    isRecurring: false,
    defaultPrice: 5000,
    deliverables: [{ 
      title: { pt: "Especificações Técnicas", it: "Specifiche Tecniche" }, 
      items: { 
        pt: ["Até 6 páginas", "Animações avançadas", "Aplicação de Branding", "Captação de Conteúdo inclusa", "Copyright estrutural", "SEO avançado", "Conexões com redes sociais e Google", "Menu de navegação", "Otimizações de tráfego orgânico"], 
        it: ["Fino a 6 pagine", "Animazioni avanzate", "Applicazione di Branding", "Acquisizione contenuti inclusa", "Copyright strutturale", "SEO avanzato", "Connessioni con social e Google", "Menu di navigazione", "Ottimizzazioni per traffico organico"] 
      } 
    }]
  },
  {
    id: "brandbook-simple",
    title: { pt: "Brandbook Simples", it: "Brandbook Semplice" },
    description: { pt: "Identidade visual básica e funcional para início de marca.", it: "Identità visiva base e funzionale per l'avvio del brand." },
    isRecurring: false,
    defaultPrice: 1500,
    deliverables: [{ 
      title: { pt: "Entregáveis", it: "Consegnabili" }, 
      items: { 
        pt: ["Logomarca (Reduzida, Vertical e Horizontal)", "Paleta de Cores", "Tipografia", "Elemento Visual", "Pattern (Estampa)", "Aplicações de marca", "Material de Branding (JPEG, PNG, PDF e AI)"], 
        it: ["Logo (Ridotto, Verticale e Orizzontale)", "Tavolozza Colori", "Tipografia", "Elemento Visivo", "Pattern", "Applicazioni del brand", "Materiale di Branding (JPEG, PNG, PDF e AI)"] 
      } 
    }]
  },
  {
    id: "brandbook-medium",
    title: { pt: "Brandbook Intermediário", it: "Brandbook Intermedio" },
    description: { pt: "Identidade visual com aplicações e guia de uso mais amplo.", it: "Identità visiva con applicazioni e guida all'uso più ampia." },
    isRecurring: false,
    defaultPrice: 3000,
    deliverables: [{ 
      title: { pt: "Entregáveis", it: "Consegnabili" }, 
      items: { 
        pt: ["Logomarca (Reduzida, Vertical e Horizontal)", "Paleta de Cores", "Tipografia", "Elemento Visual", "Pattern (Estampa)", "Aplicações de marca expandidas", "Material de Branding (JPEG, PNG, PDF e AI)"], 
        it: ["Logo (Ridotto, Verticale e Orizzontale)", "Tavolozza Colori", "Tipografia", "Elemento Visivo", "Pattern", "Applicazioni del brand espanse", "Materiale di Branding (JPEG, PNG, PDF e AI)"] 
      } 
    }]
  },
  {
    id: "brandbook-full",
    title: { pt: "Brandbook Completo", it: "Brandbook Completo" },
    description: { pt: "Manual de marca profundo e estratégico com diretrizes completas.", it: "Manuale di marca profondo e strategico con linee guida complete." },
    isRecurring: false,
    defaultPrice: 5000,
    deliverables: [{ 
      title: { pt: "Entregáveis", it: "Consegnabili" }, 
      items: { 
        pt: ["Logomarca (Reduzida, Vertical e Horizontal)", "Paleta de Cores", "Tipografia", "Elemento Visual", "Pattern (Estampa)", "Conceito da Marca", "Social Media Guideline", "Aplicações completas", "Ficha Técnica", "Material de Branding (JPEG, PNG, PDF e AI)"], 
        it: ["Logo (Ridotto, Verticale e Orizzontale)", "Tavolozza Colori", "Tipografia", "Elemento Visivo", "Pattern", "Concetto del Brand", "Social Media Guideline", "Applicazioni complete", "Scheda Tecnica", "Materiale di Branding (JPEG, PNG, PDF e AI)"] 
      } 
    }]
  },
  {
    id: "social-media",
    title: { pt: "Gestão de Mídias Sociais", it: "Gestione Social Media" },
    description: { pt: "Gestão completa e estratégica de presença digital.", it: "Gestione completa e strategica della presenza digitale." },
    isRecurring: true,
    defaultPrice: 2500,
    deliverables: [{ 
      title: { pt: "Escopo de Trabalho", it: "Scopo del Lavoro" }, 
      items: { 
        pt: ["Agendamento de postagem dos conteúdos", "Desenvolvimento de legendas estratégicas", "Análise de resultados semanais", "Análise de resultados mensais", "Estratégias mensais personalizadas", "Desenvolvimento de até 7 conteúdos por semana (Vídeos, Designs e Imagens)", "Linha Editorial para aprovação"], 
        it: ["Programmazione dei post dei contenuti", "Sviluppo di didascalie strategiche", "Analisi dei risultati settimanali", "Analisi dei risultati mensili", "Strategie mensili personalizzate", "Sviluppo di fino a 7 contenuti a settimana (Video, Design e Immagini)", "Linea Editoriale per approvazione"] 
      } 
    }]
  },
  {
    id: "paid-traffic",
    title: { pt: "Tráfego Pago Redes Sociais", it: "Ads e Traffico Social" },
    description: { pt: "Campanhas estratégicas para acelerar o seu alcance e vendas.", it: "Campagne strategiche per accelerare la tua copertura e le vendite." },
    isRecurring: true,
    defaultPrice: 2000,
    deliverables: [{ 
      title: { pt: "Escopo de Trabalho", it: "Scopo del Lavoro" }, 
      items: { 
        pt: ["Até 4 criativos mensais", "Campanhas ilimitadas", "Relatórios Semanais", "Reunião Mensal de alinhamento"], 
        it: ["Fino a 4 contenuti creativi mensili", "Campagne illimitate", "Report Settimanali", "Riunione Mensile di allineamento"] 
      } 
    }]
  },
  {
    id: "content-capture",
    title: { pt: "Captação de Conteúdo", it: "Acquisizione Contenuti" },
    description: { pt: "Sessões focadas na essência visual da marca.", it: "Sessioni focalizzate sull'essenza visiva del brand." },
    isRecurring: true,
    defaultPrice: 1500,
    deliverables: [{ 
      title: { pt: "Escopo da Sessão", it: "Scopo della Sessione" }, 
      items: { 
        pt: ["1 sessão de captação presencial/direcionada", "Fotografias ilimitadas durante a sessão", "Até 8 Vídeos de até 1 min", "Pós edição completa de todos os conteúdos"], 
        it: ["1 sessione di acquisizione", "Fotografie illimitate durante la sessione", "Fino a 8 Video fino a 1 min", "Post-produzione completa di tutti i contenuti"] 
      } 
    }]
  },
];
