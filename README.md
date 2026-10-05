# Marmoraria Graninvel

Site one-page da marmoraria em Itaipava, Petrópolis. Next.js 15.5 (App
Router, 100% estático) + React 19 + TypeScript strict + Tailwind v4.
v2 (04/10/2026) no layout da Cabana Afrodite, com a marca da Graninvel:
branco e creme, preto de granito e o vermelho do losango; Cabinet Grotesk
(800 contra 300) nos títulos e General Sans no texto. Ordem: hero de tela
cheia com o trecho "cada detalhe" pintado de vermelho, faixa de números,
silhueta da serra com as chapas nos cavaletes entre os tons, sobre + como
trabalhamos, frase sobre foto inteira, trilho de ambientes (abre a galeria
de cada um), materiais no escuro, pedras do catálogo, reels, avaliações,
mapa, orçamento, CTA final e rodapé com a marca d'água.

```bash
npm run dev          # http://localhost:5250
npm run build        # confere a rota / como estática (○)
npm run baixar-google  # fotos do Perfil no Google (ids em midia/google/ids.txt)
npm run fotos        # curadoria das fotos, amostras das pedras e avatares
npm run hero         # foto do hero em alta (g05, 6240px): corte paisagem e retrato
npm run logo         # losango e ícones a partir de midia/logo-perfil.jpg
npm run videos       # reels do Instagram, capas e texturas
python scripts/mapa.py  # mapa OSM recolorido (crédito © OpenStreetMap visível)
npm run build:pages  # prévia estática em docs/ (GitHub Pages)
```

- Dados do negócio só em `src/content/site.ts`; link de WhatsApp só por `waLink()`.
- `use client` em 4 arquivos: MobileNav, Trilho (trilho + galeria por ambiente), FormOrcamento, StickyCta (pílula fixa + WhatsApp redondo).
- Fontes reserva calibradas à mão ("Cabinet Calibrada" e "General Calibrada"
  no `globals.css`, medidas com `material/fallback*.mjs`); o título do hero
  tem 3 linhas fixas e corpo em 10,5vw para a troca de fonte não mexer em
  nada (`material/cls-fontes.mjs` compara as duas versões).
- Efeitos de rolagem em CSS scroll-driven (`globals.css`). Com "reduzir
  movimento" ligado, nada se desloca: só fades e a frase que acende.
- Testes: `node material/testes.mjs` (com o dev de pé); estados de rolagem:
  `node material/efeitos.mjs 1440|375 [reduce]`.
- Prévia: https://abalduinojose-cmd.github.io/graninvel/ (`npm run build:pages` + commit + push).
- `src/app/opengraph-image.jpg` é estática (85 KB; o PNG gerado tinha 875 KB).
- Pendências: `PENDENCIAS.md`. `midia/` e `videos/` ficam fora do repositório.
