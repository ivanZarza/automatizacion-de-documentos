<template>
  <div class="pagina-combinador">
    <div class="header">
      <NuxtLink to="/" class="volver">← Volver</NuxtLink>
      <h1>🔗 Generar PDF Combinado</h1>
      <p class="descripcion">Rellenar documentos y descargar PDF unificado</p>
    </div>

    <DocumentoCompletoCombinado 
      nombrePdfOriginal="11.- Estudio Básico de SYS Nucleo.pdf"
    />
  </div>
</template>

<script setup>
import DocumentoCompletoCombinado from '../components/DocumentoCompletoCombinado.vue';

definePageMeta({
  layout: 'default'
});
</script>

<style scoped>
.pagina-combinador {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

.volver {
  display: inline-block;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.volver:hover {
  color: #0052a3;
  text-decoration: underline;
}

.header h1 {
  margin: 0.5rem 0 0 0;
  font-size: 2rem;
  color: #333;
}

.descripcion {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .pagina-combinador {
    padding: 1rem 0.5rem;
  }

  .header h1 {
    font-size: 1.5rem;
  }
}
</style>
