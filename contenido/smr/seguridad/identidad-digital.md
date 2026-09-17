---
titulo: Identidad digital
subtitulo: true
---

# Identidad digital

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Firma electrónica, certificado digital y tarjetas inteligentes: las tres formas de demostrar quién eres ante una máquina, y lo que puede salir mal con cada una.

## Las tres tecnologías

| Tecnología | Qué es |
|---|---|
| **Certificado digital** | Un fichero que acredita que una clave pública pertenece a una persona o empresa concreta. Lo emite una autoridad de certificación en la que ambas partes confían |
| **Firma electrónica** | El resultado de firmar un documento con tu clave privada. Demuestra quién firma y que el documento no se ha cambiado después |
| **Tarjeta inteligente** | Una tarjeta con chip, del tamaño de una de crédito, que guarda las claves dentro y hace las operaciones en su propio procesador |

### Cómo encajan

Las tres se apoyan en la **criptografía de clave pública**: cada persona tiene dos claves ligadas entre sí, una **privada** que no sale nunca de su poder y una **pública** que puede repartir.

Lo que se cifra con una solo se descifra con la otra, y eso es lo que hace posible la firma: al firmar con tu clave privada, cualquiera puede comprobarlo con tu clave pública, y solo cuadra si has firmado tú. El **certificado** es lo que une esa clave pública a tu nombre; sin él, la firma demostraría que alguien firmó, pero no quién.

## Qué hace falta para usarlas

| Tecnología | Hardware | Software |
|---|---|---|
| **Firma electrónica** | Nada especial: un ordenador | Aplicación de firma, o el propio navegador |
| **Certificado digital** | Nada especial | Se instala en el navegador o en el almacén del sistema |
| **Tarjeta inteligente** | **Lector** de tarjetas, o de RFID si es sin contacto | El controlador de la tarjeta y el software que la usa |

En España cualquier persona con DNI o NIE puede solicitar su certificado digital **de forma gratuita**, y el DNI electrónico funciona como tarjeta inteligente: lleva el chip con los certificados dentro y necesita un lector.

## Los riesgos de cada una

### Tarjetas inteligentes

- **Clonado**: copiar el contenido a una tarjeta virgen. Es la razón por la que las tarjetas modernas guardan la clave privada de forma que **no se puede extraer**, y hacen las operaciones dentro del chip.
- **Lectura sin contacto** no autorizada, en las tarjetas RFID: acercar un lector sin que el dueño se entere.
- **Pérdida o robo** del objeto físico, que es un riesgo que las otras dos no tienen.

### Certificado digital

- **No saber quién firma de verdad**: si se confía en una autoridad de certificación que no es de fiar, o si alguien consigue que una autoridad legítima emita un certificado a su nombre.
- **Exportarlo del navegador**: un certificado instalado sin contraseña de protección se lo puede llevar cualquiera que se siente en el equipo.
- **Caducidad y revocación**: un certificado caducado deja de valer, y uno comprometido hay que revocarlo activamente para que deje de ser válido.

### Firma electrónica

- **Robo de la clave privada**, que permite firmar en tu nombre. Es el riesgo grande: quien la tenga es tú, a efectos prácticos.
- **Firmar sin leer**, el más frecuente de todos: aceptar una firma en un documento que no se ha revisado.

> [!WARNING]
> Ninguna de las tres protege contra el equipo comprometido. Si hay malware en el ordenador, puede esperar a que introduzcas la tarjeta o desbloquees el certificado y firmar en ese momento algo distinto de lo que crees estar firmando.

## Cuál es más segura

La **tarjeta inteligente física**, porque la clave privada vive dentro del chip y no se copia: para usarla hay que tenerla en la mano y saber su PIN. Ese es su punto fuerte, y a la vez su punto débil, porque se puede perder.

Un certificado en el navegador es cómodo y no se pierde, pero es un fichero: se puede copiar. Y eso es lo que decide el nivel de riesgo.

## Si te roban la identidad digital

1. **Revocar** inmediatamente el certificado ante la autoridad que lo emitió, o **bloquear** la tarjeta ante quien la expidió. Una vez revocado, deja de ser válido para firmar.
2. **Denunciar** ante la policía, que es lo que permite defenderse de lo que se haya hecho en tu nombre.
3. **Avisar** a las entidades donde esa identidad se estuviera usando.
4. **Revisar** qué se firmó mientras estuvo en manos ajenas.

## Sí, deja rastro

Firmar electrónicamente deja huella igual que firmar a mano, y con la misma validez legal. Queda registro de la firma, de su sello de tiempo y del certificado con el que se hizo.

Las dos se pueden falsificar, y las dos dejan evidencias de haberlo hecho. La diferencia es que en la digital las evidencias son más precisas: quién, cuándo, con qué clave y sobre qué contenido exacto.

> [!NOTE]
> El marco legal está en el **Reglamento eIDAS** europeo y en la ley española de servicios electrónicos de confianza. Ahí se distinguen los tipos de firma (simple, avanzada y cualificada) y **solo la cualificada** tiene el mismo efecto que la manuscrita ante cualquier organismo. Es la que se obtiene con certificado cualificado o con el DNI electrónico.
