/**
 * Configuración de campos para el Formulario Maestro
 * Todos los campos de Memoria Técnica organizados por secciones
 */

export const masterFormFields = [
  // ========== SECCIÓN EXPEDIENTE ==========
  /* { 
    name: 'numeroExpediente', 
    label: 'Número de Expediente', 
    placeholder: 'Ej: EXP-2025-001', 

  

    name: 'numeroRegistro', 
    label: 'Número de Registro', 
    placeholder: 'Ej: REG-2025-001', 
    type: 'text' 
  },
  { 
    name: 'ciudadFirma', 
    label: 'Ciudad de Firma', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  */
  {
    name: 'fecha',
    label: 'Fecha',
    placeholder: 'Ej: 16/10/2025',
    type: 'date'
  },
  /*
    // ========== SECCIÓN A: TITULAR ==========
    { 
      name: 'apellidosNombre', 
      label: 'Apellidos y Nombre del Titular', 
      placeholder: 'Ej: García López, Juan', 
      type: 'text',
      fullWidth: true
    },
    { 
      name: 'nifCif', 
      label: 'NIF/CIF del Titular', 
      placeholder: 'Ej: 12.345.678-A', 
      type: 'text' 
    },
    { 
      name: 'domicilio', 
      label: 'Domicilio del Titular', 
      placeholder: 'Ej: Calle Principal, 25', 
      type: 'text',
      fullWidth: true
    },
    { 
      name: 'codigoPostal', 
      label: 'Código Postal', 
      placeholder: 'Ej: 41001', 
      type: 'text' 
    },
    { 
      name: 'localidad', 
      label: 'Localidad', 
      placeholder: 'Ej: Sevilla', 
      type: 'text' 
    },
    { 
      name: 'provincia', 
      label: 'Provincia', 
      placeholder: 'Ej: Sevilla', 
      type: 'text' 
    },
    { 
      name: 'correoElectronico', 
      label: 'Correo Electrónico', 
      placeholder: 'Ej: ejemplo@correo.com', 
      type: 'email',
      fullWidth: true
    },
    { 
      name: 'telefono', 
      label: 'Teléfono', 
      placeholder: 'Ej: 954 123 456', 
      type: 'tel' 
    },
    { 
      name: 'representante', 
      label: 'Representante (si aplica)', 
      placeholder: 'Ej: Empresa XYZ S.L.', 
      type: 'text',
      fullWidth: true
    },
    { 
      name: 'dniRepresentante', 
      label: 'DNI/CIF del Representante', 
      placeholder: 'Ej: B12345678', 
      type: 'text' 
    }, */


  // ========== SECCIÓN B: EMPLAZAMIENTO ==========
  {
    name: 'telefono',
    label: 'Teléfono Móvil',
    placeholder: 'Ej: 654 123 456',
    type: 'tel'
  },
    // ========== SECCIÓN OTROS: ESTABLECIMIENTO ==========
    {
      name: 'denominacionEstablecimiento',
      label: 'Denominación del Establecimiento',
      placeholder: 'Ej: Bar Los Amigos',
      type: 'text',
      fullWidth: true
    },
    {
      name: 'tipoVia',
      label: 'Tipo de Vía',
      placeholder: 'Ej: Avenida, Calle, Plaza...',
      type: 'text',
      fullWidth: true
    },
  {
    name: 'telefonoFijo',
    label: 'Teléfono Fijo',
    placeholder: 'Ej: 954 123 456',
    type: 'tel'
  },
  {
    name: 'emplazamientoCalle',
    label: 'Calle del Emplazamiento',
    placeholder: 'Ej: Avenida de la Innovación',
    type: 'text',
    fullWidth: true
  },
  {
    name: 'numero',
    label: 'Número',
    placeholder: 'Ej: 42',
    type: 'text'
  },
    { 
        name: 'planta',
        label: 'Planta',
        placeholder: 'Ej: 1ª, 2ª, Bajo...',
        type: 'text',
        fullWidth: true
      },
  {
    name: 'bloque',
    label: 'Bloque',
    placeholder: 'Ej: A',
    type: 'text'
  },
  {
    name: 'escalera',
    label: 'Escalera',
    placeholder: 'Ej: 1',
    type: 'text'
  },
  {
    name: 'letra',
    label: 'Letra',
    placeholder: 'Ej: B',
    type: 'text'
  },
  {
    name: 'KMEnLaVia',
    label: 'KM en la Vía',
    placeholder: 'Ej: 5',
    type: 'text'
  },
  {
    name: 'piso',
    label: 'Piso',
    placeholder: 'Ej: 3º',
    type: 'text'
  },
    {
    name: 'puerta',
    label: 'Puerta',
    placeholder: 'Ej: B',
    type: 'text'
  },
  {
    name: 'localidadEmplazamiento',
    label: 'Localidad del Emplazamiento',
    placeholder: 'Ej: Sevilla',
    type: 'text'
  },
  {
    name: 'provinciaEmplazamiento',
    label: 'Provincia del Emplazamiento',
    placeholder: 'Ej: Sevilla',
    type: 'text'
  },
  {
    name: 'codigoPostalEmplazamiento',
    label: 'Código Postal del Emplazamiento',
    placeholder: 'Ej: 41001',
    type: 'text'
  },
  {
    name: 'correoElectronicoEmplazamiento',
    label: 'Correo Electrónico del Emplazamiento',
    placeholder: 'Ej: emplazamiento@correo.com',
    type: 'email',
    fullWidth: true
  },
  {
    name: 'tipoInstalacion',
    label: 'Tipo de Instalación',
    placeholder: 'Seleccionar tipo...',
    type: 'select',
    options: [
      'Fotovoltaica conectada a red interior',
      'Fotovoltaica aislada',
      'Instalación con fines especiales'
    ]
  },
  {
    name: 'usoDestino',
    label: 'Uso y Destino',
    placeholder: 'Ej: Autoconsumo para vivienda',
    type: 'text',
    fullWidth: true
  },
  {
    name: 'referenciaCatastral',
    label: 'Referencia Catastral',
    placeholder: 'Ej: 4127805SG0000200000CT',
    type: 'text',
    fullWidth: true
  }, {
    name: 'apellidosNombre',
    label: 'Apellidos y Nombre del Titular',
    placeholder: 'Ej: García López, Juan',
    type: 'text',
    fullWidth: true
  },
  {
    name: 'nifCif',
    label: 'NIF/CIF del Titular',
    placeholder: 'Ej: 12.345.678-A',
    type: 'text'
  },
  /*   {
      name: 'instalacion',
      label: 'Tipo de Instalación',
      placeholder: 'Seleccionar tipo...',
      type: 'select',
      options: [
        'nueva',
        'ampliacion',
        'modificacion'
      ]
    }, */

  // ========== SECCIÓN C: PERSONA QUE FIRMA ==========
  /*  { 
     name: 'nombreTecnicoInstalador', 
     label: 'Nombre del Técnico Instalador', 
     placeholder: 'Ej: Eduardo Rivera Cabezas', 
     type: 'text',
     fullWidth: true
   },
   { 
     name: 'numeroCertificadoInstalador', 
     label: 'Número de Certificado del Instalador', 
     placeholder: 'Ej: 4654 COIIAOC', 
     type: 'text' 
   },
   { 
     name: 'numeroInstaladorEmpresa', 
     label: 'Número de Instalador de la Empresa', 
     placeholder: 'Ej: 41045500', 
     type: 'text' 
   },
   { 
     name: 'domicilioTecnico', 
     label: 'Domicilio del Técnico', 
     placeholder: 'Ej: Calle Ebro', 
     type: 'text',
     fullWidth: true
   },
   { 
     name: 'numeroTecnico', 
     label: 'Número (Domicilio Técnico)', 
     placeholder: 'Ej: 35', 
     type: 'text' 
   },
   { 
     name: 'localidadTecnico', 
     label: 'Localidad del Técnico', 
     placeholder: 'Ej: Sevilla', 
     type: 'text' 
   },
   { 
     name: 'codigoPostalTecnico', 
     label: 'Código Postal del Técnico', 
     placeholder: 'Ej: 41012', 
     type: 'text' 
   },
   { 
     name: 'telefonoTecnico', 
     label: 'Teléfono del Técnico', 
     placeholder: 'Ej: 629 118 196', 
     type: 'tel' 
   },
   { 
     name: 'nombreTecnicoCompetente', 
     label: 'Nombre del Técnico Competente (si aplica)', 
     placeholder: 'Opcional', 
     type: 'text',
     fullWidth: true
   },
   { 
     name: 'domicilioTecnicoCompetente', 
     label: 'Domicilio del Técnico Competente', 
     placeholder: 'Opcional', 
     type: 'text',
     fullWidth: true
   },
   { 
     name: 'numeroTecnicoCompetente', 
     label: 'Número (Técnico Competente)', 
     placeholder: 'Opcional', 
     type: 'text' 
   },
   { 
     name: 'localidadTecnicoCompetente', 
     label: 'Localidad del Técnico Competente', 
     placeholder: 'Opcional', 
     type: 'text' 
   },
   { 
     name: 'codigoPostalTecnicoCompetente', 
     label: 'Código Postal del Técnico Competente', 
     placeholder: 'Opcional', 
     type: 'text' 
   },
   { 
     name: 'telefonoTecnicoCompetente', 
     label: 'Teléfono del Técnico Competente', 
     placeholder: 'Opcional', 
     type: 'tel' 
   },
   { 
     name: 'colegioOficial', 
     label: 'Colegio Oficial', 
     placeholder: 'Ej: Colegio de Ingenieros', 
     type: 'text',
     fullWidth: true
   },
   { 
     name: 'numeroColegiado', 
     label: 'Número de Colegiado', 
     placeholder: 'Ej: 12345', 
     type: 'text' 
   },
  */
  // ========== SECCIÓN D: MODALIDADES ==========
  /* { 
    name: 'modalidadBasicaM1', 
    label: 'Modalidad Básica M1', 
    type: 'text' 
  },
  { 
    name: 'modalidadBasicaM2', 
    label: 'Modalidad Básica M2', 
    type: 'text' 
  },
  { 
    name: 'modalidadBasicaM3', 
    label: 'Modalidad Básica M3', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM4', 
    label: 'Modalidad Especialista M4', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM5', 
    label: 'Modalidad Especialista M5', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM6', 
    label: 'Modalidad Especialista M6', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM7', 
    label: 'Modalidad Especialista M7', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM8', 
    label: 'Modalidad Especialista M8', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM9', 
    label: 'Modalidad Especialista M9', 
    type: 'text' 
  }, */

  // ========== SECCIÓN E1: INSTALACIÓN AISLADA ==========
  /*  // E1.1 Módulo Fotovoltaico
   { name: 'e1_tecnologiaCelulaModulo', label: 'TECNOLOGÍA DE LA CÉLULA', placeholder: 'Ej: Monocristalino', type: 'text', subsection: 'E1.1' },
   { name: 'e1_marcaModeloModulo', label: 'MARCA Y MODELO', placeholder: 'Ej: JAM72S30 535/MR', type: 'text', subsection: 'E1.1', fullWidth: true },
   { name: 'e1_potenciaPicoModulo', label: 'POTENCIA PICO (Wp)', placeholder: 'Ej: 535', type: 'text', subsection: 'E1.1' },
   { name: 'e1_toncModulo', label: 'TONC (ºC)', placeholder: 'Ej: 45', type: 'text', subsection: 'E1.1' },
 
   // E1.2 Generador Fotovoltaico
   { name: 'e1_potenciaPicoGenerador', label: 'POTENCIA PICO (Wp)', placeholder: 'Ej: 5350', type: 'text', subsection: 'E1.2' },
   { name: 'e1_intensidadIpmpGenerador', label: 'INTENSIDAD MÁXIMA POTENCIA, Ipmp (A)', placeholder: 'Ej: 10.84', type: 'text', subsection: 'E1.2' },
   { name: 'e1_tensionVpmpGenerador', label: 'TENSIÓN MÁXIMA POTENCIA, Vpmp (V)', placeholder: 'Ej: 493', type: 'text', subsection: 'E1.2' },
   { name: 'e1_orientacionGenerador', label: 'ORIENTACIÓN', placeholder: 'Ej: Sur', type: 'text', subsection: 'E1.2' },
   { name: 'e1_inclinacionGenerador', label: 'INCLINACIÓN (º)', placeholder: 'Ej: 30', type: 'text', subsection: 'E1.2' },
   { name: 'e1_totalModulos', label: 'Nº TOTAL MÓDULOS', placeholder: 'Ej: 10', type: 'text', subsection: 'E1.2' },
   { name: 'e1_modulosEnSerie', label: 'Nº MÓDULOS EN SERIE', placeholder: 'Ej: 10', type: 'text', subsection: 'E1.2' },
   { name: 'e1_ramasEnParalelo', label: 'Nº RAMAS EN PARALELO', placeholder: 'Ej: 1', type: 'text', subsection: 'E1.2' },
 
   // E1.3 Baterías
   { name: 'e1_marcaModeloBateria', label: 'MARCA Y MODELO', placeholder: 'Ej: LG Chem RESU', type: 'text', subsection: 'E1.3', fullWidth: true },
   { name: 'e1_tipoBateria', label: 'TIPO DE BATERÍA', placeholder: 'Ej: Litio-Hierro Fosfato', type: 'text', subsection: 'E1.3' },
   { name: 'e1_tipoPlacaBateria', label: 'TIPO DE PLACA', placeholder: 'Ej: OPzS', type: 'text', subsection: 'E1.3' },
   { name: 'e1_c10Bateria', label: 'C10 (Ah)', placeholder: 'Ej: 2300', type: 'text', subsection: 'E1.3' },
   { name: 'e1_c100Bateria', label: 'C100 (Ah)', placeholder: 'Ej: 2500', type: 'text', subsection: 'E1.3' },
   { name: 'e1_tensionNominalBateria', label: 'TENSIÓN NOMINAL (V)', placeholder: 'Ej: 48', type: 'text', subsection: 'E1.3' },
   { name: 'e1_profundidadDescargaBateria', label: 'PROFUNDIDAD DESCARGA', placeholder: 'Ej: 80', type: 'text', subsection: 'E1.3' },
   { name: 'e1_tensionMaximaBateria', label: 'TENSIÓN MÁXIMA (V)', placeholder: 'Ej: 57.6', type: 'text', subsection: 'E1.3' },
   { name: 'e1_tensionMinimaBateria', label: 'TENSIÓN MÍNIMA (V)', placeholder: 'Ej: 44.8', type: 'text', subsection: 'E1.3' },
   { name: 'e1_intensidadMaximaCargaBateria', label: 'INTENSIDAD MÁX CARGA (A)', placeholder: 'Ej: 100', type: 'text', subsection: 'E1.3' },
 
   // E1.4 Regulador
   { name: 'e1_marcaModeloRegulador', label: 'MARCA Y MODELO', placeholder: 'Ej: Victron SmartSolar', type: 'text', subsection: 'E1.4', fullWidth: true },
   { name: 'e1_intensidadMaximaRegulador', label: 'INTENSIDAD MÁXIMA (A)', placeholder: 'Ej: 100', type: 'text', subsection: 'E1.4' },
   { name: 'e1_tensionCorteAltaRegulador', label: 'TENSIÓN CORTE ALTA (V)', placeholder: 'Ej: 57.6', type: 'text', subsection: 'E1.4' },
   { name: 'e1_tensionCorteBajaRegulador', label: 'TENSIÓN CORTE BAJA (V)', placeholder: 'Ej: 44.8', type: 'text', subsection: 'E1.4' },
 
   // E1.5 Inversor
   { name: 'e1_marcaModeloInversor', label: 'MARCA Y MODELO', placeholder: 'Ej: Victron MultiPlus', type: 'text', subsection: 'E1.5', fullWidth: true },
   { name: 'e1_potenciaNominalInversor', label: 'POTENCIA NOMINAL (W)', placeholder: 'Ej: 3000', type: 'text', subsection: 'E1.5' },
   { name: 'e1_rendimientoInversor10', label: 'REND 10%', placeholder: 'Ej: 85', type: 'text', subsection: 'E1.5' },
   { name: 'e1_rendimientoInversor25', label: 'REND 25%', placeholder: 'Ej: 90', type: 'text', subsection: 'E1.5' },
   { name: 'e1_rendimientoInversor50', label: 'REND 50%', placeholder: 'Ej: 93', type: 'text', subsection: 'E1.5' },
   { name: 'e1_rendimientoInversor75', label: 'REND 75%', placeholder: 'Ej: 92', type: 'text', subsection: 'E1.5' },
   { name: 'e1_rendimientoInversor100', label: 'REND 100%', placeholder: 'Ej: 91', type: 'text', subsection: 'E1.5' },
   { name: 'e1_relacionTensionInversor', label: 'RELACIÓN TENSIÓN VCC/VCA', placeholder: 'Ej: 48V→230V', type: 'text', subsection: 'E1.5' },
   { name: 'e1_formaOndaSalidaInversor', label: 'FORMA ONDA SALIDA', placeholder: 'Ej: Senoidal Pura', type: 'text', subsection: 'E1.5' },
   { name: 'e1_frecuenciaNominalInversor', label: 'FRECUENCIA NOMINAL (Hz)', placeholder: 'Ej: 50', type: 'text', subsection: 'E1.5' },
   { name: 'e1_tensionMaximaEntradaInversor', label: 'TENSIÓN MÁX ENTRADA (V)', placeholder: 'Ej: 65', type: 'text', subsection: 'E1.5' },
   { name: 'e1_tensionSalidaInversor', label: 'TENSIÓN SALIDA (V)', placeholder: 'Ej: 230', type: 'text', subsection: 'E1.5' },
   { name: 'e1_consumoVacioInversor', label: 'CONSUMO EN VACÍO', placeholder: 'Ej: 50', type: 'text', subsection: 'E1.5' },
 
   // E1.6 Otros
   { name: 'e1_convertidorCC_CC', label: 'CONVERTIDOR CC/CC', placeholder: 'Opcional', type: 'text', subsection: 'E1.6', fullWidth: true },
   { name: 'e1_relacionTensionCC', label: 'REL TENSIÓN VCC1/VCC2', placeholder: 'Opcional', type: 'text', subsection: 'E1.6' },
   { name: 'e1_variadorFrecuencia', label: 'VARIADOR FRECUENCIA', placeholder: 'Opcional', type: 'text', subsection: 'E1.6', fullWidth: true },
   { name: 'e1_grupoAuxiliarApoyo', label: 'GRUPO AUXILIAR APOYO', placeholder: 'Opcional', type: 'text', subsection: 'E1.6', fullWidth: true },
   { name: 'e1_potenciaGrupoAuxiliar', label: 'POTENCIA GRUPO AUX (W)', placeholder: 'Opcional', type: 'text', subsection: 'E1.6' },
   { name: 'e1_otrosEquipos', label: 'OTROS EQUIPOS', placeholder: 'Opcional', type: 'textarea', subsection: 'E1.6', fullWidth: true },
 
   // E1.7 Información de la Demanda
   { name: 'e1_potenciaMaximaDemanda', label: 'POTENCIA MÁX DEMANDADA (W)', placeholder: 'Ej: 3000', type: 'text', subsection: 'E1.7' },
   { name: 'e1_periodicidadDemanda', label: 'PERIODICIDAD', placeholder: 'Ej: Diaria', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaMediaMensual', label: 'ENERGÍA DIARIA MEDIA MENSUAL (Wh/día)', placeholder: 'Ej: 15500', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaEnero', label: 'ENE', placeholder: 'Ej: 15.5', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaFebrero', label: 'FEB', placeholder: 'Ej: 16.2', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaMarzo', label: 'MAR', placeholder: 'Ej: 18.5', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaAbril', label: 'ABR', placeholder: 'Ej: 20.1', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaMayo', label: 'MAY', placeholder: 'Ej: 22.3', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaJunio', label: 'JUN', placeholder: 'Ej: 23.8', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaJulio', label: 'JUL', placeholder: 'Ej: 24.5', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaAgosto', label: 'AGO', placeholder: 'Ej: 24.1', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaSeptiembre', label: 'SEP', placeholder: 'Ej: 21.5', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaOctubre', label: 'OCT', placeholder: 'Ej: 18.9', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaNoviembre', label: 'NOV', placeholder: 'Ej: 16.3', type: 'text', subsection: 'E1.7' },
   { name: 'e1_energiaDiariaDiciembre', label: 'DIC', placeholder: 'Ej: 14.8', type: 'text', subsection: 'E1.7' },
  */
  // ========== SECCIÓN E2: INSTALACIÓN INTERCONECTADA ==========
  // E2.1 Conexión a la Red
  { name: 'e2_potenciaNominalInversores', label: 'POTENCIA NOMINAL TOTAL EN INVERSORES (kW)', placeholder: 'Ej: 5.5', type: 'text', subsection: 'E2.1' },
  { name: 'e2_tipoConexionRed', label: 'TIPO', placeholder: 'Ej: Monofásica / Trifásica', type: 'select', options: ['Monofásica', 'Trifásica'], subsection: 'E2.1' },

  // E2.2 Módulo Fotovoltaico
/*   { name: 'e2_tecnologiaCelulaModulo', label: 'TECNOLOGÍA DE LA CÉLULA', placeholder: 'Ej: Monocristalino -PERC-', type: 'text', subsection: 'E2.2' },
 */  { name: 'e2_marcaModeloModulo', label: 'MARCA Y MODELO', placeholder: 'Ej: JA Solar JAM72S30 450/MR', type: 'text', subsection: 'E2.2', fullWidth: true },
  { name: 'e2_potenciaPicoModulo', label: 'POTENCIA PICO (Wp) DEL MÓDULO', placeholder: 'Ej: 450', type: 'text', subsection: 'E2.2' },
  /*   { name: 'e2_toncModulo', label: 'TONC (ºC)', placeholder: 'Ej: 45', type: 'text', subsection: 'E2.2' },
   */
  // E2.3 Generador Fotovoltaico
  { name: 'e2_potenciaPicoGenerador', label: 'POTENCIA PICO (Wp) DEL GENERADOR', placeholder: 'Ej: 4500', type: 'text', subsection: 'E2.3' },
  { name: 'e2_intensidadIpmpGenerador', label: 'INTENSIDAD MÁXIMA POTENCIA, Ipmp (A)', placeholder: 'Ej: 10', type: 'text', subsection: 'E2.3' },
  { name: 'e2_tensionVpmpGenerador', label: 'TENSIÓN MÁXIMA POTENCIA, Vpmp (V)', placeholder: 'Ej: 400', type: 'text', subsection: 'E2.3' },
  { name: 'e2_orientacionGenerador', label: 'ORIENTACIÓN', placeholder: 'Ej: Sur', type: 'text', subsection: 'E2.3' },
  { name: 'e2_inclinacionGenerador', label: 'INCLINACIÓN (º)', placeholder: 'Ej: 30', type: 'text', subsection: 'E2.3' },
  { name: 'e2_totalModulos', label: 'Nº TOTAL MÓDULOS', placeholder: 'Ej: 10', type: 'text', subsection: 'E2.3' },
  { name: 'e2_modulosEnSerie', label: 'Nº MÓDULOS EN SERIE', placeholder: 'Ej: 10', type: 'text', subsection: 'E2.3' },
  { name: 'e2_ramasEnParalelo', label: 'Nº RAMAS EN PARALELO', placeholder: 'Ej: 1', type: 'text', subsection: 'E2.3' },
  { name: 'disposicionModulos', label: 'DISPOSICIÓN DE LOS MÓDULOS', placeholder: 'Ej: En fila horizontal', type: 'text', subsection: 'E2.3', fullWidth: true },

  // E2.4 Inversor
  { name: 'e2_marcaModeloInversor', label: 'MARCA Y MODELO', placeholder: 'Ej: Fronius Symo', type: 'text', subsection: 'E2.4', fullWidth: true },
  { name: 'e2_potenciaNominalInversor', label: 'POTENCIA NOMINAL (kW)', placeholder: 'Ej: 5000', type: 'text', subsection: 'E2.4' },
  { name: 'e2_relacionTensionInversor', label: 'RELACIÓN TENSIÓN  AC, Vn (V)', placeholder: 'Ej: 230V/400V', type: 'text', subsection: 'E2.4' },
  { name: 'e2_formaOndaSalidaInversor', label: 'Vcc MÁXIMA', placeholder: 'Ej: Senoidal Pura', type: 'text', subsection: 'E2.4' },
  { name: 'e2_frecuenciaNominalInversor', label: 'Vcc MÍNIMA ', placeholder: 'Ej: 50', type: 'text', subsection: 'E2.4' },
  { name: 'e2_tensionMaximaEntradaInversor', label: 'CONEXIÓN', placeholder: 'Ej: 65', type: 'text', subsection: 'E2.4' },
  /*   { name: 'e2_tensionSalidaInversor', label: 'TENSIÓN SALIDA (V)', placeholder: 'Ej: 400', type: 'text', subsection: 'E2.4' },
    { name: 'e2_consumoVacioInversor', label: 'CONSUMO EN VACÍO', placeholder: 'Ej: 50', type: 'text', subsection: 'E2.4' }, */

  // E2.5 Otros
  { name: 'e2_marcaModelo', label: 'MARCA Y MODELO', placeholder: 'Opcional', type: 'text', subsection: 'E2.5', fullWidth: true },
  { name: 'e2_tipoDeBateria', label: 'TIPO DE BATERÍA', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },
  { name: 'e2_tensionNominal', label: 'TENSIÓN NOMINAL (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2.5', fullWidth: true },
  { name: 'e2_profundidadDescarga', label: 'PROFUNDIDAD DE DESCARGA', placeholder: 'Opcional', type: 'text', subsection: 'E2.5', fullWidth: true },
  { name: 'e2_tensionMaxima', label: 'TENSIÓN MÁXIMA (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },
  { name: 'e2_tensionMinima', label: 'TENSIÓN MÍNIMA (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },
  { name: 'e2_energiaTotal', label: 'ENERGÍA TOTAL ', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },
  { name: 'e2_potenciaMaximaSalida', label: 'POTENCIA MÁXIMA SALIDA', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },
  { name: 'e2_maximoPicoDePotencia', label: 'MÁXIMO PICO DE POTENCIA', placeholder: 'Opcional', type: 'text', subsection: 'E2.5' },

  // 2.6 Protecciones Externas
  { name: 'e2_intensidadNominalInterruptor', label: 'INTENSIDAD NOMINAL DEL INTERRUPTOR GENERAL, In (A)', placeholder: 'Ej: 25', type: 'text', subsection: '2.6' },
  { name: 'e2_poderCorteInterruptor', label: 'PODER DE CORTE DEL INTERRUPTOR GENERAL (kA)', placeholder: 'Ej: 6', type: 'text', subsection: '2.6' },

  /* // E2.6 Información de la Demanda
  { name: 'e2_potenciaMaximaDemanda', label: 'MARCA Y MODELO', placeholder: 'Ej: 5000', type: 'text', subsection: 'E2.6' },
  { name: 'e2_periodicidadDemanda', label: 'PERIODICIDAD', placeholder: 'Ej: Diaria', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaMediaMensual', label: 'ENERGÍA DIARIA MEDIA MENSUAL (Wh/día)', placeholder: 'Ej: 15500', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaEnero', label: 'ENE', placeholder: 'Ej: 15.5', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaFebrero', label: 'FEB', placeholder: 'Ej: 16.2', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaMarzo', label: 'MAR', placeholder: 'Ej: 18.5', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaAbril', label: 'ABR', placeholder: 'Ej: 20.1', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaMayo', label: 'MAY', placeholder: 'Ej: 22.3', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaJunio', label: 'JUN', placeholder: 'Ej: 23.8', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaJulio', label: 'JUL', placeholder: 'Ej: 24.5', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaAgosto', label: 'AGO', placeholder: 'Ej: 24.1', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaSeptiembre', label: 'SEP', placeholder: 'Ej: 21.5', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaOctubre', label: 'OCT', placeholder: 'Ej: 18.9', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaNoviembre', label: 'NOV', placeholder: 'Ej: 16.3', type: 'text', subsection: 'E2.6' },
  { name: 'e2_energiaDiariaDiciembre', label: 'DIC', placeholder: 'Ej: 14.8', type: 'text', subsection: 'E2.6' },
 */
  // ========== SECCIÓN F: MEDIDAS DE PROTECCIÓN EMPLEADAS ==========
  /*   { name: 'f_medidaContactoDirecto', label: 'CONTACTOS DIRECTOS - Tipo de Medida', placeholder: 'Ej: Conductores aislados y canaletas', type: 'text', subsection: 'F' },
    { name: 'f_parteContactoDirecto', label: 'CONTACTOS DIRECTOS - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaContactoIndirecto', label: 'CONTACTOS INDIRECTOS - Tipo de Medida', placeholder: 'Ej: Interruptor diferencial', type: 'text', subsection: 'F' },
    { name: 'f_parteContactoIndirecto', label: 'CONTACTOS INDIRECTOS - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaPuntoCaliente', label: 'EFECTO DEL PUNTO CALIENTE - Tipo de Medida', placeholder: 'Ej: 3 Diodos bypass', type: 'text', subsection: 'F' },
    { name: 'f_partePuntoCaliente', label: 'EFECTO DEL PUNTO CALIENTE - Parte de la Instalación', placeholder: 'Ej: Módulo FV', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaSobretensiones', label: 'SOBRETENSIONES - Tipo de Medida', placeholder: 'Ej: Descargador', type: 'text', subsection: 'F' },
    { name: 'f_parteSobretensiones', label: 'SOBRETENSIONES - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaExplosion', label: 'RIESGO DE EXPLOSIÓN - Tipo de Medida', placeholder: 'Opcional (solo aisladas con baterías)', type: 'text', subsection: 'F' },
    { name: 'f_parteExplosion', label: 'RIESGO DE EXPLOSIÓN - Parte de la Instalación', placeholder: 'Opcional', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaCorrosion', label: 'RIESGO DE CORROSIÓN - Tipo de Medida', placeholder: 'Opcional (solo aisladas con baterías)', type: 'text', subsection: 'F' },
    { name: 'f_parteCorrosion', label: 'RIESGO DE CORROSIÓN - Parte de la Instalación', placeholder: 'Opcional', type: 'text', subsection: 'F' },
  
    { name: 'f_otrasProtecciones', label: 'OTRAS MEDIDAS', placeholder: 'Indicar cuales', type: 'textarea', subsection: 'F', fullWidth: true },
   */
  // ========== SECCIÓN G: CARACTERÍSTICAS DE LÍNEAS Y CIRCUITOS ==========
  /*   { name: 'g_generadorReguladorPotencia', label: 'Generador FV-Regulador: Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorLongitud', label: 'Generador FV-Regulador: Longitud (m)', placeholder: 'Ej: 15', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorSeccion', label: 'Generador FV-Regulador: Material/Sección (mm²)', placeholder: 'Ej: 10', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorIntensidad', label: 'Generador FV-Regulador: Intensidad Admisible (A)', placeholder: 'Ej: 10.84', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorCaidaTension', label: 'Generador FV-Regulador: Caída de Tensión (%)', placeholder: 'Ej: 1.2', type: 'text', subsection: 'G' },
   */
  /* { name: 'g_reguladorBateriaPotencia', label: 'Regulador-Batería: Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaLongitud', label: 'Regulador-Batería: Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaSeccion', label: 'Regulador-Batería: Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaIntensidad', label: 'Regulador-Batería: Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaCaidaTension', label: 'Regulador-Batería: Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
   */
  /*  { name: 'g_reguladorInversorPotencia', label: 'Regulador-Inversor: Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorLongitud', label: 'Regulador-Inversor: Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorSeccion', label: 'Regulador-Inversor: Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorIntensidad', label: 'Regulador-Inversor: Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorCaidaTension', label: 'Regulador-Inversor: Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
    */
  { name: 'g_bateriaDiRectaInversorPotencia', label: 'Batería-Inversor (directo): Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
  /*   { name: 'g_bateriaDiRectaInversorLongitud', label: 'Batería-Inversor (directo): Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorSeccion', label: 'Batería-Inversor (directo): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorIntensidad', label: 'Batería-Inversor (directo): Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorCaidaTension', label: 'Batería-Inversor (directo): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
     */
  { name: 'g_generadorDirectoInversorPotencia', label: 'Generador-Inversor (directo): Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
  /*  { name: 'g_generadorDirectoInversorLongitud', label: 'Generador-Inversor (directo): Longitud (m)', placeholder: 'Ej: 10', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorSeccion', label: 'Generador-Inversor (directo): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorIntensidad', label: 'Generador-Inversor (directo): Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorCaidaTension', label: 'Generador-Inversor (directo): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
    */
  { name: 'g_inversorRedPotencia', label: 'Inversor-Red (interconectadas): Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
  /*  { name: 'g_inversorRedLongitud', label: 'Inversor-Red (interconectadas): Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedSeccion', label: 'Inversor-Red (interconectadas): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedIntensidad', label: 'Inversor-Red (interconectadas): Intensidad Admisible (A)', placeholder: 'Ej: 44', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedCaidaTension', label: 'Inversor-Red (interconectadas): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
  */
  // ========== SECCIÓN H: ESQUEMA UNIFILAR ==========
  { name: 'h_esquemaUnifilar', label: 'ESQUEMA UNIFILAR (Archivo)', type: 'file', accept: 'image/*,.pdf', subsection: 'H', fullWidth: true },

  // ========== SECCIÓN I: PLANO DE EMPLAZAMIENTO ==========
  /*   { name: 'i_planoEmplazamiento', label: 'PLANO DE EMPLAZAMIENTO (Archivo)', type: 'file', accept: 'image/*,.pdf', subsection: 'I', fullWidth: true },
   */
  // ========== SECCIÓN OTROS: DESCRIPCIÓN DEL PROYECTO ==========
  /* { name: 'otros_tipoInstalacion', label: 'Tipo de Instalación (ej: Instalación Solar Fotovoltaica)', type: 'text', fullWidth: true },
  { name: 'otros_descripcionProyecto', label: 'Descripción del Proyecto (ej: para Autoconsumo Individual con Excedentes...)', type: 'textarea', fullWidth: true },

  // ========== SECCIÓN OTROS: FOTOS ADICIONALES ==========
  { name: 'otros_foto1', label: 'FOTO CERTIFICADO 1', type: 'file', accept: 'image/*,.pdf', fullWidth: true },
  { name: 'otros_foto2', label: 'FOTO CERTIFICADO 2', type: 'file', accept: 'image/*,.pdf', fullWidth: true },
  { name: 'otros_foto3', label: 'FOTO CERTIFICADO 3', type: 'file', accept: 'image/*,.pdf', fullWidth: true },
  { name: 'otros_foto4', label: 'FOTO CERTIFICADO 4', type: 'file', accept: 'image/*,.pdf', fullWidth: true },
 */
  // ========== SECCIÓN OTROS: REGISTRO INSTALACIÓN ==========


  // ========== SECCIÓN OTROS: IMÁGENES DE PLANOS CON DESCRIPCIONES ==========
  {
    name: 'otros_imagenPlanoSituacion',
    label: 'PLANO DE SITUACIÓN',
    type: 'file',
    accept: 'image/*,.pdf',
    description: 'Plano de situación geográfica de la instalación.',
    fullWidth: true
  },
  {
    name: 'otros_imagenPlanoEmplazamiento',
    label: 'PLANO DE EMPLAZAMIENTO',
    type: 'file',
    accept: 'image/*,.pdf',
    description: 'Plano de emplazamiento de la instalación.',
    fullWidth: true
  },
  {
    name: 'otros_imagenPlanoCubierta',
    label: 'PLANO DE CUBIERTA',
    type: 'file',
    accept: 'image/*,.pdf',
    description: 'Plano de detalle de la instalación fotovoltaica en cubierta.',
    fullWidth: true
  },

  // ========== SECCIÓN: LEGALIZACION ==========
  // Campos de legalización: súministro, distribuidora, protecciones
  {
    name: 'cups',
    label: 'CUPS',
    placeholder: 'Ej: ES123456789012345678',
    type: 'text',
    fullWidth: true,
    subsection: 'LEGALIZACION'
  },
  {
    name: 'superficie',
    label: 'Superficie (m²)',
    placeholder: 'Ej: 45',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'registro_instalacion',
    label: 'Registro Instalación',
    placeholder: 'Ej: REG-2025-001-PRINCIPAL',
    type: 'text',
    fullWidth: true
  },
  {
    name: 'instalacion',
    label: 'Tipo de Instalación',
    placeholder: 'Seleccionar tipo...',
    type: 'select',
    options: [
      'nueva',
      'ampliacion',
      'modificacion'
    ],
    subsection: 'LEGALIZACION'
  },
  {
      name: 'observaciones',
      label: 'Observaciones',
      placeholder: 'Selecciona una opción',
      type: 'select',
      options: [
        {
          label: 'con batería',
          value: 'Se trata de una instalación de generación para autoconsumo FV de B.T.con baterias conectado a la red con excedentes acogido a compensación'
        },
        {
          label: 'sin batería',
          value: 'Se trata de una instalación de generación para autoconsumo FV de B.T. conectado a la red con excedentes acogido a compensación'
        }
      ],
      subsection: 'LEGALIZACION'
    },
  {
    name: 'tensionSuministro',
    label: 'Tensión suministro',
    placeholder: 'Ej: 230V / 400V',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'empresaDistribuidora',
    label: 'Empresa Distribuidora',
    placeholder: 'Ej: Endesa, Iberdrola',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'intensidadNominal',
    label: 'Intensidad nominal',
    placeholder: 'Ej: 30A / 63A',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'sensibilidadDiferencial',
    label: 'Sensibilidad (mA)',
    placeholder: 'Ej: 30',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'directorDeObra',
    label: 'Director de Obra',
    placeholder: 'Ej: Juan García López',
    type: 'text',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'instalacion1',
    label: 'Instalación 1',
    placeholder: 'Ej: Instalación principal',
    type: 'text',
    fullWidth: true,
    subsection: 'LEGALIZACION'
  },
  {
    name: 'apellidosNombrePersona',
    label: 'Apellidos y Nombre de la Persona Autorizada',
    placeholder: 'Ej: Eduardo Rivera Cabezas',
    type: 'text',
    fullWidth: true,
    value: 'Eduardo Rivera Cabezas',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'dniNiePersona',
    label: 'DNI/NIE de la Persona',
    placeholder: 'Ej: B09848912',
    type: 'text',
    value: 'B09848912',
    subsection: 'LEGALIZACION'
  },
  {
    name: 'codigoDirectorio',
    label: 'Código Directorio (Ciudad)',
    placeholder: 'Selecciona una ciudad...',
    type: 'select',
      options: [
        { label: 'Almeria', value: 'A01041434' },
        { label: 'Cadiz', value: 'A01041435' },
        { label: 'Cordoba', value: 'A01041436' },
        { label: 'Granada', value: 'A01041437' },
        { label: 'Huelva', value: 'A01041438' },
        { label: 'Jaen', value: 'A01041440' },
        { label: 'Malaga', value: 'A01041442' },
        { label: 'Sevilla', value: 'A01041444' }
      ],
    subsection: 'LEGALIZACION'
  },

  // ========== SECCIÓN: FECHA ==========
  {
    name: 'dia',
    label: 'Día',
    placeholder: 'Ej: 15',
    type: 'text'
  },
  {
    name: 'mes',
    label: 'Mes',
    placeholder: 'Ej: 02',
    type: 'text'
  },
  {
    name: 'anio',
    label: 'Año',
    placeholder: 'Ej: 2026',
    type: 'text'
  },
  {
    name: 'pais',
    label: 'País',
    placeholder: 'Ej: España',
    type: 'text',
    subsection: 'LEGALIZACION'
  },

]

export const getMasterFormDefaultData = () => {
  const defaultData = {}
  masterFormFields.forEach(field => {
    defaultData[field.name] = ''
  })
  return defaultData
}
