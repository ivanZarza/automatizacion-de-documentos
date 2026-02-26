<script setup>
import DocumentPage from '@/components/DocumentPage.vue'
import DocumentoUltimaPagina from '@/components/DocumentoUltimaPagina.vue'
import { documentoUltimaPaginaConfig } from '@/config/documents'
</script>

<template>
  <DocumentPage :config="documentoUltimaPaginaConfig" :documentComponent="DocumentoUltimaPagina" />
</template>
