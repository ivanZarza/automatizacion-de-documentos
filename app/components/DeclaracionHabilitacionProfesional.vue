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

        <!-- FECHA Y LUGAR -->
        <p class="parrafo-fecha">
          En 
          <span class="texto-editable">{{ ciudadFirma }}</span>, 
          a 
          <span class="texto-editable">{{ fecha }}</span>.
        </p>

        <!-- FIRMA -->
        <div class="contenedor-firmas">
          <div class="firma-bloque">
            <div class="linea-firma-imagen">
              <img src="/firma-solay.png" alt="Firma" class="imagen-firma" />
            </div>
            <p class="etiqueta-firma">FIRMA</p>
          </div>
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

// Props editables (solo fecha y ciudad de firma)
defineProps({
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
  margin-top: 30px;
}

/* ========== ENCABEZADO ========== */
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid var(--color-blue-royal);
  margin-bottom: 27px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0;
  font-size: 26px;
  font-weight: bold;
  color: var(--color-orange-medium-strong);
  text-align: center;
}

.titulo-secundario {
  margin: 5px 0 0 0;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-orange-medium-strong);
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
  margin: 50px 0 70px 0;
  font-size: 15px;
}

/* ========== TÍTULOS ========== */
.titulo-declara {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-blue-royal);
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

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 30px;
}

.firma-bloque {
  text-align: center;
  width: 200px;
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
  margin: 0;
  font-weight: bold;
  font-size: 14px;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid var(--color-blue-royal);
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

  div[data-pdf-content] {
    font-size: 14px !important;
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 20mm !important;
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
