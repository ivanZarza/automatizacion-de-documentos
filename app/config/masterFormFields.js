
export const masterFormFields = [
  // ========== SECCIÓN A ==========

  { name: 'fecha', label: 'Fecha', placeholder: 'Ej: 16/10/2025', type: 'date', subsection: 'A' },
  { name: 'dia', label: 'Día', placeholder: 'Ej: 15', type: 'text', subsection: 'A' },
  { name: 'mes', label: 'Mes(En letra joder!) ', placeholder: 'Ej: 02', type: 'text', subsection: 'A' },
  { name: 'anio', label: 'Año', placeholder: 'Ej: 2026', type: 'text', subsection: 'A' },
  { name: 'apellidosNombre', label: 'Apellidos y Nombre del Titular', placeholder: 'Ej: García López, Juan', type: 'text', subsection: 'A' },
  { name: 'nifCif', label: 'NIF/CIF del Titular', placeholder: 'Ej: 12.345.678-A', type: 'text', subsection: 'A' },
  { name: 'telefono', label: 'Teléfono Móvil', placeholder: 'Ej: 654 123 456', type: 'tel', subsection: 'A' },
  { name: 'correoElectronicoEmplazamiento', label: 'Correo Electrónico del Emplazamiento', placeholder: 'Ej: emplazamiento@correo.com', type: 'email', subsection: 'A' },
  { name: 'emplazamientoCalle', label: 'Calle del Emplazamiento', placeholder: 'Ej: Avenida de la Innovación', type: 'text', subsection: 'A' },
  { name: 'numero', label: 'Número', placeholder: 'Ej: 42', type: 'text', subsection: 'A' },
  { name: 'planta', label: 'Planta', placeholder: 'Ej: 1ª, 2ª, Bajo...', type: 'text', subsection: 'A' },
/*   { name: 'portal', label: 'Portal', placeholder: 'Ej: 3', type: 'text', subsection: 'A' },
 */  { name: 'bloque', label: 'Bloque', placeholder: 'Ej: A', type: 'text', subsection: 'A' },
  { name: 'escalera', label: 'Escalera', placeholder: 'Ej: 1', type: 'text', subsection: 'A' },
  { name: 'letra', label: 'Letra', placeholder: 'Ej: B', type: 'text', subsection: 'A' },
/*   { name: 'KMEnLaVia', label: 'KM en la Vía', placeholder: 'Ej: 5', type: 'text', subsection: 'A' },
 *//*   { name: 'piso', label: 'Piso', placeholder: 'Ej: 3º', type: 'text', subsection: 'A' },
 */  { name: 'puerta', label: 'Puerta', placeholder: 'Ej: B', type: 'text', subsection: 'A' },
/*   { name: 'telefonoFijo', label: 'Teléfono Fijo', placeholder: 'Ej: 954 123 456', type: 'tel', subsection: 'A' },
 */  { name: 'localidadEmplazamiento', label: 'Localidad del Emplazamiento', placeholder: 'Ej: Sevilla', type: 'text', subsection: 'A' },
  { name: 'provinciaEmplazamiento', label: 'Provincia del Emplazamiento', placeholder: 'Ej: Sevilla', type: 'text', subsection: 'A' },
  { name: 'codigoPostalEmplazamiento', label: 'Código Postal del Emplazamiento', placeholder: 'Ej: 41001', type: 'text', subsection: 'A' },
  { name: 'referenciaCatastral', label: 'Referencia Catastral', placeholder: 'Ej: 4127805SG0000200000CT', type: 'text', subsection: 'A' },
  { name: 'denominacionEstablecimiento', label: 'Denominación del Establecimiento', placeholder: 'Ej: Bar Los Amigos', type: 'text', subsection: 'A' },
  { name: 'nifEstablecimiento', label: 'NIF del Establecimiento', placeholder: 'Ej: B12345678', type: 'text', subsection: 'A' },

  /*   { name: 'tipoVia', label: 'Tipo de Vía', placeholder: 'Ej: Avenida, Calle, Plaza...', type: 'text', subsection: 'A' },
   */

  /*   { name: 'nifEntidadRepresentada', label: 'NIF de la Entidad Representada', placeholder: 'Ej: B12345678', type: 'text', subsection: 'A' },
  
    /*   { name: 'pais', label: 'País', placeholder: 'Ej: España', type: 'text', subsection: 'A' },
     */
  // ========== SECCIÓN E2: INSTALACIÓN INTERCONECTADA ==========
  // E2.1 Conexión a la Red
  { name: 'tipoInstalacion', label: 'Tipo de Instalación', placeholder: 'Seleccionar tipo...', type: 'select', options: ['Fotovoltaica conectada a red interior', 'Fotovoltaica aislada', 'Instalación con fines especiales'], subsection: 'E2' },
/*   { name: 'usoDestino', label: 'Uso y Destino', placeholder: 'Ej: Autoconsumo para vivienda', type: 'text', subsection: 'E2' },
 */ { name: 'e2_potenciaNominalInversores', label: 'POTENCIA NOMINAL TOTAL EN INVERSORES (kW)', placeholder: 'Ej: 5.5', type: 'text', subsection: 'E2' },
  { name: 'e2_tipoConexionRed', label: 'TIPO', placeholder: 'Ej: Monofásica / Trifásica', type: 'select', options: ['Monofásica', 'Trifásica'], subsection: 'E2' },

  // E2.2 Módulo Fotovoltaico
/*   { name: 'e2_tecnologiaCelulaModulo', label: 'TECNOLOGÍA DE LA CÉLULA', placeholder: 'Ej: Monocristalino -PERC-', type: 'text', subsection: 'E2' },
 */  { name: 'e2_marcaModeloModulo', label: 'MARCA Y MODELO', placeholder: 'Ej: JA Solar JAM72S30 450/MR', type: 'text', subsection: 'E2', fullWidth: true },
  { name: 'e2_potenciaPicoModulo', label: 'POTENCIA PICO (Wp) DEL MÓDULO', placeholder: 'Ej: 450', type: 'text', subsection: 'E2' },
  /*   { name: 'e2_toncModulo', label: 'TONC (ºC)', placeholder: 'Ej: 45', type: 'text', subsection: 'E2' },
   */
  // E2.3 Generador Fotovoltaico
  { name: 'e2_potenciaPicoGenerador', label: 'POTENCIA PICO (Wp) DEL GENERADOR', placeholder: 'Ej: 4500', type: 'text', subsection: 'E2' },
  { name: 'e2_intensidadIpmpGenerador', label: 'INTENSIDAD MÁXIMA POTENCIA, Ipmp (A)', placeholder: 'Ej: 10', type: 'text', subsection: 'E2' },
  { name: 'e2_tensionVpmpGenerador', label: 'TENSIÓN MÁXIMA POTENCIA, Vpmp (V)', placeholder: 'Ej: 400', type: 'text', subsection: 'E2' },
  { name: 'e2_orientacionGenerador', label: 'ORIENTACIÓN', placeholder: 'Ej: Sur', type: 'text', subsection: 'E2' },
  { name: 'e2_inclinacionGenerador', label: 'INCLINACIÓN (º)', placeholder: 'Ej: 30', type: 'text', subsection: 'E2' },
  { name: 'e2_totalModulos', label: 'Nº TOTAL MÓDULOS', placeholder: 'Ej: 10', type: 'text', subsection: 'E2' },
  { name: 'e2_modulosEnSerie', label: 'Nº MÓDULOS EN SERIE', placeholder: 'Ej: 10', type: 'text', subsection: 'E2' },
  { name: 'e2_ramasEnParalelo', label: 'Nº RAMAS EN PARALELO', placeholder: 'Ej: 1', type: 'text', subsection: 'E2' },
  { name: 'disposicionModulos', label: 'DISPOSICIÓN DE LOS MÓDULOS', placeholder: 'Ej: En fila horizontal', type: 'select', options: ['Cubierta Teja - Aporticada', 'Cubierta Teja - Coplanar', 'Cubierta Plana', 'Pergola', 'Chapa Grecada - Aporticada', 'Chapa Grecada - Coplanar', 'Suelo', 'Paramento Vertical'], subsection: 'E2', fullWidth: true },

  // E2.4 Inversor
  { name: 'e2_marcaModeloInversor', label: 'MARCA Y MODELO', placeholder: 'Ej: Fronius Symo', type: 'text', subsection: 'E2', fullWidth: true },
  { name: 'e2_potenciaNominalInversor', label: 'POTENCIA NOMINAL (kW)', placeholder: 'Ej: 5000', type: 'text', subsection: 'E2' },
  { name: 'e2_relacionTensionInversor', label: 'RELACIÓN TENSIÓN  AC, Vn (V)', placeholder: 'Ej: 230V/400V', type: 'text', subsection: 'E2' },
  { name: 'e2_formaOndaSalidaInversor', label: 'Vcc MÁXIMA', placeholder: 'Ej: Senoidal Pura', type: 'text', subsection: 'E2' },
  { name: 'e2_frecuenciaNominalInversor', label: 'Vcc MÍNIMA ', placeholder: 'Ej: 50', type: 'text', subsection: 'E2' },
  { name: 'e2_tensionMaximaEntradaInversor', label: 'CONEXIÓN', placeholder: 'Ej: 65', type: 'text', subsection: 'E2' },
  /*   { name: 'e2_tensionSalidaInversor', label: 'TENSIÓN SALIDA (V)', placeholder: 'Ej: 400', type: 'text', subsection: 'E2' },
    { name: 'e2_consumoVacioInversor', label: 'CONSUMO EN VACÍO', placeholder: 'Ej: 50', type: 'text', subsection: 'E2' }, */

  // E2.5 Otros
  { name: 'e2_marcaModelo', label: 'MARCA Y MODELO', placeholder: 'Opcional', type: 'text', subsection: 'E2', fullWidth: true },
  { name: 'e2_tipoDeBateria', label: 'TIPO DE BATERÍA', placeholder: 'Opcional', type: 'text', subsection: 'E2' },
  { name: 'e2_tensionNominal', label: 'TENSIÓN NOMINAL (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2', fullWidth: true },
  { name: 'e2_profundidadDescarga', label: 'PROFUNDIDAD DE DESCARGA', placeholder: 'Opcional', type: 'text', subsection: 'E2', fullWidth: true },
  { name: 'e2_tensionMaxima', label: 'TENSIÓN MÁXIMA (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2' },
  { name: 'e2_tensionMinima', label: 'TENSIÓN MÍNIMA (V)', placeholder: 'Opcional', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaTotal', label: 'ENERGÍA TOTAL ', placeholder: 'Opcional', type: 'text', subsection: 'E2' },
  { name: 'e2_potenciaMaximaSalida', label: 'POTENCIA MÁXIMA SALIDA', placeholder: 'Opcional', type: 'text', subsection: 'E2' },
  { name: 'e2_maximoPicoDePotencia', label: 'MÁXIMO PICO DE POTENCIA', placeholder: 'Opcional', type: 'text', subsection: 'E2' },

  // 2.6 Protecciones Externas
  { name: 'e2_intensidadNominalInterruptor', label: 'INTENSIDAD NOMINAL DEL INTERRUPTOR GENERAL, In (A)', placeholder: 'Ej: 25', type: 'text', subsection: 'E2' },
  { name: 'e2_poderCorteInterruptor', label: 'PODER DE CORTE DEL INTERRUPTOR GENERAL (kA)', placeholder: 'Ej: 6', type: 'text', subsection: 'E2' },

  /* // E2.6 Información de la Demanda
  { name: 'e2_potenciaMaximaDemanda', label: 'MARCA Y MODELO', placeholder: 'Ej: 5000', type: 'text', subsection: 'E2' },
  { name: 'e2_periodicidadDemanda', label: 'PERIODICIDAD', placeholder: 'Ej: Diaria', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaMediaMensual', label: 'ENERGÍA DIARIA MEDIA MENSUAL (Wh/día)', placeholder: 'Ej: 15500', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaEnero', label: 'ENE', placeholder: 'Ej: 15.5', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaFebrero', label: 'FEB', placeholder: 'Ej: 16.2', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaMarzo', label: 'MAR', placeholder: 'Ej: 18.5', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaAbril', label: 'ABR', placeholder: 'Ej: 20.1', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaMayo', label: 'MAY', placeholder: 'Ej: 22.3', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaJunio', label: 'JUN', placeholder: 'Ej: 23.8', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaJulio', label: 'JUL', placeholder: 'Ej: 24.5', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaAgosto', label: 'AGO', placeholder: 'Ej: 24.1', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaSeptiembre', label: 'SEP', placeholder: 'Ej: 21.5', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaOctubre', label: 'OCT', placeholder: 'Ej: 18.9', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaNoviembre', label: 'NOV', placeholder: 'Ej: 16.3', type: 'text', subsection: 'E2' },
  { name: 'e2_energiaDiariaDiciembre', label: 'DIC', placeholder: 'Ej: 14.8', type: 'text', subsection: 'E2' },
 */
  // ========== SECCIÓN F: MEDIDAS DE PROTECCIÓN EMPLEADAS ==========
  /*   { name: 'f_medidaContactoDirecto', label: 'CONTACTOS DIRECTOS - Tipo de Medida', placeholder: 'Ej: Conductores aislados y canaletas', type: 'text', subsection: 'F' },
    { name: 'f_parteContactoDirecto', label: 'CONTACTOS DIRECTOS - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaContactoIndirecto', label: 'CONTACTOS INDIRECTOS - Tipo de Medida', placeholder: 'Ej: Interruptor diferencial', type: 'text', subsection: 'F' },
    { name: 'f_parteContactoIndirecto', label: 'CONTACTOS INDIRECTOS - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaPuntoCaliente', label: 'EFECTO DEL PUNTO CALIENTE - Tipo de Medida', placeholder: 'Ej: 3 Diodos bypass', type: 'text', subsection: 'F' },
    { name: 'f_partePuntoCaliente', label: 'EFECTO DEL PUNTO CALIENTE - Parte de la Instalación', placeholder: 'Ej: Módulo FV', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaSobretensiones', label: 'SOBRETENSIONES - Tipo de Medida', placeholder: 'Ej: Descargador', type: 'text', subsection: 'F' },
    { name: 'f_parteSobretensiones', label: 'SOBRETENSIONES - Parte de la Instalación', placeholder: 'Ej: CGMP', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaExplosion', label: 'RIESGO DE EXPLOSIÓN - Tipo de Medida', placeholder: 'Opcional (solo aisladas con baterías)', type: 'text', subsection: 'F' },
    { name: 'f_parteExplosion', label: 'RIESGO DE EXPLOSIÓN - Parte de la Instalación', placeholder: 'Opcional', type: 'text', subsection: 'F' },
  
    { name: 'f_medidaCorrosion', label: 'RIESGO DE CORROSIÓN - Tipo de Medida', placeholder: 'Opcional (solo aisladas con baterías)', type: 'text', subsection: 'F' },
    { name: 'f_parteCorrosion', label: 'RIESGO DE CORROSIÓN - Parte de la Instalación', placeholder: 'Opcional', type: 'text', subsection: 'F' },
  
    { name: 'f_otrasProtecciones', label: 'OTRAS MEDIDAS', placeholder: 'Indicar cuales', type: 'textarea', subsection: 'F', fullWidth: true },
   */
  // ========== SECCIÓN G: CARACTERÍSTICAS DE LÍNEAS Y CIRCUITOS ==========
  /*   { name: 'g_generadorReguladorPotencia', label: 'Generador FV-Regulador: Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorLongitud', label: 'Generador FV-Regulador: Longitud (m)', placeholder: 'Ej: 15', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorSeccion', label: 'Generador FV-Regulador: Material/Sección (mm²)', placeholder: 'Ej: 10', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorIntensidad', label: 'Generador FV-Regulador: Intensidad Admisible (A)', placeholder: 'Ej: 10.84', type: 'text', subsection: 'G' },
    { name: 'g_generadorReguladorCaidaTension', label: 'Generador FV-Regulador: Caída de Tensión (%)', placeholder: 'Ej: 1.2', type: 'text', subsection: 'G' },
   */
  /* { name: 'g_reguladorBateriaPotencia', label: 'Regulador-Batería: Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaLongitud', label: 'Regulador-Batería: Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaSeccion', label: 'Regulador-Batería: Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaIntensidad', label: 'Regulador-Batería: Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
  { name: 'g_reguladorBateriaCaidaTension', label: 'Regulador-Batería: Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
   */
  /*  { name: 'g_reguladorInversorPotencia', label: 'Regulador-Inversor: Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorLongitud', label: 'Regulador-Inversor: Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorSeccion', label: 'Regulador-Inversor: Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorIntensidad', label: 'Regulador-Inversor: Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
   { name: 'g_reguladorInversorCaidaTension', label: 'Regulador-Inversor: Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
    */
  { name: 'g_bateriaDiRectaInversorPotencia', label: 'Batería-Inversor (directo): Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
  /*   { name: 'g_bateriaDiRectaInversorLongitud', label: 'Batería-Inversor (directo): Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorSeccion', label: 'Batería-Inversor (directo): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorIntensidad', label: 'Batería-Inversor (directo): Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
    { name: 'g_bateriaDiRectaInversorCaidaTension', label: 'Batería-Inversor (directo): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
     */
  { name: 'g_generadorDirectoInversorPotencia', label: 'Generador-Inversor (directo): Potencia (kW)', placeholder: 'Ej: 5.35', type: 'text', subsection: 'G' },
  /*  { name: 'g_generadorDirectoInversorLongitud', label: 'Generador-Inversor (directo): Longitud (m)', placeholder: 'Ej: 10', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorSeccion', label: 'Generador-Inversor (directo): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorIntensidad', label: 'Generador-Inversor (directo): Intensidad Admisible (A)', placeholder: 'Ej: 49', type: 'text', subsection: 'G' },
   { name: 'g_generadorDirectoInversorCaidaTension', label: 'Generador-Inversor (directo): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
    */
  { name: 'g_inversorRedPotencia', label: 'Inversor-Red (interconectadas): Potencia (kW)', placeholder: 'Ej: 3000', type: 'text', subsection: 'G' },
  /*  { name: 'g_inversorRedLongitud', label: 'Inversor-Red (interconectadas): Longitud (m)', placeholder: 'Ej: 5', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedSeccion', label: 'Inversor-Red (interconectadas): Material/Sección (mm²)', placeholder: 'Ej: 6', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedIntensidad', label: 'Inversor-Red (interconectadas): Intensidad Admisible (A)', placeholder: 'Ej: 44', type: 'text', subsection: 'G' },
   { name: 'g_inversorRedCaidaTension', label: 'Inversor-Red (interconectadas): Caída de Tensión (%)', placeholder: 'Ej: < 1.5', type: 'text', subsection: 'G' },
  */


  // ========== SECCIÓN IMAGEN: IMÁGENES DE PLANOS CON DESCRIPCIONES ==========
  { name: 'otros_imagenPlanoSituacion', label: 'PLANO DE SITUACIÓN', type: 'file', accept: 'image/*,.pdf', description: 'Plano de situación geográfica de la instalación.', subsection: 'IMAGEN' },
  { name: 'otros_imagenPlanoEmplazamiento', label: 'PLANO DE EMPLAZAMIENTO', type: 'file', accept: 'image/*,.pdf', description: 'Plano de emplazamiento de la instalación.', subsection: 'IMAGEN' },
  { name: 'otros_PlanoCubiertaNuevo', label: 'PLANO DE CUBIERTA NUEVO', type: 'file', accept: 'image/*,.pdf', description: 'Plano de detalle de la instalación fotovoltaica en cubierta.', subsection: 'IMAGEN' },
  { name: 'h_esquemaUnifilar', label: 'ESQUEMA UNIFILAR (Archivo)', type: 'file', accept: 'image/*,.pdf', subsection: 'IMAGEN', fullWidth: true, },
  { name: 'firma', label: 'FIRMA (Archivo)', type: 'file', accept: 'image/*,.pdf', subsection: 'IMAGEN', fullWidth: true, },

  // ========== SECCIÓN: LEGALIZACION ==========
  // Campos de legalización: súministro, distribuidora, protecciones
  { name: 'registro_instalacion', label: 'Registro Instalación', placeholder: 'Ej: REG-2025-001-PRINCIPAL', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'terminacioAnual', label: 'Terminación Anual', placeholder: 'Ej: 2025', type: 'select', options: ['26', '27', '28'], subsection: 'LEGALIZACION' },
  { name: 'almacenamiento', label: 'Almacenamiento', placeholder: 'Seleccionar tipo...', type: 'select', options: ['con almacenamiento', 'sin almacenamiento'], subsection: 'LEGALIZACION' },
  { name: 'figuraTecnicoCompetente', label: 'Técnico Competente', type: 'checkbox', subsection: 'LEGALIZACION' },
  { name: 'figuraInstaladorHabilitado', label: 'Instalador Habilitado', type: 'checkbox', subsection: 'LEGALIZACION' },
  { name: 'figuraResponsableTecnico', label: 'Responsable Técnico', type: 'checkbox', subsection: 'LEGALIZACION' },
  { name: 'instalacion1', label: 'Instalación1', placeholder: 'Seleccionar tipo...', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'observaciones', label: 'Observaciones', placeholder: 'Selecciona una opción', type: 'select', options: [{ label: 'con batería', value: 'Se trata de una instalación de generación para autoconsumo FV de B.T.con baterias conectado a la red con excedentes acogido a compensación' }, { label: 'sin batería', value: 'Se trata de una instalación de generación para autoconsumo FV de B.T. conectado a la red con excedentes acogido a compensación' }], subsection: 'LEGALIZACION' },
  { name: 'e2_potenciaNominalInversores', label: 'POTENCIA NOMINAL TOTAL EN INVERSORES (kW)', placeholder: 'Ej: 5.5', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'cups', label: 'CUPS', placeholder: 'Ej: ES123456789012345678', type: 'text', fullWidth: true, subsection: 'LEGALIZACION' },
  { name: 'empresaDistribuidora', label: 'Empresa Distribuidora', placeholder: 'Ej: Endesa, Iberdrola', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'intensidadNominal', label: 'Intensidad nominal', placeholder: 'Ej: 30A / 63A', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'seccionFase', label: 'Sección Fase', placeholder: '', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'sensibilidadDiferencial', label: 'Sensibilidad (mA)', placeholder: 'Ej: 30', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'fechaElaboracion', label: 'Fecha de Elaboración Proyecto', placeholder: 'Ej: 16/10/2025', type: 'date', subsection: 'LEGALIZACION' },
  { name: 'directorDeObra', label: 'Director de Obra', placeholder: 'Ej: Juan García López', type: 'select', options: ['Eduardo Rafael Rivera Cabezas', '   '], subsection: 'LEGALIZACION' },
  {
    name: 'codigoDirectorio', label: 'Código Directorio (Ciudad)', placeholder: 'Selecciona una ciudad...', type: 'select', options: [
      { label: 'Almeria', value: 'A01041434' },
      { label: 'Cadiz', value: 'A01041435' },
      { label: 'Cordoba', value: 'A01041436' },
      { label: 'Granada', value: 'A01041437' },
      { label: 'Huelva', value: 'A01041438' },
      { label: 'Jaen', value: 'A01041440' },
      { label: 'Malaga', value: 'A01041442' },
      { label: 'Sevilla', value: 'A01041444' },
      { name: 'nombreFirma', label: 'Nombre Firma', placeholder: 'Ej: Juan García López', type: 'text', subsection: 'LEGALIZACION' },
    ], subsection: 'LEGALIZACION'
  },

  { name: 'titulacion', label: 'Titulación', placeholder: '', type: 'select', options: ['', 'Ingeniero Técnico Industrial'], subsection: 'LEGALIZACION' },
  { name: 'colegioOficial', label: 'Colegio Oficial', placeholder: '', type: 'select', options: ['    ', 'COIIAOC'], subsection: 'LEGALIZACION' },
  { name: 'numeroColegiado', label: 'Número Colegiado', placeholder: '', type: 'select', options: [' ', '4654'], subsection: 'LEGALIZACION' },
  { name: 'organismoControl', label: 'Organismo de Control', placeholder: '', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'numeroNotificacion', label: 'Número Notificación', placeholder: '', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'referenciaFechaInspeccion', label: 'Referencia Fecha Inspección', placeholder: '', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'nombreRepresentanteEntidad', label: 'Nombre del Representante de la Entidad', placeholder: 'Ej: Juan Pérez', type: 'text', fullWidth: true, subsection: 'LEGALIZACION' },
  { name: 'dniRepresentanteEntidad', label: 'DNI del Representante de la Entidad', placeholder: 'Ej: 12345678A', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'denominacionEstablecimiento', label: 'Denominación del Establecimiento', placeholder: 'Ej: Bar Los Amigos', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'nifEstablecimiento', label: 'NIF del Establecimiento', placeholder: 'Ej: B12345678', type: 'text', subsection: 'LEGALIZACION' },
  // ========== SECCIÓN ACEPTACION: ACEPTACIÓN Y CONFORMIDAD ==========
  { name: 'codigoEni', label: 'Código ENI', placeholder: 'Ej: ENI12345', type: 'text', subsection: 'ACEPTACION' },
  { name: 'expedienteEco', label: 'Expediente ECO', placeholder: 'Ej: ECO12345', type: 'text', subsection: 'ACEPTACION' },
  { name: 'potenciaProyecto', label: 'Potencia del Proyecto', placeholder: 'Ej: 5 kW', type: 'text', subsection: 'ACEPTACION' },
  { name: 'importeSubvencion', label: 'Importe de la Subvención', placeholder: 'Ej: 1500 €', type: 'text', subsection: 'ACEPTACION' },
  {
    name: 'edificioVivienda', label: 'Edificio o Vivienda', placeholder: 'Ej: selecciona una opción', type: 'select', options: [
      { label: 'Edificio', value: 'rehabilitacion a nivel de edificio' },
      { label: 'Vivienda', value: 'mejora de la eficiencia energetica en viviendas' },
    ], subsection: 'ACEPTACION'
  },
  { name: 'diaAceptacion', label: 'Día Aceptación', placeholder: 'Ej: 15', type: 'text', subsection: 'ACEPTACION' },
  { name: 'mesAceptacion', label: 'Mes Aceptación', placeholder: 'Ej: 10', type: 'text', subsection: 'ACEPTACION' },
  { name: 'anioAceptacion', label: 'Año Aceptación', placeholder: 'Ej: 2024', type: 'text', subsection: 'ACEPTACION' },
  // ========== SUBSECCIÓN JUSTIFICACIÓN ==========
  { name: 'edificioViviendaJUS', label: 'Tipo de Edificio/Vivienda', type: 'select', options: ['edificio', 'vivienda'], subsection: 'JUSTIFICACION' },
  { name: 'l3l4', label: 'Línea de Subvención', type: 'select',options: ['Línea 3', 'Línea 4'], placeholder: 'ej: Línea 3', subsection: 'JUSTIFICACION' },
  {
    name: 'parrafoTexto', label: 'Párrafo Introducción', type: 'select', options: [
      { label: 'Línea 3', value: 'Estas ayudas tienen por objeto la financiación de obras o actuaciones en los edificios de uso predominante residencial en las que se obtenga una mejora acreditada de la eficiencia energética, con especial atención a la envolvente edificatoria en edificios de tipología residencial colectiva, incluyendo sus viviendas, y en las viviendas unifamiliares.' },
      { label: 'Línea 4', value: 'Estas ayudas tienen por objeto la financiación de actuaciones u obras de mejora de la eficiencia energética en las viviendas, ya sean unifamiliares o pertenecientes a edificios plurifamiliares' }
    ], subsection: 'JUSTIFICACION', fullWidth: true
  },
  { name: 'tipoActuacion', label: 'Actua en calidad de...', type: 'text', placeholder: 'Ej: Propietario', subsection: 'JUSTIFICACION' },
  { name: 'numeroFactura', label: 'Nº Factura', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'fechaFactura', label: 'Fecha Factura', type: 'date', subsection: 'JUSTIFICACION' },
  { name: 'cf', label: 'CF', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'acreedor', label: 'Acreedor', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'concepto', label: 'Concepto', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'fechaPago', label: 'Fecha Pago', type: 'date', subsection: 'JUSTIFICACION' },
  { name: 'importe', label: 'Importe', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'totalCantidadJustificada', label: 'Total Cantidad Justificada', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'presupuestoInicial', label: 'Presupuesto Inicial', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'inversionRealizada', label: 'Inversión Realizada', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'desviacion', label: 'Desviación (con IVA si es subvencionable)', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'diaInicio', label: 'Día Inicio', placeholder: 'Ej: 03', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'mesInicio', label: 'Mes Inicio', placeholder: 'Ej: 10', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'anioInicio', label: 'Año Inicio', placeholder: 'Ej: 2023', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'diaFirmaJustificacion', label: 'Día Firma Justificación', placeholder: 'Ej: 08', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'mesFirmaJustificacion', label: 'Mes Firma Justificación', placeholder: 'Ej: 09', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'anioFirmaJustificacion', label: 'Año Firma Justificación', placeholder: 'Ej: 2025', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'denominacionEstablecimiento', label: 'Denominación del Establecimiento', placeholder: 'Ej: Bar Los Amigos', type: 'text', subsection: 'LEGALIZACION' },
  { name: 'nombreRepresentanteEntidad', label: 'Nombre del Representante de la Entidad', placeholder: 'Ej: Juan Pérez', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'dniRepresentanteEntidad', label: 'DNI del Representante de la Entidad', placeholder: 'Ej: 12345678A', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'denominacionEstablecimiento', label: 'Denominación del Establecimiento', placeholder: 'Ej: Bar Los Amigos', type: 'text', subsection: 'JUSTIFICACION' },
  { name: 'nifEmpresa', label: 'NIF Empresa', placeholder: 'Ej: B12345678', type: 'text', subsection: 'JUSTIFICACION' },

  // ========== SUBSECCIÓN JUSTIFICACIÓN: Pedidos y Contratos ==========

  // Pedido 1
  { name: 'pedido1Concepto', label: 'Concepto', placeholder: 'Ej: Módulos solares', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1Proveedor', label: 'Proveedor', placeholder: 'Ej: Empresa XYZ', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1IdOferta', label: 'Id. Oferta', placeholder: 'Ej: OF-2025-001', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1FechaOferta', label: 'Fecha Oferta', placeholder: 'Ej: 15/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1ImporteOferta', label: 'Importe Oferta (€)', placeholder: 'Ej: 5000', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1IdPedido', label: 'Id. Pedido', placeholder: 'Ej: PED-2025-001', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1FechaPedido', label: 'Fecha Pedido', placeholder: 'Ej: 16/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 1' },
  { name: 'pedido1ImportePedido', label: 'Importe Pedido (€)', placeholder: 'Ej: 5000', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 1' },

  // Pedido 2
  { name: 'pedido2Concepto', label: 'Concepto', placeholder: 'Ej: Inversor solar', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2Proveedor', label: 'Proveedor', placeholder: 'Ej: Empresa ABC', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2IdOferta', label: 'Id. Oferta', placeholder: 'Ej: OF-2025-002', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2FechaOferta', label: 'Fecha Oferta', placeholder: 'Ej: 16/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2ImporteOferta', label: 'Importe Oferta (€)', placeholder: 'Ej: 2500', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2IdPedido', label: 'Id. Pedido', placeholder: 'Ej: PED-2025-002', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2FechaPedido', label: 'Fecha Pedido', placeholder: 'Ej: 17/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 2' },
  { name: 'pedido2ImportePedido', label: 'Importe Pedido (€)', placeholder: 'Ej: 2500', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 2' },

/*   // Pedido 3
  { name: 'pedido3Concepto', label: 'Concepto', placeholder: 'Ej: Estructura de montaje', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3Proveedor', label: 'Proveedor', placeholder: 'Ej: Empresa DEF', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3IdOferta', label: 'Id. Oferta', placeholder: 'Ej: OF-2025-003', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3FechaOferta', label: 'Fecha Oferta', placeholder: 'Ej: 17/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3ImporteOferta', label: 'Importe Oferta (€)', placeholder: 'Ej: 1500', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3IdPedido', label: 'Id. Pedido', placeholder: 'Ej: PED-2025-003', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3FechaPedido', label: 'Fecha Pedido', placeholder: 'Ej: 18/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 3' },
  { name: 'pedido3ImportePedido', label: 'Importe Pedido (€)', placeholder: 'Ej: 1500', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 3' },

  // Pedido 4
  { name: 'pedido4Concepto', label: 'Concepto', placeholder: 'Ej: Materiales para instalación', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4Proveedor', label: 'Proveedor', placeholder: 'Ej: Empresa GHI', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4IdOferta', label: 'Id. Oferta', placeholder: 'Ej: OF-2025-004', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4FechaOferta', label: 'Fecha Oferta', placeholder: 'Ej: 18/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4ImporteOferta', label: 'Importe Oferta (€)', placeholder: 'Ej: 1000', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4IdPedido', label: 'Id. Pedido', placeholder: 'Ej: PED-2025-004', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4FechaPedido', label: 'Fecha Pedido', placeholder: 'Ej: 19/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 4' },
  { name: 'pedido4ImportePedido', label: 'Importe Pedido (€)', placeholder: 'Ej: 1000', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 4' },

  // Pedido 5
  { name: 'pedido5Concepto', label: 'Concepto', placeholder: 'Ej: Mano de obra instalación', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5Proveedor', label: 'Proveedor', placeholder: 'Ej: Empresa JKL', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5IdOferta', label: 'Id. Oferta', placeholder: 'Ej: OF-2025-005', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5FechaOferta', label: 'Fecha Oferta', placeholder: 'Ej: 19/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5ImporteOferta', label: 'Importe Oferta (€)', placeholder: 'Ej: 800', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5IdPedido', label: 'Id. Pedido', placeholder: 'Ej: PED-2025-005', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5FechaPedido', label: 'Fecha Pedido', placeholder: 'Ej: 20/01/2025', type: 'date', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
  { name: 'pedido5ImportePedido', label: 'Importe Pedido (€)', placeholder: 'Ej: 800', type: 'text', subsection: 'JUSTIFICACION', group: 'Pedido 5' },
 */
]

export const getMasterFormDefaultData = () => {
  const defaultData = {}
  masterFormFields.forEach(field => {
    if (field.type === 'checkbox') {
      defaultData[field.name] = false
    } else {
      defaultData[field.name] = ''
    }
  })
  return defaultData
}
