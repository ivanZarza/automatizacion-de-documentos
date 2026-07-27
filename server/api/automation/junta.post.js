export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('[API] 🚀 Petición de Automatización Junta recibida. Lanzando robot en segundo plano...')

  import('../../utils/automation/juntaService.js')
    .then(({ runJuntaAutomation }) => {
      runJuntaAutomation(body).catch(err => {
        console.error('[API] ❌ Error en ejecución Playwright para Junta:', err)
      })
    })
    .catch(err => {
      console.error('[API] ❌ Error importando juntaService:', err)
    })

  return {
    success: true,
    message: 'Automatización de la Junta lanzada en el servidor.'
  }
})
