<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 - SIN CAMPOS -->
    <article class="pagina-documento pagina-1">
    </article>

    <!-- PÁGINA 2 - CON CAMPOS -->
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
  ciudad: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  firma: { type: String, default: "" },
});

const etiquetas = ref([
  // PÁGINA 2
  {
    nombre: "ciudad",
    page: 2,
    x: 95,
    y: 80.5,
    w: 60,
    h: 8,
    fontSize: 11,
    value: "Jerez de la Frontera",
    align: "left",
  },
  {
    nombre: "dia",
    page: 2,
    x: 127,
    y: 80.5,
    w: 20,
    h: 8,
    fontSize: 11,
    value: "18",
    align: "center",
  },
  {
    nombre: "mes",
    page: 2,
    x: 150,
    y: 80.5,
    w: 20,
    h: 8,
    fontSize: 11,
    value: "Septiembre",
    align: "center",
  },
  {
    nombre: "anio",
    page: 2,
    x: 173,
    y: 80.5,
    w: 30,
    h: 8,
    fontSize: 11,
    value: "2025",
    align: "center",
  },
  {
    nombre: "firma",
    page: 2,
    x: 75,
    y: 92,
    w: 80,
    h: 19,
    value: "/firma-solay.png",
    align: "center",
  },
]);

const etiquetasPage2Visibles = computed(() => {
  return etiquetas.value.filter((et) => et.page === 2);
});

watch(
  () => props,
  (newProps) => {
    etiquetas.value = etiquetas.value.map((et) => ({
      ...et,
      displayValue: newProps[et.nombre] || et.value || "",
    }));
  },
  { deep: true, immediate: true }
);

function estiloEtiqueta(et) {
  return {
    position: "absolute",
    left: `${et.x}mm`,
    top: `${et.y}mm`,
    width: `${et.w}mm`,
    height: `${et.h}mm`,
    fontSize: `${et.fontSize}px`,
    textAlign: et.align || "left",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
}
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
  page-break-after: always;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagina-1 {
  background-image: url("/documentos-oficiales/aceptaciones/DACI1.jpg");
}

.pagina-2 {
  background-image: url("/documentos-oficiales/aceptaciones/DACI2.jpg");
}

.overlay-field {
  display: inline-block;
  box-sizing: border-box;
}

@media print {
  .print-wrapper {
    width: 210mm;
    height: auto;
    margin: 0;
  }

  .pagina-documento {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    box-shadow: none;
  }

  .pagina-1 {
    page-break-after: always;
  }
}
</style>
