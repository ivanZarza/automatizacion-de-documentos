<template>
  <section class="section-card" :class="{ 'section-card-empty': isEmpty }">
    <!-- Section Header -->
    <div class="section-header" @click="toggleSection">
      <div class="section-title-wrapper">
        <h2 class="section-title">{{ title }}</h2>
      </div>
      <div v-if="count !== null && count !== undefined" class="section-count">
        {{ count }}
      </div>
      <div class="section-toggle" :class="{ expanded: isExpanded }">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Section Content -->
    <Transition name="expand">
      <div v-if="isExpanded" class="section-content">
        <slot />
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: true
  },
  count: {
    type: Number,
    default: 0
  },
  isEmpty: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const toggleSection = () => {
  emit('toggle')
}
</script>

<style scoped>
.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.section-header:hover {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.section-title-wrapper {
  flex: 1;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.section-count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.95rem;
  flex-shrink: 0;
  min-width: 44px;
  text-align: center;
}

.section-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: white;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.section-toggle.expanded {
  transform: rotate(180deg);
}

.section-content {
  padding: 24px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}

@media (max-width: 768px) {
  .section-header {
    padding: 16px;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .section-content {
    padding: 16px;
  }
}
</style>
