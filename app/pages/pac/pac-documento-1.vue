<script setup>
import DocumentPage from '../../components/DocumentPage.vue'
import PacDocument1 from '../../components/pac/PacDocument1.vue'
import { pacConfig1 } from '../../config/pac/pacConfig1'
</script>

<template>
  <DocumentPage :config="pacConfig1" :documentComponent="PacDocument1" />
</template>
