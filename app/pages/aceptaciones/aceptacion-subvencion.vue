<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import AceptacionSubvencion from '../../components/aceptaciones/AceptacionSubvencion.vue'
import { aceptacionSubvencionConfig } from '../../config/documents'
</script>

<template>
  <DocumentPage :config="aceptacionSubvencionConfig" :documentComponent="AceptacionSubvencion" />
</template>
