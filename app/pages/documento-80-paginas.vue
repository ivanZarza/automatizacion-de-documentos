<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import Documento80Paginas from '../components/Documento80Paginas.vue'
import { documento80PaginasConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="documento80PaginasConfig"
    :documentComponent="Documento80Paginas"
  />
</template>
