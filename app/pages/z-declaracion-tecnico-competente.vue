<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ZDeclaracionTecnicoCompetente from '../components/ZDeclaracionTecnicoCompetente.vue'
import { zDeclaracionTecnicoCompetenteConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="zDeclaracionTecnicoCompetenteConfig" :documentComponent="ZDeclaracionTecnicoCompetente" />
</template>
