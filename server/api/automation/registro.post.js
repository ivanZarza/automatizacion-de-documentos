import { runRegistroAutomation } from '../../utils/automation/registroService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('Iniciando automatización de REGISTRO CEE con datos:', body)

  try {
    const result = await runRegistroAutomation(body)
    return {
      success: true,
      message: 'Registro CEE completado con éxito.',
      result
    }
  } catch (error) {
    console.error('Error en ejecución Playwright para Registro CEE:', error)
    return {
      success: false,
      error: error.message
    }
  }
})
