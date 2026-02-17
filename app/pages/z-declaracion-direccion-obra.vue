
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ZDeclaracionDireccionObra from '../components/ZDeclaracionDireccionObra.vue'
import { zDeclaracionDireccionObraConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="zDeclaracionDireccionObraConfig" :documentComponent="ZDeclaracionDireccionObra" />
</template>
