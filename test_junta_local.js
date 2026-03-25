import { runJuntaAutomation } from './server/utils/automation/juntaService.js'

const mockData = {
  cod_delegacion: '41',
  tipo_documento_presentador: 'NIF',
  nif_presentador: '12345678Z',
  nombre_presentador: 'PRUEBA_LOCAL',
  apellido1_presentador: 'APELLIDO_TEST_1',
  apellido2_presentador: 'APELLIDO_TEST_2',
  sexo_presentador: 'M',
  tipo_via_presentador: 'CL',
  nombre_via_presentador: 'Calle de Prueba',
  tipo_numeracion_presentador: 'NUM',
  numero_presentador: '1',
  calificador_numero_presentador: '3',
  bloque_presentador: 'blo',
  escalera_presentador: 'esc',
  piso_presentador: 'pis',
  puerta_presentador: 'pue',
  margen_presentador: 'D',
  provincia_presentador: 'Sevilla',
  municipio_presentador: 'CAMAS',
  poblacion_presentador: 'CAMAS',
  cp_presentador: '41900',
  telefono_presentador: '954222222',
  movil_presentador: '600222222',
  email_presentador: 'test-local@ejemplo.com',

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
  uso_instalacion: 'vivienda',
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
  empresa_distribuidora: 'endesa'
}

console.log('--- Iniciando Prueba Local de Trasplante Exacto ---')
runJuntaAutomation(mockData)
  .then(res => {
    console.log('✅ Portabilidad 1:1 verificada con éxito.')
    process.exit(0)
  })
  .catch(err => {
    console.error('❌ Error en el trasplante:', err.message)
    process.exit(1)
  })
