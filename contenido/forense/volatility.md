---
titulo: Volatility
subtitulo: true
---

# Volatility

Herramienta forense de **análisis de memoria RAM**, open source y escrita en Python. Se usa en respuesta a incidentes y en análisis de malware, y funciona sobre volcados de Windows, Linux y macOS.

Con ella puedes:

- Ver los **procesos** que estaban activos.
- Ver **conexiones de red**.
- Revisar historial de navegación.
- Recuperar **ficheros y datos que estaban en memoria**.
- Leer textos abiertos en Notepad.
- Ver comandos ejecutados en CMD.
- Buscar malware con **YARA**.
- Sacar capturas de pantalla, portapapeles, contraseñas cifradas y claves SSL.

> [!IMPORTANT]
> La memoria contiene cosas que **nunca tocan el disco**: malware que solo vive en RAM, claves de cifrado, contenido descifrado, procesos ya inyectados. Por eso el volcado de memoria se toma **antes** de apagar nada.

## Volatility 3

Reescritura completa del framework, publicada en 2020. Sustituye a Volatility 2, cuya última versión es de 2011 y cuyo soporte terminó en agosto de 2021.

### Qué cambió

**1. Los perfiles ya no hacen falta.**

En Volatility 2 había que sacar el perfil primero con `imageinfo` e incluirlo en cada comando (`--profile=Win7SP1x64`). Volatility 3 usa **tablas de símbolos**, que identifican las estructuras en memoria sin necesidad de perfil.

**2. Los plugins ahora son específicos del sistema operativo.**

Antes el plugin iba suelto (`pslist`, `svcscan`). Ahora lleva prefijo: `windows.pstree`, `linux.pstree`, `mac.pstree`.

### Equivalencias

| Propósito | Volatility 2 | Volatility 3 |
|---|---|---|
| Árbol de procesos | `volatility --profile=PERFIL pstree -f file.dmp` | `python3 vol.py -f file.dmp windows.pstree` |
| Listar servicios | `volatility --profile=PERFIL svcscan -f file.dmp` | `python3 vol.py -f file.dmp windows.svcscan` |
| Hives del registro | `volatility --profile=PERFIL hivelist -f file.dmp` | `python3 vol.py -f file.dmp windows.registry.hivelist` |
| Línea de comandos | `volatility --profile=PERFIL cmdline -f file.dmp` | `python3 vol.py -f file.dmp windows.cmdline` |

---

# Qué buscar en un volcado

La parte que no es sintaxis: dónde mirar y qué es sospechoso.

## 1. Procesos — `pslist`, `pstree`

**Señales fáciles:**

- Nombres **parecidos a los de Windows pero mal escritos**: `svch0st.exe`, `exp1orer.exe`.
- Procesos **sin ruta o con ruta rara**: `C:\Users\Public\`, `AppData\Roaming\`, `Temp\`.
- **Árbol de procesos anómalo**: hijos que no deberían colgar de ese padre.
- Programas que no se inician solos sin motivo: `cmd.exe`, `powershell.exe` sin contexto que lo explique.

> `powershell.exe` ejecutado desde `AppData\Roaming` es malo casi con seguridad.

## 2. Red — `netscan`

**Sospechoso si:**

- Conexiones a **IPs externas extrañas**: rangos raros, países que no encajan con la operación.
- Conexiones establecidas por procesos que **no deberían tener red**: `winword.exe`, `notepad.exe`.
- Puertos altos o inusuales abiertos por procesos desconocidos.

> `notepad.exe` conectado al puerto 4444 es sospechoso. El 4444 es el puerto por defecto de Metasploit.

## 3. Ficheros en memoria — `filescan`

**Presta atención a:**

- **Ejecutables en carpetas de usuario**: `AppData`, `Temp`, `Downloads`.
- Ficheros con **nombres aleatorios**: `asd12.exe`, `xyjk.tmp`, `abc123.ps1`.
- Ficheros **creados justo antes del incidente**.

> Un `.exe` en `C:\Users\Public` casi nunca es legítimo.

## 4. Línea de tiempo — `timeliner`

**Busca:**

- Actividad **concentrada en pocos minutos**: descarga → ejecución → conexión → modificación.
- Ficheros nuevos o modificados poco antes del incidente.
- Comandos de PowerShell o CMD ejecutados rápidamente uno tras otro.

> Tres minutos antes del incidente se crean y ejecutan ficheros en `Roaming` → ahí está.

## 5. Comandos sospechosos — `cmdline`, `consoles`

Si aparecen cosas como estas, casi siempre es actividad maliciosa:

```text
Invoke-WebRequest
powershell -enc <base64>
curl http://...
cmd /c whoami
net user /add
```

El `-enc` es especialmente llamativo: sirve para pasar un comando en Base64, y su función práctica es que no se lea a simple vista en los logs.

---

# Volatility Workbench

Versión **gráfica** de Volatility 3. Gratuita, open source y solo para Windows. Permite analizar memoria sin CLI ni Python.

**Ventajas:**

- No necesitas Python instalado ni memorizar comandos.
- Guarda la plataforma y la lista de procesos en un `.CFG`, lo que ahorra tiempo al recargar la misma imagen.
- Copiar, pegar y guardar resultados es mucho más cómodo.
- Menú desplegable con los comandos y una descripción breve de cada uno.
- Marca de tiempo de los comandos ejecutados.

**Uso básico:**

1. Abrir `VolatilityWorkbench.exe`.
2. Importar la imagen de memoria con **Browse Image**.
3. Seleccionar la **plataforma** y el comando en los desplegables.
4. Ejecutar — por ejemplo `windows.pslist`.
5. Copiar al portapapeles o **Save to file**.
