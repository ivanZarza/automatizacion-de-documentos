<template>
  <div data-pdf-content class="contenedor-principal">
    <!-- ENCABEZADO -->
    <div class="encabezado-documento-principal">
      <h1 class="titulo-encabezado">MEMORIA TÉCNICA DE DISEÑO</h1>
      <p class="subtitulo-encabezado">INSTALACIONES DE RECARGA DE VEHÍCULOS ELÉCTRICOS</p>
    </div>

    <div class="contenedor-contenido">
      <!-- NÚMERO DE EXPEDIENTE Y REGISTRO -->
      <div class="grid-expediente">
        <div class="caja-expediente">
          <div class="encabezado-caja">Nº EXPEDIENTE:</div>
          <div class="contenido-caja">{{ numeroExpediente }}</div>
        </div>
        <div class="caja-expediente">
          <div class="encabezado-caja">Nº REGISTRO DE LA INSTALACIÓN:</div>
          <div class="contenido-caja">{{ numeroRegistro }}</div>
        </div>
      </div>

      <!-- SECCIÓN A: TITULAR -->
      <div class="seccion" style="border-top: 1px solid #000;">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">A</span> | TITULAR</div>
        
        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">APELLIDOS Y NOMBRE/RAZÓN SOCIAL:</div>
            <div class="valor">{{ apellidosNombre }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">NIF/CIF:</div>
            <div class="valor">{{ nifCif }}</div>
          </div>
        </div>

        <div class="cuerpo-seccion-borde">
          <div class="etiqueta">DOMICILIO:</div>
          <div class="valor">{{ domicilio }}</div>
        </div>

        <div class="fila-grid fila-3col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">CÓDIGO POSTAL:</div>
            <div class="valor">{{ codigoPostal }}</div>
          </div>
          <div class="celda celda-izquierda">
            <div class="etiqueta">LOCALIDAD:</div>
            <div class="valor">{{ localidad }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">PROVINCIA:</div>
            <div class="valor">{{ provincia }}</div>
          </div>
        </div>

        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">CORREO ELECTRÓNICO:</div>
            <div class="valor valor-pequeno">{{ correoElectronico }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">TELÉFONO:</div>
            <div class="valor">{{ telefono }}</div>
          </div>
        </div>

        <div class="fila-grid fila-2col fila-sin-borde">
          <div class="celda celda-izquierda">
            <div class="etiqueta">REPRESENTANTE:</div>
            <div class="valor">{{ representante }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">DNI REPRESENTANTE:</div>
            <div class="valor">{{ dniRepresentante }}</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN B: EMPLAZAMIENTO -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">B</span> | EMPLAZAMIENTO DE LA INSTALACIÓN Y USO AL QUE SE DESTINA</div>
        
        <div class="cuerpo-seccion-borde">
          <div class="etiqueta">CALLE/AVENIDA:</div>
          <div class="valor">{{ emplazamientoCalle }}</div>
        </div>

        <div class="fila-grid fila-5col">
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">NÚMERO:</div>
            <div class="valor">{{ numero }}</div>
          </div>
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">BLOQUE:</div>
            <div class="valor">{{ bloque }}</div>
          </div>
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">ESCALERA:</div>
            <div class="valor">{{ escalera }}</div>
          </div>
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">PISO:</div>
            <div class="valor">{{ piso }}</div>
          </div>
        </div>

        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">LOCALIDAD:</div>
            <div class="valor">{{ localidadEmplazamiento }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">PROVINCIA:</div>
            <div class="valor">{{ provinciaEmplazamiento }}</div>
          </div>
        </div>

        <div class="cuerpo-seccion-borde">
          <div class="etiqueta">CORREO ELECTRÓNICO EMPLAZAMIENTO:</div>
          <div class="valor valor-pequeno">{{ correoElectronicoEmplazamiento }}</div>
        </div>

        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">TIPO DE INSTALACIÓN:</div>
            <div class="valor">Punto de Recarga de Vehículos Eléctricos</div>
          </div>
          <div class="celda">
            <div class="etiqueta">USO A QUE SE DESTINA:</div>
            <div class="valor">Carga de Vehículos Eléctricos</div>
          </div>
        </div>

        <div class="cuerpo-seccion">
          <div class="etiqueta-grande" style="border-bottom: none">INSTALACIÓN:</div>
          <div class="opciones-checkbox">
            <div class="opcion-checkbox">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Nueva'" @change="tipoInstalacionSeleccionada = 'Nueva'">
              <label>Nueva</label>
            </div>
            <div class="opcion-checkbox">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Ampliación'" @change="tipoInstalacionSeleccionada = 'Ampliación'">
              <label>Ampliación</label>
            </div>
            <div class="opcion-checkbox">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Modificación'" @change="tipoInstalacionSeleccionada = 'Modificación'">
              <label>Modificación</label>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN C: PERSONA QUE FIRMA -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">C</span> | IDENTIFICACIÓN DE LA PERSONA QUE FIRMA LA MTD</div>
        
        <!-- Técnico Instalador Autorizado -->
        <div class="subseccion">
          <div class="etiqueta-grande">MEMORIA REALIZADA POR INSTALADOR ELÉCTRICO AUTORIZADO:</div>
          
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">NOMBRE:</div>
              <div class="valor">{{ nombreTecnicoInstalador }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">Nº DE CERTIFICADO DE CUALIFICACIÓN INDIVIDUAL:</div>
              <div class="valor">{{ numeroCertificadoInstalador }}</div>
            </div>
          </div>

          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">Nº DE INSTALADOR ELÉCTRICO AUTORIZADO (empresa):</div>
              <div class="valor">{{ numeroInstaladorEmpresa }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">DOMICILIO (calle o plaza):</div>
              <div class="valor">{{ domicilioTecnico }}</div>
            </div>
          </div>

          <div class="fila-grid fila-3col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">NÚMERO:</div>
              <div class="valor">{{ numeroTecnico }}</div>
            </div>
            <div class="celda celda-izquierda">
              <div class="etiqueta">LOCALIDAD:</div>
              <div class="valor">{{ localidadTecnico }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">C.P.:</div>
              <div class="valor">{{ codigoPostalTecnico }}</div>
            </div>
          </div>

          <div class="cuerpo-seccion">
            <div class="etiqueta">TELÉFONO:</div>
            <div class="valor">{{ telefonoTecnico }}</div>
          </div>
        </div>

        <!-- Técnico Competente -->
        <div class="subseccion">
          <div class="fila-checkbox">
            <input type="checkbox" style="width: 14px; height: 14px; cursor: pointer;">
            <span>MEMORIA REALIZADA POR TÉCNICO COMPETENTE:</span>
          </div>
          
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">NOMBRE:</div>
              <div class="valor valor-grande">{{ nombreTecnicoCompetente }}</div>
            </div>
            <div class="celda valor-grande">
              <div class="etiqueta">DOMICILIO (calle o plaza):</div>
              <div class="valor valor-grande">{{ domicilioTecnicoCompetente }}</div>
            </div>
          </div>

          <div class="fila-grid fila-3col">
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">NÚMERO:</div>
              <div class="valor valor-grande">{{ numeroTecnicoCompetente }}</div>
            </div>
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">LOCALIDAD:</div>
              <div class="valor valor-grande">{{ localidadTecnicoCompetente }}</div>
            </div>
            <div class="celda valor-grande">
              <div class="etiqueta">C.P.:</div>
              <div class="valor valor-grande">{{ codigoPostalTecnicoCompetente }}</div>
            </div>
          </div>

          <div class="cuerpo-seccion" style="border-bottom: none;">
            <div class="etiqueta">TELÉFONO:</div>
            <div class="valor valor-grande">{{ telefonoTecnicoCompetente }}</div>
          </div>
        </div>

        <!-- Colegio Oficial -->
        <div class="subseccion" style="border-bottom: none;">
          <div class="fila-grid fila-2col fila-sin-borde">
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">COLEGIO OFICIAL:</div>
              <div class="valor valor-grande">{{ colegioOficial }}</div>
            </div>
            <div class="celda valor-grande">
              <div class="etiqueta">Nº DE COLEGIADO:</div>
              <div class="valor valor-grande">{{ numeroColegiado }}</div>
            </div>
          </div>
        </div>

        <!-- Firma y Fecha -->
        <div class="seccion-firma">
          <div class="fecha-firma">En Sevilla a {{ generatedDate }}</div>
          <div class="imagen-firma">
            <img src="/firma-solay.png" alt="Firma" style="height: 60px; object-fit: contain;" />
          </div>
          <div class="nombre-firmante">Firma del Instalador Autorizado / Técnico Titulado</div>
        </div>

        <div class="nota-legal">
          <p>(Cuando la MTD sea firmado por Técnico Titulado vendrá sellada por el Colegio Oficial)</p>
        </div>
      </div>

      <!-- SECCIÓN D: MODALIDADES -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">D</span> | MODALIDADES DE INSTALACIÓN</div>
        
        <div class="cuerpo-seccion">
          <div class="etiqueta-grande" style="border-bottom: none;">MODALIDADES BÁSICAS:</div>
          <div class="grid-modalidades">
            <div class="modalidad-item">
              <input type="checkbox" v-model="modalidadBasicaM1" id="m1">
              <label for="m1">M1. Instalaciones de potencia instalada ≤ 10 kW</label>
            </div>
            <div class="modalidad-item">
              <input type="checkbox" v-model="modalidadBasicaM2" id="m2">
              <label for="m2">M2. Instalaciones de potencia instalada entre 10 < P ≤ 50 kW</label>
            </div>
            <div class="modalidad-item">
              <input type="checkbox" v-model="modalidadBasicaM3" id="m3">
              <label for="m3">M3. Instalaciones de potencia instalada > 50 kW</label>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN E: INSTALACIÓN PARA LA RECARGA DE VEHÍCULO ELÉCTRICO -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">E</span> | INSTALACIÓN PARA LA RECARGA DE VEHÍCULO ELÉCTRICO</div>
        
        <!-- E.1 CARGADOR -->
        <div class="subseccion">
          <div class="subseccion-titulo"><span class="subseccion-titulo-span">E.1</span> CARGADOR</div>
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">MARCA:</div>
              <div class="valor">{{ cargadorMarca }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">MODELO:</div>
              <div class="valor">{{ cargadorModelo }}</div>
            </div>
          </div>
          <div class="fila-grid fila-2col fila-sin-borde">
            <div class="celda celda-izquierda">
              <div class="etiqueta">NÚMERO/CAPACIDAD DE LA CONEXIÓN:</div>
              <div class="valor">{{ cargadorNumeroCapacidad }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">TIPO DE CABLE:</div>
              <div class="valor">{{ cargadorTipoCable }}</div>
            </div>
          </div>
        </div>

        <!-- E.2 INFRAESTRUCTURA DE RECARGA -->
        <div class="subseccion">
          <div class="subseccion-titulo" style="border-top: 1px solid #000;"><span class="subseccion-titulo-span">E.2</span> INFRAESTRUCTURA DE RECARGA</div>
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">NÚMERO DE PUNTOS DE CARGA:</div>
              <div class="valor">{{ numeroPuntosRecarga }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">MONOFÁSICA / TRIFÁSICA:</div>
              <div class="valor">{{ trifasica ? 'TRIFÁSICA' : 'MONOFÁSICA' }}</div>
            </div>
          </div>
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">POTENCIA INSTALADA TOTAL (kW):</div>
              <div class="valor">{{ potenciaInstalada }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">POTENCIA PREVISTA TOTAL (kW):</div>
              <div class="valor">{{ potenciaPrevisita }}</div>
            </div>
          </div>
          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">TIPO DE INSTALACIÓN:</div>
              <div class="valor">{{ tipoInstalacionRecarga }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">MODO DE CARGA:</div>
              <div class="valor">{{ modoCarga }}</div>
            </div>
          </div>
          <div class="cuerpo-seccion-borde">
            <div class="etiqueta">TIPO DE CONECTOR:</div>
            <div class="valor">{{ tipoConector }}</div>
          </div>
        </div>

        <!-- E.3 CUADRO DE MANDO Y PROTECCIÓN -->
        <div class="subseccion">
          <div class="subseccion-titulo"><span class="subseccion-titulo-span">E.3</span> CUADRO DE MANDO Y PROTECCIÓN</div>
          <p class="texto-protecciones">Protecciones de cabecera en la línea de alimentación del cargador de VE de acuerdo con ITC BT 52:</p>
          <ul class="lista-protecciones">
            <li><strong>INTERRUPTOR GENERAL MAGNETOTÉRMICO {{ interruptorGeneralAmperaje }} A:</strong> Con protección contra sobretensiones temporales/permanentes en el mismo dispositivo. Este será situado en cabecera con el fin de proteger la instalación contra sobrecargas y cortocircuitos. El calibre será seleccionado y calculado en base al circuito que proteja. Se instalará uno por línea de curva C.</li>
            <li><strong>INTERRUPTOR DIFERENCIAL CLASE A SUPER INMUNIZADO {{ interruptorDiferencialAmperaje }} A {{ interruptorDiferencialSensibilidad }} mA:</strong> Irá situado en cabecera con el fin de proteger a la instalación y a las personas de posibles derivaciones directas o indirectas. Se instalará uno por línea de clase A y {{ interruptorDiferencialSensibilidad }} mA</li>
            <li><strong>DESCARGADOR DE SOBRETENSIONES TRANSITORIAS:</strong> Con el fin de proteger a los equipos y la instalación contra sobretensiones transitorias inducidas tipo 1 y tipo 2 por descargas atmosféricas en cabecera (CGMP) y no siendo superior la distancia a los puntos de recarga a 10 m</li>
            <li><strong>PUESTA A TIERRA:</strong> {{ puestaATierra }}</li>
          </ul>
        </div>
      </div>

      <!-- SECCIÓN F: CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">F</span> | CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS</div>
        
        <div class="cuerpo-seccion" style="overflow-x: auto;">
          <table class="tabla-circuitos">
            <thead>
              <tr>
                <th>PARTE DE LA INSTALACIÓN</th>
                <th>POTENCIA PREVISTA (kW)</th>
                <th>LONGITUD (m)</th>
                <th>MATERIAL CONDUCTOR/SECCIÓN (mm²)</th>
                <th>INTENSIDAD ADMISIBLE (A)</th>
                <th>CAÍDA DE TENSIÓN (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cuadro Principal - Cargador VE</td>
                <td class="campo-editable">{{ potenciaPrevistaCuadroPrincipal }}</td>
                <td class="campo-editable">{{ longitudCuadroPrincipal }}</td>
                <td class="campo-editable">{{ materialConductor }}</td>
                <td class="campo-editable">{{ intensidadAdmisible }}</td>
                <td class="campo-editable">{{ caidaTension }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECCIÓN G: ESQUEMA UNIFILAR -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">G</span> | ESQUEMA UNIFILAR DE LA INSTALACIÓN (PROTECCIONES INCLUIDAS)</div>
        
        <div class="contenedor-esquema">
          <img v-if="esquemaUnifilar" :src="esquemaUnifilar" class="imagen-esquema" />
          <div v-else class="placeholder-esquema">Esquema eléctrico unifilar de la instalación</div>
        </div>
      </div>

      <!-- SECCIÓN H: PLANO DE EMPLAZAMIENTO -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">H</span> | PLANO DE EMPLAZAMIENTO Y CROQUIS DE ACCESO</div>
        
        <div class="contenedor-esquema">
          <img v-if="planoEmplazamiento" :src="planoEmplazamiento" class="imagen-esquema" />
          <div v-else class="placeholder-esquema">Plano de emplazamiento y acceso a la instalación</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { memoriaTecnicaPuntoRecargaConfig } from '../app/config/documents.js'

// Datos reactivos
const numeroExpediente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroExpediente)
const numeroRegistro = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroRegistro)
const apellidosNombre = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.apellidosNombre)
const nifCif = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.nifCif)
const domicilio = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.domicilio)
const codigoPostal = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.codigoPostal)
const localidad = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.localidad)
const provincia = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.provincia)
const correoElectronico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.correoElectronico)
const telefono = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.telefono)
const representante = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.representante)
const dniRepresentante = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.dniRepresentante)
const emplazamientoCalle = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.emplazamientoCalle)
const numero = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numero)
const bloque = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.bloque)
const escalera = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.escalera)
const piso = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.piso)
const localidadEmplazamiento = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.localidadEmplazamiento)
const provinciaEmplazamiento = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.provinciaEmplazamiento)
const correoElectronicoEmplazamiento = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.correoElectronicoEmplazamiento)
const tipoInstalacionSeleccionada = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.tipoInstalacionSeleccionada)
const nombreTecnicoInstalador = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.nombreTecnicoInstalador)
const numeroCertificadoInstalador = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroCertificadoInstalador)
const numeroInstaladorEmpresa = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroInstaladorEmpresa)
const domicilioTecnico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.domicilioTecnico)
const numeroTecnico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroTecnico)
const localidadTecnico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.localidadTecnico)
const codigoPostalTecnico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.codigoPostalTecnico)
const telefonoTecnico = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.telefonoTecnico)
const nombreTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.nombreTecnicoCompetente)
const domicilioTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.domicilioTecnicoCompetente)
const numeroTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroTecnicoCompetente)
const localidadTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.localidadTecnicoCompetente)
const codigoPostalTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.codigoPostalTecnicoCompetente)
const telefonoTecnicoCompetente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.telefonoTecnicoCompetente)
const colegioOficial = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.colegioOficial)
const numeroColegiado = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroColegiado)
const modalidadBasicaM1 = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.modalidadBasicaM1)
const modalidadBasicaM2 = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.modalidadBasicaM2)
const modalidadBasicaM3 = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.modalidadBasicaM3)
const cargadorMarca = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.cargadorMarca)
const cargadorModelo = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.cargadorModelo)
const cargadorNumeroCapacidad = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.cargadorNumeroCapacidad)
const cargadorTipoCable = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.cargadorTipoCable)
const numeroPuntosRecarga = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroPuntosRecarga)
const monofasica = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.monofasica)
const trifasica = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.trifasica)
const potenciaInstalada = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.potenciaInstalada)
const potenciaPrevisita = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.potenciaPrevisita)
const tipoInstalacionRecarga = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.tipoInstalacionRecarga)
const modoCarga = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.modoCarga)
const tipoConector = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.tipoConector)
const interruptorGeneralAmperaje = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.interruptorGeneralAmperaje)
const interruptorDiferencialAmperaje = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.interruptorDiferencialAmperaje)
const interruptorDiferencialSensibilidad = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.interruptorDiferencialSensibilidad)
const descargadorSobretensiones = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.descargadorSobretensiones)
const puestaATierra = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.puestaATierra)
const potenciaPrevistaCuadroPrincipal = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.potenciaPrevistaCuadroPrincipal)
const longitudCuadroPrincipal = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.longitudCuadroPrincipal)
const materialConductor = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.materialConductor)
const intensidadAdmisible = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.intensidadAdmisible)
const caidaTension = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.caidaTension)
const esquemaUnifilar = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.esquemaUnifilar)
const planoEmplazamiento = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.planoEmplazamiento)

// Fecha generada
const generatedDate = ref(new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }))
</script>

<style scoped>
@import '../styles/variables.css';

/* ========== CONTENEDOR PRINCIPAL ========== */
.contenedor-principal {
  width: 100%;
  max-width: 21cm;
  margin: 0 auto;
  background-color: #fff;
  font-family: Arial, sans-serif;
  color: #000;
  overflow-x: hidden;
}

/* ========== ENCABEZADO DEL DOCUMENTO ========== */
.encabezado-documento-principal {
  padding: 12px 20px;
  text-align: center;
  border-bottom: 2px solid #000;
}

.titulo-encabezado {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.subtitulo-encabezado {
  margin: 5px 0 0 0;
  font-size: 11px;
  color: #000;
}

/* ========== CONTENEDOR DE CONTENIDO ========== */
.contenedor-contenido {
  padding: 12px 20px;
}

/* ========== GRID DE EXPEDIENTE Y REGISTRO ========== */
.grid-expediente {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #000;
  margin-bottom: 5px;
}

.caja-expediente {
  border-right: 1px solid #000;
  text-align: center;
}

.caja-expediente:last-child {
  border-right: none;
}

.encabezado-caja {
  background-color: var(--color-orange-medium-strong);
  font-weight: bold;
  font-size: 10px;
    padding: 5px;

}

.contenido-caja {
  font-size: 11px;
  color: #000;
  min-height: 20px;
}

/* ========== SECCIONES PRINCIPALES ========== */
.seccion {
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #000;
}

.encabezado-seccion {
  font-weight: bold;
  background-color: var(--color-orange-medium-strong);
  padding: 5px 5px;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  font-size: 11px;
}

.subseccion-titulo-span {
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 5px;
  color: #000;
  font-weight: bold;
}

/* ========== FILAS GRID ========== */
.fila-grid {
  display: grid;
  border-bottom: 1px solid #000;
}

.fila-2col {
  grid-template-columns: 1fr 1fr;
}

.fila-3col {
  grid-template-columns: repeat(3, 1fr);
}

.fila-5col {
  grid-template-columns: repeat(5, 1fr);
}

.fila-6col {
  grid-template-columns: repeat(6, 1fr);
}

.fila-sin-borde {
  border-bottom: none;
}

/* ========== CELDAS ========== */
.celda {
  padding: 1px 0px 0px 4px;
}

.celda-izquierda {
  border-right: 1px solid #000;
}

.celda-encabezado {
  text-align: center;
}

/* ========== TIPOGRAFÍA Y CONTENIDO ========== */
.etiqueta {
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 1px;
}

.etiqueta-pequena {
  font-size: 9px;
}

.etiqueta-grande {
  font-weight: bold;
  font-size: 11px;
  border-bottom: 1px solid #000;
  padding: 3px;
}

.valor {
  color: #000;
  min-height: 20px;
  font-size: 10px;
}

.valor-pequeno {
  font-size: 9px;
}

.valor-grande {
  color: #000;
  min-height: 40px;
}

/* ========== SUBSECCIONES E1, E2, E3, etc. ========== */
.subseccion {
  border-bottom: 0 solid #000;
}

.subseccion-titulo {
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding: 5px 5px;
  background-color: #FFCC99;
  color: rgb(0, 0, 0);
  font-size: 11px;
}

/* ========== TÍTULO DE SUBSECCIONES PRINCIPALES ========== */
.titulo-subseccion-principal {
  font-weight: bold;
  background-color: #ffb061;
  padding: 5px 5px;
  border-bottom: 1px solid #000;
}

/* ========== ELEMENTOS ESPECIALES ========== */
.fila-checkbox {
  display: flex;
  align-items: center;
  gap: 0px 8px;
  font-weight: bold;
  font-size: 11px;
  border-bottom: 1px solid #000;
  padding: 4px;
}

.opciones-checkbox {
  display: flex;
  gap: 20px;
  margin-bottom: 3px;
}

.opcion-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}

.opcion-checkbox input {
  cursor: pointer;
}

.opcion-checkbox label {
  cursor: pointer;
  font-size: 10px;
}

.grid-modalidades {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;}

.modalidad-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
}

.modalidad-item input[type="checkbox"] {
  cursor: pointer;
  flex-shrink: 0;
}

.modalidad-item label {
  cursor: pointer;
  font-size: 10px;
  margin: 0;
  line-height: 1.3;
}

.cuerpo-seccion {
  padding: 0px;
}

.cuerpo-seccion-borde {
  border-bottom: 1px solid #000;
}

.seccion-firma {
  text-align: center;
  border-top: 1px solid #000;
  margin-top: 20px;
  padding-top: 15px;
}

.fecha-firma {
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 10px;
}

.imagen-firma {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.nombre-firmante {
  font-weight: bold;
  font-size: 10px;
  border-top: 1px solid #000;
  padding-top: 5px;
}

.nota-legal {
  padding: 3px;
  text-align: center;
  font-size: 9px;
  color: #000;
}

.nota-legal p {
  margin: 4px 0;
}

/* ========== CAMPOS ESPECIALES ========== */
.campo-solo-lectura {
  color: #000;
  font-weight: normal;
}

.campo-editable {
  color: #000;
  font-size: 10px;
}

.tabla-contenedor {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}

.tabla-contenedor tr {
  border: 1px solid #000;
}

.tabla-contenedor th,
.tabla-contenedor td {
  border: 1px solid #000;
  padding: 4px;
  background-color: #f0f0f0;
}

/* ========== TABLA DE PROTECCIONES (Sección F) ========== */
.tabla-protecciones {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}

.tabla-protecciones tr {
  border: 1px solid #000;
}

.tabla-protecciones th,
.tabla-protecciones td {
  border: 1px solid #000;
  padding: 4px;
}

.tabla-protecciones th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.otras-medidas-proteccion {
  margin-top: 10px;
  padding: 5px;
  background-color: #fff9f7;
  border: 1px solid #f4b5a0;
}

.texto-protecciones {
  font-size: 10px;
  color: #000;
  margin-bottom: 3px;
  font-weight: bold;
  padding: 3px;
}

.lista-protecciones {
  padding-left: 20px;
  font-size: 10px;
  line-height: 1.4;
  color: #000;
}

.lista-protecciones li {
  margin-bottom: 3px;
}

/* ========== TABLA DE CIRCUITOS (Sección G) ========== */
.tabla-circuitos {
  width: 100%;
  border-collapse: collapse;
  font-size: 9px;
}

.tabla-circuitos tr {
  border: 1px solid #000;
}

.tabla-circuitos th,
.tabla-circuitos td {
  border: 1px solid #000;
  padding: 4px;
}

.tabla-circuitos th {
  background-color: #f0f0f0;
  font-weight: bold;
}

/* ========== CONTENEDORES DE ESQUEMAS (Secciones H, I) ========== */
.contenedor-esquema {
  border: 2px dashed #000;
  text-align: center;
  background-color: #fff9f7;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagen-esquema {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.placeholder-esquema {
  color: #999;
  font-size: 12px;
}

/* ========== PIE DE PÁGINA ========== */
.pie-pagina {
  margin-top: 30px;
  padding: 10px;
  border-top: 2px solid var(--color-orange-medium-strong);
  text-align: center;
  font-size: 9px;
  color: #000;
}

/* ========== GRID DE CHECKBOXES (Sección D) ========== */
.grid-checkboxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.item-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
}

.item-checkbox input {
  cursor: pointer;
  flex-shrink: 0;
}

.item-checkbox span {
  line-height: 1.3;
}

/* ========== ESTILOS DE IMPRESIÓN ========== */
@media print {
  div[data-pdf-content] {
    width: 210mm;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
  
  button {
    display: none;
  }
  
  /* Forzar impresión de colores */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* Evitar que se corten las secciones entre páginas */
  .seccion {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .subseccion {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  /* Forzar salto de página antes de E1.7 para evitar cortes */
  .subseccion-e1-7 {
    page-break-inside: avoid;
    break-inside: avoid;
    page-break-before: always;
    margin-top: 20px;
  }
  
  .subseccion-e2 {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .fila-grid {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .tabla-protecciones,
  .tabla-circuitos {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .contenedor-esquema {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  /* Permitir saltos de página antes de secciones principales */
  .encabezado-seccion {
    page-break-before: auto;
    orphans: 3;
    widows: 3;
  }
}
</style>
