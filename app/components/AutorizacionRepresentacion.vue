<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
          <p class="subtitulo">Documento válido para trámites administrativos</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p class="parrafo-intro">
          Yo, <strong>{{ autorizante }}</strong>, con DNI/NIF <strong>{{ dniAutorizante }}</strong>, y con domicilio en <strong>{{ domicilioAutorizante }}</strong>, localidad <strong>{{ localidad }}</strong>, provincia de <strong>{{ provincia }}</strong>, actuando en nombre propio,
        </p>

        <h2 class="titulo-autorizo">AUTORIZO A</h2>

        <p class="parrafo-autorizacion">
          <strong>{{ representante }}</strong>, con DNI/NIF <strong>{{ dniRepresentante }}</strong>, y con domicilio en <strong>{{ domicilioRepresentante }}</strong>, localidad Sevilla, provincia de Sevilla, ante el <strong>{{ organismo }}</strong>, para realizar en mi nombre las gestiones de <strong>{{ gestiones }}</strong>.
        </p>

        <div class="caja-validez">
          <p class="texto-validez">
            <strong>VALIDEZ:</strong> Esta autorización es válida desde su firma hasta que sea revocada expresamente.
          </p>
        </div>

        <p class="parrafo-fecha">En {{ localidad }} a {{ fecha }}</p>

        <!-- Firmas lado a lado compacto -->
        <div class="contenedor-firmas">
          <div class="firma-bloque">
            <div class="linea-firma"></div>
            <p class="etiqueta-firma">FIRMA DEL AUTORIZANTE</p>
            <p class="nombre-firma">{{ autorizante }}</p>
          </div>
          <div class="firma-bloque">
            <div class="linea-firma-imagen">
              <img src="/firma-solay.png" alt="Firma" class="imagen-firma" />
            </div>
            <p class="etiqueta-firma">FIRMA DEL REPRESENTANTE</p>
            <p class="nombre-firma">{{ representante }}</p>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">Validez legal sujeta a regulaciones vigentes</p>
        <p class="texto-pie">www.solay.es | Paseo de Bollullos de la Mitación 18. Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  autorizante: String,
  dniAutorizante: String,
  domicilioAutorizante: String,
  representante: String,
  dniRepresentante: String,
  domicilioRepresentante: String,
  organismo: String,
  gestiones: String,
  fecha: String,
  localidad: String,
  provincia: String,
  generatedDate: {
    type: String,
    default: ''
  }
})

// Ocultar botones al imprimir
const hideButtonsOnPrint = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.style.display = 'none');
  window.print();
  buttons.forEach(button => button.style.display = '');
}
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
  color: #ff9900;
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

.titulo-autorizo {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #0066cc;
  margin: 15px 0;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.parrafo-autorizacion {
  margin: 15px 0;
  text-align: justify;
}

/* ========== CAJA VALIDEZ ========== */
.caja-validez {
  background-color: #ffe5b4;
  border-left: 4px solid #ff9900;
  padding: 12px;
  margin: 15px 0;
  font-size: 16px;
}

.texto-validez {
  margin: 0;
}

/* ========== FECHA ========== */
.parrafo-fecha {
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
  font-size: 14px;
}

.nombre-firma {
  margin: 2px 0;
  font-size: 13px;
  color: #666;
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
