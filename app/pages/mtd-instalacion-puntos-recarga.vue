<template>
  <div>
    <h1>Memoria Técnica de Instalación de Puntos de Recarga para Vehículos Eléctricos</h1>
    <DocumentPage 
      :config="config" 
      :documentComponent="MemoriaTecnicaPuntoRecarga"
    />
  </div>
</template>

<script setup>
import { memoriaTecnicaPuntoRecargaConfig } from '../app/config/documents.js'
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnicaPuntoRecarga from '../components/MemoriaTecnicaPuntoRecarga.vue'

const config = memoriaTecnicaPuntoRecargaConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
