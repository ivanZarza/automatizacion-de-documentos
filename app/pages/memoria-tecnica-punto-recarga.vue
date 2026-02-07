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
      <div class="seccion">
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
          <div class="etiqueta-grande">INSTALACIÓN:</div>
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
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">C</span> | PERSONA QUE FIRMA EL PRESENTE PROYECTO</div>
        
        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">NOMBRE TÉCNICO INSTALADOR:</div>
            <div class="valor">{{ nombreTecnicoInstalador }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">NÚMERO CERTIFICADO INSTALADOR:</div>
            <div class="valor valor-pequeno">{{ numeroCertificadoInstalador }}</div>
          </div>
        </div>

        <div class="cuerpo-seccion-borde">
          <div class="etiqueta">NÚMERO INSTALADOR EMPRESA:</div>
          <div class="valor">{{ numeroInstaladorEmpresa }}</div>
        </div>

        <div class="fila-grid fila-3col">
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">DOMICILIO:</div>
            <div class="valor">{{ domicilioTecnico }}</div>
          </div>
          <div class="celda celda-izquierda">
            <div class="etiqueta etiqueta-pequena">NÚMERO:</div>
            <div class="valor">{{ numeroTecnico }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta etiqueta-pequena">LOCALIDAD:</div>
            <div class="valor">{{ localidadTecnico }}</div>
          </div>
        </div>

        <div class="fila-grid fila-2col fila-sin-borde">
          <div class="celda celda-izquierda">
            <div class="etiqueta">CÓDIGO POSTAL:</div>
            <div class="valor">{{ codigoPostalTecnico }}</div>
          </div>
          <div class="celda">
            <div class="etiqueta">TELÉFONO:</div>
            <div class="valor">{{ telefonoTecnico }}</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN D: MODALIDADES -->
      <div class="seccion">
        <div class="encabezado-seccion"><span class="subseccion-titulo-span" style="background-color: #FFA02A;">D</span> | MODALIDADES DE INSTALACIÓN</div>
        
        <div class="cuerpo-seccion">
          <div class="etiqueta-grande">MODALIDADES BÁSICAS:</div>
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
          <div class="subseccion-titulo"><span class="subseccion-titulo-span">E.2</span> INFRAESTRUCTURA DE RECARGA</div>
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
</script>

<style scoped>
@import '~/app/styles/variables.css';

.contenedor-principal {
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  padding: 40px;
  color: #333;
}

.encabezado-documento-principal {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 3px solid #FFA02A;
  padding-bottom: 15px;
}

.titulo-encabezado {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.subtitulo-encabezado {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
}

.contenedor-contenido {
  margin-top: 20px;
}

.grid-expediente {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.caja-expediente {
  border: 2px solid #FFA02A;
  padding: 10px;
  border-radius: 5px;
}

.encabezado-caja {
  font-weight: bold;
  font-size: 12px;
  color: #FFA02A;
  margin-bottom: 5px;
}

.contenido-caja {
  font-size: 16px;
  color: #333;
  min-height: 30px;
}

.seccion {
  margin-bottom: 30px;
  border-left: 4px solid #FFA02A;
  padding-left: 15px;
}

.encabezado-seccion {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.subseccion-titulo-span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #FFA02A;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
}

.subseccion {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.subseccion-titulo {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.fila-grid {
  display: grid;
  gap: 15px;
  margin-bottom: 15px;
}

.fila-2col {
  grid-template-columns: 1fr 1fr;
}

.fila-3col {
  grid-template-columns: 1fr 1fr 1fr;
}

.fila-5col {
  grid-template-columns: repeat(5, 1fr);
}

.fila-sin-borde {
  margin-bottom: 0;
}

.celda {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
}

.celda-izquierda {
  border-right: 2px solid #ddd;
}

.etiqueta {
  font-weight: bold;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.etiqueta-pequena {
  font-size: 11px;
}

.etiqueta-grande {
  font-weight: bold;
  font-size: 13px;
  color: #333;
  margin-bottom: 10px;
}

.valor {
  font-size: 14px;
  color: #333;
  min-height: 20px;
}

.valor-pequeno {
  font-size: 12px;
}

.cuerpo-seccion {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 3px;
  margin-bottom: 15px;
}

.cuerpo-seccion-borde {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom: 15px;
  background-color: #fff;
}

.opciones-checkbox {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.opcion-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.opcion-checkbox input[type="checkbox"] {
  cursor: pointer;
}

.opcion-checkbox label {
  cursor: pointer;
  font-size: 13px;
}

.grid-modalidades {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.modalidad-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.modalidad-item input[type="checkbox"] {
  cursor: pointer;
}

.modalidad-item label {
  cursor: pointer;
  font-size: 12px;
  margin: 0;
}

.texto-protecciones {
  font-size: 13px;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.lista-protecciones {
  padding-left: 20px;
  font-size: 12px;
  line-height: 1.6;
  color: #333;
}

.lista-protecciones li {
  margin-bottom: 8px;
}

.tabla-circuitos {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 10px;
}

.tabla-circuitos thead {
  background-color: #FFA02A;
  color: white;
}

.tabla-circuitos th {
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
}

.tabla-circuitos td {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
}

.tabla-circuitos tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.campo-editable {
  min-height: 20px;
  color: #333;
}

.contenedor-esquema {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  border: 2px dashed #ddd;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
  margin-top: 15px;
}

.imagen-esquema {
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
}

.placeholder-esquema {
  color: #999;
  font-size: 16px;
  font-style: italic;
}

@media print {
  .contenedor-principal {
    padding: 0;
    background-color: #fff;
  }
}
</style>
