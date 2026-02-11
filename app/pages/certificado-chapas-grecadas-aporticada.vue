<template>
  <div>
    <h1>Certificado de Solidez y Seguridad - Chapas Grecadas Aporticada</h1>
    <DocumentPage 
      :config="config" 
      :documentComponent="CertificadoChapasGrecadasAporticada"
    />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoChapasGrecadasAporticada from '../components/CertificadoChapasGrecadasAporticada.vue'
import { certificadoChapasGrecadasAporticadaConfig } from '../config/documents'

const config = certificadoChapasGrecadasAporticadaConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
