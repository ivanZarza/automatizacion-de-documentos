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
          Por la presente, <span class="texto-fijo">Eduardo Rivera Cabezas</span>, con NIF <span
            class="texto-fijo">28.818.007-L</span>, Ingeniero Industrial colegiado número <span
            class="texto-fijo">4654</span> en el Colegio Oficial de Ingenieros Industriales de Andalucía Occidental, y
          con domicilio en <span class="texto-fijo">Calle El Peñón 5 - 41940</span>, localidad de <span
            class="texto-fijo">Tomares</span>, provincia de <span class="texto-fijo">Sevilla</span>
        </p>

        <h2 class="titulo-declara">CERTIFICO</h2>

        <p class="parrafo-certifico">
          que el estado de la <span class="texto-editable">{{ cubiertaTipo }}</span> de la vivienda sita en <span
            class="texto-editable">{{ direccion }}</span>, <span class="texto-editable">{{ otrosDatosDireccion }}</span>
          – código postal <span class="texto-editable">{{
            codigoPostal }}</span>, localidad de <span class="texto-editable">{{ localidad }}</span>, provincia de <span
            class="texto-editable">{{ provincia }}</span>, con Referencia Catastral <span class="texto-editable">{{
              referenciaCatastral }}</span>, es el adecuado para soportar de forma sólida y segura el generador
          fotovoltaico para <span class="texto-azul">Autoconsumo</span> que se tiene previsto instalar, a la vista de la
          inspección ocular realizada <span class="texto-azul">in situ</span>, de la revisión del proyecto constructivo
          de la misma, y de la disposición sobre la cubierta de los módulos fotovoltaicos.
        </p>

        <p class="parrafo-datos">
          El generador fotovoltaico ha sido dimensionado mediante Memoria Técnica de Diseño según requiere la
          reglamentación, y está compuesto por <span class="texto-editable">{{ numModulos }}</span> módulos
          fotovoltaicos de <span class="texto-editable">{{ potencia }}</span> Wp de potencia eléctrica y <span
            class="texto-editable">{{ peso }}</span> kg de peso cada uno, del fabricante y modelo <span
            class="texto-editable">{{ marcaModelo }}</span>.
        </p>

        <h3 class="titulo-seccion">Estructura Primaria</h3>

        <p class="parrafo-estructura">
          Los paneles fotovoltaicos se situarán sobre una estructura primaria consistente en EN UNA PÉRGOLA DE ACERO
          GALVANIZADO. Esta estructura tendrá una altura máxima de 1,8 m, una orientación de <span
            class="texto-editable">{{ orientacion }}</span> y una inclinación de <span class="texto-editable">{{
              inclinacion }}</span>, posicionándose los paneles formando un plano inclinado.
        </p>

        <p class="parrafo-estructura">
          La estructura primaria o pérgola de acero galvanizado, servirá de base para la estructura secundaria,
          consistente en una perfilería de aluminio ligero de la empresa SUNFER ESTRUCTURAS, S.L., especializada en
          soportes para generadores fotovoltaicos con Certificado de Garantía y Marcado CE de sus productos (se
          adjuntan en la Memoria Técnica de Diseño, así como la Ficha Técnica y Plano de Montaje).
        </p>

        <h3 class="titulo-seccion">Estructura Secundaria</h3>

        <p class="parrafo-estructura">
          La perfilería secundaria de aluminio estará finalmente unida solidariamente a los módulos fotovoltaicos
          mediante elementos de presión y fijación con tornillo a las distancias y pares de apriete marcados por el
          fabricante.
        </p>

      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>

    <!-- PÁGINA 2: FIJACIÓN Y LASTRES -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE PÉRGOLA</h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <h3 class="titulo-seccion">Fijación y lastres</h3>

        <p class="parrafo-estructura">
          Para la sujeción de la pérgola, ésta será fijada sobre unos lastres de 22 kg de peso cada uno, mediante
          varillas roscadas (según procedimiento del fabricante), sólidamente fijadas a la perfilería secundaria de
          aluminio mediante tornillería de acero inoxidable; todo ello según los procedimientos de instalación
          establecidos en la ficha técnica del producto, guardando las distancias previstas entre las perforaciones y
          respetando los pares de apriete de la tornillería.
        </p>

        <p class="parrafo-estructura">
          Mediante estos lastres se garantiza que la instalación está protegida contra desprendimientos debido tanto
          a las fuerzas de tracción como de compresión sobre la propia cubierta.
        </p>

        <p class="parrafo-estructura">
          Se ha comprobado que la actuación a realizar no desvirtúa el carácter arquitectónico de la edificación,
          garantizando su adecuada integración en la estética del edificio tanto de los paneles y la estructura
          metálica como de cualquier tubería o canalización perteneciente a dicha instalación, evitando expresamente
          el trazado visible por las fachadas.
        </p>

        <p class="parrafo-estructura">
          Los paneles fotovoltaicos cumplen la normativa UNE-EN 61215 para módulos de silicio monocristalino, además
          al ir conectada a la red cuenta con los subsistemas de control y regulación, desconexión e inversión,
          seguridad e inyección a la red eléctrica destinataria de la electricidad generada. En cualquier caso,
          certifico que la actuación cumplirá las Ordenanzas reguladoras de las instalaciones de captación solar en
          <span class="texto-editable">{{ localidad }}</span>.
        </p>

        <p class="parrafo-estructura">
          El estado de la <span class="texto-editable">{{ cubiertaTipo }}</span> de la edificación es el adecuado
          para soportar de forma sólida y segura el generador fotovoltaico para <span
            class="texto-azul">Autoconsumo</span> que se tiene previsto instalar, con ausencia de afección
          estructural, a la vista de la inspección ocular realizada <span class="texto-azul">in situ</span>, de la
          revisión del proyecto constructivo de la misma, y de la disposición sobre la cubierta de los módulos
          fotovoltaicos.
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

    <!-- PÁGINA 3: FIRMA Y DATOS -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE PÉRGOLA</h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <!-- Fecha -->
        <p class="parrafo-fecha">
          En <strong>{{ localidad }}</strong>, a <strong>{{ dia }} de {{ mes }} de {{ anio }}</strong>.
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
  dia: String,
  mes: String,
  anio: String
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
  color: #000000;
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
  gap: 5px 0px;
}

/* ========== PÁRRAFOS ========== */
.parrafo-intro {
  margin: 0 0 8px 0;
  text-align: justify;
}

.parrafo-certifico,
.parrafo-datos,
.parrafo-estructura {
  margin: 4px 0;
  text-align: justify;
}

.parrafo-imagen {
  margin: 12px 0 8px 0;
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
  margin: 8px 0;
  padding: 10px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.titulo-seccion {
  font-size: 16px;
  font-weight: bold;
  color: #0066cc;
  margin: 5px 0 2px 0;
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

/* ========== MEDIA QUERY PRINT ========== */
@media print {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body {
    margin: 0;
    padding: 0;
    width: 210mm
  }

  .contenedor-pdf {
    width: 210mm
  }

  .contenedor-principal {
    width: 210mm;
    height: 297mm;
    padding: 20mm
  }

  .logo {
    width: 120px
  }
}
</style>
