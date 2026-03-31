# Cómo extender los atributos de los campos (`fields`) en el formulario dinámico

## Contexto
En este proyecto, los formularios de documentos se generan de forma dinámica a partir de la configuración de cada documento (`fields` en el config). Cada campo puede tener atributos personalizados (como `pattern`, `maxlength`, `readonly`, etc.) que se quieren aplicar directamente al input HTML correspondiente.

## ¿Cómo estaba antes?
En el componente `DocumentForm.vue`, los inputs de tipo texto/email/tel se generaban así:

```vue
<input 
  v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
  v-model="formData[field.name]"
  :type="field.type"
  :placeholder="field.placeholder"
  class="..."
/>
```
Solo se aplicaban los atributos escritos explícitamente.

## ¿Qué se ha cambiado?
Ahora se usa `v-bind="field"` para que todos los atributos definidos en el objeto del campo se apliquen automáticamente al input:

```vue
<input 
  v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
  v-model="formData[field.name]"
  v-bind="field"
  class="..."
/>
```

## Ventajas
- Puedes añadir cualquier atributo HTML estándar o personalizado en la configuración del campo (`fields`).
- No necesitas modificar el formulario cada vez que quieras añadir un nuevo atributo.
- Ejemplo de uso en la config:

```js
{ name: 'codigoPostal', label: 'Código Postal', type: 'text', pattern: '[0-9]{5}', maxlength: 5 }
{ name: 'telefono', label: 'Teléfono', type: 'tel', pattern: '[0-9]{9}', required: true }
```

## Consideraciones
- Si tienes atributos que no deben ir al input (por ejemplo, `fullWidth`), deberás filtrarlos o gestionarlos aparte.
- Si algún campo requiere un tratamiento especial (por ejemplo, un select o textarea), sigue gestionándolo manualmente.
- Para revertir el cambio, vuelve a la versión anterior del input (ver bloque ANTES en el propio código).

## Ubicación del cambio
- Archivo: `app/components/DocumentForm.vue`
- Línea modificada: input de tipo texto/email/tel dentro del `v-for` de los campos.

---

**Este documento sirve como referencia para futuras modificaciones o para revertir el cambio si fuera necesario.**
