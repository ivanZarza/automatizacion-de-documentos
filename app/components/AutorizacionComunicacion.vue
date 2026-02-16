<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 -->
    <article class="pagina-documento pagina-1">
      <span
        v-for="et in etiquetasPage1Visibles"
        :key="et.name"
        class="overlay-field"
        :style="et.imageUrl ? estiloEtiquetaImagen(et) : estiloEtiqueta(et)"
      >
        <span v-if="!et.imageUrl">{{ et.displayValue }}</span>
      </span>
      <span
        v-for="m in marcadoresPage1"
        :key="`marker-${m.name}`"
        class="marker-x"
        :style="estiloMarcador(m)"
      >
        ✕
      </span>
    </article>

    <!-- PÁGINA 2 -->
    <article class="pagina-documento pagina-2">
      <span
        v-for="et in etiquetasPage2Visibles"
        :key="et.name"
        class="overlay-field"
        :style="et.imageUrl ? estiloEtiquetaImagen(et) : estiloEtiqueta(et)"
      >
        <span v-if="!et.imageUrl">{{ et.displayValue }}</span>
      </span>
      <span
        v-for="m in marcadoresPage2"
        :key="`marker-${m.name}`"
        class="marker-x"
        :style="estiloMarcador(m)"
      >
        ✕
      </span>
    </article>

    <!-- PÁGINA 3 -->
    <article class="pagina-documento pagina-3"></article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// ============================================
// PROPS: Un prop por cada campo del documento
// ============================================
const props = defineProps({
  // SECCIÓN 1: DATOS IDENTIFICATIVOS
  apellidosNombre: { type: String, default: "" },
  nifCif: { type: String, default: "" },
  razonSocial: { type: String, default: "" },
  calidad: { type: String, default: "" },

  // SECCIÓN 2: LUGAR Y MEDIO DE NOTIFICACIÓN
  tipoVia: { type: String, default: "" },
  nombreVia: { type: String, default: "" },
  numero: { type: String, default: "" },
  bloque: { type: String, default: "" },
  portal: { type: String, default: "" },
  escalera: { type: String, default: "" },
  planta: { type: String, default: "" },
  puerta: { type: String, default: "" },
  codigoPostal: { type: String, default: "" },
  municipio: { type: String, default: "" },
  provincia: { type: String, default: "" },
  pais: { type: String, default: "" },
  telefonoFijo: { type: String, default: "" },
  telefonoMovil: { type: String, default: "" },
  correoElectronico: { type: String, default: "" },

  // SECCIÓN 3: DATOS DEL ESTABLECIMIENTO E INSTALACIONES
  denominacionEstablecimiento: { type: String, default: "" },
  domicilioEstablecimiento: { type: String, default: "" },
  localidadEstablecimiento: { type: String, default: "" },
  provinciaEstablecimiento: { type: String, default: "" },
  codigoPostalEstablecimiento: { type: String, default: "" },
  instalacion1: { type: String, default: "" },
  instalacion2: { type: String, default: "" },
  instalacion3: { type: String, default: "" },
  instalacion4: { type: String, default: "" },
  instalacion5: { type: String, default: "" },
  instalacion6: { type: String, default: "" },

  // SECCIÓN 4: DATOS DE LA PERSONA AUTORIZADA
  figura: { type: String, default: "" },
  apellidosNombrePersona: { type: String, default: "" },
  dniNiePersona: { type: String, default: "" },

  // SECCIÓN 5: DECLARACIÓN Y FIRMA
  lugarFirma: { type: String, default: "" },
  diaFirma: { type: String, default: "" },
  mesFirma: { type: String, default: "" },
  anioFirma: { type: String, default: "" },
  representante: { type: String, default: "" },
  codigoDirectorio: { type: String, default: "" },
});

// ============================================
// ETIQUETAS ARRAY - Estructura base
// x: 0, y: 0 son PLACEHOLDERS - rellenar con coordenadas reales
// ============================================
const etiquetas = ref([
  // PÁGINA 1 - SECCIÓN 1
  {
    page: 1,
    name: "apellidosNombre",
    x: 20,
    y: 102,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "GARCÍA RODRÍGUEZ, Juan",
    displayValue: "GARCÍA RODRÍGUEZ, Juan",
  },
  {
    page: 1,
    name: "nifCif",
    x: 175,
    y: 102,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "12345678A",
    displayValue: "12345678A",
  },
  {
    page: 1,
    name: "nombreRepresentante",
    x: 20,
    y: 111,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "Empresa S.L.",
    displayValue: "Empresa S.L.",
  },
  {
    page: 1,
    name: "dniCifRepresentante",
    x: 175,
    y: 111,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "12345678A",
    displayValue: "12345678A",
  },

  // PÁGINA 1 - SECCIÓN 2
  {
    page: 1,
    name: "tipoVia",
    x: 27,
    y: 153,
    w: 30,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "avenida",
    displayValue: "",
  },
  {
    page: 1,
    name: "nombreVia",
    x: 50,
    y: 153,
    w: 70,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "de la cuesta empinada",
    displayValue: "",
  },
  {
    page: 1,
    name: "numero",
    x: 27,
    y: 162,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "7",
    displayValue: "",
  },
  {
    page: 1,
    name: "letra",
    x: 48,
    y: 162,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "letra",
    displayValue: "",
  },
  {
    page: 1,
    name: "KMEnLaVia",
    x: 70,
    y: 162,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "KMEnLaVia",
    displayValue: "",
  },
  {
    page: 1,
    name: "bloque",
    x: 91,
    y: 162,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "izquierda",
    displayValue: "",
  },
  {
    page: 1,
    name: "portal",
    x: 112,
    y: 162,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "23",
    displayValue: "",
  },
  {
    page: 1,
    name: "escalera",
    x: 133,
    y: 162,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "dercha",
    displayValue: "",
  },
  {
    page: 1,
    name: "planta",
    x: 154,
    y: 162,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "quinta",
    displayValue: "",
  },
  {
    page: 1,
    name: "puerta",
    x: 176,
    y: 162,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "izquierda",
    displayValue: "",
  },
  {
    page: 1,
    name: "codigoPostal",
    x: 175.5,
    y: 169.5,
    w: 30,
    h: 5,
    fontSize: 14,
    letterSpacing: 3.4,
    align: "left",
    value: "41900",
    displayValue: "",
  },
  {
    page: 1,
    name: "entidad",
    x: 27,
    y: 170,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "entidad",
    displayValue: "12345678A",
  },
  {
    page: 1,
    name: "municipio",
    x: 73,
    y: 170,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "Bollulos de la mitacion",
    displayValue: "",
  },
  {
    page: 1,
    name: "provincia",
    x: 123,
    y: 170,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "guadalajara",
    displayValue: "",
  },
  {
    page: 1,
    name: "pais",
    x: 154,
    y: 170,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "conchinchina",
    displayValue: "",
  },
  {
    page: 1,
    name: "telefonoFijo",
    x: 27,
    y: 179,
    w: 40,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "654456654",
    displayValue: "",
  },
  {
    page: 1,
    name: "telefonoMovil",
    x: 53,
    y: 179,
    w: 40,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "654456654",
    displayValue: "",
  },
  {
    page: 1,
    name: "correoElectronico",
    x: 80,
    y: 179,
    w: 80,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "ivaghsshshshshshs",
    displayValue: "",
  },

  // PÁGINA 1 - SECCIÓN 3
  {
    page: 1,
    name: "denominacionEstablecimiento",
    x: 20,
    y: 228,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "denominacionEstablecimiento",
    displayValue: "",
  },
  {
    page: 1,
    name: "domicilioEstablecimiento",
    x: 20,
    y: 237,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "domicilioEstablecimiento",
    displayValue: "",
  },
  {
    page: 1,
    name: "localidadEstablecimiento",
    x: 20,
    y: 246,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "localidadEstablecimiento",
    displayValue: "",
  },
  {
    page: 1,
    name: "provinciaEstablecimiento",
    x: 111,
    y: 246,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "provinciaEstablecimiento",
    displayValue: "",
  },
  {
    page: 1,
    name: "codigoPostalEstablecimiento",
    x: 176,
    y: 245.5,
    w: 30,
    h: 5,
    fontSize: 14,
    letterSpacing: 3.4,
    align: "left",
    value: "12345",
    displayValue: "",
  },
  {
    page: 1,
    name: "instalacion1",
    x: 47,
    y: 255,
    w: 80,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "instalacion1",
    displayValue: "",
  },

  // PÁGINA 2 - SECCIÓN 4
  {
    page: 2,
    name: "figura",
    x: 53.5,
    y: 63.2,
    w: 80,
    h: 5,
    fontSize: 12,
    align: "left",
    value: "X",
    displayValue: "",
  },
  {
    page: 2,
    name: "apellidosNombrePersona",
    x: 20,
    y: 73,
    w: 100,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "Eduardo García Rodríguez",
    displayValue: "",
  },
  {
    page: 2,
    name: "dniNiePersona",
    x: 131,
    y: 73,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "right",
    value: "12345678A",
    displayValue: "",
  },

  // PÁGINA 2 - SECCIÓN 5
  {
    page: 2,
    name: "lugarFirma",
    x: 58,
    y: 100,
    w: 50,
    h: 5,
    fontSize: 10,
    align: "left",
    value: "Bollullos de la Mitación",
    displayValue: "Bollullos de la Mitación",
  },
  {
    page: 2,
    name: "diaFirma",
    x: 105,
    y: 100,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "center",
    value: "29",
    displayValue: "",
  },
  {
    page: 2,
    name: "mesFirma",
    x: 123,
    y: 100,
    w: 15,
    h: 5,
    fontSize: 10,
    align: "center",
    value: "noviembre",
    displayValue: "",
  },
  {
    page: 2,
    name: "anioFirma",
    x: 146,
    y: 100,
    w: 20,
    h: 5,
    fontSize: 10,
    align: "center",
    value: "1234",
    displayValue: "",
  },
  {
    page: 2,
    name: "representante",
    x: 70,
    y: 108,
    w: 100,
    h: 20,
    fontSize: 10,
    align: "left",
    value: "",
    displayValue: "",
    imageUrl: "/firma-solay.png",
  },
  {
    page: 2,
    name: "codigoDirectorio",
    x: 105.3,
    y: 145,
    w: 30,
    h: 5,
    fontSize: 13,
    letterSpacing: 3.4,
    align: "center",
    value: "A01041434",
    displayValue: "",
  },
]);

// ============================================
// WATCHER: Sincronizar props → etiquetas
// ============================================
watch(
  () => ({
    apellidosNombre: props.apellidosNombre,
    nifCif: props.nifCif,
    razonSocial: props.razonSocial,
    calidad: props.calidad,
    tipoVia: props.tipoVia,
    nombreVia: props.nombreVia,
    numero: props.numero,
    bloque: props.bloque,
    portal: props.portal,
    escalera: props.escalera,
    planta: props.planta,
    puerta: props.puerta,
    codigoPostal: props.codigoPostal,
    municipio: props.municipio,
    provincia: props.provincia,
    pais: props.pais,
    telefonoFijo: props.telefonoFijo,
    telefonoMovil: props.telefonoMovil,
    correoElectronico: props.correoElectronico,
    denominacionEstablecimiento: props.denominacionEstablecimiento,
    domicilioEstablecimiento: props.domicilioEstablecimiento,
    localidadEstablecimiento: props.localidadEstablecimiento,
    provinciaEstablecimiento: props.provinciaEstablecimiento,
    codigoPostalEstablecimiento: props.codigoPostalEstablecimiento,
    instalacion1: props.instalacion1,
    instalacion2: props.instalacion2,
    instalacion3: props.instalacion3,
    instalacion4: props.instalacion4,
    instalacion5: props.instalacion5,
    instalacion6: props.instalacion6,
    figura: props.figura,
    apellidosNombrePersona: props.apellidosNombrePersona,
    dniNiePersona: props.dniNiePersona,
    lugarFirma: props.lugarFirma,
    diaFirma: props.diaFirma,
    mesFirma: props.mesFirma,
    anioFirma: props.anioFirma,
    representante: props.representante,
    codigoDirectorio: props.codigoDirectorio,
  }),
  (newVals) => {
    etiquetas.value = etiquetas.value.map((e) => {
      const propVal = newVals[e.name];
      const finalValue =
        propVal !== undefined &&
        propVal !== null &&
        String(propVal).trim() !== ""
          ? propVal
          : "";
      return { ...e, value: finalValue };
    });
  },
  { deep: true },
  // TEMPORAL: Quitado 'immediate: true' para debugging - mantiene valores de prueba
  // immediate: true
);

// ============================================
// COMPUTED: Ocultar valores específicos
// ============================================
const ocultarValores = new Set([
  "Propietario",
  "Instalador",
  "Responsable técnico",
  "Técnico competente",
  "Instalador habilitado",
]);

const etiquetasVisibles = computed(() =>
  etiquetas.value.map((e) => {
    // TEMPORAL: Mientras mapeamos coordenadas, SIEMPRE mostrar el valor para debugging
    // const val = e.value && String(e.value).trim().toLowerCase()
    // const esOculto = Array.from(ocultarValores).some(
    //   (v) => String(v).toLowerCase() === val
    // )
    // return {
    //   ...e,
    //   displayValue: esOculto ? '' : e.value
    // }

    // DURANTE MAPEO: Mostrar siempre para ver posiciones
    return {
      ...e,
      displayValue: e.value,
    };
  }),
);

// ============================================
// COMPUTED: Etiquetas por página
// ============================================
const etiquetasPage1Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 1),
);

const etiquetasPage2Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 2),
);

const etiquetasPage3Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 3),
);

// ============================================
// COMPUTED: Marcadores (X en checkboxes)
// ============================================
const marcadores = computed(() =>
  etiquetas.value
    .map((e) => {
      if (!e.markers) return null;
      const val = e.value && String(e.value).trim();
      const coord = e.markers?.[val];
      return coord
        ? { name: e.name, x: coord.x, y: coord.y, page: e.page }
        : null;
    })
    .filter(Boolean),
);

// ============================================
// COMPUTED: Marcadores por página
// ============================================
const marcadoresPage1 = computed(() =>
  marcadores.value.filter((m) => m.page === 1),
);

const marcadoresPage2 = computed(() =>
  marcadores.value.filter((m) => m.page === 2),
);

const marcadoresPage3 = computed(() =>
  marcadores.value.filter((m) => m.page === 3),
);

// ============================================
// FUNCIONES: Estilos dinámicos
// ============================================
const estiloEtiqueta = (e) => ({
  position: "absolute",
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  minWidth: `${e.w}mm`,
  width: "auto",
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  letterSpacing: `${e.letterSpacing || 0}pt`,
  display: "inline-block",
  direction: "ltr",
  textAlign: e.align || "left",
  padding: "0 1mm",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "visible",
  fontFamily: "Arial, sans-serif",
  lineHeight: "1",
});

const estiloEtiquetaImagen = (e) => ({
  position: "absolute",
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  width: `${e.w}mm`,
  height: `${e.h}mm`,
  backgroundImage: `url("${e.imageUrl}")`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "inline-block",
});

const estiloMarcador = (m) => ({
  position: "absolute",
  left: `${m.x}mm`,
  top: `${m.y}mm`,
  fontSize: "10pt",
  fontWeight: 700,
  transform: "translate(-50%,-50%)",
  pointerEvents: "none",
  color: "#000",
  fontFamily: "Arial, sans-serif",
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
  padding: 8mm 0;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Imágenes de fondo */
.pagina-1 {
  background-image: url("/documentos-oficiales/Anexo-bueno1.png");
}

.pagina-2 {
  background-image: url("/documentos-oficiales/Anexo-bueno2.png");
}

.pagina-3 {
  background-image: url("/documentos-oficiales/Anexo-bueno3.png");
}

/* Campos overlay - DEBUG: visible durante mapeo de coordenadas */
.overlay-field {
  color: #000 !important;
}

/* Marcadores - DEBUG: visible para ver checkboxes */
.marker-x {
  padding: 1mm 2mm !important;
  border-radius: 2mm !important;
}

/* IMPRESIÓN */
@media print {
  * {
    margin: 0 !important;
    padding: 0 !important;
  }

  .print-wrapper {
    padding: 0;
    background: #fff;
  }

  .pagina-documento {
    width: 210mm;
    height: 297mm;
    margin: 0;
    page-break-after: always;
    page-break-inside: avoid;
    box-shadow: none;
    display: block;

    /* Forzar colores exactos */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Última página sin salto */
  .pagina-documento:last-child {
    page-break-after: auto;
  }
}
</style>
