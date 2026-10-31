# Imágenes de los programas

Estado al 31 de octubre de 2026, sobre los 18 programas de **AREAS TEMÁTICAS V3**.
Fuente: Shutterstock, igual que las del portafolio anterior.

**Faltan 11 archivos por subir a Drupal**: 7 en tarjetas que hoy muestran el marcador
"Imagen pendiente" y 4 que reemplazarían a fotos que solo sirven a medias. De esas 11,
**10 ya están elegidas y verificadas**; solo la de Power BI está por buscar.

Todas las elegidas se revisaron abriendo la foto, no solo por el título de la búsqueda.
Son fotografías con personas, a color: sin renders 3D, sin ilustraciones, sin imágenes
monocromas y sin gráficos digitales superpuestos.

---

## 1. Sin foto — la tarjeta muestra el marcador (7)

### Power BI aplicado ⚠️ **la única por elegir**
**Curso** · Programa nuevo en V3. Ninguna de las 25 fotos de archivo muestra un tablero
ni una pantalla de datos, y la que más se acercaría ya la usa *Tu negocio en un tablero*.
`curso-power-bi-aplicado.webp`

> Al buscarla: una pantalla con un tablero real, o alguien trabajando sobre gráficos en
> el computador. Conviene que **no se parezca** a la de *Tu negocio en un tablero*, que
> son cursos distintos y quedan uno al lado del otro en la cuadrícula.

### Diseño y comercialización de paquetes turísticos
**Taller** · Agente de viajes cerrando un paquete con una pareja, mapa del mundo al fondo.
https://www.shutterstock.com/es/image-photo/happy-couple-discussing-vacation-package-travel-2629017001
`curso-diseno-y-comercializacion-de-paquetes-turisticos.webp`

### Gestión de trámites ante INVIMA
**Curso** · Técnica de control de calidad con tablet en planta, uniforme sanitario.
https://www.shutterstock.com/es/image-photo/quality-control-technician-using-tablet-canned-2749164391
`curso-gestion-de-tramites-ante-invima.webp`

### Seguridad alimentaria en la práctica
**Curso** · Corte de fruta en máquina con guante de malla metálica.
https://www.shutterstock.com/es/image-photo/woman-cuts-pineapple-safety-glove-food-2608514293
`curso-seguridad-alimentaria-en-la-practica.webp`

### Ventas efectivas para emprendimientos
**Taller** · Vendedor con delantal atendiendo a un cliente en su tienda.
https://www.shutterstock.com/es/image-photo/salesman-wearing-apron-engaging-customer-while-2662678941
`curso-ventas-efectivas-para-emprendimientos.webp`

### Negociación comercial local e internacional
**Taller** · Grupo diverso cerrando un acuerdo con apretón de manos en sala de juntas.
https://www.shutterstock.com/es/image-photo/diverse-group-colleagues-celebrates-new-partnership-2604023695
`curso-negociacion-comercial-local-e-internacional.webp`

### Fintech y pagos digitales
**Curso** · Cliente pagando con el teléfono en un datafono, dentro de un comercio.
https://www.shutterstock.com/es/image-photo/smiling-customer-uses-smartphone-credit-card-2773739565
`curso-fintech-y-pagos-digitales.webp`

---

## 2. Con foto, pero mejorable (4)

Estas tarjetas **se ven bien**. La foto actual sigue activa en el HTML y el reemplazo
está anotado en un comentario encima del `<img>`. No urge.

| Programa | Foto nueva | Qué corrige |
|---|---|---|
| Costos, presupuestos y branding con IA | [Calculadora sobre papeles, cajas al fondo](https://www.shutterstock.com/es/image-photo/business-owners-press-calculator-manage-check-2266010663) | La actual son gráficos de precios abstractos |
| Negocia y promociona tu negocio | [Hombre y mujer revisando documentos](https://www.shutterstock.com/es/image-photo/middle-aged-caucasian-woman-man-discussing-2656171165) | La actual es conceptual, sobre rivalidad |
| Empleabilidad digital con IA | [Mujer buscando empleo en su portátil](https://www.shutterstock.com/es/image-photo/woman-searches-job-on-laptop-kitchen-4204595281) | La actual muestra al reclutador, no al candidato |
| Analítica de mercados | [Equipo revisando gráficos impresos](https://www.shutterstock.com/es/image-photo/business-team-reviewing-printed-charts-graphs-2837320341) | La actual habla de hoja de cálculo |

Nombres de archivo: `curso-costos-presupuestos-y-branding-con-ia.webp`,
`curso-negocia-y-promociona-tu-negocio.webp`, `curso-empleabilidad-digital-con-ia.webp`,
`curso-analitica-de-mercados.webp`.

---

## 3. Las 7 que se quedan como están

Comunicación efectiva con clientes y proveedores · Innovación y emprendimiento con IA ·
Analítica de datos e IA · Fortalece tu mipyme · Analítica de datos para proyectos ·
Marketing digital aplicado · Tu negocio en un tablero.

> **Dos se reasignaron al fusionarse los programas en V3.** La foto de atención al
> cliente pasó a *Comunicación efectiva con clientes y proveedores*, y la de
> relacionamiento comercial quedó libre y la heredó *Fortalece tu mipyme*, que es
> justamente de gestión comercial y marketing.

---

## Cómo montarlas

1. Descargar de Shutterstock y convertir a `.webp`, proporción **400 × 267**.
2. Subir a Drupal con el nombre de archivo indicado en cada ficha.
3. En `oferta academica.html`:
   - **Sin foto:** borrar el `<div class="img-pendiente">` y descomentar el `<img>` de
     encima, ya escrito con ruta y `alt` correctos.
   - **Mejorables:** cambiar el `src` del `<img>` por el que indica el comentario
     `REEMPLAZO SUGERIDO`.

> **Confirmar la ruta.** Todo apunta a `/sites/default/files/2026-10/` porque Drupal
> archiva por mes de subida. Si se suben en noviembre, hay que ajustar esa parte.

Siguen sobrando fotos del portafolio anterior (Excel intermedio, logística, recursos
humanos, gestión del tiempo, programación, comunicación escrita, entre otras) que ya no
corresponden a ninguno de los 18 programas.
