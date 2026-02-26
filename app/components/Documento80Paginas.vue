<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- PÁGINA 1 -->
    <div class="contenedor-principal">
      <!-- Encabezado -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</h1>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logos/solay-logo.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <div class="caja-destacada">
          <p class="texto-caja">
            Instalación Solar Fotovoltaica de 5.0 (kW) para Autoconsumo Individual con Excelentes Acogido a Compensación en Vivienda
          </p>
        </div>

        <h2 class="titulo-seccion">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</h2>

        <table class="tabla-datos">
          <tr>
            <td class="etiqueta-tabla">Promotor</td>
            <td class="valor-tabla"><span class="texto-rojo">Alejandra Kitzke Chacón</span></td>
          </tr>
          <tr>
            <td class="etiqueta-tabla">Dirección</td>
            <td class="valor-tabla"><span class="texto-rojo">Calle Dolores, N º 14 E.1 Pl.00 Pt.01</span></td>
          </tr>
          <tr>
            <td class="etiqueta-tabla">Autor Proyecto</td>
            <td class="valor-tabla">Eduardo Rivera Cabezas</td>
          </tr>
          <tr>
            <td class="etiqueta-tabla">Ref. Catastral</td>
            <td class="valor-tabla"><span class="texto-rojo">5631707QA565380001SG</span></td>
          </tr>
          <tr>
            <td class="etiqueta-tabla">Fecha</td>
            <td class="valor-tabla">16 de Octubre de 2025</td>
          </tr>
        </table>

        <div class="logos-footer">
          <img src="/logos/epyme.png" alt="Epyme" class="logo-pequeno" />
          <img src="/logos/aicfv.png" alt="AICFV" class="logo-pequeno" />
          <img src="/logos/junta-andalucia.png" alt="Junta Andalucía" class="logo-pequeno" />
          <img src="/logos/energia-100.png" alt="Energía 100% Verde" class="logo-pequeno" />
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props para variables (que añadirás después)
defineProps({
  promotor: { type: String, default: 'Alejandra Kitzke Chacón' },
  direccion: { type: String, default: 'Calle Dolores, N º 14 E.1 Pl.00 Pt.01' },
  autorProyecto: { type: String, default: 'Eduardo Rivera Cabezas' },
  refCatastral: { type: String, default: '5631707QA565380001SG' },
  fecha: { type: String, default: '16 de Octubre de 2025' }
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
  font-family: "Calibri", Arial, sans-serif;
  color: #333;
  font-size: 12px;
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
  padding: 0 0 15px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 15px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.subtitulo {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.logo {
  width: 80px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.caja-destacada {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}

.texto-caja {
  margin: 0;
  font-size: 11px;
  text-align: center;
  font-weight: 500;
}

.titulo-seccion {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 10px 0 5px 0;
  padding: 5px 0;
  border-bottom: 1px solid #333;
}

/* ========== TABLA DATOS ========== */
.tabla-datos {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 11px;
}

.tabla-datos tr {
  border: 1px solid #333;
}

.etiqueta-tabla {
  font-weight: bold;
  background-color: #f5f5f5;
  padding: 6px 8px;
  width: 25%;
  vertical-align: top;
}

.valor-tabla {
  padding: 6px 8px;
  text-align: left;
}

.texto-rojo {
  color: #c00;
  font-weight: bold;
}

/* ========== LOGOS FOOTER ========== */
.logos-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 30px 0 20px 0;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.logo-pequeno {
  height: 40px;
  width: auto;
  object-fit: contain;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 10px 0;
  border-top: 1px solid #333;
  margin-top: auto;
  text-align: center;
  font-size: 10px;
}

.texto-pie {
  margin: 0;
  color: #666;
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
    padding: 20mm !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  div[data-pdf-content] {
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-after: avoid;
    background: white !important;
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
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    background: white;
    padding: 10mm;
  }
}
</style>
