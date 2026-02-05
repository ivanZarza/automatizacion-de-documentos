# Dependencias instaladas para generador de documentos PDF en Nuxt

## 1. @nuxt/content
Permite gestionar y renderizar contenido Markdown y HTML de forma sencilla en Nuxt. Útil para cargar y mostrar documentos que luego puedes convertir a PDF.
- Uso: Puedes crear archivos `.md` o `.html` en la carpeta `content` y acceder a ellos desde tus páginas usando composables como `useContent()`.
- Ejemplo de uso en una página:

```vue
<script setup>
import { useContent } from '@nuxt/content';
const { data } = await useContent('mi-documento').fetch();
</script>
<template>
  <div v-html="data.body" />
</template>
```
- Configuración: Añade el módulo en `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

## 2. @vueuse/core
Colección de utilidades reactivas para Vue y Nuxt. Facilita tareas como manipulación de estados, eventos, sensores, etc.
- Ejemplo de uso:
```js
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const toggleDark = useToggle(isDark);
```
- No requiere configuración especial.

## 3. html2pdf.js
Librería frontend para convertir HTML directamente a PDF en el navegador.
- Ejemplo de uso:
```js
import html2pdf from 'html2pdf.js';
function exportarPDF() {
  const elemento = document.getElementById('contenido-pdf');
  html2pdf().from(elemento).set({
    margin: 1,
    filename: 'documento.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).save();
}
```
- Opciones de configuración:
  - margin: Margen del PDF.
  - filename: Nombre del archivo.
  - html2canvas: Opciones para la captura del HTML.
  - jsPDF: Opciones para el PDF generado.

## 4. jspdf
Otra librería frontend para generar PDFs, con más control sobre el contenido y formato.
- Ejemplo de uso:
```js
import jsPDF from 'jspdf';
function exportarPDF() {
  const doc = new jsPDF();
  doc.text('¡Hola mundo!', 10, 10);
  doc.save('ejemplo.pdf');
}
```
- Opciones de configuración:
  - Puedes añadir imágenes, tablas, estilos, etc. Consulta la [documentación oficial](https://github.com/parallax/jsPDF).

## 5. @nuxtjs/tailwindcss
Integra Tailwind CSS en Nuxt para estilos rápidos y modernos.
- Configuración en `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```
- Ejemplo de uso:
```vue
<template>
  <div class="p-4 bg-gray-100 rounded-lg">Contenido estilizado</div>
</template>
```
- Puedes personalizar Tailwind en `tailwind.config.js`.

## 6. @nuxt/image
Optimiza y gestiona imágenes en Nuxt, útil si tus PDFs incluyen imágenes.
- Configuración en `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/image']
})
```
- Ejemplo de uso:
```vue
<template>
  <NuxtImg src="/mi-imagen.jpg" width="400" height="300" />
</template>
```

## 7. @nuxt/devtools
Herramientas avanzadas para desarrollo en Nuxt, como inspección de componentes y rutas.
- Configuración en `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/devtools']
})
```
- Uso: Accede a las DevTools desde el navegador en modo desarrollo (`http://localhost:3000/__nuxt__`).

---

## Ejemplo de uso para generar PDF

1. Crea una página o componente con el contenido HTML que quieres exportar.
2. Instancia html2pdf.js o jspdf en un método y pásale el elemento HTML:

```js
import html2pdf from 'html2pdf.js';
function exportarPDF() {
  const elemento = document.getElementById('contenido-pdf');
  html2pdf().from(elemento).save();
}
```

3. Usa Tailwind para dar estilo al contenido y @nuxt/content para gestionarlo si es dinámico.

---

Si necesitas ejemplos de código más detallados o ayuda con la configuración de algún módulo, dímelo.
