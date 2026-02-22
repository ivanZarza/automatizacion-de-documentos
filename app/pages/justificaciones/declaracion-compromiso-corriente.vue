<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import DeclaracionCompromisoCorriente from '../../components/justificaciones/DeclaracionCompromisoCorriente.vue'
import { declaracionCompromisoCorrienteConfig } from '../../config/justificaciones/declaracionCompromisoCorrienteConfig'
</script>

<template>
  <DocumentPage :config="declaracionCompromisoCorrienteConfig" :documentComponent="DeclaracionCompromisoCorriente" />
</template>
