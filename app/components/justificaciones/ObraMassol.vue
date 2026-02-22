<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">Declaración responsable de</h1>
          <p class="subtitulo">Inicio de Instalación.</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p class="parrafo-declarante">
          Por la presente, D. Eduardo Rafael Rivera Cabeza, con NIF
          28.818.007-L, Ingeniero Industrial colegiado número 4654 en el Colegio
          Oficial de Ingenieros Industriales de Andalucía Occidental, y con
          domicilio en la Calle Ebro, 35 – 41.012 Sevilla
        </p>

        <h2 class="titulo-declara">Declara que:</h2>

        <div class="caja-declaracion">
          <p class="texto-declaracion">
            La instalación fotovoltaica de
            <span class="texto-rojo">{{ potenciaInstalacion }}kW</span> para
            autoconsumo individual con excedida a compensación que se ejecuta en
            la vivienda situada en
            <span class="texto-rojo">{{ emplazamientoCalle }}-{{ numeroEmplazamiento }}-{{ codigoPostalEmplazamiento }} - {{ ciudadEmplazamiento }} - ({{ provinciaEmplazamiento }})</span
            >, cuya referencia catastral es:
            <span class="texto-rojo">{{ referenciaCatastral }}</span>
          </p>
          <p class="texto-subrayado">
            Se inició y finalizó el día
            <span class="texto-rojo">{{ diaInicio }} de {{ mesInicio }} de {{ anioInicio }}</span
            >.
          </p>
        </div>
        <p class="parrafo-lugar-fecha">
          En Sevilla, a <span class="texto-rojo">{{ diaFirma }} de {{ mesFirma }} de {{ anioFirma }}</span>
        </p>

        <!-- Firmas lado a lado compacto -->
        <div class="contenedor-firmas">
          <div class="firma-bloque">
            <div class="linea-firma">
              <img :src="firma" alt="Firma" class="imagen-firma" />
            </div>
            <p class="etiqueta-firma">Firmado solicitante:</p>
          </div>
          <div class="firma-bloque">
            <div class="linea-firma-imagen">
              <img src="/firma-solay.png" alt="Firma" class="imagen-firma" />
            </div>
            <p class="etiqueta-firma">Firma autorizado:</p>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  emplazamientoCalle: String,
  numeroEmplazamiento: String,
  codigoPostalEmplazamiento: String,
  ciudadEmplazamiento: String,
  provinciaEmplazamiento: String,
  referenciaCatastral: String,
  diaInicio: String,
  mesInicio: String,
  anioInicio: String,
  diaFirma: String,
  mesFirma: String,
  anioFirma: String,
  firma: String,
});
</script>

<style scoped>
/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Segoe UI", Arial, sans-serif;
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
  font-size: 22px;
  font-weight: bold;
  color: #000;
  text-align: center;
}

.subtitulo {
  margin: 2px 0 0 0;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  text-align: center;
}

.logo {
  width: 140px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  line-height: 1.8;
  font-size: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.parrafo-declarante {
  margin: 0 0 15px 0;
  text-align: justify;
  font-size: 15px;
  line-height: 1.6;
}

.titulo-declara {
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  color: #000;
  margin: 20px 0;
  padding: 10px 0;
}

/* ========== CAJA DECLARACIÓN ========== */
.caja-declaracion {
  background-color: #fffacd;
  border-left: 4px solid #ffcc00;
  padding: 12px;
  margin: 15px 0;
  font-size: 15px;
}

.texto-declaracion {
  margin: 0 0 10px 0;
  text-align: justify;
  line-height: 1.6;
}

.texto-subrayado {
  margin: 10px 0 0 0;
  text-align: justify;
  text-decoration: underline;
  line-height: 1.6;
}

.texto-rojo {
  color: #cc0000;
  font-weight: bold;
}

/* ========== FECHA ========== */
.parrafo-lugar-fecha {
  text-align: center;
  font-weight: bold;
  margin: 40px 0 60px 0;
  font-size: 15px;
}

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-top: auto;
}

.firma-bloque {
  flex: 1;
  text-align: center;
}

.linea-firma {
  border-bottom: 1px solid #000;
  height: 60px;
  margin-bottom: 10px;
}

.linea-firma-imagen {
  border-bottom: 1px solid #000;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.imagen-firma {
  height: 80px;
  object-fit: contain;
  margin-top: -50px;
}

.etiqueta-firma {
  margin: 5px 0;
  font-weight: bold;
  font-size: 13px;
  color: #000;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid #0066cc;
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #000;
}

.texto-pie {
  margin: 2px 0;
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
    font-size: 16px;
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    background: white;
    min-height: 350mm;
    padding: 10mm;
  }
}
</style>
