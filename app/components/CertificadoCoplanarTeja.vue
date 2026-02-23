<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- ===================== PÁGINA 1 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">
            CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA
          </h1>
          <h3 class="titulo-secundario">
            AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE TEJA,
            <span class="texto-azul">COPLANARIA</span>
          </h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-intro">
          Por la presente,
          <span class="texto-fijo">Eduardo Rivera Cabezas</span>, con NIF
          <span class="texto-fijo">28.818.007-L</span>, Ingeniero Industrial
          colegiado número <span class="texto-fijo">4654</span> en el Colegio
          Oficial de Ingenieros Industriales de
          <span class="texto-azul">Andalucía Occidental</span>, y con domicilio
          en <span class="texto-fijo">Calle El Peñón 5 - 41940</span>, localidad
          de <span class="texto-fijo">Tomares</span>, provincia de
          <span class="texto-fijo">Sevilla</span>
        </p>

        <h2 class="titulo-declara">CERTIFICO</h2>

        <p class="parrafo-certifico">
          que el estado de la cubierta de teja de la vivienda sita en
          <span class="texto-editable">{{ direccion }}</span
          >, número <span class="texto-editable">{{ numero }}</span>
          <span class="texto-editable">{{ otrosDatosDireccion }}</span> – código
          postal <span class="texto-editable">{{ codigoPostal }}</span
          >, localidad de <span class="texto-editable">{{ localidad }}</span
          >, provincia de {{ provincia }}, con Referencia Catastral
          <span class="texto-editable">{{ referenciaCatastral }}</span
          >, es el adecuado para soportar de forma sólida y segura el generador
          fotovoltaico para <span class="texto-azul">Autoconsumo</span> que se
          tiene previsto instalar, a la vista de la inspección ocular realizada
          <span class="texto-azul">in situ</span>, de la revisión del proyecto
          constructivo de la misma, y de la disposición sobre la cubierta de los
          módulos fotovoltaicos.
        </p>

        <p class="parrafo-datos">
          El generador fotovoltaico ha sido dimensionado mediante Memoria
          Técnica de Diseño según requiere la reglamentación, y está compuesto
          por <span class="texto-editable">{{ numModulos }}</span> módulos
          fotovoltaicos de <span class="texto-editable">{{ potencia }}</span> Wp
          de potencia eléctrica y
          <span class="texto-editable">{{ peso }}</span> de peso cada uno, del
          fabricante y modelo
          <span class="texto-editable">{{ marcaModelo }}</span> con Certificado
          de Garantía y Marcado CE de sus productos.
        </p>

        <p class="parrafo-estructura">
          La estructura de soporte de dichos módulos fotovoltaicos es de
          <span class="texto-azul">perfilería</span> de aluminio ligero del
          modelo KH915 VR de la empresa
          <span class="texto-azul">SUNFER ESTRUCTURAS, S.L.</span>,
          especializada en soportes para generadores fotovoltaicos con
          Certificado de Garantía y Marcado CE de sus productos.
        </p>

        <p class="parrafo-imagen">
          En la siguiente imagen podemos visualizar el sistema de
          <span class="texto-azul">perfilería</span> empleado:
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">
          Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110
          Sevilla.
        </p>
        <p class="texto-pie">Página 1</p>
      </div>
    </div>

    <!-- ===================== PÁGINA 2 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">
            CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA
          </h1>
          <h3 class="titulo-secundario">
            AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE TEJA,
            <span class="texto-azul">COPLANARIA</span>
          </h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <!-- Espacio para dos imágenes - Página 2 -->
        <div class="contenedor-dos-imagenes">
          <div class="espacio-imagen-lado">
            <img
              :src="'/fotos-certificados/teja-complanaria-1.png'"
              class="imagen-pdf-lado"
            />
          </div>
        </div>

        <p class="parrafo-estructura">
          Dicha <span class="texto-azul">ESTRUCTURA COPLANARIA</span> será
          fijada a la cubierta inclinada de teja mediante varias varillas
          roscadas (según procedimiento del fabricante), sólidamente fijadas a
          la <span class="texto-azul">perfilería</span> de aluminio mediante
          <span class="texto-azul">tornillería</span> de acero inoxidable.
        </p>
 
        <p class="parrafo-estructura">
          Dichas varillas son fijadas al tablero de
          <span class="texto-azul">rasillones</span> existente, mediante taco
          químico, después de perforar la
          <span class="texto-azul">limatesa</span> de la teja y el mortero de
          compresión que se encuentra debajo; todo ello según los procedimientos
          de instalación establecidos en la ficha técnica del producto,
          guardando las distancias previstas entre las perforaciones y
          respetando los pares de apriete de la
          <span class="texto-azul">tornillería</span>.
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">
          Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110
          Sevilla.
        </p>
        <p class="texto-pie">Página 2</p>
      </div>
    </div>

    <!-- ===================== PÁGINA 3 ===================== -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">
            CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA
          </h1>
          <h3 class="titulo-secundario">
            AUTOCONSUMO FOTOVOLTAICO<br />INSTALACIÓN SOBRE TEJA,
            <span class="texto-azul">COPLANARIA</span>
          </h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-estructura">
          La <span class="texto-azul">perfilería</span> de aluminio está unida
          solidariamente a los módulos fotovoltaicos mediante elementos de
          presión y fijación con tornillo a las distancias y pares de apriete
          marcados por el fabricante.
        </p>

        <p class="parrafo-estructura">
          El plano formado por los módulos fotovoltaicos tendrá una disposición
          <span class="texto-azul">COPLANAR A LA SUPERFICIE</span> de la
          cubierta de teja de la vivienda, de tal forma, que se evitan tanto
          fuerzas de tracción como de compresión sobre la propia cubierta. Dicho
          efecto se consigue al no producirse embolsamientos de aire en el
          espacio existente entre los módulos fotovoltaicos y la cubierta de
          teja, ya que el viento se encontrará con una misma superficie de
          entrada y de salida a dicho espacio.
        </p>

        <p class="parrafo-estructura">
          El estado de la cubierta de teja de la vivienda es el adecuado para
          soportar de forma sólida y segura el generador fotovoltaico para
          <span class="texto-azul">Autoconsumo</span> que se tiene previsto
          instalar, con ausencia de afección estructural, a la vista de la
          inspección ocular realizada <span class="texto-azul">in situ</span>,
          de la revisión del proyecto constructivo de la misma, y de la
          disposición sobre la cubierta de los módulos fotovoltaicos.
        </p>

        <p class="parrafo-estructura">
          La mencionada Memoria Técnica de Diseño ha sido redactada por mí como
          técnico competente.
        </p>

        <div class="contenedor-firmas">
          <div class="firma-bloque">
            <p class="nombre-firma">
              Eduardo Rivera Cabezas<br />670308856<br /><span
                class="texto-azul"
                >erivera@solay.es</span
              ><br />Calle El Peñón 5 – 41940 – Tomares – Sevilla
            </p>
          </div>
        </div>

        <div class="logo-footer">
          <img
            src="/firma-solay.png"
            alt="Logo Solay Footer"
            class="logo-footer-img"
          />
          
        </div>
              <p class="parrafo-fecha">
        En <span class="texto-editable">{{ ciudadFirma }}</span
        >, a <span class="texto-editable">{{ fecha }}</span
        >.
      </p>
      </div>



      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">
          Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110
          Sevilla.
        </p>
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
  provincia: String,
});
</script>

<style scoped>
@import "../styles/variables.css";

/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  background-color: white;
  font-family: "Segoe UI", Arial, sans-serif;
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
  margin: 0 auto 0px auto;
  padding: 10mm;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* ========== ENCABEZADO ========== */
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 17px;
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
  gap: 15px 0px;
}

/* ========== PÁRRAFOS ========== */
.parrafo-intro {
  margin: 0 0 10px 0;
  text-align: justify;
}

.parrafo-certifico,
.parrafo-datos,
.parrafo-estructura {
  margin: 5px 0;
  text-align: justify;
}

.parrafo-imagen {
  margin: 12px 0 8px 0;
}

.parrafo-fecha {
  text-align: center;
  font-weight: bold;
  margin: 15px 0;
  font-size: 15px;
}

/* ========== TÍTULOS ========== */
.titulo-declara {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #0066cc;
  margin: 10px 0;
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
.espacio-imagen-pagina1 {
  height: 150px;
  border: 2px solid #0066cc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  margin: 5px 0 20px 0;
  font-size: 12px;
  color: #666;
  overflow: hidden;
}

.imagen-pdf-pagina1 {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ========== IMÁGENES - PÁGINA 2 (UNA SOLA) ========== */
.contenedor-imagen-pagina2 {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #0066cc;
  background-color: #f5f5f5;
  margin: 10px 0;
  min-height: 200px;
  overflow: hidden;
}

.imagen-pdf-pagina2 {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ========== IMÁGENES - PÁGINA 2 (DOS EN COLUMNA) ========== */
.contenedor-dos-imagenes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  align-items: stretch;
}

.espacio-imagen-lado {
  flex: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  font-size: 11px;
  color: #666;
  overflow: hidden;
}

.imagen-pdf-lado {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ========== IMÁGENES - PÁGINA 2 (ANTIGUA) ========== */
.espacio-imagen-pagina2 {
  height: 180px;
  border: 2px solid #0066cc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  margin: 10mm 0 10px 0;
  font-size: 12px;
  color: #666;
  overflow: hidden;
}

.imagen-pdf-grande {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.firma-bloque {
  text-align: center;
  width: 220px;
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
  margin-top: 5px;
}

.logo-footer-img {
  width: 200px;
  height: auto;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 7px 0;
  border-top: 1px solid #0066cc;
  margin-top: 5px;
  text-align: center;
  font-size: 11px;
  color: #666;
}

.texto-pie {
  margin: 2px 0;
}

/* ========== MEDIA PRINT ========== */
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
    padding: 10mm 20mm !important;
    margin: 0 !important;
    box-shadow: none !important;
    page-break-after: always;
  }

  div[data-pdf-content] {
    font-size: 16px !important;
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    page-break-after: allways !important;
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
  .contenedor-pdf {
    font-size: 16px;
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px auto;
    background: white;
    min-height: 350mm;
    padding: 5mm;
  }
}
</style>
