<template>
  <div>
    <div ref="sheet" class="sheet" :style="{ width: props.width + 'px', height: props.height + 'px' }">
      <img :src="props.imageUrl" class="sheet-bg" alt="Fondo" />

      <div
        v-for="f in fields"
        :key="f.id"
        class="field"
        :style="{ left: f.x + 'px', top: f.y + 'px', fontSize: (f.fontSize || 12) + 'px' }"
      >
        {{ f.text }}
      </div>
    </div>

    <div class="controls">
      <button @click="printDocument">Exportar PDF</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageUrl: { type: String, required: true },
  fields: { type: Array, default: () => [] },
  width: { type: Number, default: 800 },
  height: { type: Number, default: 1131 }
})

const sheet = ref(null)

async function waitForImagesAndFonts () {
  // Esperar fuentes
  if (document.fonts && document.fonts.ready) await document.fonts.ready

  // Esperar imágenes dentro del sheet
  if (!sheet.value) return
  const imgs = sheet.value.querySelectorAll('img')
  await Promise.all(Array.from(imgs).map(img => {
    return img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r })
  }))
}

async function printDocument () {
  await waitForImagesAndFonts()

  // Ocultar botones globales (misma aproximación que en otros componentes)
  const buttons = document.querySelectorAll('button')
  buttons.forEach(button => { button.style.display = 'none' })

  // Pequeña pausa para asegurar render final
  await new Promise(r => setTimeout(r, 150))

  window.print()

  // Restaurar botones después
  setTimeout(() => {
    buttons.forEach(button => { button.style.display = '' })
  }, 500)
}
</script>

<style scoped>
.sheet {
  position: relative;
  border: 1px solid #ddd;
  overflow: hidden;
}
.sheet-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.field {
  position: absolute;
  white-space: pre-wrap;
}
.controls {
  margin-top: 12px;
}

/* Estilos para impresión: mostrar solo la hoja */
@media print {
  @page { size: auto; margin: 0 }
  body * { visibility: hidden }
  .sheet, .sheet * { visibility: visible }
  .sheet { position: absolute; left: 0; top: 0; }
}
</style>
