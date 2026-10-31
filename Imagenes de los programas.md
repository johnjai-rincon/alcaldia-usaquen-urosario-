# Imágenes de los programas

> ## ✅ Ya están descargadas
>
> Las 11 están en la carpeta **`imagenes/`** de este repositorio, ya convertidas a
> `.webp` y recortadas a 400 × 267. **Solo falta subirlas a Drupal.** Pesan 196 KB en
> total, entre 9 y 27 KB cada una.
>
> El script que las baja y convierte quedó en `imagenes/_bajar_fotos.py`, por si hay que
> rehacer alguna: recorta al centro conservando la proporción, sin deformar.

Las 11 que faltan, todas en **Pexels**: descarga gratuita, **sin marca de agua**, uso
comercial permitido y sin obligación de atribuir.

Cada enlace abre la foto en Pexels, por si quieres verla en grande o bajar otro tamaño.

> **Licencia.** La Pexels License permite el uso comercial sin atribuir. Lo único que no
> cubre es dar a entender que las personas de la foto respaldan el programa, que no es el
> caso aquí: son imágenes ilustrativas de una tarjeta de curso. Tampoco se pueden vender
> las fotos tal cual, cosa que tampoco aplica.

---

## 1. Las 7 que faltan por completo

Hoy estas tarjetas muestran el marcador "Imagen pendiente".

| # | Programa | Foto | Archivo |
|---|---|---|---|
| 1 | Diseño y comercialización de paquetes turísticos | [Guía turistica con un grupo](https://www.pexels.com/photo/1096773/) | `curso-diseno-y-comercializacion-de-paquetes-turisticos.webp` |
| 2 | Gestión de trámites ante INVIMA | [Operaria en planta de alimentos](https://www.pexels.com/photo/5953770/) | `curso-gestion-de-tramites-ante-invima.webp` |
| 3 | Seguridad alimentaria en la práctica | [Manos con guante preparando alimento](https://www.pexels.com/photo/6232609/) | `curso-seguridad-alimentaria-en-la-practica.webp` |
| 4 | Ventas efectivas para emprendimientos | [Tendero con delantal atendiendo](https://www.pexels.com/photo/8422712/) | `curso-ventas-efectivas-para-emprendimientos.webp` |
| 5 | Negociación comercial local e internacional | [Equipo diverso cerrando un acuerdo](https://www.pexels.com/photo/6949994/) | `curso-negociacion-comercial-local-e-internacional.webp` |
| 6 | **Power BI aplicado** | [Presentación de tablero en pantalla](https://www.pexels.com/photo/5716030/) | `curso-power-bi-aplicado.webp` |
| 7 | Fintech y pagos digitales | [Pago sin contacto con el teléfono](https://www.pexels.com/photo/5332483/) | `curso-fintech-y-pagos-digitales.webp` |

---

## 2. Las 4 de reemplazo

Estas tarjetas **ya tienen foto y se ven bien**. La actual sigue activa en el HTML y el
reemplazo está anotado en un comentario encima del `<img>`. No urge.

| # | Programa | Foto | Archivo |
|---|---|---|---|
| 8 | Costos, presupuestos y branding con IA | [Calculadora y papeles sobre el escritorio](https://www.pexels.com/photo/7680736/) | `curso-costos-presupuestos-y-branding-con-ia.webp` |
| 9 | Negocia y promociona tu negocio | [Dos personas revisando documentos](https://www.pexels.com/photo/8730981/) | `curso-negocia-y-promociona-tu-negocio.webp` |
| 10 | Empleabilidad digital con IA | [Mujer buscando empleo en su portátil](https://www.pexels.com/photo/6028685/) | `curso-empleabilidad-digital-con-ia.webp` |
| 11 | Analítica de mercados | [Equipo analizando gráficos impresos](https://www.pexels.com/photo/3184292/) | `curso-analitica-de-mercados.webp` |

---

## Criterios de la selección

Revisé 88 candidatos en mosaico y luego los finalistas en grande, no solo por el título
de búsqueda. Lo que descarté y por qué:

- **Gráficos de trading y criptomonedas.** Buscar "Power BI dashboard" en Pexels devuelve
  casi solo velas japonesas en fondo oscuro, y lo mismo pasó al buscar costos: aparecían
  monedas de bitcoin. Ninguno de los dos cursos trata de especulación.
- **Fotos sin personas.** La cuadrícula es mayormente de gente trabajando; un primer plano
  de un portátil al lado desentona.
- **Imágenes monocromas y renders 3D**, por la misma razón.

Para **Power BI** cuidé además que no se pareciera a *Tu negocio en un tablero*: son
cursos distintos y quedan uno al lado del otro en la cuadrícula. El de Power BI muestra
una presentación de tablero en pantalla; el otro conserva su foto de análisis sobre papel.

---

## Cómo montarlas

1. Descargar de Pexels, convertir a `.webp` y recortar a **400 × 267**.
2. Subir a Drupal con el nombre de archivo de la tabla.
3. En `oferta academica.html`:
   - **Las 7 que faltan:** borrar el `<div class="img-pendiente">` y descomentar el
     `<img>` de encima, ya escrito con ruta y `alt` correctos.
   - **Las 4 de reemplazo:** cambiar el `src` del `<img>` por el que indica el comentario
     `REEMPLAZO SUGERIDO`.

> **Confirmar la ruta.** Todo apunta a `/sites/default/files/2026-10/` porque Drupal
> archiva por mes de subida. Si se suben en noviembre, hay que ajustar esa parte.

---

## Las 7 que se quedan como están

Comunicación efectiva con clientes y proveedores · Innovación y emprendimiento con IA ·
Analítica de datos e IA · Fortalece tu mipyme · Analítica de datos para proyectos ·
Marketing digital aplicado · Tu negocio en un tablero.

Son fotos del portafolio anterior, de Shutterstock, ya compradas y subidas.
