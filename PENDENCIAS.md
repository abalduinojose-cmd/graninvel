# Pendências · Marmoraria Graninvel

Dados reais já no site (conferidos em 04/10/2026):

- **Perfil da Empresa no Google** (Apify): endereço, "Próximo ao Terminal",
  horário (seg a sex 7h30 às 18h, sáb 8h às 14h), nota **4,3 com 30
  avaliações**, 8 avaliações de 5 estrelas com texto e foto do avaliador, e
  as fotos de projetos em resolução original (60 baixadas, 17 usadas).
- **Catálogo do WhatsApp Business**: frase da empresa ("Há mais de 15 anos
  no mercado... Transformando sonhos em realidade."), as 10 pedras
  decorativas com nome e foto, e a logo (foto de perfil, 640px).
- **Instagram**: os 3 vídeos enviados pelo Anderson.

## A confirmar com o cliente

| Item | Onde está | Observação |
| --- | --- | --- |
| **Etapas do processo** | `DESTAQUES` em `src/content/site.ts` ("Como trabalhamos") | Deduzidas das avaliações reais (medição pelo Sr. Manuel, entrega e instalação). |
| **Legendas das fotos e vídeos** | `src/content/galeria.ts`, `INSTAGRAM` | Descrevem o que se vê, sem afirmar o tipo exato de pedra (só o "Via Láctea" vem da legenda do próprio vídeo). |
| **Fotos das famílias de pedra** | `src/content/materiais.ts` | Ilustram a família (mármore, sintético) sem afirmar o material da peça. Se tiver foto de uma bancada de mármore e de uma de sintético, troco. |
| **CNPJ** | `site.cnpj` | Aparece no rodapé como etiqueta tracejada "CNPJ" até ser preenchido. |
| **Domínio definitivo** | `SITE_URL` em `site.ts` | Hoje `www.graninvel.com.br`. |
| **Destino do formulário** | `src/app/actions.ts` | Hoje vai para o log do servidor; na prévia estática abre o WhatsApp com o pedido escrito. |
| **Logo em arquivo** | `midia/logo-perfil.jpg` | Veio da foto de perfil (ponta de baixo cortada). O losango foi redesenhado em SVG e as letras "GG" saíram da imagem. Um arquivo vetorial melhora a nitidez. |
| **Nome no Google** | Perfil da Empresa | O perfil está como "**Mármoraria** Graninvel" (acento a mais). Vale corrigir no Google; o site usa "Marmoraria". |

## Sobre as avaliações

O perfil tem 25 avaliações de 5 estrelas e 5 de 1 estrela (média 4,3). A
pedido do cliente (04/10/2026) o site **não mostra a média nem as de 1
estrela**: fala só das 25 avaliações de 5 estrelas e mostra 8 delas com o
texto exatamente como está no Google. O botão "Ver todas no Google" leva ao
perfil, onde a média aparece.

## Prévia

https://abalduinojose-cmd.github.io/graninvel/ (repositório
`abalduinojose-cmd/graninvel`). Para atualizar: `npm run build:pages`,
`node material/verificar-estatico.mjs`, commit e push.
