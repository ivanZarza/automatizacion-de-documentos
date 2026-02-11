<template>
  <div>
    <h1>Certificado de Solidez y Seguridad de la Cubierta - Pérgola Aporticada</h1>
    <DocumentPage
      :config="config"
      :documentComponent="CertificadoPergolaAporticada"
    />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoPergolaAporticada from '../components/CertificadoPergolaAporticada.vue'
import { certificadoPergolaAporticadaConfig } from '../config/documents'

const config = certificadoPergolaAporticadaConfig
</script>

<style scoped>
@media print {
  h1 { display: none }
}
</style>
