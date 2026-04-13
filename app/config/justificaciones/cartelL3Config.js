export const cartelL3Config = {
  id: 'cartel-l3',
  title: 'Cartel Publicitario L3.pdf',
  description: 'Cartel publicitario para actuaciones de la Línea 3',
  fileName: 'Cartel Publicitario L3',
  route: '/justificaciones/cartel-l3',
  fields: [
    { name: 'costeActuacion', label: 'Coste de la Actuación', type: 'text' },
    { name: 'cuantiaSubvencion', label: 'Cuantía de la subvención', type: 'text' },
    { name: 'entidadUbicacion', label: 'Entidad destinataria / Ubicación', type: 'text', fullWidth: true },
  ],
  defaultData: {
    costeActuacion: '',
    cuantiaSubvencion: '',
    entidadUbicacion: '',
  },
  fieldMapping: {
    costeActuacion: 'presupuestoInicial',
    cuantiaSubvencion: 'importeSubvencionResultante',
    entidadUbicacion: (formData) => `${formData.direccionCompleta} - ${formData.codigoPostalEmplazamiento} - ${formData.localidadEmplazamiento} - ${formData.provinciaEmplazamiento}`
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'aceptaciones'
}
