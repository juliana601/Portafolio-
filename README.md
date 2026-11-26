# Portafolio — Juliana Vargas

Portafolio personal en Next.js / React. Mascota original **Nox**, construida con SVG articulado y animación por JavaScript; no depende de WebGL, GLB, GSAP ni Tailwind. La narrativa usa scroll nativo, CSS sticky y valores de progreso calculados con requestAnimationFrame.

## Arrancar en Windows (PowerShell)

1. Descomprime el ZIP en una carpeta nueva, por ejemplo `C:\proyectos\portafolio-nox`. Conserva tu proyecto anterior intacto.
2. Abre la carpeta `portafolio-nox` en Visual Studio Code (debe contener `package.json`).
3. Ejecuta:

```powershell
npm install
npm run dev
```

Abre http://localhost:3000. Para verificar producción: `npm run build`. Para comprobar ESLint: `npm run lint`.

El ZIP no incluye `node_modules`, `.next`, `.git` ni archivos `.env`. Se conserva la versión de Next y React del proyecto original.

## Interacciones

- Mueve el mouse para que Nox se acerque y te siga con la mirada. Sin movimiento, explora su entorno.
- Haz clic o toca un espacio libre para invocar una estrella. Nox se acerca y la recoge, dejando partículas.
- Haz clic directamente en Nox para saludarlo. Usa NOX ON/OFF si deseas ocultar la mascota.
- Desliza para transformar el hero. La exposición de proyectos se mueve horizontalmente en escritorios con suficiente espacio; en móvil se recorre verticalmente.
- Los botones 01 / 02 / 03 llevan a cada proyecto y «Explorar proyecto» abre una ficha con la información existente. Escape cierra el diálogo o el menú.
- La mascota reaparece al entrar y salir de secciones y permanece en Contacto. Se reduce la animación si el sistema solicita menos movimiento.

## Imágenes y contacto incorporados

Las tres capturas reales de proyectos y el retrato generado a partir de las fotos de referencia y aprobado por Juliana están incluidos en `public/images/` (`profile.jpg`, `effiadmi.jpg`, `alquipc.jpg`, `tienda.jpg`). Se optimizaron como JPG sin cambiar su composición. El correo y el número de teléfono proporcionados están en `contactLinks` dentro de `src/app/components/sections/PortfolioContent.jsx`. Se conserva GitHub; no se añadieron LinkedIn, otros repositorios ni hoja de vida. El teléfono abre el marcador mediante `tel:` y el correo utiliza `mailto:`. Al publicar el sitio, ambos serán visibles públicamente.

## Archivos principales

- `src/app/components/hero/Hero.jsx`: portada y menú.
- `src/app/components/experience/Nox.jsx`: dibujo SVG, animación, estrellas y eventos.
- `src/app/components/experience/flight.js`: sistema de vuelo con aceleración, frenado y límites.
- `src/app/components/experience/ScrollStory.jsx`: controlador de narrativa y galería.
- `src/app/components/sections/PortfolioContent.jsx`: contenido profesional y fichas de proyecto.
- `src/app/globals.css`: sistema visual y responsive.

## Verificación realizada

Los componentes fueron transpilados a JavaScript y comprobados con React en Chromium a 1440×900 y 390×844. Se verificaron el seguimiento del cursor, la captura de estrellas, navegación, galería horizontal, diálogo de proyecto, Escape y ausencia de desbordamiento horizontal en la vista móvil ensayada. No se pudo ejecutar una compilación de Next completa en el entorno Linux: el ZIP original trae SWC de Windows y no hay acceso al registro de npm. La prueba del proyecto Next se debe completar en Windows. La fuente Space Grotesk se obtiene de Google Fonts cuando hay conexión y tiene un fallback a Arial.
