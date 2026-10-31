# Formulario "Alcaldía de Usaquén" — guía paso a paso

**Portal:** 46379526 · **Form ID:** `6c27e8f3-027d-44d0-9a44-d9eb079b6b83` · **Región:** na1

> **Por qué lo hiciste tú y no yo.** El conector de HubSpot de esta sesión reporta
> `FORM: write = NOT_AVAILABLE`: puede leer propiedades de contacto, pero no editar
> formularios ni crear propiedades. Todo lo de abajo está verificado cargando el
> formulario real con su embed público, así que los campos y el orden son los de hoy,
> no una suposición.

> ## ✅ Estado al 30 de octubre de 2026: todo aplicado
>
> Verificado cargando el formulario real con su embed público. Los seis cambios están
> hechos; esta guía queda como referencia de qué es cada campo y por qué se decidió así.
>
> | Cambio | Estado |
> |---|---|
> | Orden de los campos | ✅ personales → caracterización → programa |
> | Desplegable de comunidad | ✅ `seleccionar_comunidad`, dependiente de "Sí" |
> | Campo de modalidad | ✅ `modalidad`, con solo Presencial y Virtual |
> | Etiqueta del soporte | ✅ "Soporte de servicio público o vínculo con la localidad" |
> | Color del botón | ✅ `#d4212d` |
> | Lista de programas | ✅ los 18 de AREAS TEMÁTICAS V2, con el título de la página |
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

## Paso 6 — Actualizar la lista de programas (AREAS TEMÁTICAS V2)

La página ya quedó con los **18 programas de `AREAS TEMÁTICAS V2.xlsx`**. El desplegable
`seleccione_el_programa_de_preferencia` todavía tiene la lista anterior, así que hay que
sincronizarlo: **quitar 2, añadir 2 y renombrar 2**. Al final siguen siendo 18 opciones.

> **No borres y vuelvas a crear la propiedad.** Los registros ya capturados guardan el
> valor interno de la opción; si la eliminas, esos contactos quedan con un valor
> huérfano y los informes dejan de cuadrar.

### Quitar 2 opciones

Tres programas de analítica e IA se fundieron en uno solo. Estos dos dejan de existir:

| Opción en el formulario | Por qué sale |
|---|---|
| `Uso de la analítica de datos` | Fusionado en el programa de analítica + IA |
| `Analítica de datos` | Fusionado en el programa de analítica + IA |

> HubSpot no deja borrar una opción que ya tenga registros sin reasignarlos. Si pasa,
> la salida limpia es marcarlas como **ocultas / archivadas** en vez de eliminarlas: ya
> no aparecen en el formulario pero el histórico se conserva. Antes de ocultarlas,
> exporta los contactos que las tengan: son los que se inscribieron a esos dos cursos y
> hay que avisarles del cambio.

### Añadir 2 opciones

| Nueva opción | Programa en la página |
|---|---|
| `Curso para el uso de herramientas digitales` | Tu negocio en un tablero: indicadores que impulsan productividad |
| `Curso de FINTECH, billeteras digitales, banca digital y pagos digitales` | Fintech y pagos digitales: domina las herramientas de la nueva economía financiera |

El de herramientas digitales ya existía en el cronograma anterior como *Adicional 5*,
fuera de la numeración; ahora entra como programa formal.

### Renombrar 2 etiquetas

Cambia **solo la etiqueta**, no el valor interno, para no romper lo ya capturado:

| Etiqueta actual | Etiqueta nueva |
|---|---|
| `Técnicas de comunicación con proveedores` | `Técnicas de comunicación con proveedores y uso de analítica de datos` |
| `Inteligencia artificial y el uso de herramientas actuales` | `Analítica de datos e inteligencia artificial y uso de herramientas actuales` |

La segunda es la que absorbe los dos programas retirados: conviene que sea esa la que
sobreviva, porque es la que ya tiene registros de los tres temas.

### Las 14 que no se tocan

Habilidades empresariales · Servicio al cliente · Paquetes turísticos · IA, innovación y
emprendimiento · Negociaciones empresariales · Marketing en redes y pódcast · INVIMA ·
Seguridad alimentaria · Uso de plataformas e IA · Fortalecer emprendimientos · Analítica
para mercados · Taller de negociación · Analítica para programas y proyectos ·
Marketing digital.

> Ojo con no confundirlas: **tres programas de analítica sobreviven** y son distintos
> entre sí — el de mercados para mipymes, el de programas y proyectos, y el fusionado de
> analítica + IA. Solo se retiran los dos primeros de la tabla de arriba.

### Y sigue pendiente lo de antes

Las etiquetas del desplegable usan el *Tema principal* del documento, mientras que la
página usa el *Título propuesto*. Siguen sin parecerse en varios casos, así que la
recomendación del principio no cambia: pasar las etiquetas al título que ve el usuario
en la página, conservando los valores internos.

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
