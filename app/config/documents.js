export const autorizacionRepresentacionConfig = {
  id: 'autorizacion-representacion',
  title: 'Autorización de Representación',
  description: 'Documento válido para trámites administrativos',
  fileName: 'autorizacion-representacion.pdf',
  route: '/autorizacion-representacion',
  defaultData: {
    autorizante: 'Guillermo Cruz Beltrán',
    dniAutorizante: '31.335.276-F',
    domicilioAutorizante: 'DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz',
    representante: 'Solay Ingenieros, S.L.',
    dniRepresentante: 'B09848912',
    domicilioRepresentante: 'Calle Ebro, 35 – 41012, Sevilla, Sevilla',
    organismo: 'Ayuntamiento de Puerto Real (Cádiz)',
    gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR CON DECLARACIÓN RESPONSABLE O AUTORIZACIÓN URBANÍSTICA',
    fecha: '18/11/2025'
  },
  fields: [
    { name: 'autorizante', label: 'Nombre del Autorizante', placeholder: 'Ej: Guillermo Cruz Beltrán', type: 'text' },
    { name: 'dniAutorizante', label: 'DNI/NIF del Autorizante', placeholder: 'Ej: 31.335.276-F', type: 'text' },
    { name: 'domicilioAutorizante', label: 'Domicilio del Autorizante', placeholder: 'Calle, número, código postal, localidad, provincia', type: 'text', fullWidth: true },
    { name: 'representante', label: 'Nombre del Representante', placeholder: 'Ej: Solay Ingenieros, S.L.', type: 'text' },
    { name: 'dniRepresentante', label: 'DNI/NIF del Representante', placeholder: 'Ej: B09848912', type: 'text' },
    { name: 'domicilioRepresentante', label: 'Domicilio del Representante', placeholder: 'Calle, número, código postal, localidad, provincia', type: 'text', fullWidth: true },
    { name: 'organismo', label: 'Organismo Administrativo', placeholder: 'Ej: Ayuntamiento de Puerto Real (Cádiz)', type: 'text', fullWidth: true },
    { name: 'gestiones', label: 'Gestiones a Realizar', placeholder: 'Descripción detallada de las gestiones autorizadas', type: 'textarea', rows: 4, fullWidth: true },
    { name: 'fecha', label: 'Fecha del Documento', placeholder: 'DD/MM/YYYY', type: 'date' }
  ],
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}

export const memoriaTecnicaConfig = {
  id: 'memoria-tecnica',
  title: 'Memoria Técnica de Diseño - Instalaciones Fotovoltaicas',
  description: 'Documento técnico para instalaciones fotovoltaicas en baja tensión',
  fileName: 'memoria-tecnica-fotovoltaica.pdf',
  route: '/memoria-tecnica',
  defaultData: {
    // Expediente
    numeroExpediente: '',
    numeroRegistro: '',
    // Sección A - TITULAR
    apellidosNombre: 'Mateos Campos, Carmen',
    nifCif: '28.664.984-S',
    domicilio: 'Calle Prudencia, Nº 44',
    codigoPostal: '41.720',
    localidad: 'Sevilla',
    provincia: 'Sevilla',
    correoElectronico: 'camaca959@gmail.com',
    telefono: '622930583',
    representante: '',
    dniRepresentante: '',
    // Sección B - EMPLAZAMIENTO
    emplazamientoCalle: 'Calle Prudencia',
    numero: '44',
    bloque: '-',
    escalera: '-',
    piso: '-',
    localidadEmplazamiento: 'Sevilla',
    provinciaEmplazamiento: 'Sevilla',
    correoElectronicoEmplazamiento: 'camaca959@gmail.com',
    tipoInstalacion: 'Fotovoltaica conectada a red interior',
    usoDestino: 'Nueva',
    tipoInstalacionSeleccionada: 'Nueva',
    // Sección C - PERSONA QUE FIRMA
    nombreTecnicoInstalador: 'Eduardo Rivera Cabezas',
    numeroCertificadoInstalador: '4654 COIIAOC',
    numeroInstaladorEmpresa: '41045500',
    domicilioTecnico: 'Calle Ebro',
    numeroTecnico: '35',
    localidadTecnico: 'Sevilla',
    codigoPostalTecnico: '41.012',
    telefonoTecnico: '629 118 196',
    nombreTecnicoCompetente: '',
    domicilioTecnicoCompetente: '',
    numeroTecnicoCompetente: '',
    localidadTecnicoCompetente: '',
    codigoPostalTecnicoCompetente: '',
    telefonoTecnicoCompetente: '',
    colegioOficial: '',
    numeroColegiado: '',
    // Sección D - MODALIDADES
    modalidadBasicaM1: false,
    modalidadBasicaM2: false,
    modalidadBasicaM3: false,
    modalidadEspecialistaM4: false,
    modalidadEspecialistaM5: false,
    modalidadEspecialistaM6: false,
    modalidadEspecialistaM7: false,
    modalidadEspecialistaM8: false,
    modalidadEspecialistaM9: false,
    // E1: INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA
    // E1.1 Módulo Fotovoltaico
    e1_tecnologiaCelulaModulo: '',
    e1_marcaModeloModulo: '',
    e1_potenciaPicoModulo: '',
    e1_toncModulo: '',
    // E1.2 Generador Fotovoltaico
    e1_potenciaPicoGenerador: '',
    e1_intensidadIpmpGenerador: '',
    e1_tensionVpmpGenerador: '',
    e1_orientacionGenerador: '',
    e1_inclinacionGenerador: '',
    e1_totalModulos: '',
    e1_modulosEnSerie: '',
    e1_ramasEnParalelo: '',
    // E1.3 Baterías
    e1_marcaModeloBateria: '',
    e1_tipoBateria: '',
    e1_tipoPlacaBateria: '',
    e1_c10Bateria: '',
    e1_c100Bateria: '',
    e1_tensionNominalBateria: '',
    e1_profundidadDescargaBateria: '',
    e1_tensionMaximaBateria: '',
    e1_tensionMinimaBateria: '',
    e1_intensidadMaximaCargaBateria: '',
    // E1.4 Regulador
    e1_marcaModeloRegulador: '',
    e1_intensidadMaximaRegulador: '',
    e1_tensionCorteAltaRegulador: '',
    e1_tensionCorteBajaRegulador: '',
    // E1.5 Inversor
    e1_marcaModeloInversor: '',
    e1_potenciaNominalInversor: '',
    e1_rendimientoInversor10: '',
    e1_rendimientoInversor25: '',
    e1_rendimientoInversor50: '',
    e1_rendimientoInversor75: '',
    e1_rendimientoInversor100: '',
    e1_relacionTensionInversor: '',
    e1_formaOndaSalidaInversor: '',
    e1_frecuenciaNominalInversor: '',
    e1_tensionMaximaEntradaInversor: '',
    e1_tensionSalidaInversor: '',
    e1_consumoVacioInversor: '',
    e1_seguidorPuntoMaximaPotencia: '',
    // E1.6 Otros
    e1_convertidorCC_CC: '',
    e1_relacionTensionCC: '',
    e1_variadorFrecuencia: '',
    e1_grupoAuxiliarApoyo: '',
    e1_potenciaGrupoAuxiliar: '',
    e1_otrosEquipos: '',
    // E1.7 Información de la Demanda
    e1_potenciaMaximaDemanda: '',
    e1_periodicidadDemanda: '',
    e1_energiaDiariaEnero: '',
    e1_energiaDiariaFebrero: '',
    e1_energiaDiariaMarzo: '',
    e1_energiaDiariaAbril: '',
    e1_energiaDiariaMayo: '',
    e1_energiaDiariaJunio: '',
    e1_energiaDiariaJulio: '',
    e1_energiaDiariaAgosto: '',
    e1_energiaDiariaSeptiembre: '',
    e1_energiaDiariaOctubre: '',
    e1_energiaDiariaNoviembre: '',
    e1_energiaDiariaDiciembre: '',
    // E2: INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO
    // E2.1 Conexión a la Red
    potenciaNominalInversores: '5',
    tipoConexionRed: 'MONOFÁSICA',
    // E2.2 Módulo Fotovoltaico
    tecnologiaCelulaModulo: 'Monocristalino -PERC- doble célula',
    marcaModeloModulo: 'Deye SUN-5K',
    potenciaPicoModulo: '605',
    toncModulo: '45ºC',
    // E2.3 Generador Fotovoltaico
    potenciaPicoGenerador: '4840',
    tensionVpmpGenerador: '372,40',
    intensidadIpmpGenerador: '10,84',
    orientacionGenerador: '-19,37º (SE)',
    inclinacionGenerador: '20º',
    totalModulos: '8',
    modulosEnSerie: '8',
    ramrasEnParalelo: '1',
    // E2.4 Inversor
    marcaModeloInversor: 'Deye SUN-5K',
    potenciaACInversor: '5',
    tensionNominalInversor: '230 V',
    vccMaximaInversor: '425',
    vccMinimaInversor: '150',
    tipoConexionInversor: 'MONOFÁSICA',
    // E2.5 Baterías
    marcaModeloBateria: '2 MÓDULOS DEYE DE 5,12kWh',
    tipoBateria: 'Litio-Hierro Fosfato (LiFePO4)',
    tensionNominalBateria: '200V',
    profundidadDescargaBateria: '100%',
    tensionMaximaBateria: '57,6V',
    tensionMinimaBateria: '44,8V',
    energiaTotalBateria: '10,24 kWh',
    potenciaMaximaSalidaBateria: '10,24 kW',
    maximoPicoPotenciaBateria: '17,28 Kw (durante 10s)',
    // E2.5.1 Protecciones Externas
    intensidadInterruptorGeneral: '25',
    poderCorteInterruptor: '6',
    proteccionFrecuenciaTension: 'SI',
    // Sección F - Medidas de Protección
    medidaContactosDirectos: 'Conductores aislados y canaletas',
    parteInstalacionDirectos: 'Toda la instalación',
    medidaContactosIndirectos: 'Interruptor diferencial',
    parteInstalacionIndirectos: 'CGMP',
    medidaSobretensiones: 'Descargador',
    parteInstalacionSobretensiones: 'CGMP',
    medidaPuntoCaliente: '3 Diodos bypass',
    parteInstalacionPuntoCaliente: 'Módulo FV',
    medidaExplosion: '',
    parteInstalacionExplosion: '',
    medidaCorrosion: '',
    parteInstalacionCorrosion: '',
    otrasProtecciones: '',
    // Sección G - Características de Líneas y Circuitos
    potenciaGeneradorRegulador: '',
    longitudGeneradorRegulador: '',
    materialGeneradorRegulador: '',
    intensidadGeneradorRegulador: '',
    caidaTensionGeneradorRegulador: '',
    potenciaReguladorBateria: '',
    longitudReguladorBateria: '',
    materialReguladorBateria: '',
    intensidadReguladorBateria: '',
    caidaTensionReguladorBateria: '',
    potenciaSalidaRegulador: '',
    longitudSalidaRegulador: '',
    materialSalidaRegulador: '',
    intensidadSalidaRegulador: '',
    caidaTensionSalidaRegulador: '',
    potenciaBateriaInversor: '10,24',
    longitudBateriaInversor: '5',
    materialBateriaInversor: '6',
    intensidadBateriaInversor: '49',
    caidaTensionBateriaInversor: '< 1,5 %',
    potenciaGeneradorInversorDirecto: '4,84',
    longitudGeneradorInversorDirecto: '10',
    materialGeneradorInversorDirecto: '6',
    intensidadGeneradorInversorDirecto: '49',
    caidaTensionGeneradorInversorDirecto: '< 1,5 %',
    potenciaSalidaInversorRed: '5',
    longitudSalidaInversorRed: '5',
    materialSalidaInversorRed: '6',
    intensidadSalidaInversorRed: '44',
    caidaTensionSalidaInversorRed: '< 1,5 %',
    // Sección H - Esquema Unifilar
    esquemaUnifilar: '',
    // Sección I - Plano de Emplazamiento
    planoEmplazamiento: ''
  },
  fields: [
    // Expediente
    { name: 'numeroExpediente', label: 'Número de Expediente', placeholder: 'Ej: EXP-2025-001', type: 'text' },
    { name: 'numeroRegistro', label: 'Número de Registro de la Instalación', placeholder: 'Ej: REG-2025-001', type: 'text' },
    // Sección A
    { name: 'apellidosNombre', label: 'Apellidos y Nombre/Razón Social', placeholder: 'Ej: Mateos Campos, Carmen', type: 'text', fullWidth: true },
    { name: 'nifCif', label: 'NIF/CIF', placeholder: 'Ej: 28.664.984-S', type: 'text' },
    { name: 'domicilio', label: 'Domicilio', placeholder: 'Ej: Calle Prudencia, Nº 44', type: 'text', fullWidth: true },
    { name: 'codigoPostal', label: 'Código Postal (CP)', placeholder: '41.720', type: 'text' },
    { name: 'localidad', label: 'Localidad', placeholder: 'Ej: Sevilla', type: 'text' },
    { name: 'provincia', label: 'Provincia', placeholder: 'Ej: Sevilla', type: 'text' },
    { name: 'correoElectronico', label: 'Correo Electrónico', placeholder: 'Ej: camaca959@gmail.com', type: 'email', fullWidth: true },
    { name: 'telefono', label: 'Teléfono', placeholder: 'Ej: 622930583', type: 'tel' },
    { name: 'representante', label: 'Representante (si procede)', placeholder: 'Nombre del representante', type: 'text', fullWidth: true },
    { name: 'dniRepresentante', label: 'DNI del Representante', placeholder: 'Ej: 12.345.678-A', type: 'text' },
    // Sección B
    { name: 'emplazamientoCalle', label: 'Emplazamiento (Calle)', placeholder: 'Calle Prudencia', type: 'text', fullWidth: true },
    { name: 'numero', label: 'Número', placeholder: '44', type: 'text' },
    { name: 'localidadEmplazamiento', label: 'Localidad (Emplazamiento)', placeholder: 'Sevilla', type: 'text' },
    { name: 'provinciaEmplazamiento', label: 'Provincia (Emplazamiento)', placeholder: 'Sevilla', type: 'text' },
    { name: 'correoElectronicoEmplazamiento', label: 'Correo Electrónico (Emplazamiento)', placeholder: 'Ej: camaca959@gmail.com', type: 'email', fullWidth: true },
    { name: 'tipoInstalacionSeleccionada', label: 'Instalación', placeholder: 'Nueva/Ampliación/Modificación', type: 'select', options: ['Nueva', 'Ampliación', 'Modificación'] },
    // Sección D - Modalidades
    // Sección E - E2: INSTALACIÓN GENERADORA FOTOVOLTAICA INTERCONECTADA CON ALMACENAMIENTO
    // E2.1 Conexión a la Red
    { name: 'potenciaNominalInversores', label: 'Potencia Nominal Total en Inversores (kW)', placeholder: '5', type: 'text' },
    { name: 'tipoConexionRed', label: 'Tipo de Conexión', placeholder: 'MONOFÁSICA/TRIFÁSICA', type: 'text' },
    // Sección E - E2.2 Módulo Fotovoltaico
    { name: 'marcaModeloModulo', label: 'Marca y Modelo del Módulo FV', placeholder: 'Deye SUN-5K', type: 'text', fullWidth: true },
    { name: 'potenciaPicoModulo', label: 'Potencia Pico del Módulo FV (Wp)', placeholder: '605', type: 'text' },
    // Sección E - E2.3 Generador Fotovoltaico
    { name: 'potenciaPicoGenerador', label: 'Potencia Pico del Generador FV (Wp)', placeholder: '4840', type: 'text' },
    { name: 'tensionVpmpGenerador', label: 'Tensión de Máxima Potencia, Vpmp (V)', placeholder: '372,40', type: 'text' },
    { name: 'orientacionGenerador', label: 'Orientación del Generador FV', placeholder: '-19,37º (SE)', type: 'text', fullWidth: true },
    { name: 'totalModulos', label: 'Nº Total de Módulos', placeholder: '8', type: 'text' },
    { name: 'modulosEnSerie', label: 'Nº de Módulos en Serie por Rama', placeholder: '8', type: 'text' },
    // Sección E - E2.4 Inversor
    { name: 'marcaModeloInversor', label: 'Marca y Modelo del Inversor', placeholder: 'Deye SUN-5K', type: 'text', fullWidth: true },
    { name: 'potenciaACInversor', label: 'Potencia AC Nominal (Kw)', placeholder: '5', type: 'text' },
    // Sección E - E2.5 Baterías
    { name: 'marcaModeloBateria', label: 'Marca y Modelo', placeholder: '2 MÓDULOS DEYE DE 5,12kWh', type: 'text', fullWidth: true },
    { name: 'energiaTotalBateria', label: 'Energía Total (kWh)', placeholder: '10,24 kWh', type: 'text' },
    { name: 'potenciaMaximaSalidaBateria', label: 'Potencia Máxima de Salida (kW)', placeholder: '10,24 kW', type: 'text' },
    { name: 'maximoPicoPotenciaBateria', label: 'Máximo Pico de Potencia', placeholder: '17,28 Kw (durante 10s)', type: 'text' },
    // Sección G - Características de Líneas y Circuitos
    { name: 'potenciaBateriaInversor', label: 'Potencia Prevista - Batería a Inversor (kW)', placeholder: '10,24', type: 'text' },
    { name: 'potenciaGeneradorInversorDirecto', label: 'Potencia Prevista - Generador a Inversor Directo (kW)', placeholder: '4,84', type: 'text' },
    { name: 'potenciaSalidaInversorRed', label: 'Potencia Prevista - Salida Inversor a Red (kW)', placeholder: '5', type: 'text' },
    // Sección H - Esquema Unifilar
    { name: 'esquemaUnifilar', label: 'Esquema Unifilar (Imagen)', placeholder: 'Selecciona una imagen', type: 'file', accept: 'image/*', fullWidth: true },
    // Sección I - Plano de Emplazamiento
    { name: 'planoEmplazamiento', label: 'Plano de Emplazamiento (Imagen)', placeholder: 'Selecciona una imagen', type: 'file', accept: 'image/*', fullWidth: true }
  ],
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}

/**
 * Exportar todos los documentos disponibles
 * Facilita agregar nuevos documentos en el futuro
 */
export const documentConfigs = {
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  memoriaTecnica: memoriaTecnicaConfig
}

/**
 * Obtener configuración de un documento por ID
 */
export const getDocumentConfig = (documentId) => {
  return documentConfigs[documentId] || null
}

/**
 * Obtener lista de todos los documentos disponibles
 */
export const getAllDocuments = () => {
  return Object.entries(documentConfigs).map(([key, config]) => ({
    id: key,
    ...config
  }))
}
