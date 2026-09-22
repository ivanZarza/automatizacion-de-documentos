export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('[API] 🚀 Petición de REGISTRO CEE recibida. Lanzando robot en segundo plano...')

  // Ejecutamos la automatización de forma asíncrona para responder de inmediato y evitar timeouts de HTTP
  import('../utils/automation/registroService.js')
    .then(({ runRegistroAutomation }) => {
      runRegistroAutomation(body).catch(err => {
        console.error('[API] ❌ Error en ejecución Playwright para Registro CEE:', err)
      })
    })
    .catch(err => {
      console.error('[API] ❌ Error importando registroService:', err)
    })

  return {
    success: true,
    message: 'Automatización de Registro CEE lanzada en el servidor.'
  }
})
