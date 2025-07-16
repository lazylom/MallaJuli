// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Variables globales
let allSubjects = [];
let filteredSubjects = [];
let currentFilter = 'all';
let searchQuery = '';

// Datos detallados de las materias de Química
const subjectDetails = {
    'MAT01': {
        name: 'Matemática 01',
        description: 'Fundamentos matemáticos esenciales para química. Cálculo diferencial e integral aplicado a problemas químicos.',
        objectives: ['Dominar cálculo diferencial e integral', 'Aplicar matemáticas a problemas químicos', 'Desarrollar pensamiento analítico'],
        topics: ['Límites y continuidad', 'Derivadas y aplicaciones', 'Integrales definidas e indefinidas', 'Series y sucesiones'],
        professor: 'Dr. Juan Pérez',
        schedule: 'Lunes, Miércoles, Viernes 8:00-10:00'
    },
    'QGI': {
        name: 'Química General I',
        description: 'Introducción a los conceptos fundamentales de la química. Estructura atómica, enlaces químicos y termodinámica básica.',
        objectives: ['Comprender estructura atómica', 'Dominar conceptos de enlace químico', 'Aplicar leyes de la termodinámica'],
        topics: ['Estructura atómica', 'Tabla periódica', 'Enlaces químicos', 'Estequiometría', 'Termodinámica química'],
        professor: 'Dra. María García',
        schedule: 'Martes, Jueves 8:00-11:00'
    },
    'CBI': {
        name: 'Introducción a las Ciencias Biológicas I',
        description: 'Fundamentos de biología celular y molecular aplicados a la química.',
        objectives: ['Comprender estructura celular', 'Relacionar química y biología', 'Analizar procesos bioquímicos'],
        topics: ['Biología celular', 'Biomoléculas', 'Metabolismo celular', 'Genética molecular'],
        professor: 'Dr. Carlos Rodríguez',
        schedule: 'Lunes, Miércoles 14:00-16:00'
    },
    'PRL': {
        name: 'Prevención de Riesgos en el Laboratorio',
        description: 'Normas de seguridad y prevención de riesgos en laboratorios químicos.',
        objectives: ['Identificar riesgos químicos', 'Aplicar medidas preventivas', 'Manejar emergencias'],
        topics: ['Seguridad química', 'Manejo de residuos', 'Primeros auxilios', 'Normativas de seguridad'],
        professor: 'Ing. Ana López',
        schedule: 'Viernes 14:00-18:00'
    },
    'FIS101': {
        name: 'Física 101',
        description: 'Mecánica clásica y termodinámica aplicada a sistemas químicos.',
        objectives: ['Comprender mecánica clásica', 'Aplicar termodinámica', 'Resolver problemas físico-químicos'],
        topics: ['Mecánica de partículas', 'Termodinámica', 'Ondas y oscilaciones', 'Fluidos'],
        professor: 'Dr. Roberto Silva',
        schedule: 'Martes, Jueves 14:00-16:00'
    },
    'QO101': {
        name: 'Química Orgánica 101',
        description: 'Fundamentos de química orgánica. Estructura, nomenclatura y reactividad de compuestos orgánicos.',
        objectives: ['Dominar nomenclatura orgánica', 'Comprender mecanismos de reacción', 'Predecir reactividad química'],
        topics: ['Hidrocarburos', 'Grupos funcionales', 'Estereoquímica', 'Mecanismos de reacción'],
        professor: 'Dra. Laura Mendoza',
        schedule: 'Lunes, Miércoles, Viernes 10:00-12:00'
    },
    'QA1': {
        name: 'Química Analítica 1',
        description: 'Métodos clásicos de análisis químico cuantitativo y cualitativo.',
        objectives: ['Dominar técnicas analíticas', 'Realizar análisis cuantitativos', 'Interpretar resultados analíticos'],
        topics: ['Análisis gravimétrico', 'Análisis volumétrico', 'Equilibrios químicos', 'Estadística analítica'],
        professor: 'Dr. Fernando Castro',
        schedule: 'Martes, Jueves 8:00-12:00'
    },
    'FQ101': {
        name: 'Fisicoquímica 101',
        description: 'Principios físicos aplicados a sistemas químicos. Termodinámica y cinética química.',
        objectives: ['Aplicar termodinámica química', 'Estudiar cinética de reacciones', 'Comprender equilibrios físico-químicos'],
        topics: ['Termodinámica química', 'Cinética química', 'Equilibrio químico', 'Fenómenos de superficie'],
        professor: 'Dr. Miguel Torres',
        schedule: 'Lunes, Miércoles, Viernes 14:00-17:00'
    },
    'BIOQ': {
        name: 'Bioquímica',
        description: 'Química de los procesos biológicos. Metabolismo y estructura de biomoléculas.',
        objectives: ['Comprender metabolismo celular', 'Analizar estructura de proteínas', 'Estudiar enzimología'],
        topics: ['Metabolismo de carbohidratos', 'Metabolismo de lípidos', 'Síntesis de proteínas', 'Regulación metabólica'],
        professor: 'Dra. Patricia Vargas',
        schedule: 'Martes, Jueves 10:00-13:00'
    },
    'FARM': {
        name: 'Farmacognosia',
        description: 'Estudio de medicamentos de origen natural. Principios activos de plantas medicinales.',
        objectives: ['Identificar principios activos', 'Analizar plantas medicinales', 'Desarrollar fitomedicamentos'],
        topics: ['Metabolitos secundarios', 'Extracción de principios activos', 'Control de calidad', 'Fitoquímica'],
        professor: 'Dra. Carmen Jiménez',
        schedule: 'Lunes, Viernes 8:00-11:00'
    },
    'AGQI': {
        name: 'Agroquímicos I',
        description: 'Química de pesticidas y fertilizantes. Aplicaciones en agricultura sostenible.',
        objectives: ['Comprender química de pesticidas', 'Desarrollar agroquímicos sostenibles', 'Evaluar impacto ambiental'],
        topics: ['Pesticidas orgánicos', 'Fertilizantes químicos', 'Residuos y toxicología', 'Agricultura sostenible'],
        professor: 'Dr. Ricardo Herrera',
        schedule: 'Miércoles, Viernes 14:00-16:00'
    },
    'QAMB': {
        name: 'Química Ambiental',
        description: 'Procesos químicos en el medio ambiente. Contaminación y remediación.',
        objectives: ['Analizar contaminación química', 'Desarrollar métodos de remediación', 'Evaluar impacto ambiental'],
        topics: ['Contaminación atmosférica', 'Química de aguas', 'Contaminación del suelo', 'Tecnologías limpias'],
        professor: 'Dra. Valeria Morales',
        schedule: 'Lunes, Miércoles 16:00-18:00'
    },
    'PRAC': {
        name: 'Practicantado',
        description: 'Práctica profesional en empresa o institución. Aplicación práctica de conocimientos adquiridos.',
        objectives: ['Aplicar conocimientos teóricos', 'Desarrollar competencias profesionales', 'Integrar saberes disciplinares'],
        topics: ['Práctica supervisada', 'Proyecto aplicado', 'Informe técnico', 'Evaluación profesional'],
        professor: 'Coordinador de prácticas',
        schedule: 'Tiempo completo en institución externa'
    }
};

// Inicialización de la aplicación
function initializeApp() {
    loadSubjects();
    setupEventListeners();
    updateStats();
    setupModal();
    initializePrerequisites();
}

// Cargar todas las materias
function loadSubjects() {
    allSubjects = Array.from(document.querySelectorAll('.subject'));
    filteredSubjects = [...allSubjects];
    
    // Agregar eventos de click a cada materia
    allSubjects.forEach(subject => {
        subject.addEventListener('click', () => showSubjectDetails(subject));
        subject.addEventListener('mouseenter', () => highlightPrerequisites(subject));
        subject.addEventListener('mouseleave', () => clearHighlights());
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Filtro por semestre
    const semesterFilter = document.getElementById('semesterFilter');
    semesterFilter.addEventListener('change', handleSemesterFilter);
    
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Teclas de acceso rápido
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Manejar filtro por semestre
function handleSemesterFilter(event) {
    currentFilter = event.target.value;
    filterSubjects();
}

// Manejar búsqueda
function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterSubjects();
}

// Filtrar materias
function filterSubjects() {
    const semesters = document.querySelectorAll('.semester');
    
    semesters.forEach((semester, index) => {
        const semesterNumber = (index + 1).toString();
        const subjects = semester.querySelectorAll('.subject');
        let visibleSubjectsInSemester = 0;
        
        subjects.forEach(subject => {
            const subjectName = subject.querySelector('h3').textContent.toLowerCase();
            const subjectCode = subject.getAttribute('data-code').toLowerCase();
            
            const matchesSemester = currentFilter === 'all' || currentFilter === semesterNumber;
            const matchesSearch = searchQuery === '' || 
                                subjectName.includes(searchQuery) || 
                                subjectCode.includes(searchQuery);
            
            if (matchesSemester && matchesSearch) {
                subject.style.display = 'block';
                subject.classList.add('fade-in');
                visibleSubjectsInSemester++;
            } else {
                subject.style.display = 'none';
                subject.classList.remove('fade-in');
            }
        });
        
        // Mostrar/ocultar semestre completo si no hay materias visibles
        if (currentFilter === 'all' || currentFilter === semesterNumber) {
            semester.style.display = visibleSubjectsInSemester > 0 ? 'block' : 'none';
        } else {
            semester.style.display = 'none';
        }
    });
    
    updateStats();
}

// Actualizar estadísticas
function updateStats() {
    const visibleSubjects = document.querySelectorAll('.subject[style="display: block"], .subject:not([style*="display: none"])');
    const totalCredits = Array.from(visibleSubjects).reduce((sum, subject) => {
        return sum + parseInt(subject.getAttribute('data-credits') || 0);
    }, 0);
    
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('visibleSubjects').textContent = visibleSubjects.length;
}

// Mostrar detalles de materia en modal
function showSubjectDetails(subject) {
    const code = subject.getAttribute('data-code');
    const name = subject.querySelector('h3').textContent;
    const credits = subject.getAttribute('data-credits');
    const prereq = subject.getAttribute('data-prereq');
    const category = getCategoryName(subject);
    
    const details = subjectDetails[code] || {
        name: name,
        description: 'Información detallada no disponible.',
        objectives: ['Información no disponible'],
        topics: ['Información no disponible'],
        professor: 'Por asignar',
        schedule: 'Por definir'
    };
    
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = details.name;
    
    modalBody.innerHTML = `
        <div class="modal-info">
            <div class="info-section">
                <h3><i class="fas fa-info-circle"></i> Información General</h3>
                <p><strong>Código:</strong> ${code}</p>
                <p><strong>Créditos:</strong> ${credits}</p>
                <p><strong>Categoría:</strong> ${category}</p>
                <p><strong>Prerrequisitos:</strong> ${prereq || 'Ninguno'}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-book"></i> Descripción</h3>
                <p>${details.description}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-target"></i> Objetivos</h3>
                <ul>
                    ${details.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-list"></i> Temas Principales</h3>
                <ul>
                    ${details.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-user"></i> Docente</h3>
                <p>${details.professor}</p>
            </div>
            
            <div class="info-section">
                <h3><i class="fas fa-clock"></i> Horario</h3>
                <p>${details.schedule}</p>
            </div>
        </div>
    `;
    
    document.getElementById('subjectModal').style.display = 'block';
}

// Configurar modal
function setupModal() {
    const modal = document.getElementById('subjectModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Obtener nombre de categoría
function getCategoryName(subject) {
    if (subject.classList.contains('basic')) return 'Formación Básica';
    if (subject.classList.contains('professional')) return 'Formación Profesional';
    if (subject.classList.contains('specialization')) return 'Especialización';
    if (subject.classList.contains('elective')) return 'Electiva';
    return 'Sin categoría';
}

// Resaltar prerrequisitos
function highlightPrerequisites(subject) {
    const prereq = subject.getAttribute('data-prereq');
    if (!prereq) return;
    
    const prereqCodes = prereq.split(',').map(code => code.trim());
    
    prereqCodes.forEach(code => {
        const prereqSubject = document.querySelector(`[data-code="${code}"]`);
        if (prereqSubject) {
            prereqSubject.style.border = '3px solid #e74c3c';
            prereqSubject.style.backgroundColor = '#fff5f5';
            prereqSubject.style.transform = 'scale(1.05)';
        }
    });
    
    // Resaltar la materia actual
    subject.style.border = '3px solid #27ae60';
    subject.style.backgroundColor = '#f0fff4';
}

// Limpiar resaltados
function clearHighlights() {
    allSubjects.forEach(subject => {
        subject.style.border = '2px solid transparent';
        subject.style.backgroundColor = '';
        subject.style.transform = '';
    });
}

// Inicializar sistema de prerrequisitos
function initializePrerequisites() {
    // Aquí podrías agregar lógica para verificar prerrequisitos
    // y marcar materias como disponibles, bloqueadas, etc.
    checkPrerequisites();
}

// Verificar prerrequisitos (simulado para Química)
function checkPrerequisites() {
    // Simular materias completadas (ejemplo: estudiante en 4° semestre)
    const completedSubjects = ['MAT01', 'QGI', 'CBI', 'PRL', 'FIS101', 'MAT03', 'ECO', 'MAT04', 'QGII', 'CBII', 'PRL2', 'QO101', 'QA1'];
    
    allSubjects.forEach(subject => {
        const code = subject.getAttribute('data-code');
        const prereq = subject.getAttribute('data-prereq');
        
        if (completedSubjects.includes(code)) {
            subject.classList.add('completed');
            subject.title = 'Materia completada ✓';
        } else if (prereq) {
            const prereqCodes = prereq.split(',').map(code => code.trim());
            const prereqMet = prereqCodes.every(prereqCode => completedSubjects.includes(prereqCode));
            
            if (prereqMet) {
                subject.classList.add('available');
                subject.title = 'Materia disponible para cursar 📚';
            } else {
                subject.classList.add('blocked');
                subject.title = `Prerrequisitos pendientes: ${prereq} ⚠️`;
            }
        } else {
            subject.classList.add('available');
            subject.title = 'Materia disponible para cursar 📚';
        }
    });
}

// Atajos de teclado
function handleKeyboardShortcuts(event) {
    // Esc para cerrar modal
    if (event.key === 'Escape') {
        document.getElementById('subjectModal').style.display = 'none';
    }
    
    // Ctrl+F para enfocar búsqueda
    if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Números 1-9 para filtrar por semestre (para 0, usar tecla especial)
    if (event.key >= '1' && event.key <= '9' && !event.ctrlKey && !event.altKey) {
        const target = event.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT') {
            document.getElementById('semesterFilter').value = event.key;
            handleSemesterFilter({ target: { value: event.key } });
        }
    }
    
    // 0 para mostrar todos, Shift+1 para semestre 10
    if (event.key === '0' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        const target = event.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT') {
            document.getElementById('semesterFilter').value = 'all';
            handleSemesterFilter({ target: { value: 'all' } });
        }
    }
    
    // Shift+0 para semestre 10
    if (event.key === ')' && event.shiftKey && !event.ctrlKey && !event.altKey) {
        const target = event.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT') {
            document.getElementById('semesterFilter').value = '10';
            handleSemesterFilter({ target: { value: '10' } });
        }
    }
}

// Funciones de utilidad adicionales

// Exportar datos de la malla curricular
function exportCurriculumData() {
    const data = {
        totalSubjects: allSubjects.length,
        totalCredits: Array.from(allSubjects).reduce((sum, subject) => {
            return sum + parseInt(subject.getAttribute('data-credits') || 0);
        }, 0),
        subjects: allSubjects.map(subject => ({
            code: subject.getAttribute('data-code'),
            name: subject.querySelector('h3').textContent,
            credits: parseInt(subject.getAttribute('data-credits')),
            prerequisites: subject.getAttribute('data-prereq') || '',
            category: getCategoryName(subject)
        }))
    };
    
    return data;
}

// Función para imprimir la malla curricular
function printCurriculum() {
    window.print();
}

// Función para generar reporte PDF (requeriría librería externa)
function generatePDF() {
    // Implementar con jsPDF o similar
    console.log('Función de PDF en desarrollo');
}

// Animaciones adicionales
function animateSubjectProgress(subjectCode, progress) {
    const subject = document.querySelector(`[data-code="${subjectCode}"]`);
    if (subject) {
        subject.style.background = `linear-gradient(90deg, #27ae60 ${progress}%, #ffffff ${progress}%)`;
        
        setTimeout(() => {
            subject.style.background = '';
        }, 2000);
    }
}

// Función para calcular ruta crítica (camino más largo)
function calculateCriticalPath() {
    // Implementar algoritmo para encontrar la secuencia más larga de prerrequisitos
    console.log('Calculando ruta crítica...');
}

// Función para sugerir materias próximas a cursar
function suggestNextSubjects() {
    const completedSubjects = Array.from(document.querySelectorAll('.subject.completed'))
        .map(subject => subject.getAttribute('data-code'));
    
    const availableSubjects = allSubjects.filter(subject => {
        const code = subject.getAttribute('data-code');
        const prereq = subject.getAttribute('data-prereq');
        
        if (completedSubjects.includes(code)) return false;
        
        if (!prereq) return true;
        
        const prereqCodes = prereq.split(',').map(code => code.trim());
        return prereqCodes.every(prereqCode => completedSubjects.includes(prereqCode));
    });
    
    return availableSubjects.map(subject => ({
        code: subject.getAttribute('data-code'),
        name: subject.querySelector('h3').textContent,
        credits: subject.getAttribute('data-credits')
    }));
}

// Función para mostrar estadísticas avanzadas
function showAdvancedStats() {
    const data = exportCurriculumData();
    const categories = {};
    
    data.subjects.forEach(subject => {
        if (!categories[subject.category]) {
            categories[subject.category] = { count: 0, credits: 0 };
        }
        categories[subject.category].count++;
        categories[subject.category].credits += subject.credits;
    });
    
    console.table(categories);
    return categories;
}

// Event listeners adicionales para funciones avanzadas
document.addEventListener('DOMContentLoaded', function() {
    // Agregar botones para funciones adicionales si es necesario
    
    // Ejemplo de uso de las funciones
    setTimeout(() => {
        const suggestions = suggestNextSubjects();
        console.log('Materias sugeridas:', suggestions);
        
        const stats = showAdvancedStats();
        console.log('Estadísticas por categoría:', stats);
    }, 2000);
});

// Hacer algunas funciones globales para uso en consola
window.mallaCurricular = {
    exportData: exportCurriculumData,
    print: printCurriculum,
    generatePDF: generatePDF,
    suggestNext: suggestNextSubjects,
    showStats: showAdvancedStats,
    calculatePath: calculateCriticalPath
};
