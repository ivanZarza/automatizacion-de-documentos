<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- PÁGINA 1: CERTIFICO -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h3 class="titulo-secundario">
            CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA<br />AUTOCONSUMO
            FOTOVOLTAICO<br />CHAPA GRECADA -
            <span class="texto-azul">APORTICADA</span>
          </h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-tecnico">
          Por la presente, Eduardo Rivera Cabezas, con NIF 28.818.007-I,
          Ingeniero Industrial colegiado número 4654 en el Colegio Oficial de
          Ingenieros Industriales de Andalucía Occidental, y con domicilio en
          Calle El Peñón 5 -41940, localidad de Tomares, provincia de Sevilla
        </p>

        <h2 class="titulo-certificado">CERTIFICO</h2>

        <p class="parrafo-tecnico">
          que el estado de la cubierta sita en
          <span class="texto-rojo"
            >{{ direccion }}, número {{ numero }} ({{ localidad }}) – código
            postal {{ codigoPostal }}, localidad de {{ localidad }}, provincia
            de {{ provincia }}, referencia Catastral
            {{ referenciaCatastral }}</span
          >, es el adecuado para soportar de forma sólida y segura el generador
          fotovoltaico para Autoconsumo que se tiene previsto instalar, a la
          vista de la inspección ocular realizada in situ, de la revisión del
          proyecto constructivo de la misma, y de la disposición sobre la
          cubierta de los módulos fotovoltaicos.
        </p>

        <p class="parrafo-tecnico">
          El generador fotovoltaico ha sido dimensionado mediante Memoria
          Técnica de Diseño según requiera la reglamentación, y está compuesto
          por
          <span class="texto-rojo"
            >{{ numModulos }} módulos fotovoltaicos de {{ potencia }} Wp de
            potencia eléctrica y 28.00 kg de peso cada uno</span
          >, del <span class="texto-rojo">fabricante {{ marcaModelo }}</span
          >.
        </p>

        <p class="parrafo-tecnico">
          La estructura de soporte de dichos módulos fotovoltaicos es de
          <span class="texto-rojo"
            >perfilería de aluminio ligero del modelo TIV de la empresa SUNFER
            ESTRUCTURAS, S.L.</span
          >, especializada en soportes para generadores fotovoltaicos con
          Certificado de Garantía y Marcado CE de sus productos (se ajustan en
          la Memoria Técnica de Diseño, así como la Ficha Técnica y Plano de
          Montaje).
        </p>
      </div>
      <div class="contenido-principal">
        <!-- Espacio para imagen -->
        <div class="contenedor-imagen-grande">
          <img  :src="'/fotos-certificados/grecada-coplanaria.png'" class="imagen-pdf-grande" />
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

      <!-- PÁGINA 2: ESTRUCTURA SOPORTE PARA CHAPA GRECADA APORTICADA -->
      <div class="contenedor-principal">
        <div class="encabezado">
          <div class="encabezado-contenido">
            <h3 class="titulo-secundario">
              CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA<br />AUTOCONSUMO
              FOTOVOLTAICO<br />CHAPA GRECADA -
              <span class="texto-azul">APORTICADA</span>
            </h3>
          </div>
          <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
        </div>

        <p class="parrafo-estructura">
          Dicha
          <span class="texto-azul"
            >ESTRUCTURA SOPORTE PARA CHAPA GRECADA APORTICADA</span
          >
          según procedimiento del fabricante, sólidamente fijadas a la
          <span class="texto-azul">perfilería</span> de aluminio mediante
          <span class="texto-azul">tornillería</span> de acero inoxidable; todo
          ello según los procedimientos de instalación establecidos en la ficha
          técnica del producto, guardando las distancias previstas entre las
          perforaciones y respetando los pares de apriete de la
          <span class="texto-azul">tornillería</span>.
        </p>

        <p class="parrafo-estructura">
          La <span class="texto-azul">perfilería</span> de aluminio será unida
          sólidamente a los módulos fotovoltaicos mediante elementos de presión
          y fijación con <span class="texto-azul">tornillo</span> a las
          distancias y pares de apriete marcados por el fabricante.
        </p>

        <p class="parrafo-estructura">
          El estado de la cubierta es el adecuado para soportar de forma sólida
          y segura el generador fotovoltaico para
          <span class="texto-azul">Autoconsumo</span> que se tiene previsto
          instalar, conforme a lo previsto en el presente certificado, con
          acuerdo a vista de la inspección ocular realizada
          <span class="texto-azul">in situ</span>, de la revisión del proyecto
          constructivo de la misma, y de la disposición sobre la cubierta de los
          módulos fotovoltaicos. La mencionada
          <span class="texto-azul">Memoria Técnica de Diseño</span> ha sido
          redactada por mí como técnico competente.
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

    <!-- PÁGINA 3: FIRMA Y DATOS -->
    <div class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h3 class="titulo-secundario">
            CERTIFICADO DE SOLIDEZ Y SEGURIDAD DE LA CUBIERTA<br />AUTOCONSUMO
            FOTOVOLTAICO<br />CHAPA GRECADA -
            <span class="texto-azul">APORTICADA</span>
          </h3>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="contenedor-logo-centro">
          <img src="/firma-solay.png" alt="Firma Solay" class="firma-solay" />
        </div>

        <p class="parrafo-fecha">
          En <span class="texto-rojo">{{ ciudadFirma }}, a {{ fecha }}</span
          >.
        </p>
      </div>

      <div class="pie-pagina">
        <p class="texto-pie">www.solay.es</p>
        <p class="texto-pie">
          Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110
          Sevilla.
        </p>
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
  localidad: String,
  codigoPostal: String,
  provincia: String,
  referenciaCatastral: String,
  numModulos: String,
  potencia: String,
  peso: String,
  marcaModelo: String,
  ciudadFirma: String,
  fecha: String,
});
</script>

<style scoped>
/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  width: 100%;
  max-width: 210mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Segoe UI", Arial, sans-serif;
  color: #333;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-principal {
  width: 100%;
  max-width: 210mm;
  display: flex;
  flex-direction: column;
  padding: 20mm;
  margin: 0 auto;
  page-break-after: always;
}

/* ========== ENCABEZADO ========== */
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 50px;
  width: 100%;
  gap: 30px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-secundario {
  margin: 0;
  font-size: 19px;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
}

.logo {
  width: 150px;
  height: auto;
  margin-left: 20px;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  font-size: 15px;
  gap: 15px;
  width: 100%;
  overflow-wrap: break-word;
}

/* ========== PÁRRAFOS ========== */
.parrafo-tecnico {
  margin: 20px 0 20px 0;
  text-align: center;
  font-size: 15px;
  line-height: 1.5;
}

.parrafo-estructura {
  margin: 10px 0;
  text-align: justify;
  font-size: 15px;
  line-height: 1.5;
}

.parrafo-fecha {
  text-align: center;
  font-size: 14px;
  margin: 60px 0;
  font-weight: bold;
}

/* ========== TEXTOS ESPECIALES ========== */
.texto-azul {
  color: #0066cc;
  font-weight: bold;
}


/* ========== LOGO CENTRO ========== */
.contenedor-logo-centro {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
}

.firma-solay {
  width: 150px;
  height: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

/* ========== TÍTULO CERTIFICO ========== */
.titulo-certificado {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
  text-transform: uppercase;
}

/* ========== CONTENEDOR IMAGEN GRANDE ========== */
.contenedor-imagen-grande {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  min-height: 300px;
}

.imagen-pdf-grande {
  width: 80%;
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

/* ========== MEDIA QUERY PRINT ========== */
@media print {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    width: 210mm;
  }

  .contenedor-pdf {
    width: 210mm;
    margin: 0;
    padding: 0;
    page-break-after: avoid;
  }

  .contenedor-principal {
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    margin: 0;
    page-break-after: always;
    box-sizing: border-box;
    overflow: hidden;
  }

  .encabezado {
    width: 100%;
    margin: 0;
    padding: 0 0 18px 0;
  }

  .encabezado-contenido {
    flex: 1;
  }

  .logo {
    width: 120px;
    height: auto;
  }

  .contenido-principal {
    width: 100%;
    gap: 10px;
  }

  .parrafo-tecnico,
  .parrafo-estructura {
    margin: 5px 0;
    font-size: 14px;
  }

  .pie-pagina {
    margin-top: 10px;
    font-size: 10px;
  }
}
</style>
