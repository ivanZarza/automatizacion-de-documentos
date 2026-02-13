<template>
  <div class="print-wrapper">
    <article class="pagina-br">
      <span
        v-for="et in etiquetas"
        :key="et.name"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        {{ et.value }}
      </span>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Toggle para mostrar guías en pantalla (no se imprime)
const debug = ref(true);

// Array simple de etiquetas (un solo objeto por ahora)
const etiquetas = ref([
  {
    name: "registro_serie",
    x: 11,
    y: 14,
    w: 20,
    h: 6,
    fontSize: 7.1,
    align: "center",
    value: "B",
  },
]);

const estiloEtiqueta = (e) => ({
  position: "absolute",
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  width: `${e.w}mm`,
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: "flex",
  alignItems: "center",
  justifyContent:
    e.align === "center"
      ? "center"
      : e.align === "right"
        ? "flex-end"
        : "flex-start",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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
  background-image: url("/documentos-oficiales/pruebaBT.jpg");
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
