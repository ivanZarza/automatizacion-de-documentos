<template>
  <div>
    <h1>Certificado de Solidez y Seguridad - Chapas Grecadas Coplanaria</h1>
    <DocumentPage :config="config" :documentComponent="CertificadoChapasGrecadasCoplanaria" />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoChapasGrecadasCoplanaria from '../components/CertificadoChapasGrecadasCoplanaria.vue'
import { certificadoChapasGrecadasCoplanariaConfig } from '../config/documents'

const config = certificadoChapasGrecadasCoplanariaConfig
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
