---
titulo: Tipos de software
subtitulo: true
---

# Tipos de software

Cómo se clasifica todo lo que no es hardware: desde el lenguaje que entiende el procesador hasta el programa con el que escribes una factura.

## Los lenguajes, por nivel

"Nivel" aquí significa distancia respecto a la máquina: cuanto más bajo el nivel, más cerca del hardware y más lejos de cómo piensa una persona.

| Nivel | Qué es | Ejemplos |
|---|---|---|
| **Bajo** | El lenguaje máquina, en binario. Lo único que ejecuta el procesador directamente | Código máquina |
| **Medio** | Ensamblador: una instrucción del procesador por línea, pero escrita con palabras | Assembly |
| **Alto** | Lenguajes con estructuras que se leen casi como texto, independientes del procesador | C, C++, Java, Python, Pascal, COBOL, Fortran |

Para pasar de un lenguaje de alto nivel a lenguaje máquina hacen falta:

- **Compiladores** — traducen el programa entero antes de ejecutarlo, y producen un ejecutable.
- **Intérpretes** — traducen y ejecutan línea a línea, cada vez que se lanza el programa.
- **Ensambladores** — el traductor específico del lenguaje ensamblador.

> [!NOTE]
> Un programa compilado va más rápido y no necesita nada instalado para ejecutarse, pero hay que compilarlo para cada sistema. Un programa interpretado funciona en cualquier sitio donde esté su intérprete, a cambio de algo de velocidad.

## El software, por su función

| Tipo | Qué hace |
|---|---|
| **Software de sistema** | Sistema operativo, controladores y utilidades básicas. Hace funcionar la máquina |
| **Software de programación** | Editores, compiladores y entornos de desarrollo. Sirve para crear más software |
| **Software de aplicación** | Lo que usa la persona para su trabajo |

## Aplicaciones informáticas

### Ofimática

| Tipo | Privativo | Libre o gratuito |
|---|---|---|
| **Procesador de texto** | Word, WordPad | LibreOffice Writer, Google Docs |
| **Hoja de cálculo** | Excel, Lotus | LibreOffice Calc, Google Sheets |
| **Presentaciones** | PowerPoint, Freelance Graphics | LibreOffice Impress, Canva (en línea) |
| **Base de datos** | Access, dBase | LibreOffice Base |
| **Correo y agenda** | Outlook | Thunderbird |
| **Notas** | OneNote | Joplin, Obsidian |

### Otras familias

- **Diseño gráfico** — Photoshop, CorelDRAW, Illustrator, frente a GIMP, Krita o Inkscape.
- **Diseño asistido (CAD)** — AutoCAD, frente a FreeCAD o LibreCAD.
- **Gestión económica y facturación** — programas de contabilidad, nóminas y facturas.
- **Multimedia** — edición de vídeo, audio e imagen.
- **Navegadores** y aplicaciones de internet.
- **Seguridad** — antivirus, cortafuegos, copias de seguridad.

## Tipos de licencia

Esta es la parte que hay que tener clara, porque instalar software en un cliente sin mirar la licencia sale caro:

| Licencia | Qué permite |
|---|---|
| **Privativa** | Uso según contrato, sin acceso al código. Normalmente de pago y por equipo o por usuario |
| **Libre** | Usar, estudiar, modificar y redistribuir. GPL, MIT, Apache |
| **Freeware** | Gratis, pero sin acceso al código ni derecho a modificarlo |
| **Shareware** | Gratis un tiempo o con funciones limitadas, y luego de pago |
| **Suscripción** | Pago periódico mientras se use, muy habitual hoy |
| **OEM** | Ligada al equipo con el que se compró; no se puede mover a otro |
| **Dominio público** | Sin derechos reservados, cualquier uso |

> [!IMPORTANT]
> **Gratis y libre no son lo mismo.** Hay software gratuito que no permite modificarlo ni redistribuirlo (freeware), y software libre que se puede vender. Lo que define al libre son los permisos que da, no el precio.
