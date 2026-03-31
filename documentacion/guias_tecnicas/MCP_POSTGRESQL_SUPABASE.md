# MCP PostgreSQL - Supabase en Coolify

## 📌 Configuración del MCP

**Nombre del servidor MCP:** `supabase`

**Ubicación en VSCode:**
```json
// ~/.config/Code/User/settings.json
"mcpServers": {
    "supabase": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgres://postgres:yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG@51.91.159.188:5432/postgres"]
    }
}
```

---

## 🎯 Cómo referirse a la base de datos

### ✅ Formas CORRECTAS (usa el MCP):

```
1. "@supabase - ¿qué tablas tengo?"

2. "En mi MCP de PostgreSQL, ..."

3. "Usando el servidor supabase, ..."

4. "En la base de datos supabase deployada en Coolify, ..."

5. "En PostgreSQL en 51.91.159.188, ..."
```

### ❌ Formas a EVITAR (buscará en Google):

```
❌ "Cómo usar PostgreSQL" → Buscará en Google
❌ "Base de datos" → Muy genérico
❌ "SQL queries" → Buscará información general
```

---

## 📋 Props y Capacidades del MCP PostgreSQL

### Conexión

| Propiedad | Valor |
|-----------|-------|
| **Host** | `51.91.159.188` |
| **Puerto** | `5432` |
| **Usuario** | `postgres` |
| **Contraseña** | `yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG` |
| **Base de datos** | `postgres` |
| **URL Completa** | `postgres://postgres:yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG@51.91.159.188:5432/postgres` |

### Operaciones Disponibles

#### 1. **Listar Tablas**
```
"@supabase dame todas las tablas de la base de datos"
```
**Props:** 
- `schema` (opcional): Esquema (por defecto: `public`)
- `table_type` (opcional): Filtrar por tipo

#### 2. **Ver Estructura de una Tabla**
```
"@supabase muéstrame la estructura de la tabla [nombre_tabla]"
```
**Props:**
- `table_name` (requerido): Nombre de la tabla
- `schema` (opcional): Esquema (por defecto: `public`)

#### 3. **Ejecutar Queries SELECT**
```
"@supabase ejecuta: SELECT * FROM [tabla] WHERE [condición]"
```
**Props:**
- `query` (requerido): Query SQL
- `limit` (opcional): Número de resultados
- `offset` (opcional): Página de resultados

#### 4. **Crear Tabla**
```
"@supabase crea una tabla llamada [nombre] con columnas [...]"
```
**Props:**
- `table_name` (requerido): Nombre
- `columns` (requerido): Definición de columnas
- `schema` (opcional): Esquema

#### 5. **Ver Índices**
```
"@supabase muéstrame los índices de la tabla [nombre]"
```
**Props:**
- `table_name` (requerido): Nombre de tabla

#### 6. **Constraints y Relaciones**
```
"@supabase muéstrame las foreign keys/constraints de [tabla]"
```
**Props:**
- `table_name` (requerido): Nombre de tabla

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Listar todas las tablas
```
"@supabase ¿Qué tablas tengo en la base de datos supabase?"

Copilot usará el MCP y te mostrará todas las tablas disponibles.
```

### Ejemplo 2: Ver estructura de tabla
```
"@supabase muéstrame la estructura y columnas de la tabla usuarios"

Copilot mostrará todos los campos, tipos de datos y constraints.
```

### Ejemplo 3: Query con resultado
```
"@supabase ejecuta: SELECT * FROM usuarios LIMIT 10"

Copilot ejecutará el query y mostrará los primeros 10 registros.
```

### Ejemplo 4: Información de relaciones
```
"@supabase ¿cuáles son las relaciones entre las tablas?"

Copilot analizará las foreign keys y mostrará las relaciones.
```

### Ejemplo 5: Crear nueva tabla
```
"@supabase crea una tabla llamada 'productos' con las columnas: id (primary key), nombre (varchar), precio (decimal), created_at (timestamp)"
```

---

## 🔍 Tipos de Datos PostgreSQL Soportados

| Tipo | Ejemplo | Props |
|------|---------|-------|
| INTEGER | `42` | `NOT NULL`, `UNIQUE`, `PRIMARY KEY` |
| VARCHAR | `'texto'` | `VARCHAR(255)`, `LIMITED TO 255 CHARS` |
| TEXT | `'texto largo'` | Sin límite de caracteres |
| BOOLEAN | `true/false` | `DEFAULT TRUE` |
| TIMESTAMP | `2024-01-01` | `DEFAULT CURRENT_TIMESTAMP` |
| DECIMAL | `99.99` | `DECIMAL(10, 2)` |
| JSON | `{...}` | Almacena estructuras JSON |
| ARRAY | `[1,2,3]` | `INTEGER[]`, `TEXT[]` |
| UUID | `uuid-string` | `DEFAULT gen_random_uuid()` |

---

## 🛠️ Operaciones Avanzadas

### Transacciones
```
"@supabase ejecuta una transacción que: 
1. cree una tabla
2. inserte datos
3. actualice registros"
```

### Vista (Views)
```
"@supabase crea una vista llamada [nombre] que muestre [criterio]"
```

### Procedimientos Almacenados
```
"@supabase crea un stored procedure que [haga algo]"
```

### Triggers
```
"@supabase crea un trigger que se ejecute cuando se inserte en [tabla]"
```

---

## ⚙️ Parámetros Comunes en Queries

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `LIMIT` | Limitar resultados | `LIMIT 10` |
| `OFFSET` | Saltar resultados | `OFFSET 20` |
| `ORDER BY` | Ordenar | `ORDER BY fecha DESC` |
| `WHERE` | Filtro | `WHERE edad > 18` |
| `GROUP BY` | Agrupar | `GROUP BY categoria` |
| `JOIN` | Combinar tablas | `JOIN usuarios ON...` |
| `HAVING` | Filtro de grupos | `HAVING COUNT(*) > 5` |

---

## 📝 Script de Ejemplo Completo

```sql
-- 1. Ver todas las tablas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 2. Ver estructura de tabla
SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'usuarios';

-- 3. Ver constraints
SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = 'usuarios';

-- 4. Ver índices
SELECT indexname FROM pg_indexes WHERE tablename = 'usuarios';

-- 5. Ver foreign keys
SELECT constraint_name, table_name, column_name FROM information_schema.key_column_usage WHERE table_name = 'usuarios';
```

---

## 🔐 Seguridad

| Consideración | Recomendación |
|---------------|---------------|
| **Contraseña** | Se encripa en VSCode. No compartir `settings.json` |
| **Conexión** | Usa SSL si está disponible |
| **Queries** | El MCP es de solo lectura por defecto (agregar permisos según necesario) |
| **Rate Limiting** | No hay límite en MCP local |

---

## ✅ Checklist - Antes de usar

- [ ] VSCode reiniciado después de configurar MCP
- [ ] `npm install -g @modelcontextprotocol/server-postgres` instalado
- [ ] Puerto `5432` de `51.91.159.188` accesible
- [ ] Copilot habilitado en VSCode
- [ ] Usar `@supabase` en las preguntas

---

## 🆘 Troubleshooting

### "No puedo conectar a la base de datos"
```
1. Verifica que 51.91.159.188:5432 sea accesible: 
   ping 51.91.159.188
   
2. Comprueba credenciales en settings.json

3. Reinicia VSCode
```

### "Copilot sigue buscando en Google"
```
✅ Agrega @supabase al inicio de la pregunta
✅ Menciona "MCP" en la pregunta
✅ Dice "en mi base de datos" no solo "base de datos"
```

### "El MCP no aparece disponible"
```
1. Abre la terminal: Ctrl+`
2. Ejecuta: npm install -g @modelcontextprotocol/server-postgres
3. Reinicia VSCode
```

---

## 📚 Referencias

- **MCP Oficial:** https://modelcontextprotocol.io/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase Docs:** https://supabase.com/docs
- **Coolify:** http://51.91.159.188:8000/

---

**Última actualización:** 25 de febrero de 2026  
**Estado:** ✅ Operativo
