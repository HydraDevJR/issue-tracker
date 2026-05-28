# Issue Tracker

Aplicación web de tipo **Single Page Application (SPA)** para la gestión de reportes de errores e incidencias de software. Desarrollada con React 19 y Vite, ofrece un flujo CRUD completo con autenticación simulada, filtrado dinámico y una interfaz moderna y responsiva.

**[Ver demo en vivo →](https://URL_DEL_DEPLOY)**

---

## Características

- **Autenticación simulada** — inicio de sesión con nombre y rol; sesión persistida en `localStorage`
- **Protección de rutas** — redirección automática cuando no existe una sesión activa
- **CRUD completo** — crear, leer, actualizar y eliminar incidencias a través de un backend en MockAPI
- **Confirmación antes de eliminar** — diálogo de SweetAlert2 antes de cualquier operación destructiva
- **Filtro por prioridad** — filtrado en el cliente por Alta / Media / Baja sin peticiones adicionales a la API
- **Diseño responsivo** — layout con Tailwind CSS, header fijo, tarjetas con sombra suave y botón flotante (FAB)
- **Estados de carga y error** — spinner animado y alertas de error contextuales
- **Arquitectura modular** — custom hooks, contexto de autenticación y componentes reutilizables

---

## Tecnologías

| Tecnología | Propósito |
|---|---|
| React 19 + Vite | Framework de UI y empaquetador |
| React Router DOM v7 | Enrutamiento y protección de rutas |
| Tailwind CSS v3 | Estilos con clases de utilidad |
| Axios | Cliente HTTP para las llamadas a la API |
| SweetAlert2 | Diálogos de confirmación, éxito y error |
| MockAPI.io | Backend REST simulado con persistencia |

---

## Requisitos previos

- Node.js v18 o superior
- Cuenta gratuita en [MockAPI.io](https://mockapi.io) con un recurso `incidencias` creado

---

## Instalación y uso

**1. Clonar el repositorio**
```bash
git clone https://github.com/HydraDevJR/issue-tracker.git
cd issue-tracker
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=https://TU_PROYECTO.mockapi.io/incidencias
```

**4. Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

**5. Compilar para producción**
```bash
npm run build
npm run preview   # vista previa local del build de producción
```

---

## Configuración de MockAPI

Crea un recurso llamado `incidencias` en MockAPI con el siguiente esquema:

| Campo | Tipo | Valores de ejemplo |
|---|---|---|
| `id` | string | Autogenerado |
| `titulo` | string | Texto libre |
| `descripcion` | string | Texto libre |
| `estado` | string | `Pendiente`, `En Progreso`, `Resuelto` |
| `prioridad` | string | `Baja`, `Media`, `Alta` |

**Datos de prueba para poblar la API:**
```json
[
  {
    "titulo": "Error en login",
    "descripcion": "No redirige al dashboard",
    "estado": "Pendiente",
    "prioridad": "Alta"
  },
  {
    "titulo": "Estilos rotos en móvil",
    "descripcion": "Las tarjetas se salen del contenedor",
    "estado": "En Progreso",
    "prioridad": "Media"
  }
]
```

Una vez creado el recurso, copia la URL base en el archivo `.env`.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Button.jsx                  # Botón reutilizable con variantes
│   ├── Layout.jsx                  # Layout principal (header fijo + main)
│   └── dashboard/
│       ├── IncidenciaCard.jsx      # Tarjeta individual de incidencia
│       └── ModalForm.jsx           # Modal para crear y editar
├── constants/
│   └── incidenciaConstants.js      # Enums de estado y prioridad
├── contexts/
│   └── AuthContext.jsx             # Contexto global de autenticación
├── helpers/
│   ├── alerts.js                   # Helpers centralizados de SweetAlert2
│   └── local-storage.js            # localStorage con manejo de errores
├── hooks/
│   └── useIncidencias.js           # Lógica CRUD y estado de carga
├── pages/
│   ├── Login.jsx                   # Página de inicio de sesión
│   └── Dashboard.jsx               # Vista principal con listado y filtro
├── router/
│   ├── AppRouter.jsx               # Orquestación de rutas
│   ├── PrivateRoute.jsx            # Ruta protegida por autenticación
│   ├── PublicRoute.jsx             # Redirige si ya hay sesión activa
│   └── RootRedirect.jsx            # Redirección desde la raíz
├── services/
│   ├── api.js                      # Instancia de Axios y endpoints
│   └── auth.js                     # Gestión de sesión
├── App.jsx                         # Punto de entrada con AuthProvider
├── main.jsx                        # Renderizado e importación de estilos
└── index.css                       # Directivas de Tailwind
```

---

## Decisiones técnicas

- **Context API** para el estado global de autenticación, evitando prop drilling en el árbol de componentes
- **Custom hook `useIncidencias`** que encapsula todas las llamadas a la API y el estado local de carga y error
- **Alertas centralizadas** en `alerts.js` para mantener consistencia visual y facilitar cambios globales
- **Separación de responsabilidades** — los componentes de UI no conocen la fuente de datos ni la lógica de persistencia
- **Tailwind CSS** elegido por su flexibilidad y coste mínimo en producción gracias al tree-shaking de clases
- **GitFlow** con ramas `feature/*` y `develop`; commits semánticos con Conventional Commits

---

## Despliegue

El proyecto está listo para desplegarse en **Vercel** o **Netlify** sin configuración adicional.

### Vercel

1. Sube el repositorio a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Agrega `VITE_API_URL` en la sección **Environment Variables**
4. Despliega — Vite se detecta automáticamente

> Si las rutas de React Router devuelven 404 al recargar la página, agrega un archivo `vercel.json` en la raíz del proyecto:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```

### Netlify

Conecta tu repositorio, define `VITE_API_URL` como variable de entorno y configura:
- **Comando de build:** `npm run build`
- **Directorio de publicación:** `dist`

---

## Autor

**Tu Nombre** — tu-email@ejemplo.com  
GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)

---

## Licencia

Este proyecto es de uso libre con fines educativos y de demostración.