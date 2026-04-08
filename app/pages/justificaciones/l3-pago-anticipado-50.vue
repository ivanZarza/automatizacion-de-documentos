<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import { l3PagoAnticipado50Config } from '../../config/justificaciones/L3PagoAnticipado50Config'
import L3PagoAnticipado50 from '../../components/justificaciones/L3PagoAnticipado50.vue'
</script>

<template>
  <DocumentPage :config="l3PagoAnticipado50Config" :documentComponent="L3PagoAnticipado50" />
</template>
