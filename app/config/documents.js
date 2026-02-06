/**
 * Configuración centralizada de documentos
 * Cada documento tiene su propia configuración que se reutiliza en las páginas
 */

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

/**
 * Exportar todos los documentos disponibles
 * Facilita agregar nuevos documentos en el futuro
 */
export const documentConfigs = {
  autorizacionRepresentacion: autorizacionRepresentacionConfig
  // Aquí irán más documentos en el futuro
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
