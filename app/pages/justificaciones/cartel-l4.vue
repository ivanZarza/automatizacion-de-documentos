<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import CartelL4 from '../../components/justificaciones/CartelL4.vue'
import { cartelL4Config } from '../../config/justificaciones/cartelL4Config'
</script>

<template>
  <DocumentPage :config="cartelL4Config" :documentComponent="CartelL4" />
</template>
