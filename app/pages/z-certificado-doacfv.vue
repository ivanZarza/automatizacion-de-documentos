<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ZCertificadoDOACFV from '../components/ZCertificadoDOACFV.vue'
import { zCertificadoDOACFVConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="zCertificadoDOACFVConfig" :documentComponent="ZCertificadoDOACFV" />
</template>

