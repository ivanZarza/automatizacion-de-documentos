<template>
  <DocumentPage :config="config" :component="DeclaracionNoGeneracionRcds" :initialData="form" />
</template>

<script setup>
import { ref, computed } from 'vue'
import DocumentPage from '../components/DocumentPage.vue'
import DeclaracionNoGeneracionRcds from '../components/DeclaracionNoGeneracionRcds.vue'
import { declaracionNoGeneracionRcdsConfig } from '../config/documents'

const config = declaracionNoGeneracionRcdsConfig

const form = ref({
  direccion: '',
  numero: '',
  otrosDatos: '',
  codigoPostal: '',
  referenciaCatastral: '',
  municipio: '',
  ciudadFirma: '',
  fecha: ''
})
</script>
