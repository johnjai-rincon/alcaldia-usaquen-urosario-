# Formulario "Alcaldía de Usaquén" — guía paso a paso

**Portal:** 46379526 · **Form ID:** `6c27e8f3-027d-44d0-9a44-d9eb079b6b83` · **Región:** na1

> **Por qué lo hiciste tú y no yo.** El conector de HubSpot de esta sesión reporta
> `FORM: write = NOT_AVAILABLE`: puede leer propiedades de contacto, pero no editar
> formularios ni crear propiedades. Todo lo de abajo está verificado cargando el
> formulario real con su embed público, así que los campos y el orden son los de hoy,
> no una suposición.

> ## Estado al 31 de octubre de 2026
>
> Verificado cargando el formulario real con su embed público. Cinco de los seis
> cambios siguen bien; **la lista de programas quedó desactualizada** al llegar
> AREAS TEMÁTICAS V3 y hay que sincronizarla (paso 6).
>
> | Cambio | Estado |
> |---|---|
> | Orden de los campos | ✅ personales → caracterización → programa |
> | Desplegable de comunidad | ✅ `seleccionar_comunidad`, dependiente de "Sí" |
> | Campo de modalidad | ✅ `modalidad`, con solo Presencial y Virtual |
> | Etiqueta del soporte | ✅ "Soporte de servicio público o vínculo con la localidad" |
> | Color del botón | ✅ `#d4212d` |
> | Lista de programas | ⚠️ **por sincronizar con V3**: ver el paso 6 |
>
> **Lo único por revisar:** el desplegable de comunidad separa `Negro`, `Mulato` y
> `Afrodescendiente` en tres opciones, mientras que el DANE las agrupa en una sola
> categoría. Si la Alcaldía pide el reporte de caracterización en formato DANE, hay que
> sumar esas tres al consolidar. No es un error del formulario: es más granular que el
> estándar, y eso solo se nota al reportar.

**Dónde:** HubSpot → **Marketing** → **Captación de clientes potenciales** → **Formularios**
→ buscar "Alcaldía de Usaquén" → **Editar**.

---

## Cómo está hoy (verificado)

| # | Campo | Propiedad | Oblig. |
|---|---|---|---|
| 1 | Nombres | `firstname` | Sí |
| 2 | Apellidos | `lastname` | Sí |
| 3 | Tipo de documento | `tipo_de_documento_educon` | Sí |
| 4 | Número de documento | `numero_de_documento_educon` | Sí |
| 5 | **Edad** | `edad` | No |
| 6 | **Género** | `adm_genero__c` | No |
| 7 | **¿Con qué género se identifica?** | `con_que_genero_se_identifica` | No |
| 8 | Correo electrónico | `email` | Sí |
| 9 | Teléfono (+57 Colombia) | `phone` | Sí |
| 10 | Dirección | `address` | Sí |
| 11 | **Nivel de estudio** | `adm_nivelestudio__c` | No |
| 12 | **¿Pertenece a alguna comunidad?** | `pertenece_a_alguna_comunidad` | No |
| 13 | **¿Presenta algún tipo de discapacidad?** | `presenta_algun_tipo_de_discapacidad` | No |
| 14 | Seleccione el programa de preferencia | `seleccione_el_programa_de_preferencia` | Sí |
| 15 | Soporte de servicio público | `soporte_de_servicio_publico` | Sí |
| 16-17 | Dos casillas de autorización de datos | `LEGAL_CONSENT...` | No |

En **negrita** los campos de caracterización. Ahí se ve el problema que señalaste: los
campos 5, 6 y 7 parten en dos los datos personales — documento, luego edad y género, y
después correo, teléfono y dirección.

---

## Paso 1 — Reordenar

En el editor, arrastra los campos hasta dejarlos así. Solo hay que **mover tres**
(`edad`, `adm_genero__c`, `con_que_genero_se_identifica`) hacia abajo, debajo de
`address`:

**Datos personales**
```
1. Nombres                  firstname
2. Apellidos                lastname
3. Tipo de documento        tipo_de_documento_educon
4. Número de documento      numero_de_documento_educon
5. Teléfono                 phone
6. Dirección                address
7. Correo electrónico       email
```

**Datos de caracterización**
```
8.  Edad                                   edad
9.  Género                                 adm_genero__c
10. ¿Con qué género se identifica?         con_que_genero_se_identifica
11. Nivel de estudio                       adm_nivelestudio__c
12. ¿Pertenece a alguna comunidad?         pertenece_a_alguna_comunidad
13. ¿Cuál comunidad?                       (nuevo — Paso 2)
14. ¿Presenta algún tipo de discapacidad?  presenta_algun_tipo_de_discapacidad
```

**Programa**
```
15. Seleccione el programa de preferencia  seleccione_el_programa_de_preferencia
16. Modalidad                              modalidad   (nuevo — Paso 3)
17. Soporte de residencia o vínculo        soporte_de_servicio_publico
18-19. Autorizaciones de datos
```

> Puse el correo al final del bloque personal porque es el campo que más gente
> abandona; si prefieres mantenerlo donde está, no afecta nada.

---

## Paso 2 — La pregunta de comunidad

**Lo que encontré:** hoy el formulario solo tiene `pertenece_a_alguna_comunidad`
(Sí / No). La propiedad `cual_comunidad` **existe en HubSpot pero es de texto libre y
no está puesta en el formulario** — por eso no se despliega ninguna opción.

Como `cual_comunidad` es de texto, cambiarle el tipo haría que los datos ya guardados
dejen de ser filtrables. Recomiendo **crear una propiedad nueva**:

1. **Configuración** (⚙) → **Propiedades** → **Crear propiedad**
2. Objeto: **Contacto** · Grupo: el que uses para EDUCON
3. Etiqueta: `¿Cuál comunidad?` · Nombre interno: `comunidad_etnica`
4. Tipo de campo: **Desplegable (selección única)**
5. Opciones, en este orden:

```
Indígena
Rrom (gitano)
Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina
Palenquero de San Basilio
Negro(a), mulato(a), afrodescendiente, afrocolombiano(a)
Ninguna de las anteriores
```

> Son las categorías de autorrreconocimiento étnico del DANE. Vale la pena usarlas tal
> cual porque es el estándar con el que la Alcaldía va a pedir el reporte de
> caracterización, y así no toca recodificar después.

6. Vuelve al formulario, arrastra `comunidad_etnica` justo debajo de
   `pertenece_a_alguna_comunidad`.
7. En la pestaña **Lógica** del formulario: mostrar `comunidad_etnica`
   **solo si** `pertenece_a_alguna_comunidad` **es igual a** `Sí`.

**Alternativa más simple:** elimina la pregunta de Sí/No y deja solo el desplegable.
"Ninguna de las anteriores" ya cubre ese caso y le quitas un clic al usuario. Si lo
haces, ten en cuenta que `pertenece_a_alguna_comunidad` deja de alimentarse.

---

## Paso 3 — Campo de modalidad

La propiedad `modalidad` **ya existe** con cuatro opciones: `Blended`, `Remoto`,
`Presencial`, `Virtual`. No hay que crear nada.

1. Arrastra `modalidad` al formulario, debajo del programa de preferencia.
2. Ábrela y, en las opciones del campo, **deja visibles solo `Virtual` y `Presencial`**
   (se eligen dentro del formulario, sin tocar la propiedad, para no afectar otros
   formularios que la usen).
3. Etiqueta sugerida: `Modalidad de preferencia`.
4. Márcala obligatoria, igual que el programa.

---

## Paso 4 — Soporte de residencia

Campo 15, `soporte_de_servicio_publico` (tipo archivo, obligatorio).

- **Etiqueta nueva:**
  `Soporte de servicio público o soporte de vínculo con la localidad (trabajo, comercio, empresa)`
- **Texto de ayuda:**
  `Adjunta un recibo de servicio público a tu nombre o, si no resides en Usaquén, un soporte que acredite tu vínculo con la localidad: certificación laboral, matrícula mercantil o cámara de comercio.`

No cambies el nombre interno de la propiedad: rompería los registros ya capturados.
La misma frase ya quedó actualizada en la nota al pie de `oferta academica.html`.

---

## Paso 5 — El color del botón

**Esto no estaba en tu lista, pero lo encontré al revisar el formulario.** El botón
"INSCRÍBETE" está en `#CA818F`, el rosa viejo. El formulario tiene su propio estilo
dentro de HubSpot, así que el cambio de paleta que hicimos en el CSS de la página
**no lo toca**: al publicar, la página queda roja y el formulario rosa.

En el editor del formulario → **Estilo** (o **Opciones** → **Estilo**, según la versión):

| | Antes | Ahora |
|---|---|---|
| Fondo del botón | `#CA818F` | `#d4212d` |
| Texto del botón | `#FFFFFF` | sin cambio |

Si el formulario está heredando un tema global de HubSpot, cámbialo en el tema para que
aplique a todos los formularios de EDUCON de esta campaña, no solo a este.

---

## Paso 6 — Sincronizar la lista de programas (AREAS TEMÁTICAS V3, 30/10/2026)

La página ya quedó con los 18 programas de **V3**. El desplegable
`seleccione_el_programa_de_preferencia` tiene los de **V2**, así que hay que
**renombrar 3, quitar 2 y añadir 2**. Al final siguen siendo 18.

> V3 no añade ni quita programas sueltos: **fusiona dos pares y renombra uno**, y entran
> dos temas nuevos. Por eso conviene renombrar en vez de borrar y volver a crear: así los
> contactos ya inscritos quedan en el programa que absorbió al suyo.

### Renombrar 3 etiquetas

Cambia **solo la etiqueta**, nunca el valor interno:

| Etiqueta actual | Etiqueta nueva | Qué pasó |
|---|---|---|
| `Analítica de mercados para mipymes: identifica oportunidades y fortalece tu estrategia digital` | `Analítica de mercados: detecta oportunidades y toma decisiones con datos` | Solo cambia el nombre |
| `Servicio al cliente y comunicación asertiva: atiende, resuelve y fideliza` | `Comunicación efectiva con clientes y proveedores: resuelve, negocia y decide con datos` | Absorbe el de proveedores |
| `Negociación empresarial efectiva: prepara, argumenta y logra acuerdos` | `Negocia y promociona tu negocio: acuerdos comerciales, redes sociales y pódcast` | Absorbe el de redes y pódcast |

### Quitar 2 opciones

Son las que quedaron absorbidas por las dos fusiones de arriba:

| Opción | Se fue a |
|---|---|
| `Comunicación y negociación con proveedores basada en datos` | Comunicación efectiva con clientes y proveedores |
| `Marketing en redes sociales y pódcast: crea contenido que conecta y promociona` | Negocia y promociona tu negocio |

> Igual que la vez pasada: **exporta primero los contactos que tengan estas dos**. Son
> quienes se inscribieron a esos cursos y hay que avisarles en cuál quedaron. Si HubSpot
> no deja borrar la opción porque tiene registros, archívala en vez de eliminarla.

### Añadir 2 opciones

| Nueva opción | Tema en el documento |
|---|---|
| `Fortalece tu mipyme: gestión comercial y marketing digital para crecer` | Fortalecimiento a pymes y mipymes que incluya marketing digital |
| `Power BI aplicado: transforma datos en indicadores y tableros para decidir` | Power BI - Business Intelligence y Big Data |

### Las 13 que no se tocan

Costos y branding con IA · Paquetes turísticos · Innovación y emprendimiento con IA ·
INVIMA · Seguridad alimentaria · Analítica de datos e IA · Empleabilidad digital con IA ·
Ventas efectivas · Negociación comercial local e internacional · Analítica para proyectos ·
Marketing digital aplicado · Tu negocio en un tablero · Fintech y pagos digitales.

> **Cuidado con dos pares que se parecen pero son distintos:**
> *Tu negocio en un tablero* y *Power BI aplicado* son ambos de tableros — el primero es
> para pequeños negocios, el segundo es la herramienta a fondo (Power Query, DAX).
> Y *Marketing digital aplicado* convive con *Fortalece tu mipyme*, que también lleva
> marketing pero enfocado al crecimiento de la mipyme.

### La lista final, en el orden de la página

```
 1. Costos, presupuestos y branding con IA: habilidades para gestionar tu negocio
 2. Comunicación efectiva con clientes y proveedores: resuelve, negocia y decide con datos
 3. Diseño y comercialización de paquetes turísticos: crea experiencias y alianzas
 4. Innovación y emprendimiento con IA: identifica oportunidades y desarrolla soluciones
 5. Negocia y promociona tu negocio: acuerdos comerciales, redes sociales y pódcast
 6. Gestión de trámites ante INVIMA: prepara requisitos para comercializar productos
 7. Seguridad alimentaria en la práctica: manipula, previene riesgos y elabora alimentos seguros
 8. Analítica de datos e inteligencia artificial aplicada al trabajo
 9. Empleabilidad digital con IA: construye y comunica tu perfil profesional
10. Ventas efectivas para emprendimientos: conecta con clientes y cierra negocios
11. Analítica de mercados: detecta oportunidades y toma decisiones con datos
12. Fortalece tu mipyme: gestión comercial y marketing digital para crecer
13. Negociación comercial local e internacional: desarrolla acuerdos en distintos mercados
14. Analítica de datos para gestionar proyectos: monitorea indicadores y mejora decisiones
15. Marketing digital aplicado: planifica campañas, atrae clientes y mide resultados
16. Tu negocio en un tablero: indicadores que impulsan productividad
17. Power BI aplicado: transforma datos en indicadores y tableros para decidir
18. Fintech y pagos digitales: domina las herramientas de la nueva economía financiera
```

---

## Paso 7 — Después de guardar

1. **Revisa el correo de confirmación.** `correo electronico confimación de inscripción.html`
   usa el token `{{ contact.seleccione_el_programa_de_preferencia }}`. Si cambiaste solo
   las etiquetas, el correo sigue mostrando el valor interno viejo: haz una inscripción
   de prueba y mira cómo llega.
2. Ese mismo correo dice "el soporte de servicio público adjunto". Actualízalo con la
   redacción del Paso 4.
3. **Prueba el bloqueo de reenvío.** `formulario alcadia de usaquen version js.html` marca
   el envío en `localStorage` con la clave `usaquen_form_6c27e8`. Si pruebas desde el
   mismo navegador vas a ver "Registro ya realizado" en vez del formulario: bórrala desde
   la consola con `localStorage.removeItem('usaquen_form_6c27e8')`.
4. Confirma que el formulario sigue anclado en `#hubspot-form-section`, que es a donde
   apunta el botón "Inscríbete a cualquiera de nuestros programas" de la página.

---

## Una cosa más que vi

`edad`, `género`, `nivel de estudio`, `comunidad` y `discapacidad` **no son obligatorios**.
Para un contrato con la Alcaldía que pide reporte de caracterización, probablemente
necesites al menos edad y género completos. Decide tú: si los marcas obligatorios subes
la calidad del dato pero también el abandono del formulario.
