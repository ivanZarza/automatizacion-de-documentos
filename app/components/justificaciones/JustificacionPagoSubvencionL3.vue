<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 -->
    <article class="pagina-documento pagina-1">
      <span
        v-for="et in etiquetasPage1Visibles"
        :key="et.nombre"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        {{ et.displayValue }}
      </span>
    </article>

    <!-- PÁGINA 2 -->
    <article class="pagina-documento pagina-2">
      <span
        v-for="et in etiquetasPage2Visibles"
        :key="et.nombre"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        <img
          v-if="et.nombre === 'firma' && et.displayValue"
          :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain"
        />
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
  // PÁGINA 1
  {
    nombre: "expediente",
    page: 1,
    x: 50,
    y: 109,
    w: 80,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "alalala",
  },
  {
    nombre: "apellidosNombre",
    page: 1,
    x: 20,
    y: 130.5,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "afasdf",
  },
  {
    nombre: "dni",
    page: 1,
    x: 172,
    y: 130.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "telefono",
    page: 1,
    x: 20,
    y: 139,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "correoElectronico",
    page: 1,
    x: 55,
    y: 139,
    w: 60,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "apellidosNombreRepresentante",
    page: 1,
    x: 20,
    y: 148,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "dniRepresentante",
    page: 1,
    x: 172,
    y: 148,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "actuaCalidad",
    page: 1,
    x: 20,
    y: 157.5,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "telefonoRepresentante",
    page: 1,
    x: 20,
    y: 166,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "correoElectronicoRepresentante",
    page: 1,
    x: 55,
    y: 166,
    w: 60,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  {
    nombre: "provincia",
    page: 2,
    x: 60,
    y: 259.5,
    w: 40,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "asdffdsa",
  },
  // PÁGINA 2
  {
    nombre: "dia",
    page: 2,
    x: 107.8,
    y: 259,
    w: 11.1,
    h: 4.5,
    fontSize: 10,
    align: "center",
    value: "29",
    background: "#fff",
  },
  {
    nombre: "mes",
    page: 2,
    x: 126,
    y: 259,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "septiembre",
    background: "#fff",
  },
  {
    nombre: "anio",
    page: 2,
    x: 145,
    y: 259,
    w: 20,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "2023",
  },
  {
    nombre: "personaFirma",
    page: 2,
    x: 40,
    y: 280,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "center",
    value: "asdffdsa",
  },
  { nombre: "firma", page: 2, x: 80, y: 290, w: 65, h: 15, align: "center" },
]);

// Watch para sincronizar props con etiquetas
watch(
  () => props,
  (newProps) => {
    etiquetas.value.forEach((etiqueta) => {
      const propValue = newProps[etiqueta.nombre];
      if (propValue !== undefined && propValue !== null) {
        etiqueta.value = String(propValue);
      }
    });
  },
  { deep: true /* immediate: true */ },
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
  background-image: url("/documentos-oficiales/justificaciones/formato-pago-justificacion-linea3-1.jpg");
}

.pagina-2 {
  background-image: url("/documentos-oficiales/justificaciones/formato-pago-justificacion-linea3-2.jpg");
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
