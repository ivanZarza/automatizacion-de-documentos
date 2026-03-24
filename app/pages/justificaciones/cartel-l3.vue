<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import CartelL3 from '../../components/justificaciones/CartelL3.vue'
import { cartelL3Config } from '../../config/justificaciones/cartelL3Config'
</script>

<template>
  <DocumentPage :config="cartelL3Config" :documentComponent="CartelL3" />
</template>
