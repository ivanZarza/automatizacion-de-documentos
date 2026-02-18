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
  nombreApellidos: { type: String, default: "" },
  nif: { type: String, default: "" },
  direccion: { type: String, default: "" },
  nombreRepresentante: { type: String, default: "" },
  dniRepresentante: { type: String, default: "" },
  nombreEntidadRepresentada: { type: String, default: "" },
  nifEntidadRepresentada: { type: String, default: "" },
  domicilioEntidad: { type: String, default: "" },
  ciudad: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  firma: { type: String, default: "" },
});

const etiquetas = ref([
  // PÁGINA 1
  {
    nombre: "nombreApellidos",
    page: 1,
    x: 36,
    y: 80.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "ermenegildo rodríguez pérez",
    align: "left",
  },
  {
    nombre: "nif",
    page: 1,
    x: 163,
    y: 80.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "28.818.007-L",
    align: "left",
  },
  {
    nombre: "direccion",
    page: 1,
    x: 36,
    y: 85.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "calle de la paz, 12, 1ºA, 41001 Sevilla",
    align: "left",
  },
  {
    nombre: "nombreRepresentante",
    page: 1,
    x: 36,
    y: 95.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "ermenegildo rodríguez pérez",
    align: "left",
  },
  {
    nombre: "dniRepresentante",
    page: 1,
    x: 163,
    y: 95.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "28.818.007-L",
    align: "left",
  },
  {
    nombre: "nombreEntidadRepresentada",
    page: 1,
    x: 91,
    y: 100.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "Entidad Representada S.A.",
    align: "left",
  },
  {
    nombre: "nifEntidadRepresentada",
    page: 1,
    x: 36,
    y: 105.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "B09848912",
    align: "left",
  },
  {
    nombre: "domicilioEntidad",
    page: 1,
    x: 91,
    y: 105.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "Calle de la Paz, 12, 1ºA, 41001 Sevilla",
    align: "left",
  },

  // PÁGINA 2
  {
    nombre: "ciudad",
    page: 2,
    x: 45,
    y: 100.5,
    w: 60,
    h: 8,
    fontSize: 10,
    value: "Jerez de la Frontera",
    align: "left",
  },
  {
    nombre: "dia",
    page: 2,
    x: 107,
    y: 100.5,
    w: 20,
    h: 8,
    fontSize: 10,
    value: "18",
    align: "center",
  },
  {
    nombre: "mes",
    page: 2,
    x: 130,
    y: 100.5,
    w: 20,
    h: 8,
    fontSize: 10,
    value: "Septiembre",
    align: "center",
  },
  {
    nombre: "anio",
    page: 2,
    x: 148,
    y: 100.5,
    w: 30,
    h: 8,
    fontSize: 10,
    value: "2025",
    align: "center",
  },
  {
    nombre: "firma",
    page: 2,
    x: 75,
    y: 113,
    w: 80,
    h: 22,
    value: "/firma-solay.png",
    align: "center",
  },
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
  { deep: true, immediate: true }
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

/* Imágenes de fondo */
.pagina-1 {
  background-image: url("/documentos-oficiales/aceptaciones/declaracio-cesion-tratamiento-1.jpg");
}

.pagina-2 {
  background-image: url("/documentos-oficiales/aceptaciones/declaracio-cesion-tratamiento-2.jpg");
}

/* Campos overlay */
.overlay-field {
  color: #000 !important;
}

/* IMPRESIÓN */
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
