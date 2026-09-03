---
titulo: Artefactos de Windows
subtitulo: true
---

# Artefactos de Windows

Windows deja rastro de casi todo lo que hace el usuario, aunque el fichero original ya no esté. Estos son los artefactos que más se usan para reconstruir actividad.

## Ficheros LNK

Accesos directos que guardan la **ruta del fichero original** y **las fechas de uso**.

Su valor está en que **sobreviven al fichero**: si alguien abrió un documento desde un USB y luego lo retiró, el LNK sigue ahí y demuestra que ese fichero existió y se abrió.

## Prefetch

Mecanismo que acelera el arranque de aplicaciones guardando pequeños ficheros `.pf` — la chuleta de Windows.

Cada uno indica **cuántas veces se ejecutó un programa** y **cuándo fue la última vez**.

Es de los artefactos más valiosos: demuestra ejecución, no solo presencia. Que un ejecutable esté en disco no prueba que llegara a correr; un Prefetch sí.

## Jump Lists

Listas de **ficheros recientes** y **aplicaciones usadas** desde la barra de tareas.

Sirven para reconstruir la actividad del usuario: qué abrió, con qué y en qué orden.

## Navegadores

**Artefactos disponibles:** cookies, favoritos, descargas, URLs visitadas, búsquedas, caché web e imágenes.

**Rutas típicas:**

| Navegador | Ruta |
|---|---|
| Chrome / Edge | `AppData\Local\...\User Data` |
| Firefox | `AppData\Roaming\Mozilla\Firefox\Profiles` |

**Herramientas:**

| Herramienta | Para qué |
|---|---|
| **KAPE** | Recoge los ficheros |
| **BHC** (Browsing History Capturer) | Extrae de forma forzada |
| **BHV** (Browsing History Viewer) | Analiza historial, imágenes y páginas |

**Qué te permite ver:** qué visitó el usuario, cuándo, qué buscó, qué descargó y qué llegó a ver.

En la práctica, el objetivo suele ser **identificar el origen de una descarga** o de una actividad sospechosa.

---

# Eventos de inicio y cierre de sesión

Permiten identificar **qué cuentas iniciaron sesión, cuándo y cuándo salieron**. Es lo que hace posible atribuir actividad a un usuario concreto.

**Dónde están:**

```text
C:\Windows\System32\winevt\Logs\Security.evtx
```

Se leen con **Event Viewer**, se exportan a CSV para trabajarlos en Excel, o se consultan desde el SIEM si se recogen ahí.

## 4624 — Inicio de sesión correcto

Dice **qué usuario se conectó, cómo y cuándo**. Lo importante es el **Logon Type**:

| Tipo | Significado |
|---|---|
| **2** | Interactivo — teclado, acceso físico |
| **3** | Red — acceso remoto, recursos compartidos |
| **4** | Lote (batch) |
| **5** | Servicio |
| **7** | Desbloqueo de sesión |
| **8** | NetworkClearText — credenciales en claro |
| **9** | NewCredentials — `RunAs /netonly` |

Los que más importan: el **3** porque es el del movimiento lateral, el **8** porque las credenciales viajaron sin cifrar, y el **9** porque es la forma habitual de usar credenciales robadas contra otro sistema.

## 4672 — Inicio de sesión especial

Aparece cuando entra un usuario con **privilegios elevados**: administradores, SYSTEM.

Datos clave:

- **Account Name / SID** — quién es.
- **Logon ID** — sirve para emparejarlo con el 4634 de cierre.

Un **4624 seguido de un 4672 con el mismo Logon ID** es una sesión administrativa. Es la pareja que más se vigila.

## 4625 — Inicio de sesión fallido

La clave para detectar fuerza bruta y abuso de cuentas. Lo interesante es el **código de error**:

| Código | Significado |
|---|---|
| `0xC000006A` | Contraseña incorrecta |
| `0xC000006D` | Usuario incorrecto |
| `0xC0000064` | El usuario no existe |
| `0xC0000072` | Cuenta deshabilitada |
| `0xC0000234` | Cuenta bloqueada |

> [!TIP]
> El código cambia el significado por completo. Muchos `0xC000006A` sobre **una** cuenta es alguien intentando adivinar una contraseña. Muchos `0xC0000064` sobre cuentas **distintas** es enumeración de usuarios: están probando qué cuentas existen, que es un paso anterior y más temprano en la cadena.

## 4634 — Cierre de sesión

Marca cuándo terminó la sesión. Se relaciona con el inicio a través del **Logon ID**.

Existe también el **4647**, cierre iniciado por el propio usuario.

## Cómo se une todo

1. **4624 / 4672** → el inicio de sesión.
2. **Logon ID** → el identificador único de esa sesión.
3. **4634** → el cierre asociado.
4. Con eso construyes la línea de tiempo: cuándo entró, con qué privilegios y cuándo salió.
5. **4625** alrededor de esas horas → los intentos fallidos que hubo cerca.

Combinando 4624/4672 con 4634 sabes **quién accedió, cómo y cuánto tiempo estuvo**. Los 4625 te dicen si alguien estuvo llamando a la puerta antes de conseguirlo.
