<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaTecnicaConfig } from '../config/documents'
</script>

<template>
  <div>
    <h1>Memoria Técnica de Instalación Autoconsumo Monofásica con Batería</h1>
    <DocumentPage 
      :config="memoriaTecnicaConfig"
      :documentComponent="MemoriaTecnica"
    />
  </div>
</template>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>