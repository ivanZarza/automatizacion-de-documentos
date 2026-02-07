<template>
  <div>
    <h1>Memoria Técnica de Instalación Autoconsumo Sin Batería</h1>
    <DocumentPage 
    :config="config" 
    :documentComponent="MemoriaTecnica"
    />
  </div>
</template>

<script setup>
import { memoriaTecnicaAutoconsumoSinBateriaConfig } from '../app/config/documents.js'
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'

const config = memoriaTecnicaAutoconsumoSinBateriaConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
