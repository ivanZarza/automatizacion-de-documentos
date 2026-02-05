<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold text-center my-8">Generación de Documentación</h1>
    <div class="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <p class="mb-4">Bienvenido a la aplicación de generación de documentación. Aquí puedes crear y gestionar tus documentos de manera fácil y rápida.</p>
      <ul class="list-disc list-inside mb-4">
        <li>Selecciona el tipo de documento que deseas generar.</li>
        <li>Rellena los campos necesarios con la información requerida.</li>
        <li>Descarga o comparte tu documento generado.</li>
      </ul>
      <p class="mb-4">¡Comienza a crear tus documentos ahora!</p>
      <NuxtLink to="/autorizacion-representacion" class="text-blue-500 hover:underline">Generar Autorización de Representación</NuxtLink>
    </div>
  </div>
</template>
