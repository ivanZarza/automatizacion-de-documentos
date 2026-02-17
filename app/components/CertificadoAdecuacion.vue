
<template>
  <div class="certificado-adecuacion">
    <div class="logo-header">
      <img src="/logo-solay.png" alt="Logo Solay" class="logo-solay" />
    </div>
    <h2 class="titulo">CERTIFICADO DE ADECUACIÓN AL REAL DECRETO 1699/2011</h2>
    <p>
      SOLAY INGENIEROS, S.L. empresa instaladora habilitada en baja tensión con C.I.F. B-09.848.912,
      <b>CERTIFICA</b> que la instalación eléctrica generadora fotovoltaica <span class="resaltado">con almacenamiento</span>, situada en
      <span class="resaltado">AVENIDA DE MÁLAGA, Nº50</span> en la localidad de <span class="resaltado">MONTILLA</span>, de la Provincia de <span class="resaltado">SEVILLA</span>,
      y cuyo uso al que se destina es <span class="resaltado">doméstico o negocio</span>, cumple con todos y cada uno de los requisitos y disposiciones reglamentarias en lo que a instalaciones eléctricas en baja tensión se refiere el:
    </p>
    <ul>
      <li>R.D. 842/2002 Reglamento Electrotécnico para Baja Tensión.</li>
      <li>R.D. 1699/2011 Que regula la conexión a red de instalaciones de producción de energía eléctrica de pequeña potencia.</li>
    </ul>
    <p>
      Y para que así conste y sirva de justificante, expido el presente certificado en Bollullos de la Mitación, a <span class="resaltado">01 de JULIO de 2024</span>.
    </p>
    <div class="logo-footer">
      <img src="/firma-solay.png" alt="Firma Solay" class="logo-solay-footer" />
    </div>
    <div class="firma">(firma y sello del Instalador Habilitado)</div>
  </div>
</template>

<script setup>
// Variables, props y lógica se añadirán en los siguientes pasos
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
.logo-header {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 27px;
}

.logo-solay {
  width: 150px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

.titulo {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.certificado-adecuacion {
  line-height: 1.8;
  font-size: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.resaltado {
  color: #d32f2f;
  font-weight: bold;
}

ul {
  margin: 15px 0 15px 30px;
  font-size: 16px;
}

/* ========== FECHA ========== */
.certificado-adecuacion p {
  margin: 0 0 15px 0;
  text-align: justify;
}

.logo-footer {
  display: flex;
  justify-content: center;
  margin: 30px 0 10px 0;
}

.logo-solay-footer {
  width: 140px;
  height: auto;
}

.firma {
  text-align: center;
  margin-top: 10px;
  font-size: 15px;
  font-style: italic;
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

  .certificado-adecuacion {
    font-size: 16px !important;
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-after: avoid;
    background: white !important;
  }

  .logo-header, .logo-footer {
    page-break-inside: avoid;
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
  .certificado-adecuacion {
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