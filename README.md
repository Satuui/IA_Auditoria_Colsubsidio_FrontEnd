# Frontend — IA_Audt_Colsubsidio

Resumen breve
- Frontend del proyecto IA_Audt_Colsubsidio. Este README explica cómo levantar el entorno en Windows, dependencias habituales y pasos opcionales (OCR / Poppler) si el proyecto los requiere.

Requisitos mínimos
- Windows 10/11
- Node.js (LTS): 18.x o 20.x recomendados
- npm (incluido con Node.js) o yarn (opcional)
- Git (si clona el repositorio)

Instalación (pasos generales)
1. Abrir PowerShell o CMD en:
   c:\Users\Sebastian\OneDrive\Documentos\Prueba_Tecnica_INETUM\IA_Audt_Colsubsidio\frontend
2. Instalar dependencias:
   - Con npm:
     npm install
   - Con yarn:
     yarn

Variables de entorno
- Revise si existe un archivo `.env.example` o `.env.local`. Cree `.env` o `.env.local` con las variables requeridas (ejemplo común):
  VITE_API_URL=http://localhost:4000
  REACT_APP_API_URL=http://localhost:4000
- Ajuste las claves según el framework (Vite/React/Next). Si no hay variables, este paso puede omitirse.

Ejecutar en desarrollo
- Iniciar servidor de desarrollo:
  npm run dev
  o
  npm start
- Nota: Algunos proyectos usan `npm run dev` (Vite) y otros `npm start` (Create React App/Next). Use el script definido en package.json.

Build para producción
- Generar versión optimizada:
  npm run build
- Los archivos resultantes estarán en la carpeta indicada por el build (p. ej. `dist` o `build`).

Tests y lint (si aplica)
- Ejecutar tests:
  npm test
- Ejecutar linter:
  npm run lint
- Verifique package.json para scripts disponibles.

Dependencias nativas / OCR (solo si el proyecto las usa)
- Si el frontend o procesos del backend requieren OCR (Tesseract) o conversión PDF (Poppler), asegúrese de instalar las herramientas nativas en Windows y añadir sus rutas al PATH.
  - Tesseract (Windows):
    1. Descargar e instalar desde: https://github.com/UB-Mannheim/tesseract/wiki
    2. Ruta típica: C:\Program Files\Tesseract-OCR\
    3. Añadir al PATH (temporal en PowerShell):
       setx PATH "%PATH%;C:\Program Files\Tesseract-OCR\"
  - Poppler (Windows):
    1. Descargar binarios de Poppler (p. ej. con conda o builds windows).
    2. Colocar bin en: C:\poppler\Library\bin
    3. Añadir al PATH:
       setx PATH "%PATH%;C:\poppler\Library\bin"
- Verificar instalación:
  - tesseract --version
  - pdftoppm -h

Si no usa OCR/Poppler
- Omitir la sección anterior. No agregue rutas al PATH innecesarias.

Problemas comunes y soluciones rápidas
- Error de dependencias: borrar node_modules y package-lock.json y volver a instalar:
  rm -r node_modules
  del package-lock.json
  npm install
- Puerto ocupado: modificar variable de entorno o cerrar proceso que use el puerto.
- Scripts no encontrados: revisar package.json para scripts disponibles.

Cómo entregar para validación
- Asegúrese de incluir:
  - package.json actualizado
  - `.env.example` (si aplica)
  - instrucciones de puertos y URL del backend (ej: VITE_API_URL)
  - pasos para instalar Tesseract/Poppler solo si el proyecto los usa
