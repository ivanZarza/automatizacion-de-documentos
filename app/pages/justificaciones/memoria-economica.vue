<template>
  <DocumentPage 
    :config="memoriaEconomicaConfig"
    :document-component="MemoriaEconomica"
  />
</template>

<script setup>
import { memoriaEconomicaConfig } from '../../config/justificaciones/memoriaEconomicaConfig'
import MemoriaEconomica from '../../components/justificaciones/MemoriaEconomica.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
