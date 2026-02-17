

<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      
      <!-- Encabezado con Logo -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE ADECUACIÓN AL REAL DECRETO 1699/2011</h1>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <p>
          SOLAY INGENIEROS, S.L. empresa instaladora habilitada en baja tensión con C.I.F. B-09.848.912,
          <b>CERTIFICA</b> que la instalación eléctrica generadora fotovoltaica <b>{{ tipoInstalacion }}</b>, situada en
          <b>{{ direccion }}</b> en la localidad de <b>{{ localidad }}</b>, de la Provincia de <b>{{ provincia }}</b>,
          y cuyo uso al que se destina es <b>{{ uso }}</b>, cumple con todos y cada uno de los requisitos y disposiciones reglamentarias en lo que a instalaciones eléctricas en baja tensión se refiere el:
        </p>
        <ul>
          <li>R.D. 842/2002 Reglamento Electrotécnico para Baja Tensión.</li>
          <li>R.D. 1699/2011 Que regula la conexión a red de instalaciones de producción de energía eléctrica de pequeña potencia.</li>
        </ul>
        <p>
          Y para que así conste y sirva de justificante, expido el presente certificado en {{ ciudadFirma }}, a <b>{{ dia }}</b> de <b>{{ mes }}</b> de <b>{{ anio }}</b>.
        </p>
        <div class="logo-footer">
          <img src="/firma-solay.png" alt="Firma Solay" class="logo-solay-footer" />
        </div>
        <div class="firma">(firma y sello del Instalador Habilitado)</div>
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

defineProps({
  tipoInstalacion: {
    type: String,
    default: 'con almacenamiento'
  },
  direccion: {
    type: String,
    default: 'AVENIDA DE MÁLAGA, Nº50'
  },
  localidad: {
    type: String,
    default: 'MONTILLA'
  },
  provincia: {
    type: String,
    default: 'SEVILLA'
  },
  uso: {
    type: String,
    default: 'doméstico o negocio'
  },
  ciudadFirma: {
    type: String,
    default: 'Bollullos de la Mitación'
  },
  dia: {
    type: String,
    default: '01'
  },
  mes: {
    type: String,
    default: 'JULIO'
  },
  anio: {
    type: String,
    default: '2024'
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
}


ul {
  margin: 15px 0 15px 30px;
  font-size: 16px;
}

.logo-footer {
  display: flex;
  justify-content: center;
  margin: 80px 0 10px 0;
}

.logo-solay-footer {
  width: 200px;
  height: auto;
}

.firma {
  text-align: center;
  margin-top: 10px;
  font-size: 15px;
  font-style: italic;
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