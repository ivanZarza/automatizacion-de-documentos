<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">

      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">DECLARACIÓN RESPONSABLE DE ESTAR AL CORRIENTE DE</h1>
          <h1 class="titulo-principal">PAGO DE LAS EMPRESAS ACREEDORAS</h1>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p class="parrafo-expediente">
          N.º Expediente Ecovivienda: <strong>{{ numeroExpediente }}</strong>
        </p>

        <p class="parrafo-empresa">
          La empresa <strong>{{ nombreEmpresa }}</strong>, con CIF <strong>{{ cifEmpresa }}</strong>,
        </p>

        <h2 class="titulo-manifiesta">MANIFIESTA</h2>

        <p class="parrafo-declaracion">
          Que la factura emitida correspondiente al pago final de la instalación ejecutada en la vivienda de D. <strong>{{ apellidosNombre }}</strong>, con DNI <strong>{{ nifCif }}</strong>, ha sido íntegramente abonada, encontrándose el citado cliente al corriente de pago con esta empresa.
        </p>

        <p class="parrafo-factura">
          Asimismo, se hace constar que el número de la factura satisfecha es el siguiente:
        </p>

        <p class="parrafo-numero-factura">
          Factura n.º <strong>{{ numeroFactura }}</strong>
        </p>

        <p class="parrafo-fecha">En Malaga a {{ dia }} de {{ mes }} de {{ anio }}</p>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">Documento con validez legal conforme a la normativa vigente</p>
        <p class="texto-pie">www.solay.es | Paseo de Bollullos de la Mitación 18. Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  numeroExpediente: String,
  nombreEmpresa: String,
  cifEmpresa: String,
  apellidosNombre: String,
  nifCif: String,
  numeroFactura: String,
  localidad: String,
  dia: String,
  mes: String,
  anio: String,
  generatedDate: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
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
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  text-align: center;
}

.subtitulo {
  margin: 2px 0 0 0;
  font-size: 16px;
  color: #666;
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
}

.parrafo-intro {
  margin: 0 0 15px 0;
  text-align: justify;
}

.parrafo-expediente {
  margin: 0 0 20px 0;
  text-align: left;
  font-size: 15px;
}

.parrafo-empresa {
  margin: 0 0 15px 0;
  text-align: left;
}

.titulo-manifiesta {
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
  margin: 15px 0;
  text-align: justify;
}

.parrafo-factura {
  margin: 20px 0 10px 0;
  text-align: left;
}

.parrafo-numero-factura {
  margin: 10px 0 20px 0;
  text-align: center;
  font-size: 17px;
}

/* ========== FECHA ========== */
.parrafo-fecha {
  text-align: center;
  font-weight: bold;
  margin: 40px 0 60px 0;
  font-size: 15px;
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
p {
  font-size: 16px;
}

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
    font-size: 20px;
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    background: white;
    min-height: 350mm;
    padding: 10mm;
  }
}
</style>
