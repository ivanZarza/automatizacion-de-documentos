<template>
  <DocumentPage 
    :config="certificadoPedidosContratosConfig"
    :document-component="CertificadoPedidosContratos"
  />
</template>

<script setup>
import { certificadoPedidosContratosConfig } from '../../config/justificaciones/certificadoPedidosContratosConfig'
import CertificadoPedidosContratos from '../../components/justificaciones/CertificadoPedidosContratos.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
