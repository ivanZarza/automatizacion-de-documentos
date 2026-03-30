<template>
  <div class="pagina-combinador">
    <div class="header">
      <NuxtLink to="/" class="volver">← Volver</NuxtLink>
      <h1>🔗 Generar PDF Combinado</h1>
      <p class="descripcion">Rellenar documentos y descargar PDF unificado</p>
    </div>

    <DocumentoCompletoCombinado nombrePdfOriginal="11.- Estudio Básico de SYS Nucleo.pdf"
      :nombre="formStore.getField('apellidosNombre')" :direccion="direccionCompleta"
      :referenciaCatastral="formStore.getField('referenciaCatastral')" :dia="formStore.getField('dia')"
      :mes="formStore.getField('mes')" :anio="formStore.getField('anio')"
      :localidad="formStore.getField('localidadEmplazamiento')"
      :provincia="formStore.getField('provinciaEmplazamiento')" :dni="formStore.getField('nifCif')"
      :codigoPostal="formStore.getField('codigoPostalEmplazamiento')"
      :presupuesto="formStore.getField('presupuestoTotal')"
      :potencia="formStore.getField('e2_potenciaNominalInversores')"
      :potenciaModulos="formStore.getField('e2_potenciaPicoGenerador')" :numero="formStore.getField('numero')"
      :ciudad="formStore.getField('localidadEmplazamiento')" />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useFormStore } from '../stores/formStore';
import DocumentoCompletoCombinado from '../components/DocumentoCompletoCombinado.vue';

const formStore = useFormStore();

const direccionCompleta = computed(() => {
  const calle = formStore.getField('emplazamientoCalle') || '';
  const numero = formStore.getField('numero') ? ` ${formStore.getField('numero')}` : '';
  const bloque = formStore.getField('bloque') ? ` Bloque ${formStore.getField('bloque')}` : '';
  const escalera = formStore.getField('escalera') ? ` Escalera ${formStore.getField('escalera')}` : '';
  const planta = formStore.getField('planta') ? ` Planta ${formStore.getField('planta')}` : '';
  const puerta = formStore.getField('puerta') ? ` Puerta ${formStore.getField('puerta')}` : '';

  return `${calle}${numero}${bloque}${escalera}${planta}${puerta}`.trim();
});

// Cargar datos al montar el componente
onMounted(() => {
  formStore.loadFromLocalStorage();
});

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
