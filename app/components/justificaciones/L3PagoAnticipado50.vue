<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 -->
    <article class="pagina-documento pagina-1">
      <span v-for="et in etiquetasPage1Visibles" :key="et.nombre" class="overlay-field" :style="estiloEtiqueta(et)">
        <img v-if="(et.nombre === 'firma' || et.nombre === 'firma_p3') && et.displayValue" :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain" />
        <span v-else>{{ et.displayValue }}</span>
      </span>
    </article>

    <!-- PÁGINA 2 -->
    <article class="pagina-documento pagina-2">
      <span v-for="et in etiquetasPage2Visibles" :key="et.nombre" class="overlay-field" :style="estiloEtiqueta(et)">
        <img v-if="(et.nombre === 'firma' || et.nombre === 'firma_p3') && et.displayValue" :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain" />
        <span v-else>{{ et.displayValue }}</span>
      </span>
    </article>

    <!-- PÁGINA 3 -->
    <article class="pagina-documento pagina-3">
      <span v-for="et in etiquetasPage3Visibles" :key="et.nombre" class="overlay-field" :style="estiloEtiqueta(et)">
        <img v-if="(et.nombre === 'firma' || et.nombre === 'firma_p3') && et.displayValue" :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain" />
        <span v-else>{{ et.displayValue }}</span>
      </span>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  expediente: { type: String, default: "" },
  apellidosNombre: { type: String, default: "" },
  dni: { type: String, default: "" },
  telefono: { type: String, default: "" },
  correoElectronico: { type: String, default: "" },
  apellidosNombreRepresentante: { type: String, default: "" },
  dniRepresentante: { type: String, default: "" },
  actuaCalidad: { type: String, default: "" },
  telefonoRepresentante: { type: String, default: "" },
  correoElectronicoRepresentante: { type: String, default: "" },
  provincia: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  personaFirma: { type: String, default: "" },
  firma: { type: String, default: "" },
});

const etiquetas = ref([
  // PÁGINA 2 (Checkboxes)
  {
    nombre: "check_1",
    page: 2,
    x: 50,
    y: 50,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "check_2",
    page: 2,
    x: 50,
    y: 60,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "check_3",
    page: 2,
    x: 50,
    y: 70,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "check_4",
    page: 2,
    x: 50,
    y: 80,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "check_5",
    page: 2,
    x: 50,
    y: 90,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "check_6",
    page: 2,
    x: 50,
    y: 100,
    w: 5,
    h: 5,
    fontSize: 12,
    align: "center",
    value: "",
  },
  {
    nombre: "apellidosNombre",
    page: 1,
    x: 20,
    y: 126.5,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dni",
    page: 1,
    x: 172,
    y: 126.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "telefono",
    page: 1,
    x: 20,
    y: 135.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "correoElectronico",
    page: 1,
    x: 55,
    y: 135.5,
    w: 60,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "apellidosNombreRepresentante",
    page: 1,
    x: 20,
    y: 144.5,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dniRepresentante",
    page: 1,
    x: 172,
    y: 144.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "actuaCalidad",
    page: 1,
    x: 20,
    y: 153.5,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "telefonoRepresentante",
    page: 1,
    x: 20,
    y: 162.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "correoElectronicoRepresentante",
    page: 1,
    x: 55,
    y: 162.5,
    w: 60,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },



  // PÁGINA 3
  {
    nombre: "provincia_p3",
    page: 3,
    x: 57.5,
    y: 121.5,
    w: 40,
    h: 4,
    fontSize: 10,
    align: "left",
    value: "",
    background: "#fff",
  },
  {
    nombre: "dia_p3",
    page: 3,
    x: 107.8,
    y: 121.5,
    w: 11.1,
    h: 4.8,
    fontSize: 10,
    align: "center",
    value: "",
    background: "#fff",
  },
  {
    nombre: "mes_p3",
    page: 3,
    x: 126,
    y: 121.5,
    w: 20,
    h: 4.8,
    fontSize: 10,
    align: "left",
    value: "",
    background: "#fff",
  },
  {
    nombre: "anio_p3",
    page: 3,
    x: 153,
    y: 121.5,
    w: 11.1,
    h: 4.9,
    fontSize: 10,
    align: "center",
    value: "",
    background: "#fff",
  },
  {
    nombre: "personaFirma_p3",
    page: 3,
    x: 75,
    y: 150.5,
    w: 60,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "firma_p3",
    page: 3,
    x: 125,
    y: 138,
    w: 30,
    h: 15,
    value: "",
    align: "center",
  },
]);


// Watch para sincronizar props con etiquetas
watch(
  () => props,
  (newProps) => {
    etiquetas.value.forEach((etiqueta) => {
      // Extraer nombre base para etiquetas duplicadas (ej: dia_p3 -> dia)
      const baseName = etiqueta.nombre.replace("_p3", "");
      const propValue = newProps[baseName];

      // Solo sobrescribir si el prop tiene un valor válido (no vacío/null/undefined)
      if (propValue !== undefined && propValue !== null && propValue !== "") {
        etiqueta.value = String(propValue);
      }
    });
  },
  { deep: true, immediate: true },
);

// Computed para filtrar por página
const etiquetasPage1Visibles = computed(() =>
  etiquetas.value
    .filter((e) => e.page === 1)
    .map((e) => ({
      ...e,
      displayValue: e.value || "",
    })),
);

const etiquetasPage2Visibles = computed(() =>
  etiquetas.value
    .filter((e) => e.page === 2)
    .map((e) => ({
      ...e,
      displayValue: e.value || "",
    })),
);

const etiquetasPage3Visibles = computed(() =>
  etiquetas.value
    .filter((e) => e.page === 3)
    .map((e) => ({
      ...e,
      displayValue: e.value || "",
    })),
);

// Estilos dinámicos
const estiloEtiqueta = (etiqueta) => ({
  position: "absolute",
  left: `${etiqueta.x}mm`,
  top: `${etiqueta.y}mm`,
  minWidth: `${etiqueta.w}mm`,
  width: "auto",
  height: `${etiqueta.h}mm`,
  fontSize: `${etiqueta.fontSize}pt`,
  display: "inline-block",
  direction: "ltr",
  textAlign: etiqueta.align || "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "visible",
  fontFamily: "Arial, sans-serif",
  lineHeight: "1",
  background: `${etiqueta.background || "transparent"}`,
});
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f0f0;
}

.pagina-documento {
  width: 210mm;
  height: 297mm;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  font-family: Arial, sans-serif;
  font-size: 7.1pt;
  margin-bottom: 16mm;
}

.pagina-1 {
  background-image: url("/documentos-oficiales/justificaciones-50pct/pago-anticipado-50-l3/pago-50-anticipado-l3-page-0001.jpg");
}

.pagina-2 {
  background-image: url("/documentos-oficiales/justificaciones-50pct/pago-anticipado-50-l3/pago-50-anticipado-l3-page-0002.jpg");
}

.pagina-3 {
  background-image: url("/documentos-oficiales/justificaciones-50pct/pago-anticipado-50-l3/pago-50-anticipado-l3-page-0003.jpg");
}

.overlay-field {
  color: #000 !important;
}

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

  .pagina-documento {
    --guide-color: transparent;
    border: 0;
    box-shadow: none;
    margin: 0 auto;
    page-break-after: always;
    page-break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .pagina-documento:last-child {
    page-break-after: auto;
  }
}
</style>
