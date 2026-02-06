<template>
  <div data-pdf-content style="width: 210mm; height: 297mm; margin: 0 auto; padding: 0; background-color: white; font-family: 'Segoe UI', Arial, sans-serif; color: #333; font-size: 15px; display: flex; flex-direction: column;">
    <!-- Contenedor principal con márgenes A4 -->
    <div style="flex: 1; display: flex; flex-direction: column; padding: 20mm;">
      
      <!-- Encabezado con Logo -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 18px 0; border-bottom: 2px solid #0066cc; margin-bottom: 27px;">
        <div style="flex: 1;">
          <h1 style="margin: 0; font-size: 26px; font-weight: bold; color: var(--color-orange-medium-strong); text-align: center;">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
          <p style="margin: 2px 0 0 0; font-size: 16px; color: #666; text-align: center;">Documento válido para trámites administrativos</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" style="width: 120px; height: auto; margin-left: 15px; flex-shrink: 0;" />
      </div>

      <!-- Contenido Principal -->
      <div style="line-height: 1.8; font-size: 15px; flex: 1; display: flex; flex-direction: column;">
        <p style="margin: 0 0 15px 0; text-align: justify;">
          Yo, <strong>{{ autorizante }}</strong>, con DNI/NIF <strong>{{ dniAutorizante }}</strong>, y con domicilio en <strong>{{ domicilioAutorizante }}</strong>, actuando en nombre propio,
        </p>

        <h2 style="text-align: center; font-size: 20px; font-weight: bold; color: #0066cc; margin: 15px 0; padding: 10px 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">AUTORIZO A</h2>

        <p style="margin: 15px 0; text-align: justify;">
          <strong>{{ representante }}</strong>, con DNI/NIF <strong>{{ dniRepresentante }}</strong>, ante <strong>{{ organismo }}</strong>, para realizar en mi nombre las gestiones de <strong>{{ gestiones }}</strong>.
        </p>

        <div style="background-color: var(--color-orange-weak); border-left: 4px solid var(--color-orange-medium-strong); padding: 12px; margin: 15px 0; font-size: 14px;">
          <p style="margin: 0;">
            <strong>VALIDEZ:</strong> Esta autorización es válida desde su firma hasta que sea revocada expresamente.
          </p>
        </div>

        <p style="text-align: center; font-weight: bold; margin: 40px 0 100px 0; font-size: 14px;">En Puerto Real, a {{ fecha }}</p>

        <!-- Firmas lado a lado compacto -->
        <div style="display: flex; justify-content: space-between; gap: 40px; margin-top: auto;">
          <div style="flex: 1; text-align: center;">
            <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px;"></div>
            <p style="margin: 5px 0; font-weight: bold; font-size: 18px;">FIRMA DEL AUTORIZANTE</p>
            <p style="margin: 2px 0; font-size: 14px; color: #666;">{{ autorizante }}</p>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px; display: flex; align-items: flex-start; justify-content: center;">
              <img src="/firma-solay.png" alt="Firma" style="height: 120px; object-fit: contain; margin-top: -75px;" />
            </div>
            <p style="margin: 5px 0; font-weight: bold; font-size: 18px;">FIRMA DEL REPRESENTANTE</p>
            <p style="margin: 2px 0; font-size: 14px; color: #666;">{{ representante }}</p>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div style="padding: 12px 0; border-top: 1px solid #0066cc; margin-top: 20px; text-align: center; font-size: 10px; color: #000;">
        <p style="margin: 2px 0;">Validez legal sujeta a regulaciones vigentes</p>
        <p style="margin: 1px 0;">www.solay.es | Paseo de Bollullos de la Mitación 18. Sevilla.</p>
        <p style="margin: 1px 0;">Página 1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  autorizante: String,
  dniAutorizante: String,
  domicilioAutorizante: String,
  representante: String,
  dniRepresentante: String,
  domicilioRepresentante: String,
  organismo: String,
  gestiones: String,
  fecha: String,
  generatedDate: {
    type: String,
    default: ''
  }
})

// Ocultar botones al imprimir
const hideButtonsOnPrint = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.style.display = 'none');
  window.print();
  buttons.forEach(button => button.style.display = '');
}
</script>

<style scoped>
p {
  font-size: 16px;
}
@media print {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  div[data-pdf-content] {
    font-size: 18px !important; /* Mantener tamaño de letra */
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 10mm !important; /* Reducir padding para evitar desbordamiento */
    page-break-after: avoid; /* Evitar saltos de página innecesarios */
    background: white !important;
  }

  div[data-pdf-content] > div {
    height: auto !important; /* Asegurar que el contenido se ajuste dinámicamente */
  }

  button {
    display: none !important;
  }

  body {
    margin: 0;
    padding: 0;
  }
}

@media screen {
  div[data-pdf-content] {
    font-size: 20px; /* Mantener tamaño de letra */
    max-width: 210mm;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    background: white;
    min-height: 350mm;
    padding: 10mm; /* Asegurar consistencia con impresión */
  }
}
</style>
