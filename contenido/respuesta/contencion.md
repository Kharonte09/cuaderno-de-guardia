---
titulo: Contención, erradicación y recuperación
subtitulo: true
---

# Contención, erradicación y recuperación

La fase tres del ciclo, y la que más presión tiene encima: hay que parar el daño sin destruir las pruebas que necesitas después.

---

# Contención

Busca **limitar daños y evitar la propagación**, protegiendo a la vez las pruebas forenses.

## A corto plazo

Medidas rápidas para detener el incidente y evitar más daño:

- Deshabilitar cuentas comprometidas
- Aislar dispositivos infectados
- Bloquear IPs maliciosas

**No resuelve la causa**, solo detiene la hemorragia.

## A largo plazo

Soluciones permanentes que previenen la recurrencia:

- Parchear vulnerabilidades
- Mejorar la segmentación de red
- Ajustar permisos
- Desplegar nuevas herramientas de seguridad

## Medidas por área

| Área | Medidas |
|---|---|
| **Perimetral** | Bloquear tráfico, IDS/IPS, WAF, DNS de ruta nula |
| **Red** | Aislar VLANs o segmentos, bloquear puertos, IPs o MAC, ACLs |
| **Endpoint** | Desconectar de red, apagar el sistema, firewall local, HIPS o aislamiento |

La eficacia de la contención **se comprueba**, no se supone: monitorizando el vector de ataque y el tráfico de los sistemas comprometidos, con alertas y reglas en el SIEM que confirmen que las medidas están funcionando.

> [!WARNING]
> "Apagar el sistema" y "desconectarlo de la red" no son lo mismo ni de lejos. Apagarlo **destruye la memoria RAM**, y con ella el malware que solo vivía ahí, las claves de cifrado y las conexiones activas. Si vas a hacer análisis forense, se aísla de red pero se deja encendido.

## Conservar las evidencias

Durante la respuesta hay que conservar **todas las pruebas posibles**, para analizar qué ocurrió, qué TTPs usó el atacante y sacar IOCs que puedan compartirse con otras organizaciones.

Para eso se hacen **imágenes forenses de disco** y **volcados de RAM**.

| Herramienta | Uso |
|---|---|
| **FTK Imager** | Adquisición de imágenes de disco y memoria |
| **KAPE** | Recopilación de artefactos e información volátil |

El procedimiento:

1. Los discos se copian con **bloqueadores de escritura**, para obtener una imagen **bit a bit** sin alterar la evidencia.
2. Se **verifican los hashes** para asegurar la integridad.
3. En entornos virtuales (Citrix, VDI) se toma una **instantánea** de la máquina, se monta en un sistema forense y desde ahí se genera la imagen.

> [!IMPORTANT]
> El hash es lo que sostiene la cadena de custodia. Si más adelante alguien pregunta si la imagen se alteró, la respuesta es el hash tomado en el momento de la adquisición y comprobado después. Sin eso, la evidencia vale mucho menos.

---

# Erradicación

Los **artefactos maliciosos** son los elementos creados o usados por el atacante: malware, procesos en ejecución, tareas programadas, entradas de registro, ficheros generados por un keylogger.

Hay que identificarlos y eliminarlos, **porque si no el atacante mantiene el acceso aunque parchees el sistema**.

## Identificar artefactos

Revisando procesos, conexiones de red, cuentas de usuario, descargas, tareas programadas y entradas de registro.

Herramientas útiles:

- **Sysinternals Process Explorer** — procesos y qué los lanzó
- **Rootkit Revealer** — malware oculto
- **netstat** — conexiones activas

## Eliminarlos

| Método | Cuándo |
|---|---|
| **Reimagen del sistema** | Lo más seguro: restaurar desde copia limpia. Se pierden los datos recientes |
| **Antimalware** | Antivirus tradicional o de nueva generación con análisis predictivo |
| **Herramientas de arranque** | Desde USB o CD, para malware que se defiende con el sistema arrancado. McAfee Stinger, Microsoft MSRT, Avira Rescue System |
| **Borrado de ficheros** | Eliminar herramientas ofensivas o malware encontrado, para evitar usos accidentales |
| **Eliminar persistencia** | Claves de registro, tareas programadas en Windows, trabajos cron en Linux |

> [!TIP]
> El último punto es el que más se olvida y el que hace que un incidente "cerrado" vuelva a los tres días. Antes de dar por erradicado, la pregunta es: **¿cómo sobrevivía esto a un reinicio?** Si no sabes responderla, no está erradicado.

---

# Recuperación

Una vez contenido el incidente, recogidas las pruebas y eliminados los artefactos, toca **identificar la causa raíz** y restaurar los sistemas a producción.

## Causa raíz

Puede ser evidente —un usuario abrió un correo malicioso— o requerir análisis profundo apoyándose en marcos como la **Cyber Kill Chain** o **MITRE ATT&CK**.

El análisis forense de los sistemas afectados ayuda a entender cómo empezó y cómo se desarrolló el ataque, **asegurando que el punto de entrada quede cerrado antes de restaurar operaciones**.

Restaurar sin haber cerrado la vía de entrada es reproducir el incidente.

## Acciones de recuperación

- Parchear sistemas y aplicaciones.
- Deshabilitar servicios innecesarios.
- Actualizar reglas de EDR, antivirus, IDPS y SIEM.
- **Formar o apoyar al personal** si hubo error humano.
- Compartir los indicadores de compromiso con otras organizaciones, para mejorar la defensa colectiva.

Fíjate en el cuarto punto: dice *formar o apoyar*, no *sancionar*. Si el que picó acaba señalado, el siguiente no reporta.
