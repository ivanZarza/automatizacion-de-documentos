<script setup>
defineProps({
  ciudad: {
    type: String,
    default: ''
  },
  dia: {
    type: String,
    default: ''
  },
  mes: {
    type: String,
    default: ''
  },
  anio: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="contenedor-pdf">
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <h3 class="titulo-subseccion">1.27. OTRAS INFORMACIONES ÚTILES PARA TRABAJOS POSTERIORES</h3>
        
        <p class="parrafo-contenido">La instalación de fotovoltaica se ha proyectado pensando en las necesidades de espacio que se requerirán para llevar a cabo de forma segura las distintas operaciones de mantenimiento, y/o otras informaciones útiles para la realización de los mismos se dispone en los planos de proyecto, donde se definen las características de las diferentes obras y el trazado de canalizaciones de infraestructuras.</p>

        <p class="parrafo-ubicacion">En {{ ciudad }}, {{ dia }} de {{ mes }} de {{ anio }}</p>

        <div class="logo-centro">
          <img src="/firma-solay.png" alt="Firma Solay" class="logo-centro-img" />
        </div>

        <div class="datos-autor">
          <p class="nombre-autor">Eduardo Rivera Cabezas</p>
          <p class="titulacion-autor">Ingeniero Industrial</p>
          <p class="colegiado-autor">Colegiado 4654 del Colegio Oficial de Ingenieros Industriales de Andalucía Occidental</p>
        </div>

        <p class="texto-pie" style="text-align:right">Página 81</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== estilos base extraídos y adaptados de AutorizacionRepresentacion.vue ===== */
.contenedor-pdf {
  width: 210mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Segoe UI", Arial, sans-serif;
  color: #333;
  font-size: 17px;
}

.contenedor-principal {
  height: 297mm;
  display: flex;
  flex-direction: column;
  padding: 20mm;
  box-sizing: border-box;
  background: white;
  page-break-after: always;
  page-break-inside: avoid;
  overflow: hidden;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 27px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.subtitulo {
  margin: 0;
  font-size: 18px;
  color: #666;
  text-align: left;
}

.logo {
  width: 150px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

.contenido-principal {
  line-height: 1.8;
  font-size: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.titulo-subseccion {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 16px 0 12px 0;
  text-decoration: underline;
  text-transform: uppercase;
}

.parrafo-contenido {
  margin: 10px 0;
  text-align: justify;
  line-height: 1.6;
  font-size: 14px;
}

.parrafo-ubicacion {
  margin: 30px 0 20px 0;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

.logo-centro {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.logo-centro-img {
  height: 80px;
  object-fit: contain;
}

.datos-autor {
  text-align: center;
  margin: 30px 0;
}

.nombre-autor {
  margin: 0 0 8px 0;
  font-weight: bold;
  font-size: 14px;
}

.titulacion-autor {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.colegiado-autor {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid #0066cc;
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #000;
}

.texto-pie {
  margin: 2px 0;
}

@media print {
  .contenedor-pdf {
    width: 210mm;
    margin: 0;
  }
  
  .contenedor-principal {
    height: 297mm;
    width: 210mm;
    margin: 0;
    padding: 20mm;
    box-sizing: border-box;
  }
}

.no-break {
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>
