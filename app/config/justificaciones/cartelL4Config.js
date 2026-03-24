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
    costeActuacion: (data) => data.presupuestoTotal ? `${data.presupuestoTotal} €` : '',
    cuantiaSubvencion: (data) => data.importeSubvencionResultante ? `${data.importeSubvencionResultante} €` : '',
    entidadUbicacion: (data) => {
      const parts = [
        data.apellidosNombre,
        data.emplazamientoCalle,
        data.numero ? `nº ${data.numero}` : '',
        data.localidadEmplazamiento,
        data.provinciaEmplazamiento ? `[${data.provinciaEmplazamiento}]` : ''
      ].filter(Boolean);
      return parts.join(' - ');
    }
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'justificaciones'
}
