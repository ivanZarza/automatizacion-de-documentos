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
    // E2.6 Protecciones Externas
    intensidadInterruptorGeneral: '25',
    poderCorteInterruptor: '6',
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
    longitudGeneradorInversor: '10',
    materialGeneradorInversor: '6',
    intensidadGeneradorInversor: '49',
    caidaTensionGeneradorInversor: '< 1,5 %',
    longitudBateriaInversor: '5',
    materialBateriaInversor: '6',
    intensidadBateriaInversor: '49',
    caidaTensionBateriaInversor: '< 1,5 %',
    longitudSalidaRed: '5',
    materialSalidaRed: '6',
    intensidadSalidaRed: '44',
    caidaTensionSalidaRed: '< 1,5 %',
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
    // Sección C - Persona que Firma
    { name: 'nombreTecnicoInstalador', label: 'Nombre del Instalador Eléctrico Autorizado', placeholder: 'Eduardo Rivera Cabezas', type: 'text', fullWidth: true },
    { name: 'numeroCertificadoInstalador', label: 'Nº de Certificado de Cualificación Individual', placeholder: '4654 COIIAOC', type: 'text' },
    { name: 'numeroInstaladorEmpresa', label: 'Nº de Instalador Eléctrico Autorizado (Empresa)', placeholder: '41045500', type: 'text' },
    { name: 'domicilioTecnico', label: 'Domicilio (Calle) del Técnico', placeholder: 'Calle Ebro', type: 'text', fullWidth: true },
    { name: 'numeroTecnico', label: 'Número del Técnico', placeholder: '35', type: 'text' },
    { name: 'localidadTecnico', label: 'Localidad del Técnico', placeholder: 'Sevilla', type: 'text' },
    { name: 'codigoPostalTecnico', label: 'C.P. del Técnico', placeholder: '41.012', type: 'text' },
    { name: 'telefonoTecnico', label: 'Teléfono del Técnico', placeholder: '629 118 196', type: 'tel' },
    { name: 'nombreTecnicoCompetente', label: 'Nombre del Técnico Competente', placeholder: 'Nombre completo', type: 'text', fullWidth: true },
    { name: 'domicilioTecnicoCompetente', label: 'Domicilio del Técnico Competente', placeholder: 'Calle o plaza', type: 'text', fullWidth: true },
    { name: 'numeroTecnicoCompetente', label: 'Número del Técnico Competente', placeholder: 'Número', type: 'text' },
    { name: 'localidadTecnicoCompetente', label: 'Localidad del Técnico Competente', placeholder: 'Localidad', type: 'text' },
    { name: 'codigoPostalTecnicoCompetente', label: 'C.P. del Técnico Competente', placeholder: 'C.P.', type: 'text' },
    { name: 'telefonoTecnicoCompetente', label: 'Teléfono del Técnico Competente', placeholder: 'Teléfono', type: 'tel' },
    { name: 'colegioOficial', label: 'Colegio Oficial', placeholder: 'Nombre del colegio', type: 'text', fullWidth: true },
    { name: 'numeroColegiado', label: 'Nº de Colegiado', placeholder: 'Número de colegiado', type: 'text' },
    // Sección D - Modalidades
    { name: 'modalidadBasicaM1', label: 'Modalidad Básica M1', type: 'checkbox' },
    { name: 'modalidadBasicaM2', label: 'Modalidad Básica M2', type: 'checkbox' },
    { name: 'modalidadBasicaM3', label: 'Modalidad Básica M3', type: 'checkbox' },
    { name: 'modalidadEspecialistaM4', label: 'Modalidad Especialista M4', type: 'checkbox' },
    { name: 'modalidadEspecialistaM5', label: 'Modalidad Especialista M5', type: 'checkbox' },
    { name: 'modalidadEspecialistaM6', label: 'Modalidad Especialista M6', type: 'checkbox' },
    { name: 'modalidadEspecialistaM7', label: 'Modalidad Especialista M7', type: 'checkbox' },
    { name: 'modalidadEspecialistaM8', label: 'Modalidad Especialista M8', type: 'checkbox' },
    { name: 'modalidadEspecialistaM9', label: 'Modalidad Especialista M9', type: 'checkbox' },
    // Sección E - E1: INSTALACIÓN GENERADORA FOTOVOLTAICA AISLADA
    // E1.1 Módulo Fotovoltaico
    { name: 'e1_tecnologiaCelulaModulo', label: 'Tecnología de la Célula del Módulo FV (E1.1)', placeholder: 'Monocristalino/Policristalino/etc', type: 'text', fullWidth: true },
    { name: 'e1_marcaModeloModulo', label: 'Marca y Modelo del Módulo FV (E1.1)', placeholder: 'Ej: Deye SUN-5K', type: 'text', fullWidth: true },
    { name: 'e1_potenciaPicoModulo', label: 'Potencia Pico del Módulo FV (Wp) (E1.1)', placeholder: 'Wp', type: 'text' },
    { name: 'e1_toncModulo', label: 'TONC (ºC) (E1.1)', placeholder: '45ºC', type: 'text' },
    // E1.2 Generador Fotovoltaico
    { name: 'e1_potenciaPicoGenerador', label: 'Potencia Pico del Generador FV (Wp) (E1.2)', placeholder: 'Wp', type: 'text' },
    { name: 'e1_intensidadIpmpGenerador', label: 'Intensidad Máxima Potencia Ipmp (A) (E1.2)', placeholder: 'A', type: 'text' },
    { name: 'e1_tensionVpmpGenerador', label: 'Tensión Máxima Potencia Vpmp (V) (E1.2)', placeholder: 'V', type: 'text' },
    { name: 'e1_orientacionGenerador', label: 'Orientación del Generador FV (E1.2)', placeholder: 'Ej: -19,37º (SE)', type: 'text', fullWidth: true },
    { name: 'e1_inclinacionGenerador', label: 'Inclinación respecto a Horizontal (º) (E1.2)', placeholder: '20º', type: 'text' },
    { name: 'e1_totalModulos', label: 'Nº Total de Módulos (E1.2)', placeholder: '8', type: 'text' },
    { name: 'e1_modulosEnSerie', label: 'Nº Módulos en Serie por Rama (E1.2)', placeholder: '8', type: 'text' },
    { name: 'e1_ramasEnParalelo', label: 'Nº de Ramas en Paralelo (E1.2)', placeholder: '1', type: 'text' },
    // E1.3 Baterías
    { name: 'e1_marcaModeloBateria', label: 'Marca y Modelo de Batería (E1.3)', placeholder: 'Ej: 2 MÓDULOS DEYE DE 5,12kWh', type: 'text', fullWidth: true },
    { name: 'e1_tipoBateria', label: 'Tipo de Batería (E1.3)', placeholder: 'Litio-Hierro Fosfato (LiFePO4)', type: 'text', fullWidth: true },
    { name: 'e1_tipoPlacaBateria', label: 'Tipo de Placa (E1.3)', placeholder: 'Plana/Tubular', type: 'select', options: ['Plana', 'Tubular', 'Otra'] },
    { name: 'e1_c10Bateria', label: 'C10 (Ah) a 25ºC (E1.3)', placeholder: 'Ah', type: 'text' },
    { name: 'e1_c100Bateria', label: 'C100 (Ah) a 25ºC (E1.3)', placeholder: 'Ah', type: 'text' },
    { name: 'e1_tensionNominalBateria', label: 'Tensión Nominal de la Batería (V) (E1.3)', placeholder: '200V', type: 'text' },
    { name: 'e1_profundidadDescargaBateria', label: 'Profundidad de Descarga (E1.3)', placeholder: '100%', type: 'text' },
    { name: 'e1_tensionMaximaBateria', label: 'Tensión Máxima Alcanzable (V) (E1.3)', placeholder: '57,6V', type: 'text' },
    { name: 'e1_tensionMinimaBateria', label: 'Tensión Mínima Alcanzable (V) (E1.3)', placeholder: '44,8V', type: 'text' },
    { name: 'e1_intensidadMaximaCargaBateria', label: 'Intensidad Máxima de Carga (A) (E1.3)', placeholder: 'A', type: 'text' },
    // E1.4 Regulador
    { name: 'e1_marcaModeloRegulador', label: 'Marca y Modelo del Regulador (E1.4)', placeholder: 'Ej: Victron MPPT 100/50', type: 'text', fullWidth: true },
    { name: 'e1_intensidadMaximaRegulador', label: 'Intensidad Máxima del Regulador (A) (E1.4)', placeholder: 'A', type: 'text' },
    { name: 'e1_tensionCorteAltaRegulador', label: 'Tensión de Corte por Alta a 20ºC (V) (E1.4)', placeholder: 'V', type: 'text' },
    { name: 'e1_tensionCorteBajaRegulador', label: 'Tensión de Corte por Baja a 20ºC (A) (E1.4)', placeholder: 'V', type: 'text' },
    // E1.5 Inversor
    { name: 'e1_marcaModeloInversor', label: 'Marca y Modelo del Inversor (E1.5)', placeholder: 'Ej: Victron Multiplus', type: 'text', fullWidth: true },
    { name: 'e1_potenciaNominalInversor', label: 'Potencia Nominal del Inversor (W) (E1.5)', placeholder: 'W', type: 'text' },
    { name: 'e1_rendimientoInversor10', label: 'Rendimiento Inversor 10% (E1.5)', placeholder: '%', type: 'text' },
    { name: 'e1_rendimientoInversor25', label: 'Rendimiento Inversor 25% (E1.5)', placeholder: '%', type: 'text' },
    { name: 'e1_rendimientoInversor50', label: 'Rendimiento Inversor 50% (E1.5)', placeholder: '%', type: 'text' },
    { name: 'e1_rendimientoInversor75', label: 'Rendimiento Inversor 75% (E1.5)', placeholder: '%', type: 'text' },
    { name: 'e1_rendimientoInversor100', label: 'Rendimiento Inversor 100% (E1.5)', placeholder: '%', type: 'text' },
    { name: 'e1_relacionTensionInversor', label: 'Relación Tensión Entrada/Salida VCC/VCA (E1.5)', placeholder: 'Ej: 48/230', type: 'text' },
    { name: 'e1_formaOndaSalidaInversor', label: 'Forma de Onda de Salida (E1.5)', placeholder: 'Senoidal/Onda cuadrada', type: 'select', options: ['Senoidal pura', 'Senoidal modificada', 'Onda cuadrada', 'Otra'] },
    { name: 'e1_frecuenciaNominalInversor', label: 'Frecuencia Nominal (Hz) (E1.5)', placeholder: '50 Hz', type: 'text' },
    { name: 'e1_tensionMaximaEntradaInversor', label: 'Tensión Máxima de Entrada (V) (E1.5)', placeholder: 'V', type: 'text' },
    { name: 'e1_tensionSalidaInversor', label: 'Tensión Nominal de Salida (V) (E1.5)', placeholder: '230 V', type: 'text' },
    { name: 'e1_consumoVacioInversor', label: 'Consumo en Vacío (E1.5)', placeholder: 'W', type: 'text' },
    { name: 'e1_seguidorPuntoMaximaPotencia', label: 'Seguidor del Punto de Máxima Potencia (E1.5)', placeholder: 'SI/NO', type: 'select', options: ['SI', 'NO'] },
    // E1.6 Otros
    { name: 'e1_convertidorCC_CC', label: 'Convertidor de CC/CC (E1.6)', placeholder: 'SI/NO', type: 'select', options: ['SI', 'NO'] },
    { name: 'e1_relacionTensionCC', label: 'Relación Tensión VCC1/VCC2 (E1.6)', placeholder: 'Ej: 600/48', type: 'text' },
    { name: 'e1_variadorFrecuencia', label: 'Variador de Frecuencia (E1.6)', placeholder: 'SI/NO', type: 'select', options: ['SI', 'NO'] },
    { name: 'e1_grupoAuxiliarApoyo', label: 'Grupo Auxiliar de Apoyo (E1.6)', placeholder: 'SI/NO', type: 'select', options: ['SI', 'NO'] },
    { name: 'e1_potenciaGrupoAuxiliar', label: 'Potencia del Grupo Auxiliar (W) (E1.6)', placeholder: 'W (si aplica)', type: 'text' },
    { name: 'e1_otrosEquipos', label: 'Otros Equipos (E1.6)', placeholder: 'Especificar', type: 'textarea', rows: 3, fullWidth: true },
    // E1.7 Información de la Demanda
    { name: 'e1_potenciaMaximaDemanda', label: 'Potencia Máxima Demandada Simultáneamente (W) (E1.7)', placeholder: 'W', type: 'text' },
    { name: 'e1_periodicidadDemanda', label: 'Periodicidad de la Demanda (E1.7)', placeholder: 'Diaria/Fin de semana/Estival/Invernal', type: 'text', fullWidth: true },
    { name: 'e1_energiaDiariaEnero', label: 'Energía Diaria Media Enero (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaFebrero', label: 'Energía Diaria Media Febrero (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaMarzo', label: 'Energía Diaria Media Marzo (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaAbril', label: 'Energía Diaria Media Abril (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaMayo', label: 'Energía Diaria Media Mayo (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaJunio', label: 'Energía Diaria Media Junio (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaJulio', label: 'Energía Diaria Media Julio (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaAgosto', label: 'Energía Diaria Media Agosto (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaSeptiembre', label: 'Energía Diaria Media Septiembre (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaOctubre', label: 'Energía Diaria Media Octubre (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaNoviembre', label: 'Energía Diaria Media Noviembre (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
    { name: 'e1_energiaDiariaDiciembre', label: 'Energía Diaria Media Diciembre (Wh/día) (E1.7)', placeholder: 'Wh/día', type: 'text' },
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
    // Sección E - E2.6 Protecciones Externas
    { name: 'intensidadInterruptorGeneral', label: 'Interruptor General - In (A)', placeholder: '25', type: 'text' },
    { name: 'poderCorteInterruptor', label: 'Poder de Corte del Interruptor General (kA)', placeholder: '6', type: 'text' },
    // Sección F - Medidas de Protección
    { name: 'medidaContactosDirectos', label: 'Medida de Protección - Contactos Directos', placeholder: 'Conductores aislados y canaletas', type: 'text', fullWidth: true },
    { name: 'parteInstalacionDirectos', label: 'Parte de la Instalación', placeholder: 'Toda la instalación', type: 'text', fullWidth: true },
    { name: 'medidaContactosIndirectos', label: 'Medida de Protección - Contactos Indirectos', placeholder: 'Interruptor diferencial', type: 'text', fullWidth: true },
    { name: 'parteInstalacionIndirectos', label: 'Parte de la Instalación', placeholder: 'CGMP', type: 'text', fullWidth: true },
    { name: 'medidaSobretensiones', label: 'Medida de Protección - Sobretensiones', placeholder: 'Descargador', type: 'text', fullWidth: true },
    { name: 'parteInstalacionSobretensiones', label: 'Parte de la Instalación', placeholder: 'CGMP', type: 'text', fullWidth: true },
    { name: 'medidaPuntoCaliente', label: 'Medida de Protección - Efecto Punto Caliente', placeholder: '3 Diodos bypass', type: 'text', fullWidth: true },
    { name: 'parteInstalacionPuntoCaliente', label: 'Parte de la Instalación (Punto Caliente)', placeholder: 'Módulo FV', type: 'text', fullWidth: true },
    { name: 'medidaExplosion', label: 'Medida de Protección - Riesgo de Explosión', placeholder: 'Especificar', type: 'text', fullWidth: true },
    { name: 'parteInstalacionExplosion', label: 'Parte de la Instalación (Explosión)', placeholder: 'Especificar', type: 'text', fullWidth: true },
    { name: 'medidaCorrosion', label: 'Medida de Protección - Riesgo de Corrosión', placeholder: 'Especificar', type: 'text', fullWidth: true },
    { name: 'parteInstalacionCorrosion', label: 'Parte de la Instalación (Corrosión)', placeholder: 'Especificar', type: 'text', fullWidth: true },
    { name: 'otrasProtecciones', label: 'Otras Medidas de Protección', placeholder: 'Indicar cuales', type: 'textarea', rows: 3, fullWidth: true },
    // Sección G - Características de Líneas y Circuitos
    { name: 'longitudGeneradorInversor', label: 'Longitud Generador-Inversor (m)', placeholder: '10', type: 'text' },
    { name: 'materialGeneradorInversor', label: 'Material/Sección Generador-Inversor (mm²)', placeholder: '6', type: 'text' },
    { name: 'intensidadGeneradorInversor', label: 'Intensidad Generador-Inversor (A)', placeholder: '49', type: 'text' },
    { name: 'caidaTensionGeneradorInversor', label: 'Caída Tensión Generador-Inversor (%)', placeholder: '< 1,5 %', type: 'text' },
    { name: 'longitudBateriaInversor', label: 'Longitud Batería-Inversor (m)', placeholder: '5', type: 'text' },
    { name: 'materialBateriaInversor', label: 'Material/Sección Batería-Inversor (mm²)', placeholder: '6', type: 'text' },
    { name: 'intensidadBateriaInversor', label: 'Intensidad Batería-Inversor (A)', placeholder: '49', type: 'text' },
    { name: 'caidaTensionBateriaInversor', label: 'Caída Tensión Batería-Inversor (%)', placeholder: '< 1,5 %', type: 'text' },
    { name: 'longitudSalidaRed', label: 'Longitud Salida-Red (m)', placeholder: '5', type: 'text' },
    { name: 'materialSalidaRed', label: 'Material/Sección Salida-Red (mm²)', placeholder: '6', type: 'text' },
    { name: 'intensidadSalidaRed', label: 'Intensidad Salida-Red (A)', placeholder: '44', type: 'text' },
    { name: 'caidaTensionSalidaRed', label: 'Caída Tensión Salida-Red (%)', placeholder: '< 1,5 %', type: 'text' },
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
