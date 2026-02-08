<template>
  <div>
    <h1>Declaración Responsable de Habilitación Profesional</h1>
    <DocumentPage 
      :config="config" 
      :documentComponent="DeclaracionHabilitacionProfesional"
    />
  </div>
</template>

<script setup>
import { declaracionHabilitacionProfesionalConfig } from '../app/config/documents.js'
import DocumentPage from '../components/DocumentPage.vue'
import DeclaracionHabilitacionProfesional from '../components/DeclaracionHabilitacionProfesional.vue'

const config = declaracionHabilitacionProfesionalConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
