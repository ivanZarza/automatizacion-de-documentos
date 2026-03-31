# 🛠️ Guía de Herramientas (Equipos)

## Descripción General

El sistema de **Herramientas** permite gestionar cuatro tipos de equipos para instalaciones fotovoltaicas:
- ⚡ **Inversores**
- 🔧 **Generadores**
- 🔋 **Baterías**
- ☀️ **Módulos**

Cada herramienta tiene una página dedicada donde puedes:
1. **Agregar** nuevos equipos
2. **Visualizar** equipos registrados
3. **Llevar** datos al formulario maestro
4. **Eliminar** equipos

---

## 📊 Arquitectura del Sistema

```
JSON FILES (app/data/)
    ↓
equipmentStore (Pinia in-memory)
    ↓
[tipo].vue (UI - Form + Grid)
    ↓
API Endpoints (/server/api/equipos/)
    ↓
JSON FILES (Persistencia)
```

### Flujo de Datos

#### 1️⃣ **Cargar Datos (Inicio)**
```
app/data/equipos_inversores.json → equipmentStore.inversores (ref)
                                  → [tipo].vue (computed)
                                  → Se renderiza en UI
```

#### 2️⃣ **Guardar Equipo Nuevo**
```
Formulario (UI) 
  ↓
guardarEquipo() (async)
  ↓
POST /api/equipos/[tipo]/guardar
  ↓
Servidor: Lee JSON + Agrega + Guarda archivo
  ↓
API retorna nuevoEquipo
  ↓
equipmentStore.agregarEquipo() actualiza array
  ↓
UI se renderiza con el nuevo equipo
```

#### 3️⃣ **Eliminar Equipo**
```
Click en "Eliminar"
  ↓
eliminarEquipo() (async)
  ↓
DELETE /api/equipos/[tipo]/eliminar { id }
  ↓
Servidor: Lee JSON + Elimina por ID + Guarda archivo
  ↓
API retorna éxito
  ↓
equipmentStore.eliminarEquipo() actualiza array
  ↓
UI se re-renderiza sin el equipo
```

#### 4️⃣ **Llevar al Formulario Maestro**
```
Click en "Llevar"
  ↓
llevarAlFormulario(equipo)
  ↓
Mapear campos: equipoField → formularioField
  ↓
formStore.updateFormData(datosMapeos)
  ↓
Router → /formulario-maestro
  ↓
Formulario maestro contiene los datos del equipo
```

---

## 🗂️ Estructura de Archivos

### Frontend
```
app/
├── pages/herramientas/equipos/
│   └── [tipo].vue              # Página dinámica (inversores, generadores, etc)
│
├── stores/
│   └── equipmentStore.js       # Pinia store (estado en memoria)
│
└── data/
    ├── equipos_inversores.json
    ├── equipos_generadores.json
    ├── equipos_baterias.json
    └── equipos_modulos.json
```

### Backend
```
server/api/equipos/
├── [tipo]/
│   ├── guardar.post.js         # Agregar equipo
│   └── eliminar.delete.js      # Eliminar equipo
```

---

## 📝 Campos por Tipo

### ⚡ Inversores
```javascript
{
  id: "inv_mm9djjgozz2cbayoskj",
  marca: "Fronius",
  modelo: "Symo 5.0",
  potencia: "5.0",
  vccMaxima: "600V",
  vccMinima: "150V",
  conexion: "Monofásica",              // SELECT: Monofásica | Trifásica
  fechaCreacion: "2026-03-02T16:09:23Z"
}
```

### 🔧 Generadores
```javascript
{
  id: "gen_xxx",
  marca: "...",
  modelo: "...",
  potencia: "...",
  especificacion: "...",
  fechaCreacion: "..."
}
```

### 🔋 Baterías
```javascript
{
  id: "bat_xxx",
  marcaModelo: "...",
  tipoBateria: "...",
  tensionNominal: "...",
  profundidadDescarga: "...",
  tensionMaxima: "...",
  tensionMinima: "...",
  energiaTotal: "...",
  potenciaMaximaSalida: "...",
  fechaCreacion: "..."
}
```

### ☀️ Módulos
```javascript
{
  id: "mod_xxx",
  marca: "...",
  potenciaPicoModulo: "...",
  potenciaPicoGenerador: "...",
  intensidadIpmp: "...",
  tensionVpmp: "...",
  orientacion: "...",
  inclinacion: "...",
  totalModulos: "...",
  modulosEnSerie: "...",
  ramasEnParalelo: "...",
  disposicionModulos: "...",          // SELECT: opciones varias
  fechaCreacion: "..."
}
```

---

## 💾 Persistencia de Datos

### ✅ Qué se Persiste
- ✅ Equipos en archivos JSON (`app/data/equipos_*.json`)
- ✅ Disponibles siempre (incluso después de recargar)
- ✅ Compartidos entre todos los usuarios del servidor

### ❌ Qué NO se Persiste
- ❌ Datos temporales del formulario (solo en memoria)
- ❌ localStorage (reservado solo para `formDataMaestro`)

---

## 🔄 Mapeo de Campos al Formulario Maestro

Cuando haces click en **"Llevar"**, los campos se mapean así:

### Inversores
```javascript
marca         → e2_marcaModeloInversor
modelo        → e2_marcaModeloInversor
potencia      → e2_potenciaNominalInversor
vccMaxima     → e2_formaOndaSalidaInversor
vccMinima     → e2_frecuenciaNominalInversor
conexion      → e2_tipoConexionRed
```

### Generadores
```javascript
marca         → e2_marcaModelo
modelo        → e2_marcaModelo
potencia      → e2_potenciaPicoGenerador
especificacion → e2_orientacionGenerador
```

### Baterías
```javascript
marcaModelo           → e2_marcaModeloBateria
tipoBateria           → e2_tipoDeBateria
tensionNominal        → e2_tensionNominal
profundidadDescarga   → e2_profundidadDescarga
tensionMaxima         → e2_tensionMaximaBateria
tensionMinima         → e2_tensionMinimaBateria
energiaTotal          → e2_energiaTotal
potenciaMaximaSalida  → e2_potenciaMaximaSalida
```

### Módulos
```javascript
marca                 → e2_marcaModeloModulo
potenciaPicoModulo    → e2_potenciaPicoModulo
potenciaPicoGenerador → e2_potenciaPicoGeneradorModulos
intensidadIpmp        → e2_intensidadIpmp
tensionVpmp           → e2_tensionVpmp
orientacion           → e2_orientacionModulos
inclinacion           → e2_inclinacionModulos
totalModulos          → e2_numeroTotalModulos
modulosEnSerie        → e2_modulosEnSerie
ramasEnParalelo       → e2_ramasEnParalelo
disposicionModulos    → e2_disposicionModulos
```

---

## 🚀 Rutas de la Aplicación

```
/herramientas/equipos/inversores      → Gestión de inversores
/herramientas/equipos/generadores     → Gestión de generadores
/herramientas/equipos/baterias        → Gestión de baterías
/herramientas/equipos/modulos         → Gestión de módulos
```

---

## 📡 API Endpoints

### Guardar Equipo
```
POST /api/equipos/[tipo]/guardar
Content-Type: application/json

Body: {
  "marca": "...",
  "modelo": "...",
  "potencia": "...",
  ...
}

Response: {
  "success": true,
  "equipo": { id, marca, modelo, ... },
  "message": "Equipo agregado a [tipo]"
}
```

### Eliminar Equipo
```
DELETE /api/equipos/[tipo]/eliminar
Content-Type: application/json

Body: {
  "id": "inv_xxx"
}

Response: {
  "success": true,
  "equipo": { ... },
  "message": "Equipo eliminado de [tipo]"
}
```

---

## 🔧 Stores (Pinia)

### `equipmentStore.js`

**Estado:**
```javascript
inversores    // ref([...])
generadores   // ref([...])
baterias      // ref([...])
modulos       // ref([...])
```

**Métodos:**
```javascript
getEquipos(tipo)              // Retorna ref del array
agregarEquipo(tipo, datos)    // async - Guarda en API + actualiza array
eliminarEquipo(tipo, id)      // async - Elimina de API + actualiza array
obtenerEquipo(tipo, id)       // Busca un equipo por ID
restaurarDatos(tipo)          // Restaura datos por defecto del JSON
```

---

## 🎨 Componentes UI

### Página `[tipo].vue`

**Secciones:**
1. **Header** - Título, descripción, botón volver
2. **Formulario** - Campos dinámicos para agregar equipo
3. **Grid de Equipos** - Tarjetas con datos + acciones

**Botones Formulario:**
- 💾 Guardar - Envía datos a API
- ❌ Limpiar - Limpia campos del formulario

**Botones Tarjeta:**
- 📋 Llevar - Lleva datos al formulario maestro
- 🗑️ Eliminar - Elimina de API + actualiza vista

---

## ⚙️ Configuración EQUIPMENT_TYPES

En `[tipo].vue` existe un objeto de configuración:

```javascript
const EQUIPMENT_TYPES = {
  inversores: {
    label: 'Inversores',
    icon: '⚡',
    campos: ['marca', 'modelo', 'potencia', 'vccMaxima', 'vccMinima', 'conexion'],
    camposConfig: {
      conexion: { type: 'select', options: ['Monofásica', 'Trifásica'] }
    },
    fieldsMapping: { /* mapeo a formulario maestro */ }
  },
  // ... otros tipos
}
```

**Propiedades:**
- `label` - Nombre mostrado
- `icon` - Emoji para UI
- `campos` - Array de nombres de campos
- `camposConfig` - Configuración especial (select, etc)
- `fieldsMapping` - Mapeo a campos del formulario maestro

---

## 🔍 Validaciones

### Guardar
- Se valida que **al menos un campo esté lleno**
- Si está vacío → muestra alerta

### Eliminar
- Pide **confirmación** antes de eliminar
- Si cancelas → no se elimina

---

## 📤 Flujo Completo: Ejemplo

### Caso: Agregar Inversor nuevo

1. Usuario va a `/herramientas/equipos/inversores`
2. Ve formulario con 6 campos: marca, modelo, potencia, vccMaxima, vccMinima, conexion
3. Llena: marca="SMA", modelo="Sunny", potencia="5.5", conexion="Trifásica"
4. Click **Guardar**
5. Se ejecuta `guardarEquipo()` (async)
6. Envía POST a `/api/equipos/inversores/guardar` con los datos
7. Servidor:
   - Lee `app/data/equipos_inversores.json`
   - Agrega nuevo objeto con ID único
   - Guarda archivo actualizado
8. API retorna `{ success: true, equipo: {...} }`
9. JavaScript:
   - `equipmentStore.agregarEquipo()` hace push al array `inversores`
   - Formulario se limpia
   - Grid se renderiza con el nuevo inversor
10. Usuario ve la tarjeta nueva con el equipo agregado
11. Si recarga la página → el equipo sigue ahí (persiste en JSON)

---

## 🚨 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Por favor rellena al menos un campo" | Formulario vacío | Completa al menos un campo |
| "Cannot read property 'value'" | tipo.value es null | Espera a que la ruta se cargue |
| "Tipo de equipo no válido" | URL incorrecta | Usa `/herramientas/equipos/[tipo-valido]` |
| Equipo no aparece después de guardar | Error en API | Revisa consola del servidor |
| Los cambios desaparecen al recargar | Datos en memoria, no en archivo | Verifica que API persista correctamente |

---

## 📋 Checklist para Agregar Nuevo Tipo de Equipo

Si quieres agregar un nuevo tipo (ej: "controladores"):

- [ ] Crear `app/data/equipos_controladores.json` con estructura
- [ ] Agregar entrada en `EQUIPMENT_TYPES` en `[tipo].vue`
- [ ] Agregar `controladores` ref en `equipmentStore.js`
- [ ] Actualizar `getEquipos()` y `restaurarDatos()` en store
- [ ] Crear mapeo de campos en `fieldsMapping`
- [ ] Actualizar `computed equipos` en página

---

## 📚 Referencias

- [formStore.js](../app/stores/formStore.js) - Store del formulario maestro
- [masterFormFields.js](../app/config/masterFormFields.js) - Campos del formulario maestro
- [equipmentStore.js](../app/stores/equipmentStore.js) - Store de equipos
- [[tipo].vue](../app/pages/herramientas/equipos/[tipo].vue) - Página de herramientas
- [API Endpoints](../server/api/equipos/) - Endpoints del servidor

---

**Última actualización:** 2 de marzo de 2026
**Versión:** 1.0
