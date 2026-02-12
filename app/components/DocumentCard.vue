<template>
  <div class="document-card">
    <!-- Card Header - Siempre visible -->
    <div class="card-header" @click="toggleExpanded">
      <div class="header-content">
        <h3 class="card-title">{{ config.title }}</h3>
        <span class="expand-icon" :class="{ expanded: isExpanded }">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
    </div>

    <!-- Card Content - Expandable -->
    <Transition name="expand">
      <div v-if="isExpanded" class="card-content">
        <!-- Description -->
        <p class="card-description">{{ config.description }}</p>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <NuxtLink
            :to="config.route"
            class="btn btn-preview"
            title="Ver previsualización del documento"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Ver</span>
          </NuxtLink>

          <NuxtLink
            :to="`${config.route}?edit=true`"
            class="btn btn-edit"
            title="Editar datos del documento"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Editar</span>
          </NuxtLink>

          <NuxtLink
            to="/formulario-maestro"
            class="btn btn-master"
            title="Ir al formulario maestro"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            <span>Maestro</span>
          </NuxtLink>

          <button
            class="btn btn-pdf"
            title="Generar PDF del documento"
            @click="generatePDF"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span>PDF</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const generatePDF = () => {
  window.location.href = `${props.config.route}?pdf=true`
}
</script>

<style scoped>
.document-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.document-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.card-header:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f94 100%);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
}

.card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  flex: 1;
}

.expand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  color: white;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.card-content {
  padding: 1rem;
  animation: slideDown 0.3s ease-out;
}

.card-description {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 100px;
}

.btn-preview {
  background: #48bb78;
  color: white;
}

.btn-preview:hover {
  background: #38a169;
  transform: translateY(-2px);
}

.btn-edit {
  background: #ed8936;
  color: white;
}

.btn-edit:hover {
  background: #dd6b20;
  transform: translateY(-2px);
}

.btn-master {
  background: #9f7aea;
  color: white;
}

.btn-master:hover {
  background: #805ad5;
  transform: translateY(-2px);
}

.btn-pdf {
  background: #f56565;
  color: white;
}

.btn-pdf:hover {
  background: #e53e3e;
  transform: translateY(-2px);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .btn {
    flex: 1 1 calc(50% - 0.25rem);
  }
}
</style>
