import { ref } from 'vue'

export const useDocument = (documentConfig = {}) => {
  // Valores por defecto para evitar errores cuando no se pasa config
  const defaultData = documentConfig.defaultData || {}
  const fileName = documentConfig.fileName || 'documento.pdf'
  const canPreview = documentConfig.canPreview !== false
  const canEdit = documentConfig.canEdit !== false
  const canGeneratePDF = documentConfig.canGeneratePDF !== false

  const showModal = ref(false)
  const showPreview = ref(false)
  const showEdit = ref(false)
  const formData = ref({ ...defaultData })

  const openModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const previewDocument = () => {
    closeModal()
    showPreview.value = true
  }

  const closePreview = () => {
    showPreview.value = false
  }

  const editDocument = () => {
    closePreview()
    showEdit.value = true
  }

  const closeEdit = () => {
    showEdit.value = false
  }

  const saveChanges = () => {
    closeEdit()
    showPreview.value = true
  }

  // Espera a que las imágenes dentro del elemento estén cargadas (o timeout)
  const waitForImages = (root, timeout = 5000) => {
    const imgs = Array.from(root.querySelectorAll('img'))
    if (!imgs.length) return Promise.resolve()

    const promises = imgs.map((img) => {
      return new Promise((res) => {
        // Si ya está cargada
        if (img.complete && img.naturalHeight > 0) {
          res()
          return
        }
        // Esperar a load o error
        const onLoad = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          res()
        }
        const onError = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          res() // Resolver igualmente para no bloquear
        }
        img.addEventListener('load', onLoad, { once: true })
        img.addEventListener('error', onError, { once: true })
      })
    })

    return Promise.race([Promise.all(promises), new Promise((res) => setTimeout(res, timeout))])
  }

  const generatePDF = async () => {
    closeModal()
    
    // Esperar un poco para que el DOM se actualice y cierre el modal
    await new Promise((r) => setTimeout(r, 300))
    
    // Ocultar botones antes de imprimir
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => button.style.display = 'none')
    
    // Abrir diálogo de impresión
    window.print()
    
    // Mostrar botones nuevamente después de imprimir
    setTimeout(() => {
      buttons.forEach(button => button.style.display = '')
    }, 500)
  }

  const getModalOptions = () => {
    const options = []

    if (canPreview) {
      options.push({
        id: 'preview',
        label: 'Previsualizar',
        icon: '👁️',
        colorClass: 'bg-blue-500 hover:bg-blue-600',
        action: previewDocument
      })
    }

    if (canEdit) {
      options.push({
        id: 'edit',
        label: 'Editar',
        icon: '✏️',
        colorClass: 'bg-green-500 hover:bg-green-600',
        action: editDocument
      })
    }

    if (canGeneratePDF) {
      options.push({
        id: 'pdf',
        label: 'Generar PDF',
        icon: '📄',
        colorClass: 'bg-red-500 hover:bg-red-600',
        action: generatePDF
      })
    }

    return options
  }

  return {
    showModal,
    showPreview,
    showEdit,
    formData,
    openModal,
    closeModal,
    previewDocument,
    closePreview,
    editDocument,
    closeEdit,
    saveChanges,
    generatePDF,
    getModalOptions
  }
}
