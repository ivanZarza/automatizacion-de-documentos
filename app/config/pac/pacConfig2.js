export const pacConfig2 = {
  id: 'pac-documento-2',
  title: 'Documento PAC 2 (2 páginas)',
  description: 'Documento PAC basado en imagen de fondo (2 páginas)',
  fileName: 'Documento PAC 2.pdf',
  route: '/pac/pac-documento-2',
  fields: [
    { name: 'nombre', label: 'Nombre Completo', type: 'text', fullWidth: true },
    { name: 'dni', label: 'DNI/NIF', type: 'text' },
    { name: 'direccion', label: 'Dirección', type: 'text', fullWidth: true },
    { name: 'localidad', label: 'Localidad', type: 'text' },
    { name: 'provincia', label: 'Provincia', type: 'text' },
    { name: 'fecha', label: 'Fecha', type: 'text' },
    { name: 'observaciones', label: 'Observaciones', type: 'textarea', fullWidth: true }
  ],
  defaultData: {
    nombre: '',
    dni: '',
    direccion: '',
    localidad: '',
    provincia: '',
    fecha: '',
    observaciones: ''
  },
  fieldMapping: {
    nombre: 'apellidosNombre',
    dni: 'nifCif',
    direccion: 'domicilio',
    localidad: 'localidad',
    provincia: 'provincia',
    fecha: (formData) => `${formData.dia || ''} de ${formData.mes || ''} de ${formData.anio || ''}`,
    observaciones: 'observaciones'
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'pac'
}
