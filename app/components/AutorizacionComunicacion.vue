<template>
  <div class="print-wrapper">
    <!-- PÁGINA 1 -->
    <article class="pagina-documento pagina-1">
      <span
        v-for="et in etiquetasPage1Visibles"
        :key="et.name"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        {{ et.displayValue }}
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
        :style="estiloEtiqueta(et)"
      >
        {{ et.displayValue }}
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
import { ref, computed, watch } from 'vue'

// ============================================
// PROPS: Un prop por cada campo del documento
// ============================================
const props = defineProps({
  // SECCIÓN 1: DATOS IDENTIFICATIVOS
  apellidosNombre: { type: String, default: '' },
  nifCif: { type: String, default: '' },
  razonSocial: { type: String, default: '' },
  calidad: { type: String, default: '' },

  // SECCIÓN 2: LUGAR Y MEDIO DE NOTIFICACIÓN
  tipoVia: { type: String, default: '' },
  nombreVia: { type: String, default: '' },
  numero: { type: String, default: '' },
  bloque: { type: String, default: '' },
  portal: { type: String, default: '' },
  escalera: { type: String, default: '' },
  planta: { type: String, default: '' },
  puerta: { type: String, default: '' },
  codigoPostal: { type: String, default: '' },
  municipio: { type: String, default: '' },
  provincia: { type: String, default: '' },
  pais: { type: String, default: '' },
  telefonoFijo: { type: String, default: '' },
  telefonoMovil: { type: String, default: '' },
  correoElectronico: { type: String, default: '' },

  // SECCIÓN 3: DATOS DEL ESTABLECIMIENTO E INSTALACIONES
  denominacionEstablecimiento: { type: String, default: '' },
  domicilioEstablecimiento: { type: String, default: '' },
  localidadEstablecimiento: { type: String, default: '' },
  provinciaEstablecimiento: { type: String, default: '' },
  codigoPostalEstablecimiento: { type: String, default: '' },
  instalacion1: { type: String, default: '' },
  instalacion2: { type: String, default: '' },
  instalacion3: { type: String, default: '' },
  instalacion4: { type: String, default: '' },
  instalacion5: { type: String, default: '' },
  instalacion6: { type: String, default: '' },

  // SECCIÓN 4: DATOS DE LA PERSONA AUTORIZADA
  figura: { type: String, default: '' },
  apellidosNombrePersona: { type: String, default: '' },
  dniNiePersona: { type: String, default: '' },

  // SECCIÓN 5: DECLARACIÓN Y FIRMA
  lugarFirma: { type: String, default: '' },
  diaFirma: { type: String, default: '' },
  mesFirma: { type: String, default: '' },
  anioFirma: { type: String, default: '' },
  representante: { type: String, default: '' },
  codigoDirectorio: { type: String, default: '' }
})

// ============================================
// ETIQUETAS ARRAY - Estructura base
// x: 0, y: 0 son PLACEHOLDERS - rellenar con coordenadas reales
// ============================================
const etiquetas = ref([
  // PÁGINA 1 - SECCIÓN 1
  {
    page: 1,
    name: 'apellidosNombre',
    x: 10,
    y: 32,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: 'GARCÍA RODRÍGUEZ, Juan',
    displayValue: 'GARCÍA RODRÍGUEZ, Juan'
  },
  {
    page: 1,
    name: 'nifCif',
    x: 130,
    y: 32,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '12345678A',
    displayValue: '12345678A'
  },
  {
    page: 1,
    name: 'razonSocial',
    x: 20,
    y: 42,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: 'Empresa S.L.',
    displayValue: 'Empresa S.L.'
  },
  {
    page: 1,
    name: 'calidad',
    x: 20,
    y: 52,
    w: 80,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: 'Instalador',
    displayValue: 'Instalador',
    markers: {
      'Propietario': { x: 28, y: 54 },
      'Instalador': { x: 58, y: 54 },
      'Responsable técnico': { x: 120, y: 54 }
    }
  },

  // PÁGINA 1 - SECCIÓN 2
  {
    page: 1,
    name: 'tipoVia',
    x: 0,
    y: 0,
    w: 30,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'nombreVia',
    x: 0,
    y: 0,
    w: 70,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'numero',
    x: 0,
    y: 0,
    w: 20,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'bloque',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'portal',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'escalera',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'planta',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'puerta',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'codigoPostal',
    x: 0,
    y: 0,
    w: 30,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'municipio',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'provincia',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'pais',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'telefonoFijo',
    x: 0,
    y: 0,
    w: 40,
    h: 5,
    fontSize: 7.5,
    align: 'right',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'telefonoMovil',
    x: 0,
    y: 0,
    w: 40,
    h: 5,
    fontSize: 7.5,
    align: 'right',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'correoElectronico',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },

  // PÁGINA 1 - SECCIÓN 3
  {
    page: 1,
    name: 'denominacionEstablecimiento',
    x: 0,
    y: 0,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'domicilioEstablecimiento',
    x: 0,
    y: 0,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'localidadEstablecimiento',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'provinciaEstablecimiento',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'codigoPostalEstablecimiento',
    x: 0,
    y: 0,
    w: 30,
    h: 5,
    fontSize: 7.5,
    align: 'center',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion1',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion2',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion3',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion4',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion5',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 1,
    name: 'instalacion6',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7,
    align: 'left',
    value: '',
    displayValue: ''
  },

  // PÁGINA 2 - SECCIÓN 4
  {
    page: 2,
    name: 'figura',
    x: 0,
    y: 0,
    w: 80,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: '',
    markers: {
      'Técnico competente': { x: 0, y: 0 },
      'Instalador habilitado': { x: 0, y: 0 },
      'Responsable técnico': { x: 0, y: 0 }
    }
  },
  {
    page: 2,
    name: 'apellidosNombrePersona',
    x: 0,
    y: 0,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'dniNiePersona',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'right',
    value: '',
    displayValue: ''
  },

  // PÁGINA 2 - SECCIÓN 5
  {
    page: 2,
    name: 'lugarFirma',
    x: 0,
    y: 0,
    w: 50,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'diaFirma',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'center',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'mesFirma',
    x: 0,
    y: 0,
    w: 15,
    h: 5,
    fontSize: 7.5,
    align: 'center',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'anioFirma',
    x: 0,
    y: 0,
    w: 20,
    h: 5,
    fontSize: 7.5,
    align: 'center',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'representante',
    x: 0,
    y: 0,
    w: 100,
    h: 5,
    fontSize: 7.5,
    align: 'left',
    value: '',
    displayValue: ''
  },
  {
    page: 2,
    name: 'codigoDirectorio',
    x: 0,
    y: 0,
    w: 30,
    h: 5,
    fontSize: 8,
    align: 'center',
    value: '',
    displayValue: ''
  }
])

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
    codigoDirectorio: props.codigoDirectorio
  }),
  (newVals) => {
    etiquetas.value = etiquetas.value.map((e) => {
      const propVal = newVals[e.name]
      const finalValue =
        propVal !== undefined && propVal !== null && String(propVal).trim() !== ''
          ? propVal
          : ''
      return { ...e, value: finalValue }
    })
  },
  { deep: true }
  // TEMPORAL: Quitado 'immediate: true' para debugging - mantiene valores de prueba
  // immediate: true
)

// ============================================
// COMPUTED: Ocultar valores específicos
// ============================================
const ocultarValores = new Set([
  'Propietario',
  'Instalador',
  'Responsable técnico',
  'Técnico competente',
  'Instalador habilitado'
])

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
      displayValue: e.value
    }
  })
)

// ============================================
// COMPUTED: Etiquetas por página
// ============================================
const etiquetasPage1Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 1)
)

const etiquetasPage2Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 2)
)

const etiquetasPage3Visibles = computed(() =>
  etiquetasVisibles.value.filter((e) => e.page === 3)
)

// ============================================
// COMPUTED: Marcadores (X en checkboxes)
// ============================================
const marcadores = computed(() =>
  etiquetas.value
    .map((e) => {
      if (!e.markers) return null
      const val = e.value && String(e.value).trim()
      const coord = e.markers?.[val]
      return coord ? { name: e.name, x: coord.x, y: coord.y, page: e.page } : null
    })
    .filter(Boolean)
)

// ============================================
// COMPUTED: Marcadores por página
// ============================================
const marcadoresPage1 = computed(() =>
  marcadores.value.filter((m) => m.page === 1)
)

const marcadoresPage2 = computed(() =>
  marcadores.value.filter((m) => m.page === 2)
)

const marcadoresPage3 = computed(() =>
  marcadores.value.filter((m) => m.page === 3)
)

// ============================================
// FUNCIONES: Estilos dinámicos
// ============================================
const estiloEtiqueta = (e) => ({
  position: 'absolute',
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  minWidth: `${e.w}mm`,
  width: 'auto',
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: 'inline-block',
  direction: 'ltr',
  textAlign: e.align || 'left',
  padding: '0 1mm',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  overflow: 'visible',
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1'
})

const estiloMarcador = (m) => ({
  position: 'absolute',
  left: `${m.x}mm`,
  top: `${m.y}mm`,
  fontSize: '10pt',
  fontWeight: 700,
  transform: 'translate(-50%,-50%)',
  pointerEvents: 'none',
  color: '#000',
  fontFamily: 'Arial, sans-serif'
})
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
  background-image: url('/documentos-oficiales/Anexo-bueno1.png');
}

.pagina-2 {
  background-image: url('/documentos-oficiales/Anexo-bueno2.png');
}

.pagina-3 {
  background-image: url('/documentos-oficiales/Anexo-bueno3.png');
}

/* Campos overlay - DEBUG: visible durante mapeo de coordenadas */
.overlay-field {
  background-color: rgba(255, 255, 0, 0.15) !important;
  border: 1px solid rgba(255, 0, 0, 0.4) !important;
  color: #000 !important;
}

/* Marcadores - DEBUG: visible para ver checkboxes */
.marker-x {
  background-color: rgba(255, 100, 100, 0.2) !important;
  border: 2px solid rgba(255, 0, 0, 0.6) !important;
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
