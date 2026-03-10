# ✨ Modern Task Manager (React + Vite)

🚀 **Despliegue en Vercel:** [https://react-template-beige.vercel.app/](https://react-template-beige.vercel.app/)

Esta es una aplicación de gestión de tareas avanzada construida con **React**, diseñada con un enfoque en la experiencia de usuario (UX), persistencia de datos y microinteracciones fluidas. La aplicación permite organizar tareas diarias con niveles de prioridad, filtros dinámicos y una interfaz moderna y adaptativa.

---

## 🛠️ Tecnologías Utilizadas

* **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Build tool de alto rendimiento).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Diseño responsivo y utilitario).
* **Animaciones:** [Motion for React](https://motion.dev/) (Entradas, salidas y transiciones de lista).
* **Persistencia:** `localStorage` nativo mediante Custom Hooks.
* **Estado:** Hooks avanzados de React (`useMemo`, `useCallback`, `useRef`).

---

## 🌟 Características Principales

### 1. Gestión Completa de Tareas (CRUD)
* **Crear:** Añadir tareas con validación de duplicados y campos vacíos.
* **Priorizar:** Selector de prioridad (Baja 🟢, Media 🟡, Alta 🔴) con ordenación visual automática.
* **Editar (Detalle Nuevo):** Se ha implementado la edición inline. Al hacer doble clic sobre el texto de una tarea o pulsar el icono ✏️, el texto se convierte en un campo editable.
* **Eliminar:** Borrado individual con animación de salida o limpieza masiva de tareas completadas.

### 2. UX y Control de Datos
* **Persistencia Total:** Los datos se sincronizan automáticamente con el navegador usando el hook `useLocalStorage`.
* **Búsqueda con Debounce:** Filtro de búsqueda optimizado que espera a que el usuario deje de escribir para procesar los resultados, mejorando el rendimiento.
* **Filtros de Visibilidad:** Componente para ocultar tareas completadas y visualizar solo lo pendiente.
* **Indicadores de Guardado:** Feedback visual en tiempo real que confirma cuando los cambios han sido persistidos.

### 3. Diseño y Accesibilidad
* **Layout Avanzado:** Estructura de panel doble (Dashboard) en pantallas grandes y vista simplificada en móviles.
* **Modo Oscuro:** Soporte nativo para `Dark Mode` sincronizado con las preferencias del sistema.
* **Animaciones:** Uso de `AnimatePresence` y `layout` de Motion para que la lista se reordene de forma fluida al añadir o quitar elementos.
* **Accesibilidad:** Uso de etiquetas `aria-label` en botones de iconos y contrastes optimizados.

---

## 🏗️ Arquitectura de Hooks Personalizados

El proyecto separa la lógica del estado mediante hooks específicos:

* `useLocalStorage`: Abstrae la API de almacenamiento para que el estado de React sea persistente.
* `useDebounce`: Controla la frecuencia de actualización del término de búsqueda.
* `useToggle`: Simplifica la gestión de estados booleanos.
* `useIsFirstRender`: Controla los efectos que solo deben dispararse tras el montaje inicial.

---

## 🚀 Instalación Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Generar versión de producción:**
    ```bash
    npm run build
    ```

---

> **Nota de Implementación:** El detalle nuevo de **edición de tareas** utiliza un estado local de edición dentro de cada `TaskItem` y un `useRef` para hacer foco automático en el input al activar el modo edición, asegurando una experiencia de usuario fluida sin recargas.
