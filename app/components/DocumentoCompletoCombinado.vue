<script setup>
import { ref, computed } from 'vue';
import Documento80Paginas from './Documento80Paginas.vue';
import DocumentoUltimaPagina from './DocumentoUltimaPagina.vue';

const props = defineProps({
  // Props para Documento80Paginas
  nombre: { type: String, default: 'Alejandra Klitzke Chacón' },
  direccion: { type: String, default: 'Calle Dolores, N.º 14 Es:1 Pl:00 Pt:01' },
  referenciaCatastral: { type: String, default: '56317070QA5653B0001SG' },
  dia: { type: String, default: '16' },
  mes: { type: String, default: 'Octubre' },
  anio: { type: String, default: '2025' },
  localidad: { type: String, default: 'Sevilla' },
  provincia: { type: String, default: 'Sevilla' },
  dni: { type: String, default: '' },
  codigoPostal: { type: String, default: '41940' },
  presupuesto: { type: String, default: '7.024,79 €' },
  potencia: { type: String, default: '5.0' },
  potenciaModulos: { type: String, default: '6.2' },
  
  // Props para DocumentoUltimaPagina
  ciudad: { type: String, default: 'Sevilla' },
  
  // Configuración de PDFs
  nombrePdfOriginal: { type: String, default: 'documento-original.pdf' },
  carpetaPdfs: { type: String, default: '/pdfs' }
});

const isGenerating = ref(false);
const mensajeEstado = ref('');
const pestanaActiva = ref('documento1');

// Generar nombre de salida basado en el PDF original
const nombreSalida = computed(() => {
  const nombre = props.nombrePdfOriginal;
  // Si el nombre termina en .pdf, reemplazarlo; si no, agregarlo
  return nombre.replace(/\.pdf$/i, '-completo.pdf') || `${nombre}-completo.pdf`;
});

const generarPDFcombinado = async () => {
  isGenerating.value = true;
  mensajeEstado.value = 'Generando PDF combinado...';
  
  try {
    const { jsPDF } = await import('jspdf');
    const { PDFDocument } = await import('pdf-lib');
    const html2canvas = (await import('html2canvas')).default;

    // 1. Generar PDF del Documento80Paginas por cada página
    mensajeEstado.value = 'Generando documento de inicio...';
    const doc80Element = document.getElementById('documento-80-paginas-visible');
    const contenedoresInicio = doc80Element.querySelectorAll('.contenedor-principal');
    
    const pdf80 = new jsPDF('p', 'mm', 'a4');
    let isFirstPage = true;
    
    for (let contenedor of contenedoresInicio) {
      if (!isFirstPage) pdf80.addPage();
      isFirstPage = false;
      
      try {
        // Remover temporalmente estilos que causan saltos y espacios en blanco
        const pageBreakStyle = contenedor.style.pageBreakAfter;
        const paddingTopStyle = contenedor.style.paddingTop;
        const paddingBottomStyle = contenedor.style.paddingBottom;
        
        contenedor.style.pageBreakAfter = 'auto';
        contenedor.style.paddingTop = '10mm';
        contenedor.style.paddingBottom = '10mm';
        
        const canvas = await html2canvas(contenedor, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          ignoreElements: (element) => {
            return element.classList && element.classList.contains('print-hide');
          }
        });
        
        // Restaurar estilos originales
        contenedor.style.pageBreakAfter = pageBreakStyle || '';
        contenedor.style.paddingTop = paddingTopStyle || '';
        contenedor.style.paddingBottom = paddingBottomStyle || '';
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const altura = canvas.height;
        const ancho = canvas.width;
        const ratio = ancho / altura;
        
        // Ajustar a tamaño A4
        const pdfWidth = 210;
        const pdfHeight = pdfWidth / ratio;
        
        // No dividir, usar la altura calculada
        pdf80.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
      } catch (e) {
        console.error('Error procesando contenedor:', e);
      }
    }

    // 2. Cargar PDF original
    mensajeEstado.value = 'Cargando documento original...';
    let pdfOriginal = null;
    const rutaPdfOriginal = `${props.carpetaPdfs}/${props.nombrePdfOriginal}`;
    try {
      const responseOriginal = await fetch(rutaPdfOriginal);
      if (responseOriginal.ok) {
        pdfOriginal = await responseOriginal.arrayBuffer();
        mensajeEstado.value = `✓ Documento original cargado`;
      }
    } catch (error) {
      console.warn('No se pudo cargar el PDF original:', error);
      mensajeEstado.value = '⚠️ Documento original no encontrado, continuando...';
    }

    // 3. Generar PDF del DocumentoUltimaPagina
    mensajeEstado.value = 'Generando documento final...';
    const docFinalElement = document.getElementById('documento-ultima-pagina-visible');
    const contenedoresFinales = docFinalElement.querySelectorAll('.contenedor-principal');
    
    const pdfFinal = new jsPDF('p', 'mm', 'a4');
    isFirstPage = true;
    
    for (let contenedor of contenedoresFinales) {
      if (!isFirstPage) pdfFinal.addPage();
      isFirstPage = false;
      
      try {
        // Remover temporalmente estilos que causan saltos y espacios en blanco
        const pageBreakStyle = contenedor.style.pageBreakAfter;
        const paddingTopStyle = contenedor.style.paddingTop;
        const paddingBottomStyle = contenedor.style.paddingBottom;
        
        contenedor.style.pageBreakAfter = 'auto';
        contenedor.style.paddingTop = '10mm';
        contenedor.style.paddingBottom = '10mm';
        
        const canvas = await html2canvas(contenedor, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          ignoreElements: (element) => {
            return element.classList && element.classList.contains('print-hide');
          }
        });
        
        // Restaurar estilos originales
        contenedor.style.pageBreakAfter = pageBreakStyle || '';
        contenedor.style.paddingTop = paddingTopStyle || '';
        contenedor.style.paddingBottom = paddingBottomStyle || '';
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const altura = canvas.height;
        const ancho = canvas.width;
        const ratio = ancho / altura;
        
        const pdfWidth = 210;
        const pdfHeight = pdfWidth / ratio;
        
        // No dividir, usar la altura calculada
        pdfFinal.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
      } catch (e) {
        console.error('Error procesando contenedor final:', e);
      }
    }

    // 4. Combinar todos los PDFs
    mensajeEstado.value = 'Combinando documentos...';
    const pdfCombinado = await PDFDocument.create();
    
    const pdf80Doc = await PDFDocument.load(pdf80.output('arraybuffer'));
    const pdfFinalDoc = await PDFDocument.load(pdfFinal.output('arraybuffer'));
    
    // Agregar páginas del inicio
    const paginas80 = await pdfCombinado.copyPages(pdf80Doc, pdf80Doc.getPageIndices());
    paginas80.forEach(page => pdfCombinado.addPage(page));
    
    // Agregar PDF original si existe
    if (pdfOriginal) {
      try {
        const pdfOriginalDoc = await PDFDocument.load(pdfOriginal);
        const paginasOriginal = await pdfCombinado.copyPages(pdfOriginalDoc, pdfOriginalDoc.getPageIndices());
        paginasOriginal.forEach(page => pdfCombinado.addPage(page));
      } catch (error) {
        console.warn('Error al cargar PDF original:', error);
      }
    }
    
    // Agregar páginas del final
    const paginasFinal = await pdfCombinado.copyPages(pdfFinalDoc, pdfFinalDoc.getPageIndices());
    paginasFinal.forEach(page => pdfCombinado.addPage(page));

    // 5. Descargar PDF combinado
    mensajeEstado.value = 'Descargando...';
    const pdfBytes = await pdfCombinado.save();
    
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nombreSalida.value;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    mensajeEstado.value = '✅ PDF combinado descargado correctamente';
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    mensajeEstado.value = `❌ Error: ${error.message}`;
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="documento-combinado-wrapper">
    <!-- Pestañas de navegación -->
    <div class="pestanas">
      <button 
        :class="['pestana', { activa: pestanaActiva === 'documento1' }]"
        @click="pestanaActiva = 'documento1'"
      >
        📄 Documento Inicio
      </button>
      <button 
        :class="['pestana', { activa: pestanaActiva === 'documento2' }]"
        @click="pestanaActiva = 'documento2'"
      >
        📄 Documento Final
      </button>
    </div>

    <!-- Contenedor de documentos -->
    <div class="contenedor-documentos">
      
      <!-- DOCUMENTO 1: Documento80Paginas (Rellenable) -->
      <div v-show="pestanaActiva === 'documento1'" class="documento-seccion">
        <h2>Documento de Inicio - Rellenar</h2>
        <div id="documento-80-paginas-visible" class="documento-preview">
          <Documento80Paginas 
            :nombre="nombre"
            :direccion="direccion"
            :referenciaCatastral="referenciaCatastral"
            :dia="dia"
            :mes="mes"
            :anio="anio"
            :localidad="localidad"
            :provincia="provincia"
            :dni="dni"
            :codigoPostal="codigoPostal"
            :presupuesto="presupuesto"
            :potencia="potencia"
            :potenciaModulos="potenciaModulos"
          />
        </div>
      </div>

      <!-- DOCUMENTO 2: DocumentoUltimaPagina (Rellenable) -->
      <div v-show="pestanaActiva === 'documento2'" class="documento-seccion">
        <h2>Documento Final - Rellenar</h2>
        <div id="documento-ultima-pagina-visible" class="documento-preview">
          <DocumentoUltimaPagina 
            :ciudad="ciudad"
            :dia="dia"
            :mes="mes"
            :anio="anio"
          />
        </div>
      </div>

    </div>

    <!-- Panel de control -->
    <div class="panel-control">
      <button 
        @click="generarPDFcombinado" 
        :disabled="isGenerating"
        class="btn-generar"
      >
        {{ isGenerating ? '⏳ ' + mensajeEstado : '📥 Generar y Descargar PDF Completo' }}
      </button>
      
      <p v-if="mensajeEstado" :class="['mensaje', mensajeEstado.includes('❌') ? 'error' : 'exito']">
        {{ mensajeEstado }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.documento-combinado-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
  width: 100%;
  max-height: calc(100vh - 200px);
}

/* Pestañas */
.pestanas {
  display: flex;
  gap: 10px;
  border-bottom: 3px solid #ddd;
  margin-bottom: 20px;
  background: white;
  padding: 0 0 0 20px;
  border-radius: 4px 4px 0 0;
}

.pestana {
  padding: 14px 24px;
  background: #f0f0f0;
  border: none;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #666;
  text-decoration: none;
}

.pestana:hover {
  background: #e0e0e0;
  color: #333;
}

.pestana.activa {
  background: white;
  border-bottom-color: #0066cc;
  color: #0066cc;
  border-radius: 4px 4px 0 0;
}

/* Contenedor de documentos */
.contenedor-documentos {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  min-height: 600px;
  max-height: 800px;
}

.documento-seccion h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.documento-preview {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin: 20px 0;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fafafa;
}

/* Panel de control */
.panel-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-generar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 16px 36px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-generar:hover:not(:disabled) {
  background-color: #218838;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.btn-generar:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

.mensaje {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  min-height: 20px;
}

.mensaje.exito {
  color: #28a745;
}

.mensaje.error {
  color: #dc3545;
}

/* Responsivo */
@media (max-width: 768px) {
  .documento-combinado-wrapper {
    padding: 10px;
  }

  .pestanas {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .pestana {
    padding: 10px 15px;
    font-size: 12px;
    white-space: nowrap;
  }

  .contenedor-documentos {
    padding: 15px;
  }

  .btn-generar {
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style>
