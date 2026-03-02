<template>
  <NuxtPage />
</template>
<script setup>
import { onMounted } from 'vue'

// Limpiar localStorage de datos inconsistentes al cargar la aplicación
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Definir cuáles son los campos esperados para cada tipo
    const expectedFields = {
      inversores: ['marca', 'modelo', 'potencia', 'vccMaxima', 'vccMinima', 'conexion'],
      generadores: ['marca', 'modelo', 'potencia', 'especificacion'],
      baterias: ['marcaModelo', 'tipoBateria', 'tensionNominal', 'profundidadDescarga', 'tensionMaxima', 'tensionMinima', 'energiaTotal', 'potenciaMaximaSalida'],
      modulos: ['marca', 'potenciaPicoModulo', 'potenciaPicoGenerador', 'intensidadIpmp', 'tensionVpmp', 'orientacion', 'inclinacion', 'totalModulos', 'modulosEnSerie', 'ramasEnParalelo', 'disposicionModulos']
    }

    // Revisar cada tipo de equipo
    Object.entries(expectedFields).forEach(([tipo, campos]) => {
      const storageKey = `equipos_${tipo}`
      const datosGuardados = localStorage.getItem(storageKey)
      
      if (datosGuardados) {
        try {
          const parsed = JSON.parse(datosGuardados)
          
          // Si hay datos, verificar que coinciden con la estructura esperada
          if (Array.isArray(parsed) && parsed.length > 0) {
            const primerItem = parsed[0]
            // Verificar que tiene al menos el primer campo esperado
            if (!campos.some(campo => primerItem.hasOwnProperty(campo))) {
              console.log(`🧹 [${tipo}] Limpiando localStorage con datos inconsistentes`)
              localStorage.removeItem(storageKey)
            }
          }
        } catch (e) {
          console.warn(`⚠️ Error al revisar ${tipo}:`, e)
          localStorage.removeItem(storageKey)
        }
      }
    })
  }
})
</script>