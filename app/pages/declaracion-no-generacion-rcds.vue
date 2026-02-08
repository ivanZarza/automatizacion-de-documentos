<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import DeclaracionNoGeneracionRcds from '../components/DeclaracionNoGeneracionRcds.vue'
import { declaracionNoGeneracionRcdsConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="declaracionNoGeneracionRcdsConfig"
    :documentComponent="DeclaracionNoGeneracionRcds"
  />
</template>
