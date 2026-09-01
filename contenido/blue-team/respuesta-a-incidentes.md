---
titulo: Respuesta a incidentes
subtitulo: true
---

# Respuesta a incidentes

Cuando el triaje confirma que hay algo real, se abre un incidente. El marco de referencia es **NIST SP 800-61** y su versión mnemotécnica de SANS, **PICERL**.

## Las seis fases

### 1. Preparación

Todo lo que se hace **antes** de que pase nada, y lo que realmente determina cómo saldrá el incidente:

- Plan de respuesta escrito, con roles y suplentes.
- **Lista de contactos fuera de banda**: teléfonos personales, no sólo el correo corporativo (que puede estar comprometido o caído).
- Playbooks por tipo de incidente (ransomware, phishing, cuenta comprometida, fuga de datos).
- Herramientas listas y probadas: kit forense, medios de adquisición, VMs de análisis.
- Copias de seguridad **probadas**, inmutables y desconectadas.
- Acuerdos previos: retenedor con un equipo de IR externo, contacto legal, seguro cibernético.
- Formación y simulacros. Un plan sin ensayar no es un plan.

> [!IMPORTANT]
> Es la única fase que se puede hacer con calma. Lo que no esté preparado antes se improvisará durante el incidente.

### 2. Identificación

Confirmar que hay incidente, determinar su alcance y clasificarlo.

- ¿Qué ha pasado, desde cuándo y qué sistemas están afectados?
- ¿Cuál es el vector inicial? Sin esto no se puede erradicar.
- ¿Hay datos personales implicados? → arranca el reloj del RGPD.
- Clasificar severidad y activar el nivel de escalado correspondiente.
- **Abrir el registro del incidente**: bitácora cronológica de todo lo que se hace, con hora UTC y quién lo hizo.

### 3. Contención

Frenar la hemorragia. Se distingue entre:

- **Contención a corto plazo**: aislar el equipo de la red (el EDR permite hacerlo sin apagar), deshabilitar la cuenta, bloquear la IP/dominio en el perímetro, cortar la regla de firewall.
- **Contención a largo plazo**: parches temporales, segmentación, reforzar credenciales, mantener el servicio funcionando mientras se prepara la erradicación.

> [!CAUTION]
> **No apagues el equipo.** Aísla la red, pero deja el sistema encendido: la memoria RAM contiene procesos, claves de cifrado y conexiones que se pierden para siempre al apagar. Volca la memoria antes de tocar nada más.

Decisiones difíciles de esta fase:
- ¿Aislar ya (y avisar al atacante de que le hemos visto) o vigilar para entender el alcance? Depende del riesgo de daño inmediato; ante ransomware, se aísla siempre.
- ¿Rotar credenciales ahora o después? Si se rota parcialmente, el atacante lo nota y acelera.

### 4. Erradicación

Eliminar la presencia del atacante:

- Borrar malware y **todos** los mecanismos de persistencia (suele haber más de uno).
- Cerrar el vector de entrada: parchear, cambiar configuración, quitar el acceso expuesto.
- Rotar credenciales de todo lo comprometido. Si hubo volcado de LSASS o acceso a un DC: **rotar el `krbtgt` dos veces**.
- Revisar cuentas, reglas de reenvío de correo, aplicaciones OAuth autorizadas, claves SSH y tokens de API.

> [!WARNING]
> Si el compromiso llegó al controlador de dominio, la única salida limpia y defendible suele ser **reconstruir el dominio**. Limpiar un AD comprometido a mano deja puertas traseras que se descubren meses después.

### 5. Recuperación

Volver a producción de forma controlada:

- Restaurar desde copias **verificadas como limpias** (comprobando que la copia es anterior al compromiso, no sólo anterior al cifrado).
- Reincorporar por fases, no todo de golpe.
- **Monitorización reforzada** durante semanas: es habitual que el atacante intente volver, y con frecuencia lo hace por el mismo sitio.
- Criterios de salida definidos: qué tiene que cumplirse para declarar el incidente cerrado.

### 6. Lecciones aprendidas

Reunión en caliente (menos de dos semanas después) con todos los implicados:

- Cronología definitiva de qué pasó y cuándo.
- Qué funcionó, qué falló y **qué habría reducido el impacto**.
- Acciones concretas, con responsable y fecha.
- Nuevas detecciones a escribir a partir de este incidente.
- Actualizar el playbook con lo aprendido.

> [!TIP]
> La reunión es *blameless*: si se busca culpable, la gente deja de reportar incidentes a tiempo.

## Clasificación de severidad

Una escala sencilla y usable:

| Nivel | Criterio | Respuesta |
|---|---|---|
| **Crítico** | Producción parada, ransomware activo, DC comprometido, exfiltración confirmada | Todo el equipo, dirección informada, 24×7 |
| **Alto** | Compromiso confirmado de equipo o cuenta con privilegios, malware activo | Equipo de IR, escalado a responsable |
| **Medio** | Malware contenido por el EDR, cuenta de usuario comprometida sin impacto | Analista asignado, horario laboral |
| **Bajo** | Intento fallido, phishing no clicado, política incumplida | Registro y seguimiento |

## Playbook: ransomware

1. **Aislar** de inmediato los equipos afectados (red, no apagar) y desconectar unidades compartidas.
2. **Proteger las copias**: verificar que el repositorio de backup no es accesible desde la red comprometida. Es el primer objetivo del atacante.
3. **Volcar memoria** de al menos un equipo afectado antes de tocarlo.
4. **Identificar la familia** (ID Ransomware, nota de rescate, extensión) y comprobar si hay descifrador público en **No More Ransom**.
5. **Buscar la exfiltración**: revisar tráfico saliente de los días previos. Casi siempre hubo robo antes del cifrado.
6. **Determinar el paciente cero** y el vector.
7. **Activar notificaciones legales** (AEPD si hay datos personales, NIS2 si aplica) y contactar con el seguro.
8. **Reconstruir**, no limpiar. Restaurar desde copia limpia sobre sistemas nuevos.
9. No pagar sin decisión de dirección, asesoría legal y análisis; pagar no garantiza recuperar ni evita la publicación.

## Playbook: cuenta comprometida

1. Confirmar con los logs de identidad (inicio de sesión desde IP/país/dispositivo anómalo).
2. **Revocar sesiones activas** — no basta con cambiar la contraseña: los tokens de sesión siguen vivos.
3. Cambiar contraseña y **revisar los métodos de MFA registrados** (el atacante suele añadir el suyo).
4. Revisar **reglas de reenvío y de bandeja** en el correo — el truco más común para leer sin ser visto.
5. Revisar aplicaciones OAuth consentidas y accesos a la nube.
6. Ver qué hizo la cuenta: ficheros accedidos, correos enviados, permisos concedidos.
7. Comprobar si el correo se usó para fraude interno (facturas, cambio de cuenta bancaria).
8. Avisar a los destinatarios de correos maliciosos enviados desde esa cuenta.

## La bitácora del incidente

Se abre al principio y se rellena en tiempo real. Como mínimo:

| Hora (UTC) | Quién | Acción | Resultado / evidencia |
|---|---|---|---|
| 09:14 | analista1 | Alerta EDR en PC-042, aislado por red | ID caso 1234 |
| 09:22 | analista2 | Volcado de memoria con WinPMEM | `mem.raw` SHA256 `ab12…` |
| 09:40 | analista1 | Bloqueada IP 203.0.113.45 en perímetro | Cambio FW-882 |

Sostiene el informe final, la notificación legal y, si llega el caso, el procedimiento judicial.
