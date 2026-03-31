# Estándar de Documentos Profesionales - Solay

## Descripción General
Este documento define el estándar visual y de estructura para todos los documentos generados en el sistema de Solay. Aplicado actualmente a:
- `AutorizacionRepresentacion.vue`
- `DeclaracionHabilitacionProfesional.vue`

## Estructura Base del Componente

### 1. Contenedor Principal (`.contenedor-pdf`)
```css
- Tamaño: 210mm × 297mm (A4)
- Familia tipográfica: 'Segoe UI', Arial, sans-serif
- Color base: #333 (gris oscuro)
- Tamaño base: 15px
```

### 2. Encabezado (`.encabezado`)
```
┌─────────────────────────────────────────────┐
│ TÍTULO PRINCIPAL              [LOGO 100px]  │
│ Subtítulo                                    │
└─────────────────────────────────────────────┘
```
- **Borde inferior**: 2px sólido #0066cc (azul corporativo)
- **Títulos**: Color #0066cc
  - Principal: 24px bold
  - Secundario: 16px bold
- **Logo**: 100px × auto, margen izquierdo 15px

### 3. Contenido Principal (`.contenido-principal`)
- **Line-height**: 1.8
- **Font-size**: 14px
- **Estructura**: Flexbox columna, flex: 1

#### Párrafos
- `.parrafo-intro`: Margen 0 0 20px 0
- `.parrafo-declara`: Margen 15px 0 20px 0
- `.parrafo-fecha`: Centrado, bold, margen 40px 0 60px 0
- **Alineación**: Justificado

#### Títulos de Sección (`.titulo-declara`)
```css
- Font-size: 16px bold
- Color: #0066cc
- Alineación: Centro
- Borde superior/inferior: 1px solid #ccc
- Padding: 10px 0
- Margen: 20px 0
```

### 4. Elementos de Texto

#### Texto Fijo (`.texto-fijo`)
- **Color**: #000 (negro)
- **Font-weight**: normal
- Datos que no se editan desde el formulario

#### Texto Editable (`.texto-editable`)
- **Color**: #c41e3a (rojo profesional)
- **Font-weight**: bold
- Datos editables desde el formulario

### 5. Sección de Firmas (`.contenedor-firmas`)

```
          ┌──────────┐
          │  [FIRMA] │
          │          │
          └──────────┘
            FIRMA
```

- **Disposición**: Flexbox centrado
- **Ancho bloque firma**: 200px
- **Línea firma**: 
  - Altura: 80px
  - Borde inferior: 1px solid #000
  - Display: flex para centrar imagen

#### Imagen de Firma (`.imagen-firma`)
- **Height**: 100px
- **Object-fit**: contain
- **Margin-top**: -40px (posicionamiento)

#### Etiqueta (`.etiqueta-firma`)
- **Font-size**: 12px bold
- **Margen**: 0
- Texto: "FIRMA"

### 6. Pie de Página (`.pie-pagina`)
```
┌─────────────────────────────────┐
│      www.solay.es               │
│ Dirección y datos de contacto   │
│           Página 1              │
└─────────────────────────────────┘
```

- **Borde superior**: 1px solid #0066cc
- **Font-size**: 9px
- **Color**: #666 (gris)
- **Texto-pie margen**: 2px 0
- **Alineación**: Centro

## Paleta de Colores
| Elemento | Color | Uso |
|----------|-------|-----|
| Primario | #0066cc | Títulos, bordes, separadores |
| Texto editables | #c41e3a | Datos que cambian por formulario |
| Texto fijo | #000 | Datos que no cambian |
| Texto secundario | #666 | Etiquetas, pie de página |
| Fondo | #fff | Fondo del documento |
| Bordes auxiliares | #ccc | Separadores internos |

## Media Queries

### Print (@media print)
```css
- Font-size: 14px !important
- Width: 210mm
- Height: 297mm
- Padding: 20mm
- Margin: 0
- Box-shadow: none
- Page-break-after: avoid
```

### Screen (@media screen)
```css
- Font-size: 16px
- Max-width: 210mm
- Box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
- Margin: 20px auto
- Min-height: 350mm
- Padding: 10mm
```

## Cómo Aplicar a Nuevos Documentos

### Paso 1: Usar Clases Base
```vue
<div data-pdf-content class="contenedor-pdf">
  <div class="contenedor-principal">
    <!-- Encabezado -->
    <div class="encabezado">
      <div class="encabezado-contenido">
        <h1 class="titulo-principal">TÍTULO</h1>
        <h3 class="titulo-secundario">Subtítulo</h3>
      </div>
      <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
    </div>

    <!-- Contenido -->
    <div class="contenido-principal">
      <!-- Tu contenido aquí -->
    </div>

    <!-- Pie -->
    <div class="pie-pagina">
      <p class="texto-pie">www.solay.es</p>
      <p class="texto-pie">Dirección...</p>
    </div>
  </div>
</div>
```

### Paso 2: Importar Estilos Base
```css
<style scoped>
/* Copiar clases de AutorizacionRepresentacion.vue o DeclaracionHabilitacionProfesional.vue */
/* Solo agregar estilos específicos del documento */
</style>
```

### Paso 3: Respetar la Paleta
- Títulos: #0066cc
- Texto editable: #c41e3a
- Texto fijo: #000
- Borde primario: 2px solid #0066cc

## Notas Importantes

1. **A4 Size**: Siempre mantener 210mm × 297mm
2. **Font Family**: 'Segoe UI' es la fuente preferida (profesional y legible)
3. **Espaciados**: Usar multiples de 10px para consistencia
4. **Colores**: Usar exactamente los valores especificados
5. **Responsive**: Media queries print deben preservar colors exactos con `!important`
6. **Firma**: Usar `/firma-solay.png` para firma corporativa
7. **Logo**: Usar `/logo-solay.png` con ancho 100px

## Ejemplos de Componentes

### AutorizacionRepresentacion.vue
- ✅ Encabezado con logo
- ✅ Párrafo intro + autorizo + validez
- ✅ Dos firmas lado a lado
- ✅ Pie de página

### DeclaracionHabilitacionProfesional.vue
- ✅ Encabezado con logo
- ✅ Párrafos intro + declara
- ✅ Una firma centrada
- ✅ Pie de página

## Próximas Actualizaciones
- Crear componente base reutilizable (DocumentBase.vue)
- Exportar clases CSS a archivo compartido
- Crear tema CSS con variables
