export const declaracionCompromisoCorrienteConfig = {
  id: 'declaracion-compromiso-corriente',
  title: '10.- Declaración de Compromiso de Pago - Corriente',
  description: 'Declaración de compromiso de encontrarse al corriente de pago de obligaciones de reembolso',
  fileName: '10.- Declaracion Compromiso Corriente.pdf',
  route: '/justificaciones/declaracion-compromiso-corriente',

  fields: [
    // Beneficiario
    { name: 'apellidosNombreBeneficiario', label: 'Nombre y Apellidos (Beneficiario)', type: 'text' },
    { name: 'dniBeneficiario', label: 'DNI (Beneficiario)', type: 'text' },
    { name: 'domicilioBeneficiario', label: 'Domicilio (Beneficiario)', type: 'text' },

    // Empresa/Razón Social
    { name: 'razonSocial', label: 'Razón Social', type: 'text' },
    { name: 'nifEmpresa', label: 'NIF (Empresa)', type: 'text' },
    { name: 'domicilioFiscal', label: 'Domicilio Fiscal', type: 'text' },

    // Representante Legal
    { name: 'apellidosNombreRepresentanteLegal', label: 'Nombre Representante Legal', type: 'text' },
    { name: 'dniRepresentanteLegal', label: 'DNI Representante Legal', type: 'text' },

    // Agente o Gestor
    { name: 'apellidosNombreAgenteGestor', label: 'Nombre Agente/Gestor', type: 'text' },
    { name: 'dniNieAgenteGestor', label: 'DNI/NIE Agente/Gestor', type: 'text' },

    // Persona Representante
    { name: 'apellidosNombrePersonaRepresentante', label: 'Nombre Persona Representante', type: 'text' },
    { name: 'dniNiePersonaRepresentante', label: 'DNI/NIE Persona Representante', type: 'text' },
    { name: 'lugar', label: 'Lugar', type: 'text' },

    // Fecha
    { name: 'dia', label: 'Día', type: 'text' },
    { name: 'mes', label: 'Mes', type: 'text' },
    { name: 'anio', label: 'Año', type: 'text' },

    // Firma
    { name: 'firma', label: 'Firma (Imagen)', type: 'file', accept: 'image/*' },
  ],

  defaultData: {
    apellidosNombreBeneficiario: '',
    dniBeneficiario: '',
    domicilioBeneficiario: '',
    razonSocial: '',
    nifEmpresa: '',
    domicilioFiscal: '',
    apellidosNombreRepresentanteLegal: '',
    dniRepresentanteLegal: '',
    apellidosNombreAgenteGestor: '',
    dniNieAgenteGestor: '',
    apellidosNombrePersonaRepresentante: '',
    dniNiePersonaRepresentante: '',
    lugar: '',
    dia: '',
    mes: '',
    anio: '',
    firma: 'firma',
  },

  fieldMapping: {
    apellidosNombreBeneficiario: 'apellidosNombre',
    dniBeneficiario: 'nifCif',
    direccion: (formData) => `${formData.direccionCompleta} - ${formData.codigoPostalEmplazamiento} - ${formData.localidadEmplazamiento} - ${formData.provinciaEmplazamiento}`,
    razonSocial: 'razonSocial',
    nifEmpresa: 'nifEmpresa',
    domicilioFiscal: 'domicilioFiscal',
    apellidosNombreRepresentanteLegal: 'apellidosNombreRepresentanteLegal',
    dniRepresentanteLegal: 'dniRepresentanteLegal',
    apellidosNombrePersonaRepresentante: 'apellidosNombrePersonaRepresentante',
    dniNiePersonaRepresentante: 'dniNiePersonaRepresentante',
    lugar: 'localidadEmplazamiento',
    dia: 'diaFirmaJustificacion',
    mes: 'mesFirmaJustificacion',
    anio: 'anioFirmaJustificacion',
    firma: 'firma',
  },

  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true,
  },

  category: 'justificaciones',
};
