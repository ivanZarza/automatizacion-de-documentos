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
        <div style="border: 1px solid #000; padding: 8px;">
          <div style="background-color: #f4b5a0; padding: 5px; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">Nº EXPEDIENTE:</div>
          <div style="margin: 3px 0; color: #d97860;">{{ numeroExpediente }}</div>
        </div>
        <div style="border: 1px solid #000; padding: 8px;">
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

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CÓDIGO POSTAL:</div>
            <div style="color: #d97860;">{{ codigoPostal }}</div>
          </div>
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">LOCALIDAD:</div>
            <div style="color: #d97860;">{{ localidad }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROVINCIA:</div>
            <div style="color: #d97860;">{{ provincia }}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CORREO ELECTRÓNICO:</div>
            <div style="color: #d97860; font-size: 10px;">{{ correoElectronico }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TELÉFONO:</div>
            <div style="color: #d97860;">{{ telefono }}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">REPRESENTANTE:</div>
            <div style="color: #d97860;">{{ representante }}</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">DNI REPRESENTANTE:</div>
            <div style="color: #d97860;">{{ dniRepresentante }}</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN B: EMPLAZAMIENTO -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">B | EMPLAZAMIENTO DE LA INSTALACIÓN Y USO AL QUE SE DESTINA</div>
        
        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CALLE/AVENIDA:</div>
          <div style="color: #d97860;">{{ emplazamientoCalle }}</div>
        </div>

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
            <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">ESCALERA:</div>
            <div style="color: #d97860; min-height: 20px;">{{ escalera }}</div>
          </div>
          <div style="padding: 8px; border-right: 1px solid #000;">
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

        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CORREO ELECTRÓNICO EMPLAZAMIENTO:</div>
          <div style="color: #d97860; font-size: 10px;">{{ correoElectronicoEmplazamiento }}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
          <div style="padding: 8px; border-right: 1px solid #000;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE INSTALACIÓN:</div>
            <div style="color: #d97860;">Fotovoltaica conectada a red interior</div>
          </div>
          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">USO A QUE SE DESTINA:</div>
            <div style="color: #d97860;">Autoconsumo para vivienda</div>
          </div>
        </div>

        <div style="padding: 8px;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 8px;">INSTALACIÓN:</div>
          <div style="display: flex; gap: 20px; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 5px;">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Nueva'" @change="tipoInstalacionSeleccionada = 'Nueva'" style="cursor: pointer;">
              <label style="cursor: pointer; font-size: 10px;">Nueva</label>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Ampliación'" @change="tipoInstalacionSeleccionada = 'Ampliación'" style="cursor: pointer;">
              <label style="cursor: pointer; font-size: 10px;">Ampliación</label>
            </div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <input type="checkbox" :checked="tipoInstalacionSeleccionada === 'Modificación'" @change="tipoInstalacionSeleccionada = 'Modificación'" style="cursor: pointer;">
              <label style="cursor: pointer; font-size: 10px;">Modificación</label>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN C: PERSONA QUE FIRMA -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">C | IDENTIFICACIÓN DE LA PERSONA QUE FIRMA LA MTD</div>
        
        
        <!-- Técnico Instalador Autorizado -->
        <div style="border-bottom: 1px solid #000; padding: 8px;">
          <div style="font-weight: bold; font-size: 11px; margin-bottom: 8px;">MEMORIA REALIZADA POR INSTALADOR ELÉCTRICO AUTORIZADO:</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px;">
            <div style="padding: 8px; border: 1px solid #000;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">NOMBRE:</div>
              <div style="color: #d97860;">{{ nombreTecnicoInstalador }}</div>
            </div>
            <div style="padding: 8px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE CERTIFICADO DE CUALIFICACIÓN INDIVIDUAL:</div>
              <div style="color: #d97860;">{{ numeroCertificadoInstalador }}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
            <div style="padding: 8px; border-right: 1px solid #000;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE INSTALADOR ELÉCTRICO AUTORIZADO (empresa):</div>
              <div style="color: #d97860;">{{ numeroInstaladorEmpresa }}</div>
            </div>
            <div style="padding: 8px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">DOMICILIO (calle o plaza):</div>
              <div style="color: #d97860;">{{ domicilioTecnico }}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
            <div style="padding: 8px; border-right: 1px solid #000;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">NÚMERO:</div>
              <div style="color: #d97860;">{{ numeroTecnico }}</div>
            </div>
            <div style="padding: 8px; border-right: 1px solid #000;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">LOCALIDAD:</div>
              <div style="color: #d97860;">{{ localidadTecnico }}</div>
            </div>
            <div style="padding: 8px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">C.P.:</div>
              <div style="color: #d97860;">{{ codigoPostalTecnico }}</div>
            </div>
          </div>

          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TELÉFONO:</div>
            <div style="color: #d97860;">{{ telefonoTecnico }}</div>
          </div>
        </div>

        <!-- Técnico Competente -->
        <div style="border-bottom: 1px solid #000; padding: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 11px; margin-bottom: 8px;">
            <input type="checkbox" style="width: 14px; height: 14px; cursor: pointer;" />
            <span>MEMORIA REALIZADA POR TÉCNICO COMPETENTE:</span>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
            <div style="padding: 8px; border-right: 1px solid #000; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">NOMBRE:</div>
              <div style="color: #d97860; min-height: 20px;">{{ nombreTecnicoCompetente }}</div>
            </div>
            <div style="padding: 8px; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">DOMICILIO (calle o plaza):</div>
              <div style="color: #d97860; min-height: 20px;">{{ domicilioTecnicoCompetente }}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
            <div style="padding: 8px; border-right: 1px solid #000; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">NÚMERO:</div>
              <div style="color: #d97860; min-height: 20px;">{{ numeroTecnicoCompetente }}</div>
            </div>
            <div style="padding: 8px; border-right: 1px solid #000; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">LOCALIDAD:</div>
              <div style="color: #d97860; min-height: 20px;">{{ localidadTecnicoCompetente }}</div>
            </div>
            <div style="padding: 8px; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">C.P.:</div>
              <div style="color: #d97860; min-height: 20px;">{{ codigoPostalTecnicoCompetente }}</div>
            </div>
          </div>

          <div style="padding: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TELÉFONO:</div>
            <div style="color: #d97860; min-height: 20px;">{{ telefonoTecnicoCompetente }}</div>
          </div>
        </div>

        <!-- Colegio Oficial -->
        <div style="border-bottom: 1px solid #000; padding: 8px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
            <div style="padding: 8px; border-right: 1px solid #000; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">COLEGIO OFICIAL:</div>
              <div style="color: #d97860; min-height: 20px;">{{ colegioOficial }}</div>
            </div>
            <div style="padding: 8px; min-height: 40px;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE COLEGIADO:</div>
              <div style="color: #d97860; min-height: 20px;">{{ numeroColegiado }}</div>
            </div>
          </div>
        </div>


        <!-- Firma y Fecha -->
        <div style="padding: 15px; text-align: center; border-top: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; margin-bottom: 10px;">En Sevilla a {{ generatedDate }}</div>
          <div style="min-height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <img src="/firma-solay.png" alt="Firma" style="height: 60px; object-fit: contain;" />
          </div>
          <div style="font-weight: bold; font-size: 10px; border-top: 1px solid #000; padding-top: 5px;">Firma del Instalador Autorizado / Técnico Titulado</div>
        </div>

        <div style="padding: 8px; text-align: center; font-size: 9px; color: #666;">
          <p style="margin: 5px 0;">(Cuando la MTD sea firmado por Técnico Titulado vendrá sellada por el Colegio Oficial)</p>
        </div>
      </div>

      <!-- SECCIÓN D: CATEGORÍA Y ESPECIALIDAD -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">D | CATEGORÍA Y ESPECIALIDAD DEL INSTALADOR</div>
        
        <!-- BÁSICA -->
        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; font-size: 11px; margin-bottom: 8px;">CATEGORÍA BÁSICA:</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadBasicaM1" style="margin-right: 8px;" disabled/>
              <span>M1 - Instalaciones en viviendas (hasta 10kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadBasicaM2" style="margin-right: 8px;" disabled/>
              <span>M2 - Instalaciones en pequeño comercio (hasta 15kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadBasicaM3" style="margin-right: 8px;" disabled/>
              <span>M3 - Instalaciones con almacenamiento (hasta 10kWp)</span>
            </div>
          </div>
        </div>

        <!-- ESPECIALISTA -->
        <div style="padding: 8px;">
          <div style="font-weight: bold; font-size: 11px; margin-bottom: 8px;">CATEGORÍA ESPECIALISTA:</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM4" style="margin-right: 8px;" disabled/>
              <span>M4 - Pequeña potencia (15-100kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM5" style="margin-right: 8px;" disabled/>
              <span>M5 - Mediana potencia (100-500kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM6" style="margin-right: 8px;" disabled/>
              <span>M6 - Gran potencia (&gt;500kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM7" style="margin-right: 8px;" disabled/>
              <span>M7 - Almacenamiento (15-100kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM8" style="margin-right: 8px;" disabled/>
              <span>M8 - Almacenamiento mediano (100-500kWp)</span>
            </div>
            <div style="display: flex; align-items: center;">
              <input type="checkbox" :checked="modalidadEspecialistaM9" style="margin-right: 8px;" disabled/>
              <span>M9 - Almacenamiento gran escala (&gt;500kWp)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN E: MEMORIA DESCRIPTIVA -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold; border-bottom: 1px solid #000;">E | MEMORIA DESCRIPTIVA</div>
        
        <!-- E1: INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA -->
        <div style="padding: 8px; border-bottom: 1px solid #000;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px; border: 1px solid #000;">E1. INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA</div>
          
          <!-- E1.1 Módulo Fotovoltaico -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.1 MÓDULO FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TECNOLOGÍA DE LA CÉLULA:</div>
                <div style="color: #d97860;">{{ e1_tecnologiaCelulaModulo }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ e1_marcaModeloModulo }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860;">{{ e1_potenciaPicoModulo }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TONC (ºC):</div>
                <div style="color: #d97860;">{{ e1_toncModulo }}</div>
              </div>
            </div>
          </div>

          <!-- E1.2 Generador Fotovoltaico -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.2 GENERADOR FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860;">{{ e1_potenciaPicoGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTENSIDAD MÁXIMA POTENCIA, Ipmp (A):</div>
                <div style="color: #d97860;">{{ e1_intensidadIpmpGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA POTENCIA, Vpmp (V):</div>
                <div style="color: #d97860;">{{ e1_tensionVpmpGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ORIENTACIÓN:</div>
                <div style="color: #d97860;">{{ e1_orientacionGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INCLINACIÓN (º):</div>
                <div style="color: #d97860;">{{ e1_inclinacionGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº TOTAL MÓDULOS:</div>
                <div style="color: #d97860;">{{ e1_totalModulos }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº MÓDULOS EN SERIE:</div>
                <div style="color: #d97860;">{{ e1_modulosEnSerie }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº RAMAS EN PARALELO:</div>
                <div style="color: #d97860;">{{ e1_ramasEnParalelo }}</div>
              </div>
            </div>
          </div>

          <!-- E1.3 Baterías -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.3 BATERÍAS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ e1_marcaModeloBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE BATERÍA:</div>
                <div style="color: #d97860;">{{ e1_tipoBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE PLACA:</div>
                <div style="color: #d97860;">{{ e1_tipoPlacaBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">C10 (Ah):</div>
                <div style="color: #d97860;">{{ e1_c10Bateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">C100 (Ah):</div>
                <div style="color: #d97860;">{{ e1_c100Bateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL (V):</div>
                <div style="color: #d97860;">{{ e1_tensionNominalBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROFUNDIDAD DESCARGA:</div>
                <div style="color: #d97860;">{{ e1_profundidadDescargaBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionMaximaBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÍNIMA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionMinimaBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTENSIDAD MÁX CARGA (A):</div>
                <div style="color: #d97860;">{{ e1_intensidadMaximaCargaBateria }}</div>
              </div>
            </div>
          </div>

          <!-- E1.4 Regulador -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.4 REGULADOR</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ e1_marcaModeloRegulador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTENSIDAD MÁXIMA (A):</div>
                <div style="color: #d97860;">{{ e1_intensidadMaximaRegulador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN CORTE ALTA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionCorteAltaRegulador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN CORTE BAJA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionCorteBajaRegulador }}</div>
              </div>
            </div>
          </div>

          <!-- E1.5 Inversor -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.5 INVERSOR</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ e1_marcaModeloInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA NOMINAL (W):</div>
                <div style="color: #d97860;">{{ e1_potenciaNominalInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">REND 10%:</div>
                <div style="color: #d97860;">{{ e1_rendimientoInversor10 }}</div>
              </div>
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">REND 25%:</div>
                <div style="color: #d97860;">{{ e1_rendimientoInversor25 }}</div>
              </div>
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">REND 50%:</div>
                <div style="color: #d97860;">{{ e1_rendimientoInversor50 }}</div>
              </div>
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">REND 75%:</div>
                <div style="color: #d97860;">{{ e1_rendimientoInversor75 }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 9px; margin-bottom: 3px;">REND 100%:</div>
                <div style="color: #d97860;">{{ e1_rendimientoInversor100 }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">RELACIÓN TENSIÓN VCC/VCA:</div>
                <div style="color: #d97860;">{{ e1_relacionTensionInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">FORMA ONDA SALIDA:</div>
                <div style="color: #d97860;">{{ e1_formaOndaSalidaInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">FRECUENCIA NOMINAL (Hz):</div>
                <div style="color: #d97860;">{{ e1_frecuenciaNominalInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁX ENTRADA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionMaximaEntradaInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN SALIDA (V):</div>
                <div style="color: #d97860;">{{ e1_tensionSalidaInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CONSUMO EN VACÍO:</div>
                <div style="color: #d97860;">{{ e1_consumoVacioInversor }}</div>
              </div>
            </div>
          </div>

          <!-- E1.6 Otros -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.6 OTROS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CONVERTIDOR CC/CC:</div>
                <div style="color: #d97860;">{{ e1_convertidorCC_CC }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">REL TENSIÓN VCC1/VCC2:</div>
                <div style="color: #d97860;">{{ e1_relacionTensionCC }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">VARIADOR FRECUENCIA:</div>
                <div style="color: #d97860;">{{ e1_variadorFrecuencia }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">GRUPO AUXILIAR APOYO:</div>
                <div style="color: #d97860;">{{ e1_grupoAuxiliarApoyo }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA GRUPO AUX (W):</div>
                <div style="color: #d97860;">{{ e1_potenciaGrupoAuxiliar }}</div>
              </div>
            </div>
            <div style="padding: 8px; margin-top: 8px; border-bottom: 1px solid #000;">
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">OTROS EQUIPOS:</div>
              <div style="color: #d97860; font-size: 10px; white-space: pre-wrap;">{{ e1_otrosEquipos }}</div>
            </div>
          </div>

          <!-- E1.7 Información de la Demanda -->
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E1.7 INFORMACIÓN DE LA DEMANDA</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA MÁX DEMANDADA (W):</div>
                <div style="color: #d97860;">{{ e1_potenciaMaximaDemanda }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PERIODICIDAD:</div>
                <div style="color: #d97860;">{{ e1_periodicidadDemanda }}</div>
              </div>
            </div>
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 8px;">ENERGÍA DIARIA MEDIA MENSUAL (Wh/día):</div>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; border: 1px solid #000;">
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">ENE</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaEnero }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">FEB</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaFebrero }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">MAR</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaMarzo }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">ABR</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaAbril }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">MAY</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaMayo }}</div>
              </div>
              <div style="text-align: center; padding: 8px;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">JUN</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaJunio }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; border: 1px solid #000;">
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">JUL</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaJulio }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">AGO</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaAgosto }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">SEP</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaSeptiembre }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">OCT</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaOctubre }}</div>
              </div>
              <div style="text-align: center; padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">NOV</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaNoviembre }}</div>
              </div>
              <div style="text-align: center; padding: 8px;">
                <div style="font-weight: bold; font-size: 9px; background-color: #f4b5a0;">DIC</div>
                <div style="color: #d97860; font-size: 9px;">{{ e1_energiaDiariaDiciembre }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- E2: INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO -->
        <div style="padding: 8px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px;">E2. INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO</div>
          
          <!-- E2.1 Conexión a la Red -->
          <div style="border: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.1 CONEXIÓN A LA RED</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA NOMINAL TOTAL EN INVERSORES (kW):</div>
                <div style="color: #d97860;">{{ potenciaNominalInversores }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO:</div>
                <div style="color: #d97860;">{{ tipoConexionRed }}</div>
              </div>
            </div>
          </div>

          <!-- E2.2 Módulo Fotovoltaico -->
          <div style="border: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.2 MÓDULO FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TECNOLOGÍA DE LA CÉLULA:</div>
                <div style="color: #d97860;">{{ tecnologiaCelulaModulo }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ marcaModeloModulo }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860;">{{ potenciaPicoModulo }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TONC (ºC):</div>
                <div style="color: #d97860;">{{ toncModulo }}</div>
              </div>
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.3 GENERADOR FOTOVOLTAICO</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO (Wp):</div>
                <div style="color: #d97860;">{{ potenciaPicoGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA POTENCIA, Vpmp (V):</div>
                <div style="color: #d97860;">{{ tensionVpmpGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTENSIDAD MÁXIMA POTENCIA, Ipmp (A):</div>
                <div style="color: #d97860;">{{ intensidadIpmpGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ORIENTACIÓN (º):</div>
                <div style="color: #d97860;">{{ orientacionGenerador }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INCLINACIÓN RESPECTO A HORIZONTAL (º):</div>
                <div style="color: #d97860;">{{ inclinacionGenerador }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº TOTAL DE MÓDULOS:</div>
                <div style="color: #d97860;">{{ totalModulos }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE MÓDULOS EN SERIE POR RAMA:</div>
                <div style="color: #d97860;">{{ modulosEnSerie }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Nº DE RAMAS EN PARALELO:</div>
                <div style="color: #d97860;">{{ ramrasEnParalelo }}</div>
              </div>
            </div>
          </div>

          <!-- E2.4 Inversor/es -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.4 INVERSOR/ES</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ marcaModeloInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA AC NOMINAL (Kw):</div>
                <div style="color: #d97860;">{{ potenciaACInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL AC, Vn (V):</div>
                <div style="color: #d97860;">{{ tensionNominalInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Vcc MÁXIMA (V):</div>
                <div style="color: #d97860;">{{ vccMaximaInversor }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">Vcc MÍNIMA (V):</div>
                <div style="color: #d97860;">{{ vccMinimaInversor }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CONEXIÓN:</div>
                <div style="color: #d97860;">{{ tipoConexionInversor }}</div>
              </div>
            </div>
          </div>

          <!-- E2.5 Baterías -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.5 BATERÍAS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
                <div style="color: #d97860;">{{ marcaModeloBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE BATERÍA:</div>
                <div style="color: #d97860;">{{ tipoBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL (V):</div>
                <div style="color: #d97860;">{{ tensionNominalBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PROFUNDIDAD DE DESCARGA (%):</div>
                <div style="color: #d97860;">{{ profundidadDescargaBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 8px; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA (V):</div>
                <div style="color: #d97860;">{{ tensionMaximaBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÍNIMA (V):</div>
                <div style="color: #d97860;">{{ tensionMinimaBateria }}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ENERGÍA TOTAL (kWh):</div>
                <div style="color: #d97860;">{{ energiaTotalBateria }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA MÁXIMA SALIDA (kW):</div>
                <div style="color: #d97860;">{{ potenciaMaximaSalidaBateria }}</div>
              </div>
            </div>
          </div>

          <!-- E2.6 Protecciones Externas -->
          <div style="border-bottom: 1px solid #000; padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px;">E2.6 PROTECCIONES EXTERNAS</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #000;">
              <div style="padding: 8px; border-right: 1px solid #000;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">INTERRUPTOR GENERAL - In (A):</div>
                <div style="color: #d97860;">{{ intensidadInterruptorGeneral }}</div>
              </div>
              <div style="padding: 8px;">
                <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">PODER DE CORTE (kA):</div>
                <div style="color: #d97860;">{{ poderCorteInterruptor }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN F: MEDIDAS DE PROTECCIÓN EMPLEADAS -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">F | MEDIDAS DE PROTECCIÓN EMPLEADAS</div>
        
        <div style="padding: 8px;">
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
            <tr v-if="medidaPuntoCaliente" style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Efecto Punto Caliente (3 Diodos Bypass)</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaPuntoCaliente }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionPuntoCaliente }}</td>
            </tr>
            <tr v-if="medidaExplosion" style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Riesgo de Explosión</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaExplosion }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionExplosion }}</td>
            </tr>
            <tr v-if="medidaCorrosion" style="border: 1px solid #000;">
              <td style="border: 1px solid #000; padding: 5px;">Riesgo de Corrosión</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ medidaCorrosion }}</td>
              <td style="border: 1px solid #000; padding: 5px; color: #d97860;">{{ parteInstalacionCorrosion }}</td>
            </tr>
          </table>

          <!-- Otras Protecciones -->
          <div v-if="otrasProtecciones" style="margin-top: 15px; padding: 8px; background-color: #fff9f7; border: 1px solid #f4b5a0;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 5px;">OTRAS MEDIDAS DE PROTECCIÓN:</div>
            <div style="color: #d97860; font-size: 10px; line-height: 1.5;">{{ otrasProtecciones }}</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN G: CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">G | CARACTERÍSTICAS DE LAS LÍNEAS Y CIRCUITOS</div>
        
        <div style="padding: 8px; overflow-x: auto;">
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
  // E2.6
  intensidadInterruptorGeneral: String,
  poderCorteInterruptor: String,
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
  // Sección H: ESQUEMA UNIFILAR
  esquemaUnifilar: String,
  // Sección I: PLANO EMPLAZAMIENTO
  planoEmplazamiento: String,
  // Generado
  generatedDate: {
    type: String,
    default: new Date().toLocaleDateString('es-ES')
  }
})

import { ref } from 'vue'

const tipoInstalacionSeleccionada = ref('Nueva')
</script>

<style scoped>
/* ESTILOS GENERALES */
.section-container {
  border: 2px solid #000;
  margin-bottom: 15px;
}

.section-header {
  background-color: #f4b5a0;
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #000;
}

.section-body {
  padding: 8px;
}

/* CONTENEDORES DE FILAS CON GRIDS */
.grid-row {
  display: grid;
  gap: 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #000;
}

.grid-row-2col {
  grid-template-columns: 1fr 1fr;
}

.grid-row-3col {
  grid-template-columns: repeat(3, 1fr);
}

.grid-row-5col {
  grid-template-columns: repeat(5, 1fr);
}

.grid-row-6col {
  grid-template-columns: repeat(6, 1fr);
}

/* CELDAS DE GRID */
.grid-cell {
  padding: 8px;
}

.grid-cell-left {
  border-right: 1px solid #000;
}

.grid-cell-header {
  text-align: center;
  background-color: #f4b5a0;
}

/* TIPOGRAFÍA */
.field-label {
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 3px;
}

.field-label-large {
  font-weight: bold;
  font-size: 11px;
  margin-bottom: 8px;
}

.field-value {
  color: #d97860;
  min-height: 20px;
}

.field-value-large {
  min-height: 40px;
}

/* SUBSECCIONES E1-E2 */
.subsection {
  border-bottom: 1px solid #000;
  padding: 8px;
  margin-bottom: 0;
}

.subsection-last {
  border-bottom: none;
}

.subsection-title {
  font-weight: bold;
  margin-bottom: 8px;
}

/* ELEMENTOS ESPECIALES */
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 11px;
  margin-bottom: 8px;
}

.checkbox-options {
  display: flex;
  gap: 20px;
  margin-bottom: 5px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 5px;
}

.checkbox-option input {
  cursor: pointer;
}

.checkbox-option label {
  cursor: pointer;
  font-size: 10px;
}

.signature-section {
  padding: 15px;
  text-align: center;
  border-top: 1px solid #000;
}

.signature-date {
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 10px;
}

.signature-image {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.signature-name {
  font-weight: bold;
  font-size: 10px;
  border-top: 1px solid #000;
  padding-top: 5px;
}

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
