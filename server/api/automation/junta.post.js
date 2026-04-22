export default defineEventHandler(async (event) => {
  // Bloqueo de seguridad para Vercel (Playwright no es compatible en este entorno y pesa demasiado)
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    // Nota: Dejamos el bloqueo en producción web para evitar el límite de 250MB
    return {
      success: false,
      error: 'El robot de automatización solo está disponible en la versión local o mediante el ejecutable de escritorio.'
    }
  }

  const body = await readBody(event)

  console.log('Iniciando automatización con datos:', body)

  try {
    // Importación dinámica para que Nitro no analice ni empaquete el servicio pesadamente
    const { runJuntaAutomation } = await import('../../utils/automation/juntaService')
    const result = await runJuntaAutomation(body)
    return {
      success: true,
      message: 'Automatización completada con éxito.',
      result
    }
  } catch (error) {
    console.error('Error en ejecución Playwright:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
