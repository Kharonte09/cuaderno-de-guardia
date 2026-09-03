---
titulo: Redactar el informe
subtitulo: true
---

# Redactar el informe

Plantilla de lo que tiene que llevar el informe de un análisis de phishing. Tres partes: **qué era**, **qué hiciste** y **qué hay que hacer ahora**.

## Primera parte: cabeceras, artefactos y cuerpo

### Cabeceras del correo

| Campo | Ejemplo |
|---|---|
| Dirección remitente | `J0hnSm1th@gmail.com` |
| Dirección de respuesta | `F4keacc0unt2421@gmail.com` |
| Fecha de envío | 20 de octubre de 2019, 09:34 |
| IP del servidor emisor | `40.92.10.10` |
| DNS inverso de esa IP | `mail-oln040092010100.outbound.protection.outlook.com` |
| Destinatarios | `jason.s@dominio.com`, `kirsty.p@dominio.com` |
| Asunto | Payroll Update – URGENT! |

### Si el correo lleva URL

Cualquier URL relevante, **saneada**:

```text
hxxps://Healthcare-United[.]com/wp/index/2020/PAYPAL/lure.php
```

> [!WARNING]
> Sanear no es cosmética. Una URL en vivo dentro de un informe es un enlace que alguien va a pulsar sin querer, y algunos clientes de correo y plataformas de tickets la previsualizan solas. Cambia `http` por `hxxp` y mete los puntos del dominio entre corchetes.

### Si el correo lleva adjuntos

- Nombre del fichero **con la extensión**: `PayrollDecember_UK.exe`
- Hashes: **MD5**, **SHA1** y **SHA256**

### Descripción

Un párrafo corto contando qué es el correo y qué pretendía. Quien lea el informe dentro de seis meses no se acuerda del caso.

## Segunda parte: análisis, herramientas y resultados

Aquí se cuenta, brevemente, **qué análisis hiciste, con qué herramienta y qué obtuviste**. Una línea o dos por comprobación.

Ejemplos de cómo queda:

> **Análisis WHOIS:** al consultar el dominio se observa que fue registrado hace 3 días, con NameCheap como registrador. No hay información del propietario del sitio ni del registrante.

> **Reputación en VirusTotal:** al buscar la URL completa y el dominio raíz, ninguno aparece marcado como malicioso actualmente. Probablemente se debe a que el dominio es muy reciente y los motores aún no lo han rastreado.

Fíjate en el segundo: **un resultado negativo también se documenta**, y se explica por qué. "VirusTotal no lo detecta" sin contexto parece que el correo es limpio; con la explicación, es justo lo contrario.

> [!TIP]
> Separa siempre el hecho de la interpretación. *"El dominio se registró hace 3 días"* es un hecho. *"Es una campaña recién montada"* es tu conclusión. Van en frases distintas, para que quien te lea pueda estar de acuerdo con lo primero aunque discuta lo segundo.

## Tercera parte: medidas defensivas

Qué medidas hay que tomar, o cuáles se han tomado ya:

- Bloqueo del dominio o de la URL en el proxy.
- Bloqueo del remitente o del dominio emisor en la pasarela de correo.
- Purga del correo de los buzones que lo recibieron.
- Aviso a los destinatarios.
- Reset de credenciales, si alguien llegó a introducirlas.
- Añadir los indicadores a las listas de bloqueo y al SIEM.

Y lo que quede pendiente, dicho claramente como pendiente.
