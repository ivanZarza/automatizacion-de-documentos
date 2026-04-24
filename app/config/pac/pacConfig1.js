export const pacConfig1 = {
  id: 'pac-documento-1',
  title: 'Documento PAC 1 (1 página)',
  description: 'Documento PAC basado en imagen de fondo (1 página)',
  fileName: 'Documento PAC 1.pdf',
  route: '/pac/pac-documento-1',
  fields: [
    { name: 'nombre', label: 'Nombre Completo', type: 'text', fullWidth: true },
    { name: 'dni', label: 'DNI/NIF', type: 'text' },
    { name: 'direccion', label: 'Dirección', type: 'text', fullWidth: true },
    { name: 'localidad', label: 'Localidad', type: 'text' },
    { name: 'provincia', label: 'Provincia', type: 'text' },
    { name: 'fecha', label: 'Fecha', type: 'text' }
  ],
  defaultData: {
    nombre: '',
    dni: '',
    direccion: '',
    localidad: '',
    provincia: '',
    fecha: ''
  },
  fieldMapping: {
    nombre: 'apellidosNombre',
    dni: 'nifCif',
    direccion: 'domicilio',
    localidad: 'localidad',
    provincia: 'provincia',
    fecha: (formData) => `${formData.dia || ''} de ${formData.mes || ''} de ${formData.anio || ''}`
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'pac'
}
