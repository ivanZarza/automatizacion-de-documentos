
<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import JustificacionPagoSubvencionL3 from '../../components/justificaciones/JustificacionPagoSubvencionL3.vue'
import { justificacionPagoSubvencionConfigL3 } from '../../config/justificaciones/justificacionPagoSubvencionConfigL3'
</script>

<template>
  <DocumentPage :config="justificacionPagoSubvencionConfigL3" :documentComponent="JustificacionPagoSubvencionL3" />
</template>
