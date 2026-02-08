<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoCubiertaPlanAaporticada from '../components/CertificadoCubiertaPlanAaporticada.vue'
import { certificadoCubiertaPlanAaporticadaConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="certificadoCubiertaPlanAaporticadaConfig"
    :documentComponent="CertificadoCubiertaPlanAaporticada"
  />
</template>
