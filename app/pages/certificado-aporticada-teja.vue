<template>
  <div>
    <h1>Certificado de Solidez y Seguridad - Aporticada Teja</h1>
    <DocumentPage 
      :config="config" 
      :documentComponent="CertificadoAporticadaTeja"
    />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoAporticadaTeja from '../components/CertificadoAporticadaTeja.vue'
import { certificadoAporticadaTejConfig } from '../config/documents'

const config = certificadoAporticadaTejConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
