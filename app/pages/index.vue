<script setup>
import { ref, computed } from 'vue'
import { getAllDocuments } from '../config/documents'
import SectionCard from '../components/SectionCard.vue'
import DocumentCard from '../components/DocumentCard.vue'
import ToolsSection from '../components/ToolsSection.vue'

const activeTab = ref('inicio')

const tabs = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyecto', label: 'Proyectos' },
  { id: 'legalizacion', label: 'Legalización' },
  { id: 'aceptaciones', label: 'Aceptaciones' },
  { id: 'justificaciones', label: 'Justificaciones' },
  { id: 'justificacion50', label: 'JUSTIFICACIÓN(50%)' }
]

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

const documentosJustificacion50 = computed(() =>
  allDocuments.filter(doc => doc.category === 'justificacion50')
)
</script>

<template>
  <div class="pagina-principal">
    <!-- NAVEGACIÓN POR PESTAÑAS -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <button v-for="tab in tabs" :key="tab.id" class="tab-button" :class="{ 'active': activeTab === tab.id }"
          @click="activeTab = tab.id">
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- CONTENIDO DE PESTAÑAS -->
    <div class="tab-content">
      <Transition name="fade" mode="out-in">
        <div :key="activeTab">
          <!-- PESTAÑA: INICIO (Herramientas + Formulario Maestro) -->
          <div v-if="activeTab === 'inicio'" class="tab-pane">
            <ToolsSection />

            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">🚀 Formulario Maestro</h3>
              </div>
              <div class="formulario-maestro-content">
                <p class="descripcion-maestro">
                  Completa una sola vez todos los datos técnicos y luego selecciona el documento a generar.
                </p>
                <NuxtLink to="/formulario-maestro" class="boton-maestro">
                  Ir al Formulario Maestro →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- PESTAÑA: PROYECTO -->
          <div v-if="activeTab === 'proyecto'" class="tab-pane">
            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">📁 Documentos de Proyecto</h3>
                <span class="doc-count">{{ documentosProyecto.length + 1 }} documentos</span>
              </div>

              <!-- Botón Generar PDF Combinado -->
              <div class="acceso-combinador">
                <NuxtLink to="/generar-pdf-combinado" class="card-combinador">
                  <span class="icono">🔗</span>
                  <span class="titulo">Generar PDF Combinado</span>
                  <span class="descripcion">Crea un PDF con inicio + documento + final</span>
                  <span class="flecha">→</span>
                </NuxtLink>
              </div>

              <div class="documentos-grid">
                <DocumentCard v-for="documento in documentosProyecto" :key="documento.id" :config="documento" />
              </div>
            </div>
          </div>

          <!-- PESTAÑA: LEGALIZACIÓN -->
          <div v-if="activeTab === 'legalizacion'" class="tab-pane">
            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">📋 Documentos de Legalización</h3>
                <span class="doc-count">{{ documentosLegalizacion.length }} documentos</span>
              </div>

              <div v-if="documentosLegalizacion.length === 0" class="empty-state">
                <span class="empty-icon">🔜</span>
                <p class="empty-text">Próximamente documentos de legalización</p>
              </div>
              <div v-else class="documentos-grid">
                <DocumentCard v-for="documento in documentosLegalizacion" :key="documento.id" :config="documento" />
              </div>
            </div>
          </div>

          <!-- PESTAÑA: ACEPTACIONES -->
          <div v-if="activeTab === 'aceptaciones'" class="tab-pane">
            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">✅ Documentos de Aceptaciones</h3>
                <span class="doc-count">{{ documentosAceptaciones.length }} documentos</span>
              </div>

              <div v-if="documentosAceptaciones.length === 0" class="empty-state">
                <span class="empty-icon">🔜</span>
                <p class="empty-text">Próximamente documentos de aceptaciones</p>
              </div>
              <div v-else class="documentos-grid">
                <DocumentCard v-for="documento in documentosAceptaciones" :key="documento.id" :config="documento" />
              </div>
            </div>
          </div>

          <!-- PESTAÑA: JUSTIFICACIONES -->
          <div v-if="activeTab === 'justificaciones'" class="tab-pane">
            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">⚖️ Documentos de Justificaciones</h3>
                <span class="doc-count">{{ documentosJustificaciones.length }} documentos</span>
              </div>

              <div v-if="documentosJustificaciones.length === 0" class="empty-state">
                <span class="empty-icon">🔜</span>
                <p class="empty-text">Próximamente documentos de justificaciones</p>
              </div>
              <div v-else class="documentos-grid">
                <DocumentCard v-for="documento in documentosJustificaciones" :key="documento.id" :config="documento" />
              </div>
            </div>
          </div>

          <!-- PESTAÑA: JUSTIFICACIÓN(50%) -->
          <div v-if="activeTab === 'justificacion50'" class="tab-pane">
            <div class="section-container">
              <div class="section-header-static">
                <h3 class="section-title">📉 JUSTIFICACIÓN (50%)</h3>
                <span class="doc-count">{{ documentosJustificacion50.length }} documentos</span>
              </div>

              <div v-if="documentosJustificacion50.length === 0" class="empty-state">
                <span class="empty-icon">🔜</span>
                <p class="empty-text">No hay documentos en esta categoría</p>
              </div>
              <div v-else class="documentos-grid">
                <DocumentCard v-for="documento in documentosJustificacion50" :key="documento.id" :config="documento" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.pagina-principal {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* TABS STYLING */
.tabs-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.tabs-wrapper {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 5px;
  scrollbar-width: thin;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  color: #6b7280;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.tab-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.tab-button.active {
  background: white;
  border-color: #e5e7eb;
  color: #4f46e5;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.tab-icon {
  font-size: 1.25rem;
}

/* SECTION CONTAINER STYLING */
.section-container {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-header-static {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.doc-count {
  font-size: 0.875rem;
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
}

.formulario-maestro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
}

.descripcion-maestro {
  font-size: 1.1rem;
  color: #4b5563;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
}

.boton-maestro {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  cursor: pointer;
}

.boton-maestro:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
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
  padding: 2.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
  width: 100%;
  max-width: 600px;
}

.card-combinador:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 30px -10px rgba(37, 99, 235, 0.4);
}

.card-combinador .icono {
  font-size: 3rem;
}

.card-combinador .titulo {
  font-size: 1.5rem;
  font-weight: 800;
}

.card-combinador .descripcion {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 400;
}

.documentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.25rem;
  color: #9ca3af;
}

/* ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .documentos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
