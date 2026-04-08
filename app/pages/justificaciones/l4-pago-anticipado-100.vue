
<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import JustificacionPagoSubvencionL4 from '../../components/justificaciones/JustificacionPagoSubvencionL4.vue'
import { justificacionPagoSubvencionConfigL4 } from '../../config/justificaciones/justificacionPagoSubvencionConfigL4'
</script>

<template>
  <DocumentPage :config="justificacionPagoSubvencionConfigL4" :documentComponent="JustificacionPagoSubvencionL4" />
</template>

