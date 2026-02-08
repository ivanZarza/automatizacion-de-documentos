<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaInstalacionAisladaConBateriaConfig } from '../config/documents'
</script>

<template>
  <h1>Memoria Técnica de Instalación Aislada con Batería</h1>
  <DocumentPage 
    :config="memoriaInstalacionAisladaConBateriaConfig"
    :documentComponent="MemoriaTecnica"
  />
</template>
