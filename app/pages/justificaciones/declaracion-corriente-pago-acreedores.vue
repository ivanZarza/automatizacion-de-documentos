<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionCorrientePagoAcreedores from '../../components/justificaciones/DeclaracionCorrientePagoAcreedores.vue'
import { declaracionCorrientePagoAcreedoresConfig } from '../../config/justificaciones/declaracionCorrientePagoAcreedoresConfig'
</script>

<template>
  <DocumentPage :config="declaracionCorrientePagoAcreedoresConfig" :documentComponent="DeclaracionCorrientePagoAcreedores" />
</template>
