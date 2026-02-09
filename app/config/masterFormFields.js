/**
 * Configuración de campos para el Formulario Maestro
 * Todos los campos de Memoria Técnica organizados por secciones
 */

export const masterFormFields = [
  // ========== SECCIÓN EXPEDIENTE ==========
  { 
    name: 'numeroExpediente', 
    label: 'Número de Expediente', 
    placeholder: 'Ej: EXP-2025-001', 
    type: 'text' 
  },
  { 
    name: 'numeroRegistro', 
    label: 'Número de Registro', 
    placeholder: 'Ej: REG-2025-001', 
    type: 'text' 
  },

  // ========== SECCIÓN A: TITULAR ==========
  { 
    name: 'apellidosNombre', 
    label: 'Apellidos y Nombre del Titular', 
    placeholder: 'Ej: García López, Juan', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'nifCif', 
    label: 'NIF/CIF del Titular', 
    placeholder: 'Ej: 12.345.678-A', 
    type: 'text' 
  },
  { 
    name: 'domicilio', 
    label: 'Domicilio del Titular', 
    placeholder: 'Ej: Calle Principal, 25', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'codigoPostal', 
    label: 'Código Postal', 
    placeholder: 'Ej: 41001', 
    type: 'text' 
  },
  { 
    name: 'localidad', 
    label: 'Localidad', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  { 
    name: 'provincia', 
    label: 'Provincia', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  { 
    name: 'correoElectronico', 
    label: 'Correo Electrónico', 
    placeholder: 'Ej: ejemplo@correo.com', 
    type: 'email',
    fullWidth: true
  },
  { 
    name: 'telefono', 
    label: 'Teléfono', 
    placeholder: 'Ej: 954 123 456', 
    type: 'tel' 
  },
  { 
    name: 'representante', 
    label: 'Representante (si aplica)', 
    placeholder: 'Ej: Empresa XYZ S.L.', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'dniRepresentante', 
    label: 'DNI/CIF del Representante', 
    placeholder: 'Ej: B12345678', 
    type: 'text' 
  },

  // ========== SECCIÓN B: EMPLAZAMIENTO ==========
  { 
    name: 'emplazamientoCalle', 
    label: 'Calle del Emplazamiento', 
    placeholder: 'Ej: Avenida de la Innovación', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'numero', 
    label: 'Número', 
    placeholder: 'Ej: 42', 
    type: 'text' 
  },
  { 
    name: 'bloque', 
    label: 'Bloque (si aplica)', 
    placeholder: 'Ej: A', 
    type: 'text' 
  },
  { 
    name: 'escalera', 
    label: 'Escalera', 
    placeholder: 'Ej: 1', 
    type: 'text' 
  },
  { 
    name: 'piso', 
    label: 'Piso', 
    placeholder: 'Ej: 3º', 
    type: 'text' 
  },
  { 
    name: 'localidadEmplazamiento', 
    label: 'Localidad del Emplazamiento', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  { 
    name: 'provinciaEmplazamiento', 
    label: 'Provincia del Emplazamiento', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  { 
    name: 'correoElectronicoEmplazamiento', 
    label: 'Correo Electrónico del Emplazamiento', 
    placeholder: 'Ej: emplazamiento@correo.com', 
    type: 'email',
    fullWidth: true
  },
  { 
    name: 'tipoInstalacion', 
    label: 'Tipo de Instalación', 
    placeholder: 'Seleccionar tipo...', 
    type: 'select',
    options: [
      'Fotovoltaica conectada a red interior',
      'Fotovoltaica aislada',
      'Instalación con fines especiales'
    ]
  },
  { 
    name: 'usoDestino', 
    label: 'Uso y Destino', 
    placeholder: 'Ej: Autoconsumo para vivienda', 
    type: 'text',
    fullWidth: true
  },

  // ========== SECCIÓN C: PERSONA QUE FIRMA ==========
  { 
    name: 'nombreTecnicoInstalador', 
    label: 'Nombre del Técnico Instalador', 
    placeholder: 'Ej: Eduardo Rivera Cabezas', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'numeroCertificadoInstalador', 
    label: 'Número de Certificado del Instalador', 
    placeholder: 'Ej: 4654 COIIAOC', 
    type: 'text' 
  },
  { 
    name: 'numeroInstaladorEmpresa', 
    label: 'Número de Instalador de la Empresa', 
    placeholder: 'Ej: 41045500', 
    type: 'text' 
  },
  { 
    name: 'domicilioTecnico', 
    label: 'Domicilio del Técnico', 
    placeholder: 'Ej: Calle Ebro', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'numeroTecnico', 
    label: 'Número (Domicilio Técnico)', 
    placeholder: 'Ej: 35', 
    type: 'text' 
  },
  { 
    name: 'localidadTecnico', 
    label: 'Localidad del Técnico', 
    placeholder: 'Ej: Sevilla', 
    type: 'text' 
  },
  { 
    name: 'codigoPostalTecnico', 
    label: 'Código Postal del Técnico', 
    placeholder: 'Ej: 41012', 
    type: 'text' 
  },
  { 
    name: 'telefonoTecnico', 
    label: 'Teléfono del Técnico', 
    placeholder: 'Ej: 629 118 196', 
    type: 'tel' 
  },
  { 
    name: 'nombreTecnicoCompetente', 
    label: 'Nombre del Técnico Competente (si aplica)', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'domicilioTecnicoCompetente', 
    label: 'Domicilio del Técnico Competente', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'numeroTecnicoCompetente', 
    label: 'Número (Técnico Competente)', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'localidadTecnicoCompetente', 
    label: 'Localidad del Técnico Competente', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'codigoPostalTecnicoCompetente', 
    label: 'Código Postal del Técnico Competente', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'telefonoTecnicoCompetente', 
    label: 'Teléfono del Técnico Competente', 
    placeholder: 'Opcional', 
    type: 'tel' 
  },
  { 
    name: 'colegioOficial', 
    label: 'Colegio Oficial', 
    placeholder: 'Ej: Colegio de Ingenieros', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'numeroColegiado', 
    label: 'Número de Colegiado', 
    placeholder: 'Ej: 12345', 
    type: 'text' 
  },

  // ========== SECCIÓN D: MODALIDADES ==========
  { 
    name: 'modalidadBasicaM1', 
    label: 'Modalidad Básica M1', 
    type: 'text' 
  },
  { 
    name: 'modalidadBasicaM2', 
    label: 'Modalidad Básica M2', 
    type: 'text' 
  },
  { 
    name: 'modalidadBasicaM3', 
    label: 'Modalidad Básica M3', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM4', 
    label: 'Modalidad Especialista M4', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM5', 
    label: 'Modalidad Especialista M5', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM6', 
    label: 'Modalidad Especialista M6', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM7', 
    label: 'Modalidad Especialista M7', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM8', 
    label: 'Modalidad Especialista M8', 
    type: 'text' 
  },
  { 
    name: 'modalidadEspecialistaM9', 
    label: 'Modalidad Especialista M9', 
    type: 'text' 
  },

  // ========== SECCIÓN E1: INSTALACIÓN AISLADA ==========
  // E1.1 Módulo Fotovoltaico
  { 
    name: 'e1_tecnologiaCelulaModulo', 
    label: 'Tecnología de Célula del Módulo', 
    placeholder: 'Ej: Monocristalino', 
    type: 'text' 
  },
  { 
    name: 'e1_marcaModeloModulo', 
    label: 'Marca y Modelo del Módulo', 
    placeholder: 'Ej: JAM72S30 535/MR', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_potenciaPicoModulo', 
    label: 'Potencia Pico del Módulo (Wp)', 
    placeholder: 'Ej: 535', 
    type: 'text' 
  },
  { 
    name: 'e1_toncModulo', 
    label: 'Temperatura Operacional (TONC)', 
    placeholder: 'Ej: 45ºC', 
    type: 'text' 
  },

  // E1.2 Generador Fotovoltaico
  { 
    name: 'e1_potenciaPicoGenerador', 
    label: 'Potencia Pico del Generador (kWp)', 
    placeholder: 'Ej: 5.35', 
    type: 'text' 
  },
  { 
    name: 'e1_intensidadIpmpGenerador', 
    label: 'Intensidad Impp del Generador (A)', 
    placeholder: 'Ej: 10.84', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionVpmpGenerador', 
    label: 'Tensión Vmpp del Generador (V)', 
    placeholder: 'Ej: 493', 
    type: 'text' 
  },
  { 
    name: 'e1_orientacionGenerador', 
    label: 'Orientación del Generador', 
    placeholder: 'Ej: Sur', 
    type: 'text' 
  },
  { 
    name: 'e1_inclinacionGenerador', 
    label: 'Inclinación del Generador (º)', 
    placeholder: 'Ej: 30', 
    type: 'text' 
  },
  { 
    name: 'e1_totalModulos', 
    label: 'Total de Módulos', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'e1_modulosEnSerie', 
    label: 'Módulos en Serie', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'e1_ramasEnParalelo', 
    label: 'Ramas en Paralelo', 
    placeholder: 'Ej: 1', 
    type: 'text' 
  },

  // E1.3 Baterías
  { 
    name: 'e1_marcaModeloBateria', 
    label: 'Marca y Modelo de la Batería', 
    placeholder: 'Ej: LG Chem RESU', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_tipoBateria', 
    label: 'Tipo de Batería', 
    placeholder: 'Ej: Litio-Hierro Fosfato', 
    type: 'text' 
  },
  { 
    name: 'e1_tipoPlacaBateria', 
    label: 'Tipo de Placa de la Batería', 
    placeholder: 'Ej: OPzS', 
    type: 'text' 
  },
  { 
    name: 'e1_c10Bateria', 
    label: 'Capacidad C10 (Ah)', 
    placeholder: 'Ej: 2300', 
    type: 'text' 
  },
  { 
    name: 'e1_c100Bateria', 
    label: 'Capacidad C100 (Ah)', 
    placeholder: 'Ej: 2500', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionNominalBateria', 
    label: 'Tensión Nominal de la Batería (V)', 
    placeholder: 'Ej: 48', 
    type: 'text' 
  },
  { 
    name: 'e1_profundidadDescargaBateria', 
    label: 'Profundidad de Descarga (%)', 
    placeholder: 'Ej: 80', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionMaximaBateria', 
    label: 'Tensión Máxima de la Batería (V)', 
    placeholder: 'Ej: 57.6', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionMinimaBateria', 
    label: 'Tensión Mínima de la Batería (V)', 
    placeholder: 'Ej: 44.8', 
    type: 'text' 
  },
  { 
    name: 'e1_intensidadMaximaCargaBateria', 
    label: 'Intensidad Máxima de Carga (A)', 
    placeholder: 'Ej: 100', 
    type: 'text' 
  },

  // E1.4 Regulador
  { 
    name: 'e1_marcaModeloRegulador', 
    label: 'Marca y Modelo del Regulador', 
    placeholder: 'Ej: Victron SmartSolar', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_intensidadMaximaRegulador', 
    label: 'Intensidad Máxima del Regulador (A)', 
    placeholder: 'Ej: 100', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionCorteAltaRegulador', 
    label: 'Tensión de Corte Alta (V)', 
    placeholder: 'Ej: 57.6', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionCorteBajaRegulador', 
    label: 'Tensión de Corte Baja (V)', 
    placeholder: 'Ej: 44.8', 
    type: 'text' 
  },

  // E1.5 Inversor
  { 
    name: 'e1_marcaModeloInversor', 
    label: 'Marca y Modelo del Inversor', 
    placeholder: 'Ej: Victron MultiPlus', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_potenciaNominalInversor', 
    label: 'Potencia Nominal del Inversor (W)', 
    placeholder: 'Ej: 3000', 
    type: 'text' 
  },
  { 
    name: 'e1_rendimientoInversor10', 
    label: 'Rendimiento al 10% (%)', 
    placeholder: 'Ej: 85', 
    type: 'text' 
  },
  { 
    name: 'e1_rendimientoInversor25', 
    label: 'Rendimiento al 25% (%)', 
    placeholder: 'Ej: 90', 
    type: 'text' 
  },
  { 
    name: 'e1_rendimientoInversor50', 
    label: 'Rendimiento al 50% (%)', 
    placeholder: 'Ej: 93', 
    type: 'text' 
  },
  { 
    name: 'e1_rendimientoInversor75', 
    label: 'Rendimiento al 75% (%)', 
    placeholder: 'Ej: 92', 
    type: 'text' 
  },
  { 
    name: 'e1_rendimientoInversor100', 
    label: 'Rendimiento al 100% (%)', 
    placeholder: 'Ej: 91', 
    type: 'text' 
  },
  { 
    name: 'e1_relacionTensionInversor', 
    label: 'Relación de Tensión del Inversor', 
    placeholder: 'Ej: 48V→230V', 
    type: 'text' 
  },
  { 
    name: 'e1_formaOndaSalidaInversor', 
    label: 'Forma de Onda de Salida', 
    placeholder: 'Ej: Senoidal Pura', 
    type: 'text' 
  },
  { 
    name: 'e1_frecuenciaNominalInversor', 
    label: 'Frecuencia Nominal (Hz)', 
    placeholder: 'Ej: 50', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionMaximaEntradaInversor', 
    label: 'Tensión Máxima de Entrada (V)', 
    placeholder: 'Ej: 65', 
    type: 'text' 
  },
  { 
    name: 'e1_tensionSalidaInversor', 
    label: 'Tensión de Salida (V)', 
    placeholder: 'Ej: 230', 
    type: 'text' 
  },
  { 
    name: 'e1_consumoVacioInversor', 
    label: 'Consumo en Vacío (W)', 
    placeholder: 'Ej: 50', 
    type: 'text' 
  },
  { 
    name: 'e1_seguidorPuntoMaximaPotencia', 
    label: 'Seguidor del Punto de Máxima Potencia', 
    placeholder: 'Ej: Sí', 
    type: 'text' 
  },

  // E1.6 Otros
  { 
    name: 'e1_convertidorCC_CC', 
    label: 'Convertidor CC-CC (si aplica)', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_relacionTensionCC', 
    label: 'Relación de Tensión CC', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'e1_variadorFrecuencia', 
    label: 'Variador de Frecuencia (si aplica)', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_grupoAuxiliarApoyo', 
    label: 'Grupo Auxiliar de Apoyo', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'e1_potenciaGrupoAuxiliar', 
    label: 'Potencia del Grupo Auxiliar (W)', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'e1_otrosEquipos', 
    label: 'Otros Equipos', 
    placeholder: 'Opcional', 
    type: 'textarea',
    fullWidth: true
  },

  // E1.7 Información de la Demanda
  { 
    name: 'e1_potenciaMaximaDemanda', 
    label: 'Potencia Máxima Demandada (W)', 
    placeholder: 'Ej: 3000', 
    type: 'text' 
  },
  { 
    name: 'e1_periodicidadDemanda', 
    label: 'Periodicidad de la Demanda', 
    placeholder: 'Ej: Diaria', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaEnero', 
    label: 'Energía Diaria Enero (kWh)', 
    placeholder: 'Ej: 15.5', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaFebrero', 
    label: 'Energía Diaria Febrero (kWh)', 
    placeholder: 'Ej: 16.2', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaMarzo', 
    label: 'Energía Diaria Marzo (kWh)', 
    placeholder: 'Ej: 18.5', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaAbril', 
    label: 'Energía Diaria Abril (kWh)', 
    placeholder: 'Ej: 20.1', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaMayo', 
    label: 'Energía Diaria Mayo (kWh)', 
    placeholder: 'Ej: 22.3', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaJunio', 
    label: 'Energía Diaria Junio (kWh)', 
    placeholder: 'Ej: 23.8', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaJulio', 
    label: 'Energía Diaria Julio (kWh)', 
    placeholder: 'Ej: 24.5', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaAgosto', 
    label: 'Energía Diaria Agosto (kWh)', 
    placeholder: 'Ej: 24.1', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaSeptiembre', 
    label: 'Energía Diaria Septiembre (kWh)', 
    placeholder: 'Ej: 21.5', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaOctubre', 
    label: 'Energía Diaria Octubre (kWh)', 
    placeholder: 'Ej: 18.9', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaNoviembre', 
    label: 'Energía Diaria Noviembre (kWh)', 
    placeholder: 'Ej: 16.3', 
    type: 'text' 
  },
  { 
    name: 'e1_energiaDiariaDiciembre', 
    label: 'Energía Diaria Diciembre (kWh)', 
    placeholder: 'Ej: 14.8', 
    type: 'text' 
  },

  // ========== SECCIÓN E2: INSTALACIÓN INTERCONECTADA ==========
  // E2.1 Conexión a la Red
  { 
    name: 'potenciaNominalInversores', 
    label: 'Potencia Nominal de Inversores (kW)', 
    placeholder: 'Ej: 5.5', 
    type: 'text' 
  },
  { 
    name: 'tipoConexionRed', 
    label: 'Tipo de Conexión a Red', 
    placeholder: 'Ej: Monofásica / Trifásica', 
    type: 'select',
    options: ['Monofásica', 'Trifásica']
  },

  // E2.2 Módulo Fotovoltaico
  { 
    name: 'tecnologiaCelulaModulo', 
    label: 'Tecnología de Célula del Módulo', 
    placeholder: 'Ej: Monocristalino -PERC-', 
    type: 'text' 
  },
  { 
    name: 'marcaModeloModulo', 
    label: 'Marca y Modelo del Módulo', 
    placeholder: 'Ej: JAM72S30 535/MR', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'potenciaPicoModulo', 
    label: 'Potencia Pico del Módulo (Wp)', 
    placeholder: 'Ej: 535', 
    type: 'text' 
  },
  { 
    name: 'toncModulo', 
    label: 'Temperatura Operacional TONC (ºC)', 
    placeholder: 'Ej: 45', 
    type: 'text' 
  },

  // E2.3 Generador Fotovoltaico
  { 
    name: 'potenciaPicoGenerador', 
    label: 'Potencia Pico del Generador (kWp)', 
    placeholder: 'Ej: 5.35', 
    type: 'text' 
  },
  { 
    name: 'tensionVpmpGenerador', 
    label: 'Tensión Vmpp del Generador (V)', 
    placeholder: 'Ej: 493', 
    type: 'text' 
  },
  { 
    name: 'intensidadIpmpGenerador', 
    label: 'Intensidad Impp del Generador (A)', 
    placeholder: 'Ej: 10.84', 
    type: 'text' 
  },
  { 
    name: 'orientacionGenerador', 
    label: 'Orientación del Generador', 
    placeholder: 'Ej: Sur', 
    type: 'text' 
  },
  { 
    name: 'inclinacionGenerador', 
    label: 'Inclinación del Generador (º)', 
    placeholder: 'Ej: 30', 
    type: 'text' 
  },
  { 
    name: 'totalModulos', 
    label: 'Total de Módulos', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'modulosEnSerie', 
    label: 'Módulos en Serie', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'ramasEnParalelo', 
    label: 'Ramas en Paralelo', 
    placeholder: 'Ej: 1', 
    type: 'text' 
  },

  // E2.4 Inversor
  { 
    name: 'marcaModeloInversor', 
    label: 'Marca y Modelo del Inversor', 
    placeholder: 'Ej: Victron MultiPlus', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'potenciaACInversor', 
    label: 'Potencia AC del Inversor (W)', 
    placeholder: 'Ej: 5500', 
    type: 'text' 
  },
  { 
    name: 'tensionNominalInversor', 
    label: 'Tensión Nominal del Inversor (V)', 
    placeholder: 'Ej: 230', 
    type: 'text' 
  },
  { 
    name: 'vccMaximaInversor', 
    label: 'VCC Máxima del Inversor (V)', 
    placeholder: 'Ej: 425', 
    type: 'text' 
  },
  { 
    name: 'vccMinimaInversor', 
    label: 'VCC Mínima del Inversor (V)', 
    placeholder: 'Ej: 150', 
    type: 'text' 
  },
  { 
    name: 'tipoConexionInversor', 
    label: 'Tipo de Conexión del Inversor', 
    placeholder: 'Ej: Monofásica', 
    type: 'select',
    options: ['Monofásica', 'Trifásica']
  },

  // E2.5 Baterías
  { 
    name: 'marcaModeloBateria', 
    label: 'Marca y Modelo de la Batería', 
    placeholder: 'Ej: LG Chem RESU', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'tipoBateria', 
    label: 'Tipo de Batería', 
    placeholder: 'Ej: Litio-Hierro Fosfato (LiFePO4)', 
    type: 'text' 
  },
  { 
    name: 'tensionNominalBateria', 
    label: 'Tensión Nominal de la Batería (V)', 
    placeholder: 'Ej: 200', 
    type: 'text' 
  },
  { 
    name: 'profundidadDescargaBateria', 
    label: 'Profundidad de Descarga (%)', 
    placeholder: 'Ej: 100', 
    type: 'text' 
  },
  { 
    name: 'tensionMaximaBateria', 
    label: 'Tensión Máxima de la Batería (V)', 
    placeholder: 'Ej: 57.6', 
    type: 'text' 
  },
  { 
    name: 'tensionMinimaBateria', 
    label: 'Tensión Mínima de la Batería (V)', 
    placeholder: 'Ej: 44.8', 
    type: 'text' 
  },
  { 
    name: 'energiaTotalBateria', 
    label: 'Energía Total de la Batería (kWh)', 
    placeholder: 'Ej: 13.8', 
    type: 'text' 
  },
  { 
    name: 'potenciaMaximaSalidaBateria', 
    label: 'Potencia Máxima de Salida (W)', 
    placeholder: 'Ej: 5000', 
    type: 'text' 
  },
  { 
    name: 'maximoPicoPotenciaBateria', 
    label: 'Máximo Pico de Potencia (W)', 
    placeholder: 'Ej: 6000', 
    type: 'text' 
  },

  // E2.5.1 Protecciones Externas
  { 
    name: 'intensidadInterruptorGeneral', 
    label: 'Intensidad Interruptor General (A)', 
    placeholder: 'Ej: 25', 
    type: 'text' 
  },
  { 
    name: 'poderCorteInterruptor', 
    label: 'Poder de Corte del Interruptor (kA)', 
    placeholder: 'Ej: 6', 
    type: 'text' 
  },
  { 
    name: 'proteccionFrecuenciaTension', 
    label: 'Protección de Frecuencia/Tensión', 
    placeholder: 'Especificar protecciones', 
    type: 'textarea',
    fullWidth: true
  },

  // ========== SECCIÓN F: MEDIDAS DE PROTECCIÓN ==========
  { 
    name: 'medidaContactosDirectos', 
    label: 'Medida para Contactos Directos', 
    placeholder: 'Ej: Conductores aislados y canaletas', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionDirectos', 
    label: 'Parte de Instalación (Contactos Directos)', 
    placeholder: 'Ej: CGMP', 
    type: 'text' 
  },
  { 
    name: 'medidaContactosIndirectos', 
    label: 'Medida para Contactos Indirectos', 
    placeholder: 'Ej: Interruptor diferencial', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionIndirectos', 
    label: 'Parte de Instalación (Contactos Indirectos)', 
    placeholder: 'Ej: CGMP', 
    type: 'text' 
  },
  { 
    name: 'medidaSobretensiones', 
    label: 'Medida para Sobretensiones', 
    placeholder: 'Ej: Descargador', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionSobretensiones', 
    label: 'Parte de Instalación (Sobretensiones)', 
    placeholder: 'Ej: CGMP', 
    type: 'text' 
  },
  { 
    name: 'medidaPuntoCaliente', 
    label: 'Medida para Puntos Calientes', 
    placeholder: 'Ej: 3 Diodos bypass', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionPuntoCaliente', 
    label: 'Parte de Instalación (Puntos Calientes)', 
    placeholder: 'Ej: Módulo FV', 
    type: 'text' 
  },
  { 
    name: 'medidaExplosion', 
    label: 'Medida para Riesgo de Explosión', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionExplosion', 
    label: 'Parte de Instalación (Explosión)', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'medidaCorrosion', 
    label: 'Medida para Corrosión', 
    placeholder: 'Opcional', 
    type: 'text',
    fullWidth: true
  },
  { 
    name: 'parteInstalacionCorrosion', 
    label: 'Parte de Instalación (Corrosión)', 
    placeholder: 'Opcional', 
    type: 'text' 
  },
  { 
    name: 'otrasProtecciones', 
    label: 'Otras Protecciones', 
    placeholder: 'Especificar si hay otras protecciones', 
    type: 'textarea',
    fullWidth: true
  },

  // ========== SECCIÓN G: CARACTERÍSTICAS DE LÍNEAS Y CIRCUITOS ==========
  { 
    name: 'potenciaGeneradorRegulador', 
    label: 'Potencia Línea Generador-Regulador (W)', 
    placeholder: 'Ej: 5350', 
    type: 'text' 
  },
  { 
    name: 'longitudGeneradorRegulador', 
    label: 'Longitud Línea Generador-Regulador (m)', 
    placeholder: 'Ej: 15', 
    type: 'text' 
  },
  { 
    name: 'materialGeneradorRegulador', 
    label: 'Sección de Cable Generador-Regulador (mm²)', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'intensidadGeneradorRegulador', 
    label: 'Intensidad Línea Generador-Regulador (A)', 
    placeholder: 'Ej: 10.84', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionGeneradorRegulador', 
    label: 'Caída de Tensión Generador-Regulador (%)', 
    placeholder: 'Ej: 1.2', 
    type: 'text' 
  },
  { 
    name: 'potenciaReguladorBateria', 
    label: 'Potencia Línea Regulador-Batería (W)', 
    placeholder: 'Ej: 5350', 
    type: 'text' 
  },
  { 
    name: 'longitudReguladorBateria', 
    label: 'Longitud Línea Regulador-Batería (m)', 
    placeholder: 'Ej: 5', 
    type: 'text' 
  },
  { 
    name: 'materialReguladorBateria', 
    label: 'Sección de Cable Regulador-Batería (mm²)', 
    placeholder: 'Ej: 16', 
    type: 'text' 
  },
  { 
    name: 'intensidadReguladorBateria', 
    label: 'Intensidad Línea Regulador-Batería (A)', 
    placeholder: 'Ej: 110', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionReguladorBateria', 
    label: 'Caída de Tensión Regulador-Batería (%)', 
    placeholder: 'Ej: 0.8', 
    type: 'text' 
  },
  { 
    name: 'potenciaSalidaRegulador', 
    label: 'Potencia Línea Salida Regulador (W)', 
    placeholder: 'Ej: 5350', 
    type: 'text' 
  },
  { 
    name: 'longitudSalidaRegulador', 
    label: 'Longitud Línea Salida Regulador (m)', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'materialSalidaRegulador', 
    label: 'Sección de Cable Salida Regulador (mm²)', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'intensidadSalidaRegulador', 
    label: 'Intensidad Línea Salida Regulador (A)', 
    placeholder: 'Ej: 110', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionSalidaRegulador', 
    label: 'Caída de Tensión Salida Regulador (%)', 
    placeholder: 'Ej: 1.0', 
    type: 'text' 
  },
  { 
    name: 'potenciaBateriaInversor', 
    label: 'Potencia Línea Batería-Inversor (W)', 
    placeholder: 'Ej: 3000', 
    type: 'text' 
  },
  { 
    name: 'longitudBateriaInversor', 
    label: 'Longitud Línea Batería-Inversor (m)', 
    placeholder: 'Ej: 5', 
    type: 'text' 
  },
  { 
    name: 'materialBateriaInversor', 
    label: 'Sección de Cable Batería-Inversor (mm²)', 
    placeholder: 'Ej: 6', 
    type: 'text' 
  },
  { 
    name: 'intensidadBateriaInversor', 
    label: 'Intensidad Línea Batería-Inversor (A)', 
    placeholder: 'Ej: 49', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionBateriaInversor', 
    label: 'Caída de Tensión Batería-Inversor (%)', 
    placeholder: 'Ej: < 1,5', 
    type: 'text' 
  },
  { 
    name: 'potenciaGeneradorInversorDirecto', 
    label: 'Potencia Línea Generador-Inversor (W)', 
    placeholder: 'Ej: 5350', 
    type: 'text' 
  },
  { 
    name: 'longitudGeneradorInversorDirecto', 
    label: 'Longitud Línea Generador-Inversor (m)', 
    placeholder: 'Ej: 10', 
    type: 'text' 
  },
  { 
    name: 'materialGeneradorInversorDirecto', 
    label: 'Sección de Cable Generador-Inversor (mm²)', 
    placeholder: 'Ej: 6', 
    type: 'text' 
  },
  { 
    name: 'intensidadGeneradorInversorDirecto', 
    label: 'Intensidad Línea Generador-Inversor (A)', 
    placeholder: 'Ej: 49', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionGeneradorInversorDirecto', 
    label: 'Caída de Tensión Generador-Inversor (%)', 
    placeholder: 'Ej: < 1,5', 
    type: 'text' 
  },
  { 
    name: 'potenciaSalidaInversorRed', 
    label: 'Potencia Línea Salida Inversor-Red (W)', 
    placeholder: 'Ej: 3000', 
    type: 'text' 
  },
  { 
    name: 'longitudSalidaInversorRed', 
    label: 'Longitud Línea Salida Inversor-Red (m)', 
    placeholder: 'Ej: 5', 
    type: 'text' 
  },
  { 
    name: 'materialSalidaInversorRed', 
    label: 'Sección de Cable Salida Inversor-Red (mm²)', 
    placeholder: 'Ej: 6', 
    type: 'text' 
  },
  { 
    name: 'intensidadSalidaInversorRed', 
    label: 'Intensidad Línea Salida Inversor-Red (A)', 
    placeholder: 'Ej: 44', 
    type: 'text' 
  },
  { 
    name: 'caidaTensionSalidaInversorRed', 
    label: 'Caída de Tensión Salida Inversor-Red (%)', 
    placeholder: 'Ej: < 1,5', 
    type: 'text' 
  },

  // ========== SECCIÓN H: ESQUEMA UNIFILAR ==========
  { 
    name: 'esquemaUnifilar', 
    label: 'Esquema Unifilar (Archivo)', 
    type: 'file',
    accept: 'image/*,.pdf',
    fullWidth: true
  },

  // ========== SECCIÓN I: PLANO DE EMPLAZAMIENTO ==========
  { 
    name: 'planoEmplazamiento', 
    label: 'Plano de Emplazamiento (Archivo)', 
    type: 'file',
    accept: 'image/*,.pdf',
    fullWidth: true
  }
]

/**
 * Extraer los defaultData del masterFormFields
 */
export const getMasterFormDefaultData = () => {
  const defaultData = {}
  masterFormFields.forEach(field => {
    defaultData[field.name] = ''
  })
  return defaultData
}
