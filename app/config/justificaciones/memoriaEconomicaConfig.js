export const memoriaEconomicaConfig = {
  id: 'memoria-economica',
  title: 'Memoria Económica Justificativa',
  description: 'Documento de memoria económica justificativa con aportación de justificantes de gasto de subvención',
  fileName: 'memoria-economica.pdf',
  route: '/justificaciones/memoria-economica',
  fields: [
    { name: 'expediente', label: 'Expediente', type: 'text', fullWidth: true },
    { name: 'nif', label: 'NIF', type: 'text' },
    { name: 'edificio', label: 'Tipo de Edificio', type: 'text', placeholder: 'ej: edificio' },
    { name: 'l3', label: 'Línea de Subvención', type: 'text', placeholder: 'ej: L3' },
    { name: 'parrafo1Seleccionado', label: 'Usar Párrafo Introducción', type: 'checkbox' },
    { name: 'parrafo2Texto', label: 'Párrafo 2 (Alternativo)', type: 'textarea', fullWidth: true },
    { name: 'parrafo2Seleccionado', label: 'Usar Párrafo 2', type: 'checkbox' },
    { name: 'tablaDatos', label: 'Datos de Gastos', type: 'table', columns: [
      { name: 'numeroFactura', label: 'Nº Factura', type: 'text' },
      { name: 'fechaFactura', label: 'Fecha Factura', type: 'date' },
      { name: 'cf', label: 'CF', type: 'text' },
      { name: 'acreedor', label: 'Acreedor', type: 'text' },
      { name: 'concepto', label: 'Concepto', type: 'text' },
      { name: 'fechaPago', label: 'Fecha Pago', type: 'date' },
      { name: 'importe', label: 'Importe', type: 'text' }
    ], rows: 5 },
    { name: 'totalCantidadJustificada', label: 'Total Cantidad Justificada', type: 'text' },
    { name: 'presupuestoInicial', label: 'Presupuesto Inicial', type: 'text' },
    { name: 'inversionRealizada', label: 'Inversión Realizada', type: 'text' },
    { name: 'desviacion', label: 'Desviación (con IVA si es subvencionable)', type: 'text' },
    { name: 'fechaFirma', label: 'Fecha Firma', type: 'date' },
    { name: 'nombreFirma', label: 'Nombre Firma', type: 'text', fullWidth: true }
  ],
  defaultData: {
    expediente: '',
    nif: '',
    edificio: 'edificio',
    l3: 'L3',
    parrafo1Seleccionado: true,
    parrafo2Texto: '',
    parrafo2Seleccionado: false,
    tablaDatos: [
      { numeroFactura: '', fechaFactura: '', cf: '', acreedor: '', concepto: '', fechaPago: '', importe: '' },
      { numeroFactura: '', fechaFactura: '', cf: '', acreedor: '', concepto: '', fechaPago: '', importe: '' },
      { numeroFactura: '', fechaFactura: '', cf: '', acreedor: '', concepto: '', fechaPago: '', importe: '' },
      { numeroFactura: '', fechaFactura: '', cf: '', acreedor: '', concepto: '', fechaPago: '', importe: '' },
      { numeroFactura: '', fechaFactura: '', cf: '', acreedor: '', concepto: '', fechaPago: '', importe: '' }
    ],
    totalCantidadJustificada: '',
    presupuestoInicial: '',
    inversionRealizada: '',
    desviacion: '',
    fechaFirma: '',
    nombreFirma: ''
  },
  fieldMapping: {
    expediente: 'expediente',
    nif: 'nif',
    nombreFirma: 'apellidosNombre',
    fechaFirma: 'fecha'
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'justificaciones',
  component: 'MemoriaEconomica'
}
