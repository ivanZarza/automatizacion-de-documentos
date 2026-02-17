<template>
  <div class="print-wrapper">
    <article class="pagina-dtc">
      <span
        v-for="et in etiquetasVisibles"
        :key="et.name"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        {{ et.displayValue }}
      </span>
      <!-- Marcadores condicionales (X) -->
      <span
        v-for="m in marcadores"
        :key="`marker-${m.name}`"
        class="overlay-marker"
        :style="estiloMarcador(m)"
      >
        X
      </span>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  potencia: { type: String, default: '' },
  provincia: { type: String, default: '' },
  fechaElaboracion: { type: String, default: '' },
  dia: { type: String, default: '' },
  mes: { type: String, default: '' },
  anio: { type: String, default: '' },
  generatedDate: { type: String, default: '' }
});

const debug = ref(true);

const etiquetas = ref([
  { name: "potencia", x: 50, y: 100, w: 30, h: 6, fontSize: 10, align: "center", value: "" },
  { name: "provincia", x: 130, y: 100, w: 30, h: 6, fontSize: 10, align: "center", value: "" },
  { name: "fechaElaboracion", x: 50, y: 150, w: 80, h: 6, fontSize: 10, align: "center", value: "" },
  { name: "dia", x: 50, y: 200, w: 15, h: 6, fontSize: 10, align: "center", value: "" },
  { name: "mes", x: 85, y: 200, w: 20, h: 6, fontSize: 10, align: "center", value: "" },
  { name: "anio", x: 130, y: 200, w: 20, h: 6, fontSize: 10, align: "center", value: "" }
]);

const estiloEtiqueta = (e) => ({
  position: "absolute",
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  minWidth: `${e.w}mm`,
  width: "auto",
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: "inline-block",
  verticalAlign: "middle",
  direction: "ltr",
  textAlign: "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "visible",
  background: `${e.background}`,
});

watch(
  () => Object.fromEntries(Object.keys(props).map((k) => [k, props[k]])),
  (newVals) => {
    etiquetas.value = etiquetas.value.map((e) => {
      const key = e.name;
      const propVal = newVals[key];
      const finalValue = propVal !== undefined && propVal !== null && String(propVal) !== '' ? propVal : '';
      return {
        ...e,
        value: finalValue,
      };
    });
  },
  { deep: true, immediate: true },
);

const etiquetasConValores = computed(() => etiquetas.value);

const etiquetasVisibles = computed(() => {
  const ocultar = new Set(["monofásica","trifásica", "modificacion", "nueva", "ampliacion"]);
  return etiquetasConValores.value.map((e) => {
    const val = e.value && String(e.value).trim().toLowerCase();
    return {
      ...e,
      displayValue: ocultar.has(val) ? "" : e.value,
    };
  });
});

const marcadores = computed(() =>
  etiquetasConValores.value
    .map((e) => {
      if (!e.markers) return null;
      const val = e.value && String(e.value).trim();
      const coord = e.markers && e.markers[val] ? e.markers[val] : null;
      if (!coord) return null;
      return { name: e.name, x: coord.x, y: coord.y };
    })
    .filter(Boolean),
);

const estiloMarcador = (m) => ({
  position: "absolute",
  left: `${m.x}mm`,
  top: `${m.y}mm`,
  fontSize: `10pt`,
  color: "#000",
  fontWeight: 700,
  transform: "translate(-50%,-50%)",
  pointerEvents: "none",
});
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 8mm 0;
  background: #f0f0f0;
}

.pagina-dtc {
  width: 200mm;
  height: 287mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("/documentos-oficiales/declaracion-tecnico-competente.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 110% 100%;
  color: #111;
  font-family: Arial, sans-serif;
  font-size: 7.1pt;
  line-height: 1.15;
}

[data-field] {
  color: #0a2668;
  font-weight: 600;
  text-shadow: 0 0 0.35px rgba(10, 38, 104, 0.45);
}

[data-field]:empty::before {
  content: " ";
}

.overlay-marker {
  position: absolute;
  line-height: 1;
  font-family: Arial, sans-serif;
  pointer-events: none;
}

@page {
  size: A4;
  margin: 6mm;
}

@media print {
}
</style>

<style>
@page {
  size: A4;
  margin: 0;
}

@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }

  .print-wrapper {
    padding: 0;
    background: #fff;
  }

  .pagina-dtc {
    --guide-color: transparent;
    border: 0;
    box-shadow: none;
    margin: 0 auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
