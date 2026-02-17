<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionCesionTratamiento from '../../components/aceptaciones/DeclaracionCesionTratamiento.vue'
import { declaracionCesionTratamientoConfig } from '../../config/documents'
</script>

<template>
  <DocumentPage :config="declaracionCesionTratamientoConfig" :documentComponent="DeclaracionCesionTratamiento" />
</template>
