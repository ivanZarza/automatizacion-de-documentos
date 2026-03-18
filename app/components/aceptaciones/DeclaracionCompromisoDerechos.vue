<template>
  <div class="print-wrapper">
    <!-- PÁGINA ÚNICA -->
    <article class="pagina-documento pagina-compromiso">
      <span v-for="et in etiquetasVisibles" :key="et.nombre" class="overlay-field" :style="estiloEtiqueta(et)">
        <img v-if="et.nombre === 'firma' && et.displayValue" :src="et.displayValue"
          style="width: 100%; height: 100%; object-fit: contain" />
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
  /*   {
      nombre: "domicilioEntidad",
      x: 91,
      y: 105.5,
      w: 60,
      h: 8,
      fontSize: 10,
      value: "Calle Falsa 123",
  
      align: "left",
    }, */
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
    x: 123,
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
  width: `${etiqueta.w}mm`,
  height: `${etiqueta.h}mm`,
  fontSize: `${etiqueta.fontSize}px`,
  textAlign: etiqueta.align || "left",
  overflow: "hidden",
  whiteSpace: "nowrap",
});
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 0;
}

.pagina-documento {
  width: 210mm;
  height: 297mm;
  position: relative;
  margin: 0;
  padding: 0;
  page-break-inside: avoid;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Imagen de fondo */
.pagina-compromiso {
  background-image: url("/documentos-oficiales/aceptaciones/declaración-de-compromiso.jpg");
}

/* Campos overlay */
.overlay-field {
  display: inline-block;
  box-sizing: border-box;
}

@media print {
  * {
    max-width: none !important;
    width: auto !important;
  }

  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
  }

  .print-wrapper {
    width: 100% !important;
    height: auto;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
  }

  .pagina-documento {
    width: 195mm !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-shadow: none !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .pagina-documento:not(:last-child) {
    page-break-after: always;
  }
}

@page {
  size: A4;
  margin: 0;
}
</style>

<style scoped>
@page {
  size: A4;
  margin: 0;
}

@media print {
  .print-wrapper {
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .pagina-documento {
    margin: 0 auto !important;
  }
}
</style>

<!--  -->
