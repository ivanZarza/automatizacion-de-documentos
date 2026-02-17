<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">DECLARACIÓN RESPONSABLE DE NO GENERACIÓN DE RCDs</h1>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p class="parrafo-intro">
          Por la presente, <strong>Eduardo Rivera Cabezas</strong>, con NIF <strong>28.818.007-L</strong>, Ingeniero Industrial colegiado número <strong>4654</strong> en el Colegio Oficial de Ingenieros Industriales de <strong>Andalucía Occidental</strong>, y con domicilio en <strong>Calle El Peñón 5 - 41940</strong>, localidad de <strong>Tomares</strong>, provincia de <strong>Sevilla</strong>
        </p>

        <h2 class="titulo-declara">DECLARA QUE</h2>

        <p class="parrafo-declaracion">
          La instalación fotovoltaica a realizar en <strong>{{ direccion }}</strong>, número <strong>{{ numero }}</strong> <strong>{{ otrosDatos }}</strong> – código postal <strong>{{ codigoPostal }}</strong>, con Referencia Catastral <strong>{{ referenciaCatastral }}</strong>, en el término municipal de <strong>{{ municipio }}</strong>, provincia de <strong>{{ provincia }}</strong>:
        </p>

        <div class="lista-declaracion">
          <p class="item-declaracion">
            <span class="numero-item">1.</span> Debido a su escasa entidad, no generará residuos de la construcción que, por volumen y naturaleza deban ser entregados a un gestor autorizado o al concesionario de la Mancomunidad.
          </p>
          
          <p class="item-declaracion">
            <span class="numero-item">2.</span> Que los residuos que se produzcan serán depositados en Puntos Limpios en aras de conseguir una alta protección del medio ambiente y una adecuada preservación de la naturaleza y el paisaje.
          </p>
        </div>

        <!-- Firma y datos -->
        <p class="parrafo-firmante">
          <strong>Eduardo Rivera Cabezas</strong><br>
          <strong>670308856</strong><br>
          <strong>erivera@solay.es</strong><br>
          <strong>Calle El Peñón 5 – 41940 – Tomares – Sevilla</strong>
        </p>

        <!-- Logo footer -->
        <div class="logo-footer">
          <img src="/firma-solay.png" alt="Logo Solay Footer" class="logo-footer-img" />
        </div>

        <!-- Fecha -->
        <p class="parrafo-fecha">
          En <strong>{{ ciudadFirma }}</strong>, a <strong>{{ fecha }}</strong>.
        </p>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  direccion: String,
  numero: String,
  otrosDatos: String,
  codigoPostal: String,
  referenciaCatastral: String,
  municipio: String,
  provincia: String,
  ciudadFirma: String,
  fecha: String
})
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
  font-size: 17px;
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
  line-height: 1.3;
}

.logo {
  width: 150px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  line-height: 1.8;
  font-size: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.parrafo-intro {
  margin: 0 0 20px 0;
  text-align: justify;
}

.titulo-declara {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #0066cc;
  margin: 20px 0;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.parrafo-declaracion {
  margin: 15px 0 10px 0;
  text-align: justify;
}

/* ========== LISTA DECLARACIÓN ========== */
.lista-declaracion {
  margin: 10px 0;
}

.item-declaracion {
  display: flex;
  margin: 5px 0;
  text-align: justify;
}

.numero-item {
  font-weight: bold;
  margin-right: 15px;
  min-width: 25px;
}

/* ========== DATOS FIRMANTE ========== */
.parrafo-firmante {
  text-align: center;
  margin: 20px 0 20px 0;
  font-size: 14px;
  line-height: 1.6;
}

/* ========== LOGO FOOTER ========== */
.logo-footer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.logo-footer-img {
  width: 150px;
  height: auto;
}

/* ========== FECHA ========== */
.parrafo-fecha {
  text-align: center;
  font-weight: bold;
  margin: 30px 0 20px 0;
  font-size: 15px;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid #0066cc;
  margin-top: 5px;
  text-align: center;
  font-size: 11px;
  color: #666;
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
    font-size: 16px !important;
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
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
