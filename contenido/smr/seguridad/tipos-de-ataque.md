---
titulo: Ataques reales y qué enseñan
subtitulo: true
---

# Ataques reales y qué enseñan

Tres casos que salieron en la prensa española, contados por el mecanismo que usaron. Ninguno necesitó nada exótico: los tres explotaron un proceso mal montado.

## El cambio de número de cuenta

**Qué pasó.** Un ayuntamiento pagó cerca de un millón de euros a los atacantes en lugar de a la empresa que había contratado. Los atacantes vigilaron durante un tiempo, accedieron al correo de la empresa proveedora y, desde esa cuenta legítima, pidieron al ayuntamiento que cambiara el número de cuenta donde se hacían los pagos. Se pagó en tres plazos antes de que nadie se diera cuenta; el aviso llegó de fuera, del banco.

**El mecanismo.** Es lo que se llama **fraude del CEO** o **BEC** (*Business Email Compromise*), y funciona porque el correo viene de la dirección de verdad: no hay remitente falso que detectar ni enlace sospechoso que no pulsar. Antes hubo un periodo de **vigilancia**, leyendo la correspondencia para saber cuándo y cómo pedirlo, y con qué tono.

**Qué lo habría parado.** No un antivirus, sino un **procedimiento**: que cualquier cambio de datos bancarios se confirme por un canal distinto (una llamada al teléfono que ya se tenía fichado, no al que venga en el correo) y que lo autorice más de una persona. Y detrás, **doble factor** en el correo corporativo, que es lo que habría impedido el acceso inicial.

> [!IMPORTANT]
> La lección que más se repite en este caso: **un correo legítimo puede traer una petición fraudulenta.** Verificar el remitente no basta cuando el remitente ha sido comprometido.

## El ransomware que paró una consultora

**Qué pasó.** Una gran consultora tecnológica sufrió un ataque de **ransomware** que bloqueó casi todos sus sistemas. Mandó a la plantilla a casa y les pidió expresamente que **no encendieran los equipos ni los conectaran a la red** de la empresa. El coste declarado del incidente fue de millones de euros.

**El mecanismo.** El ransomware cifra los ficheros y pide un rescate. Pero el daño real no fue el cifrado: fue la **parada del negocio**. Y la indicación de no conectar los equipos revela el problema de fondo: una vez dentro, el ataque se **propaga por la red interna**, así que cada portátil que se conecta puede reinfectar lo que ya se ha limpiado.

**Qué lo habría contenido.** Copias de seguridad **aisladas** de la red y probadas de verdad. **Segmentación**, para que un equipo infectado no alcance a toda la organización. Y un **plan de respuesta** escrito de antes, porque la decisión de desconectar hay que tomarla en minutos, no improvisarla.

## El exempleado

**Qué pasó.** Un informático de una empresa de reservas hoteleras fue detenido por sabotear su base de datos después de ser despedido. Los clientes que entraban en la web se encontraban un mensaje que decía que estaba cerrado por covid. La empresa perdió cientos de reservas.

**El mecanismo.** Es la **amenaza interna**, y no requiere ningún ataque: requiere que las credenciales sigan funcionando después de que la persona se haya ido.

**Qué lo habría parado.** Un proceso de **baja** que revoque todos los accesos el mismo día: cuentas, VPN, claves de administración, accesos a los sistemas de terceros. Cuentas **personales y no compartidas**, para poder retirar una sin romper el trabajo del resto. Y **registro** de quién hace cada cosa, que es lo que permite demostrarlo después.

> [!NOTE]
> Este caso se resolvió porque quedó rastro. Los registros no evitan el daño, pero son la diferencia entre una sospecha y una denuncia que llega a algo.

## El patrón común

| Caso | Lo que falló | Lo que no era el problema |
|---|---|---|
| Cambio de cuenta | Un procedimiento de pago sin verificación | La tecnología del correo |
| Ransomware | Copias y segmentación | El desconocimiento de la plantilla |
| Sabotaje interno | La gestión de bajas | La sofisticación del atacante |

En los tres, la parte técnica era la fácil. Lo que abrió la puerta fue un **proceso**: cómo se autoriza un pago, cómo se guardan las copias, cómo se da de baja a alguien.

Y en los tres, el incidente se detectó **tarde y desde fuera**: el banco, el cifrado ya hecho, los clientes. Detectar antes es, casi siempre, lo que separa un susto de una cifra con seis ceros.
