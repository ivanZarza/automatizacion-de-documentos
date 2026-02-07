<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaTecnicaConfig } from '../config/documents'
</script>

<template>
  <h1>Memoria Técnica de Instalación Autoconsumo Monofásica con Batería</h1>
  <DocumentPage 
    :config="memoriaTecnicaConfig"
    :documentComponent="MemoriaTecnica"
  />
</template>
