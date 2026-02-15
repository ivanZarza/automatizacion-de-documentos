<template>
  <DocumentPage
    :config="autorizacionComunicacionConfig"
    :documentComponent="AutorizacionComunicacion"
  />
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import AutorizacionComunicacion from '../components/AutorizacionComunicacion.vue'
import { autorizacionComunicacionConfig } from '../config/documents.js'
</script>

<style scoped>
/* Estilos específicos de la página si es necesario */
</style>
