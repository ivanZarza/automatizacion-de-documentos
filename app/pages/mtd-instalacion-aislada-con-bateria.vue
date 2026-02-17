<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaInstalacionAisladaConBateriaConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="memoriaInstalacionAisladaConBateriaConfig"
    :documentComponent="MemoriaTecnica"
  />
</template>
