<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import PacDocument2 from '../../components/pac/PacDocument2.vue'
import { pacConfig2 } from '../../config/pac/pacConfig2'
</script>

<template>
  <DocumentPage :config="pacConfig2" :documentComponent="PacDocument2" />
</template>
