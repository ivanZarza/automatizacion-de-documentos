<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ZCertificadoBR from '../components/ZCertificadoBR.vue'
import { zCertificadoBRConfig } from '../config/documents'

</script>

<template>
  <DocumentPage :config="zCertificadoBRConfig" :documentComponent="ZCertificadoBR" />
</template>
