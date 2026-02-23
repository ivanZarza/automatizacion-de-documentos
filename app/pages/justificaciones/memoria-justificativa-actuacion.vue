<template>
  <DocumentPage 
    :config="memoriaJustificativaActuacionConfig"
    :document-component="MemoriaJustificativaActuacion"
  />
</template>

<script setup>
import { memoriaJustificativaActuacionConfig } from '../../config/justificaciones/memoriaJustificativaActuacionConfig'
import MemoriaJustificativaActuacion from '../../components/justificaciones/MemoriaJustificativaActuacion.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
