<template>
  <div data-pdf-content class="contenedor-pdf">
    <!-- Contenedor principal con márgenes A4 -->
    <div class="contenedor-principal">
      <!-- Encabezado con Logos -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <!-- logos-grupo   -->
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
          <h1 class="titulo-principal">MEMORIA ECONÓMICA JUSTIFICATIVA</h1>
          <h3 class="titulo-secundario">
            CON APORTACIÓN DE JUSTIFICANTES DE GASTO DE SUBVENCIÓN PARA LA
            REHABILITACIÓN A NIVEL DE {{ edificioVivienda }} EN LA COMUNIDAD AUTÓNOMA DE
            ANDALUCÍA ({{ l3l4 }})
          </h3>
        </div>
      </div>

      <!-- Datos Iniciales -->
      <div class="datos-iniciales">
        <p class="dato-linea">
          <span class="dato-label">EXPEDIENTE:</span>
          <span class="dato-valor">{{ expediente }}</span>
        </p>
        <p class="dato-linea">
          <span class="dato-label">NIF:</span>
          <span class="dato-valor">{{ nif }}</span>
        </p>
        <p class="dato-linea">
          <span class="dato-label">AGENTE GESTOR:</span>
          <span class="dato-valor">SOLAY INGENIEROS S.L.</span>
        </p>
        <p class="dato-linea">
          <span class="dato-label">NIF AGENTE GESTOR:</span>
          <span
            class="dato-valor"
          >B09848912</span>
        </p>
      </div>

      <!-- Contenido Principal -->
      <div class="contenido-principal">
        <!-- INTRODUCCIÓN -->
        <div class="seccion">
          <h2 class="titulo-seccion">Introducción</h2>

          <div class="parrafo-introduccion">
            <p class="texto-parrafo">
              La presente memoria tiene por objeto justificar la utilización de
              la subvención otorgada por la Comunidad Autónoma de Andalucía para
              la rehabilitación a nivel de
              <span class="texto-fijo">{{ edificioVivienda }}</span> (<span class="texto-fijo">{{ l3l4 }}</span>), de acuerdo con lo establecido en el apartado 25 del cuadro
              resumen de las bases reguladoras aprobadas por Orden de 9 de junio
              de 2022 de la Consejería de Fomento, Articulación del Territorio y
              Vivienda.
            </p>
          </div>

          <div class="parrafo-introduccion">
            <p class="texto-parrafo parrafo-activo">
              <span class="texto-fijo">{{ parrafoTexto }}</span>
            </p>
          </div>
        </div>

        <!-- RELACIÓN CLASIFICADA DE GASTOS -->
        <div class="seccion">
          <h2 class="titulo-seccion">
            Relación clasificada de gastos y propuestas a justificar
          </h2>

          <table class="tabla-gastos">
            <thead>
              <tr>
                <th class="col-numero">Nº</th>
                <th class="col-factura">Nº FACTURA</th>
                <th class="col-fecha">FECHA FACTURA</th>
                <th class="col-cf">CF</th>
                <th class="col-acreedor">ACREEDOR</th>
                <th class="col-concepto">CONCEPTO</th>
                <th class="col-fecha-pago">FECHA PAGO</th>
                <th class="col-importe">IMPORTE</th>
              </tr>
            </thead>
            <tbody>
              <!-- Fila 1: Variables -->
              <tr class="fila-datos">
                <td class="col-numero">1</td>
                <td class="col-factura">
                  <span class="texto-valor">{{ numeroFactura1 }}</span>
                </td>
                <td class="col-fecha">
                  <span class="texto-valor">{{ fechaFactura1 }}</span>
                </td>
                <td class="col-cf">
                  <span class="texto-valor">{{ cf1 }}</span>
                </td>
                <td class="col-acreedor">
                  <span class="texto-valor">{{ acreedor1 }}</span>
                </td>
                <td class="col-concepto">
                  <span class="texto-valor">{{ concepto1 }}</span>
                </td>
                <td class="col-fecha-pago">
                  <span class="texto-valor">{{ fechaPago1 }}</span>
                </td>
                <td class="col-importe">
                  <span class="texto-valor">{{ importe1 }}</span>
                </td>
              </tr>
              <!-- Filas 2-5: Estáticas -->
              <tr class="fila-datos">
                <td class="col-numero">2</td>
                <td class="col-factura"><span class="texto-estacio">{{ numeroFactura2 }}</span></td>
                <td class="col-fecha"><span class="texto-estacio">{{ fechaFactura2 }}</span></td>
                <td class="col-cf"><span class="texto-estacio">{{ cf2 }}</span></td>
                <td class="col-acreedor">
                  <span class="texto-estacio">{{ acreedor2 }}</span>
                </td>
                <td class="col-concepto">
                  <span class="texto-estacio">{{ concepto2 }}</span>
                </td>
                <td class="col-fecha-pago">
                  <span class="texto-estacio">{{ fechaPago2 }}</span>
                </td>
                <td class="col-importe"><span class="texto-estacio">{{ importe2 }}</span></td>
              </tr>
              <tr class="fila-datos">
                <td class="col-numero">3</td>
                <td class="col-factura"><span class="texto-estacio">{{ numeroFactura3 }}</span></td>
                <td class="col-fecha"><span class="texto-estacio">{{ fechaFactura3 }}</span></td>
                <td class="col-cf"><span class="texto-estacio">{{ cf3 }}</span></td>
                <td class="col-acreedor">
                  <span class="texto-estacio">{{ acreedor3 }}</span>
                </td>
                <td class="col-concepto">
                  <span class="texto-estacio">{{ concepto3 }}</span>
                </td>
                <td class="col-fecha-pago">
                  <span class="texto-estacio">{{ fechaPago3 }}</span>
                </td>
                <td class="col-importe"><span class="texto-estacio">{{ importe3 }}</span></td>
              </tr>
              <tr class="fila-datos">
                <td class="col-numero">4</td>
                <td class="col-factura"><span class="texto-estacio">{{ numeroFactura4 }}</span></td>
                <td class="col-fecha"><span class="texto-estacio">{{ fechaFactura4 }}</span></td>
                <td class="col-cf"><span class="texto-estacio">{{ cf4 }}</span></td>
                <td class="col-acreedor">
                  <span class="texto-estacio">{{ acreedor4 }}</span>
                </td>
                <td class="col-concepto">
                  <span class="texto-estacio">{{ concepto4 }}</span>
                </td>
                <td class="col-fecha-pago">
                  <span class="texto-estacio">{{ fechaPago4 }}</span>
                </td>
                <td class="col-importe"><span class="texto-estacio">{{ importe4 }}</span></td>
              </tr>
              <tr class="fila-datos">
                <td class="col-numero">5</td>
                <td class="col-factura"><span class="texto-estacio">{{ numeroFactura5 }}</span></td>
                <td class="col-fecha"><span class="texto-estacio">{{ fechaFactura5 }}</span></td>
                <td class="col-cf"><span class="texto-estacio">{{ cf5 }}</span></td>
                <td class="col-acreedor">
                  <span class="texto-estacio">{{ acreedor5 }}</span>
                </td>
                <td class="col-concepto">
                  <span class="texto-estacio">{{ concepto5 }}</span>
                </td>
                <td class="col-fecha-pago">
                  <span class="texto-estacio">{{ fechaPago5 }}</span>
                </td>
                <td class="col-importe"><span class="texto-estacio">{{ importe5 }}</span></td>
              </tr>
            </tbody>
          </table>

          <div class="total-justificado">
            <p class="etiqueta">Total cantidad justificada:</p>
            <p class="valor">{{ totalCantidadJustificada }}</p>
          </div>
        </div>

        <!-- DESVIACIONES DEL PRESUPUESTO -->
        <div class="seccion">
          <h2 class="titulo-seccion">
            Indicación de posibles desviaciones del presupuesto
          </h2>

          <div class="contenedor-desviaciones">
            <p class="concepto-desvio">
              <span>Presupuesto inicial</span>
              <span class="valor-variable">{{ presupuestoInicial }}</span>
            </p>
            <p class="concepto-desvio">
              <span>Inversión realizada</span>
              <span class="valor-variable">{{ inversionRealizada }}</span>
            </p>
            <p class="concepto-desvio">
              <span
                ><strong
                  >Desviación (con IVA si es subvencionable)</strong
                ></span
              >
              <span class="valor-variable desvio">{{ desviacion }}</span>
            </p>
          </div>
        </div>



        <div class="logos-grupo" style="justify-content: flex-start;padding: 15px; margin: 170px 0px 20px 0px; border-bottom: 1px solid #000;">
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

        <!-- DOCUMENTACIÓN -->
        <div class="seccion">

                  <p class="texto-parrafo">
            En caso de haberse producido desviaciones en el presupuesto
            derivadas de la ejecución de las actuaciones, indicar la cantidad,
            indicando o solicitando el IVA ser subvencionable, a que asciende
            dicha desviación.
          </p>
          <h2 class="titulo-seccion">Documentación</h2>

          <p class="texto-parrafo">
            A efectos de la justificación de la actuación subvencionada y de
            acuerdo con el apartado 25.[i] del cuadro resumen de las bases
            reguladoras, se acompaña a la presente memoria la lista de
            documentos de valor probatorio equivalente en el tráfico jurídico
            mercantil y con eficacia administrativa de las cosas inscritos en el
            apdo. 4 anterior, así como la documentación acreditadora del pago de
            los mismos indicados en el apdo. 5. Tanto las facturas como la
            documentación acreditativa del pago habrán sido en su lugar orden en
            la que han sido relacionados en las tablas.
          </p>
        </div>

        <!-- DECLARACIÓN Y FIRMA -->
        <div class="seccion">
          <h2 class="titulo-seccion">Declaración, lugar, fecha y firma</h2>

          <p class="texto-parrafo">
            La persona bajo firmante DECLARA, bajo su expresa responsabilidad,
            que son ciertos cuantos datos figuran en el presente documento y
            CERTIFICA que los gastos aquí relacionados han sido efectivamente
            realizados en la actuación objeto de la subvención y que los mismos
            cumplen con los requisitos establecidos en el presente vigente y en
            las bases reguladoras de la convocatoria de la subvención. Asimismo,
            se compromete a conservar toda la documentación justificativa y
            contable relacionada con estos gastos, en tanto pudiera ser objeto
            de la correspondientes actuaciones de comprobación y control, según
            dispone el Art. 14.1 g) de la Ley 38/2003, de 17 de noviembre, así
            como de cualquier otra obligación derivada de la normativa estatal o
            de la Unión Europea que así lo exija.
          </p>

          <p class="texto-parrafo">
            Por sentido, se declara que los documentos emitidos y demás
            documentación concerniente a la financiación durante un periodo de 5
            años desde la presentación de la subvención inferior o igual a
            60.000 €, de acuerdo con lo establecido en el artículo 132 del
            Reglamento (UE, Euratom) 2018/1046 del Parlamento Europeo y del
            Consejo, de 18 de julio (apdo. 22.2º del Orden de 9 de junio de
            2023).
          </p>

          <div class="contenedor-firmas">
            <div class="firma-bloque">
              <div class="datos-firma">
                <p class="dato-firma">
                  <span class="etiqueta">Fecha:</span>
                  <span class="valor">A {{ diaFirmaJustificacion }} de {{ mesFirmaJustificacion }} de {{ anioFirmaJustificacion }}</span>
                </p>
                <p class="dato-firma">
                  <span class="etiqueta">Firma:</span>
                  <span class="valor">{{ nombreFirma }}</span>
                </p>
              </div>
              <div v-if="firmaImagen" class="imagen-firma-contenedor">
                <img :src="firmaImagen" alt="Firma" class="imagen-firma" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
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

// Props editables
defineProps({
  expediente: {
    type: String,
    default: '003832'
  },
  nif: {
    type: String,
    default: 'B-003637D'
  },
  edificioVivienda: {
    type: String,
    default: 'vivienda'
  },
  l3l4: {
    type: String,
    default: 'Línea 3'
  },
  parrafoTexto: {
    type: String,
    default: 'Estas ayudas tienen por objeto la financiación de obras o actuaciones en los edificios de uso predominante residencial en las que se obtenga una mejora acreditada de la eficiencia energética, con especial atención a la envolvente edificatoria en edificios de tipología residencial colectiva, incluyendo sus viviendas, y en las viviendas unifamiliares.'
  },
  totalCantidadJustificada: {
    type: String,
    default: '0,00'
  },
  presupuestoInicial: {
    type: String,
    default: '0,00'
  },
  inversionRealizada: {
    type: String,
    default: '0,00'
  },
  desviacion: {
    type: String,
    default: '0,00'
  },
  fechaFirma: {
    type: String,
    default: 'fechaFirma'
  },
  diaFirmaJustificacion: {
    type: String,
    default: 'diaFirmaJustificacion'
  },
  mesFirmaJustificacion: {
    type: String,
    default: 'mesFirmaJustificacion'
  },
  anioFirmaJustificacion: {
    type: String,
    default: 'anioFirmaJustificacion'
  },  
  nombreFirma: {
    type: String,
    default: 'nombreFirma'
  },
  firmaImagen: {
    type: String,
    default: ''
  },
  numeroFactura: {
    type: String,
    default: '003832'
  },
  fechaFactura: {
    type: String,
    default: '06/10/23'
  },
  cf: {
    type: String,
    default: 'B-003637D'
  },
  acreedor: {
    type: String,
    default: 'MAS SOL ENERGIA 15 S.L.U'
  },
  concepto: {
    type: String,
    default: ''
  },
  fechaPago: {
    type: String,
    default: '24/07/2023'
  },
  importe: {
    type: String,
    default: '8.400,00'
  }
});
</script>

<style scoped>
@import "../../styles/variables.css";

/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  width: 210mm;
  height: auto;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Calibri", Arial, sans-serif;
  color: #000000;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

/* ========== CONTENEDOR PRINCIPAL ========== */
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
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
  border-bottom: 2px solid #333;
  margin-bottom: 10px;
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
  text-transform: uppercase;
}

.titulo-secundario {
  margin: 5px 0 0 0;
  font-size: 12px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  text-transform: uppercase;
}

.logos-grupo {
  display: flex;
  gap: 15px;
  margin-left: 15px;
  flex-shrink: 0;
}

.logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}

/* ========== DATOS INICIALES ========== */
.datos-iniciales {
  border: 1px solid #000000;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.dato-linea {
  margin: 5px 0;
  font-size: 11px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.dato-label {
  font-weight: bold;
  min-width: 150px;
}

.dato-valor {
  font-weight: bold;
}

/* ========== CONTENIDO PRINCIPAL ========== */
.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ========== SECCIONES ========== */
.seccion {
  margin-bottom: 5px;
}

.titulo-seccion {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 5px 0;
  padding: 8px 0;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

/* ========== PÁRRAFOS ========== */
.parrafo-introduccion {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.check-selection {
  flex-shrink: 0;
}


.label-text {
  font-size: 10px;
  font-weight: bold;
  color: #000000;
  margin-left: 3px;
}

.texto-parrafo {
  font-size: 12px;
  text-align: justify;
  margin: 0;
  color: #000000;
}

.texto-parrafo.parrafo-activo {
  opacity: 1;
  color: #000000;
  min-height: 50px;
}

.texto-fijo {
  color: #000;
  font-weight: normal;
}

/* ========== TABLA DE GASTOS ========== */
.tabla-gastos {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  font-size: 11px;
}

.tabla-gastos th,
.tabla-gastos td {
  border: 1px solid #000000;
  padding: 6px 4px;
  text-align: center;
}

.tabla-gastos th {
  background-color: #f0f0f0;
  font-weight: bold;
  height: 35px;
  vertical-align: middle;
}

.tabla-gastos td {
  height: 32px;
  vertical-align: middle;
}

.col-numero {
  width: 30px;
}

.col-factura {
  width: 70px;
}

.col-fecha {
  width: 70px;
}

.col-cf {
  width: 65px;
}

.col-acreedor {
  width: 100px;
}

.col-concepto {
  width: 120px;
}

.col-fecha-pago {
  width: 70px;
}

.col-importe {
  width: 70px;
}

.input-tabla {
  width: 95%;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 10px;
  padding: 2px 3px;
  font-family: inherit;
}



.texto-valor {
  font-size: 10px;
  color: #000;
  display: block;
  padding: 2px 3px;
}

.texto-estacio {
  font-size: 10px;
  color: #000000;
  display: block;
  padding: 2px 3px;
}

.fila-datos td {
  background: white;
}

.fila-datos td:first-child {
  background-color: #f9f9f9;
}

/* ========== TOTAL JUSTIFICADO ========== */
.total-justificado {
  text-align: right;
  margin-top: 10px;
  font-size: 12px;
  border-top: 2px solid #333;
  padding-top: 8px;
}

.total-justificado .etiqueta {
  font-weight: bold;
  margin-right: 10px;
}

.total-justificado .valor {
  font-weight: bold;
  color: rgb(0, 0, 0);
  font-size: 13px;
}

/* ========== DESVIACIONES ========== */
.contenedor-desviaciones {
  border: 1px solid #999;
  padding: 10px;
  margin-bottom: 10px;
  background: #f9f9f9;
}

.concepto-desvio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  margin: 5px 0;
  padding: 3px 0;
}

.concepto-desvio span:first-child {
  font-weight: bold;
}

.valor-variable {
  font-weight: bold;
  margin-left: 15px;
}

.valor-variable.desvio {
  font-size: 12px;
}

/* ========== FIRMAS ========== */
.contenedor-firmas {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.firma-bloque {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
}

.datos-firma {
  flex: 1;
}

.dato-firma {
  font-size: 11px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dato-firma .etiqueta {
  font-weight: bold;
  margin-right: 10px;
  min-width: 80px;
  text-align: left;
}

.dato-firma .valor {
  font-weight: bold;
  flex: 1;
  text-align: center;
  padding: 5px 0;
}

.imagen-firma-contenedor {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagen-firma {
  height: 80px;
  width: auto;
  object-fit: contain;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 10px 0;
  border-top: 1px solid #000000;
  margin-top: 20px;
  text-align: center;
  font-size: 10px;
  color: #000000;
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
    height: auto !important;
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
