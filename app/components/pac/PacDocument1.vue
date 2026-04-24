<template>
  <div class="print-wrapper">
    <article class="pagina-pac">
      <span v-for="et in etiquetasVisibles" :key="et.name" class="overlay-field" :style="estiloEtiqueta(et)">
        {{ et.displayValue }}
      </span>
    </article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  nombre: { type: String, default: "" },
  dni: { type: String, default: "" },
  direccion: { type: String, default: "" },
  localidad: { type: String, default: "" },
  provincia: { type: String, default: "" },
  fecha: { type: String, default: "" },
});

const etiquetas = ref([
  {
    name: "nombre",
    x: 50,
    y: 100,
    w: 100,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "",
  },
  {
    name: "dni",
    x: 50,
    y: 110,
    w: 50,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "",
  },
  {
    name: "direccion",
    x: 50,
    y: 120,
    w: 100,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "",
  },
  {
    name: "fecha",
    x: 140,
    y: 250,
    w: 50,
    h: 6,
    fontSize: 11,
    align: "left",
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
  textAlign: e.align || "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  color: "#000",
  fontWeight: "bold"
});

watch(
  () => props,
  (newProps) => {
    etiquetas.value = etiquetas.value.map((e) => ({
      ...e,
      value: newProps[e.name] || "",
    }));
  },
  { deep: true, immediate: true }
);

const etiquetasVisibles = computed(() => {
  return etiquetas.value.map((e) => ({
    ...e,
    displayValue: e.value,
  }));
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

.pagina-pac {
  width: 210mm;
  height: 297mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("/PAC/Modelodeclaracionpropietario20180515_pages-to-jpg-0001.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

@media print {
  .print-wrapper {
    padding: 0 !important;
    background: #fff;
  }
  .pagina-pac {
    margin: 0;
    border: 0;
  }
}
</style>
