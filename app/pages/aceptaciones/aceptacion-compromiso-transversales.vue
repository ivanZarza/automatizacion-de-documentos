<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionCompromisoTransversales from '../../components/aceptaciones/DeclaracionCompromisoTransversales.vue'
import { declaracionCompromisoTransversalesConfig } from '../../config/documents.js'
</script>

<template>
  <DocumentPage :config="declaracionCompromisoTransversalesConfig" :documentComponent="DeclaracionCompromisoTransversales" />
</template>
