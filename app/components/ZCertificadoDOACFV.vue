<template>
  <div data-pdf-content class="contenedor-pdf">
    <div class="contenedor-principal">
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE DIRECCIÓN DE OBRA DE INSTALACIÓN DE EQUIPOS</h1>
          <p class="subtitulo">-CONTRATO DE VENTA E INSTALACIÓN DE EQUIPOS / ANEXO II-</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p class="parrafo-intro">
          Eduardo Rafael Rivera Cabezas, con N.I.F. 28.818.007-L, Ingeniero Industrial, inscrito en el Colegio Oficial de Ingenieros Industriales de Andalucía Occidental con el nº 4654
        </p>
        <p class="titulo-autorizo">CERTIFICA QUE:</p>
        <ol>
          <li>
            Ha redactado y firmado el Proyecto de Ejecución titulado: Instalación solar fotovoltaica de {{ potencia }}kW para Autoconsumo en {{ tipoEstablecimiento }} ({{ localidad }}).
          </li>
          <li>
            Ha ejercido la Dirección Técnica de Obra en la ejecución de la instalación asociada al Proyecto:<br>
            Titular/Promotor: {{ titular }} &nbsp;&nbsp; NIF: {{ nifTitular }}<br>
            Localización: {{ localizacion }} &nbsp;&nbsp; C.P.: {{ cp }}<br>
            Localidad: {{ localidad }} &nbsp;&nbsp; Provincia: {{ provincia }}<br>
            Título del Proyecto de Ejecución: Instalación solar fotovoltaica de {{ potencia }} para autoconsumo en {{ tipoEstablecimiento }} ({{ localidad }}).
          </li>
          <li>
            La empresa instaladora habilitada con Nº de Registro 41045500 – SOLAY INGENIEROS, S.L. ha ejecutado la instalación de autoconsumo fotovoltaico de {{ potencia }} descrita en el Proyecto de Ejecución, sin ninguna modificación bajo la supervisión y dirección técnica del que suscribe.
          </li>
          <li>
            Se han observado y cumplido todas las condiciones y/o requisitos técnicos y de seguridad según la legislación vigente en el desarrollo de los trabajos (R.E.B.T. e I.T.C. según instalación determinada en Condiciones Particulares del Contrato) y se han realizado todas las verificaciones previstas en los reglamentos vigentes que afectan a la instalación que el Proyecto comprende, con el resultado de FAVORABLE.
          </li>
        </ol>
          <div class="firma-bloque">
              <img src="/firma-solay.png" alt="Firma" class="imagen-firma" />
            <p class="etiqueta-firma">FIRMA DEL REPRESENTANTE</p>
            <p class="nombre-firma">{{ representante }}</p>
                            <p class="texto-pie">
          <strong>LUGAR Y FECHA:</strong> {{ localidad }}, a {{ dia }} de {{ mes }} de {{ anio }}.
        </p>
          </div>

      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <div class="footer-logo">
          <img src="/logo-solay.png" alt="SOLAV INGENIEROS, S.L." class="logo" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titular: String,
  nifTitular: String,
  localizacion: String,
  cp: String,
  localidad: String,
  provincia: String,
  dia: String,
  mes: String,
  anio: String,
  potencia: String,
  tipoEstablecimientoString: String
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

.footer-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-top: auto;
}

.firma-bloque {
  margin-top: 50px;
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
