<script setup>
import { getAllDocuments } from '../config/documents'

const documents = getAllDocuments()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-4xl font-bold text-center my-8 text-blue-600">Generación de Documentación</h1>
    <div class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <p class="mb-6 text-lg text-gray-700">Bienvenido a la aplicación de generación de documentación. Aquí puedes crear y gestionar tus documentos de manera fácil y rápida.</p>
      
      <!-- Botón Destacado: Formulario Maestro -->
      <div class="mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg border-2 border-blue-800">
        <h3 class="text-2xl font-bold text-white mb-2">🚀 Nuevo: Formulario Maestro</h3>
        <p class="text-blue-100 mb-4">Completa una sola vez todos los datos técnicos y luego selecciona el documento a generar. ¡Más rápido y eficiente!</p>
        <NuxtLink 
          to="/formulario-maestro" 
          class="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold shadow-md"
        >
          Comenzar Formulario Maestro →
        </NuxtLink>
      </div>

      <hr class="mb-8" />
      
      <p class="mb-4 text-sm text-gray-500">O accede directamente a los documentos específicos:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div v-for="doc in documents" :key="doc.id" class="p-6 border-2 border-blue-300 rounded-lg hover:shadow-lg transition">
          <h2 class="text-2xl font-bold text-blue-600 mb-2">📋 {{ doc.title }}</h2>
          <p class="text-gray-600 mb-4">{{ doc.description }}</p>
          <NuxtLink 
            :to="doc.route" 
            class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Ir al documento →
          </NuxtLink>
        </div>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p class="text-sm text-gray-600">
          💡 Selecciona el tipo de documento que deseas generar, edita los datos necesarios y descarga tu documento en PDF.
        </p>
      </div>
    </div>
  </div>
</template>

<!-- reemplazo rutas estáticas si existieran -->
