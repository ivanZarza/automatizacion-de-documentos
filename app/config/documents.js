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
    nifCif: '12345678-A',
    domicilio: 'Calle Prudencia, Nº 44',
    localidad: 'Sevilla',
    provincia: 'Sevilla',
    correoElectronico: 'camaca59@gmail.com',
    telefono: '622930583',
    // Sección B - EMPLAZAMIENTO
    numero: '',
    bloque: '',
    puerta: '',
    escalera: '',
    piso: '',
    localidadEmplazamiento: 'Sevilla',
    provinciaEmplazamiento: 'Sevilla',
    usoDestino: 'Nueva',
    // Sección C - PERSONA QUE FIRMA
    nombreFirma: 'Eduardo Rivera Cabezas',
    noColegiado: '1045280',
    telefonoFirma: '629 118 196',
    // Sección E - MEMORIA DESCRIPTIVA
    // E.1.1 Módulo Fotovoltaico
    potenciaPicoModulo: '390',
    marcaModeloModulo: 'SUN-5K',
    // E.1.2 Generador Fotovoltaico
    tensionMaximaPotenciaGenerador: '372,40',
    orientacionesGenerador: '4 ORIENTACIONES DEL GENERADOR',
    totalModulos: '12 MÓDULOS',
    ramrasEnParalelo: '4 RAMAS EN PARALELO',
    // E.1.3 Baterías
    tiposBateria: 'LiFePO4 (Batería estacionaria)',
    tensionBateria: '48V',
    capacidadBateria: 'LiFePO4 (Batería estacionaria)',
    tensionNominalBateria: '48.0V',
    tensionMaximaAlcanzableBateria: '100',
    // E.1.4 Regulador
    marcaModeloRegulador: 'SUN-5K',
    tensionCorteRegulador: '230 V',
    // E.1.5 Inversor
    marcaModeloInversor: 'DEYE',
    potenciaNominalInversor: '5 (kVa)',
    tensionEntradaInversor: '48V',
    tensionSalidaInversor: '230V',
    // E.1.7 Información de la Demanda
    potenciaMaximaDemanda: '10.24 kWh',
    energiaDiariaDemanda: '10.24 kWh',
    // Sección F - Planos y Esquemas
    planoEmplazamiento: '',
    esquemaUnifilar: '',
    // Sección G - Documentación
    documentacionTecnica: []
  },
  fields: [
    // Expediente
    { name: 'numeroExpediente', label: 'Número de Expediente', placeholder: 'Ej: EXP-2025-001', type: 'text' },
    { name: 'numeroRegistro', label: 'Número de Registro de la Instalación', placeholder: 'Ej: REG-2025-001', type: 'text' },
    // Sección A
    { name: 'apellidosNombre', label: 'Apellidos y Nombre/Razón Social', placeholder: 'Ej: Mateos Campos, Carmen', type: 'text', fullWidth: true },
    { name: 'nifCif', label: 'NIF/CIF', placeholder: 'Ej: 12345678-A', type: 'text' },
    { name: 'domicilio', label: 'Domicilio', placeholder: 'Ej: Calle Prudencia, Nº 44', type: 'text', fullWidth: true },
    { name: 'localidad', label: 'Localidad', placeholder: 'Ej: Sevilla', type: 'text' },
    { name: 'provincia', label: 'Provincia', placeholder: 'Ej: Sevilla', type: 'text' },
    { name: 'correoElectronico', label: 'Correo Electrónico', placeholder: 'Ej: camaca59@gmail.com', type: 'email', fullWidth: true },
    { name: 'telefono', label: 'Teléfono', placeholder: 'Ej: 622930583', type: 'tel' },
    // Sección B
    { name: 'numero', label: 'Número', placeholder: '', type: 'text' },
    { name: 'bloque', label: 'Bloque', placeholder: '', type: 'text' },
    { name: 'puerta', label: 'Puerta', placeholder: '', type: 'text' },
    { name: 'escalera', label: 'Escalera', placeholder: '', type: 'text' },
    { name: 'piso', label: 'Piso', placeholder: '', type: 'text' },
    { name: 'localidadEmplazamiento', label: 'Localidad (Emplazamiento)', placeholder: 'Sevilla', type: 'text' },
    { name: 'provinciaEmplazamiento', label: 'Provincia (Emplazamiento)', placeholder: 'Sevilla', type: 'text' },
    { name: 'usoDestino', label: 'Uso a que se destina', placeholder: 'Nueva/Ampliación/Modificación', type: 'select', options: ['Nueva', 'Ampliación', 'Modificación'] },
    // Sección C
    { name: 'nombreFirma', label: 'Nombre (Técnico Firmante)', placeholder: 'Eduardo Rivera Cabezas', type: 'text', fullWidth: true },
    { name: 'noColegiado', label: 'Nº de Colegiado', placeholder: '1045280', type: 'text' },
    { name: 'telefonoFirma', label: 'Teléfono (Técnico)', placeholder: '629 118 196', type: 'tel' },
    // Sección E
    { name: 'potenciaPicoModulo', label: 'Potencia Pico del Módulo (Wp)', placeholder: '390', type: 'text' },
    { name: 'marcaModeloModulo', label: 'Marca y Modelo del Módulo', placeholder: 'SUN-5K', type: 'text', fullWidth: true },
    { name: 'tensionMaximaPotenciaGenerador', label: 'Tensión de Máxima Potencia del Generador (V)', placeholder: '372,40', type: 'text' },
    { name: 'orientacionesGenerador', label: 'Orientaciones del Generador', placeholder: '4 ORIENTACIONES', type: 'text', fullWidth: true },
    { name: 'totalModulos', label: 'Total de Módulos', placeholder: '12', type: 'text' },
    { name: 'ramrasEnParalelo', label: 'Ramas en Paralelo', placeholder: '4', type: 'text' },
    { name: 'tiposBateria', label: 'Tipo de Batería', placeholder: 'LiFePO4 (Batería estacionaria)', type: 'text', fullWidth: true },
    { name: 'tensionBateria', label: 'Tensión de la Batería (V)', placeholder: '48V', type: 'text' },
    { name: 'capacidadBateria', label: 'Capacidad de la Batería', placeholder: 'LiFePO4', type: 'text', fullWidth: true },
    { name: 'tensionNominalBateria', label: 'Tensión Nominal de la Batería (V)', placeholder: '48.0V', type: 'text' },
    { name: 'tensionMaximaAlcanzableBateria', label: 'Tensión Máxima Alcanzable por la Batería (V)', placeholder: '100', type: 'text' },
    { name: 'marcaModeloRegulador', label: 'Marca y Modelo del Regulador', placeholder: 'SUN-5K', type: 'text', fullWidth: true },
    { name: 'tensionCorteRegulador', label: 'Tensión de Corte del Regulador (V)', placeholder: '230 V', type: 'text' },
    { name: 'marcaModeloInversor', label: 'Marca y Modelo del Inversor', placeholder: 'DEYE', type: 'text', fullWidth: true },
    { name: 'potenciaNominalInversor', label: 'Potencia Nominal del Inversor (kVa)', placeholder: '5', type: 'text' },
    { name: 'tensionEntradaInversor', label: 'Tensión de Entrada del Inversor (V)', placeholder: '48V', type: 'text' },
    { name: 'tensionSalidaInversor', label: 'Tensión de Salida del Inversor (V)', placeholder: '230V', type: 'text' },
    { name: 'potenciaMaximaDemanda', label: 'Potencia Máxima Demandada (kWh)', placeholder: '10.24 kWh', type: 'text' },
    { name: 'energiaDiariaDemanda', label: 'Energía Diaria Media Demandada (kWh/día)', placeholder: '10.24 kWh', type: 'text' },
    // Sección F - Planos y Esquemas
    { name: 'planoEmplazamiento', label: 'Plano de Emplazamiento (Imagen)', placeholder: 'Selecciona una imagen', type: 'file', accept: 'image/*', fullWidth: true },
    { name: 'esquemaUnifilar', label: 'Esquema Unifilar (Imagen)', placeholder: 'Selecciona una imagen', type: 'file', accept: 'image/*', fullWidth: true }
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
