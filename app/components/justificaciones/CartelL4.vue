<template>
  <div class="print-wrapper">
    <article class="pagina-documento">
      <span v-for="et in etiquetasVisibles" :key="et.nombre" class="overlay-field" :style="estiloEtiqueta(et)">
        <span>{{ et.displayValue }}</span>
      </span>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  costeActuacion: { type: String, default: "" },
  cuantiaSubvencion: { type: String, default: "" },
  entidadUbicacion: { type: String, default: "" },
});

const etiquetas = ref([
  {
    nombre: "costeActuacion",
    x: 101, // Ajuste inicial basado en la captura
    y: 119,
    w: 37,
    h: 9,
    fontSize: 18,
    fontWeight: "bold",
    align: "left",
    value: "16.600,00",
    background: "white",
  },
  {
    nombre: "cuantiaSubvencion",
    x: 114,
    y: 132,
    w: 40,
    h: 7,
    fontSize: 18,
    fontWeight: "bold",
    align: "left",
    value: "16.600,00",
    background: "white",
  },
  {
    nombre: "entidadUbicacion",
    x: 143,
    y: 144,
    w: 122,
    h: 17,
    fontSize: 16,
    fontWeight: "normal",
    align: "left",
    value: "direccion completa mas una eternidAD de caracteres",
    whiteSpace: "normal",
    background: "white",
  },
]);

// Sincronizar props con etiquetas
watch(
  () => props,
  (newProps) => {
    etiquetas.value.forEach((etiqueta) => {
      const propValue = newProps[etiqueta.nombre];
      if (propValue !== undefined && propValue !== null && propValue !== "") {
        etiqueta.value = String(propValue);
      }
    });
  },
  { deep: true, immediate: true }
);

const etiquetasVisibles = computed(() =>
  etiquetas.value.map((e) => ({
    ...e,
    displayValue: e.value || `[${e.nombre}]`,
  }))
);

const estiloEtiqueta = (etiqueta) => ({
  position: "absolute",
  left: `${etiqueta.x}mm`,
  top: `${etiqueta.y}mm`,
  width: `${etiqueta.w}mm`,
  height: `${etiqueta.h}mm`,
  fontSize: `${etiqueta.fontSize}pt`,
  fontWeight: etiqueta.fontWeight || "normal",
  display: "inline-block",
  textAlign: etiqueta.align || "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: etiqueta.whiteSpace || "nowrap",
  fontFamily: "Arial, sans-serif",
  lineHeight: "1.2",
  backgroundColor: etiqueta.background || "transparent",
});
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0;
  padding: 20px;
}

.pagina-documento {
  width: 297mm;
  height: 210mm;
  position: relative;
  background-image: url("/documentos-oficiales/justificaciones/cartel-l4.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.overlay-field {
  color: #000;
}

@media print {
  @page {
    size: 297mm 210mm;
    margin: 0;
  }

  .print-wrapper {
    background: white !important;
    padding: 0 !important;
    width: 297mm !important;
    height: 209.7mm !important;
    /* Un poco menos para evitar desbordamiento */
    max-height: 209.7mm !important;
    display: block !important;
    margin: 0 !important;
    overflow: hidden !important;
    break-after: avoid !important;
    page-break-after: avoid !important;
  }

  .pagina-documento {
    width: 297mm !important;
    height: 209.7mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-size: contain !important;
    overflow: hidden !important;
  }
}
</style>

<style>
/* Reset global solo durante la impresión de este componente */
@media print {

  html,
  body {
    height: 210mm !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  .min-h-screen {
    min-height: 0 !important;
    height: 210mm !important;
    padding: 0 !important;
    background: transparent !important;
    overflow: hidden !important;
  }

  /* Ocultamos cualquier otro elemento que Nuxt pueda insertar */
  #__nuxt,
  #__layout {
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
