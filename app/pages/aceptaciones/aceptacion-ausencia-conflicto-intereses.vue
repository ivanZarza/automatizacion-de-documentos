<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionAusenciaConflictoIntereses from '../../components/aceptaciones/DeclaracionAusenciaConflictoIntereses.vue'
import { declaracionAusenciaConflictoInteresesConfig } from '../../config/documents'
</script>

<template>
  <DocumentPage :config="declaracionAusenciaConflictoInteresesConfig" :documentComponent="DeclaracionAusenciaConflictoIntereses" />
</template>
