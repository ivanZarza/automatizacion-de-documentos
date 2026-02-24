<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- PÁGINA 1 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img
            src="/logos/iconos-organizaciones.png"
            alt="Gobierno de España"
            class="logo"
            onerror="this.style.display = 'none'"
          />
          <img
            src="/logos/icono-junta-andalucia.png"
            alt="Junta de Andalucía"
            class="logo"
          />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Título principal -->
        <h1 class="titulo-principal">
          MEMORIA JUSTIFICATIVA DE LA ACTUACIÓN PARA LA MEJORA DE LA EFICIENCIA
          ENERGÉTICA EN <span class="texto-verde">{{ tipoEdificio }}</span
          >EN LA COMUNIDAD AUTÓNOMA DE ANDALUCÍA ({{l3l4}})
        </h1>

        <!-- Datos Iniciales -->
        <div class="datos-iniciales">
          <p>
            <span class="etiqueta">EXPEDIENTE:</span>
            <span class="texto-rojo">{{ expedienteEco }}</span>
          </p>
          <p>
            <span class="etiqueta">NIF:</span>
            <span class="texto-rojo">{{ nif }}</span>
          </p>
          <p>
            <span class="etiqueta">AGENTE GESTOR:</span> SOLAY INGENIEROS S.L.
          </p>
          <p><span class="etiqueta">NIF AGENTE GESTOR:</span>B09848912</p>
          <p>
            <span class="etiqueta">DOMICILIO Y LOCALIDAD DE LA ACTUACIÓN:</span>
            <span class="texto-rojo">{{ domicilio }}</span>
          </p>
          <p>
            <span class="etiqueta"
              >TÉCNICO REDACTOR, TITULACIÓN Y Nº DE COLEGIADO:</span
            >
            <span
              >Miguel Ángel Rivas Zapata, Ingeniero Industrial, 4671
              COIIAOC</span
            >
          </p>
        </div>

        <!-- Sección 1: Introducción -->
        <div class="seccion">
          <h3 class="numero-seccion">1.</h3>
          <h3 class="titulo-seccion">Introducción.</h3>

          <p class="texto-parrafo">
            La presente memoria tiene por objeto justificar del cumplimiento de
            las condiciones impuestas en la concesión de la subvención, conforme
            a lo exigido en las bases reguladoras y la resolución de concesión
            de la subvención, otorgada por la Comunidad Autónoma de Andalucía
            para la mejora de la eficiencia energética en edificios en Andalucía
            ({{l3l4 }}), de acuerdo con lo establecido en el apartado 23.b)1.g)
            del cuadro resumen de las bases reguladoras aprobadas por Orden de 9
            de junio de 2022 de la Consejería de Fomento, Articulación del
            Territorio y Vivienda.
          </p>

          <p class="texto-parrafo">
            <span class="texto-opcional">{{ textoOpcional1 }}</span> mediante la{{ textoAerotermia1 }}
            ejecución de una instalación fotovoltaica para autoconsumo.<span class="textoAerotermia">y montaje y conexionados eléctrico y de tuberías de ACS de una bomba de calor aerotérmica de {{ potenciaBomba }}1,8 kW de potencia térmica nominar (Calor) con depósito incorporado de {{ depositoLitros }} 200 litros para la producción de ACS, al tener menos de 5 Kw no es obligatorio registrarla en Industria.</span>
          </p>
          <div v-if="caracteristicasAerotermia" class="caracteristicas-aerotermia">{{ caracteristicasAerotermia }}</div>
        </div>

        <!-- Sección 2: Fecha de conclusión -->
        <div class="seccion">
          <h3 class="numero-seccion">2.</h3>
          <h3 class="titulo-seccion">
            Fecha de conclusión de las actuaciones.
          </h3>

          <p class="texto-parrafo">
            Las actuaciones objeto de la subvención se concluyeron completamente
            y conforme a lo indicado en la presente memoria el día
            <span class="texto-rojo"
              >{{ fechaConclusionDia }} de {{ fechaConclusionMes }} de
              {{ fechaConclusionAnio }}</span
            >.
          </p>
        </div>

        <!-- Sección 3: Descripción de actividades -->
        <div class="seccion">
          <h3 class="numero-seccion">3.</h3>
          <h3 class="titulo-seccion">
            Descripción de las actividades realizadas y resultados obtenidos.
          </h3>

          <p class="texto-parrafo">
            Las actividades realizadas para la ejecución de la instalación
            fotovoltaica, han consistido en las siguientes:
          </p>

          <ul class="lista-actividades">
            <li>
              Preparación del soporte de la cubierta
              <span class="texto-verde">{{ tipoSoporte }}</span
              >.
            </li>
            <li>
              Anclaje de la estructura que soportará los paneles fotovoltaicos.
            </li>
            <li>
              Instalación de los paneles fotovoltaicos, del inversor y de los
              elementos eléctricos complementarios.
            </li>
            <li>Conexionado a la red eléctrica conforme al REBT.</li>
            <li>Puesta a punto y legalización de la instalación.</li>
          </ul>

          <!-- BLOQUE MORADO 2 -->
          <span class="textoAerotermia">{{ textoAerotermia2 }}</span>

          <div v-if="aerotermia" class="bloque-morado">
            <p class="texto-parrafo" style="color: purple">
              Las actividades realizadas para la ejecución de la bomba
              aerotérmica han consistido en:
            </p>
            <ul class="lista-actividades" style="color: purple">
              <li>Dimensionamiento de la demanda y selección de equipos.</li>
              <li>Instalación de unidad exterior y depósito de ACS.</li>
              <li>Conexiones hidráulicas, frigoríficas y eléctricas.</li>
              <li>Pruebas, puesta en marcha y entrega al usuario.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- PÁGINA 2 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img
            src="/logos/iconos-organizaciones.png"
            alt="Gobierno de España"
            class="logo"
            onerror="this.style.display = 'none'"
          />
          <img
            src="/logos/icono-junta-andalucia.png"
            alt="Junta de Andalucía"
            class="logo"
          />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Sección 4: Coste final -->
        <div class="seccion">
          <h3 class="numero-seccion">4.</h3>
          <h3 class="titulo-seccion">El coste final de las actuaciones:</h3>

          <p>
            <span
              >{{ coincidencia }} Coincide con el coste previsto en la
              documentación presentada con el Anexo II.</span
            >
          </p>

          <p class="texto-parrafo">
            El desglose de los costes ha sido el siguiente:
          </p>

          <table class="tabla-costes-desglosada">
            <thead>
              <tr>
                <th>CONCEPTO</th>
                <th>IMPORTE TOTAL (SIN IVA)</th>
                <th>IMPORTE TOTAL (CON IVA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ACTUACIONES DE REHABILITACIÓN (SIN RETIRADA DE AMIANTO)</td>
                <td class="texto-rojo">{{ importeActuacionesSinIva }}</td>
                <td class="texto-rojo">{{ importeActuacionesConIva }}</td>
              </tr>
              <tr>
                <td>HONORARIOS PROFESIONALES</td>
                <td class="texto-rojo">0.00</td>
                <td class="texto-rojo">0.00</td>
              </tr>
              <tr>
                <td>GESTIÓN Y TRAMITACIÓN ADMINISTRATIVA</td>
                <td class="texto-rojo">0.00</td>
                <td class="texto-rojo">0.00</td>
              </tr>
              <tr>
                <td>RETIRADA DE AMIANTO</td>
                <td class="texto-rojo">0.00</td>
                <td class="texto-rojo">0.00</td>
              </tr>
              <tr style="font-weight: bold; border-top: 2px solid black">
                <td>TOTAL</td>
                <td class="texto-rojo">{{ importeTotalSinIva }}</td>
                <td class="texto-rojo">{{ importeTotalConIva }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sección 5: Acreditación -->
        <div class="seccion">
          <h3 class="numero-seccion">5.</h3>
          <h3 class="titulo-seccion">
            Acreditación del cumplimiento de las condiciones impuestas e importe
            de la subvención.
          </h3>

          <p class="texto-parrafo">
            El técnico firmante de la presente memoria acredita que con las
            actuaciones se ha conseguido una reducción del consumo de energía
            primaria no renovable de al menos un 30%, siendo en este caso, tal
            como se deduce de los resultados obtenidos en los certificados de
            eficiencia energética actual y previsto, del
            <span class="texto-rojo">{{
              porcentajeMejoraEnergeticaAcreditado
            }}</span>
            La tabla de los importes subvencionados sería la siguiente:
          </p>

          <table class="tabla-acreditacion">
            <thead>
              <tr>
                <th colspan="2">IMPORTE SUBVENCIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PORCENTAJE DE MEJORA ENERGÉTICA ACREDITADO</td>
                <td class="valor-tabla">
                  {{ porcentajeMejoraEnergeticaAcreditado }}
                </td>
              </tr>
              <tr>
                <td>PORCENTAJE SUBVENCIONABLE A APLICAR</td>
                <td class="valor-tabla">{{ porcentajeSubvencionable }}</td>
              </tr>
              <tr>
                <td>IMPORTE DE LA SUBVENCIÓN RESULTANTE (MÁXIMO 18.800,00€)</td>
                <td class="valor-tabla">{{ importeSubvencionResultante }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Sección 6: Justificación normativa -->
        <div class="seccion">
          <h3 class="numero-seccion">6.</h3>
          <h3 class="titulo-seccion">
            Justificación del cumplimiento de la normativa de obligado
            cumplimiento.
          </h3>

          <div class="subseccion">
            <h4 class="numero-subseccion">6.1.</h4>
            <h4 class="titulo-subseccion">Justificación del REBT.</h4>

            <p class="texto-parrafo">
              Puesto que la actuación ha consistido en una instalación de
              generación eléctrica fotovoltaica, se deberá justificar el
              Reglamento Electrotécnico de Baja Tensión, en concreto la
              ITC-BT-40. Para ello, se anexa el certificado de instalación
              eléctrica firmado por instalador autorizado de la instalación
              fotovoltaica objeto de la actuación.
            </p>
          </div>

          <div class="subseccion">
            <h4 class="numero-subseccion">6.2.</h4>
            <h4 class="titulo-subseccion">
              Certificado de seguridad y solidez estructural.
            </h4>

            <p class="texto-parrafo">
              El técnico firmante de la presente memoria, CERTIFICA que la
              estructura soporte de los elementos de la instalación,
              especialmente la de los paneles fotovoltaicos, cumple todos los
              requerimientos normativos respecto a la seguridad y solidez
              estructural.
            </p>
          </div>

          <!-- SECCIÓN 6.3 CONDICIONAL -->

          <span class="textoaerotermia">{{ textoAerotermia3 }}</span>
          <div v-if="aerotermia" class="subseccion">
            <h4 class="numero-subseccion">6.3.</h4>
            <h4 class="titulo-subseccion">DB HE 2 - INSTALACIONES TÉRMICAS.</h4>

            <p class="texto-parrafo">
              Se certifica que la instalación cumple las condiciones de
              eficiencia energética establecidas en el
              <span class="texto-rojo">RITE (RD 1027/2007)</span> y en el CTE
              <span class="texto-rojo">DB HE2</span>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- PÁGINA 3 -->
    <div class="pagina">
      <!-- Encabezado con Logos -->
      <div class="encabezado-pagina">
        <div class="logos-grupo">
          <img
            src="/logos/iconos-organizaciones.png"
            alt="Gobierno de España"
            class="logo"
            onerror="this.style.display = 'none'"
          />
          <img
            src="/logos/icono-junta-andalucia.png"
            alt="Junta de Andalucía"
            class="logo"
          />
        </div>
      </div>

      <div class="contenedor-principal">
        <!-- Sección 7: Sostenibilidad ambiental -->
        <div class="seccion">
          <h3 class="numero-seccion">7.</h3>
          <h3 class="titulo-seccion">
            Cumplimento del principio de “No causar perjuicio significativo” al
            medio ambiente.
          </h3>

          <p class="texto-parrafo">
            La actuación objeto de la subvención cumple los objetivos
            medioambientales establecidos, según el artículo 17 del Reglamento
            (UE) 2020/852, relativo al establecimiento de un marco para
            facilitar las inversiones sostenibles mediante la implantación de un
            sistema de clasificación de las actividades económicas
            medioambientales sostenibles. Así mismo, se cumplen los requisitos
            establecidos en el Real Decreto 853/2021.
          </p>

          <p class="texto-parrafo">
            Los residuos generados en la actuación, han consistido
            principalmente en cartonaje y plásticos, los cuales se han reciclado
            en un porcentaje de al menos el 70% (en peso).
          </p>
        </div>

        <!-- Sección 8: Conclusiones -->
        <div class="seccion">
          <h3 class="numero-seccion">8.</h3>
          <h3 class="titulo-seccion">Conclusiones.</h3>

          <p class="texto-parrafo">
            La presente memoria justificativa de la actuación pone de manifiesto
            la correcta utilización de la subvención recibida para la mejora de
            la eficiencia energética de viviendas en la Comunidad Autónoma de
            Andalucía.
          </p>

          <!-- Firma -->
          <div class="seccion-firma">
            <p style="margin-top: 40px">
              <span class="etiqueta">Fecha:</span>
              <span class="texto-rojo"
                >{{ dia }} de {{ mes }} de
                {{ anio }}</span
              >
            </p>
            <p>
              <span class="etiqueta">Firma:</span>
              <span class="texto-rojo">Miguel Ángel Rivas Zapata</span>
            </p>
            <div v-if="firmaImagen" class="contenedor-firma-imagen">
              <img :src="firmaImagen" alt="Firma" class="imagen-firma" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tipoEdificio: { type: String, default: "viviendas unifamiliares" },
  expedienteEco: { type: String, default: "" },
  nif: { type: String, default: "" },
  domicilio: { type: String, default: "" },
  l3l4: { type: String, default: "" },
  textoOpcional1: { type: String, default: "" },
  textoAerotermia1: { type: String, default: "" },
  fechaConclusionDia: { type: String, default: "" },
  fechaConclusionMes: { type: String, default: "" },
  fechaConclusionAnio: { type: String, default: "" },
  tipoSoporte: { type: String, default: "PLANA" },
  textoAerotermia2: { type: String, default: "" },
  caracteristicasAerotermia: { type: String, default: "" },
  aerotermia: { type: Boolean, default: false },
  coincidencia: { type: String, default: "" },
  importeActuacionesSinIva: { type: String, default: "0,00 €" },
  importeActuacionesConIva: { type: String, default: "0,00 €" },
  importeTotalSinIva: { type: String, default: "0,00 €" },
  importeTotalConIva: { type: String, default: "0,00 €" },
  porcentajeMejoraEnergeticaAcreditado: { type: String, default: "64,22%" },
  porcentajeSubvencionable: { type: String, default: "80,00%" },
  importeSubvencionResultante: { type: String, default: "9.920,00 €" },
  textoAerotermia3: { type: String, default: "" },
  dia: { type: String, default: "" },
  mes: { type: String, default: "" },
  anio: { type: String, default: "" },
  firmaImagen: { type: String, default: "" }
});
</script>

<style scoped>
/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-pdf {
  width: 210mm;
  height: auto;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Calibri", Arial, sans-serif;
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

/* ========== ENCABEZADO ========== */
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

/* ========== DATOS ========== */
.datos-iniciales,
.domicilio-seccion {
  border: 1px solid #000;
  padding: 10px;
  background-color: #f9f9f9;
  font-size: 10px;
}

.datos-iniciales p,
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

.numero-seccion,
.titulo-seccion {
  display: inline;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
}

.titulo-seccion {
  text-transform: uppercase;
}

.subseccion {
  margin-top: 15px;
}

.numero-subseccion,
.titulo-subseccion {
  display: inline;
  font-size: 11px;
  font-weight: bold;
  margin: 0;
}

.titulo-subseccion {
  text-transform: uppercase;
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
.tabla-costes,
.tabla-costes-desglosada,
.tabla-acreditacion {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-size: 10px;
}

.tabla-costes th,
.tabla-costes td,
.tabla-costes-desglosada th,
.tabla-costes-desglosada td,
.tabla-acreditacion th,
.tabla-acreditacion td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

.tabla-costes th,
.tabla-costes-desglosada th,
.tabla-acreditacion th {
  background-color: #e0e0e0;
  font-weight: bold;
}

.tabla-costes-desglosada th:first-child,
.tabla-costes-desglosada td:first-child {
  text-align: left;
}

.tabla-acreditacion th:first-child,
.tabla-acreditacion td:first-child {
  text-align: left;
}

.tabla-acreditacion th,
.tabla-acreditacion td {
  font-size: 11px;
}

.tabla-acreditacion th {
  text-align: left;
  background-color: #f0f0f0;
}

.valor-tabla {
  text-align: center;
  font-weight: bold;
  color: red;
}

/* ========== TEXTO AEROTERMIA ========== */
.textoAerotermia {
  font-style: serif;
  line-height: 1.4;
}

.caracteristicas-aerotermia {
  white-space: pre-line;
  margin: 10px 0 8px 0;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-left: 3px solid purple;
  font-size: 11px;
  line-height: 1.5;
  color: #333;
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
  }

  .pagina {
    width: 210mm !important;
    min-height: 297mm !important;
    page-break-after: always !important;
  }

  button {
    display: none !important;
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
