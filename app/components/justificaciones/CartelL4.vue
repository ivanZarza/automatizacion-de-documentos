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
    x: 70, // Ajuste inicial basado en la captura
    y: 115,
    w: 27,
    h: 7,
    fontSize: 14,
    fontWeight: "bold",
    align: "center",
    value: "16.600,00",
    background: "white",
  },
  {
    nombre: "cuantiaSubvencion",
    x: 81,
    y: 124.5,
    w: 28,
    h: 7,
    fontSize: 14,
    fontWeight: "bold",
    align: "left",
    value: "16.600,00",
    background: "white",
  },
  {
    nombre: "entidadUbicacion",
    x: 101,
    y: 134.4,
    w: 102,
    h: 7,
    fontSize: 11,
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
  width: 210mm;
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
  .print-wrapper {
    background: white;
    padding: 0;
  }

  .pagina-documento {
    box-shadow: none;
    margin: 0;
  }
}
</style>
