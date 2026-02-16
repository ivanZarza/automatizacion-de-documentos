<template>
  <div data-pdf-content class="contenedor-principal">
    <!-- ENCABEZADO -->
    <div class="encabezado-documento-principal">
      <h1 class="titulo-encabezado">MEMORIA TÉCNICA DE DISEÑO</h1>
      <p class="subtitulo-encabezado">
        INSTALACIONES FOTOVOLTAICAS EN BAJA TENSIÓN
      </p>
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
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >A</span
          >
          | TITULAR
        </div>

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
          <div class="valor">{{ domicilio }} {{ numero }}</div>
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
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >B</span
          >
          | EMPLAZAMIENTO DE LA INSTALACIÓN Y USO AL QUE SE DESTINA
        </div>

        <div class="cuerpo-seccion-borde">
          <div class="etiqueta">EMPLAZAMIENTO:</div>
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
<<<<<<< HEAD
          <div class="celda">
=======
                    <div class="celda celda-izquierda">
>>>>>>> e7d0b97
            <div class="etiqueta etiqueta-pequena">PUERTA:</div>
            <div class="valor">{{ puerta }}</div>
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
<<<<<<< HEAD
          <div class="etiqueta">CORREO ELECTRÓNICO</div>
=======
          <div class="etiqueta">CORREO ELECTRÓNICO:</div>
>>>>>>> e7d0b97
          <div class="valor valor-pequeno">
            {{ correoElectronicoEmplazamiento }}
          </div>
        </div>

        <div class="fila-grid fila-2col">
          <div class="celda celda-izquierda">
            <div class="etiqueta">TIPO DE INSTALACIÓN:</div>
            <div class="valor">Fotovoltaica conectada a red interior</div>
          </div>
          <div class="celda">
            <div class="etiqueta">USO AL QUE SE DESTINA:</div>
            <div class="valor">Autoconsumo para vivienda</div>
          </div>
        </div>

        <div class="cuerpo-seccion">
          <div class="etiqueta-grande">INSTALACIÓN:</div>
          <div class="opciones-checkbox">
            <div class="opcion-checkbox">
              <input
                type="checkbox"
                :checked="tipoInstalacionSeleccionada === 'Nueva'"
                @change="tipoInstalacionSeleccionada = 'Nueva'"
              />
              <label>Nueva</label>
            </div>
            <div class="opcion-checkbox">
              <input
                type="checkbox"
                :checked="tipoInstalacionSeleccionada === 'Ampliación'"
                @change="tipoInstalacionSeleccionada = 'Ampliación'"
              />
              <label>Ampliación</label>
            </div>
            <div class="opcion-checkbox">
              <input
                type="checkbox"
                :checked="tipoInstalacionSeleccionada === 'Modificación'"
                @change="tipoInstalacionSeleccionada = 'Modificación'"
              />
              <label>Modificación</label>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN C: PERSONA QUE FIRMA -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >C</span
          >
          | IDENTIFICACIÓN DE LA PERSONA QUE FIRMA LA MTD
        </div>

        <!-- Técnico Instalador Autorizado -->
        <div class="subseccion">
          <div class="etiqueta-grande">
            MEMORIA REALIZADA POR INSTALADOR ELÉCTRICO AUTORIZADO:
          </div>

          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">NOMBRE:</div>
              <div class="valor">{{ nombreTecnicoInstalador }}</div>
            </div>
            <div class="celda">
              <div class="etiqueta">
                Nº DE CERTIFICADO DE CUALIFICACIÓN INDIVIDUAL:
              </div>
              <div class="valor">{{ numeroCertificadoInstalador }}</div>
            </div>
          </div>

          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda">
              <div class="etiqueta">
                Nº DE INSTALADOR ELÉCTRICO AUTORIZADO (empresa):
              </div>
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
        <!-- <div class="subseccion">
          <div class="fila-checkbox">
            <input
              type="checkbox"
              style="width: 14px; height: 14px; cursor: pointer"
            />
            <span>MEMORIA REALIZADA POR TÉCNICO COMPETENTE:</span>
          </div>

          <div class="fila-grid fila-2col">
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">NOMBRE:</div>
              <div class="valor valor-grande">
                {{ nombreTecnicoCompetente }}
              </div>
            </div>
            <div class="celda valor-grande">
              <div class="etiqueta">DOMICILIO (calle o plaza):</div>
              <div class="valor valor-grande">
                {{ domicilioTecnicoCompetente }}
              </div>
            </div>
          </div>

          <div class="fila-grid fila-3col">
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">NÚMERO:</div>
              <div class="valor valor-grande">
                {{ numeroTecnicoCompetente }}
              </div>
            </div>
            <div class="celda celda-izquierda valor-grande">
              <div class="etiqueta">LOCALIDAD:</div>
              <div class="valor valor-grande">
                {{ localidadTecnicoCompetente }}
              </div>
            </div>
            <div class="celda valor-grande">
              <div class="etiqueta">C.P.:</div>
              <div class="valor valor-grande">
                {{ codigoPostalTecnicoCompetente }}
              </div>
            </div>
          </div>

          <div class="cuerpo-seccion" style="border-bottom: none">
            <div class="etiqueta">TELÉFONO:</div>
            <div class="valor valor-grande">
              {{ telefonoTecnicoCompetente }}
            </div>
          </div>
        </div>

        <!-- Colegio Oficial 
        <div class="subseccion" style="border-bottom: none">
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
        </div> -->

        <!-- Firma y Fecha -->
        <div class="seccion-firma">
          <div class="fecha-firma">En Sevilla a {{ generatedDate }}</div>
          <div class="imagen-firma">
            <img
              src="/firma-solay.png"
              alt="Firma"
              style="height: 60px; object-fit: contain"
            />
          </div>
          <div class="nombre-firmante">
            Firma del Instalador Autorizado / Técnico Titulado
          </div>
        </div>

        <div class="nota-legal">
          <p>
            (Cuando la MTD sea firmado por Técnico Titulado vendrá sellada por
            el Colegio Oficial)
          </p>
        </div>
      </div>

      <!-- SECCIÓN D: CATEGORÍA Y ESPECIALIDAD -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >D</span
          >
          | CATEGORÍA Y ESPECIALIDAD DEL INSTALADOR
        </div>

        <!-- BÁSICA -->
        <div class="cuerpo-seccion" style="border-bottom: 1px solid #000">
          <div class="etiqueta-grande">CATEGORÍA BÁSICA:</div>
          <div class="grid-checkboxes">
            <div class="item-checkbox">
              <input type="checkbox" :checked="modalidadBasicaM1" disabled />
              <span>M1 - Instalaciones en viviendas (hasta 10kWp)</span>
            </div>
            <div class="item-checkbox">
              <input type="checkbox" :checked="modalidadBasicaM2" disabled />
              <span>M2 - Instalaciones en pequeño comercio (hasta 15kWp)</span>
            </div>
            <div class="item-checkbox">
              <input type="checkbox" :checked="modalidadBasicaM3" disabled />
              <span>M3 - Instalaciones con almacenamiento (hasta 10kWp)</span>
            </div>
          </div>
        </div>

        <!-- ESPECIALISTA -->
        <div class="cuerpo-seccion">
          <div class="etiqueta-grande">CATEGORÍA ESPECIALISTA:</div>
          <div class="grid-checkboxes">
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM4"
                disabled
              />
              <span>M4 - Pequeña potencia (15-100kWp)</span>
            </div>
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM5"
                disabled
              />
              <span>M5 - Mediana potencia (100-500kWp)</span>
            </div>
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM6"
                disabled
              />
              <span>M6 - Gran potencia (&gt;500kWp)</span>
            </div>
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM7"
                disabled
              />
              <span>M7 - Almacenamiento (15-100kWp)</span>
            </div>
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM8"
                disabled
              />
              <span>M8 - Almacenamiento mediano (100-500kWp)</span>
            </div>
            <div class="item-checkbox">
              <input
                type="checkbox"
                :checked="modalidadEspecialistaM9"
                disabled
              />
              <span>M9 - Almacenamiento gran escala (&gt;500kWp)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <!-- SECCIÓN E: MEMORIA DESCRIPTIVA -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >E</span
          >
          | MEMORIA DESCRIPTIVA
        </div>

        <!-- E1: INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA 
        <div class="cuerpo-seccion">
          <div class="titulo-subseccion-principal">
            <span class="subseccion-titulo-span">E1</span>. INSTALACIÓN
            GENERADORA FOTOVOLTAICA AISLADA
          </div>
-->
          <!-- E1.1 Módulo Fotovoltaico 
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.1</span> MÓDULO
              FOTOVOLTAICO
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TECNOLOGÍA DE LA CÉLULA:</div>
                <div class="valor">{{ e1_tecnologiaCelulaModulo }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ e1_marcaModeloModulo }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA PICO (Wp):</div>
                <div class="valor">{{ e1_potenciaPicoModulo }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TONC (ºC):</div>
                <div class="valor">{{ e1_toncModulo }}</div>
              </div>
            </div>
          </div>
 -->
          <!-- E1.2 Generador Fotovoltaico
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.2</span> GENERADOR
              FOTOVOLTAICO
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA PICO (Wp):</div>
                <div class="valor">{{ e1_potenciaPicoGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">
                  INTENSIDAD MÁXIMA POTENCIA, Ipmp (A):
                </div>
                <div class="valor">{{ e1_intensidadIpmpGenerador }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN MÁXIMA POTENCIA, Vpmp (V):</div>
                <div class="valor">{{ e1_tensionVpmpGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">ORIENTACIÓN:</div>
                <div class="valor">{{ e1_orientacionGenerador }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">INCLINACIÓN (º):</div>
                <div class="valor">{{ e1_inclinacionGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">Nº TOTAL MÓDULOS:</div>
                <div class="valor">{{ e1_totalModulos }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">Nº MÓDULOS EN SERIE:</div>
                <div class="valor">{{ e1_modulosEnSerie }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">Nº RAMAS EN PARALELO:</div>
                <div class="valor">{{ e1_ramasEnParalelo }}</div>
              </div>
            </div>
          </div>
-->
          <!-- E1.3 Baterías 
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.3</span> BATERÍAS
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ e1_marcaModeloBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TIPO DE BATERÍA:</div>
                <div class="valor">{{ e1_tipoBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TIPO DE PLACA:</div>
                <div class="valor">{{ e1_tipoPlacaBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">C10 (Ah):</div>
                <div class="valor">{{ e1_c10Bateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">C100 (Ah):</div>
                <div class="valor">{{ e1_c100Bateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN NOMINAL (V):</div>
                <div class="valor">{{ e1_tensionNominalBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">PROFUNDIDAD DESCARGA:</div>
                <div class="valor">{{ e1_profundidadDescargaBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN MÁXIMA (V):</div>
                <div class="valor">{{ e1_tensionMaximaBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN MÍNIMA (V):</div>
                <div class="valor">{{ e1_tensionMinimaBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">INTENSIDAD MÁX CARGA (A):</div>
                <div class="valor">{{ e1_intensidadMaximaCargaBateria }}</div>
              </div>
            </div>
          </div>
 -->
          <!-- E1.4 Regulador
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.4</span> REGULADOR
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ e1_marcaModeloRegulador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">INTENSIDAD MÁXIMA (A):</div>
                <div class="valor">{{ e1_intensidadMaximaRegulador }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN CORTE ALTA (V):</div>
                <div class="valor">{{ e1_tensionCorteAltaRegulador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN CORTE BAJA (V):</div>
                <div class="valor">{{ e1_tensionCorteBajaRegulador }}</div>
              </div>
            </div>
          </div>
-->
          <!-- E1.5 Inversor 
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.5</span> INVERSOR
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ e1_marcaModeloInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">POTENCIA NOMINAL (W):</div>
                <div class="valor">{{ e1_potenciaNominalInversor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-5col">
              <div class="celda celda-izquierda">
                <div class="etiqueta-rendimiento">REND 10%:</div>
                <div class="valor">{{ e1_rendimientoInversor10 }}</div>
              </div>
              <div class="celda celda-izquierda">
                <div class="etiqueta-rendimiento">REND 25%:</div>
                <div class="valor">{{ e1_rendimientoInversor25 }}</div>
              </div>
              <div class="celda celda-izquierda">
                <div class="etiqueta-rendimiento">REND 50%:</div>
                <div class="valor">{{ e1_rendimientoInversor50 }}</div>
              </div>
              <div class="celda celda-izquierda">
                <div class="etiqueta-rendimiento">REND 75%:</div>
                <div class="valor">{{ e1_rendimientoInversor75 }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta-rendimiento">REND 100%:</div>
                <div class="valor">{{ e1_rendimientoInversor100 }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">RELACIÓN TENSIÓN VCC/VCA:</div>
                <div class="valor">{{ e1_relacionTensionInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">FORMA ONDA SALIDA:</div>
                <div class="valor">{{ e1_formaOndaSalidaInversor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">FRECUENCIA NOMINAL (Hz):</div>
                <div class="valor">{{ e1_frecuenciaNominalInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN MÁX ENTRADA (V):</div>
                <div class="valor">{{ e1_tensionMaximaEntradaInversor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN SALIDA (V):</div>
                <div class="valor">{{ e1_tensionSalidaInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">CONSUMO EN VACÍO:</div>
                <div class="valor">{{ e1_consumoVacioInversor }}</div>
              </div>
            </div>
          </div>
-->
          <!-- E1.6 Otros 
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.6</span> OTROS
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">CONVERTIDOR CC/CC:</div>
                <div class="valor">{{ e1_convertidorCC_CC }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">REL TENSIÓN VCC1/VCC2:</div>
                <div class="valor">{{ e1_relacionTensionCC }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">VARIADOR FRECUENCIA:</div>
                <div class="valor">{{ e1_variadorFrecuencia }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">GRUPO AUXILIAR APOYO:</div>
                <div class="valor">{{ e1_grupoAuxiliarApoyo }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA GRUPO AUX (W):</div>
                <div class="valor">{{ e1_potenciaGrupoAuxiliar }}</div>
              </div>
            </div>
            <div class="subseccion" style="border-bottom: 1px solid #000">
              <div class="etiqueta">OTROS EQUIPOS:</div>
              <div class="valor" style="font-size: 10px; white-space: pre-wrap">
                {{ e1_otrosEquipos }}
              </div>
            </div>
          </div>
-->
          <!-- E1.7 Información de la Demanda 
          <div
            class="subseccion subseccion-e1-7"
            style="border-top: 1px solid #000"
          >
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E1.7</span> INFORMACIÓN DE LA
              DEMANDA
            </div>
            <div
              class="fila-grid fila-2col"
              style="border: 1px solid #000; margin-bottom: 0"
            >
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA MÁX DEMANDADA (W):</div>
                <div class="valor">{{ e1_potenciaMaximaDemanda }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">PERIODICIDAD:</div>
                <div class="valor">{{ e1_periodicidadDemanda }}</div>
              </div>
            </div>
            <div
              style="
                font-weight: bold;
                font-size: 10px;
                margin-bottom: 8px;
                margin-top: 8px;
              "
            >
              ENERGÍA DIARIA MEDIA MENSUAL (Wh/día):
            </div>
            <div class="fila-grid fila-6col" style="border: 1px solid #000">
              <div class="celda celda-encabezado celda-izquierda">
                <div>ENE</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaEnero }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>FEB</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaFebrero }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>MAR</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaMarzo }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>ABR</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaAbril }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>MAY</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaMayo }}
                </div>
              </div>
              <div class="celda celda-encabezado">
                <div>JUN</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaJunio }}
                </div>
              </div>
            </div>
            <div
              class="fila-grid fila-6col fila-sin-borde"
              style="border: 1px solid #000"
            >
              <div class="celda celda-encabezado celda-izquierda">
                <div>JUL</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaJulio }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>AGO</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaAgosto }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>SEP</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaSeptiembre }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>OCT</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaOctubre }}
                </div>
              </div>
              <div class="celda celda-encabezado celda-izquierda">
                <div>NOV</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaNoviembre }}
                </div>
              </div>
              <div class="celda celda-encabezado">
                <div>DIC</div>
                <div class="valor" style="font-size: 9px">
                  {{ e1_energiaDiariaDiciembre }}
                </div>
              </div>
            </div>
          </div>
        </div>
 -->
        <!-- E2: INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO -->
        <div class="cuerpo-seccion">
          <div class="titulo-subseccion-principal">
            <span class="subseccion-titulo-span">E2</span>. INSTALACIÓN
            GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO
          </div>

          <!-- E2.1 Conexión a la Red -->
          <div class="subseccion-e2">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E2.1</span> CONEXIÓN A LA RED
            </div>
            <div class="fila-grid fila-2col fila-table-e2">
              <div class="celda celda-izquierda">
                <div class="etiqueta">
                  POTENCIA NOMINAL TOTAL EN INVERSORES (kW):
                </div>
                <div class="valor">{{ potenciaNominalInversores }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TIPO:</div>
                <div class="valor">{{ tipoConexionRed }}</div>
              </div>
            </div>
          </div>

          <!-- E2.2 Módulo Fotovoltaico -->
          <div class="subseccion-e2">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E2.2</span> MÓDULO
              FOTOVOLTAICO
            </div>
            <div class="fila-grid fila-2col fila-table-e2">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TECNOLOGÍA DE LA CÉLULA:</div>
                <div class="valor">{{ tecnologiaCelulaModulo }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ marcaModeloModulo }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde fila-table-e2">
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA PICO (Wp):</div>
                <div class="valor">{{ potenciaPicoModulo }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TONC (ºC):</div>
                <div class="valor">{{ toncModulo }}</div>
              </div>
            </div>
          </div>

          <!-- E2.3 Generador Fotovoltaico -->
          <div class="subseccion-e2">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E2.3</span> GENERADOR
              FOTOVOLTAICO
            </div>
            <div class="fila-grid fila-2col fila-table-e2">
              <div class="celda celda-izquierda">
                <div class="etiqueta">POTENCIA PICO (Wp):</div>
                <div class="valor">{{ potenciaPicoGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN MÁXIMA POTENCIA, Vpmp (V):</div>
                <div class="valor">{{ tensionVpmpGenerador }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">
                  INTENSIDAD MÁXIMA POTENCIA, Ipmp (A):
                </div>
                <div class="valor">{{ intensidadIpmpGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">ORIENTACIÓN (º):</div>
                <div class="valor">{{ orientacionGenerador }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">
                  INCLINACIÓN RESPECTO A HORIZONTAL (º):
                </div>
                <div class="valor">{{ inclinacionGenerador }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">Nº TOTAL DE MÓDULOS:</div>
                <div class="valor">{{ totalModulos }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">Nº DE MÓDULOS EN SERIE POR RAMA:</div>
                <div class="valor">{{ modulosEnSerie }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">Nº DE RAMAS EN PARALELO:</div>
                <div class="valor">{{ ramrasEnParalelo }}</div>
              </div>
            </div>
          </div>

          <!-- E2.4 Inversor/es -->
          <div class="subseccion-e2">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E2.4</span> INVERSOR/ES
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ marcaModeloInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">POTENCIA AC NOMINAL (Kw):</div>
                <div class="valor">{{ potenciaACInversor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN NOMINAL AC, Vn (V):</div>
                <div class="valor">{{ tensionNominalInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">Vcc MÁXIMA (V):</div>
                <div class="valor">{{ vccMaximaInversor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">Vcc MÍNIMA (V):</div>
                <div class="valor">{{ vccMinimaInversor }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">CONEXIÓN:</div>
                <div class="valor">{{ tipoConexionInversor }}</div>
              </div>
            </div>
          </div>

          <!-- E2.5 Baterías -->
          <div class="subseccion-e2">
            <div class="subseccion-titulo">
              <span class="subseccion-titulo-span">E2.5</span> BATERÍAS
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MARCA Y MODELO:</div>
                <div class="valor">{{ marcaModeloBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TIPO DE BATERÍA:</div>
                <div class="valor">{{ tipoBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN NOMINAL (V):</div>
                <div class="valor">{{ tensionNominalBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">PROFUNDIDAD DE DESCARGA (%):</div>
                <div class="valor">{{ profundidadDescargaBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta">TENSIÓN MÁXIMA (V):</div>
                <div class="valor">{{ tensionMaximaBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">TENSIÓN MÍNIMA (V):</div>
                <div class="valor">{{ tensionMinimaBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-2col fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">ENERGÍA TOTAL (kWh):</div>
                <div class="valor">{{ energiaTotalBateria }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta">POTENCIA MÁXIMA SALIDA (kW):</div>
                <div class="valor">{{ potenciaMaximaSalidaBateria }}</div>
              </div>
            </div>
            <div class="fila-grid fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">MÁXIMO PICO DE POTENCIA:</div>
                <div class="valor">{{ maximoPicoPotenciaBateria }}</div>
              </div>
            </div>
          </div>

          <!-- E2.5 Protecciones Externas -->
          <div class="subseccion">
            <div class="subseccion-titulo">
              <span
                class="subseccion-titulo-span"
                style="background-color: #ffa02a"
                >E2.5</span
              >
              PROTECCIONES EXTERNAS
            </div>
            <div class="cuerpo-subseccion">
              <div class="etiqueta">INTERRUPTOR GENERAL:</div>
            </div>
            <div class="fila-grid fila-2col">
              <div class="celda celda-izquierda">
                <div class="etiqueta etiqueta-pequena">
                  INTENSIDAD NOMINAL DEL INTERRUPTOR GENERAL, In (A):
                </div>
                <div class="valor">{{ intensidadInterruptorGeneral }}</div>
              </div>
              <div class="celda">
                <div class="etiqueta etiqueta-pequena">
                  PODER DE CORTE DEL INTERRUPTOR GENERAL (kA):
                </div>
                <div class="valor">{{ poderCorteInterruptor }}</div>
              </div>
            </div>
            <div class="fila-grid fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta">
                  PROTECCIÓN DE MÁXIMA Y MÍNIMA FRECUENCIA (51 Y 49 Hz) Y DE
                  MÁXIMA Y MÍNIMA TENSIÓN (1,1 Y 0,85 Um) (SI/NO) (*):
                </div>
                <div class="valor">{{ proteccionFrecuenciaTension }}</div>
              </div>
            </div>
            <div class="fila-grid fila-sin-borde">
              <div class="celda celda-izquierda">
                <div class="etiqueta etiqueta-pequena">
                  (*) Cumplimentar sólo si las protecciones no se encuentran en
                  el interior del inversor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN F: MEDIDAS DE PROTECCIÓN EMPLEADAS -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >F</span
          >
          | MEDIDAS DE PROTECCIÓN EMPLEADAS
        </div>

        <div class="cuerpo-seccion">
          <table class="tabla-protecciones">
            <thead>
              <tr>
                <th>MEDIDAS DE PROTECCIÓN EMPLEADAS CONTRA:</th>
                <th>TIPO DE MEDIDA</th>
                <th>PARTE DE LA INSTALACIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CONTACTOS DIRECTOS</td>
                <td class="campo-editable">{{ medidaContactosDirectos }}</td>
                <td class="campo-editable"></td>
              </tr>
              <tr>
                <td>CONTACTOS INDIRECTOS</td>
                <td class="campo-editable">{{ medidaContactosIndirectos }}</td>
                <td class="campo-editable">{{ parteInstalacionIndirectos }}</td>
              </tr>
              <tr>
                <td>EFECTO DEL PUNTO CALIENTE</td>
                <td class="campo-editable">{{ medidaPuntoCaliente }}</td>
                <td class="campo-editable">
                  {{ parteInstalacionPuntoCaliente }}
                </td>
              </tr>
              <tr>
                <td>SOBRETENSIONES</td>
                <td class="campo-editable">{{ medidaSobretensiones }}</td>
                <td class="campo-editable">
                  {{ parteInstalacionSobretensiones }}
                </td>
              </tr>
              <tr>
                <td>
                  RIESGO DE EXPLOSIÓN (en instalaciones fotovoltaicas aisladas
                  con baterías)
                </td>
                <td class="campo-editable">{{ medidaExplosion }}</td>
                <td class="campo-editable">{{ parteInstalacionExplosion }}</td>
              </tr>
              <tr>
                <td>
                  RIESGO DE CORROSIÓN (en instalaciones fotovoltaicas aisladas
                  con baterías)
                </td>
                <td class="campo-editable">{{ medidaCorrosion }}</td>
                <td class="campo-editable">{{ parteInstalacionCorrosion }}</td>
              </tr>
              <tr>
                <td>OTRAS (indicar cuales)</td>
                <td class="campo-editable" colspan="2">
                  {{ otrasProtecciones }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECCIÓN G: CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >G</span
          >
          | CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS
        </div>

        <div class="cuerpo-seccion" style="overflow-x: auto">
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
                <td>Generador Fotovoltaico - Entrada al Regulador</td>
                <td class="campo-editable">{{ potenciaGeneradorRegulador }}</td>
                <td class="campo-editable">{{ longitudGeneradorRegulador }}</td>
                <td class="campo-editable">{{ materialGeneradorRegulador }}</td>
                <td class="campo-editable">
                  {{ intensidadGeneradorRegulador }}
                </td>
                <td class="campo-editable">
                  {{ caidaTensionGeneradorRegulador }}
                </td>
              </tr>
              <tr>
                <td>Bornas del Regulador - Terminales de la Batería</td>
                <td class="campo-editable">{{ potenciaReguladorBateria }}</td>
                <td class="campo-editable">{{ longitudReguladorBateria }}</td>
                <td class="campo-editable">{{ materialReguladorBateria }}</td>
                <td class="campo-editable">{{ intensidadReguladorBateria }}</td>
                <td class="campo-editable">
                  {{ caidaTensionReguladorBateria }}
                </td>
              </tr>
              <tr>
                <td>Salida del Regulador - Terminales del Inversor</td>
                <td class="campo-editable">{{ potenciaSalidaRegulador }}</td>
                <td class="campo-editable">{{ longitudSalidaRegulador }}</td>
                <td class="campo-editable">{{ materialSalidaRegulador }}</td>
                <td class="campo-editable">{{ intensidadSalidaRegulador }}</td>
                <td class="campo-editable">
                  {{ caidaTensionSalidaRegulador }}
                </td>
              </tr>
              <tr>
                <td>
                  Terminales de la Batería - Terminales del Inversor (cuando van
                  directamente conectados)
                </td>
                <td class="campo-editable">{{ potenciaBateriaInversor }}</td>
                <td class="campo-editable">{{ longitudBateriaInversor }}</td>
                <td class="campo-editable">{{ materialBateriaInversor }}</td>
                <td class="campo-editable">{{ intensidadBateriaInversor }}</td>
                <td class="campo-editable">
                  {{ caidaTensionBateriaInversor }}
                </td>
              </tr>
              <tr>
                <td>
                  Generador Fotovoltaico - Terminales del Inversor (cuando van
                  directamente conectados)
                </td>
                <td class="campo-editable">
                  {{ potenciaGeneradorInversorDirecto }}
                </td>
                <td class="campo-editable">
                  {{ longitudGeneradorInversorDirecto }}
                </td>
                <td class="campo-editable">
                  {{ materialGeneradorInversorDirecto }}
                </td>
                <td class="campo-editable">
                  {{ intensidadGeneradorInversorDirecto }}
                </td>
                <td class="campo-editable">
                  {{ caidaTensionGeneradorInversorDirecto }}
                </td>
              </tr>
              <tr>
                <td>
                  Salida del Inversor - Red Eléctrica (en instalaciones
                  interconectadas)
                </td>
                <td class="campo-editable">{{ potenciaSalidaInversorRed }}</td>
                <td class="campo-editable">{{ longitudSalidaInversorRed }}</td>
                <td class="campo-editable">{{ materialSalidaInversorRed }}</td>
                <td class="campo-editable">
                  {{ intensidadSalidaInversorRed }}
                </td>
                <td class="campo-editable">
                  {{ caidaTensionSalidaInversorRed }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECCIÓN H: ESQUEMA UNIFILAR -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >H</span
          >
          | ESQUEMA UNIFILAR DE LA INSTALACIÓN (PROTECCIONES INCLUIDAS)
        </div>

        <div class="contenedor-esquema">
          <img
            v-if="esquemaUnifilar"
            :src="esquemaUnifilar"
            class="imagen-esquema"
          />
          <div v-else class="placeholder-esquema">
            Esquema eléctrico unifilar de la instalación
          </div>
        </div>
      </div>

      <!-- SECCIÓN I: PLANO DE EMPLAZAMIENTO -->
      <div class="seccion">
        <div class="encabezado-seccion">
          <span class="subseccion-titulo-span" style="background-color: #ffa02a"
            >I</span
          >
          | PLANO DE EMPLAZAMIENTO Y CROQUIS DE ACCESO
        </div>

        <div class="contenedor-esquema">
          <img
            v-if="planoEmplazamiento"
            :src="planoEmplazamiento"
            class="imagen-esquema"
          />
          <div v-else class="placeholder-esquema">
            Plano de emplazamiento y croquis de acceso
          </div>
        </div>
      </div>

      <!-- PIE DE PÁGINA -->
      <div class="pie-pagina">
        <div style="margin-bottom: 5px">
          <img
            src="/logo-solay.png"
            alt="Solay"
            style="height: 40px; margin: 0 auto"
          />
        </div>
        <p style="margin: 5px 0">Solay Fotovoltaica</p>
        <p style="margin: 3px 0; font-size: 8px">
<<<<<<< HEAD
Paseo de Bollullos de la Mitación 18. Pol. El Pibo - 41110 Bollullos de la Mitación (Sevilla)        </p>
=======
          Paseo de Bollullos de la Mitación 18, Pol. El Pibo - 41110 Bollullos de la Mitación (Sevilla)
        </p>
        <p style="margin: 3px 0; font-size: 8px">Página 1</p>
>>>>>>> e7d0b97
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // Expediente
  numeroExpediente: String,
  numeroRegistro: String,
  // Sección A: TITULAR
  apellidosNombre: String,
  nifCif: String,
  domicilio: String,
  codigoPostal: String,
  localidad: String,
  provincia: String,
  correoElectronico: String,
  telefono: String,
  representante: String,
  dniRepresentante: String,
  // Sección B: EMPLAZAMIENTO
  emplazamientoCalle: String,
  numero: String,
  bloque: String,
  escalera: String,
  piso: String,
  puerta: String,
  localidadEmplazamiento: String,
  provinciaEmplazamiento: String,
  correoElectronicoEmplazamiento: String,
  tipoInstalacion: String,
  usoDestino: String,
  usoDestinoDetalle: String,
  // Sección C: TÉCNICO FIRMANTE
  nombreTecnicoInstalador: String,
  numeroCertificadoInstalador: String,
  numeroInstaladorEmpresa: String,
  domicilioTecnico: String,
  numeroTecnico: String,
  localidadTecnico: String,
  codigoPostalTecnico: String,
  telefonoTecnico: String,
  nombreTecnicoCompetente: String,
  domicilioTecnicoCompetente: String,
  numeroTecnicoCompetente: String,
  localidadTecnicoCompetente: String,
  codigoPostalTecnicoCompetente: String,
  telefonoTecnicoCompetente: String,
  colegioOficial: String,
  numeroColegiado: String,
  // Sección D: MODALIDADES
  modalidadBasicaM1: Boolean,
  modalidadBasicaM2: Boolean,
  modalidadBasicaM3: Boolean,
  modalidadEspecialistaM4: Boolean,
  modalidadEspecialistaM5: Boolean,
  modalidadEspecialistaM6: Boolean,
  modalidadEspecialistaM7: Boolean,
  modalidadEspecialistaM8: Boolean,
  modalidadEspecialistaM9: Boolean,
  // Sección E1: INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA
  // E1.1 Módulo Fotovoltaico
  e1_tecnologiaCelulaModulo: String,
  e1_marcaModeloModulo: String,
  e1_potenciaPicoModulo: String,
  e1_toncModulo: String,
  // E1.2 Generador Fotovoltaico
  e1_potenciaPicoGenerador: String,
  e1_intensidadIpmpGenerador: String,
  e1_tensionVpmpGenerador: String,
  e1_orientacionGenerador: String,
  e1_inclinacionGenerador: String,
  e1_totalModulos: String,
  e1_modulosEnSerie: String,
  e1_ramasEnParalelo: String,
  // E1.3 Baterías
  e1_marcaModeloBateria: String,
  e1_tipoBateria: String,
  e1_tipoPlacaBateria: String,
  e1_c10Bateria: String,
  e1_c100Bateria: String,
  e1_tensionNominalBateria: String,
  e1_profundidadDescargaBateria: String,
  e1_tensionMaximaBateria: String,
  e1_tensionMinimaBateria: String,
  e1_intensidadMaximaCargaBateria: String,
  // E1.4 Regulador
  e1_marcaModeloRegulador: String,
  e1_intensidadMaximaRegulador: String,
  e1_tensionCorteAltaRegulador: String,
  e1_tensionCorteBajaRegulador: String,
  // E1.5 Inversor
  e1_marcaModeloInversor: String,
  e1_potenciaNominalInversor: String,
  e1_rendimientoInversor10: String,
  e1_rendimientoInversor25: String,
  e1_rendimientoInversor50: String,
  e1_rendimientoInversor75: String,
  e1_rendimientoInversor100: String,
  e1_relacionTensionInversor: String,
  e1_formaOndaSalidaInversor: String,
  e1_frecuenciaNominalInversor: String,
  e1_tensionMaximaEntradaInversor: String,
  e1_tensionSalidaInversor: String,
  e1_consumoVacioInversor: String,
  e1_seguidorPuntoMaximaPotencia: String,
  // E1.6 Otros
  e1_convertidorCC_CC: String,
  e1_relacionTensionCC: String,
  e1_variadorFrecuencia: String,
  e1_grupoAuxiliarApoyo: String,
  e1_potenciaGrupoAuxiliar: String,
  e1_otrosEquipos: String,
  // E1.7 Información de la Demanda
  e1_potenciaMaximaDemanda: String,
  e1_periodicidadDemanda: String,
  e1_energiaDiariaEnero: String,
  e1_energiaDiariaFebrero: String,
  e1_energiaDiariaMarzo: String,
  e1_energiaDiariaAbril: String,
  e1_energiaDiariaMayo: String,
  e1_energiaDiariaJunio: String,
  e1_energiaDiariaJulio: String,
  e1_energiaDiariaAgosto: String,
  e1_energiaDiariaSeptiembre: String,
  e1_energiaDiariaOctubre: String,
  e1_energiaDiariaNoviembre: String,
  e1_energiaDiariaDiciembre: String,
  // Sección E2: MEMORIA DESCRIPTIVA
  // E2.1
  potenciaNominalInversores: String,
  tipoConexionRed: String,
  // E2.2
  tecnologiaCelulaModulo: String,
  marcaModeloModulo: String,
  potenciaPicoModulo: String,
  toncModulo: String,
  // E2.3
  potenciaPicoGenerador: String,
  tensionVpmpGenerador: String,
  intensidadIpmpGenerador: String,
  orientacionGenerador: String,
  inclinacionGenerador: String,
  totalModulos: String,
  modulosEnSerie: String,
  ramrasEnParalelo: String,
  // E2.4
  marcaModeloInversor: String,
  potenciaACInversor: String,
  tensionNominalInversor: String,
  vccMaximaInversor: String,
  vccMinimaInversor: String,
  tipoConexionInversor: String,
  // E2.5
  marcaModeloBateria: String,
  tipoBateria: String,
  tensionNominalBateria: String,
  profundidadDescargaBateria: String,
  tensionMaximaBateria: String,
  tensionMinimaBateria: String,
  energiaTotalBateria: String,
  potenciaMaximaSalidaBateria: String,
  maximoPicoPotenciaBateria: String,
  // E2.5.1 Protecciones Externas
  intensidadInterruptorGeneral: String,
  poderCorteInterruptor: String,
  proteccionFrecuenciaTension: String,
  // Sección F: MEDIDAS DE PROTECCIÓN
  medidaContactosDirectos: String,
  parteInstalacionDirectos: String,
  medidaContactosIndirectos: String,
  parteInstalacionIndirectos: String,
  medidaSobretensiones: String,
  parteInstalacionSobretensiones: String,
  medidaPuntoCaliente: String,
  parteInstalacionPuntoCaliente: String,
  medidaExplosion: String,
  parteInstalacionExplosion: String,
  medidaCorrosion: String,
  parteInstalacionCorrosion: String,
  otrasProtecciones: String,
  // Sección G: LÍNEAS Y CIRCUITOS
  potenciaGeneradorRegulador: String,
  longitudGeneradorRegulador: String,
  materialGeneradorRegulador: String,
  intensidadGeneradorRegulador: String,
  caidaTensionGeneradorRegulador: String,
  potenciaReguladorBateria: String,
  longitudReguladorBateria: String,
  materialReguladorBateria: String,
  intensidadReguladorBateria: String,
  caidaTensionReguladorBateria: String,
  potenciaSalidaRegulador: String,
  longitudSalidaRegulador: String,
  materialSalidaRegulador: String,
  intensidadSalidaRegulador: String,
  caidaTensionSalidaRegulador: String,
  potenciaBateriaInversor: String,
  longitudBateriaInversor: String,
  materialBateriaInversor: String,
  intensidadBateriaInversor: String,
  caidaTensionBateriaInversor: String,
  potenciaGeneradorInversorDirecto: String,
  longitudGeneradorInversorDirecto: String,
  materialGeneradorInversorDirecto: String,
  intensidadGeneradorInversorDirecto: String,
  caidaTensionGeneradorInversorDirecto: String,
  potenciaSalidaInversorRed: String,
  longitudSalidaInversorRed: String,
  materialSalidaInversorRed: String,
  intensidadSalidaInversorRed: String,
  caidaTensionSalidaInversorRed: String,
  // Sección H: ESQUEMA UNIFILAR
  esquemaUnifilar: String,
  // Sección I: PLANO EMPLAZAMIENTO
  planoEmplazamiento: String,
  // Generado
  generatedDate: {
    type: String,
    default: new Date().toLocaleDateString("es-ES"),
  },
});

import { ref } from "vue";

const tipoInstalacionSeleccionada = ref("Nueva");
</script>

<style scoped>
/* ========== CONTENEDORES PRINCIPALES ========== */
.contenedor-principal {
  background-color: white;
  padding: 0;
  width: 210mm;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  color: #000;
  font-size: 11px;
  display: block;
}

.encabezado-documento-principal {
  padding: 0px 15px 15px 15px;
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
}

.contenedor-contenido {
  padding: 10px;
}

.grid-expediente {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 5px;
}

.encabezado-caja {
  background-color: var(--color-orange-medium-strong);
  padding: 5px;
  font-weight: bold;
}

.contenido-caja {
  color: #000;
}



.cuerpo-seccion-borde {
  padding: 1px 5px;
  border-bottom: 1px solid #000;
}

.valor-pequeno {
  font-size: 10px;
}

.etiqueta-pequena {
  font-size: 9px;
}

.etiqueta-rendimiento {
  font-weight: bold;
  font-size: 9px;
  margin-bottom: 3px;
}

.subseccion-otros-equipos {
  margin-top: 8px;
  border-bottom: 1px solid #000;
}

.valor-otros-equipos {
  font-size: 10px;
  white-space: pre-wrap;
}

.subseccion-sin-borde {
  border-bottom: none;
}

.fila-table-border {
  border: 1px solid #000;
  margin-bottom: 0;
}

.etiqueta-tabla-energia {
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 8px;
  margin-top: 8px;
}

.etiqueta-pequena-tabla {
  font-weight: bold;
  font-size: 9px;
}

.valor-pequeño-tabla {
  font-size: 9px;
}

.subseccion-e2 {
  border-bottom: 1px solid #000;
}

.fila-table-e2 {
  margin-bottom: 0;
}

.cuerpo-seccion-scroll {
  overflow-x: auto;
}

.logo-pie {
  margin-bottom: 10px;
}

.img-logo {
  height: 40px;
  margin: 0 auto;
}

.texto-pie-principal {
  margin: 5px 0;
}

.texto-pie-secundario {
  margin: 3px 0;
  font-size: 8px;
}

.valor-otras-protecciones {
  font-size: 10px;
  line-height: 1.5;
}

/* ========== CONTENEDORES PRINCIPALES ========== */
.seccion {
  border: 2px solid #000;
}

.encabezado-seccion {
  background-color: var(--color-orange-medium-strong);
  padding: 5px;
  font-weight: bold;
  border-bottom: 1px solid #000;
}

/* ========== GRIDS Y FILAS ========== */
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
  margin-bottom: 3px;
}

.etiqueta-grande {
  font-weight: bold;
  font-size: 11px;
  border-bottom: 1px solid #000;
  padding: 4px;
}

.valor {
  color: #000;
  min-height: 17px;
}

.valor-grande {
  color: #000;
  min-height: 17px;
}

/* ========== SUBSECCIONES E1, E2, E3, etc. ========== */
.subseccion {
  border-bottom: 1px solid #000;
}

.subseccion-titulo {
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding: 7px 5px;
  background-color: #ffcc99;
  color: rgb(0, 0, 0);
}

/* Estilos para los spans de las letras (A, B, C, D, E, E1, E2, E1.1, etc.) */
.subseccion-titulo-span {
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 5px;
  color: #000;
  font-weight: bold;
}

/* ========== TÍTULO DE SUBSECCIONES PRINCIPALES ========== */
.titulo-subseccion-principal {
  font-weight: bold;
  background-color: #ffb061;
  padding: 7px 5px;
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
  padding: 5px;
}

.opciones-checkbox {
  display: flex;
  gap: 20px;
  margin-bottom: 5px;
}

.opcion-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
}

.opcion-checkbox input {
  cursor: pointer;
}

.opcion-checkbox label {
  cursor: pointer;
  font-size: 10px;
}

.seccion-firma {
  text-align: center;
  border-top: 1px solid #000;
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

/* ========== ENCABEZADO GENERAL ========== */
.encabezado-documento {
  background-color: #f4b5a0;
  padding: 15px 20px;
  text-align: center;
  border-bottom: 2px solid #000;
}

.encabezado-documento h1 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.encabezado-documento p {
  margin: 5px 0 0 0;
  font-size: 11px;
}

/* ========== CAMPOS ESPECIALES ========== */
.campo-solo-lectura {
  color: #000;
  font-weight: normal;
}

.campo-editable {
  color: #000;
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
  padding: 7px;
  background-color: #fff9f7;
  border: 1px solid #f4b5a0;
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
  padding: 0;
  text-align: center;
  background-color: #fff9f7;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagen-esquema {
  max-width: 100%;
  max-height: 300px;
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

  /* Ocultar todos los botones y elementos interactivos */
  .sticky-back-button,
  .sticky-pdf-buttons,
  .sticky-pdf-button {
    display: none !important;
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

/*Añadido estilos para el grid de expediente y las cajas dentro del mismo */
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
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 3px;
}

.contenido-caja {
  font-size: 11px;
  color: #000;
  min-height: 20px;
}
</style>
