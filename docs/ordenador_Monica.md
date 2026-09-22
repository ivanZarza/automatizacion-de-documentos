# 🛡️ Guía de Reanudación y Manejo de Errores (Ordenador Mónica)

Este documento detalla cómo está preparada la automatización (`registroService.js`) para no perder el progreso si ocurre un error en el portal de la Junta de Andalucía (por ejemplo, si la web va lenta y el robot no encuentra un botón, o falla una subida).

## 🛑 El Problema Original
En un bloque `try...catch` general, si el robot falla en el paso 3 (por ejemplo), lanza un error general. Aunque el robot ejecute `await page.pause()` para dejar la ventana abierta y que puedas ver qué ha pasado, al darle al botón **Resume (▶️)** en el Inspector de Playwright, el script termina y devuelve un estado de error, obligando a empezar desde el principio.

## 🟢 La Solución (Cómo Continuar la Automatización)

Como Playwright se ejecuta de forma visible (`headless: false`), permite la intervención humana. Para poder solucionar un problema en vivo y que el robot siga trabajando sin reiniciar, la estrategia es utilizar **bloques `try...catch` locales** junto con `await page.pause()`.

### Flujo de Actuación:

1. **Fallo Detectado:** El robot intenta hacer una acción (ej. subir el Anexo 3) y falla porque el portal tardó demasiado.
2. **Pausa Automática:** El código captura el error en su `catch` local y ejecuta `await page.pause()`.
3. **Intervención Humana:** 
   - El robot se detiene, y se abre el **Playwright Inspector**.
   - Vas al navegador abierto de Chrome, solucionas el problema manualmente (ej. subes el Anexo 3 a mano o marcas la casilla que faltaba).
4. **Reanudar (Resume):** 
   - Vuelves a la ventana del **Playwright Inspector**.
   - Pulsas el botón de **Resume (▶️)** (o Play).
5. **Continuación:** Como el error fue capturado y pausado localmente, al reanudar, el script salta a la siguiente línea de código y **continúa la automatización** con el Anexo 4, terminando el proceso completo con éxito.

## 🛠️ Ejemplo de Implementación en Código

Para aplicar esto en `registroService.js`, en lugar de dejar que los errores suban al `catch` general, se envuelven los pasos críticos.

```javascript
try {
  // Intentamos hacer clic en el botón de guardar
  await page.getByRole('img', { name: 'Guardar' }).click({ timeout: 5000 });
} catch (error) {
  console.log('⚠️ [AVISO] Falló el guardado. El robot se ha pausado.');
  console.log('👉 Haz clic en Guardar manualmente en el navegador y luego pulsa "Resume" en Playwright.');
  
  // Pausamos el robot para que el humano intervenga
  await page.pause();
  
  // Una vez el humano pulsa Resume, el script continúa hacia abajo
}

// El script sigue por aquí sin haberse cerrado...
```

Esta misma técnica se puede aplicar en funciones clave como la subida de anexos o la transición entre pestañas, garantizando un flujo híbrido a prueba de fallos de conexión de la administración.
