# 🛠️ Guía de Inicio Rápido en Local (PC de Firma)

Sigue estos pasos para poner en marcha el proyecto en el ordenador que usarás para las tramitaciones oficiales:

### 1. Clonar e Instalar
```bash
# Entrar en la carpeta
cd GeneracionDocumentacion

# Instalar dependencias web
npm install

# Instalar los navegadores de Playwright (¡VITAL!)
npx playwright install chrome
```

### 2. Configurar el Entorno (.env)
Asegúrate de tener un archivo `.env` en la raíz con la conexión a tu base de datos:
```env
DATABASE_URL="postgres://usuario:password@51.91.159.188:5432/postgres"
```

### 3. Lanzar el Dashboard
```bash
npm run dev
```
Abre en tu Chrome: `http://localhost:3000`

### 4. Preparar Documentos
Crea una carpeta con el NOMBRE EXACTO del cliente en la raíz del proyecto (donde está el package.json).
Mete dentro los PDFs con sus prefijos:
- `1.- Autorizacion.pdf`
- `2.- Habilitacion.pdf`
- `7.- Certificado.pdf`

### 5. Ejecutar el Robot
1. Entra en el cliente desde el Dashboard.
2. Ve a la pestaña **PRESENTACIÓN**.
3. Pulsa **Lanzar Automatización**.
4. Se abrirá una ventana de Chrome. **No la cierres**.
5. Cuando el robot se pare en el login, elige tu certificado y dale a "OK".
6. En la ventana pequeña del Inspector de Playwright, dale al botón **▶ Resume** para que el robot continúe solo.

---
🚀 **¡Todo listo para automatizar!**
