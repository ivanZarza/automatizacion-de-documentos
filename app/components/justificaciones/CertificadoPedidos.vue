<template>
  <div data-pdf-content class="contenedor-pdf">
    <div class="contenedor-principal">
      <h1 class="titulo-principal">MODELO DE RELACIÓN CERTIFICADA Y COPIA DE LOS PEDIDOS Y/O CONTRATOS RELATIVOS A LAS ACTUACIONES REALIZADAS.</h1>
      <div class="datos-iniciales">
        <div class="columna-datos">
          <p class="dato-linea">
            <span class="dato-label">Persona beneficiaria:</span>
            <span class="dato-valor rojo">{{ personaBeneficiaria }}</span>
          </p>
          <p class="dato-linea">
            <span class="dato-label">NIF:</span>
            <span class="dato-valor rojo">{{ nif }}</span>
          </p>
          <p class="dato-linea">
            <span class="dato-label">Dirección:</span>
            <span class="dato-valor rojo">{{ direccion }}</span>
          </p>
          <p class="dato-linea">
            <span class="dato-label">Provincia:</span>
            <span class="dato-valor rojo">{{ provincia }}</span>
          </p>
          <p class="dato-linea">
            <span class="dato-label">N.º Expediente:</span>
            <span class="dato-valor rojo">{{ expediente }}</span>
          </p>
        </div>
      </div>
      <!-- Eliminadas etiquetas <tr> y <table> mal ubicadas -->
      <div class="seccion">
        <h2 class="titulo-seccion">Certificación</h2>
        <p class="texto-parrafo">
          CERTIFICA que la siguiente relación de pedidos y/o contratos, relativos a las actuaciones realizadas con cargo a las ayudas de la Orden de 9 de junio de 2022, por la que se aprueban las bases reguladoras para la concesión de subvenciones, en régimen de concurrencia no competitiva, para la rehabilitación a nivel de edificio, la mejora de la eficiencia energética en viviendas, la elaboración del libro del edificio existente para la rehabilitación y la redacción de proyectos de rehabilitación, en el marco del Plan de Recuperación, Transformación y Resiliencia, en la Comunidad Autónoma de Andalucía, conforme al apartado 23.B.3.j del cuadro resumen.
        </p>
      </div>
      <div class="seccion">
        <h2 class="titulo-seccion">Relación de pedidos y contratos</h2>
        <table class="tabla-gastos">
          <thead>
            <tr>
              <th class="col-numero">Nº</th>
              <th class="col-concepto">CONCEPTO</th>
              <th class="col-acreedor">PROVEEDOR</th>
              <th class="col-factura">ID. OFERTA</th>
              <th class="col-fecha">FECHA OFERTA</th>
              <th class="col-importe">IMPORTE OFERTA</th>
              <th class="col-factura">ID PEDIDO</th>
              <th class="col-fecha">FECHA PEDIDO</th>
              <th class="col-importe">IMPORTE PEDIDO</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fila 1: Variables -->
            <tr class="fila-datos">
              <td class="col-numero">1</td>
              <td class="col-concepto">
                <span class="texto-valor">{{ concepto }}</span>
              </td>
              <td class="col-acreedor">
                <span class="texto-valor">{{ proveedor }}</span>
              </td>
              <td class="col-factura">
                <span class="texto-valor">{{ idOferta }}</span>
              </td>
              <td class="col-fecha">
                <span class="texto-valor">{{ fechaOferta }}</span>
              </td>
              <td class="col-importe">
                <span class="texto-valor">{{ importeOferta }}</span>
              </td>
              <td class="col-factura">
                <span class="texto-valor">{{ idPedido }}</span>
              </td>
              <td class="col-fecha">
                <span class="texto-valor">{{ fechaPedido }}</span>
              </td>
              <td class="col-importe">
                <span class="texto-valor">{{ importePedido }}</span>
              </td>
            </tr>
            <!-- Filas 2-8: Estáticas -->
            <tr class="fila-datos">
              <td class="col-numero">2</td>
              <td class="col-concepto"><span class="texto-estacio"></span></td>
              <td class="col-acreedor"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
            </tr>
            <tr class="fila-datos">
              <td class="col-numero">3</td>
              <td class="col-concepto"><span class="texto-estacio"></span></td>
              <td class="col-acreedor"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
            </tr>
            <tr class="fila-datos">
              <td class="col-numero">4</td>
              <td class="col-concepto"><span class="texto-estacio"></span></td>
              <td class="col-acreedor"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
            </tr>
            <tr class="fila-datos">
              <td class="col-numero">5</td>
              <td class="col-concepto"><span class="texto-estacio"></span></td>
              <td class="col-acreedor"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
              <td class="col-factura"><span class="texto-estacio"></span></td>
              <td class="col-fecha"><span class="texto-estacio"></span></td>
              <td class="col-importe"><span class="texto-estacio"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="contenedor-firmas">
        <div class="firma-bloque">
          <div class="datos-firma">
            <p class="dato-firma">
              <span class="valor rojo">En Sevilla a {{ dia }} de {{ mes }} de {{ anio }}</span>
            </p>
          </div>
          <div v-if="firmaImagen" class="imagen-firma-contenedor">
            <img :src="firmaImagen" alt="Firma" class="imagen-firma" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  personaBeneficiaria: String,
  nif: String,
  direccion: String,
  provincia: String,
  expediente: String,
  concepto: String,
  proveedor: String,
  idOferta: String,
  fechaOferta: String,
  importeOferta: String,
  idPedido: String,
  fechaPedido: String,
  importePedido: String,
  dia: String,
  mes: String,
  anio: String,
  firmaImagen: String
})
</script>

<style scoped>
@import "../../styles/variables.css";
/* Copiado de MemoriaEconomica.vue */
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
.contenedor-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20mm;
  margin-top: 30px;
}
.titulo-principal {
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  text-transform: uppercase;
}
.datos-iniciales {
  border: 1px solid #000000;
  padding: 5px 15px;
  margin-bottom: 30px;
}
.columna-datos {
  flex: 1;
}
.dato-linea {
  margin: 5px 0;
  font-size: 11px;
  display: flex;
  gap: 2px;
}
.dato-label {
  font-weight: bold;
  min-width: 150px;
}
.dato-valor {
  color: rgb(8, 8, 8);
  font-weight: bold;
}
.rojo {
  color: rgb(0, 0, 0);
  font-weight: bold;
}
.seccion {
  margin-bottom: 15px;
}
.titulo-seccion {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 30px;
  padding: 8px 0;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}
.texto-parrafo {
  font-size: 12px;
  text-align: justify;
  margin-bottom: 30px;
  color: #000000;
}
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
  font-weight: bold;
  height: 35px;
  vertical-align: middle;
}
.tabla-gastos td {
  height: 32px;
  vertical-align: middle;
}
.texto-valor {
  font-size: 10px;
  color: #000;
  display: block;
  padding: 2px 3px;
}
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
  color: rgb(0, 0, 0);
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
