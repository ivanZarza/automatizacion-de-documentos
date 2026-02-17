
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoAdecuacion from '../components/CertificadoAdecuacion.vue'
import { certificadoAdecuacionConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="certificadoAdecuacionConfig"
    :documentComponent="CertificadoAdecuacion"
  />
</template>
