<template>
  <div class="print-wrapper">
    <article class="pagina-aceptacion">
      <span
        v-for="et in etiquetasVisibles"
        :key="et.name"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        <img
          v-if="et.name === 'firma' && et.displayValue"
          :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain"
        />
        <span v-else>{{ et.displayValue }}</span>
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
  razonSocial: { type: String, default: "" },
  dni: { type: String, default: "" },
  expedienteAceptacion: { type: String, default: "" },
  codigoENI: { type: String, default: "" },
  provincia: { type: String, default: "" },
  edificioVivienda: { type: String, default: "" },
  importeSubvencion: { type: String, default: "" },
  ciudad: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  firma: { type: String, default: "" },
  generatedDate: { type: String, default: "" },
});

const debug = ref(true);

const etiquetas = ref([
  {
    name: "codigoENI",
    x: 48,
    y: 40,
    w: 80,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "1234567890",
  },
  {
    name: "provincia",
    x: 150,
    y: 29.5,
    w: 40,
    h: 6,
    fontSize: 9,
    background: "#fff",
    align: "left",
    value: "Granada",
  },
  {
    name: "edificioVivienda",
    x: 69.5,
    y: 104.8,
    w: 40,
    h: 3,
    fontSize: 9,
    background: "#fff",
    align: "left",
    value: "edificio",
  },
  {
    name: "importeSubvencion",
    x: 172,
    y: 123,
    w: 80,
    h: 6,
    fontSize: 9,
    align: "left",
    value: "15348",
  },
  {
    name: "razonSocial",
    x: 40,
    y: 76.5,
    w: 80,
    h: 6,
    fontSize: 9,
    align: "left",
    value: "ermenegildo varelo rancio sl",
  },
  {
    name: "dni",
    x: 38,
    y: 81.5,
    w: 80,
    h: 6,
    fontSize: 9,
    align: "left",
    value: "B09848912A",
  },
  {
    name: "expedienteAceptacion",
    x: 120,
    y: 81.5,
    w: 80,
    h: 6,
    fontSize: 9,
    align: "left",
    value: "h123544654756u",
  },
  {
    name: "ciudad",
    x: 40,
    y: 214,
    w: 80,
    h: 6,
    fontSize: 9,
    align: "center",
    value: "Bollullos de la Mitación",
  },
  {
    name: "dia",
    x: 110,
    y: 213.5,
    w: 15,
    h: 6,
    fontSize: 9,
    align: "center",
    value: "29",
  },
  {
    name: "mes",
    x: 125,
    y: 213.5,
    w: 20,
    h: 6,
    fontSize: 9,
    align: "center",
    value: "Noviembre",
  },
  {
    name: "anio",
    x: 155,
    y: 213.5,
    w: 20,
    h: 3,
    fontSize: 9,
    align: "center",
    background: "#fff",
    value: "2026",
  },
  {
    name: "firma",
    x: 80,
    y: 219,
    w: 65,
    h: 15,
    value: "/firma-solay.png",
  },
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
      const finalValue =
        propVal !== undefined && propVal !== null && String(propVal) !== ""
          ? propVal
          : "";
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
  const ocultar = new Set([
    "monofásica",
    "trifásica",
    "modificacion",
    "nueva",
    "ampliacion",
  ]);
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

.pagina-aceptacion {
  width: 200mm;
  height: 287mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("/documentos-oficiales/aceptaciones/aceptacion-subvencion.jpg");
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

  .pagina-aceptacion {
    --guide-color: transparent;
    border: 0;
    box-shadow: none;
    margin: 0 auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
