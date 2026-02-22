export const obraMassolConfig = {
  id: 'obra-massol',
  title: 'Declaración inicio de obra - Massol',
  description: 'Formulario para declarar el inicio de obra según el modelo de Massol.',
  fileName: 'obra-massol.pdf',
  route: '/justificaciones/obra-massol',
  fields: [
    { name: 'nombreDeclarante', label: 'Nombre Declarante', type: 'text', fullWidth: true },
    { name: 'nifDeclarante', label: 'NIF Declarante', type: 'text' },
    { name: 'numeroColegioDeclarante', label: 'Número Colegio', type: 'text' },
    { name: 'colegioProfesional', label: 'Colegio Profesional', type: 'text', fullWidth: true },
    { name: 'domicilioDeclarante', label: 'Domicilio Declarante', type: 'text', fullWidth: true },
    { name: 'potenciaInstalacion', label: 'Potencia Instalación (ej: 5 kW)', type: 'text' },
    { name: 'direccionInstalacion', label: 'Dirección Instalación', type: 'text', fullWidth: true },
    { name: 'referenciaCatastral', label: 'Referencia Catastral', type: 'text', fullWidth: true },
    { name: 'fechaInicio', label: 'Fecha Inicio/Fin', type: 'date' },
    { name: 'fechaFirma', label: 'Fecha Firma', type: 'date' }
  ],
  defaultData: {
    nombreDeclarante: '',
    nifDeclarante: '',
    numeroColegioDeclarante: '',
    colegioProfesional: '',
    domicilioDeclarante: '',
    potenciaInstalacion: '',
    direccionInstalacion: '',
    referenciaCatastral: '',
    fechaInicio: '',
    fechaFirma: ''
  },
  fieldMapping: {
    nombreDeclarante: 'apellidosNombre',
    nifDeclarante: 'nifCif',
    domicilioDeclarante: 'emplazamientoCalle'
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
    category: 'justificaciones',
}
