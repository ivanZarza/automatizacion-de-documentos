export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('Iniciando automatización Junta con datos:', body)

  try {
    const { runJuntaAutomation } = await import('../utils/automation/juntaService.js')
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
