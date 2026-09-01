---
titulo: Cómo usar estos apuntes
subtitulo: true
---

# Cómo usar estos apuntes

Una nota rápida sobre cómo está organizado esto y cómo se amplía, para que dentro de seis meses siga siendo fácil de mantener.

## Organización

El menú sigue el orden en que se aprende: teoría, oficio, herramientas y referencia rápida.

| Bloque | Qué contiene | Cuándo se usa |
|---|---|---|
| **Empezar aquí** | Presentación y la guía de entrada al sector | La primera vez |
| **Fundamentos** | Los modelos que estructuran el oficio: Kill Chain, ATT&CK, Pirámide del Dolor, Diamante, CTI | Para entender el porqué |
| **El trabajo en el SOC** | Cómo es un turno real: triaje, respuesta, logs, escribir detecciones | Para saber cómo se aplica |
| **Herramientas** | Fichas por categoría: qué es, para qué sirve, uso básico | Cuando necesitas una concreta |
| **Cheatsheets** | Sólo tablas y comandos, sin explicación | Con el incidente delante |

Diferencia entre las dos últimas: las herramientas explican con qué se hace algo; las cheatsheets son para copiar y pegar.

El contenido cubre lo que se ha ido viendo, no todo lo que existe. Si un tema no está, es que aún no toca.

## Atajos de teclado

| Tecla | Acción |
|---|---|
| <kbd>/</kbd> | Ir al buscador |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Ir al buscador |
| <kbd>↑</kbd> <kbd>↓</kbd> | Moverse por los resultados |
| <kbd>Enter</kbd> | Abrir el resultado seleccionado |
| <kbd>Esc</kbd> | Cerrar el buscador |

El buscador indexa el texto completo de todas las notas, sección a sección, así que se puede buscar tanto por nombre de herramienta como por lo que recuerdes del contenido.

## Añadir o editar una nota

Cada página es un fichero Markdown dentro de `contenido/`. Para añadir una nota nueva:

1. Crea el fichero, por ejemplo `contenido/herramientas/cloud.md`.
2. Ponle la cabecera:

```markdown
---
titulo: Seguridad en la nube
subtitulo: true
tarjetas: true
---

# Seguridad en la nube

Párrafo de introducción, que saldrá destacado por `subtitulo: true`.
```

3. Añádelo al menú en `contenido/nav.json`:

```json
{ "ruta": "herramientas/cloud", "titulo": "Cloud", "icono": "☁️" }
```

Eso es todo: no hay que compilar nada.

## Convenciones de escritura

**Ficha de herramienta** — en las páginas con `tarjetas: true`, cada `###` se convierte en una tarjeta. La primera línea, si sólo contiene etiquetas y un enlace, se pinta como metadatos:

```markdown
### Nombre de la herramienta
`Categoría` `Gratis` [dominio.com](https://dominio.com/)

**Para qué sirve:** una o dos frases.

**Uso básico:** los pasos mínimos para sacarle partido.
```

Las etiquetas con las palabras *gratis*, *libre* u *open* salen en verde; las que contienen *pago*, *comercial* o *freemium*, en ámbar.

**Avisos** — se escriben con la sintaxis de alertas de GitHub, así que se ven bien tanto aquí como en el repositorio:

```markdown
> [!NOTE] · [!TIP] · [!IMPORTANT] · [!WARNING] · [!CAUTION]
```

> [!NOTE]
> Así se ve una nota.

> [!TIP]
> Así un truco.

> [!WARNING]
> Así una advertencia.

> [!CAUTION]
> Y así algo que puede salir muy mal.

**Enlaces internos** — con la ruta de la página precedida de `#/`:

```markdown
Ver [Pirámide del Dolor](#/fundamentos/piramide-del-dolor).
```

## Verlo en local

```bash
node serve.js
# y abrir http://localhost:4321
```

Hace falta un servidor porque el sitio carga los `.md` con `fetch()`, y abrir `index.html` con doble clic lo bloquea el navegador.

## Aviso

Apuntes personales de estudio, orientados a seguridad defensiva. Pueden contener errores o estar desactualizados: ante una decisión importante, contrasta con la documentación oficial.

Usar las herramientas listadas contra sistemas ajenos sin autorización por escrito es un delito.
