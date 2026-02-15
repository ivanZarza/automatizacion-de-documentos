<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ZCertificadoBR from '../components/ZCertificadoBR.vue'
import { zCertificadoBRConfig } from '../config/documents'

const config = zCertificadoBRConfig
</script>

<template>
  <DocumentPage :config="config" :documentComponent="ZCertificadoBR" />
</template>
