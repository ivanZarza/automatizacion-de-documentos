<template>
  <DocumentPage 
    :config="memoriaTecnicaPuntoRecargaConfig"
    :component="MemoriaTecnica"
  />
</template>

<script setup>
import DocumentPage from '~/components/DocumentPage.vue'
import MemoriaTecnica from '~/components/MemoriaTecnica.vue'
import { memoriaTecnicaPuntoRecargaConfig } from '~/config/documents'
</script>
