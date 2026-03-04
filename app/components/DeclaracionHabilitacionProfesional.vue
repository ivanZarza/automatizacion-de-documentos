<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">

      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">DECLARACIÓN RESPONSABLE</h1>
          <h3 class="titulo-secundario">DE HABILITACIÓN PROFESIONAL</h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <!-- PÁRRAFO INTRODUCTORIO -->
        <p class="parrafo-intro">
          Por la presente,
          <span class="texto-fijo">{{ datosProfesional.nombreProfesional }}</span>,
          con NIF
          <span class="texto-fijo">{{ datosProfesional.nifProfesional }}</span>,
          <span class="texto-fijo">{{ datosProfesional.profesionTitulo }}</span>
          colegiado número
          <span class="texto-fijo">{{ datosProfesional.numeroColegiado }}</span>
          en el
          <span class="texto-fijo">{{ datosProfesional.nombreColegio }}</span>,
          y con domicilio en
          <span class="texto-fijo">{{ datosProfesional.domicilioProfesional }}</span> -
          <span class="texto-fijo">{{ datosProfesional.codigoPostalProfesional }}</span>,
          localidad de
          <span class="texto-fijo">{{ datosProfesional.localidadProfesional }}</span>,
          provincia de
          <span class="texto-fijo">{{ datosProfesional.provinciaProfesional }}</span>
        </p>

        <!-- DECLARA -->
        <h2 class="titulo-declara">DECLARA</h2>

        <p class="parrafo-declara">
          Poseer la titulación de
          <span class="texto-fijo">{{ datosProfesional.profesionTitulo }}</span>,
          colegiado en el
          <span class="texto-fijo">{{ datosProfesional.nombreColegio }}</span>
          con número de colegiado
          <span class="texto-fijo">{{ datosProfesional.numeroColegiado }}</span>
          y estar habilitado para el ejercicio de la profesión.
        </p>

        <!-- Fecha y lugar -->
        <p class="parrafo-fecha">
          En <strong>{{ ciudadFirma }}</strong>, a <strong>{{ dia }} de {{ mes }} de {{ anio }}</strong>.
        </p>

        <!-- Logo footer -->
        <div class="logo-footer">
          <img src="/firma-solay.png" alt="Logo Solay Footer" class="logo-footer-img" />
        </div>

        <!-- Firma y datos -->
        <p class="parrafo-firmante">
          <strong>Eduardo Rivera Cabezas</strong><br>
          <strong>670308856</strong><br>
          <strong>erivera@solay.es</strong><br>
          <strong>Calle El Peñón 5 – 41940 – Tomares – Sevilla</strong>
        </p>
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
// Datos fijos del profesional
const datosProfesional = {
  nombreProfesional: 'Eduardo Rivera Cabezas',
  nifProfesional: '28.818.007-L',
  profesionTitulo: 'Ingeniero Industrial',
  numeroColegiado: '4654',
  nombreColegio: 'Colegio Oficial de Ingenieros Industriales de Andalucía Occidental',
  domicilioProfesional: 'Calle El Peñón 5',
  codigoPostalProfesional: '41940',
  localidadProfesional: 'Tomares',
  provinciaProfesional: 'Sevilla'
}

// Props editables (solo fechas y ciudad de firma)
defineProps({
  ciudadFirma: String,
  dia: String,
  mes: String,
  anio: String
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
  margin-top: 30px;
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
  font-size: 26px;
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

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  line-height: 1.8;
  font-size: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 50px 0px;
}

/* ========== PÁRRAFOS ========== */
.parrafo-intro {
  margin: 0 0 25px 0;
  text-align: justify;
}

.parrafo-declara {
  margin: 20px 0 25px 0;
  text-align: justify;
}

.parrafo-fecha {
  text-align: center;
  font-weight: bold;
  margin: 10px 0 0 0;
  font-size: 15px;
}

/* ========== TÍTULOS ========== */
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

/* ========== TEXTO ========== */
.texto-fijo {
  color: #000;
  font-weight: normal;
}

.texto-editable {
  color: #000;
  font-weight: bold;
}

/* ========== FIRMA BLOQUE ========== */
.firma-bloque {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  /* Ajusta el margen superior según sea necesario */
}

/* ========== DATOS FIRMANTE ========== */
.parrafo-firmante {
  text-align: center;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

/* ========== LOGO FOOTER ========== */
.logo-footer {
  display: flex;
  justify-content: center;
  margin: 0;
}

.logo-footer-img {
  width: 150px;
  height: auto;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid #0066cc;
  margin-top: 20px;
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
    page-break-after: avoid;
    background: white !important;
  }

  div[data-pdf-content]>div {
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
