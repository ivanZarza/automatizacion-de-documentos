<template>
  <DocumentPage>
    <ZCertificadoDOACFV
      titular="Nombre del titular"
      nifTitular="12345678A"
      localizacion="Dirección del proyecto"
      cp="41000"
      localidad="Sevilla"
      provincia="Sevilla"
      fecha="17 de febrero de 2026"
      potencia="12kW"
      tipoEstablecimiento="cubierta tipo de establecimiento"
    />
  </DocumentPage>
</template>

<script setup>
import DocumentPage from '@/components/DocumentPage.vue'
import ZCertificadoDOACFV from '@/components/ZCertificadoDOACFV.vue'
</script>
