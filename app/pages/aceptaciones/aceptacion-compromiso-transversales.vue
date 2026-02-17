<template>
  <DocumentPage :documentComponent="DeclaracionCompromisoTransversales" :documentConfig="declaracionCompromisoTransversalesConfig" />
</template>

<script setup>
import DeclaracionCompromisoTransversales from "~/app/components/aceptaciones/DeclaracionCompromisoTransversales.vue";
import { declaracionCompromisoTransversalesConfig } from "~/app/config/documents.js";
</script>
