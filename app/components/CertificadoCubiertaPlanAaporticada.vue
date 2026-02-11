<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- ===================== PÁGINA 1 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE CUBIERTA PLANA, <span class="texto-azul">APORTÍCADA</span></h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-intro">
          Por la presente, <span class="texto-fijo">Eduardo Rivera Cabezas</span>, con NIF <span class="texto-fijo">28.818.007-L</span>, Ingeniero Industrial colegiado número <span class="texto-fijo">4654</span> en el Colegio Oficial de Ingenieros Industriales de <span class="texto-azul">Andalucía Occidental</span>, y con domicilio en <span class="texto-fijo">Calle El Peñón 5 - 41940</span>, localidad de <span class="texto-fijo">Tomares</span>, provincia de <span class="texto-fijo">Sevilla</span>
        </p>

        <h2 class="titulo-declara">CERTIFICO</h2>

        <p class="parrafo-certifico">
          que el estado de la cubierta de la vivienda sita en <span class="texto-editable">{{ direccion }}</span>, número <span class="texto-editable">{{ numero }}</span> <span class="texto-editable">{{ otrosDatosDireccion }}</span> – código postal <span class="texto-editable">{{ codigoPostal }}</span>, localidad de <span class="texto-editable">{{ localidad }}</span>, provincia de {{ provincia }}, con Referencia Catastral <span class="texto-editable">{{ referenciaCatastral }}</span>, es el adecuado para soportar de forma sólida y segura el generador fotovoltaico para <span class="texto-azul">Autoconsumo</span> que se tiene previsto instalar, a la vista de la inspección ocular realizada <span class="texto-azul">in situ</span>, de la revisión del proyecto constructivo de la misma, y de la disposición sobre la cubierta de los módulos fotovoltaicos.
        </p>

        <p class="parrafo-datos">
          El generador fotovoltaico ha sido dimensionado mediante Memoria Técnica de Diseño según requiere la reglamentación, y está compuesto por <span class="texto-editable">{{ numModulos }}</span> módulos fotovoltaicos de <span class="texto-editable">{{ potencia }}</span> Wp de potencia eléctrica y <span class="texto-editable">{{ peso }}</span> de peso cada uno, del fabricante y modelo <span class="texto-editable">{{ marcaModelo }}</span>.
        </p>

        <p class="parrafo-estructura">
          La estructura de soporte de dichos módulos fotovoltaicos será del tipo <span class="texto-azul">APORTÍCADA</span> PARA CUBIERTA PLANA mediante <span class="texto-editable">perfilería</span> de aluminio ligero del modelo 11V de la empresa <span class="texto-azul">SUNFER ESTRUCTURAS, S.L.</span>, especializada en soportes para generadores fotovoltaicos con Certificado de Garantía y Marcado CE de sus productos (se adjuntan en la Memoria Técnica de Diseño, así como la Ficha Técnica y Plano de Montaje).
        </p>

        <p class="parrafo-imagen">
          En la siguiente imagen podemos visualizar el sistema de <span class="texto-azul">perfilería</span> empleado:
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>

    <!-- ===================== PÁGINA 2 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE CUBIERTA PLANA, <span class="texto-azul">APORTÍCADA</span></h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <!-- Espacio para imagen única - Página 2 -->
        <div class="contenedor-imagen-pagina2">
          <img v-if="foto1" :src="foto1" class="imagen-pdf-pagina2" />
          <span v-else>[Imagen: Sistema de estructura aportícada para cubierta plana]</span>
        </div>

        <p class="parrafo-estructura">
          Dicha <span class="texto-azul">ESTRUCTURA APORTÍCADA</span> será fijada a la cubierta mediante varias varillas roscadas (según procedimiento del fabricante), sólidamente fijadas a la <span class="texto-azul">perfilería</span> de aluminio mediante <span class="texto-azul">tornillería</span> de acero inoxidable.
        </p>

        <p class="parrafo-estructura">
          Dicha estructura metálica en acero galvanizado será fijada sobre unos lastres de 22 kg de peso cada uno, mediante varillas roscadas (según procedimiento del fabricante), sólidamente fijadas a la <span class="texto-azul">perfilería</span> de aluminio mediante <span class="texto-azul">tornillería</span> de acero inoxidable; todo ello según los procedimientos de instalación establecidos en la ficha técnica del producto, guardando las distancias previstas entre las perforaciones y respetando los pares de apriete de la <span class="texto-azul">tornillería</span>.
        </p>

        <p class="parrafo-estructura">
          El plano formado por los módulos fotovoltaicos tendrá una disposición de <span class="texto-editable">20º</span> con respecto a la superficie de la cubierta plana, pero la azotea está rodeada por pretil de 1,20 m de altura, por lo que prácticamente se evitan tanto fuerzas de compresión sobre la propia cubierta.
        </p>

        <p class="parrafo-estructura">
          La <span class="texto-azul">perfilería</span> de aluminio está unida solidariamente a los módulos fotovoltaicos mediante elementos de presión y fijación con tornillo a las distancias y pares de apriete marcados por el fabricante.
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p class="texto-pie">Página 2</p>
      </div>
    </div>

    <!-- ===================== PÁGINA 3 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA</h1>
          <h3 class="titulo-secundario">AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE CUBIERTA PLANA, <span class="texto-azul">APORTÍCADA</span></h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-estructura">
          El estado de la cubierta de la vivienda es el adecuado para soportar de forma sólida y segura el generador fotovoltaico para <span class="texto-azul">Autoconsumo</span> que se tiene previsto instalar, con ausencia de afección estructural, a la vista de la inspección ocular realizada <span class="texto-azul">in situ</span>, de la revisión del proyecto constructivo de la misma, y de la disposición sobre la cubierta de los módulos fotovoltaicos.
        </p>

        <p class="parrafo-estructura">
          La mencionada Memoria Técnica de Diseño ha sido redactada por mí como técnico competente.
        </p>

        <div class="contenedor-firmas">
          <div class="firma-bloque">
            <p class="nombre-firma">Eduardo Rivera Cabezas<br />670308856<br /><span class="texto-azul">erivera@solay.es</span><br />Calle El Peñón 5 – 41940 – Tomares – Sevilla</p>
          </div>
        </div>

        <p class="parrafo-fecha">
          En <span class="texto-editable">{{ ciudadFirma }}</span>, a <span class="texto-editable">{{ fecha }}</span>.
        </p>

        <div class="logo-footer">
          <img src="/logo-solay.png" alt="Logo Solay Footer" class="logo-footer-img" />
        </div>
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
  direccion: String,
  numero: String,
  otrosDatosDireccion: String,
  codigoPostal: String,
  localidad: String,
  referenciaCatastral: String,
  numModulos: String,
  potencia: String,
  peso: String,
  marcaModelo: String,
  modelo: String,
  ciudadFirma: String,
  fecha: String,
  foto1: String,
  foto2: String,
  provincia: String
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

/* ========== CONTENEDOR PRINCIPAL (Cada Página) ========== */
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

/* ========== IMAGEN - PÁGINA 2 (UNA SOLA) ========== */
.contenedor-imagen-pagina2 {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0066cc;
  background-color: #f5f5f5;
  margin: 20px 0;
  min-height: 300px;
  overflow: hidden;
}

.imagen-pdf-pagina2 {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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

.nombre-firma {
  font-size: 14px;
  color: #000;
  margin: 0;
  line-height: 1.5;
}

/* ========== LOGO FOOTER ========== */
.logo-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
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
