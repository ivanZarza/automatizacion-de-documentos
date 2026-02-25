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
| **Puerto** | `5433` ✅ |
| **Usuario** | `postgres` |
| **Contraseña** | `yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG` |
| **Base de datos** | `postgres` |
| **Tamaño** | 7.5 MB |
| **Tablas** | Vacía (0 tablas) |
| **URL Completa** | `postgres://postgres:yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG@51.91.159.188:5433/postgres` |

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

### Ejemplo 6: Analizar estructura completa
```
"@supabase dame un dump de la estructura completa de la base de datos"

Copilot mostrará todas las tablas, columnas, tipos, constraints e índices.
```

### Ejemplo 7: Información del servidor
```
"@supabase ¿cuál es el estado de la conexión a la base de datos?"

Copilot verificará la salud de la conexión.
```

---

## 🌐 Acceso desde CUALQUIER Proyecto

✅ **SÍ, puedes acceder desde cualquier proyecto**

El MCP está configurado **globalmente en VSCode**, no en un proyecto específico.

### Esto significa:

```
📁 Proyecto A (Nuxt)          → Puedes usar @supabase
📁 Proyecto B (React)         → Puedes usar @supabase  
📁 Proyecto C (Node.js)       → Puedes usar @supabase
📁 Proyecto D (Python)        → Puedes usar @supabase
Cualquier carpeta en VSCode   → Puedes usar @supabase
```

**Ejemplo:**
- Estás en `/home/ivan/dev/proyecto-nuxt/` → `@supabase dame las tablas`
- Cambias a `/home/ivan/dev/backend-node/` → `@supabase conecta con postgres`
- El MCP funciona igual en ambos

---

## 🔀 ALIAS y Múltiples MCPs

✅ **SÍ, puedes crear alias y múltiples MCPs para diferentes bases de datos**

En tu `settings.json`, actualmente tienes:

```json
"mcpServers": {
    "supabase": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:...@51.91.159.188:5433/postgres"]
    }
}
```

### Para añadir más MCPs con diferentes alias:

```json
"mcpServers": {
    "supabase": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:passwordXX@51.91.159.188:5433/postgres"]
    },
    "db-produccion": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@otro-servidor.com:5432/bd-produccion"]
    },
    "db-local": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:local@localhost:5432/local_db"]
    },
    "mysql-test": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-mysql", "mysql://user:pass@host:3306/database"]
    }
}
```

### Luego en Copilot usas:

```
@supabase ¿qué tablas tengo?
→ Conecta a 51.91.159.188:5433

@db-produccion dame usuarios activos
→ Conecta a producción

@db-local crea la tabla test
→ Conecta a base de datos local

@mysql-test lista de productos
→ Conecta a MySQL
```

---

## 📋 Configuración Recomendada para Múltiples Bases de Datos

### Estructura en `settings.json`:

```json
{
    "mcpServers": {
        "supabase": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG@51.91.159.188:5433/postgres"],
            "disabled": false
        },
        "prod-db": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@prod-server:5432/production"],
            "disabled": true
        },
        "dev-db": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://dev:pass@localhost:5432/development"],
            "disabled": false
        }
    }
}
```

**Con esto puedes:**
- ✅ Usar `@supabase` siempre
- ⚠️ Usar `@prod-db` (deshabilitado por defecto, habilita cuando necesites)
- ✅ Usar `@dev-db` para desarrollo local

---

## 🎯 Casos de Uso

| Caso | Alias | Comando |
|------|-------|---------|
| **Desarrollo** | `@dev-db` | `@dev-db crea tabla test` |
| **Pruebas** | `@supabase` | `@supabase inserta datos` |
| **Producción** | `@prod-db` | `@prod-db backup completo` |
| **Analytics** | `@analytics-db` | `@analytics-db dame estadísticas` |

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

- [x] VSCode reiniciado después de configurar MCP
- [x] `npm install -g @modelcontextprotocol/server-postgres` instalado
- [x] Puerto `5433` de `51.91.159.188` accesible ✅ VERIFICADO
- [x] Base de datos `postgres` accesible ✅ VERIFICADO (7.5 MB)
- [x] Copilot habilitado en VSCode
- [x] Usar `@supabase` en las preguntas
- [x] Settings.json actualizado con puerto correcto (5433)

---

## 🆘 Troubleshooting

### "No puedo conectar a la base de datos"
```
1. Verifica que 51.91.159.188:5433 sea accesible: 
   ping 51.91.159.188
   
2. Comprueba credenciales en settings.json

3. Verifica puerto correcto: 5433 (NO 5432)

4. Reinicia VSCode
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

### "¿Cómo cambio entre múltiples MCPs?"
```
1. Cada MCP necesita un alias único en settings.json
2. Usa ese alias en Copilot: @alias-nombre
3. Ejemplo:
   @supabase → conecta a supabase
   @prod-db → conecta a producción
   @local-db → conecta a local
```

### "¿Puedo usar el MCP desde múltiples proyectos?"
```
✅ SÍ, está configurado globalmente en VSCode
✅ Funciona desde cualquier carpeta abierta
✅ No necesitas configurar nada por proyecto
```

---

## 📚 Resumen Rápido

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cuántos MCPs puedo tener? | ∞ Ilimitados |
| ¿Funciona desde cualquier proyecto? | ✅ SÍ (global) |
| ¿Puedo poner alias? | ✅ SÍ (cualquier nombre) |
| ¿Puedo usar múltiples a la vez? | ✅ SÍ (@alias en chat) |
| ¿Necesito reinstalar por proyecto? | ❌ NO (global) |
| ¿Se comparte entre usuarios? | ❌ NO (por usuario) |
| ¿Puedo deshabilitar uno? | ✅ SÍ (disabled: true) |

---

## 📚 Referencias

- **MCP Oficial:** https://modelcontextprotocol.io/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Supabase Docs:** https://supabase.com/docs
- **Coolify:** http://51.91.159.188:8000/

---

**Última actualización:** 25 de febrero de 2026  
**Estado:** ✅ Operativo y Verificado  
**Conexión:** 51.91.159.188:5433 ✅ ACTIVA  
**Base de datos:** postgres (7.5 MB, vacía)  
**Tablas:** 0 (lista para crear)
