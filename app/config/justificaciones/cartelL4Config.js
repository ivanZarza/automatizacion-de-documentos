export const cartelL4Config = {
  id: 'cartel-l4',
  title: 'Cartel Publicitario L4.pdf',
  description: 'Cartel publicitario para actuaciones de la Línea 4',
  fileName: 'Cartel Publicitario L4',
  route: '/justificaciones/cartel-l4',
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
    costeActuacion: 'totalCantidadJustificada',
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
