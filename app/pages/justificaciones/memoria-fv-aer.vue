<template>
  <DocumentPage 
    :config="memoriaFvAerConfig"
    :document-component="MemoriaFvAer"
  />
</template>

<script setup>
import { memoriaFvAerConfig } from '../../config/justificaciones/memoriaFvAerConfig'
import MemoriaFvAer from '../../components/justificaciones/MemoriaFvAer.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
