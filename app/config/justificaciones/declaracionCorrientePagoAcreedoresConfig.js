export const declaracionCorrientePagoAcreedoresConfig = {
  id: 'declaracion-corriente-pago-acreedores',
  title: '11.- DR de Corriente de Pago a Empresas Acreedoras',
  description: 'Declaración responsable de encontrarse al corriente de pago con empresas acreedoras',
  fileName: '11.- DR Corriente Pago Empresas Acreedoras',
  route: '/justificaciones/declaracion-corriente-pago-acreedores',
  
  fields: [
    { name: 'numeroExpediente', label: 'N.º Expediente Ecovivienda', type: 'text', fullWidth: true },
    { name: 'nombreEmpresa', label: 'Nombre de la Empresa', type: 'text', fullWidth: true },
    { name: 'cifEmpresa', label: 'CIF de la Empresa', type: 'text' },
    { name: 'apellidosNombre', label: 'Apellidos y Nombre (Cliente)', type: 'text', fullWidth: true },
    { name: 'nifCif', label: 'DNI/NIF (Cliente)', type: 'text' },
    { name: 'numeroFactura', label: 'Número de Factura', type: 'text' },
    { name: 'localidad', label: 'Localidad', type: 'text' },
    { name: 'dia', label: 'Día', type: 'text' },
    { name: 'mes', label: 'Mes', type: 'text' },
    { name: 'anio', label: 'Año', type: 'text' },
  ],

  defaultData: {
    numeroExpediente: '',
    nombreEmpresa: 'Solay Ingenieros S.L.',
    cifEmpresa: 'B09848912',
    apellidosNombre: '',
    nifCif: '',
    numeroFactura: '',
    localidad: '',
    dia: '',
    mes: '',
    anio: '',
  },

  fieldMapping: {
    numeroExpediente: 'expedienteEco',
    apellidosNombre: 'apellidosNombre',
    nifCif: 'nifCif',
    localidad: 'localidadEmplazamiento',
    dia: 'diaFirmaJustificacion',
    mes: 'mesFirmaJustificacion',
    anio: 'anioFirmaJustificacion',
    // nombreEmpresa, cifEmpresa y numeroFactura se pasan dinámicamente vía query params
  },

  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true,
  },

  category: 'justificaciones',
}
