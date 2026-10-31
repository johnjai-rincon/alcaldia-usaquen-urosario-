# -*- coding: utf-8 -*-
"""Descarga de Pexels las fotos de los programas y las deja listas para Drupal:
   .webp recortado a 400x267, que es la proporcion de las que ya estan subidas.

   Uso:  python -I bajar_fotos.py <carpeta_descargas_crudas> <carpeta_salida>
"""
import sys, os, urllib.request
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

CRUDAS, SALIDA = sys.argv[1], sys.argv[2]
ANCHO, ALTO = 400, 267

# (id de Pexels, archivo destino, para que programa)
FOTOS = [
    (1096773, 'curso-diseno-y-comercializacion-de-paquetes-turisticos.webp', 'Paquetes turisticos'),
    (5953770, 'curso-gestion-de-tramites-ante-invima.webp', 'INVIMA'),
    (6232609, 'curso-seguridad-alimentaria-en-la-practica.webp', 'Seguridad alimentaria'),
    (8422712, 'curso-ventas-efectivas-para-emprendimientos.webp', 'Ventas efectivas'),
    (6949994, 'curso-negociacion-comercial-local-e-internacional.webp', 'Negociacion internacional'),
    (5716030, 'curso-power-bi-aplicado.webp', 'Power BI aplicado'),
    (5332483, 'curso-fintech-y-pagos-digitales.webp', 'Fintech y pagos digitales'),
    (7680736, 'curso-costos-presupuestos-y-branding-con-ia.webp', 'Costos y branding con IA'),
    (8730981, 'curso-negocia-y-promociona-tu-negocio.webp', 'Negocia y promociona'),
    (6028685, 'curso-empleabilidad-digital-con-ia.webp', 'Empleabilidad digital con IA'),
    (3184292, 'curso-analitica-de-mercados.webp', 'Analitica de mercados'),
]

# Version grande, para que el recorte a 400x267 no pierda nitidez.
URL = ('https://images.pexels.com/photos/{0}/pexels-photo-{0}.jpeg'
       '?auto=compress&cs=tinysrgb&w=1600')

os.makedirs(CRUDAS, exist_ok=True)
os.makedirs(SALIDA, exist_ok=True)


def recortar_centrado(im, ancho, alto):
    """Recorta al centro conservando la proporcion, sin deformar."""
    origen = im.width / im.height
    destino = ancho / alto
    if origen > destino:                      # sobra a los lados
        nueva = int(im.height * destino)
        izq = (im.width - nueva) // 2
        im = im.crop((izq, 0, izq + nueva, im.height))
    else:                                     # sobra arriba y abajo
        nueva = int(im.width / destino)
        arriba = (im.height - nueva) // 2
        im = im.crop((0, arriba, im.width, arriba + nueva))
    return im.resize((ancho, alto), Image.LANCZOS)


ok, fallos = 0, []
for pid, archivo, programa in FOTOS:
    crudo = os.path.join(CRUDAS, '{}.jpg'.format(pid))
    try:
        if not os.path.exists(crudo):
            req = urllib.request.Request(URL.format(pid), headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=60) as r, open(crudo, 'wb') as f:
                f.write(r.read())
        with Image.open(crudo) as im:
            original = '{}x{}'.format(im.width, im.height)
            im = im.convert('RGB')
            im = recortar_centrado(im, ANCHO, ALTO)
            destino = os.path.join(SALIDA, archivo)
            im.save(destino, 'WEBP', quality=86, method=6)
        kb = os.path.getsize(destino) / 1024
        print('  OK  {:<30} {:>11} -> 400x267  {:5.0f} KB  {}'.format(
            programa[:30], original, kb, archivo))
        ok += 1
    except Exception as ex:
        fallos.append((programa, repr(ex)[:90]))
        print('  FALLO {}: {}'.format(programa, repr(ex)[:90]))

print()
print('{} de {} listas en {}'.format(ok, len(FOTOS), SALIDA))
if fallos:
    print('fallaron:', [f[0] for f in fallos])
    sys.exit(1)
