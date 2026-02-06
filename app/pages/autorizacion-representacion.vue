<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import AutorizacionRepresentacion from '../components/AutorizacionRepresentacion.vue'
import { autorizacionRepresentacionConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="autorizacionRepresentacionConfig"
    :documentComponent="AutorizacionRepresentacion"
  />
</template>
