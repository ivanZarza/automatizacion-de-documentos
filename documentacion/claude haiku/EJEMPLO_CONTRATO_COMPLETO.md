# 📝 EJEMPLO PASO A PASO: CREAR CONTRATO DE SERVICIOS

## Objetivo
Crear un nuevo documento "Contrato de Servicios" completamente funcional en 5 pasos.

---

## 📋 Especificación del Documento

**Nombre:** Contrato de Servicios
**Descripción:** Contrato legal para servicios técnicos
**Campos editables:** 10 (nombre cliente, DNI, servicios, fechas, etc)
**Secciones:** 5 (encabezado, partes, servicios, condiciones, firma)

---

## PASO 1️⃣: Crear el Componente Vue

**Archivo:** `app/components/ContratoServicios.vue`

```vue
<template>
  <div data-pdf-content class="contrato">
    <!-- ENCABEZADO -->
    <div class="encabezado-contrato">
      <h1>CONTRATO DE SERVICIOS</h1>
      <p class="fecha">Fecha: {{ generatedDate }}</p>
    </div>

    <!-- IDENTIFICACIÓN DE PARTES -->
    <section class="seccion">
      <h2 class="titulo-seccion">1. IDENTIFICACIÓN DE PARTES</h2>
      
      <div class="parte">
        <h3>PRESTADOR DEL SERVICIO:</h3>
        <table class="tabla-identificacion">
          <tr>
            <td class="etiqueta">Nombre/Empresa:</td>
            <td>{{ nombreEmpresa }}</td>
          </tr>
          <tr>
            <td class="etiqueta">NIF/NIE:</td>
            <td>{{ nifPrestador }}</td>
          </tr>
          <tr>
            <td class="etiqueta">Dirección:</td>
            <td>{{ direccionPrestador }}</td>
          </tr>
          <tr>
            <td class="etiqueta">Teléfono:</td>
            <td>{{ telefonoPrestador }}</td>
          </tr>
          <tr>
            <td class="etiqueta">Email:</td>
            <td>{{ emailPrestador }}</td>
          </tr>
        </table>
      </div>

      <div class="parte">
        <h3>CLIENTE:</h3>
        <table class="tabla-identificacion">
          <tr>
            <td class="etiqueta">Nombre/Empresa:</td>
            <td>{{ nombreCliente }}</td>
          </tr>
          <tr>
            <td class="etiqueta">NIF/NIE:</td>
            <td>{{ nifCliente }}</td>
          </tr>
          <tr>
            <td class="etiqueta">Dirección:</td>
            <td>{{ direccionCliente }}</td>
          </tr>
          <tr>
            <td class="etiqueta">Teléfono:</td>
            <td>{{ telefonoCliente }}</td>
          </tr>
        </table>
      </div>
    </section>

    <!-- OBJETO DEL CONTRATO -->
    <section class="seccion">
      <h2 class="titulo-seccion">2. OBJETO DEL CONTRATO</h2>
      <p class="contenido">{{ descripcionServicios }}</p>
      
      <table class="tabla-servicios">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Servicio Principal</td>
            <td>{{ descripcionServicios }}</td>
            <td>{{ fechaInicio }}</td>
            <td>{{ fechaFin }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- CONDICIONES ECONÓMICAS -->
    <section class="seccion">
      <h2 class="titulo-seccion">3. CONDICIONES ECONÓMICAS</h2>
      
      <table class="tabla-precios">
        <tr>
          <td class="etiqueta">Importe Total:</td>
          <td class="precio">{{ montoTotal }} €</td>
        </tr>
        <tr>
          <td class="etiqueta">Forma de Pago:</td>
          <td>{{ formaPago }}</td>
        </tr>
        <tr v-if="montoAnticipo > 0">
          <td class="etiqueta">Anticipo Requerido:</td>
          <td class="precio">{{ montoAnticipo }} €</td>
        </tr>
      </table>
    </section>

    <!-- TÉRMINOS Y CONDICIONES -->
    <section class="seccion">
      <h2 class="titulo-seccion">4. TÉRMINOS Y CONDICIONES</h2>
      
      <div class="texto-legal">
        <p><strong>Duración:</strong> El contrato tendrá una duración de {{ duracionMeses }} meses desde la fecha de firma.</p>
        
        <p><strong>Confidencialidad:</strong> Las partes se comprometen a mantener la confidencialidad de cualquier información compartida.</p>
        
        <p><strong>Resolución:</strong> Cualquiera de las partes puede rescindir este contrato con {{ diasPreaviso }} días de preaviso.</p>
        
        <p><strong>Ley Aplicable:</strong> Este contrato se regirá por las leyes de España.</p>
      </div>
    </section>

    <!-- FIRMAS -->
    <section class="seccion firmas">
      <h2 class="titulo-seccion">5. FIRMAS Y FECHA</h2>
      
      <div class="area-firmas">
        <div class="firma">
          <p class="linea-firma">_________________________</p>
          <p class="nombre-firma">{{ nombrePrestador }}</p>
          <p class="fecha-firma">Fecha: {{ generatedDate }}</p>
        </div>
        
        <div class="firma">
          <p class="linea-firma">_________________________</p>
          <p class="nombre-firma">{{ nombreCliente }}</p>
          <p class="fecha-firma">Fecha: {{ generatedDate }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  // DATOS DEL PRESTADOR
  nombreEmpresa: String,
  nifPrestador: String,
  direccionPrestador: String,
  telefonoPrestador: String,
  emailPrestador: String,
  nombrePrestador: String,
  
  // DATOS DEL CLIENTE
  nombreCliente: String,
  nifCliente: String,
  direccionCliente: String,
  telefonoCliente: String,
  
  // SERVICIOS
  descripcionServicios: String,
  fechaInicio: String,
  fechaFin: String,
  
  // ECONÓMICO
  montoTotal: {
    type: [String, Number],
    default: 0
  },
  formaPago: String,
  montoAnticipo: {
    type: [String, Number],
    default: 0
  },
  
  // TÉRMINOS
  duracionMeses: {
    type: [String, Number],
    default: 12
  },
  diasPreaviso: {
    type: [String, Number],
    default: 30
  },
  
  // SISTEMA
  generatedDate: String
})
</script>

<style scoped>
.contrato {
  font-family: 'Calibri', 'Arial', sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  line-height: 1.6;
  color: #333;
}

/* ENCABEZADO */
.encabezado-contrato {
  text-align: center;
  border-bottom: 3px solid #FFA02A;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.encabezado-contrato h1 {
  color: #FFA02A;
  font-size: 28px;
  margin: 0 0 10px 0;
}

.fecha {
  color: #666;
  font-size: 12px;
  margin: 0;
}

/* SECCIONES */
.seccion {
  margin-bottom: 40px;
  page-break-inside: avoid;
}

.titulo-seccion {
  background-color: #FFA02A;
  color: white;
  padding: 12px 15px;
  font-size: 16px;
  margin: 0 0 20px 0;
  border-radius: 4px;
}

/* PARTES */
.parte {
  margin-bottom: 25px;
}

.parte h3 {
  color: #333;
  font-size: 14px;
  margin: 10px 0;
  font-weight: bold;
}

.tabla-identificacion {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-identificacion tr {
  border-bottom: 1px solid #ddd;
}

.tabla-identificacion td {
  padding: 8px 10px;
}

.tabla-identificacion .etiqueta {
  font-weight: bold;
  background-color: #f9f9f9;
  width: 30%;
}

/* TABLAS DE SERVICIOS Y PRECIOS */
.tabla-servicios,
.tabla-precios {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-servicios th {
  background-color: #FFCC99;
  color: #333;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #FFA02A;
}

.tabla-servicios td,
.tabla-precios td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.tabla-precios .etiqueta {
  font-weight: bold;
  width: 40%;
  background-color: #f9f9f9;
}

.precio {
  font-weight: bold;
  color: #FFA02A;
  font-size: 14px;
}

/* TEXTO LEGAL */
.texto-legal {
  background-color: #f9f9f9;
  padding: 15px;
  border-left: 4px solid #FFA02A;
  margin-top: 15px;
}

.texto-legal p {
  margin: 10px 0;
  text-align: justify;
  font-size: 13px;
}

.contenido {
  text-align: justify;
  margin-bottom: 15px;
}

/* FIRMAS */
.firmas {
  margin-top: 60px;
  page-break-inside: avoid;
}

.area-firmas {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  gap: 40px;
}

.firma {
  flex: 1;
  text-align: center;
}

.linea-firma {
  border-top: 2px solid #333;
  height: 60px;
  margin: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-weight: bold;
}

.nombre-firma {
  font-weight: bold;
  margin: 10px 0 5px 0;
}

.fecha-firma {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* PRINT STYLES */
@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .contrato {
    padding: 20px;
  }
  
  .seccion {
    page-break-inside: avoid;
  }
  
  .tabla-servicios,
  .tabla-precios {
    page-break-inside: avoid;
  }
  
  .titulo-seccion {
    background-color: #FFA02A;
    color: white;
  }
}
</style>
```

---

## PASO 2️⃣: Agregar Configuración en documents.js

**Archivo:** `app/config/documents.js`

Agregar esta configuración:

```javascript
// Agregar al inicio del archivo si no existe
import dayjs from 'dayjs'

// NUEVA CONFIGURACIÓN
export const contratoServiciosConfig = {
  id: 'contrato-servicios',
  title: 'Contrato de Servicios',
  description: 'Contrato legal para servicios técnicos profesionales',
  route: '/contrato-servicios',
  fileName: 'Contrato-Servicios.pdf',
  
  defaultData: {
    // Datos del Prestador
    nombreEmpresa: 'Solay Energías',
    nifPrestador: 'ESX1234567Z',
    direccionPrestador: 'Calle Principal 123, 28001 Madrid',
    telefonoPrestador: '+34 91 234 56 78',
    emailPrestador: 'info@solayenergia.com',
    nombrePrestador: 'Juan García López',
    
    // Datos del Cliente
    nombreCliente: '',
    nifCliente: '',
    direccionCliente: '',
    telefonoCliente: '',
    
    // Servicios
    descripcionServicios: 'Servicios de consultoría e implementación de sistemas de energías renovables',
    fechaInicio: dayjs().format('DD/MM/YYYY'),
    fechaFin: dayjs().add(3, 'months').format('DD/MM/YYYY'),
    
    // Económico
    montoTotal: 5000,
    formaPago: 'Transferencia bancaria',
    montoAnticipo: 2500,
    
    // Términos
    duracionMeses: 12,
    diasPreaviso: 30
  },
  
  fields: [
    // Datos del Cliente (EDITABLES)
    {
      name: 'nombreCliente',
      label: 'Nombre o Razón Social del Cliente',
      type: 'text',
      required: true
    },
    {
      name: 'nifCliente',
      label: 'NIF/NIE del Cliente',
      type: 'text',
      required: true,
      pattern: '^[0-9]{8}[A-Z]$',
      errorMessage: 'Formato: 8 dígitos + 1 letra'
    },
    {
      name: 'direccionCliente',
      label: 'Dirección del Cliente',
      type: 'text',
      required: true
    },
    {
      name: 'telefonoCliente',
      label: 'Teléfono del Cliente',
      type: 'tel',
      required: true
    },
    
    // Servicios (EDITABLES)
    {
      name: 'descripcionServicios',
      label: 'Descripción de Servicios',
      type: 'textarea',
      required: true,
      minLength: 20
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date',
      required: true
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Finalización',
      type: 'date',
      required: true
    },
    
    // Económico (EDITABLES)
    {
      name: 'montoTotal',
      label: 'Importe Total (€)',
      type: 'text',
      required: true,
      pattern: '^[0-9]+(\\.[0-9]{1,2})?$'
    },
    {
      name: 'formaPago',
      label: 'Forma de Pago',
      type: 'select',
      required: true,
      options: [
        { label: 'Transferencia bancaria', value: 'Transferencia bancaria' },
        { label: 'Efectivo', value: 'Efectivo' },
        { label: 'Tarjeta de crédito', value: 'Tarjeta de crédito' },
        { label: 'Cheque', value: 'Cheque' }
      ]
    },
    {
      name: 'montoAnticipo',
      label: 'Anticipo Requerido (€)',
      type: 'text',
      pattern: '^[0-9]+(\\.[0-9]{1,2})?$'
    }
  ],
  
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}

// Agregar a documentConfigs (agregar al array existente)
export const documentConfigs = {
  memoriaTecnica: memoriaTecnicaConfig,
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  contratoServicios: contratoServiciosConfig,  // ✅ AGREGAR ESTA LÍNEA
  // ... otros documentos
}

// Actualizar getAllDocuments() si es necesario
export const getAllDocuments = () => {
  return [
    { ...memoriaTecnicaConfig, type: 'memoria-tecnica' },
    { ...autorizacionRepresentacionConfig, type: 'autorizacion' },
    { ...contratoServiciosConfig, type: 'contrato' },  // ✅ AGREGAR ESTA LÍNEA
    // ... otros
  ]
}
```

---

## PASO 3️⃣: Crear la Página del Documento

**Archivo:** `app/pages/contrato-servicios.vue`

```vue
<template>
  <DocumentPage 
    :config="contratoServiciosConfig" 
    :documentComponent="ContratoServicios"
  />
</template>

<script setup>
import DocumentPage from '@/components/DocumentPage.vue'
import ContratoServicios from '@/components/ContratoServicios.vue'
import { contratoServiciosConfig } from '@/config/documents'
</script>
```

---

## PASO 4️⃣: Verificar Sincronización

Usar este checklist para verificar que todo está sincronizado:

```javascript
// ✅ VERIFICACIÓN DE SINCRONIZACIÓN

// 1. NOMBRES
const documentId = 'contrato-servicios'
// ✅ Archivo componente: ContratoServicios.vue
// ✅ Archivo página: contrato-servicios.vue
// ✅ Config: contratoServiciosConfig
// ✅ Route: '/contrato-servicios'
// ✅ ID en config: 'contrato-servicios'

// 2. PROPS COINCIDEN
defineProps({
  nombreEmpresa,           // ✅ En defaultData
  nifPrestador,           // ✅ En defaultData
  direccionPrestador,     // ✅ En defaultData
  // ... etc
})

// 3. FIELDS COINCIDEN
fields: [
  { name: 'nombreCliente', ... },  // ✅ Es prop y está en defaultData
  { name: 'nifCliente', ... },     // ✅ Es prop y está en defaultData
  // ... etc
]

// 4. ELEMENTO PDF
<div data-pdf-content>...</div>  // ✅ PRESENTE

// 5. PRINT CSS
@media print {
  * { print-color-adjust: exact; }  // ✅ PRESENTE
}
```

---

## PASO 5️⃣: Probar el Documento

### 5.1 Iniciar servidor de desarrollo

```bash
cd /home/ivan/dev/trabajo/GeneracionDocumentacion
yarn dev
```

### 5.2 Abrir en navegador

```
http://localhost:3000
```

Debería aparecer "Contrato de Servicios" en el listado.

### 5.3 Verificar Funcionalidades

**✅ Preview:**
- Click en "Contrato de Servicios"
- Ver documento renderizado
- Todos los campos por defecto visibles

**✅ Edición:**
- Click en botón "Editar"
- Rellenar campos requeridos (cliente, servicios, precios)
- Validaciones funcionan

**✅ PDF:**
- Click en "Descargar PDF"
- Se descarga archivo `Contrato-Servicios.pdf`
- PDF tiene colores y estilos correctos
- Firmas visibles

### 5.4 Validaciones a Probar

```javascript
// Probar que las validaciones funcionan:

1. NIF del cliente:
   ❌ "12345678" → Error: Formato inválido
   ✅ "12345678A" → OK

2. Descripción de servicios:
   ❌ "Servicios" (muy corto) → Error: Mínimo 20 caracteres
   ✅ "Servicios de asesoramiento técnico" → OK

3. Importe:
   ❌ "abc" → Error: Debe ser número
   ✅ "5000.50" → OK

4. Campos requeridos:
   ❌ Dejar vacío → Error: Campo requerido
   ✅ Llenar con valor → OK
```

---

## 📊 Resultado Final

Después de estos 5 pasos:

```
✅ Componente Vue (ContratoServicios.vue) - 450 líneas
   - Template con 5 secciones
   - Props para todos los campos
   - Estilos con print media

✅ Configuración (documents.js) - Actualizado
   - contratoServiciosConfig agregado
   - 10 campos editables
   - defaultData completo

✅ Página (contrato-servicios.vue) - 20 líneas
   - Imports correctos
   - Props pasadas correctamente

✅ Funcionalidades
   - Preview funciona
   - Edición con validaciones
   - PDF descarga sin errores
   - Colores corporativos en PDF

✅ URL accesible en
   - http://localhost:3000/contrato-servicios
   - Listado en http://localhost:3000
```

---

## 🎯 Próximos Documentos Sugeridos

Usando el mismo patrón, crear:

1. **Acta de Reunión**
   - Similar a Contrato (5 secciones)
   - Tabla con asistentes
   - Puntos de agenda
   - Acuerdos

2. **Presupuesto**
   - Tabla dinámica de items
   - Cálculo automático de totales
   - IVA y descuentos

3. **Certificado de Instalación**
   - Datos técnicos
   - Pruebas realizadas
   - Firma oficial

4. **Factura**
   - Items facturables
   - Numeración automática
   - QR de pago

5. **Reporte de Inspección**
   - Checklist de verificación
   - Fotos/observaciones
   - Recomendaciones

---

## 📝 Notas Importantes

- Los 5 pasos son **SIEMPRE** los mismos para cualquier documento
- La sincronización entre 3 lugares (**defaultData** → **fields** → **props**) es **CRÍTICA**
- Siempre incluir `<div data-pdf-content>` en componente
- Siempre incluir `@media print` con `print-color-adjust: exact`
- Probar en navegador antes de considerar terminado

---

**Documento actualizado:** 6 de febrero de 2026
**Ejemplo de:** Contrato de Servicios
**Estado:** Production-ready ✅
