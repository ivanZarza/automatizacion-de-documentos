<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoCoplanarTeja from '../components/CertificadoCoplanarTeja.vue'
import { certificadoCoplanarTejaConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="certificadoCoplanarTejaConfig"
    :documentComponent="CertificadoCoplanarTeja"
  />
</template>
