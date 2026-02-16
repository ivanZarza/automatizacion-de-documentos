<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">PLANOS DE SITUACIÓN,</h1>
          <h3 class="titulo-secundario">EMPLAZAMIENTO Y CUBIERTA</h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- TÍTULO DESCRIPTIVO DEL PROYECTO -->
      <div class="titulo-descriptivo">
        <p class="texto-descriptivo">
          <span class="texto-rojo">{{ formattedData.pse_tipo }}</span>
          <span class="texto-fijo"> de </span>
          <span class="texto-rojo">{{ formattedData.pse_potencia }}kW </span>
          <span class="texto-rojo"> {{ formattedData.pse_descripcion }}</span>
        </p>
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <!-- DATOS DEL PROYECTO -->
        <div class="seccion-datos">
          <h2 class="titulo-seccion">DATOS DEL PROYECTO</h2>
          
          <table class="tabla-datos">
            <tbody>
              <tr>
                <td class="label">Titular:</td>
                <td class="valor">{{ formattedData.promotor }}</td>
                <td class="label">NIF/CIF:</td>
                <td class="valor">{{ formattedData.nif }}</td>
              </tr>
              <tr>
                <td class="label">Dirección:</td>
                <td class="valor" colspan="3">{{ formattedData.direccion }}, {{ formattedData.numero }}</td>
              </tr>
              <tr>
                <td class="label">Localidad:</td>
                <td class="valor">{{ formattedData.localidad }}</td>
                <td class="label">Código Postal:</td>
                <td class="valor">{{ formattedData.codigoPostal }}</td>
              </tr>
              <tr>
                <td class="label">Referencia Catastral:</td>
                <td class="valor" colspan="3">{{ formattedData.referenciaCatastral }}</td>
              </tr>
              <tr>
                <td class="label">Potencia:</td>
                <td class="valor">{{ formattedData.potenciaKw }} kW</td>
                <td class="label">Tipo Instalación:</td>
                <td class="valor">{{ formattedData.tipoInstalacion }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- LOGOS Y CERTIFICACIONES -->
        <div class="seccion-logos">
          <div class="contenedor-logos">
            <div class="logo-item">
              <img src="/logos/Icono renovables 1.png" alt="Icono Renovables 1" class="logo-certificacion" />
            </div>
            <div class="logo-item">
              <img src="/logos/Icono renovables 2.png" alt="Icono Renovables 2" class="logo-certificacion" />
            </div>
            <div class="logo-item">
              <img src="/logos/Icono renovables 3.png" alt="Icono Renovables 3" class="logo-certificacion" />
            </div>
            <div class="logo-item">
              <img src="/logos/Icono renovables 4.png" alt="Icono Renovables 4" class="logo-certificacion" />
            </div>
            <div class="logo-item">
              <img src="/logos/Icono renovables 5.png" alt="Icono Renovables 5" class="logo-certificacion" />
            </div>
          </div>
        </div>

        <!-- PLANO DE SITUACIÓN Y EMPLAZAMIENTO -->
        <div class="seccion-plano">
          <h2 class="titulo-seccion">Plano de Situación</h2>
          
          <div class="contenedor-plano-situacion">
            <!-- Datos a la izquierda -->
            <div class="datos-plano">
              <div class="dato-bloque">
                <p class="dato-titulo">Plano de situación geográfica de la instalación.</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Datos Generales:</strong></p>
                <p class="dato-item"><span class="dato-label-inline">E2 - Instalación Generadora Fotovoltaica</span></p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Provincia:</strong></p>
                <p class="dato-item">{{ formattedData.provincia }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Localidad:</strong></p>
                <p class="dato-item">{{ formattedData.localidad }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Referencia Catastral</strong></p>
                <p class="dato-item">{{ formattedData.referenciaCatastral }}</p>
              </div>
            </div>

            <!-- Imagen a la derecha (placeholder) -->
            <div class="imagen-plano">
              <img v-if="formattedData.imagenSituacion" :src="formattedData.imagenSituacion" alt="Plano de Situación" class="imagen-contenido" />
              <div v-else class="placeholder-imagen">
                [MAPA DE SITUACIÓN]
              </div>
            </div>
          </div>
        </div>

        <!-- PLANO DE EMPLAZAMIENTO -->
        <div class="seccion-plano">
          <h2 class="titulo-seccion">Plano de Emplazamiento</h2>
          
          <div class="contenedor-plano-situacion">
            <!-- Datos a la izquierda -->
            <div class="datos-plano">
              <div class="dato-bloque">
                <p class="dato-titulo">Plano de emplazamiento de la instalación.</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Dirección:</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.direccion }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Número:</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.numero }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Código Postal:</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.codigoPostal }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Provincia:</strong></p>
                <p class="dato-item">{{ formattedData.provincia }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Localidad:</strong></p>
                <p class="dato-item">{{ formattedData.localidad }}</p>
              </div>
            </div>

            <!-- Imagen a la derecha (placeholder) -->
            <div class="imagen-plano">
              <img v-if="formattedData.imagenEmplazamiento" :src="formattedData.imagenEmplazamiento" alt="Plano de Emplazamiento" class="imagen-contenido" />
              <div v-else class="placeholder-imagen">
                [FOTO AÉREA/PLANO]
              </div>
            </div>
          </div>
        </div>

        <!-- PLANO DE CUBIERTA -->
        <div class="seccion-plano">
          <h2 class="titulo-seccion">Plano de Cubierta</h2>
          
          <div class="contenedor-plano-situacion">
            <!-- Datos a la izquierda -->
            <div class="datos-plano">
              <div class="dato-bloque">
                <p class="dato-titulo">Plano de detalle de la instalación fotovoltaica en cubierta.</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Total nº de módulos:</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.totalModulos }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Potencia de los módulos (Wp):</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.potenciaModulos }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Potencia pico del generador (Wp):</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.potenciaPicoGenerador }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Disposición de los módulos:</strong></p>
                <p class="dato-item" style="color: #ff6633;">{{ formattedData.disposicionModulos }}</p>
              </div>
              
              <div class="dato-bloque">
                <p class="dato-label"><strong>Dirección:</strong></p>
                <p class="dato-item">{{ formattedData.provincia }}</p>
              </div>
            </div>

            <!-- Imagen a la derecha (placeholder) -->
            <div class="imagen-plano">
              <img v-if="formattedData.imagenCubierta" :src="formattedData.imagenCubierta" alt="Plano de Cubierta" class="imagen-contenido" />
              <div v-else class="placeholder-imagen">
                [FOTO DE CUBIERTA]
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Firma -->
      <div class="contenedor-firmas">
        <div class="firma-bloque">
          <div class="linea-firma-imagen">
            <img src="/firma-solay.png" alt="Firma" class="imagen-firma" />
          </div>
          <p class="etiqueta-firma">FIRMA DEL TÉCNICO</p>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pse_promotor: String,
  pse_nif: String,
  pse_direccion: String,
  pse_numero: String,
  pse_localidad: String,
  pse_codigoPostal: String,
  pse_provincia: String,
  pse_referenciaCatastral: String,
  pse_potenciaKw: String,
  pse_tipoInstalacion: String,
  pse_potenciaPicoGenerador: String,
  pse_totalModulos: String,
  pse_potenciaModulos: String,
  pse_disposicionModulos: String,
  pse_fecha: String,
  pse_autorProyecto: String,
  pse_tituloDescriptivo: String,
  pse_tipo: String,
  pse_potencia: String,
  pse_descripcion: String,
  pse_imagenSituacion: String,
  pse_imagenEmplazamiento: String,
  pse_imagenCubierta: String,
  logos: {
    type: Object,
    default: () => ({})
  }
})

// Proporciona valores por defecto si faltan datos
const formattedData = computed(() => ({
  promotor: props.pse_promotor || 'No especificado',
  nif: props.pse_nif || 'No especificado',
  direccion: props.pse_direccion || 'No especificado',
  numero: props.pse_numero || 'No especificado',
  localidad: props.pse_localidad || 'No especificado',
  codigoPostal: props.pse_codigoPostal || 'No especificado',
  provincia: props.pse_provincia || 'No especificado',
  referenciaCatastral: props.pse_referenciaCatastral || 'No especificado',
  potenciaKw: props.pse_potenciaKw || '0',
  tipoInstalacion: props.pse_tipoInstalacion || 'No especificado',
  potenciaPicoGenerador: props.pse_potenciaPicoGenerador || '0',
  totalModulos: props.pse_totalModulos || '0',
  potenciaModulos: props.pse_potenciaModulos || '0',
  disposicionModulos: props.pse_disposicionModulos || 'No especificado',
  fecha: props.pse_fecha || new Date().toLocaleDateString('es-ES'),
  autorProyecto: props.pse_autorProyecto || 'Eduardo Rivera Cabezas',
  tituloDescriptivo: props.pse_tituloDescriptivo || 'Instalación Solar Fotovoltaica',
  pse_tipo: props.pse_tipo || 'Instalación Solar Fotovoltaica',
  pse_potencia: props.pse_potencia || '0 kW',
  pse_descripcion: props.pse_descripcion || 'para Autoconsumo',
  imagenSituacion: props.pse_imagenSituacion || null,
  imagenEmplazamiento: props.pse_imagenEmplazamiento || null,
  imagenCubierta: props.pse_imagenCubierta || null
}))
</script>

<style scoped>
@import '../styles/variables.css';

/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #333;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20mm;
  margin-top: 20px;
}

/* ========== ENCABEZADO ========== */
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 27px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}

.titulo-secundario {
  margin: 5px 0 0 0;
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}

.logo {
  width: 150px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

/* ========== TÍTULO DESCRIPTIVO ========== */
.titulo-descriptivo {
  padding: 12px 15px;
  margin: 30px 0;
  border-radius: 4px;
  text-align: center;
}

.texto-descriptivo {
  margin: 0;
  color: #333;
  font-weight: bold;
  font-size: 15px;
  line-height: 1.5;
}

.texto-rojo {
  color: #333;
}

.texto-fijo {
  color: #333;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  line-height: 1.6;
  font-size: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ========== SECCIONES ========== */
.seccion-datos,
.seccion-plano,
.seccion-cubierta {
  margin-bottom: 13px;
}

/* ========== TÍTULOS DE SECCIÓN ========== */
.titulo-seccion {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #0066cc;
  margin: 15px 0 12px 0;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

/* ========== TABLA DE DATOS ========== */
.tabla-datos {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 12px;
}

.tabla-datos tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tabla-datos td {
  padding: 6px;
  border: 1px solid #ddd;
}

.tabla-datos .label {
  font-weight: bold;
  width: 25%;
  background-color: #f5f5f5;
}

.tabla-datos .valor {
  width: 25%;
}

/* ========== COLUMNAS ========== */
.dos-columnas {
  display: flex;
  gap: 12px;
  width: 100%;
  margin: 12px 0;
}

.columna {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ========== BLOQUES DE INFORMACIÓN ========== */
.info-bloque {
  background-color: #f9f9f9;
  border-left: 4px solid #0066cc;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
}

.info-bloque h3 {
  font-size: 14px;
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.info-bloque p {
  margin: 4px 0;
  line-height: 1.4;
}

/* ========== NOTAS ========== */
.nota-plano {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 10px;
}

.nota-plano p {
  margin: 0;
}

/* ========== PLANO DE SITUACIÓN ========== */
.seccion-plano {
  margin: 8px 0;
}

.contenedor-plano-situacion {
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 8px 0;
}

.datos-plano {
  flex: 0 0 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
}

.dato-bloque {
  margin-bottom: 5px;
}

.dato-titulo {
  font-style: italic;
  color: #0066cc;
  margin: 0 0 5px 0;
  font-size: 12px;
}

.dato-label {
  font-weight: bold;
  color: #333;
  margin: 0;
}

.dato-label-inline {
  color: #0066cc;
  font-weight: normal;
}

.dato-item {
  margin: 3px 0 0 0;
  color: #333;
  line-height: 1.3;
}

.imagen-plano {
  flex: 1;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-imagen {
  text-align: center;
  color: #999;
  font-size: 14px;
  font-weight: bold;
}

.imagen-contenido {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

/* ========== LOGOS Y CERTIFICACIONES ========== */
.seccion-logos {
  margin: 40px 0;
  padding: 8px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.contenedor-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  width: 100%;
}

.logo-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}

.logo-certificacion {
  max-width: 100%;
  height: auto;
  max-height: 80px;
  object-fit: contain;
}

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 120px;
}

.firma-bloque {
  text-align: center;
  width: 200px;
}

.linea-firma-imagen {
  border-bottom: 1px solid #000;
  height: 50px;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.imagen-firma {
  height: 70px;
  object-fit: contain;
  margin-top: -45px;
}

.etiqueta-firma {
  margin: 0;
  font-weight: bold;
  font-size: 12px;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 10px 0;
  border-top: 1px solid #0066cc;
  margin-top: 15px;
  text-align: center;
  font-size: 10px;
  color: #666;
}

.texto-pie {
  margin: 1px 0;
}

/* ========== MEDIA QUERIES ========== */
@media print {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .contenedor-pdf {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  .contenedor-principal {
    width: 210mm !important;
    min-height: 297mm !important;
    padding: 20mm !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  div[data-pdf-content] {
    font-size: 15px !important;
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-after: avoid;
    background: white !important;
  }

  div[data-pdf-content] > div {
    height: auto !important;
  }

  button {
    display: none !important;
  }

  body {
    margin: 0;
    padding: 0;
  }
}

@media screen {
  div[data-pdf-content] {
    font-size: 15px;
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    background: white;
    min-height: 350mm;
    padding: 10mm;
  }
}
</style>
