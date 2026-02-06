<template>
  <div data-pdf-content class="bg-white p-0" style="width: 210mm; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; color: #333; font-size: 18px; display: flex; justify-content: center; align-items: center; overflow: auto;">
    <div style="width: 90%;">
      <!-- Encabezado con Logo -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 30px; border-bottom: 2px solid #0066cc;">
        <div style="flex: 1;">
          <h1 style="margin: 0; font-size: 26px; font-weight: bold; color: #0066cc; text-align: center;">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #666; text-align: center;">Documento válido para trámites administrativos</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" style="width: 110px; height: auto; margin-left: 10px;" />
      </div>

      <!-- Contenido Principal -->
      <div style="padding: 40px 30px; line-height: 1.9; font-size: 18px;">
        <p style="margin: 0 0 20px 0; text-align: justify;">
          Yo, <strong>{{ autorizante }}</strong>, con DNI/NIF <strong>{{ dniAutorizante }}</strong>, y con domicilio en <strong>{{ domicilioAutorizante }}</strong>, actuando en nombre propio,
        </p>

        <h2 style="text-align: center; font-size: 20px; font-weight: bold; color: #0066cc; margin: 30px 0; padding: 18px 0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">AUTORIZO A</h2>

        <p style="margin: 20px 0; text-align: justify;">
          <strong>{{ representante }}</strong>, con DNI/NIF <strong>{{ dniRepresentante }}</strong>, y con domicilio en <strong>{{ domicilioRepresentante }}</strong>, ante <strong>{{ organismo }}</strong>, para realizar en mi nombre las gestiones de <strong>{{ gestiones }}</strong>.
        </p>

        <div style="background-color: #f0f4ff; border-left: 4px solid #0066cc; padding: 18px; margin: 25px 0; font-size: 17px;">
          <p style="margin: 0;">
            <strong>VALIDEZ:</strong> Esta autorización es válida desde la fecha de su firma hasta que sea revocada expresamente por el autorizante. El autorizado podrá actuar en todas las cuestiones administrativas relacionadas con la gestión indicada.
          </p>
        </div>

        <p style="text-align: center; font-weight: bold; margin: 35px 0 60px 0; font-size: 17px;">En Puerto Real, a {{ fecha }}</p>

        <!-- Firmas lado a lado compacto -->
        <div style="display: flex; justify-content: space-between; gap: 40px; margin-top: 60px;">
          <div style="flex: 1; text-align: center;">
            <div style="border-bottom: 1px solid #000; height: 60px; margin-bottom: 20px;"></div>
            <p style="margin: 5px 0; font-weight: bold; font-size: 17px;">FIRMA DEL AUTORIZANTE</p>
            <p style="margin: 3px 0; font-size: 16px; color: #666;">{{ autorizante }}</p>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="border-bottom: 1px solid #000; height: 60px; margin-bottom: 20px; display: flex; align-items: flex-start; justify-content: center;">
              <img src="/firma-solay.png" alt="Firma" style="height: 100px; object-fit: contain; margin-top: -50px;" />
            </div>
            <p style="margin: 5px 0; font-weight: bold; font-size: 17px;">FIRMA DEL REPRESENTANTE</p>
            <p style="margin: 3px 0; font-size: 16px; color: #666;">{{ representante }}</p>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div style="padding: 30px; border-top: 1px solid #0066cc; margin-top: 40px; text-align: center; font-size: 12px; color: #000;">
        <p style="margin: 3px 0 0 0;">Validez legal sujeta a regulaciones vigentes</p>
        <p style="margin: 3px 0 0 0;">www.solay.es</p>
        <p style="margin: 3px 0 0 0;">Paseo de Bollullos de la Mitación 18. Parque Industrial PIBO. 41110 Sevilla.</p>
        <p style="margin: 3px 0 0 0;">Página 1</p>
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
@media print {
  div[data-pdf-content] {
    width: 210mm;
    height: 297mm;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
  button {
    display: none;
  }
}
</style>
