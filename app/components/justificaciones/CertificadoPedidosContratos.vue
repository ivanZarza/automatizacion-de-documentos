<template>
  <div data-pdf-content class="contenedor-pdf">
    <div class="contenedor-principal">
      <!-- Encabezado -->
      <div class="encabezado">
        <div class="encabezado-contenido">
          <h1 class="titulo-principal">RELACIÓN CERTIFICADA DE PEDIDOS Y/O CONTRATOS</h1>
          <p class="subtitulo">Relativas a las actuaciones realizadas</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <!-- Datos principales -->
      <div class="datos-principales">
        <div class="fila-datos">
          <div class="campo">
            <label>Persona beneficiaria:</label>
            <span>{{ personaBeneficiaria }}</span>
          </div>
          <div class="campo">
            <label>NIF:</label>
            <span>{{ nif }}</span>
          </div>
        </div>

        <div class="fila-datos">
          <div class="campo">
            <label>Dirección:</label>
            <span>{{ direccion }}</span>
          </div>
          <div class="campo">
            <label>Nº Expediente:</label>
            <span>{{ expediente }}</span>
          </div>
        </div>

        <div class="fila-datos">
          <div class="campo">
            <label>Provincia:</label>
            <span>{{ provincia }}</span>
          </div>
        </div>
      </div>

      <!-- Párrafo certificador -->
      <div class="parrafo-certificador">
        <p><strong>CERTIFICA</strong> que la siguiente relación de pedidos y/o contratos, relativos a las actuaciones realizadas con cargo a las ayudas de la Orden de 9 de junio de 2022, por la que se aprueban las bases reguladoras para la concesión de subvenciones, en régimen de concurrencia no competitiva, para la rehabilitación a nivel de edificio, la mejora de la eficiencia energética en viviendas, la elaboración del libro del edificio existente para la rehabilitación y la redacción de proyectos de rehabilitación, en el marco del Plan de Recuperación, Transformación y Resiliencia, en la Comunidad Autónoma de Andalucía, conforme al apartado 23.b.3.i del cuadro resumen.</p>
      </div>

      <!-- Tabla de pedidos -->
      <div class="tabla-pedidos">
        <table>
          <thead>
            <tr class="header-grupo">
              <th colspan="2"></th>
              <th colspan="3" class="grupo-ofertas">OFERTAS</th>
              <th colspan="3" class="grupo-pedidos">PEDIDOS</th>
            </tr>
            <tr>
              <th>Concepto</th>
              <th class="proveedor">Proveedor</th>
              <th>Id. Oferta</th>
              <th>Fecha</th>
              <th>Importe (€)</th>
              <th>Id. Pedido</th>
              <th>Fecha</th>
              <th>Importe (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pedido, index) in pedidos" :key="index">
              <td>{{ pedido.concepto }}</td>
              <td>{{ pedido.proveedor }}</td>
              <td>{{ pedido.idOferta }}</td>
              <td>{{ pedido.fechaOferta }}</td>
              <td class="numero">{{ pedido.importeOferta }}</td>
              <td>{{ pedido.idPedido }}</td>
              <td>{{ pedido.fechaPedido }}</td>
              <td class="numero">{{ pedido.importePedido }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pie de página con firma y fecha -->
      <div class="pie-documento">
        <p class="lugar-fecha">En Sevilla, a {{ diaFirma }} de {{ mesFirma }} de {{ anioFirma }}</p>
        
        <div class="firma-seccion">
          <div class="firma-bloque">
            <div class="linea-firma">
              <img v-if="firma" :src="firma" alt="Firma" class="imagen-firma" />
            </div>
            <p class="etiqueta-firma">Firmado</p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  personaBeneficiaria: String,
  nif: String,
  direccion: String,
  provincia: String,
  expediente: String,
  ordenAnio: String,
  diaFirma: String,
  mesFirma: String,
  anioFirma: String,
  firma: String,
  pedido1Concepto: String,
  pedido1Proveedor: String,
  pedido1IdOferta: String,
  pedido1FechaOferta: String,
  pedido1ImporteOferta: String,
  pedido1IdPedido: String,
  pedido1FechaPedido: String,
  pedido1ImportePedido: String,
  pedido2Concepto: String,
  pedido2Proveedor: String,
  pedido2IdOferta: String,
  pedido2FechaOferta: String,
  pedido2ImporteOferta: String,
  pedido2IdPedido: String,
  pedido2FechaPedido: String,
  pedido2ImportePedido: String,
  pedido3Concepto: String,
  pedido3Proveedor: String,
  pedido3IdOferta: String,
  pedido3FechaOferta: String,
  pedido3ImporteOferta: String,
  pedido3IdPedido: String,
  pedido3FechaPedido: String,
  pedido3ImportePedido: String,
  pedido4Concepto: String,
  pedido4Proveedor: String,
  pedido4IdOferta: String,
  pedido4FechaOferta: String,
  pedido4ImporteOferta: String,
  pedido4IdPedido: String,
  pedido4FechaPedido: String,
  pedido4ImportePedido: String,
  pedido5Concepto: String,
  pedido5Proveedor: String,
  pedido5IdOferta: String,
  pedido5FechaOferta: String,
  pedido5ImporteOferta: String,
  pedido5IdPedido: String,
  pedido5FechaPedido: String,
  pedido5ImportePedido: String,
})

const pedidos = computed(() => [
  {
    concepto: props.pedido1Concepto,
    proveedor: props.pedido1Proveedor,
    idOferta: props.pedido1IdOferta,
    fechaOferta: props.pedido1FechaOferta,
    importeOferta: props.pedido1ImporteOferta,
    idPedido: props.pedido1IdPedido,
    fechaPedido: props.pedido1FechaPedido,
    importePedido: props.pedido1ImportePedido,
  },
  {
    concepto: props.pedido2Concepto,
    proveedor: props.pedido2Proveedor,
    idOferta: props.pedido2IdOferta,
    fechaOferta: props.pedido2FechaOferta,
    importeOferta: props.pedido2ImporteOferta,
    idPedido: props.pedido2IdPedido,
    fechaPedido: props.pedido2FechaPedido,
    importePedido: props.pedido2ImportePedido,
  },
  {
    concepto: props.pedido3Concepto,
    proveedor: props.pedido3Proveedor,
    idOferta: props.pedido3IdOferta,
    fechaOferta: props.pedido3FechaOferta,
    importeOferta: props.pedido3ImporteOferta,
    idPedido: props.pedido3IdPedido,
    fechaPedido: props.pedido3FechaPedido,
    importePedido: props.pedido3ImportePedido,
  },
  {
    concepto: props.pedido4Concepto,
    proveedor: props.pedido4Proveedor,
    idOferta: props.pedido4IdOferta,
    fechaOferta: props.pedido4FechaOferta,
    importeOferta: props.pedido4ImporteOferta,
    idPedido: props.pedido4IdPedido,
    fechaPedido: props.pedido4FechaPedido,
    importePedido: props.pedido4ImportePedido,
  },
  {
    concepto: props.pedido5Concepto,
    proveedor: props.pedido5Proveedor,
    idOferta: props.pedido5IdOferta,
    fechaOferta: props.pedido5FechaOferta,
    importeOferta: props.pedido5ImporteOferta,
    idPedido: props.pedido5IdPedido,
    fechaPedido: props.pedido5FechaPedido,
    importePedido: props.pedido5ImportePedido,
  },
])
</script>

<style scoped>
/* ========== CONTENEDOR PDF ========== */
.contenedor-pdf {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #333;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}

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
  padding: 12px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 20px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: center;
}

.subtitulo {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #666;
  text-align: center;
}

.logo {
  width: 120px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

/* ========== DATOS PRINCIPALES ========== */
.datos-principales {
  margin-bottom: 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  padding: 10px;
}

.fila-datos {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  }

  .fila-datos > .campo:first-child {
    flex: 0 0 60%;
  }
  .fila-datos > .campo:last-child {
    flex: 0 0 20%;
}

.fila-datos:last-child {
  margin-bottom: 0;
}

.campo {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.campo label {
  font-weight: bold;
  margin-right: 3px;
  min-width: 130px;
}

/* ========== PÁRRAFO CERTIFICADOR ========== */
.parrafo-certificador {
  margin: 15px 0;
  padding: 10px;
  background-color: #fffacd;
  border-left: 4px solid #ffcc00;
  font-size: 13px;
  line-height: 1.6;
  text-align: justify;
}

.parrafo-certificador p {
  margin: 0;
}

/* ========== TABLA DE PEDIDOS ========== */
.tabla-pedidos {
  margin: 15px 0;
  flex: 1;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  line-height: 1.6;
  border: 3px solid #009900;
}

thead {
  background-color: #00cc00;
  color: white;
  border: 3px solid #009900;
}

.header-grupo th {
  padding: 12px 8px;
  text-align: center;
  font-weight: bold;
  border: 2px solid #009900;
  font-size: 12px;
  background-color: #00cc00;
}

.grupo-ofertas {
  border-right: 3px solid #009900 !important;
}

th {
  padding: 10px 8px;
  text-align: left;
  font-weight: bold;
  border: 2px solid #009900;
  font-size: 9px;
  word-break: break-word;
  background-color: #00cc00;
  color: white;
}

/* Ancho de columnas */
th:nth-child(1) {
  width: 7%;
}
td:nth-child(1) {
  width: 7%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 20%;
}

th:nth-child(3),
td:nth-child(3),
th:nth-child(6),
td:nth-child(6) {
  width: 8%;
}

th:nth-child(4),
td:nth-child(4),
th:nth-child(7),
td:nth-child(7) {
  width: 8%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 8%;
}

th:nth-child(8),
td:nth-child(8) {
  width: 10%;
}

td {
  padding: 1px 5px;
  border: 2px solid #009900;
  height: auto;
  min-height: 55px;
  vertical-align: middle;
  font-size: 8px;
}

tbody tr:nth-child(even) {
  background-color: #e8f5e9;
}

td.numero {
  text-align: right;
}


/* ========== PIE DE DOCUMENTO ========== */
.pie-documento {
  margin-top: 5px;
  text-align: center;
}

.lugar-fecha {
  font-weight: bold;
  font-size: 13px;
}

.firma-seccion {
  display: flex;
  justify-content: center;
}

.firma-bloque {
  text-align: center;
  width: 200px;
}

.linea-firma {
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 8px;
}

.imagen-firma {
  height: 60px;
  object-fit: contain;
}

.etiqueta-firma {
  font-weight: bold;
  font-size: 12px;
  margin: 0;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  padding: 8px 0;
  border-top: 1px solid #0066cc;
  text-align: center;
  font-size: 11px;
  color: #000;
}

.texto-pie {
  margin: 0;
}

/* ========== MEDIA QUERIES ========== */
@media print {
  .contenedor-pdf {
    width: 210mm !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .contenedor-principal {
    padding: 20mm !important;
  }

  table {
    page-break-inside: avoid;
  }

  thead, th, .header-grupo th {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

@media screen {
  .contenedor-pdf {
    width: 100%;
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    min-height: 297mm;
  }
}
</style>
