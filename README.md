# Apuntes de Ciberseguridad

Apuntes abiertos de **ciberseguridad defensiva y Blue Team**: herramientas por categoría, marcos y modelos, y cómo se aplica todo en el trabajo real de un SOC.

🔗 **[kharonte09.github.io/apuntes](https://kharonte09.github.io/apuntes/)**

---

## Qué hay dentro

| Bloque | Contenido |
|---|---|
| **Herramientas** | Threat Intelligence · OSINT · Phishing y correo · Red y tráfico · DFIR y forense · Utilidades |
| **Conocimiento teórico** | Conceptos básicos · Cyber Kill Chain · MITRE ATT&CK · Pirámide del Dolor · Modelo del Diamante · Inteligencia de amenazas · Qué es un SOC · Triaje de alertas · Respuesta a incidentes · Logs y telemetría · Detección y reglas |
| **Cheatsheets** | Event IDs de Windows · Wireshark y red · Comandos de triaje · Análisis de phishing |

Cada ficha de herramienta responde a tres cosas: **qué es**, **para qué sirve** y **cómo se usa lo básico**. Las cheatsheets son sólo tablas y comandos, para consultar con el incidente delante.

## Cómo está montado

Sin compilación ni dependencias. Las notas son ficheros Markdown en `contenido/`, y una capa ligera de HTML/CSS/JS las carga y las pinta con buscador, tema claro/oscuro, tabla de contenidos y tarjetas.

```
apuntes/
├── index.html              Estructura de la página
├── assets/
│   ├── css/style.css       Tema oscuro/claro
│   └── js/app.js           Router, render, buscador
├── contenido/
│   ├── nav.json            Menú (panel derecho)
│   ├── inicio.md
│   ├── herramientas/
│   ├── fundamentos/        \
│   ├── blue-team/           } bloque "Conocimiento teórico"
│   └── cheatsheets/
├── serve.js                Servidor local para previsualizar
└── .github/workflows/      Despliegue a GitHub Pages
```

Consecuencia práctica: **los apuntes se leen igual de bien desde GitHub que desde la web**, y añadir una nota es crear un fichero.

## Verlo en local

```bash
node serve.js
```

Y abrir <http://localhost:4321>. Hace falta un servidor porque el sitio carga los `.md` con `fetch()`; abrir `index.html` con doble clic lo bloquea el navegador.

## Añadir una nota

1. Crea `contenido/<bloque>/<nombre>.md` con esta cabecera:

   ```markdown
   ---
   titulo: Título de la nota
   subtitulo: true
   tarjetas: true    # sólo en páginas de fichas de herramientas
   ---

   # Título de la nota
   ```

2. Añádela al menú en `contenido/nav.json`.

Las convenciones de formato están explicadas en [Cómo usar estos apuntes](https://kharonte09.github.io/apuntes/#/como-usar).

## Aviso

Apuntes personales de estudio, orientados a **seguridad defensiva**. Pueden contener errores o quedarse desactualizados.

Muchas de las herramientas listadas son de **doble uso**: usarlas contra sistemas ajenos sin autorización expresa y por escrito es un delito. Aquí se recogen para entender los ataques y poder defenderse de ellos.

## Licencia

Contenido bajo [CC BY-SA 4.0](LICENSE). El código del sitio, bajo MIT.
