/**
 * Fonte única dos dados da Marmoraria Graninvel. Header, rodapé, contato,
 * formulário, JSON-LD e todo link de WhatsApp importam daqui.
 *
 * Conferido em 04/10/2026:
 *  - Perfil da Empresa no Google (Apify): "Mármoraria Graninvel" (o acento
 *    está errado no próprio perfil), Estr. Philuvio Cerqueira Rodrigues, 91,
 *    Itaipava, Petrópolis-RJ, 25745-071, "Próximo ao Terminal", seg a sex
 *    7h30 às 18h, sáb 8h às 14h, 4,3 com 30 avaliações (25 de 5 estrelas e
 *    5 de 1 estrela).
 *  - Catálogo do WhatsApp Business: "Há mais de 15 anos no mercado
 *    fornecendo Mármores, Granitos, Superfícies Sintéticas e Pedras
 *    Decorativas. Transformando sonhos em realidade." e 10 pedras.
 * Pedido do cliente (04/10/2026): o site não mostra a média nem as
 * avaliações de 1 estrela; fala só das 25 avaliações de 5 estrelas.
 */
export const site = {
  nome: "Marmoraria Graninvel",
  nomeGoogle: "Mármoraria Graninvel",
  marca: "Graninvel",
  slogan: "Transformando sonhos em realidade.",
  descricao: "Marmoraria em Itaipava, Petrópolis: mármores, granitos, superfícies sintéticas e pedras decorativas sob medida, com medição, corte e instalação.",
  anos: "15",
  whatsapp: "+5524992328550",
  whatsappDisplay: "(24) 99232-8550",
  instagram: "https://www.instagram.com/graninvelmarmoraria/",
  instagramArroba: "@graninvelmarmoraria",
  google: "https://share.google/W16rPp80SgzB0Rp2F",
  placeId: "ChIJ9zt8ZpipmQAROtl_lZp00BQ",
  endereco: {
    rua: "Estr. Philuvio Cerqueira Rodrigues, 91",
    referencia: "Próximo ao Terminal",
    bairro: "Itaipava",
    cidade: "Petrópolis",
    uf: "RJ",
    cep: "25745-071",
  },
  geo: { lat: -22.3867608, lng: -43.1314659 },
  horario: [
    { dias: "Segunda a sexta", horas: "7h30 às 18h" },
    { dias: "Sábado", horas: "8h às 14h" },
    { dias: "Domingo", horas: "Fechado" },
  ],
  avaliacoes: { cincoEstrelas: 25 },
  cnpj: "[[CNPJ]]",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.graninvel.com.br"; // [[DOMÍNIO DEFINITIVO]]

export const PROVA_GOOGLE = `${site.avaliacoes.cincoEstrelas} avaliações 5 estrelas no Google`;
export const ENDERECO_LINHA = `${site.endereco.rua} - ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`;
export const PERFIL_GOOGLE = `https://www.google.com/maps/place/?q=place_id:${site.placeId}`;
export const ROTA = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}&destination_place_id=${site.placeId}`;

/** Mensagens pré-preenchidas por origem: o atendimento já sabe o assunto. */
export const MENSAGENS = {
  hero: "Olá! Vim pelo site da Graninvel e gostaria de um orçamento.",
  material: (nome: string) => `Olá! Vim pelo site e tenho interesse em ${nome.toLowerCase()}. Pode me ajudar?`,
  ambiente: (nome: string) => `Olá! Vi os projetos de ${nome.toLowerCase()} no site e gostaria de um orçamento.`,
  pedra: (nome: string) => `Olá! Vim pelo site e quero saber tamanhos e valores: ${nome}.`,
  galeria: "Olá! Vi os projetos no site e gostaria de um orçamento.",
  medicao: "Olá! Gostaria de agendar a medição do meu projeto.",
  visita: "Olá! Quero visitar a loja em Itaipava. Qual o melhor horário?",
  contato: "Olá! Gostaria de conversar sobre um projeto.",
} as const;

export const NAV = [
  { href: "#sobre", rotulo: "A Graninvel" },
  { href: "#projetos", rotulo: "Projetos" },
  { href: "#materiais", rotulo: "Materiais" },
  { href: "#pedras", rotulo: "Pedras" },
  { href: "#avaliacoes", rotulo: "Avaliações" },
  { href: "#contato", rotulo: "Contato" },
] as const;

/* ---- Copy por seção (estrutura da Cabana Afrodite) --------------------- */

export const HERO = {
  eyebrow: "Marmoraria em Itaipava · Petrópolis",
  h1Prefixo: "Marmoraria Graninvel em Itaipava, Petrópolis: ",
  titulo: "A pedra certa para",
  destaque: "cada detalhe",
  final: "da sua casa.",
  subtitulo: `Mármores, granitos, superfícies sintéticas e pedras decorativas. Há mais de ${site.anos} anos em Itaipava, da escolha da chapa à instalação.`,
  ctaPrincipal: "Pedir orçamento",
  ctaSecundario: "Falar no WhatsApp",
  selos: [`Mais de ${site.anos} anos`, "Medição no local", "Corte e instalação", PROVA_GOOGLE],
} as const;

export const NUMEROS = {
  itens: [
    { valor: `+${site.anos}`, rotulo: "anos em Itaipava" },
    { valor: "4", rotulo: "famílias de pedra" },
    { valor: "10", rotulo: "pedras decorativas no catálogo" },
    { valor: String(site.avaliacoes.cincoEstrelas), rotulo: "avaliações de 5 estrelas no Google" },
  ],
  legenda: "Loja e pátio de pedras perto do Terminal de Itaipava",
} as const;

export const SOBRE = {
  eyebrow: "A Graninvel",
  titulo: "Pedra natural, cortada para o seu projeto.",
  poetico: "Do galpão à sua casa, cada peça é medida, cortada e instalada pela nossa equipe.",
  paragrafos: [
    `Há mais de ${site.anos} anos em Itaipava, a Graninvel fornece mármores, granitos, superfícies sintéticas e pedras decorativas para cozinhas, banheiros, escadas, áreas gourmet e áreas externas.`,
    "Na loja você vê as chapas ao vivo, compara cores e acabamentos e sai com o projeto encaminhado. A medição é feita no local, para a pedra chegar do tamanho certo.",
  ],
  chips: ["Medição no local", "Corte sob medida", "Instalação pela equipe", "Showroom em Itaipava"],
} as const;

export const DESTAQUES = {
  eyebrow: "Como trabalhamos",
  /* [[CONFIRMAR ETAPAS COM O CLIENTE]]: deduzidas das avaliações reais (a
     medição feita pelo Sr. Manuel, a entrega e a instalação). */
  itens: [
    { titulo: "Escolha da pedra", texto: "Na loja em Itaipava você vê as chapas, compara cores e acabamentos." },
    { titulo: "Medição no local", texto: "Medimos o ambiente para a peça chegar do tamanho certo." },
    { titulo: "Corte e instalação", texto: "A pedra é cortada, acabada e instalada pela nossa equipe." },
  ],
} as const;

export const FRASE = {
  poetico: "Bancada, escada, piscina ou fachada:",
  destaque: "a pedra que fica para sempre.",
  mencoes: [
    { valor: String(site.avaliacoes.cincoEstrelas), rotulo: "avaliações de 5 estrelas no Google" },
    { valor: `+${site.anos}`, rotulo: "anos de marmoraria" },
  ],
} as const;

export const AMBIENTES_TEXTO = {
  eyebrow: "Projetos entregues",
  titulo: "Cada ambiente, uma pedra.",
  texto: "Toque num ambiente para ver as fotos.",
  verTodas: (n: number) => `Ver ${n} ${n === 1 ? "foto" : "fotos"}`,
  cta: "Quero um projeto assim",
} as const;

export const MATERIAIS_TEXTO = {
  eyebrow: "Materiais",
  titulo: "Quatro famílias de pedra.",
  texto: "Você escolhe a pedra e a gente cuida do corte, do acabamento e da instalação.",
  cta: "Consultar",
} as const;

export const PEDRAS_TEXTO = {
  eyebrow: "Pedras decorativas",
  titulo: "Para muros, fachadas e jardins.",
  texto: "As pedras do catálogo da Graninvel. Toque numa amostra para consultar tamanhos e valores.",
  cta: "Consultar",
} as const;

export const INSTAGRAM = {
  eyebrow: "Instagram",
  titulo: "Nos bastidores da pedra.",
  texto: "Chapas chegando no galpão, bancadas prontas e projetos entregues. Toque para assistir.",
  videos: [
    { id: "chapas-no-galpao", titulo: "Reposição no galpão", legenda: "Chapas de granito chegando e sendo içadas na ponte rolante." },
    { id: "granito-via-lactea", titulo: "Granito preto Via Láctea", legenda: "Bancada de cozinha com o granito escuro de veios brancos." },
    { id: "ilha-branca", titulo: "Ilha branca", legenda: "Ilha de cozinha com a pedra descendo até o piso." },
  ],
  conviteTitulo: "Siga a Graninvel",
  conviteTexto: "Projetos entregues, chegada de material e novidades da loja.",
  conviteCta: "Seguir no Instagram",
} as const;

export const AVALIACOES_TEXTO = {
  eyebrow: "Avaliações",
  titulo: "O que dizem de quem já tem pedra da Graninvel.",
  resumoTitulo: String(site.avaliacoes.cincoEstrelas),
  resumoTexto: "avaliações de 5 estrelas no perfil da Graninvel no Google.",
  link: "Ver todas no Google",
} as const;

export const LOCAL = {
  eyebrow: "Localização",
  titulo: "Venha ver a pedra de perto.",
  texto: "A loja fica em Itaipava, perto do Terminal. Lá você vê as chapas e as pedras decorativas ao vivo.",
  rota: "Como chegar",
  mapa: "Abrir no Google Maps",
  cta: "Agendar visita",
} as const;

export const CONTATO = {
  eyebrow: "Orçamento",
  titulo: "Conte o seu projeto.",
  texto: "O caminho mais rápido é o WhatsApp. Se preferir, deixe seus dados e a gente chama você.",
  passos: [
    { titulo: "Você conta o projeto", texto: "Ambiente, medidas aproximadas e a pedra que imagina." },
    { titulo: "A gente orienta", texto: "Indicamos a pedra e o acabamento certos para o uso." },
    { titulo: "Medição e orçamento", texto: "Medimos no local e fechamos o valor." },
  ],
  ctaWhatsapp: "Chamar no WhatsApp",
  formTitulo: "Prefere que a gente chame você?",
  enviar: "Enviar pedido",
  sucessoTitulo: "Pedido recebido.",
  sucessoTexto: `Vamos responder pelo WhatsApp que você informou. Se preferir, chame agora no ${site.whatsappDisplay}.`,
  /* [[DEFINIR DESTINO DO FORMULÁRIO: e-mail, Resend ou webhook]] */
} as const;

export const CHAMADA_FINAL = {
  titulo: "Sua bancada começa na nossa loja.",
  cta: "Pedir orçamento",
  apoio: `Ou chame no ${site.whatsappDisplay}`,
} as const;

export const AMBIENTES_FORM: [string, ...string[]] = ["Cozinha", "Banheiro", "Área gourmet", "Escada", "Área externa ou piscina", "Pedras decorativas", "Outro"];
