import { runJuntaAutomation } from './server/utils/automation/juntaService.js'

const mockData = {
  cod_delegacion: '41',
  tipo_documento_presentador: 'NIF',
  nif_presentador: '28818007L',
  nombre_presentador: 'EDUARDO',
  apellido1_presentador: 'RIVERA',
  apellido2_presentador: 'CABEZAS',
  sexo_presentador: 'M',
  tipo_via_presentador: 'CL',
  nombre_via_presentador: 'CALLE SAN JACINTO',
  tipo_numeracion_presentador: 'NUM',
  numero_presentador: '12',
  calificador_numero_presentador: '',
  bloque_presentador: '',
  escalera_presentador: '1',
  piso_presentador: 'A',
  puerta_presentador: 'IZQ',
  margen_presentador: 'D',
  provincia_presentador: 'Sevilla',
  municipio_presentador: 'SEVILLA',
  poblacion_presentador: 'SEVILLA',
  cp_presentador: '41010',
  telefono_presentador: '954000000',
  movil_presentador: '600000000',
  email_presentador: 'gestion@empresa.com',

  con_representante_legal: false,
  con_persona_autorizada: true,
  per_aut_tipo_documento: 'NIF',
  per_aut_nif: '28818007L',
  per_aut_sexo: 'M',
  per_aut_nombre: 'eduardo',
  per_aut_apellido1: 'rivera',
  per_aut_apellido2: 'cabezas',

  cnae_rite: 'T9820',
  numero_empresa_instaladora: '41045500',
  codigo_ccaa: '01',

  cups_presentador: 'ES0276000000152516WA0F',
  cau_presentador: 'ES0276000000152516WA0FA000',
  potencia_instalacion: '123',
  uso_instalacion: 'produccion energia electrica',
  tipo_suministro: 'Monofásico',
  tension_red: '230',
  es_autoconsumo: true,
  potencia_instalada_ficha: '123',
  tiene_acumulacion: true,
  potencia_acumulacion: '666',
  energia_almacenada: '12345',
  nombre_empresa_instaladora: 'Solay Ingenieros s.l.',
  empresa_instaladora_doc_tipo: 'CIF',
  empresa_instaladora_doc: 'B09848912',
  empresa_distribuidora: 'endesa',
  ps_distribuidora: '160',
  apellidosNombre: 'Ivan Zarza Estevez'
}

const form = mockData
const robotPayload = {
  datos: {
    tipoDocumento: form.tipo_documento_presentador,
    nif: form.nif_presentador,
    nombre: form.nombre_presentador,
    apellido1: form.apellido1_presentador,
    apellido2: form.apellido2_presentador,
    sexo: form.sexo_presentador,
    delegacion: form.cod_delegacion,

    tipoVia: form.tipo_via_presentador,
    nombreVia: form.nombre_via_presentador,
    tipoNumeracion: form.tipo_numeracion_presentador,
    numero: form.numero_presentador,
    calificador: form.calificador_numero_presentador,
    bloque: form.bloque_presentador,
    escalera: form.escalera_presentador,
    piso: form.piso_presentador,
    puerta: form.puerta_presentador,
    margen: form.margen_presentador,
    codigoPostal: form.cp_presentador,
    provincia: form.provincia_presentador,
    municipioNombre: form.municipio_presentador,
    poblacion: form.poblacion_presentador,
    telefono: form.telefono_presentador,
    movil: form.movil_presentador,
    email: form.email_presentador,
    ps_distribuidora: form.ps_distribuidora,

    conRepresentante: form.con_representante_legal,
    representante: {
      tipoDocumento: form.rep_leg_tipo_documento,
      nif: form.rep_leg_nif,
      sexo: form.rep_leg_sexo,
      nombre: form.rep_leg_nombre,
      apellido1: form.rep_leg_apellido1,
      apellido2: form.rep_leg_apellido2,
    },

    conPersonaAutorizada: form.con_persona_autorizada,
    personaAutorizada: {
      tipoDocumento: form.per_aut_tipo_documento,
      nif: form.per_aut_nif,
      sexo: form.per_aut_sexo,
      nombre: form.per_aut_nombre,
      apellido1: form.per_aut_apellido1,
      apellido2: form.per_aut_apellido2,
    },

    otrosDatos75codigo: form.cnae_rite,
    otrosDatosNumero: form.numero_empresa_instaladora,
    codigoComunidadAutonoma: form.codigo_ccaa,

    fichaTecnica: {
      potencia: form.potencia_instalacion,
      uso: form.uso_instalacion,
      tipoSuministro: form.tipo_suministro,
      tension: form.tension_red,
      esAutoconsumo: form.es_autoconsumo,
      cau: form.cau_presentador,
      potenciaInstalada: form.potencia_instalada_ficha,
      acumulacion: form.tiene_acumulacion,
      potenciaAcumulacion: form.potencia_acumulacion,
      energiaMaximaAlmacenada: form.energia_almacenada,
      empresaInstaladora: form.nombre_empresa_instaladora,
      empresaInstaladoraDocTipo: form.empresa_instaladora_doc_tipo,
      empresaInstaladoraDoc: form.empresa_instaladora_doc,
      empresaDistribuidora: form.empresa_distribuidora,
      cups: form.cups_presentador,
    }
  },
  flatFormData: form
}

console.log('--- Iniciando Prueba Local de Trasplante Exacto ---')
runJuntaAutomation(robotPayload)
  .then(res => {
    console.log('✅ Portabilidad 1:1 verificada con éxito.')
    process.exit(0)
  })
  .catch(err => {
    console.error('❌ Error en el trasplante:', err.message)
    process.exit(1)
  })
