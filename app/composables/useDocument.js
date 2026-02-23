import { ref } from 'vue'

export const useDocument = (documentConfig = {}) => {
  // Valores por defecto para evitar errores cuando no se pasa config
  const defaultData = documentConfig.defaultData || {}
  const documentTitle = documentConfig.documentTitle || 'Documento'
  const canPreview = documentConfig.canPreview !== false
  const canEdit = documentConfig.canEdit !== false
  const canGeneratePDF = documentConfig.canGeneratePDF !== false

  const showPreview = ref(false)
  const showEdit = ref(false)
  const formData = ref({ ...defaultData })

  const previewDocument = () => {
    showPreview.value = true
    showEdit.value = false
  }

  const closePreview = () => {
    showPreview.value = false
  }

  const editDocument = () => {
    showPreview.value = false
    showEdit.value = true
  }

  const closeEdit = () => {
    showEdit.value = false
  }

  const saveChanges = () => {
    closeEdit()
    showPreview.value = true
  }

  const generatePDF = async () => {
    // Esperar un poco para que el DOM se estabilice
    await new Promise((r) => setTimeout(r, 300))
    
    // Guardar título original
    const titleOriginal = document.title
    
    // Cambiar título al nombre del documento
    document.title = documentTitle
    
    // Ocultar botones antes de imprimir
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => button.style.display = 'none')
    
    // Abrir diálogo de impresión
    window.print()
    
    // Restaurar título original y mostrar botones
    document.title = titleOriginal
    setTimeout(() => {
      buttons.forEach(button => button.style.display = '')
    }, 500)
  }

  return {
    showPreview,
    showEdit,
    formData,
    previewDocument,
    closePreview,
    editDocument,
    closeEdit,
    saveChanges,
    generatePDF
  }
}
