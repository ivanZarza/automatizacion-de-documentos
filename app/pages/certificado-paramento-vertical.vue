<template>
  <div>
    <h1>Certificado de Solidez y Seguridad de la Cubierta - Paramento Vertical</h1>
    <DocumentPage 
      :config="config"
      :documentComponent="CertificadoParamentoVertical"
    />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoParamentoVertical from '../components/CertificadoParamentoVertical.vue'
import { certificadoParamentoVerticalConfig } from '../config/documents'

const config = certificadoParamentoVerticalConfig
</script>

<style scoped>
@media print {
  h1 { display: none; }
}
</style>
