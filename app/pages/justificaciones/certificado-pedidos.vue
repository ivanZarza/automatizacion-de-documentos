<template>
  <DocumentPage 
    :config="certificadoPedidosConfig"
    :document-component="CertificadoPedidos"
  />
</template>

<script setup>
import { certificadoPedidosConfig } from '../../config/justificaciones/certificadoPedidosConfig'
import CertificadoPedidos from '../../components/justificaciones/CertificadoPedidos.vue'
import DocumentPage from '../../components/DocumentPage.vue'

definePageMeta({
  layout: 'default'
})
</script>
