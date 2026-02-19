
<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import JustificacionPagoSubvencion from '../../components/justificaciones/JustificacionPagoSubvencion.vue'
import { justificacionPagoSubvencionConfigL3 } from '../../config/justificacionPagoSubvencionConfigL3'
</script>

<template>
  <DocumentPage :config="justificacionPagoSubvencionConfigL3" :documentComponent="JustificacionPagoSubvencion" />
</template>
