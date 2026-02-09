<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Encabezado -->
    <div class="max-w-6xl mx-auto mb-8">
      <h1 class="text-4xl font-bold text-blue-600 mb-2">Seleccionar Documento a Generar</h1>
      <p class="text-gray-600">Elige qué tipo de documento deseas generar basándote en los datos ingresados en el formulario maestro.</p>
    </div>

    <!-- Grid de Documentos -->
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Tarjeta: Autorización de Representación -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('autorizacion-representacion')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">Autorización de Representación</h3>
          <p class="text-gray-600 text-sm mb-4">Documento válido para trámites administrativos</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: Declaración Habilitación Profesional -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('declaracion-habilitacion-profesional')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">Declaración Habilitación Profesional</h3>
          <p class="text-gray-600 text-sm mb-4">Declaración de habilitación profesional para colegiados</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: Certificado Coplanar Teja -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('certificado-coplanar-teja')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">Certificado Solidez - Coplanar Teja</h3>
          <p class="text-gray-600 text-sm mb-4">Certificación para cubiertas de teja coplanar</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: Certificado Cubierta Plana -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('certificado-cubierta-plan-aaporticada')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">Certificado Solidez - Cubierta Plana</h3>
          <p class="text-gray-600 text-sm mb-4">Certificación para cubiertas planas aportícadas</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: MTD Monofásica con Batería -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('mtd-instalacion-autoconsumo-monofasica-con-bateria')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">MTD Autoconsumo Monofásica + Batería</h3>
          <p class="text-gray-600 text-sm mb-4">Memoria técnica para instalación fotovoltaica monofásica con almacenamiento</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: MTD Aislada con Batería -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('mtd-instalacion-aislada-con-bateria')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">MTD Instalación Aislada + Batería</h3>
          <p class="text-gray-600 text-sm mb-4">Memoria técnica para instalación fotovoltaica aislada con almacenamiento</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: MTD Trifásica con Batería -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('mtd-instalacion-autoconsumo-trifasica-con-bateria')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">MTD Autoconsumo Trifásica + Batería</h3>
          <p class="text-gray-600 text-sm mb-4">Memoria técnica para instalación fotovoltaica trifásica con almacenamiento</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: MTD Sin Batería -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('mtd-instalacion-autoconsumo-sin-bateria')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">MTD Autoconsumo Sin Batería</h3>
          <p class="text-gray-600 text-sm mb-4">Memoria técnica para instalación fotovoltaica sin almacenamiento</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: MTD Puntos de Recarga -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('mtd-instalacion-puntos-recarga')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">MTD Puntos de Recarga Vehículos Eléctricos</h3>
          <p class="text-gray-600 text-sm mb-4">Memoria técnica para instalación de recarga de vehículos eléctricos</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>

        <!-- Tarjeta: Declaración RCDs -->
        <div 
          class="bg-white rounded-lg shadow-md p-6 border-l-4 border-lime-500 cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectDocument('declaracion-no-generacion-rcds')"
        >
          <h3 class="text-xl font-bold text-gray-800 mb-2">Declaración No Generación RCDs</h3>
          <p class="text-gray-600 text-sm mb-4">Declaración responsable de no generación de residuos de construcción</p>
          <Boton variant="primary" class="w-full">Generar →</Boton>
        </div>
      </div>
    </div>

    <!-- Botones de Acción -->
    <div class="max-w-6xl mx-auto flex gap-4 justify-center">
      <Boton 
        @click="goBack"
        variant="secondary"
      >
        ← Editar Datos Maestros
      </Boton>
      <Boton 
        @click="goToIndex"
        variant="secondary"
      >
        ← Volver al Inicio
      </Boton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFormStore } from '../stores/formStore'
import { getDocumentConfig } from '../config/documents'
import Boton from '../components/Boton.vue'

const router = useRouter()
const formStore = useFormStore()

const selectDocument = (documentId) => {
  // Verificar que haya datos maestros
  if (!formStore.hasData) {
    alert('Por favor, completa primero el formulario maestro')
    router.push('/formulario-maestro')
    return
  }

  // Obtener configuración del documento
  const documentConfig = getDocumentConfig(documentId)
  if (!documentConfig) {
    alert('Documento no encontrado')
    return
  }

  // Redirigir a la página del documento
  // El documento usará los datos de Pinia automáticamente
  router.push(documentConfig.route)
}

const goBack = () => {
  router.push('/formulario-maestro')
}

const goToIndex = () => {
  router.push('/')
}
</script>

<style scoped>
</style>
