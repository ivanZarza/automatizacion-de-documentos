<template>
  <div class="print-wrapper">
    <!-- PÁGINA ÚNICA -->
    <article class="pagina-documento">
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
  apellidosNombreBeneficiario: { type: String, default: "" },
  dniBeneficiario: { type: String, default: "" },
  domicilioBeneficiario: { type: String, default: "" },
  razonSocial: { type: String, default: "" },
  nifEmpresa: { type: String, default: "" },
  domicilioFiscal: { type: String, default: "" },
  apellidosNombreRepresentanteLegal: { type: String, default: "" },
  dniRepresentanteLegal: { type: String, default: "" },
  apellidosNombreAgenteGestor: { type: String, default: "" },
  dniNieAgenteGestor: { type: String, default: "" },
  apellidosNombrePersonaRepresentante: { type: String, default: "" },
  dniNiePersonaRepresentante: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  firma: { type: String, default: "" },
});

const etiquetas = ref([
  // SECCIÓN PERSONA/ENTIDAD BENEFICIARIA
  {
    nombre: "apellidosNombreBeneficiario",
    x: 30,
    y: 80,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dniBeneficiario",
    x: 150,
    y: 80,
    w: 50,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "domicilioBeneficiario",
    x: 30,
    y: 92,
    w: 140,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  // SECCIÓN RAZÓN SOCIAL / NIF / DOMICILIO FISCAL
  {
    nombre: "razonSocial",
    x: 30,
    y: 120,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "nifEmpresa",
    x: 150,
    y: 120,
    w: 50,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "domicilioFiscal",
    x: 30,
    y: 132,
    w: 140,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  // SECCIÓN REPRESENTANTE LEGAL
  {
    nombre: "apellidosNombreRepresentanteLegal",
    x: 30,
    y: 152,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dniRepresentanteLegal",
    x: 150,
    y: 152,
    w: 50,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  // SECCIÓN AGENTE O GESTOR DE LA REHABILITACIÓN
  {
    nombre: "apellidosNombreAgenteGestor",
    x: 30,
    y: 172,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dniNieAgenteGestor",
    x: 150,
    y: 172,
    w: 50,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  // SECCIÓN PERSONA REPRESENTANTE
  {
    nombre: "apellidosNombrePersonaRepresentante",
    x: 30,
    y: 192,
    w: 80,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "dniNiePersonaRepresentante",
    x: 150,
    y: 192,
    w: 50,
    h: 6,
    fontSize: 10,
    align: "left",
    value: "",
  },
  // SECCIÓN FECHA
  {
    nombre: "dia",
    x: 90,
    y: 240,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "center",
    value: "",
  },
  {
    nombre: "mes",
    x: 120,
    y: 240,
    w: 40,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "",
  },
  {
    nombre: "anio",
    x: 170,
    y: 240,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "center",
    value: "",
  },
  // FIRMA
  {
    nombre: "firma",
    x: 100,
    y: 260,
    w: 50,
    h: 20,
    align: "center",
    value: "",
  },
]);

// Watch para sincronizar props con etiquetas
watch(
  () => props,
  (newProps) => {
    etiquetas.value.forEach((etiqueta) => {
      const propValue = newProps[etiqueta.nombre];
      if (propValue !== undefined && propValue !== null && propValue !== "") {
        etiqueta.value = String(propValue);
      }
    });
  },
  { deep: true, immediate: true }
);

// Computed para filtrar etiquetas visibles
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
  background-image: url("/justificaciones/declaracion-compromiso-corriente.png");
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
