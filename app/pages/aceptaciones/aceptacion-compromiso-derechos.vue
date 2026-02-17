<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionCompromisoDerechos from '../../components/aceptaciones/DeclaracionCompromisoDerechos.vue'
import { declaracionCompromisoDerechosConfig } from '../../config/documents'
</script>

<template>
  <DocumentPage :config="declaracionCompromisoDerechosConfig" :documentComponent="DeclaracionCompromisoDerechos" />
</template>
