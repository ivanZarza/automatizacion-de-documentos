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
        
        <!-- E.1.1 Módulo Fotovoltaico -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.1 MÓDULO FOTOVOLTAICO</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA PICO DEL MÓDULO (Wp):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaPicoModulo }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO DEL MÓDULO:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloModulo }}</div>
            </div>
          </div>
        </div>

        <!-- E.1.2 Generador Fotovoltaico -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.2 GENERADOR FOTOVOLTAICO</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN DE MÁXIMA POTENCIA DEL GENERADOR (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionMaximaPotenciaGenerador }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ORIENTACIONES DEL GENERADOR (Nº):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ orientacionesGenerador }}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TOTAL DE MÓDULOS:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ totalModulos }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">RAMAS EN PARALELO:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ ramrasEnParalelo }}</div>
            </div>
          </div>
        </div>

        <!-- E.1.3 Baterías -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.3 BATERÍAS</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TIPO DE BATERÍA:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tiposBateria }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN DE LA BATERÍA (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionBateria }}</div>
            </div>
          </div>

          <div style="margin-bottom: 8px;">
            <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">CAPACIDAD DE LA BATERÍA (Ah):</div>
            <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ capacidadBateria }}</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN NOMINAL BATERÍA (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionNominalBateria }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN MÁXIMA ALCANZABLE (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionMaximaAlcanzableBateria }}</div>
            </div>
          </div>
        </div>

        <!-- E.1.4 Regulador -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.4 REGULADOR</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloRegulador }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN DE CORTE (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionCorteRegulador }}</div>
            </div>
          </div>
        </div>

        <!-- E.1.5 Inversor -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.5 INVERSOR</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">MARCA Y MODELO:</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ marcaModeloInversor }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA NOMINAL (kVa):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaNominalInversor }}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN DE ENTRADA (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionEntradaInversor }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">TENSIÓN DE SALIDA (V):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ tensionSalidaInversor }}</div>
            </div>
          </div>
        </div>

        <!-- E.1.7 Información de la Demanda -->
        <div style="border-bottom: 1px solid #000; padding: 10px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 8px;">E.1.7 INFORMACIÓN DE LA DEMANDA</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">POTENCIA MÁXIMA DEMANDA (kWh):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ potenciaMaximaDemanda }}</div>
            </div>
            <div>
              <div style="font-weight: bold; font-size: 10px; margin-bottom: 3px;">ENERGÍA DIARIA MEDIA DEMANDA (kWh/día):</div>
              <div style="color: #d97860; padding: 5px; background-color: #fff9f7;">{{ energiaDiariaDemanda }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN F: PLANOS Y ESQUEMAS -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">F | PLANOS Y ESQUEMAS</div>
        
        <!-- Plano de Emplazamiento -->
        <div style="border-bottom: 1px solid #000; padding: 15px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px; font-size: 11px;">F.1 PLANO DE EMPLAZAMIENTO</div>
          <div style="color: #333; font-size: 10px; margin-bottom: 10px;">Fotografía aérea o plano del emplazamiento de la instalación:</div>
          <div style="border: 2px dashed #d97860; padding: 30px; text-align: center; background-color: #fff9f7; min-height: 150px; display: flex; align-items: center; justify-content: center;">
            <img v-if="planoEmplazamiento" :src="planoEmplazamiento" style="max-width: 100%; max-height: 150px; object-fit: contain;" />
            <div v-else style="color: #999; font-size: 12px;">Imagen del plano de emplazamiento</div>
          </div>
        </div>

        <!-- Esquema Unifilar -->
        <div style="padding: 15px;">
          <div style="font-weight: bold; background-color: #f0f0f0; padding: 5px; margin-bottom: 10px; font-size: 11px;">F.2 ESQUEMA UNIFILAR</div>
          <div style="color: #333; font-size: 10px; margin-bottom: 10px;">Esquema eléctrico unifilar de la instalación:</div>
          <div style="border: 2px dashed #d97860; padding: 30px; text-align: center; background-color: #fff9f7; min-height: 150px; display: flex; align-items: center; justify-content: center;">
            <img v-if="esquemaUnifilar" :src="esquemaUnifilar" style="max-width: 100%; max-height: 150px; object-fit: contain;" />
            <div v-else style="color: #999; font-size: 12px;">Esquema eléctrico unifilar</div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN G: DOCUMENTACIÓN TÉCNICA -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">G | DOCUMENTACIÓN TÉCNICA Y CERTIFICADOS</div>
        
        <div style="padding: 10px;">
          <div style="font-weight: bold; margin-bottom: 10px;">Documentación requerida adjunta:</div>
          
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" :checked="documentacionTecnica?.includes('certificados')" />
              <span>Certificados de homologación de módulos fotovoltaicos</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" :checked="documentacionTecnica?.includes('inversor')" />
              <span>Certificado de homologación del inversor</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" :checked="documentacionTecnica?.includes('regulador')" />
              <span>Certificado de homologación del regulador (si aplica)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" :checked="documentacionTecnica?.includes('bateria')" />
              <span>Certificado de homologación de baterías (si aplica)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" :checked="documentacionTecnica?.includes('seguridad')" />
              <span>Certificado de conformidad y seguridad de la instalación</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN H: NORMATIVA Y CONFORMIDAD -->
      <div style="border: 2px solid #000; margin-bottom: 15px;">
        <div style="background-color: #f4b5a0; padding: 8px; font-weight: bold;">H | NORMATIVA Y CONFORMIDAD</div>
        
        <div style="padding: 10px; font-size: 10px; line-height: 1.6;">
          <p style="margin: 5px 0; font-weight: bold;">Esta instalación se ha realizado de conformidad con:</p>
          <ul style="margin: 8px 0 0 20px; padding-left: 0;">
            <li>Real Decreto 842/2002, de 2 de agosto, por el que se aprueba el Reglamento Electrotécnico para Baja Tensión (REBT)</li>
            <li>UNE 20460-1 y UNE 20460-7-712: Instalaciones eléctricas de baja tensión</li>
            <li>RD 1699/2003 para el procedimiento administrativo de conexión a red (si aplica)</li>
            <li>Normativa específica aplicable en la comunidad autónoma correspondiente</li>
            <li>Código Técnico de la Edificación (CTE) en vigor</li>
          </ul>
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
  // Sección E
  potenciaPicoModulo: String,
  marcaModeloModulo: String,
  tensionMaximaPotenciaGenerador: String,
  orientacionesGenerador: String,
  totalModulos: String,
  ramrasEnParalelo: String,
  tiposBateria: String,
  tensionBateria: String,
  capacidadBateria: String,
  tensionNominalBateria: String,
  tensionMaximaAlcanzableBateria: String,
  marcaModeloRegulador: String,
  tensionCorteRegulador: String,
  marcaModeloInversor: String,
  potenciaNominalInversor: String,
  tensionEntradaInversor: String,
  tensionSalidaInversor: String,
  potenciaMaximaDemanda: String,
  energiaDiariaDemanda: String,
  // Sección F - Imágenes
  planoEmplazamiento: String,
  esquemaUnifilar: String,
  // Sección G - Documentación
  documentacionTecnica: Array,
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
