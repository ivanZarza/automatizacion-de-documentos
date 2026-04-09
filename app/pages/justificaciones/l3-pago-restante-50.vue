<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import L3PagoRestante50 from '../../components/justificaciones/L3PagoRestante50.vue'
import { l3PagoRestante50Config } from '../../config/justificaciones/L3PagoRestante50Config'
</script>

<template>
  <DocumentPage :config="l3PagoRestante50Config" :documentComponent="L3PagoRestante50" />
</template>
