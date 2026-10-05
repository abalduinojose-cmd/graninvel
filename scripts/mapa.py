"""
Mapa estático do Contato na identidade da Graninvel: mosaico de tiles do
OpenStreetMap centrado no endereço real (Estr. Philuvio Cerqueira
Rodrigues, 91, Itaipava) e recolorido como pedra escura polida: fundo
grafite, quadras um tom acima, ruas em cinza, vias principais no vermelho
da marca e os nomes das ruas em branco gelo. O pino NÃO é assado: a UI desenha o
marcador no centro exato. Exige o crédito visível "© OpenStreetMap".

    python scripts/mapa.py
"""
import io, math, time, urllib.request
import numpy as np
from PIL import Image

LAT, LNG, Z = -22.3867608, -43.1314659, 17
W, H, T = 1200, 800, 256

n = 2 ** Z
xf = (LNG + 180) / 360 * n
lr = math.radians(LAT)
yf = (1 - math.log(math.tan(lr) + 1 / math.cos(lr)) / math.pi) / 2 * n
x0, y0 = math.floor(xf - W / 2 / T) - 1, math.floor(yf - H / 2 / T) - 1
x1, y1 = math.floor(xf + W / 2 / T) + 1, math.floor(yf + H / 2 / T) + 1

import os

ORIGINAL = "midia/mapa-osm-original.png"
mosaico = Image.new("RGB", ((x1 - x0 + 1) * T, (y1 - y0 + 1) * T))
for x in (range(x0, x1 + 1) if not os.path.exists(ORIGINAL) else []):
    for y in range(y0, y1 + 1):
        req = urllib.request.Request(
            f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png",
            headers={"User-Agent": "GraninvelSite/1.0 (mapa estatico, geracao unica)"},
        )
        mosaico.paste(Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert("RGB"), ((x - x0) * T, (y - y0) * T))
        time.sleep(0.1)

# Os tiles crus ficam em midia/: rodar de novo só recolore, sem baixar.
if os.path.exists(ORIGINAL):
    img = Image.open(ORIGINAL).convert("RGB")
else:
    px, py = round((xf - x0) * T), round((yf - y0) * T)
    img = mosaico.crop((px - W // 2, py - H // 2, px + W // 2, py + H // 2))
    img.save(ORIGINAL)

a = np.asarray(img).astype(float) / 255
R, G, B = a[..., 0], a[..., 1], a[..., 2]
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

# Rampa invertida: tinta do OSM (texto) vira creme; o fundo claro vira noite.
creme = np.array([232, 230, 226]) / 255
quadra = np.array([36, 36, 36]) / 255
noite = np.array([22, 22, 22]) / 255
t = np.clip((L - 0.35) / 0.6, 0, 1)[..., None]
base = np.where(t < 0.8, creme + (quadra - creme) * (t / 0.8), quadra + (noite - quadra) * ((t - 0.8) / 0.2))

# Via local (branca no OSM) vira marrom quente; via principal (amarelo e
# laranja no OSM) vira o caramelo da marca.
branca = np.clip((L - 0.962) / 0.038, 0, 1)[..., None]
quente = (np.clip((R - 0.93) / 0.07, 0, 1) * np.clip((0.86 - B) / 0.15, 0, 1) * (G > 0.72))[..., None]
rua = np.array([78, 78, 78]) / 255
caramelo = np.array([209, 10, 16]) / 255
cor = base * (1 - branca) + rua * branca
cor = cor * (1 - quente) + caramelo * quente
# Rodovia (rosa e vermelho no OSM) vira o caramelo claro.
rodovia = ((R > 0.8) & ((R - G) > 0.15) & ((R - B) > 0.05))
cor[rodovia] = np.array([253, 40, 40]) / 255
# Mata e pasto (a Fonte Santa é verde) viram um musgo bem escuro.
verde = ((G - R) > 0.05) & ((G - B) > 0.03)
musgo = np.array([30, 32, 30]) / 255
cor[verde] = cor[verde] * 0.3 + musgo * 0.7

Image.fromarray((np.clip(cor, 0, 1) * 255).astype("uint8")).save("src/assets/mapa/itaipava.jpg", quality=84, optimize=True)
print("mapa salvo", W, H)
