<template>
  <div class="print-wrapper">
    <article class="pagina-ddo">
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

// Props individuales
const props = defineProps({
  potencia: { type: String, default: "" },
  provincia: { type: String, default: "" },
  fechaElaboracion: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  generatedDate: { type: String, default: "" },
  nombreApellidosEduardoFijo: { type: String, default: "" },
  nifEduardoFijo: { type: String, default: "" },
  tipoViaFijo: { type: String, default: "" },
  nombreViaFijo: { type: String, default: "" },
  numeroViaFijo: { type: String, default: "" },
  paisFijo: { type: String, default: "" },
  provinciaFijo: { type: String, default: "" },
  municipioFijo: { type: String, default: "" },
  titulacionFijo: { type: String, default: "" },
  especialidadFijo: { type: String, default: "" },
  universidadFijo: { type: String, default: "" },
  colegioFijo: { type: String, default: "" },
  numeroColegiadoFijo: { type: String, default: "" },
  telefonoFijo: { type: String, default: "" },
  emailFijo: { type: String, default: "" },
});

// Toggle para mostrar guías en pantalla (no se imprime)
const debug = ref(true);

// Array simple de etiquetas
const etiquetas = ref([
  {
    name: "nombreApellidosEduardoFijo",
    x: 36,
    y: 80.5,
    w: 60,
    h: 8,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    name: "nifEduardoFijo",
    x: 130,
    y: 100,
    w: 30,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "tipoViaFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "nombreViaFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "numeroViaFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "paisFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "provinciaFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "municipioFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "titulacionFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "especialidadFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
    {
    name: "universidadFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
      {
    name: "colegioFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "numeroColegiadoFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
   {
    name: "telefonoFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "emailFijo",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  // Frases fijas
  {
    name: "fraseFija1",
    x: 50,
    y: 160,
    w: 120,
    h: 8,
    fontSize: 11,
    align: "left",
    value: "Esta es la primera frase fija que siempre aparece.",
  },
  {
    name: "fraseFija2",
    x: 50,
    y: 170,
    w: 120,
    h: 8,
    fontSize: 11,
    align: "left",
    value: "Y esta es la segunda frase fija, también visible siempre.",
  },
  {
    name: "potencia",
    x: 50,
    y: 100,
    w: 30,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "provincia",
    x: 130,
    y: 100,
    w: 30,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "fechaElaboracion",
    x: 50,
    y: 150,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "dia",
    x: 50,
    y: 200,
    w: 15,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "mes",
    x: 85,
    y: 200,
    w: 20,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    name: "anio",
    x: 130,
    y: 200,
    w: 20,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "",
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

// Sincronizar valores de props con etiquetas
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

// Computed que oculta el texto cuando es cierto valor
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

// Marcadores: se calculan sobre las etiquetas ya resueltas
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

.pagina-ddo {
  width: 200mm;
  height: 287mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("/documentos-oficiales/declaracion-direccion-obra.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
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

  .pagina-ddo {
    --guide-color: transparent;
    border: 0;
    box-shadow: none;
    margin: 0 auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
