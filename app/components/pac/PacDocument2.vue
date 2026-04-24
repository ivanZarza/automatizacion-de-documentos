<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 -->
    <article class="pagina-pac page-1">
      <span v-for="et in etiquetasPagina1" :key="et.name" class="overlay-field" :style="estiloEtiqueta(et)">
        {{ et.displayValue }}
      </span>
    </article>

    <!-- PÁGINA 2 -->
    <article class="pagina-pac page-2">
      <span v-for="et in etiquetasPagina2" :key="et.name" class="overlay-field" :style="estiloEtiqueta(et)">
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
  observaciones: { type: String, default: "" },
});

const etiquetas = ref([
  // Página 1
  {
    name: "nombre",
    page: 1,
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
    page: 1,
    x: 50,
    y: 110,
    w: 50,
    h: 6,
    fontSize: 11,
    align: "left",
    value: "",
  },
  // Página 2
  {
    name: "observaciones",
    page: 2,
    x: 30,
    y: 50,
    w: 150,
    h: 40,
    fontSize: 10,
    align: "left",
    value: "",
    multiline: true
  },
  {
    name: "fecha",
    page: 2,
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
  maxWidth: e.multiline ? `${e.w}mm` : 'none',
  width: "auto",
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: "inline-block",
  textAlign: e.align || "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: e.multiline ? "normal" : "nowrap",
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

const etiquetasPagina1 = computed(() => 
  etiquetas.value.filter(e => e.page === 1).map(e => ({ ...e, displayValue: e.value }))
);

const etiquetasPagina2 = computed(() => 
  etiquetas.value.filter(e => e.page === 2).map(e => ({ ...e, displayValue: e.value }))
);
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10mm;
  padding: 8mm 0;
  background: #f0f0f0;
}

.pagina-pac {
  width: 210mm;
  height: 297mm;
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.page-1 {
  background-image: url("/PAC/Autorizacion_representante_receptor_factura_es_v2_page-0001.jpg");
}

.page-2 {
  background-image: url("/PAC/Autorizacion_representante_receptor_factura_es_v2_page-0002.jpg");
}

@media print {
  .print-wrapper {
    padding: 0 !important;
    background: #fff;
    gap: 0;
  }
  .pagina-pac {
    margin: 0;
    border: 0;
    box-shadow: none;
    page-break-after: always;
  }
}
</style>
