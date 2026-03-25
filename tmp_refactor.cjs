const fs = require('fs')

const replacers = [
  ['formData.cod_delegacion', 'datos.delegacion'],
  ['formData.tipo_documento_presentador', 'datos.tipoDocumento'],
  ['formData.nif_presentador', 'datos.nif'],
  ['formData.sexo_presentador', 'datos.sexo'],
  ['formData.nombre_presentador', 'datos.nombre'],
  ['formData.apellido1_presentador', 'datos.apellido1'],
  ['formData.apellido2_presentador', 'datos.apellido2'],
  ['formData.tipo_via_presentador', 'datos.tipoVia'],
  ['formData.nombre_via_presentador', 'datos.nombreVia'],
  ['formData.tipo_numeracion_presentador', 'datos.tipoNumeracion'],
  ['formData.numero_presentador', 'datos.numero'],
  ['formData.calificador_numero_presentador', 'datos.calificador'],
  ['formData.bloque_presentador', 'datos.bloque'],
  ['formData.escalera_presentador', 'datos.escalera'],
  ['formData.piso_presentador', 'datos.piso'],
  ['formData.puerta_presentador', 'datos.puerta'],
  ['formData.margen_presentador', 'datos.margen'],
  ['formData.provincia_presentador', 'datos.provincia'],
  ['formData.municipio_presentador', 'datos.municipioNombre'],
  ['formData.poblacion_presentador', 'datos.poblacion'],
  ['formData.cp_presentador', 'datos.codigoPostal'],
  ['formData.telefono_presentador', 'datos.telefono'],
  ['formData.movil_presentador', 'datos.movil'],
  ['formData.email_presentador', 'datos.email'],

  ['formData.con_representante_legal', 'datos.conRepresentante'],
  ['formData.rep_leg_tipo_documento', 'datos.representante.tipoDocumento'],
  ['formData.rep_leg_nif', 'datos.representante.nif'],
  ['formData.rep_leg_sexo', 'datos.representante.sexo'],
  ['formData.rep_leg_nombre', 'datos.representante.nombre'],
  ['formData.rep_leg_apellido1', 'datos.representante.apellido1'],
  ['formData.rep_leg_apellido2', 'datos.representante.apellido2'],

  ['formData.con_persona_autorizada', 'datos.conPersonaAutorizada'],
  ['formData.per_aut_tipo_documento', 'datos.personaAutorizada.tipoDocumento'],
  ['formData.per_aut_nif', 'datos.personaAutorizada.nif'],
  ['formData.per_aut_sexo', 'datos.personaAutorizada.sexo'],
  ['formData.per_aut_nombre', 'datos.personaAutorizada.nombre'],
  ['formData.per_aut_apellido1', 'datos.personaAutorizada.apellido1'],
  ['formData.per_aut_apellido2', 'datos.personaAutorizada.apellido2'],

  ['formData.cnae_rite', 'datos.otrosDatos75codigo'],
  ['formData.numero_empresa_instaladora', 'datos.otrosDatosNumero'],
  ['formData.codigo_ccaa', 'datos.codigoComunidadAutonoma'],

  ['formData.potencia_instalacion', 'datos.fichaTecnica.potencia'],
  ['formData.uso_instalacion', 'datos.fichaTecnica.uso'],
  ['formData.tipo_suministro', 'datos.fichaTecnica.tipoSuministro'],
  ['formData.tension_red', 'datos.fichaTecnica.tension'],
  ['formData.es_autoconsumo', 'datos.fichaTecnica.esAutoconsumo'],
  ['formData.cau_presentador', 'datos.fichaTecnica.cau'],
  ['formData.potencia_instalada_ficha', 'datos.fichaTecnica.potenciaInstalada'],
  ['formData.tiene_acumulacion', 'datos.fichaTecnica.acumulacion'],
  ['formData.potencia_acumulacion', 'datos.fichaTecnica.potenciaAcumulacion'],
  ['formData.energia_almacenada', 'datos.fichaTecnica.energiaMaximaAlmacenada'],
  ['formData.nombre_empresa_instaladora', 'datos.fichaTecnica.empresaInstaladora'],
  ['formData.empresa_instaladora_doc_tipo', 'datos.fichaTecnica.empresaInstaladoraDocTipo'],
  ['formData.empresa_instaladora_doc', 'datos.fichaTecnica.empresaInstaladoraDoc'],
  ['formData.empresa_distribuidora', 'datos.fichaTecnica.empresaDistribuidora'],
  ['formData.cups_presentador', 'datos.fichaTecnica.cups'],
]

let content = fs.readFileSync('/home/ivan/dev/trabajo/GeneracionDocumentacion/server/utils/automation/juntaService.js', 'utf-8')

replacers.forEach(([from, to]) => {
  content = content.split(from).join(to)
})

// Fix payload param
content = content.replace('export const runJuntaAutomation = async (formData) => {', 'export const runJuntaAutomation = async (payload) => {\n  const datos = payload.datos;\n  const formData = payload.flatFormData;')

fs.writeFileSync('/home/ivan/dev/trabajo/GeneracionDocumentacion/server/utils/automation/juntaService.js', content)
console.log('Refactorizado con éxito.')
