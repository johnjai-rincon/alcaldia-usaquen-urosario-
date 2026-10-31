# Landing Alcaldía de Usaquén — Educación Continua URosario

Bloques HTML, CSS y JS de la página
[educacioncontinua.urosario.edu.co/programas-alcaldia-usaquen](https://educacioncontinua.urosario.edu.co/programas-alcaldia-usaquen),
del convenio entre la Universidad del Rosario y la Alcaldía Local de Usaquén.

No es una aplicación: son **bloques que se pegan en Drupal 10**, cada uno en su lugar
dentro de la página. Por eso las rutas de imágenes y PDF apuntan a
`/sites/default/files/` y no resuelven si abres los archivos en local.

---

## Qué hay aquí

### Bloques de la página

| Archivo | Dónde va |
|---|---|
| `informacion banner.html` | Encabezado de la alianza, cifras y logos. Incluye el JSON-LD de Schema.org |
| `oferta academica.html` | Buscador, filtros curso/taller, cuadrícula de los 18 programas y la modal de "Más información". Trae su JS al final |
| `contacto.html` | Banda índigo con las dos asesoras, WhatsApp y teléfono |
| `formulario alcadia de usaquen.html` | Embed simple del formulario de HubSpot |
| `formulario alcadia de usaquen version js.html` | El mismo, con bloqueo de reenvío por `localStorage` |
| `pagina de gracias.html` | Página de confirmación tras inscribirse |
| `correo electronico confimación de inscripción.html` | Plantilla del correo de HubSpot |
| `banner.html` | Card del Diplomado en Trading — **pertenece a otra página**, no a Usaquén |

### Estilos y scripts

| Archivo | Notas |
|---|---|
| `estilos de la págna.css` | Hoja completa, en 10 secciones numeradas |
| `orden de programas.js` | Buscador y filtros. **Está duplicado** con el `<script>` de `oferta academica.html`: en Drupal se carga solo uno de los dos |
| `orden-carrousel.js` | Código muerto del carrusel horizontal anterior. Falla si no existe `#scrollContainer` |

### Documentos de trabajo

| Archivo | Para qué |
|---|---|
| `Formulario HubSpot - guia paso a paso.md` | Los cambios pendientes del formulario, verificados contra el formulario real |
| `Imagenes de los programas.md` | Las 11 fotos elegidas y la que falta por elegir, con su enlace y nombre de archivo |
| `Rediseño UX Oferta Académica.md` | Transcripción del rediseño que cambió el carrusel por la cuadrícula |

### Fuentes de datos

| Archivo | Contenido |
|---|---|
| `AREAS TEMÁTICAS V2.xlsx` | **La fuente de la oferta.** Hoja `AREAS TEMÁTICAS`: tema, tipo, título, objetivo, 4 unidades y metodología por programa. La hoja `AREAS TEMÁTICAS (2)` es una versión incompleta, con 2 unidades y la última fila vacía: **no usarla** |
| `Copia de Eventos Alcaldía Usaquen - Landing.xlsx` | Los **25 programas del portafolio anterior**, ya finalizados, con código Apolo |
| `imagenes de los programas.docx` | Las 25 URLs de Shutterstock del portafolio anterior |
| `Cambios a realizar.docx` | Los cambios pedidos por el cliente |
| `Contenidos Temáticos/` y `Contenidos Ajustados P.AU/` | 50 PDF del portafolio anterior. **Ninguno corresponde a los programas vigentes** |

---

## Qué le hace Drupal al bloque al pegarlo

El campo de texto usa el filtro de CKEditor, que **reescribe el HTML**. Verificado
contra la página publicada:

| | Resultado |
|---|---|
| `<span></span>` vacío | **se borra** |
| `<div></div>` vacío | sobrevive |
| `<i class="fas ..."></i>` vacío | sobrevive |
| `<script>` dentro del bloque | **se borra** (el JS va como librería del tema) |
| `<button>` suelto | se envuelve en un `<p>` y le agrega `&nbsp;` |
| `hidden`, `data-*`, `aria-*` | sobreviven |
| `<img>` | le agrega `.lazyload` con `opacity: 0` |

De ahí vienen dos decisiones del código:

- **Ningún elemento que el JS necesite puede ir vacío.** `#modalProgramaTipo`,
  `#modalProgramaTitulo`, `#modalProgramaCuerpo` y `.img-pendiente` llevan contenido
  inicial que el JS reemplaza. Un `<span>` vacío desaparecía y rompía la modal entera.
- **El JS comprueba cada nodo antes de usarlo.** Si el filtro vuelve a llevarse algo,
  se pierde ese detalle pero la función sigue andando.

`cargarImagenes()` existe por la última fila de la tabla: quita la clase `.lazyload`
que Drupal le pone a las imágenes.

---

## Paleta

Tomada de [Pa'LanteU](https://palanteu.lovable.app). La página se mantiene en claro
porque va embebida en el portal institucional; de ese sitio se tomaron los colores de
marca, no el modo oscuro.

| Token | Valor |
|---|---|
| `--color-principal` | `#d4212d` |
| `--color-principal-oscuro` | `#a81822` |
| `--color-secundario` | `#261b81` |
| `--color-tinta` / `--texto-oscuro` | `#04050d` |
| `--color-papel` | `#faf8f5` |

`--color-verde` (`#25D366`) se queda: es el verde de WhatsApp, no de la marca.

> El **formulario de HubSpot tiene su propio estilo** y sigue en el rosa anterior
> (`#CA818F`). Se cambia dentro de HubSpot, no desde este CSS.

---

## Los 18 programas

12 cursos y 6 talleres, de la hoja `AREAS TEMÁTICAS`. Respecto al cronograma anterior,
tres programas de analítica e IA se fundieron en uno, el de proveedores absorbió la
analítica, y entraron "Tu negocio en un tablero" (era el *Adicional 5*) y el de Fintech. Las tarjetas se generan a
partir de esa hoja; los filtros separan por `data-tipo="curso|taller"` y cada tarjeta
lleva `data-keywords` para que el buscador encuentre por tema y no solo por las palabras
del título (sin eso, "turismo" no encuentra "paquetes turísticos").

Cada tarjeta lleva un botón **Más información** que abre una modal con las 4 unidades y
la metodología del programa, tomadas de las columnas E, F, G y H de la hoja
`Propuesta curricular`. Ese contenido vive en el DOM dentro de `.detalle-programa`
(oculto por CSS, no por `hidden`) para que lo lean buscadores y asistentes, y para que
el buscador de la página también encuentre por el nombre de una unidad.

**Lo que el cronograma no trae:** modalidad y horario están como "PD" (por definir), así
que las tarjetas dicen "Modalidad por definir" y "Fechas por definir".

Tampoco trae **horas ni número de sesiones**: no existe ese campo en ninguna hoja.
Contar las marcas del Gantt da 12 por curso y 8 por taller, pero es una inferencia
sobre una propuesta con el horario sin definir, así que ese dato **no se publica** en
las tarjetas. Lo único confirmado por programa son las **4 unidades** de la hoja
`Propuesta curricular`, que se ven en la modal.

---

## Pendientes

- [ ] Conseguir y subir las 12 imágenes (`Imagenes de los programas.md`)
- [ ] Aplicar los cambios del formulario (`Formulario HubSpot - guia paso a paso.md`)
- [ ] Cambiar el color del botón del formulario en HubSpot a `#d4212d`
- [ ] Definir modalidad, horario y fechas de los 18 programas
- [ ] Definir la metodología del curso de Fintech (es lo único que falta en el libro)
- [ ] Sincronizar el desplegable de programas en HubSpot (`Formulario HubSpot - guia paso a paso.md`, paso 6)
- [ ] Conseguir los PDF de contenido temático de los programas vigentes
- [ ] Eliminar `orden-carrousel.js` y resolver la duplicación del JS

---

## Archivos `.bak`

`oferta academica.html.25cursos.bak` y `estilos de la págna.css.rosa.bak` son el estado
previo a los cambios del 30 de octubre de 2026. `oferta academica.html.bak` es una
versión de mayo. Quedaron en el primer commit para no perder nada; una vez que confíes
en el historial de git, se pueden borrar.
