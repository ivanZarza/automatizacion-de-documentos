<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- PÁGINA 1 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img src="/logos/iconos-organizaciones.png" alt="Gobierno de España" class="logo" onerror="this.style.display = 'none'" />
          <img src="/logos/icono-junta-andalucia.png" alt="Junta de Andalucía" class="logo" />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Título principal -->
        <h1 class="titulo-principal">MEMORIA JUSTIFICATIVA DE LA ACTUACIÓN PARA LA MEJORA DE LA EFICIENCIA ENERGÉTICA EN</h1>
        <h2 class="titulo-secundario">EDIFICIO DE <span class="texto-verde">{{ tipoEdificio }}</span> VIVIENDAS EN LA COMUNIDAD AUTÓNOMA DE <span class="texto-verde">ANDALUCÍA</span></h2>
        <p class="subtitulo-linea-3">(LÍNEA 3)</p>

        <!-- Datos Iniciales -->
        <div class="datos-iniciales">
          <p><span class="etiqueta">EXPEDIENTE:</span> <span class="texto-rojo">{{ expediente }}</span></p>
          <p><span class="etiqueta">NIF:</span> <span class="texto-rojo">{{ nif }}</span></p>
          <p><span class="etiqueta">AGENTE GESTOR:</span> <span class="texto-rojo">SOLAY INGENIEROS S.L.</span></p>
          <p><span class="etiqueta">NIF AGENTE GESTOR:</span> <span class="texto-rojo">B09848912</span></p>
        </div>

        <!-- Domicilio -->
        <div class="domicilio-seccion">
          <p><span class="etiqueta">DOMICILIO Y LOCALIDAD DE LA ACTUACIÓN:</span> <span class="texto-rojo">{{ domicilio }}</span></p>
          <p><span class="etiqueta">ZAHARILLA:</span> <span class="texto-rojo">{{ zaharilla }}</span></p>
          <p><span class="etiqueta">TÉCNICO REDACTOR, TITULACIÓN Y Nº DE COLEGIADO:</span> <span class="texto-rojo">{{ tecnicoRedactor }}</span></p>
        </div>

        <!-- Sección 1: Introducción -->
        <div class="seccion">
          <h3 class="numero-seccion">1.</h3>
          <h3 class="titulo-seccion">Introducción.</h3>

          <p class="texto-parrafo">
            La presente memoria tiene por objeto justificar del cumplimiento de las condiciones impuestas en la concesión de la subvención, conforme a lo exigido en las bases reguladoras y la resolución de concesión de la subvención, otorgada por la Consejería de Fomento de la Junta de Andalucía para la mejora de la eficiencia energética en edificios en Andalucía (Línea 3), de acuerdo con lo establecido en el apartado 23.b) g) del cuadro resumen de bases reguladoras aprobado por Orden de 9 de junio de 2022 de la Consejería de Fomento, Articulación del Territorio y Vivienda.
          </p>

          <p class="texto-parrafo" style="color: green;">
            Estas ayudas tienen por objeto la financiación de actuaciones u obras de mejora de la eficiencia energética en edificios, en concreto en una vivienda unifamiliar o no plurifamiliares u obras de mejora de la eficiencia energética en las viviendas, ya sean unifamiliares o pertenecientes a <span class="texto-verde">edificios plurifamiliares</span>, mediante la ejecución de una instalación fotovoltaica para <span class="texto-verde">autoconsumo</span> y montaje y conexionados eléctrico y de tuberías de ACS de una bomba de calor <span class="texto-morado">aerotérmica</span> de <span class="texto-rojo">1,8 kW</span> de potencia térmica nominar (Calor) con depósito incorporado de 200 litros para la producción de ACS, al tener menos de 5 Kw no es obligatorio registrarla en Industria.
          </p>

          <!-- BLOQUE MORADO 1 -->
          <div v-if="aerotermia" class="bloque-morado">
            <p class="texto-parrafo" style="color: purple;">
              y montaje y conexionados eléctrico y de tuberías de ACS de una bomba de calor aerotérmica de <span class="texto-rojo">{{ potenciaTermica }}</span> kW de potencia térmica nominar (Calor) con depósito incorporado de 200 litros para la producción de ACS, al tener menos de 5 Kw no es obligatorio registrarla en Industria.
            </p>

            <p style="color: purple; font-weight: bold; margin: 10px 0 5px 0;">Las características técnicas del equipo aerotérmico son las siguientes:</p>
            <ul style="color: purple; margin: 0 0 10px 20px;">
              <li>Potencia térmica de la bomba de calor: <span class="texto-rojo">{{ potenciaTermica }}</span> kW</li>
              <li>Resistencia eléctrica auxiliar: <span class="texto-rojo">{{ resistenciaElectrica }}</span> kW</li>
              <li>Potencia total instalada: ≈ <span class="texto-rojo">{{ potenciaTotal }}</span> kW</li>
            </ul>
          </div>
        </div>

        <!-- Sección 2: Fecha de conclusión -->
        <div class="seccion">
          <h3 class="numero-seccion">2.</h3>
          <h3 class="titulo-seccion">Fecha de conclusión de las actuaciones.</h3>

          <p class="texto-parrafo">
            Las actuaciones objeto de la subvención se concluyeron completamente y conforme a lo indicado en la presente memoria el día <span class="texto-rojo">{{ fechaConclusionDia }}/{{ fechaConclusionMes }}/{{ fechaConclusionAnio }}</span>.
          </p>
        </div>

        <!-- Sección 3: Descripción de actividades -->
        <div class="seccion">
          <h3 class="numero-seccion">3.</h3>
          <h3 class="titulo-seccion">Descripción de las actividades realizadas y resultados obtenidos.</h3>

          <p class="texto-parrafo">
            Las actividades realizadas para la ejecución de la instalación fotovoltaica, han consistido en las siguientes:
          </p>

          <ul class="lista-actividades">
            <li>Preparación del soporte de la cubierta <span class="texto-verde">{{ tipoSoporte }}</span>.</li>
            <li>Anclaje de la estructura que soportará los paneles fotovoltaicos.</li>
            <li>Instalación de los paneles fotovoltaicos, del inversor y de los elementos eléctricos complementarios.</li>
            <li>Conexionado a la red eléctrica general de la vivienda conforme al <span class="texto-rojo">REBT</span>.</li>
            <li>Puesta a punto y legalización de la instalación.</li>
          </ul>

          <!-- BLOQUE MORADO 2 -->
          <div v-if="aerotermia" class="bloque-morado">
            <p class="texto-parrafo" style="color: purple;">
              Las actividades realizadas para la ejecución de la bomba aerotérmica, han consistido en las siguientes:
            </p>
            <ul class="lista-actividades" style="color: purple;">
              <li>Dimensionamiento de la demanda y selección de equipos.</li>
              <li>Instalación de unidad exterior y depósito de ACS.</li>
              <li>Conexiones hidráulicas, frigoríficas y eléctricas.</li>
              <li>Pruebas, puesta en marcha y entrega al usuario.</li>
            </ul>
          </div>

          <p class="texto-parrafo">
            Los resultados obtenidos son los indicados en la memoria de actuación.
          </p>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <img src="/logos/iconos-organizaciones.png" alt="Gobierno" class="logo-pie" onerror="this.style.display = 'none'" />
        <img src="/logos/icono-junta-andalucia.png" alt="Junta" class="logo-pie" />
      </div>
    </div>

    <!-- PÁGINA 2 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img src="/logos/iconos-organizaciones.png" alt="Gobierno de España" class="logo" onerror="this.style.display = 'none'" />
          <img src="/logos/icono-junta-andalucia.png" alt="Junta de Andalucía" class="logo" />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Sección 4: Coste final -->
        <div class="seccion">
          <h3 class="numero-seccion">4.</h3>
          <h3 class="titulo-seccion">Coste final de las actuaciones.</h3>

          <p class="texto-parrafo">
            El coste final de las actuaciones:
          </p>

          <p style="color: red; font-weight: bold;">
            Coincide con el coste previsto en la documentación presentada con el Anexo II.
          </p>

          <p class="texto-parrafo">
            El desglose de los costes ha sido el siguiente:
          </p>

          <table class="tabla-costes">
            <tr>
              <th>CONCEPTO</th>
              <th>IMPORTE</th>
            </tr>
            <tr>
              <td>CERTIFICACIÓN DE LA ACTUACIÓN</td>
              <td class="texto-rojo">{{ importeCertificacion }}</td>
            </tr>
            <tr>
              <td>OTROS COSTES</td>
              <td class="texto-rojo">{{ importeOtrosCostes }}</td>
            </tr>
            <tr style="font-weight: bold; border-top: 2px solid black;">
              <td>TOTAL</td>
              <td class="texto-rojo">{{ importeTotal }}</td>
            </tr>
          </table>
        </div>

        <!-- Sección 5: Acreditación -->
        <div class="seccion">
          <h3 class="numero-seccion">5.</h3>
          <h3 class="titulo-seccion">Acreditación del cumplimiento de las condiciones impuestas e importe de la subvención.</h3>

          <p class="texto-parrafo">
            El técnico firmante de la presente memoria acredita que con las actuaciones se ha conseguido una <span class="texto-rojo">mejora de eficiencia térmica del 30%</span>, siendo en este caso, tal como se deduce de los resultados obtenidos se certificados de eficiencia energética.
          </p>

          <table class="tabla-acreditacion">
            <tr>
              <th>DESCRIPCIÓN</th>
              <th>VALOR</th>
            </tr>
            <tr>
              <td>PORCENTAJE DE MEJORA ENERGÉTICA ACREDITADO</td>
              <td class="valor-tabla">64,22%</td>
            </tr>
            <tr>
              <td>% PORCENTAJE SUBVENCIÓN</td>
              <td class="valor-tabla">80,00%</td>
            </tr>
          </table>
        </div>

        <!-- Sección 6: Justificación normativa -->
        <div class="seccion">
          <h3 class="numero-seccion">6.</h3>
          <h3 class="titulo-seccion">Justificación del cumplimiento de la normativa de obligado cumplimiento.</h3>

          <div class="subseccion">
            <h4 class="numero-subseccion">6.1.</h4>
            <h4 class="titulo-subseccion">Justificación del <span class="texto-rojo">REBT</span>.</h4>

            <p class="texto-parrafo">
              Puesto que la acción ha consistido en una instalación de generación eléctrica (fotovoltaica), se deberá justificar el Reglamento <span class="texto-rojo">Electrotécnico de Baja Tensión</span>, en concreto a <span class="texto-rojo">ITC-BT-40</span>.
            </p>

            <p class="texto-parrafo">
              Para ello, se anexa el certificado de dirección de obra de la instalación fotovoltaica objeto de la actuación.
            </p>
          </div>

          <!-- SECCIÓN 6.2 -->
          <div class="subseccion">
            <h4 class="numero-subseccion">6.2.</h4>
            <h4 class="titulo-subseccion">Certificación de seguridad y solidez estructural.</h4>

            <p class="texto-parrafo">
              El técnico firmante de la presente memoria, CERTIFICA que la estructura soporte de los elementos de la instalación, especialmente la de los paneles fotovoltaicos, cumple los requisitos normativos respecto a la seguridad y solidez estructural.
            </p>
          </div>

          <!-- SECCIÓN 6.3 CONDICIONAL -->
          <div v-if="aerotermia" class="subseccion">
            <h4 class="numero-subseccion">6.3.</h4>
            <h4 class="titulo-subseccion">DB HE 2 - CONDICIONES DE LAS INSTALACIONES TÉRMICAS.</h4>

            <p class="texto-parrafo">
              Se certifica que la instalación cumple las condiciones de eficiencia energética y requisitos técnicos establecidos en el <span class="texto-rojo">RITE (RD 1027/2007)</span> y sus modificaciones) en virtud de lo dispuesto en el CTE <span class="texto-rojo">DB HE2</span>.
            </p>

            <ul class="lista-actividades">
              <li>El equipo instalado dispone de marcado CE, certificado <span class="texto-rojo">EJE</span> y etiquetado energético clase A, garantizando la eficiencia exigida</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <img src="/logos/iconos-organizaciones.png" alt="Gobierno" class="logo-pie" onerror="this.style.display = 'none'" />
        <img src="/logos/icono-junta-andalucia.png" alt="Junta" class="logo-pie" />
      </div>
    </div>

    <!-- PÁGINA 3 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img src="/logos/iconos-organizaciones.png" alt="Gobierno de España" class="logo" onerror="this.style.display = 'none'" />
          <img src="/logos/icono-junta-andalucia.png" alt="Junta de Andalucía" class="logo" />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Sección 7: No causar perjuicio significativo -->
        <div class="seccion">
          <h3 class="numero-seccion">7.</h3>
          <h3 class="titulo-seccion">Cumplimiento del principio de "No causar perjuicio significativo" al medio ambiente.</h3>

          <p class="texto-parrafo">
            La actuación objeto de la subvención cumple objetivos medioambientales establecidos, según el artículo 17 del Reglamento (UE) 2020/852, relativo al establecimiento de un marco para facilitar las inversiones sostenibles mediambientales establecidas.
          </p>

          <p class="texto-parrafo">
            Asimismo, se cumplen los requisitos establecidos en el Real Decreto 853/2021.
          </p>

          <p class="texto-parrafo">
            Los residuos generados en la actuación, han consistido principalmente en cartónaje y plásticos, los cuales se han reciclado en un porcentaje de al menos el 70% (en peso).
          </p>
        </div>

        <!-- Sección 8: Conclusiones -->
        <div class="seccion">
          <h3 class="numero-seccion">8.</h3>
          <h3 class="titulo-seccion">Conclusiones.</h3>

          <p class="texto-parrafo">
            La presente memoria justificativa de la actuación pone de manifiesto la correcta utilización de la subvención recibida para la mejora de la eficiencia energética de viviendas en la Comunidad Autónoma de <span class="texto-rojo">Andalucía</span>.
          </p>

          <!-- Firma -->
          <div class="seccion-firma">
            <p style="margin-top: 40px;"><span class="etiqueta">Fecha:</span> <span class="texto-rojo">{{ fechaConclusionDia }} de {{ mesNombre }} de {{ fechaConclusionAnio }}</span></p>
            <p><span class="etiqueta">Firma:</span> <span class="texto-rojo">{{ nombreFirma }}</span></p>
            <div v-if="firmaImagen" class="contenedor-firma-imagen">
              <img :src="firmaImagen" alt="Firma" class="imagen-firma" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="pie-pagina">
        <img src="/logos/iconos-organizaciones.png" alt="Gobierno" class="logo-pie" onerror="this.style.display = 'none'" />
        <img src="/logos/icono-junta-andalucia.png" alt="Junta" class="logo-pie" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  expediente: { type: String, default: '' },
  nif: { type: String, default: '' },
  tipoEdificio: { type: String, default: 'viviendas unifamiliares' },
  domicilio: { type: String, default: '' },
  zaharilla: { type: String, default: '' },
  tecnicoRedactor: { type: String, default: '' },
  potenciaTermica: { type: String, default: '1,84' },
  resistenciaElectrica: { type: String, default: '1,5' },
  potenciaTotal: { type: String, default: '3,3' },
  tipoSoporte: { type: String, default: 'PLANA' },
  fechaConclusionDia: { type: String, default: '' },
  fechaConclusionMes: { type: String, default: '' },
  fechaConclusionAnio: { type: String, default: '' },
  importeCertificacion: { type: String, default: '' },
  importeOtrosCostes: { type: String, default: '' },
  importeTotal: { type: String, default: '' },
  nombreFirma: { type: String, default: '' },
  firmaImagen: { type: String, default: '' },
  aerotermia: { type: Boolean, default: false },
  mesNombre: { type: String, default: 'febrero' }
})
</script>

<style scoped>
/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-pdf {
  width: 210mm;
  height: auto;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: 'Calibri', Arial, sans-serif;
  color: #000;
  font-size: 11px;
  line-height: 1.5;
}

.pagina {
  width: 210mm;
  min-height: 297mm;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  page-break-after: always;
  box-sizing: border-box;
}

/* ========== ENCABEZADO PÁGINA ========== */
.encabezado-pagina {
  width: 100%;
  padding: 15px 20px;
  border-bottom: 2px solid #000;
  display: flex;
  justify-content: center;
}

.logos-grupo {
  display: flex;
  gap: 15px;
  align-items: center;
}

.logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-principal {
  flex: 1;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* ========== TÍTULOS ========== */
.titulo-principal {
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  color: #000;
}

.titulo-secundario {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 5px 0;
  text-transform: uppercase;
}

.subtitulo-linea-3 {
  text-align: center;
  font-size: 11px;
  margin: 0 0 15px 0;
  font-weight: bold;
}

/* ========== DATOS INICIALES ========== */
.datos-iniciales {
  border: 1px solid #000;
  padding: 10px;
  background-color: #f9f9f9;
  font-size: 10px;
}

.datos-iniciales p {
  margin: 3px 0;
}

.domicilio-seccion {
  border: 1px solid #000;
  padding: 10px;
  background-color: #f9f9f9;
  font-size: 10px;
}

.domicilio-seccion p {
  margin: 3px 0;
}

.etiqueta {
  font-weight: bold;
  margin-right: 10px;
}

/* ========== COLORES DE TEXTO ========== */
.texto-rojo {
  color: red;
  font-weight: bold;
}

.texto-verde {
  color: green;
  font-weight: bold;
}

.texto-morado {
  color: purple;
  font-weight: bold;
}

/* ========== BLOQUES CONDICIONALES ========== */
.bloque-morado {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 15px 0;
  border-left: 4px solid purple;
}

/* ========== SECCIONES ========== */
.seccion {
  margin-bottom: 20px;
}

.numero-seccion {
  display: inline;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
}

.titulo-seccion {
  display: inline;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
}

.subseccion {
  margin-top: 15px;
}

.numero-subseccion {
  display: inline;
  font-size: 11px;
  font-weight: bold;
  margin: 0;
}

.titulo-subseccion {
  display: inline;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
}

/* ========== PÁRRAFOS ========== */
.texto-parrafo {
  margin: 8px 0;
  text-align: justify;
  font-size: 11px;
  line-height: 1.4;
}

/* ========== LISTAS ========== */
.lista-actividades {
  margin: 8px 0 8px 20px;
  padding: 0;
  font-size: 11px;
}

.lista-actividades li {
  margin-bottom: 5px;
  list-style-type: disc;
}

/* ========== TABLAS ========== */
.tabla-costes {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 10px;
}

.tabla-costes th,
.tabla-costes td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

.tabla-costes th {
  background-color: #e0e0e0;
  font-weight: bold;
}

.tabla-acreditacion {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 11px;
}

.tabla-acreditacion th,
.tabla-acreditacion td {
  border: 1px solid #000;
  padding: 10px;
}

.tabla-acreditacion th {
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: left;
}

.valor-tabla {
  text-align: center;
  font-weight: bold;
  color: red;
}

/* ========== FIRMA ========== */
.seccion-firma {
  margin-top: 40px;
}

.contenedor-firma-imagen {
  margin-top: 10px;
  text-align: center;
}

.imagen-firma {
  max-height: 60px;
  width: auto;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  border-top: 2px solid #000;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: auto;
}

.logo-pie {
  height: 40px;
  width: auto;
  object-fit: contain;
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
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  .pagina {
    width: 210mm !important;
    min-height: 297mm !important;
    page-break-after: always !important;
  }

  div[data-pdf-content] {
    width: 210mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
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
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
  }

  .pagina {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
  }
}
</style>
