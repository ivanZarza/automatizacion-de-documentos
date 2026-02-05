# Documentación - Boton.vue

## Descripción
`Boton.vue` es un componente reutilizable de botón creado para dar consistencia visual y comportamental a la interfaz. Soporta variantes de color, tamaños, iconos (HTML), ancho completo y estados deshabilitados. Se diseñó para sustituir botones nativos en `DocumentModal.vue`, `DocumentForm.vue` y páginas.

## Ubicación
`app/components/Boton.vue`

## Props

- `type` (String) — Tipo HTML del botón. Default: `"button"`.
- `variant` (String) — Variante visual: `primary`, `secondary`, `success`, `danger`, `ghost`. Default: `"primary"`.
- `size` (String) — Tamaño: `sm`, `md`, `lg`. Default: `"md"` (actualmente no cambia mucho, preparado para extensiones).
- `fullWidth` (Boolean) — Si true ocupa todo el ancho. Default: `false`.
- `rounded` (Boolean) — Bordes redondeados. Default: `true`.
- `disabled` (Boolean) — Estado deshabilitado. Default: `false`.
- `icon` (String) — HTML del icono (puede ser emoji o SVG inline). Default: `''`.
- `classOverride` (String) — Permite pasar clases Tailwind adicionales o reemplazar estilos de variante.

## Comportamiento
- Emite el evento `click` al pulsar (se propaga tal cual desde el botón nativo).
- Aplica `opacity` y cursor cuando `disabled` es true.
- `classOverride` se concatena con las clases generadas; también se usa para mantener compatibilidad con códigos previos que pasaban `colorClass` desde `getModalOptions()`.

## Variantes soportadas
- `primary` — Fondo azul, texto blanco.
- `secondary` — Fondo gris oscuro, texto blanco.
- `success` — Fondo verde, texto blanco.
- `danger` — Fondo rojo, texto blanco.
- `ghost` — Sin fondo (transparent), texto oscuro.

## Ejemplos de Uso

### Uso básico
```vue
<Boton @click="openModal">Abrir</Boton>
```

### Variante y icono
```vue
<Boton variant="success" :fullWidth="true" icon="📄">Generar PDF</Boton>
```

### En formulario (botón submit)
```vue
<Boton type="submit" variant="success">Guardar Cambios</Boton>
```

### Pasando clases extra
```vue
<Boton classOverride="shadow-lg" variant="primary">Confirmar</Boton>
```

## Integración concreta (qué cambié)
- `DocumentModal.vue` ahora usa `Boton` para todas las opciones del modal. Las `options` devueltas por `useDocument.getModalOptions()` mantienen `colorClass`, que se pasa a `Boton` mediante `classOverride` para compatibilidad.
- `DocumentForm.vue` usa `Boton` como botón de envío (`type="submit" variant="success"`).
- `autorizacion-representacion.vue` sustituye los botones nativos por `Boton` (primary/secondary según contexto).

## Notas y recomendaciones
- Para iconos complejos usar SVG inline en la prop `icon` (ej: `'<svg ...></svg>'`).
- Si se usa un sistema de iconos externo (Heroicons, FontAwesome), pasar el HTML o envolver el icono en el slot.
- Mantener `classOverride` cuando se necesiten estilos puntuales (p. ej. `option.colorClass` generado dinámicamente).
- Añadir atributos ARIA manuales en el consumo si se requiere accesibilidad adicional (p. ej. `aria-label`).

## Ejemplo completo (DocumentModal)
```vue
<Boton
  v-for="option in options"
  :key="option.id"
  @click="option.action"
  :class-override="option.colorClass"
  class="w-full"
>
  <span v-if="option.icon" class="mr-2" v-html="option.icon"></span>
  {{ option.label }}
</Boton>
```

## Mejoras futuras
- Añadir soporte real para `size` (sm/md/lg).
- Soportar `loading` state con spinner integrado.
- Exponer eventos nativos adicionales (focus, blur) si es necesario.

---

Este documento explica el componente `Boton.vue` y cómo integrarlo en el sistema de generación de documentos. Si quieres, actualizo los archivos de documentación (`DocumentForm.md`, `AutorizacionRepresentacion.md`, `README.md`) para mostrar ejemplos con `Boton` y rutas de imágenes finales.
