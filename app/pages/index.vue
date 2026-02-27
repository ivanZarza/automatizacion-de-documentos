<script setup>
import { ref, computed } from 'vue'
import { getAllDocuments } from '../config/documents'
import SectionCard from '../components/SectionCard.vue'
import DocumentCard from '../components/DocumentCard.vue'
import ToolsSection from '../components/ToolsSection.vue'



const isFormularioExpanded = ref(false)
const isProyectoExpanded = ref(false)
const isLegalizacionExpanded = ref(false)
const isAceptacionesExpanded = ref(false)
const isJustificacionesExpanded = ref(false)


const allDocuments = getAllDocuments()

const documentosProyecto = computed(() =>
  allDocuments.filter(doc => doc.category === 'proyecto')
)

const documentosLegalizacion = computed(() =>
  allDocuments.filter(doc => doc.category === 'legalizacion')
)

const documentosAceptaciones = computed(() =>
  allDocuments.filter(doc => doc.category === 'aceptaciones')
)

const documentosJustificaciones = computed(() =>
  allDocuments.filter(doc => doc.category === 'justificaciones')
)
</script>

<template>
  <div class="pagina-principal">
    <!-- SECCIÓN HERRAMIENTAS -->
    <ToolsSection />

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
      :count="documentosProyecto.length + 1"
    >
      <!-- Botón Generar PDF Combinado -->
      <div class="acceso-combinador">
        <NuxtLink to="/generar-pdf-combinado" class="card-combinador">
          <span class="icono">🔗</span>
          <span class="titulo">Generar PDF Combinado</span>
          <span class="descripcion">Crea un PDF con inicio + documento + final</span>
          <span class="flecha">→</span>
        </NuxtLink>
      </div>

      <!-- Tarjetas de documentos -->
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

    <!-- SECCIÓN DOCUMENTOS DE ACEPTACIONES -->
    <SectionCard
      title="✅ Documentos de Aceptaciones"
      :isExpanded="isAceptacionesExpanded"
      @toggle="isAceptacionesExpanded = !isAceptacionesExpanded"
      :count="documentosAceptaciones.length"
      :isEmpty="documentosAceptaciones.length === 0"
    >
      <div v-if="documentosAceptaciones.length === 0" class="empty-state">
        <span class="empty-icon">🔜</span>
        <p class="empty-text">Próximamente documentos de aceptaciones</p>
      </div>
      <div v-else class="documentos-grid">
        <DocumentCard
          v-for="documento in documentosAceptaciones"
          :key="documento.id"
          :config="documento"
        />
      </div>
    </SectionCard>

    <SectionCard
      title="✅ Documentos de Justificaciones"
      :isExpanded="isJustificacionesExpanded"
      @toggle="isJustificacionesExpanded = !isJustificacionesExpanded"
      :count="documentosJustificaciones.length"
      :isEmpty="documentosJustificaciones.length === 0"
    >
      <div v-if="documentosJustificaciones.length === 0" class="empty-state">
        <span class="empty-icon">🔜</span>
        <p class="empty-text">Próximamente documentos de justificaciones</p>
      </div>
      <div v-else class="documentos-grid">
        <DocumentCard
          v-for="documento in documentosJustificaciones"
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

.acceso-combinador {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.card-combinador {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 131, 176, 0.3);
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
}

.card-combinador::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: left 0.3s ease;
}

.card-combinador:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 131, 176, 0.4);
}

.card-combinador:hover::before {
  left: 100%;
}

.card-combinador .icono {
  font-size: 2.5rem;
}

.card-combinador .titulo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.card-combinador .descripcion {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 400;
}

.card-combinador .flecha {
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
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
