
<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import L4PagoAnticipado100 from '../../components/justificaciones/L4PagoAnticipado100.vue'
import { l4PagoAnticipado100Config } from '../../config/justificaciones/L4PagoAnticipado100Config'
</script>

<template>
  <DocumentPage :config="l4PagoAnticipado100Config" :documentComponent="L4PagoAnticipado100" />
</template>

