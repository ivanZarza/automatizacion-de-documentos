<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">{{ title }}</h2>
      <div class="space-y-3">
        <Boton
          v-for="option in options"
          :key="option.id"
          @click="option.action"
          :class-override="option.colorClass"
          class="w-full"
        >
          <span v-if="option.icon" class="mr-2" v-html="option.icon"></span>
          {{ option.label }}
        </Boton>

        <Boton @click="close" variant="secondary" class="w-full">
          Cancelar
        </Boton>
      </div>
    </div>
  </div>
</template>

<script setup>
import Boton from './Boton.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Opciones del Documento'
  },
  options: {
    type: Array,
    required: true,
    // Formato esperado:
    // {
    //   id: 'preview',
    //   label: 'Previsualizar',
    //   icon: '👁️',
    //   colorClass: 'bg-blue-500 hover:bg-blue-600',
    //   action: () => {}
    // }
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
