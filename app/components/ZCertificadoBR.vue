<template>
  <div class="print-wrapper">
    <article class="pagina-br">
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

// Props individuales — igual que el resto de componentes del proyecto.
// Incluimos aquí todas las claves que aparecen en `etiquetas` para evitar
// desajustes con el `fieldMapping`.
const props = defineProps({
  registro_instalacion: { type: [String, Number], default: '' },
  registro: { type: [String, Number], default: '' },
  nombre: { type: String, default: '' },
  nif: { type: String, default: '' },
  domicilio: { type: String, default: '' },
  cp: { type: String, default: '' },
  localidad: { type: String, default: '' },
  provincia: { type: String, default: '' },
  correo_electronico: { type: String, default: '' },
  telefono: { type: String, default: '' },
  emplazamiento: { type: String, default: '' },
  emplazamientoNumero: { type: String, default: '' },
  emplazamientoBloque: { type: String, default: '' },
  emplazamientoPortal: { type: String, default: '' },
  emplazamientoEscalera: { type: String, default: '' },
  emplazamientoPiso: { type: String, default: '' },
  emplazamientoPuerta: { type: String, default: '' },
  emplazamientoLocalidad: { type: String, default: '' },
  emplazamientoProvincia: { type: String, default: '' },
  emplazamientoCodigoPostal: { type: String, default: '' },
  UsoAlQueSeDestinaEmplazamiento: { type: String, default: '' },
  cups: { type: String, default: '' },
  instalacionTipo: { type: String, default: '' },
  fase: { type: String, default: '' },
  potenciaPrevista: { type: String, default: '' },
  Superficie: { type: String, default: '' },
  tensionSuministro: { type: String, default: '' },
  empresaDistribuidora: { type: String, default: '' },
  intensidadNominal: { type: String, default: '' },
  sensibilidadDiferencial: { type: String, default: '' },
  directorDeObra: { type: String, default: '' },
  observaciones: { type: String, default: '' },
  dia: { type: String, default: '' },
  mes: { type: String, default: '' },
  anio: { type: String, default: '' },
  fecha: { type: String, default: '' },
  generatedDate: { type: String, default: '' }
});

// Toggle para mostrar guías en pantalla (no se imprime)
const debug = ref(true);

// Array simple de etiquetas (un solo objeto por ahora)
const etiquetas = ref([
  {
    name: "registro_instalacion",
    x: 81,
    y: 31,
    w: 20,
    h: 6,
    fontSize: 15,
    align: "center",
    value: "",
  },
  {
    name: "registro",
    x: 35,
    y: 31,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "nombre",
    x: 13,
    y: 64,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "nif",
    x: 140,
    y: 64,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "domicilio",
    x: 13,
    y: 71,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "cp",
    x: 139,
    y: 71,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "28001",
  },
  {
    name: "localidad",
    x: 13,
    y: 78,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "provincia",
    x: 83,
    y: 78,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "correo_electronico",
    x: 102,
    y: 78,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "telefono",
    x: 153,
    y: 78,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamiento",
    x: 13,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoNumero",
    x: 117,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "43567",
  },
  {
    name: "emplazamientoBloque",
    x: 130,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoPortal",
    x: 142,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoEscalera",
    x: 154,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoPiso",
    x: 167,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoPuerta",
    x: 179,
    y: 89,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoLocalidad",
    x: 11,
    y: 95,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "emplazamientoProvincia",
    x: 95,
    y: 95,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "",
    background: "white",
  },
  {
    name: "emplazamientoCodigoPostal",
    x: 155,
    y: 95,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "UsoAlQueSeDestinaEmplazamiento",
    x: 91,
    y: 101,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "  ",
  },
  {
    name: "Superficie",
    x: 179,
    y: 101,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "  ",
  },
  {
    name: "instalacionTipo",
    x: 0,
    y: 0,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 10,
    align: "right",
    value: "modificacion", // valor real debe venir del formulario ('nueva'|'ampliacion'|'modificacion')
    // Mapeo de coordenadas por opción — condicional 'dentro del objeto'
    markers: {
      nueva: { x: 36.55, y: 107.7 },
      ampliacion: { x: 60.3, y: 107.7 },
      modificacion: { x: 86.5, y: 107.7 },
    },
  },
  {
    name: "cups",
    x: 109,
    y: 106,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "33444",
  },
  {
    name: "potenciaPrevista",
    x: 60,
    y: 133,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "33444",
  },
  {
    name: "fase",
    x: 0,
    y: 0,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 10,
    align: "right",
    value: "", // valor real debe venir del formulario ('monofásica'|'trifásica')
    markers: {
      Monofásica: { x: 39.7, y: 152.6 },
      Trifásica: { x: 60, y: 152.6 },
    },
  },
    {
    name: "tensionSuministro",
    x: 75,
    y: 155,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "33444",
  },
      {
    name: "empresaDistribuidora",
    x: 35,
    y: 161,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "33444",
  },
    {
    name: "intensidadNominal",
    x: 11,
    y: 172,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "sensibilidadDiferencial",
    x: 50,
    y: 172,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "directorDeObra",
    x: 11,
    y: 190,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "",
  },
  {
    name: "observaciones",
    x: 11,
    y: 220,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "Observaciones varias sobre la instalación",
  },
  {
    name: "dia",
    x: 100,
    y: 232,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "dia",
  },
  {
    name: "mes",
    x: 120,
    y: 232,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "mes",
  },
  {
    name: "anio",
    x: 160,
    y: 232,
    h: 6,
    w: 20,
    h: 2.3,
    fontSize: 7.5,
    align: "right",
    value: "anio",
  },

]);

const estiloEtiqueta = (e) => ({
  position: "absolute",
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  /* permitimos que la etiqueta crezca hacia la derecha manteniendo un ancho mínimo */
  minWidth: `${e.w}mm`,
  width: "auto",
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: "inline-block",
  verticalAlign: "middle",
  /* Forzar crecimiento hacia la derecha: texto siempre LTR y alineado a la izquierda */
  direction: "ltr",
  textAlign: "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "visible",
  background: `${e.background}`,
});

// Mezcla de valores: prioridad -> props.values -> config.defaultData -> valor embebido
// Además sincronizamos `etiquetas` para que contenga los valores pasados por props.
// Esto facilita la inspección y evita tener que usar sólo computeds en otras partes.
// Observamos `props.values` (objeto) para rellenar `etiquetas.value`.
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

// Computed que oculta el texto cuando el valor es 'monofásica' o 'modificacion'
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

<!-- Overlay renderer: etiquetas posicionadas por coordenadas -->
<!-- Overlay renderer moved: overlays are rendered in the main template. -->

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

.pagina-br {
  width: 200mm;
  height: 287mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("/documentos-oficiales/cie-blanco.jpg");
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
  /* Deja un margen mínimo para evitar que navegadores recorten contenido. */
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

  .pagina-br {
    --guide-color: transparent;
    border: 0;
    box-shadow: none;
    margin: 0 auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
