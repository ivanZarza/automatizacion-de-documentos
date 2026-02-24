export const obraMassolConfig = {
  id: 'obra-massol',
  title: '9.- Declaración inicio de obras-Massol',
  description: 'Formulario para declarar el inicio de obra según el modelo de Massol.',
  fileName: '9.- Declaracion inicio de obras-Massol.pdf',
  route: '/justificaciones/obra-massol',
  fields: [
    { name: 'potenciaInstalacion', label: 'Potencia Instalación (ej: 5)', type: 'text' },
    { name: 'direccionCompleta', label: 'Dirección Completa', type: 'text', fullWidth: true },
    { name: 'referenciaCatastral', label: 'Referencia Catastral', type: 'text', fullWidth: true },
    { name: 'diaInicio', label: 'Día Inicio', type: 'text' },
    { name: 'mesInicio', label: 'Mes Inicio', type: 'text' },
    { name: 'anioInicio', label: 'Año Inicio', type: 'text' },
    { name: 'diaFirma', label: 'Día Firma', type: 'text' },
    { name: 'mesFirma', label: 'Mes Firma', type: 'text' },
    { name: 'anioFirma', label: 'Año Firma', type: 'text' },
    { name: 'firma', label: 'Imagen de Firma', type: 'image' }
  ],
  defaultData: {
    potenciaInstalacion: '',
    direccionCompleta: '',
    referenciaCatastral: '',
    diaInicio: '',
    mesInicio: '',
    anioInicio: '',
    diaFirma: '',
    mesFirma: '',
    anioFirma: '',
    firma: ''
  },
  fieldMapping: {
    potenciaInstalacion: 'e2_potenciaNominalInversores',
    direccionCompleta: (formData) => `${formData.direccionCompleta} - ${formData.codigoPostalEmplazamiento} - ${formData.localidadEmplazamiento} - ${formData.provinciaEmplazamiento}`,
    referenciaCatastral: 'referenciaCatastral',
    diaInicio: 'diaInicio',
    mesInicio: 'mesInicio',
    anioInicio: 'anioInicio',
    diaFirma: 'diaFirmaJustificacion',
    mesFirma: 'mesFirmaJustificacion',
    anioFirma: 'anioFirmaJustificacion',
    firma: 'firma'
  },
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  category: 'justificaciones',
}
