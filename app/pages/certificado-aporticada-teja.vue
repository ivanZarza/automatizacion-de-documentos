<template>
  <div>
    <h1>Certificado de Solidez y Seguridad - Aporticada Teja</h1>
    <DocumentPage 
      :config="config" 
      :documentComponent="CertificadoAporticadaTeja"
    />
  </div>
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import CertificadoAporticadaTeja from '../components/CertificadoAporticadaTeja.vue'

const config = {
  id: 'certificado-aporticada-teja',
  title: 'Certificado de Solidez y Seguridad - Aporticada Teja',
  description: 'Certificado de solidez y seguridad de la cubierta para instalación aporticada sobre teja',
  fileName: 'certificado-aporticada-teja.pdf',
  route: '/certificado-aporticada-teja',
  fields: [],
  defaultData: {
    imagen1: '',
    imagen2: '',
    imagen3: ''
  }
}
</script>

<style scoped>
@media print {
  h1 {
    display: none;
  }
}
</style>
