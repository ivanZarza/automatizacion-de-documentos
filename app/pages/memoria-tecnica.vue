<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaTecnicaConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="memoriaTecnicaConfig"
    :documentComponent="MemoriaTecnica"
  />
</template>
