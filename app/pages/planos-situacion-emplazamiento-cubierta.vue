<template>
  <div>
    <h1>Planos de Situación, Emplazamiento y Cubierta</h1>
    <DocumentPage :config="config" 
    :documentComponent="PlanosSituacionEmplazamientoCubierta"
    />
  </div>
</template>

<script setup>
import { planosPlanosSituacionEmplazamientoCubiertaConfig } from '../app/config/documents.js'
import DocumentPage from '../components/DocumentPage.vue'
import PlanosSituacionEmplazamientoCubierta from '../components/PlanosSituacionEmplazamientoCubierta.vue'

const config = planosPlanosSituacionEmplazamientoCubiertaConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
