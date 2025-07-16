# 🧪 Malla Curricular de Química - Interactiva

Una aplicación web moderna e interactiva para visualizar y explorar la malla curricular del programa de **Química** de 10 semestres.

## 🎓 Características del Programa

- **Duración**: 10 semestres académicos
- **Enfoque**: Química Analítica, Orgánica, Fisicoquímica y Aplicaciones Ambientales
- **Créditos Totales**: Más de 300 créditos académicos
- **Práctica Profesional**: Practicantado de 55 créditos en el último semestre
- **Áreas de Especialización**: 
  - Química Analítica Avanzada
  - Química Orgánica y Productos Naturales
  - Fisicoquímica y Molecular
  - Química Ambiental y Agroquímicos
  - Bioquímica y Farmacognosia

## 🚀 Características

- **Diseño Responsivo**: Se adapta a cualquier dispositivo (móvil, tablet, desktop)
- **Interactividad Completa**: Click en materias para ver detalles
- **Sistema de Filtros**: Filtra por semestre y busca materias específicas
- **Visualización de Prerrequisitos**: Resalta dependencias entre materias
- **Estados de Materias**: Completadas, disponibles, bloqueadas
- **Categorización por Colores**: Formación básica, profesional, especialización, electivas
- **Modal de Detalles**: Información completa de cada materia
- **Estadísticas en Tiempo Real**: Créditos totales y materias visibles
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Atajos de Teclado**: Navegación rápida con el teclado

## 🎯 Funcionalidades

### Navegación
- **Filtro por Semestre**: Dropdown para mostrar semestres específicos
- **Búsqueda**: Campo de búsqueda para encontrar materias por nombre o código
- **Atajos de Teclado**:
  - `1-9`: Filtrar por semestre 1-9
  - `Shift+0`: Filtrar por semestre 10
  - `0`: Mostrar todos los semestres
  - `Ctrl+F`: Enfocar campo de búsqueda
  - `Esc`: Cerrar modal

### Interacciones
- **Click en Materia**: Abre modal con información detallada
- **Hover en Materia**: Resalta prerrequisitos en rojo
- **Animaciones**: Efectos visuales al interactuar con elementos

### Estados de Materias
- 🟢 **Completada**: Materia ya cursada y aprobada
- 🔵 **Disponible**: Materia que se puede cursar (prerrequisitos cumplidos)
- 🔴 **Bloqueada**: Materia con prerrequisitos pendientes
- 🟡 **En Progreso**: Materia actualmente en curso

## 🛠️ Personalización

### Modificar Materias

Edita el archivo `index.html` para agregar, quitar o modificar materias:

```html
<div class="subject professional" data-credits="4" data-code="CODIGO" data-prereq="PREREQ1,PREREQ2">
    <h3>Nombre de la Materia</h3>
    <p class="credits">4 créditos</p>
    <p class="code">CODIGO</p>
    <p class="prereq">Pre: PREREQ1, PREREQ2</p>
</div>
```

### Categorías de Materias

Cambia la clase CSS para asignar categorías:
- `basic`: Formación Básica (azul)
- `professional`: Formación Profesional (verde)
- `specialization`: Especialización (morado)
- `elective`: Electivas (naranja)

### Colores y Tema

Modifica las variables CSS en `estilos.css`:

```css
:root {
    --primary-color: #2c3e50;    /* Color principal */
    --secondary-color: #3498db;   /* Color secundario */
    --basic-color: #3498db;       /* Formación básica */
    --professional-color: #27ae60; /* Formación profesional */
    --specialization-color: #9b59b6; /* Especialización */
    --elective-color: #f39c12;    /* Electivas */
}
```

### Agregar Detalles de Materias

Edita el objeto `subjectDetails` en `scripts.js`:

```javascript
const subjectDetails = {
    'CODIGO': {
        name: 'Nombre de la Materia',
        description: 'Descripción detallada...',
        objectives: ['Objetivo 1', 'Objetivo 2'],
        topics: ['Tema 1', 'Tema 2'],
        professor: 'Nombre del Profesor',
        schedule: 'Horario de clases'
    }
};
```

## 🌐 Deployment en GitHub Pages

1. Sube los archivos a tu repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama (main/master)
4. Tu malla estará disponible en: `https://tu-usuario.github.io/nombre-repositorio`

## 📁 Estructura de Archivos

```
mallajuli/
├── index.html          # Estructura HTML principal
├── estilos.css         # Estilos y diseño
├── scripts.js          # Lógica JavaScript
└── README.md          # Documentación
```

## 🔧 Funciones Avanzadas

### API JavaScript Disponible

Abre la consola del navegador y usa:

```javascript
// Exportar datos de la malla
mallaCurricular.exportData()

// Imprimir malla curricular
mallaCurricular.print()

// Obtener materias sugeridas
mallaCurricular.suggestNext()

// Ver estadísticas por categoría
mallaCurricular.showStats()
```

### Personalizar Estados de Materias

Modifica la función `checkPrerequisites()` en `scripts.js` para conectar con tu sistema de notas:

```javascript
// Ejemplo: obtener desde API o localStorage
const completedSubjects = obtenerMateriasCompletadas();
```

## 🎨 Ejemplos de Uso

### Universidad de Ingeniería
- Materias de 8 semestres
- Categorización por área (básica, profesional, especialización)
- Sistema de prerrequisitos complejo

### Instituto Técnico
- Programas de 4-6 semestres
- Enfoque más práctico
- Materias electivas especializadas

### Programa de Posgrado
- Semestres variables
- Materias de investigación
- Flexibilidad en electivas

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:
- Reportar bugs
- Sugerir nuevas características
- Mejorar el diseño
- Agregar nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales o comerciales.

## 🆘 Soporte

Si necesitas ayuda:
1. Revisa la documentación
2. Busca en issues del repositorio
3. Crea un nuevo issue con detalles del problema

---

**¡Disfruta tu malla curricular interactiva!** 🎓✨
