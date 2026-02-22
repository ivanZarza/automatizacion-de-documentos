<template>
  <DocumentPage 
    :config="obraMassolConfig"
    :document-component="ObraMassol"
  />
</template>

<script setup>
import { obraMassolConfig } from '../../config/justificaciones/obraMassolConfig'
import ObraMassol from '../../components/justificaciones/ObraMassol.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
