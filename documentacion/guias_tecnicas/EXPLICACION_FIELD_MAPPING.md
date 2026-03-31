# Explicación: Sistema de fieldMapping

## ¿Qué es fieldMapping?

`fieldMapping` es un **objeto clave-valor** que asocia campos entre el formulario maestro y los documentos específicos. Actúa como un **traductor** entre dos sistemas de nombres de variables.

## Estructura

```javascript
fieldMapping: {
  pse_potencia: 'e2_potenciaNominalInversores',
  pse_tipo: 'otros_tipoInstalacion',
  pse_descripcion: 'otros_descripcionProyecto'
}
```

### Componentes:
- **Clave** (izquierda): Nombre de la **prop del componente** del documento
  - Ejemplo: `pse_potencia`
  
- **Valor** (derecha): Nombre del **campo en el formulario maestro**
  - Ejemplo: `e2_potenciaNominalInversores` (apartado E2.1)

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USUARIO COMPLETA FORMULARIO MAESTRO                      │
│    Ingresa datos en campos como:                            │
│    - e2_potenciaNominalInversores (E2.1)                   │
│    - otros_tipoInstalacion (Sección Otros)                 │
│    - otros_descripcionProyecto (Sección Otros)             │
│                                                             │
│    → Datos guardados en Pinia Store                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. USUARIO SELECCIONA DOCUMENTO PSE                         │
│    Sistema carga:                                           │
│    - planosPlanosSituacionEmplazamientoCubiertaConfig      │
│    - fieldMapping incluido en config                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. mergeFormData.js PROCESA fieldMapping                    │
│                                                             │
│    Para cada campo del documento:                           │
│    - Lee el mapeo: pse_potencia → e2_potenciaNominalInversores
│    - Busca en datos maestro: e2_potenciaNominalInversores    │
│    - Obtiene el valor: "5.5"                               │
│    - Asigna a: pse_potencia: "5.5"                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. COMPONENTE PSE RECIBE DATOS PROCESADOS                  │
│                                                             │
│    Props:                                                   │
│    pse_potencia: "5.5"                                     │
│    pse_tipo: "Instalación Solar Fotovoltaica"             │
│    pse_descripcion: "para Autoconsumo Individual..."       │
│                                                             │
│    Template muestra:                                        │
│    {{ formattedData.pse_potencia }}  →  "5.5"              │
└─────────────────────────────────────────────────────────────┘
```

## Ejemplo Práctico: pse_potencia

### ❌ **Antes (SIN MAPEO CORRECTO)**
```javascript
// En documents.js
fieldMapping: {
  pse_potencia: 'potenciaNominalTotalInversores'  // ❌ CAMPO QUE NO EXISTE
}

// En mergeFormData.js
// Busca 'potenciaNominalTotalInversores' en datos maestro
// No encuentra nada → pse_potencia = undefined
// Template muestra: "0 kW" (valor por defecto)
```

### ✅ **Después (CON MAPEO CORRECTO)**
```javascript
// En documents.js
fieldMapping: {
  pse_potencia: 'e2_potenciaNominalInversores'  // ✅ CAMPO REAL (E2.1)
}

// Usuario rellenó en formulario maestro:
// e2_potenciaNominalInversores = "5.5"

// En mergeFormData.js
// Busca 'e2_potenciaNominalInversores' en datos maestro
// Encuentra valor: "5.5" → pse_potencia = "5.5"
// Template muestra: "5.5" (valor real del usuario)
```

## Casos de Uso

### Caso 1: Campo que mapea a formulario maestro existente
```javascript
pse_potencia: 'e2_potenciaNominalInversores'
// Toma valor de E2.1 del maestro
```

### Caso 2: Campo que mapea a formulario maestro nuevo (Sección Otros)
```javascript
pse_tipo: 'otros_tipoInstalacion'
pse_descripcion: 'otros_descripcionProyecto'
// Toma valores de campos nuevos agregados en Sección Otros
```

### Caso 3: Campo sin mapeo (usa directamente el nombre)
```javascript
// Si no hay mapeo para pse_nif, busca directamente:
// mergedData['pse_nif']
```

## Archivos Involucrados

| Archivo | Rol |
|---------|-----|
| `app/config/documents.js` | Define `fieldMapping` por documento |
| `app/utils/mergeFormData.js` | Lee `fieldMapping` y traduce valores |
| `app/config/masterFormFields.js` | Define campos disponibles en formulario maestro |
| `app/components/PlanosSituacionEmplazamientoCubierta.vue` | Recibe props traducidas |

## Código Clave: mergeFormData.js

```javascript
export const filterDataForDocument = (documentConfig, mergedData) => {
  const documentDefaults = documentConfig.defaultData || {}
  const fieldMapping = documentConfig.fieldMapping || {}  // ← AQUÍ
  const filtered = {}
  
  Object.keys(documentDefaults).forEach(key => {
    let masterValue
    
    // 1. Si existe un mapeo para este campo:
    if (fieldMapping[key]) {
      // Buscar el valor usando el nombre mapeado
      masterValue = mergedData[fieldMapping[key]]  // ← TRADUCCIÓN
    } else {
      // Si no hay mapeo, buscar directamente
      masterValue = mergedData[key]
    }
    
    // 2. Si el maestro tiene valor → usar maestro
    if (masterValue !== undefined && masterValue !== null && masterValue !== '') {
      filtered[key] = masterValue
    } else {
      // Si no → usar valor por defecto
      filtered[key] = documentDefaults[key]
    }
  })
  
  return filtered
}
```

## Resumen

- **fieldMapping** = Diccionario que traduce nombres de campos
- **Clave** = Nombre en el documento (prop del componente)
- **Valor** = Nombre en el formulario maestro (fuente de datos)
- **Propósito** = Permitir que un documento use campos del maestro sin conocer sus nombres exactos
- **Ventaja** = Desacoplamiento: cada documento puede tener su propia nomenclatura interna

