<template>
  <div class="print-wrapper">
    <!-- PÁGINA ÚNICA -->
    <article class="pagina-documento pagina-compromiso">
      <span
        v-for="et in etiquetasVisibles"
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
  nombreFirma: { type: String, default: "" },
});

const etiquetas = ref([
  // PÁGINA ÚNICA
  {
    nombre: "nombreApellidos",
    x: 36,
    y: 80.5,
    w: 60,
    h: 8,
    fontSize: 10,
    value: "juan perez asgsdffgdfg",
    align: "left",
  },
  {
    nombre: "nif",
    x: 163,
    y: 80.5,
    w: 60,
    h: 8,
    fontSize: 10,
    value: "12345678A",
    align: "left",
  },
  {
    nombre: "direccion",
    x: 36,
    y: 85.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "Calle Falsa 123",
    align: "left",
  },
  {
    nombre: "nombreRepresentante",
    x: 36,
    y: 95.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "Juan Pérez",
    align: "left",
  },
  {
    nombre: "dniRepresentante",
    x: 163,
    y: 95.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "12345678A",
    align: "left",
  },
  {
    nombre: "nombreEntidadRepresentada",
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
    x: 36,
    y: 105.5,
    w: 160,
    h: 8,
    fontSize: 10,
    value: "A12345678",
    align: "left",
  },
  {
    nombre: "domicilioEntidad",
    x: 91,
    y: 105.5,
    w: 60,
    h: 8,
    fontSize: 10,
    value: "Calle Falsa 123",

    align: "left",
  },
  {
    nombre: "ciudad",
    x: 47,
    y: 159.5,
    w: 60,
    h: 8,
    fontSize: 10,
    value: "Sevilla",
    align: "left",
  },
  {
    nombre: "dia",
    x: 107,
    y: 159.5,
    w: 20,
    h: 8,
    fontSize: 10,
    value: "18",
    align: "center",
  },
  {
    nombre: "mes",
    x: 130,
    y: 159.5,
    w: 20,
    h: 8,
    fontSize: 10,
    value: "septiembre",
    align: "center",
  },
  {
    nombre: "anio",
    x: 148,
    y: 159.5,
    w: 30,
    h: 8,
    fontSize: 10,
    value: "2025",
    align: "center",
  },
  {
    nombre: "firma",
    x: 80,
    y: 173,
    w: 80,
    h: 20,
    value: "/firma-solay.png",
    align: "center",
  },
  {
    nombre: "nombreFirma",
    x: 80,
    y: 190,
    w: 80,
    h: 8,
    fontSize: 10,
    value: "Juan Pérez",
    align: "center",
  }
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

// Computed para obtener etiquetas visibles
const etiquetasVisibles = computed(() =>
  etiquetas.value.map((e) => ({
    ...e,
    displayValue: e.value || "",
  }))
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

/* Imagen de fondo */
.pagina-compromiso {
  background-image: url("/documentos-oficiales/aceptaciones/declaración-de-compromiso.jpg");
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
    margin: 0 auto;
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
