<template>
  <button
    :type="type"
    :class="[classes, $attrs.class]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="mr-2" v-html="icon"></span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  fullWidth: { type: Boolean, default: false },
  rounded: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  classOverride: { type: String, default: '' }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const classes = computed(() => {
  const base = 'font-bold py-2 px-4 transition inline-flex items-center justify-center'
  const w = props.fullWidth ? 'w-full' : 'inline-flex'
  const r = props.rounded ? 'rounded-lg' : ''
  let variantClasses = ''

  switch (props.variant) {
    case 'primary':
      variantClasses = 'bg-blue-600 hover:bg-blue-700 text-white'
      break
    case 'secondary':
      variantClasses = 'bg-gray-600 hover:bg-gray-700 text-white'
      break
    case 'success':
      variantClasses = 'bg-green-600 hover:bg-green-700 text-white'
      break
    case 'danger':
      variantClasses = 'bg-red-600 hover:bg-red-700 text-white'
      break
    case 'ghost':
      variantClasses = 'bg-transparent text-gray-800'
      break
    default:
      variantClasses = ''
  }

  return [w, base, r, variantClasses, props.classOverride].filter(Boolean).join(' ')
})
</script>

<style scoped>
button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
