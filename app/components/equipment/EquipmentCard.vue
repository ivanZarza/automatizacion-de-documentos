<template>
  <div class="equipment-card" :class="{ 'en-edicion': enEdicion }">
    <!-- Encabezado -->
    <div class="card-header">
      <div class="card-title">
        <strong>{{ equipo.marca }} {{ equipo.modelo }}</strong>
        <span class="badge" v-if="equipo.potencia">{{ equipo.potencia }} kW</span>
      </div>
      <div class="card-date">
        {{ formatoFecha(equipo.fechaCreacion) }}
      </div>
    </div>

    <!-- Detalles -->
    <div v-if="!enEdicion" class="card-details">
      <div class="detail-row" v-for="field in campos" :key="field.name">
        <span class="label">{{ field.label }}:</span>
        <span class="value">{{ equipo[field.name] || '—' }}</span>
      </div>
    </div>

    <!-- Botones de acciones -->
    <div class="card-actions">
      <slot name="acciones" :equipo="equipo">
        <!-- Los botones se pasarán con slot -->
      </slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  equipo: {
    type: Object,
    required: true
  },
  campos: {
    type: Array,
    required: true
  },
  enEdicion: {
    type: Boolean,
    default: false
  }
})

const formatoFecha = (fecha) => {
  if (!fecha) return '—'
  const d = new Date(fecha)
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
.equipment-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.equipment-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #0066cc;
}

.equipment-card.en-edicion {
  background: #f9f9f9;
  border: 2px solid #0066cc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-title strong {
  font-size: 1.1rem;
  color: #333;
}

.badge {
  background: #e3f2fd;
  color: #0066cc;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-date {
  font-size: 0.85rem;
  color: #999;
}

.card-details {
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.95rem;
}

.detail-row .label {
  font-weight: 600;
  color: #666;
}

.detail-row .value {
  color: #333;
  word-break: break-word;
  text-align: right;
  flex: 1;
  margin-left: 1rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .equipment-card {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .detail-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-row .value {
    text-align: left;
    margin-left: 0;
  }
}
</style>
