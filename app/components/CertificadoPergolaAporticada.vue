<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- PÁGINA 1 -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE PÉRGOLA</h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-intro">
          Por la presente, <span class="texto-fijo">Eduardo Rivera Cabezas</span>, con NIF <span class="texto-fijo">28.818.007-L</span>, Ingeniero Industrial colegiado número <span class="texto-fijo">4654</span> en el Colegio Oficial de Ingenieros Industriales de Andalucía Occidental, y con domicilio en <span class="texto-fijo">Calle El Peñón 5 - 41940</span>, localidad de <span class="texto-fijo">Tomares</span>, provincia de <span class="texto-fijo">Sevilla</span>
        </p>

        <h2 class="titulo-declara">CERTIFICO</h2>

        <p class="parrafo-certifico">
          que el estado de la <span class="texto-editable">{{ cubiertaTipo }}</span> de la vivienda sita en <span class="texto-editable">{{ direccion }}</span>, número <span class="texto-editable">{{ numero }}</span> <span class="texto-editable">{{ otrosDatosDireccion }}</span> – código postal <span class="texto-editable">{{ codigoPostal }}</span>, localidad de <span class="texto-editable">{{ localidad }}</span>, provincia de <span class="texto-editable">{{ provincia }}</span>, con Referencia Catastral <span class="texto-editable">{{ referenciaCatastral }}</span>, es el adecuado para soportar de forma sólida y segura el generador fotovoltaico para <span class="texto-azul">Autoconsumo</span> que se tiene previsto instalar, a la vista de la inspección ocular realizada <span class="texto-azul">in situ</span>, de la revisión del proyecto constructivo de la misma, y de la disposición sobre la estructura aporticada.
        </p>

        <p class="parrafo-datos">
          El generador fotovoltaico ha sido dimensionado mediante Memoria Técnica de Diseño según requiere la reglamentación, y está compuesto por <span class="texto-editable">{{ numModulos }}</span> módulos fotovoltaicos de <span class="texto-editable">{{ potencia }}</span> Wp de potencia eléctrica cada uno, del fabricante y modelo <span class="texto-editable">{{ marcaModelo }}</span>.
        </p>

        <p class="parrafo-estructura">
          La estructura de soporte para la pérgola es metálica galvanizada, diseñada y fabricada según procedimientos del fabricante y anclada al soporte mediante elementos de fijación adecuados.
        </p>

      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>

    <!-- PÁGINA 2: IMÁGENES / ESTRUCTURA -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE PÉRGOLA, <span class="texto-azul">APORTICADA</span></h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="contenedor-dos-imagenes">
          <div class="espacio-imagen-lado">
            <img v-if="foto1" :src="foto1" class="imagen-pdf-lado" />
            <span v-else>[Imagen 1: Vista pérgola]</span>
          </div>
          <div class="espacio-imagen-lado">
            <img v-if="foto2" :src="foto2" class="imagen-pdf-lado" />
            <span v-else>[Imagen 2: Detalle anclajes/perfilería]</span>
          </div>
        </div>

        <p class="parrafo-estructura">
          La estructura se ancla mediante tornillería y anclajes químicos/mecánicos según la naturaleza del soporte. Se respetarán las distancias y pares de apriete marcados por el fabricante.
        </p>

        <p class="parrafo-estructura">
          Orientación prevista: <span class="texto-editable">{{ orientacion }}</span>. Inclinación de los paneles: <span class="texto-editable">{{ inclinacion }}</span>.
        </p>

        <p class="parrafo-estructura">
          La mencionada Memoria Técnica de Diseño ha sido redactada por mí como técnico competente.
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 2</p>
      </div>
    </div>

    <!-- PÁGINA 3: FIRMA -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE PÉRGOLA, <span class="texto-azul">APORTICADA</span></h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-estructura">
          <strong>Eduardo Rivera Cabezas</strong><br />
          67030856<br />
          rivera@solay.es<br />
          Calle El Peñón 5 – 41940 – Tomares – Sevilla
        </p>

        <div class="contenedor-logo-centro">
          <img src="/firma-solay.png" alt="Firma Solay" class="firma-solay" />
        </div>

        <p class="parrafo-fecha">
          En <span class="texto-editable">{{ ciudadFirma }}</span>, a <span class="texto-editable">{{ fecha }}</span>.
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 3</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  foto1: String,
  foto2: String,
  direccion: String,
  numero: String,
  codigoPostal: String,
  localidad: String,
  provincia: String,
  referenciaCatastral: String,
  numModulos: String,
  potencia: String,
  peso: String,
  marcaModelo: String,
  orientacion: String,
  inclinacion: String,
  cubiertaTipo: String,
  ciudadFirma: String,
  fecha: String
})
</script>

<style scoped>
@import '../styles/variables.css';

/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  background-color: white;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #333;
  font-size: 17px;
  width: 210mm;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* ========== CONTENEDOR PRINCIPAL (Cada Página) ========== */
.contenedor-principal {
  width: 210mm;
  height: 297mm;
  margin: 0 auto 24px auto;
  padding: 20mm;
  background-color: white;
  display: flex;
  flex-direction: column;
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
  color: #000;
  text-align: center;
  line-height: 1.3;
}

.titulo-secundario {
  margin: 5px 0 0 0;
  font-size: 18px;
  color: #000;
  text-align: center;
  font-weight: bold;
  line-height: 1.3;
}

.texto-azul {
  color: #0066cc;
  font-weight: bold;
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

.parrafo-certifico,
.parrafo-datos,
.parrafo-estructura {
  margin: 20px 0 25px 0;
  text-align: justify;
}

.parrafo-imagen {
  margin: 12px 0 8px 0;
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

/* ========== IMÁGENES - PÁGINA 1 ========== */
.contenedor-dos-imagenes {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  justify-content: center;
}

.espacio-imagen-lado {
  width: 45%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: #f9f9f9;
}

.imagen-pdf-lado {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  border-top: 1px solid #ccc;
  padding-top: 12px;
  margin-top: 20px;
  text-align: center;
  font-size: 11px;
  color: #666;
}

.texto-pie {
  margin: 2px 0;
}

.texto-pie a {
  color: #0066cc;
  text-decoration: none;
}

.contenedor-logo-centro {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* ========== MEDIA QUERY PRINT ========== */
@media print {
  * { margin:0; padding:0; box-sizing:border-box }
  body { margin: 0; padding:0; width: 210mm }
  .contenedor-pdf { width: 210mm }
  .contenedor-principal { width:210mm; height:297mm; padding: 20mm }
  .logo { width: 120px }
}
</style>
