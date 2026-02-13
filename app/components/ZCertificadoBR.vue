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
    name: "registro_instalacion",
    x: 90,
    y: 31,
    w: 20,
    h: 6,
    fontSize: 15,
    align: "center",
    value: "123456",
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
    value: "Ivan Zarza Estevez",
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
    value: "12345678Z",
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
    value: "Ivan Zarza Estevez",
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
    name: "Localidad",
    x: 13,
    y: 78,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "Calle de la hermosa portal 2 depto 3",
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
    value: "SEVILLA",
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
    value: "hxdfgghdfjfhjcxcvxcv",
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
    value: "1236547898",
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
    value: "Calle de la hermosa portal 2 depto 3",
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
    value: "43567",
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
    value: "43567",
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
    value: "43567",
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
    value: "43567",
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
    value: "43567",
  },
					  {
    name: "emplazamientoPuerta",
    x: 11,
    y: 95,
    h: 6,
    w: 20,
    h: 6,
    fontSize: 7.5,
    align: "right",
    value: "43567",
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
