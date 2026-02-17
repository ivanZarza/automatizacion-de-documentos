<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import AnexoCCompromisoTransversales from '../../components/aceptaciones/AnexoCCompromisoTransversales.vue'
import { anexoCCompromisoTransversalesConfig } from '../../config/documents'
</script>

<template>
  <DocumentPage :config="anexoCCompromisoTransversalesConfig" :documentComponent="AnexoCCompromisoTransversales" />
</template>
