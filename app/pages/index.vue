<script setup>
import { ref, computed } from 'vue'
import { getAllDocuments } from '../config/documents'
import SectionCard from '../components/SectionCard.vue'
import DocumentCard from '../components/DocumentCard.vue'



const isFormularioExpanded = ref(true)
const isProyectoExpanded = ref(true)
const isLegalizacionExpanded = ref(true)

const allDocuments = getAllDocuments()

const documentosProyecto = computed(() =>
  allDocuments.filter(doc => doc.category === 'proyecto')
)

const documentosLegalizacion = computed(() =>
  allDocuments.filter(doc => doc.category === 'legalizacion')
)
</script>

<template>
  <div class="pagina-principal">
    <!-- SECCIÓN FORMULARIO MAESTRO -->
    <SectionCard
      title="🚀 Formulario Maestro"
      :isExpanded="isFormularioExpanded"
      @toggle="isFormularioExpanded = !isFormularioExpanded"
      :count="0"
      isEmpty
    >
      <div class="formulario-maestro-content">
        <p class="descripcion-maestro">
          Completa una sola vez todos los datos técnicos y luego selecciona el documento a generar.
        </p>
        <NuxtLink to="/formulario-maestro" class="boton-maestro">
          Ir al Formulario Maestro →
        </NuxtLink>
      </div>
    </SectionCard>

    <!-- SECCIÓN DOCUMENTOS DE PROYECTO -->
    <SectionCard
      title="📁 Documentos de Proyecto"
      :isExpanded="isProyectoExpanded"
      @toggle="isProyectoExpanded = !isProyectoExpanded"
      :count="documentosProyecto.length"
    >
      <div class="documentos-grid">
        <DocumentCard
          v-for="documento in documentosProyecto"
          :key="documento.id"
          :config="documento"
        />
      </div>
    </SectionCard>

    <!-- SECCIÓN DOCUMENTOS DE LEGALIZACIÓN -->
    <SectionCard
      title="📋 Documentos de Legalización"
      :isExpanded="isLegalizacionExpanded"
      @toggle="isLegalizacionExpanded = !isLegalizacionExpanded"
      :count="documentosLegalizacion.length"
      :isEmpty="documentosLegalizacion.length === 0"
    >
      <div v-if="documentosLegalizacion.length === 0" class="empty-state">
        <span class="empty-icon">🔜</span>
        <p class="empty-text">Próximamente documentos de legalización</p>
      </div>
      <div v-else class="documentos-grid">
        <DocumentCard
          v-for="documento in documentosLegalizacion"
          :key="documento.id"
          :config="documento"
        />
      </div>
    </SectionCard>
  </div>
</template>

<style scoped>
.pagina-principal {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.formulario-maestro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

.descripcion-maestro {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
}

.boton-maestro {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  cursor: pointer;
}

.boton-maestro:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.documentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.1rem;
  color: #999;
}

@media (max-width: 768px) {
  .documentos-grid {
    grid-template-columns: 1fr;
  }

  .pagina-principal {
    padding: 1rem 0.5rem;
  }
}
</style>
