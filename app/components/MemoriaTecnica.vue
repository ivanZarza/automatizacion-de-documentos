<template>
  <div data-pdf-content class="bg-white p-0" style="width: 210mm; margin: 0 auto; font-family: 'Arial', sans-serif; color: #333; font-size: 11px; display: block;">
    <!-- ENCABEZADO -->
    <div style="background-color: #f4b5a0; padding: 15px 20px; text-align: center; border-bottom: 2px solid #000;">
      <h1 style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">MEMORIA TÉCNICA DE DISEÑO</h1>
      <p style="margin: 5px 0 0 0; font-size: 11px;">INSTALACIONES FOTOVOLTAICAS EN BAJA TENSIÓN</p>
    </div>

    <div style="padding: 20px;">
      <!-- NÚMERO DE EXPEDIENTE Y REGISTRO -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div style="border: 1px solid #000; padding: 10px;">
          <div style="background-color: #f4b5a0; padding: 5px; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">Nº EXPEDIENTE:</div>
          <div style="margin: 3px 0; color: #d97860;">{{ numeroExpediente }}</div>
        </div>
        <div style="border: 1px solid #000; padding: 10px;">
          <div style="background-color: #f4b5a0; padding: 5px; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">Nº REGISTRO DE LA INSTALACIÓN:</div>
          <div style="margin: 3px 0; color: #d97860;">{{ numeroRegistro }}</div>
        </div>
      </div>

      <!-- SECCIÓN A: TITULAR -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">A | TITULAR</div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">APELLIDOS Y NOMBRE/RAZÓN SOCIAL:</div>
            <div style="color: #d97860; min-height: 20px;">{{ apellidosNombre }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">NIF/CIF:</div>
            <div style="color: #d97860;">{{ nifCif }}</div>
          </div>
        </div>

        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">DOMICILIO:</div>
          <div style="color: #d97860;">{{ domicilio }}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">LOCALIDAD:</div>
            <div style="color: #d97860;">{{ localidad }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROVINCIA:</div>
            <div style="color: #d97860;">{{ provincia }}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CORREO ELECTRÓNICO:</div>
            <div style="color: #d97860; font-size: 10px;">{{ correoElectronico }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TELÉFONO:</div>
            <div style="color: #d97860;">{{ telefono }}</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN B: EMPLAZAMIENTO -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">B | EMPLAZAMIENTO DE LA INSTALACIÓN Y USO AL QUE SE DESTINA</div>
        
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">NÚMERO:</div>
            <div style="color: #d97860; min-height: 20px;">{{ numero }}</div>
          </div>
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">BLOQUE:</div>
            <div style="color: #d97860; min-height: 20px;">{{ bloque }}</div>
          </div>
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">PUERTA:</div>
            <div style="color: #d97860; min-height: 20px;">{{ puerta }}</div>
          </div>
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">ESCALERA:</div>
            <div style="color: #d97860; min-height: 20px;">{{ escalera }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">PISO:</div>
            <div style="color: #d97860; min-height: 20px;">{{ piso }}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">LOCALIDAD:</div>
            <div style="color: #d97860;">{{ localidadEmplazamiento }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROVINCIA:</div>
            <div style="color: #d97860;">{{ provinciaEmplazamiento }}</div>
          </div>
        </div>

        <div style="padding: 8px;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">USO A QUE SE DESTINA:</div>
          <div style="display: flex; gap: 20px;">
            <div>
              <input type="checkbox" :checked="usoDestino === 'Nueva'" style="margin-right: 5px;"/>
              <span style="font-weight: bold;">Nueva</span>
            </div>
            <div>
              <input type="checkbox" :checked="usoDestino === 'Ampliación'" style="margin-right: 5px;"/>
              <span style="font-weight: bold;">Ampliación</span>
            </div>
            <div>
              <input type="checkbox" :checked="usoDestino === 'Modificación'" style="margin-right: 5px;"/>
              <span style="font-weight: bold;">Modificación</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN C: PERSONA QUE FIRMA -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">C | IDENTIFICACIÓN DE LA PERSONA QUE FIRMA LA MTD</div>
        
        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MEMORIA REALIZADA POR INSTALADOR ELÉCTRICO AUTORIZADO:</div>
          <div style="color: #d97860;">{{ nombreFirma }}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
          <div style="padding: 8px; border-right: 1px solid #000; border-bottom: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE COLEGIADO:</div>
            <div style="color: #d97860;">{{ noColegiado }}</div>
          </div>
          <div style="padding: 8px; border-bottom: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TELÉFONO:</div>
            <div style="color: #d97860;">{{ telefonoFirma }}</div>
          </div>
        </div>

        <div style="padding: 15px; text-align: center; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 10px;">FIRMA DEL TÉCNICO COMPETENTE:</div>
          <div style="min-height: 60px; display: flex; align-items: center; justify-content: center;">
            <img src="/firma-solay.png" alt="Firma" style="height: 50px; object-fit: contain;" />
          </div>
        </div>

        <div style="padding: 8px; text-align: center; font-size: 10px; color: #666;">
          <p style="margin: 0;">En Sevilla a {{ generatedDate }}</p>
          <p style="margin: 5px 0 0 0; font-weight: bold;">Firma del Instalador Autorizado (Técnico Titulado)</p>
        </div>
      </div>

      <!-- SECCIÓN D: CATEGORÍA Y ESPECIALIDAD -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">D | CATEGORÍA Y ESPECIALIDAD DEL INSTALADOR</div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 8px;">
          <div style="border-right: 1px solid #000;">
            <input type="checkbox" style="margin-right: 5px;"/>
            <span style="font-weight: bold;">BÁSICA</span>
          </div>
          <div>
            <input type="checkbox" style="margin-right: 5px;"/>
            <span style="font-weight: bold;">ESPECIALISTA</span>
          </div>
        </div>
      </div>

      <!-- SECCIÓN E: MEMORIA DESCRIPTIVA -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">E | MEMORIA DESCRIPTIVA</div>
        
        <!-- E2: INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO -->
        <div style="padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px;">E2. INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO</div>
          
          <!-- E2.1 Conexión a la Red -->
          <div style="border-bottom: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.1 CONEXIÓN A LA RED</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA NOMINAL TOTAL EN INVERSORES (kW):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaNominalInversores }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tipoConexionRed }}</div>
              </div>
            </div>
          </div>

          <!-- E2.2 Módulo Fotovoltaico -->
          <div style="border-bottom: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.2 MÓDULO FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TECNOLOGÍA DE LA CÉLULA:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tecnologiaCelulaModulo }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloModulo }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaPicoModulo }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TONC (ºC):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ toncModulo }}</div>
              </div>
            </div>
          </div>

          <!-- E2.3 Generador Fotovoltaico -->
          <div style="border-bottom: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.3 GENERADOR FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaPicoGenerador }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA POTENCIA, Vpmp (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionVpmpGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTENSIDAD MÁXIMA POTENCIA, Ipmp (A):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ intensidadIpmpGenerador }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ORIENTACIÓN (º):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ orientacionGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INCLINACIÓN RESPECTO A HORIZONTAL (º):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ inclinacionGenerador }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº TOTAL DE MÓDULOS:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ totalModulos }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE MÓDULOS EN SERIE POR RAMA:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ modulosEnSerie }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE RAMAS EN PARALELO:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ ramrasEnParalelo }}</div>
              </div>
            </div>
          </div>

          <!-- E2.4 Inversor/es -->
          <div style="border-bottom: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.4 INVERSOR/ES</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloInversor }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA AC NOMINAL (Kw):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaACInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL AC, Vn (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionNominalInversor }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Vcc MÁXIMA (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ vccMaximaInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Vcc MÍNIMA (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ vccMinimaInversor }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CONEXIÓN:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tipoConexionInversor }}</div>
              </div>
            </div>
          </div>

          <!-- E2.5 Baterías -->
          <div style="border-bottom: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.5 BATERÍAS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloBateria }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE BATERÍA:</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tipoBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionNominalBateria }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROFUNDIDAD DE DESCARGA (%):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ profundidadDescargaBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionMaximaBateria }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÍNIMA (V):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionMinimaBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ENERGÍA TOTAL (kWh):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ energiaTotalBateria }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA MÁXIMA SALIDA (kW):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaMaximaSalidaBateria }}</div>
              </div>
            </div>
          </div>

          <!-- E2.6 Protecciones Externas -->
          <div style="padding: 10px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.6 PROTECCIONES EXTERNAS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTERRUPTOR GENERAL - In (A):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ intensidadInterruptorGeneral }}</div>
              </div>
              <div>
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PODER DE CORTE (kA):</div>
                <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ poderCorteInterruptor }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN F: MEDIDAS DE PROTECCIÓN EMPLEADAS -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">F | MEDIDAS DE PROTECCIÓN EMPLEADAS</div>
        
        <div style="padding: 10px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
            <tr style="border: 1px solid #000;">
              <th style="border: 1px solid #000; padding: 5px; background-color: #f0f0f0;">RIESGO / PROTECCIÓN</th>
              <th style="border: 1px solid #000; padding: 5px; background-color: #f0f0f0;">TIPO DE MEDIDA</th>
              <th style="border: 1px solid #000; padding: 5px; background-color: #f0f0f0;">PARTE DE LA INSTALACIÓN</th>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Contactos Directos</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaContactosDirectos }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionDirectos }}</td>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Contactos Indirectos</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaContactosIndirectos }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionIndirectos }}</td>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Sobretensiones</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaSobretensiones }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionSobretensiones }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- SECCIÓN G: CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">G | CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS</div>
        
        <div style="padding: 10px; overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
            <tr style="border: 1px solid #000;">
              <th style="border: 1px solid #000; padding: 4px; background-color: #f0f0f0;">CIRCUITO</th>
              <th style="border: 1px solid #000; padding: 4px; background-color: #f0f0f0;">LONGITUD (m)</th>
              <th style="border: 1px solid #000; padding: 4px; background-color: #f0f0f0;">MATERIAL/SECCIÓN (mm²)</th>
              <th style="border: 1px solid #000; padding: 4px; background-color: #f0f0f0;">INTENSIDAD (A)</th>
              <th style="border: 1px solid #000; padding: 4px; background-color: #f0f0f0;">CAÍDA TENSIÓN (%)</th>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 4px;">Generador - Inversor</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ longitudGeneradorInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ materialGeneradorInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ intensidadGeneradorInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ caidaTensionGeneradorInversor }}</td>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 4px;">Batería - Inversor</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ longitudBateriaInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ materialBateriaInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ intensidadBateriaInversor }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ caidaTensionBateriaInversor }}</td>
            </tr>
            <tr style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 4px;">Salida Inversor - Red</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ longitudSalidaRed }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ materialSalidaRed }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ intensidadSalidaRed }}</td>
              <td style="border: 1px solid #000; padding: 4px; color: #d97860;">{{ caidaTensionSalidaRed }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- SECCIÓN H: ESQUEMA UNIFILAR -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">H | ESQUEMA UNIFILAR DE LA INSTALACIÓN (PROTECCIONES INCLUIDAS)</div>
        
        <div style="border: 2px dashed #d97860; padding: 30px; text-align: center; background-color: #fff9f7; min-height: 200px; display: flex; align-items: center; justify-content: center;">
          <img v-if="esquemaUnifilar" :src="esquemaUnifilar" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
          <div v-else style="color: #999; font-size: 12px;">Esquema eléctrico unifilar de la instalación</div>
        </div>
      </div>

      <!-- SECCIÓN I: PLANO DE EMPLAZAMIENTO -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">I | PLANO DE EMPLAZAMIENTO Y CROQUIS DE ACCESO</div>
        
        <div style="border: 2px dashed #d97860; padding: 30px; text-align: center; background-color: #fff9f7; min-height: 200px; display: flex; align-items: center; justify-content: center;">
          <img v-if="planoEmplazamiento" :src="planoEmplazamiento" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
          <div v-else style="color: #999; font-size: 12px;">Plano de emplazamiento y croquis de acceso</div>
        </div>
      </div>

      <!-- PIE DE PÁGINA -->
      <div style="margin-top: 30px; padding: 15px; border-top: 2px solid #f4b5a0; text-align: center; font-size: 9px; color: #666;">
        <div style="margin-bottom: 10px;">
          <img src="/logo-solay.png" alt="Solay" style="height: 40px; margin: 0 auto;" />
        </div>
        <p style="margin: 5px 0;">Solay Fotovoltaica</p>
        <p style="margin: 3px 0; font-size: 8px;">C/ Bonaventura, 3 • 41600 Sanlúcar la Mayor (Sevilla)</p>
        <p style="margin: 3px 0; font-size: 8px;">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // Expediente
  numeroExpediente: String,
  numeroRegistro: String,
  // Sección A
  apellidosNombre: String,
  nifCif: String,
  domicilio: String,
  localidad: String,
  provincia: String,
  correoElectronico: String,
  telefono: String,
  // Sección B
  numero: String,
  bloque: String,
  puerta: String,
  escalera: String,
  piso: String,
  localidadEmplazamiento: String,
  provinciaEmplazamiento: String,
  usoDestino: String,
  // Sección C
  nombreFirma: String,
  noColegiado: String,
  telefonoFirma: String,
  // Sección E - E2 Conexión a Red
  potenciaNominalInversores: String,
  tipoConexionRed: String,
  // E2.2 Módulo Fotovoltaico
  tecnologiaCelulaModulo: String,
  marcaModeloModulo: String,
  potenciaPicoModulo: String,
  toncModulo: String,
  // E2.3 Generador Fotovoltaico
  potenciaPicoGenerador: String,
  tensionVpmpGenerador: String,
  intensidadIpmpGenerador: String,
  orientacionGenerador: String,
  inclinacionGenerador: String,
  totalModulos: String,
  modulosEnSerie: String,
  ramrasEnParalelo: String,
  // E2.4 Inversor
  marcaModeloInversor: String,
  potenciaACInversor: String,
  tensionNominalInversor: String,
  vccMaximaInversor: String,
  vccMinimaInversor: String,
  tipoConexionInversor: String,
  // E2.5 Baterías
  marcaModeloBateria: String,
  tipoBateria: String,
  tensionNominalBateria: String,
  profundidadDescargaBateria: String,
  tensionMaximaBateria: String,
  tensionMinimaBateria: String,
  energiaTotalBateria: String,
  potenciaMaximaSalidaBateria: String,
  // E2.6 Protecciones Externas
  intensidadInterruptorGeneral: String,
  poderCorteInterruptor: String,
  // Sección F - Medidas de Protección
  medidaContactosDirectos: String,
  parteInstalacionDirectos: String,
  medidaContactosIndirectos: String,
  parteInstalacionIndirectos: String,
  medidaSobretensiones: String,
  parteInstalacionSobretensiones: String,
  // Sección G - Características de Líneas
  longitudGeneradorInversor: String,
  materialGeneradorInversor: String,
  intensidadGeneradorInversor: String,
  caidaTensionGeneradorInversor: String,
  longitudBateriaInversor: String,
  materialBateriaInversor: String,
  intensidadBateriaInversor: String,
  caidaTensionBateriaInversor: String,
  longitudSalidaRed: String,
  materialSalidaRed: String,
  intensidadSalidaRed: String,
  caidaTensionSalidaRed: String,
  // Sección H - Esquema Unifilar
  esquemaUnifilar: String,
  // Sección I - Plano de Emplazamiento
  planoEmplazamiento: String,
  generatedDate: String
})
</script>

<style scoped>
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
}
</style>
