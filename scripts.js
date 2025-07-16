// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Variables globales
let allSubjects = [];
let filteredSubjects = [];
let currentFilter = 'all';
let searchQuery = '';
let completedSubjects = new Set(); // Materias completadas por el usuario

// Datos detallados de las materias de Química (editables por el usuario)
let subjectDetails = {
    'MAT01': {
        name: 'Matemática 01',
        description: 'Fundamentos matemáticos esenciales para química. Cálculo diferencial e integral aplicado a problemas químicos.',
        objectives: ['Dominar cálculo diferencial e integral', 'Aplicar matemáticas a problemas químicos', 'Desarrollar pensamiento analítico'],
        topics: ['Límites y continuidad', 'Derivadas y aplicaciones', 'Integrales definidas e indefinidas', 'Series y sucesiones'],
        professor: '',
        schedule: ''
    },
    'QGI': {
        name: 'Química General I',
        description: 'Introducción a los conceptos fundamentales de la química. Estructura atómica, enlaces químicos y termodinámica básica.',
        objectives: ['Comprender estructura atómica', 'Dominar conceptos de enlace químico', 'Aplicar leyes de la termodinámica'],
        topics: ['Estructura atómica', 'Tabla periódica', 'Enlaces químicos', 'Estequiometría', 'Termodinámica química'],
        professor: '',
        schedule: ''
    },
    'CBI': {
        name: 'Introducción a las Ciencias Biológicas I',
        description: 'Fundamentos de biología celular y molecular aplicados a la química.',
        objectives: ['Comprender estructura celular', 'Relacionar química y biología', 'Analizar procesos bioquímicos'],
        topics: ['Biología celular', 'Biomoléculas', 'Metabolismo celular', 'Genética molecular'],
        professor: '',
        schedule: ''
    },
    'PRL': {
        name: 'Prevención de Riesgos en el Laboratorio',
        description: 'Normas de seguridad y prevención de riesgos en laboratorios químicos.',
        objectives: ['Identificar riesgos químicos', 'Aplicar medidas preventivas', 'Manejar emergencias'],
        topics: ['Seguridad química', 'Manejo de residuos', 'Primeros auxilios', 'Normativas de seguridad'],
        professor: '',
        schedule: ''
    },
    'FIS101': {
        name: 'Física 101',
        description: 'Mecánica clásica y termodinámica aplicada a sistemas químicos.',
        objectives: ['Comprender mecánica clásica', 'Aplicar termodinámica', 'Resolver problemas físico-químicos'],
        topics: ['Mecánica de partículas', 'Termodinámica', 'Ondas y oscilaciones', 'Fluidos'],
        professor: '',
        schedule: ''
    },
    'QO101': {
        name: 'Química Orgánica 101',
        description: 'Fundamentos de química orgánica. Estructura, nomenclatura y reactividad de compuestos orgánicos.',
        objectives: ['Dominar nomenclatura orgánica', 'Comprender mecanismos de reacción', 'Predecir reactividad química'],
        topics: ['Hidrocarburos', 'Grupos funcionales', 'Estereoquímica', 'Mecanismos de reacción'],
        professor: '',
        schedule: ''
    },
    'QA1': {
        name: 'Química Analítica 1',
        description: 'Métodos clásicos de análisis químico cuantitativo y cualitativo.',
        objectives: ['Dominar técnicas analíticas', 'Realizar análisis cuantitativos', 'Interpretar resultados analíticos'],
        topics: ['Análisis gravimétrico', 'Análisis volumétrico', 'Equilibrios químicos', 'Estadística analítica'],
        professor: '',
        schedule: ''
    },
    'FQ101': {
        name: 'Fisicoquímica 101',
        description: 'Principios físicos aplicados a sistemas químicos. Termodinámica y cinética química.',
        objectives: ['Aplicar termodinámica química', 'Estudiar cinética de reacciones', 'Comprender equilibrios físico-químicos'],
        topics: ['Termodinámica química', 'Cinética química', 'Equilibrio químico', 'Fenómenos de superficie'],
        professor: '',
        schedule: ''
    },
    'BIOQ': {
        name: 'Bioquímica',
        description: 'Química de los procesos biológicos. Metabolismo y estructura de biomoléculas.',
        objectives: ['Comprender metabolismo celular', 'Analizar estructura de proteínas', 'Estudiar enzimología'],
        topics: ['Metabolismo de carbohidratos', 'Metabolismo de lípidos', 'Síntesis de proteínas', 'Regulación metabólica'],
        professor: '',
        schedule: ''
    },
    'FARM': {
        name: 'Farmacognosia',
        description: 'Estudio de medicamentos de origen natural. Principios activos de plantas medicinales.',
        objectives: ['Identificar principios activos', 'Analizar plantas medicinales', 'Desarrollar fitomedicamentos'],
        topics: ['Metabolitos secundarios', 'Extracción de principios activos', 'Control de calidad', 'Fitoquímica'],
        professor: '',
        schedule: ''
    },
    'AGQI': {
        name: 'Agroquímicos I',
        description: 'Química de pesticidas y fertilizantes. Aplicaciones en agricultura sostenible.',
        objectives: ['Comprender química de pesticidas', 'Desarrollar agroquímicos sostenibles', 'Evaluar impacto ambiental'],
        topics: ['Pesticidas orgánicos', 'Fertilizantes químicos', 'Residuos y toxicología', 'Agricultura sostenible'],
        professor: '',
        schedule: ''
    },
    'QAMB': {
        name: 'Química Ambiental',
        description: 'Procesos químicos en el medio ambiente. Contaminación y remediación.',
        objectives: ['Analizar contaminación química', 'Desarrollar métodos de remediación', 'Evaluar impacto ambiental'],
        topics: ['Contaminación atmosférica', 'Química de aguas', 'Contaminación del suelo', 'Tecnologías limpias'],
        professor: '',
        schedule: ''
    },
    'PRAC': {
        name: 'Practicantado',
        description: 'Práctica profesional en empresa o institución. Aplicación práctica de conocimientos adquiridos.',
        objectives: ['Aplicar conocimientos teóricos', 'Desarrollar competencias profesionales', 'Integrar saberes disciplinares'],
        topics: ['Práctica supervisada', 'Proyecto aplicado', 'Informe técnico', 'Evaluación profesional'],
        professor: '',
        schedule: ''
    }
};

// Inicialización de la aplicación
function initializeApp() {
    loadCompletedSubjects(); // Cargar materias completadas del localStorage
    loadSubjectDetails(); // Cargar detalles editados del localStorage
    loadSubjects();
    setupEventListeners();
    setupControlButtons(); // Configurar botones de control
    updateStats();
    updatePrerequisitesStatus();
    setupControlButtons();
}

// Cargar todas las materias
function loadSubjects() {
    allSubjects = Array.from(document.querySelectorAll('.subject'));
    filteredSubjects = [...allSubjects];
    
    // Agregar eventos de click a cada materia
    allSubjects.forEach(subject => {
        // Click derecho para mostrar detalles (modal)
        subject.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showSubjectDetails(subject);
        });
        
        // Click izquierdo para marcar/desmarcar como completada
        subject.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSubjectCompletion(subject);
        });
        
        // Hover para resaltar prerrequisitos
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
    const stats = getProgressStats();
    const visibleSubjects = document.querySelectorAll('.subject[style="display: block"], .subject:not([style*="display: none"])');
    const visibleCredits = Array.from(visibleSubjects).reduce((sum, subject) => {
        return sum + parseInt(subject.getAttribute('data-credits') || 0);
    }, 0);
    
    document.getElementById('totalCredits').textContent = `${stats.completedCredits}/${stats.totalCredits}`;
    document.getElementById('visibleSubjects').textContent = `${stats.completedCount}/${stats.totalSubjects} (${stats.progressPercentage}%)`;
    
    // Actualizar título del documento con progreso
    document.title = `Química - ${stats.progressPercentage}% completado`;
}

// Mostrar detalles de materia en modal con opción de edición
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
        professor: '',
        schedule: ''
    };
    
    const modal = document.getElementById('subjectModal');
    
    // Crear estructura del modal con header y body separados
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2 id="modalTitle">${details.name}</h2>
                <div class="modal-actions">
                    <button id="editBtn" class="btn btn-primary">✏️ Editar Información</button>
                    <button id="saveBtn" class="btn btn-success" style="display: none;">💾 Guardar</button>
                    <button id="cancelBtn" class="btn btn-secondary" style="display: none;">❌ Cancelar</button>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="modal-info">
                    <div class="info-section">
                        <h3><i class="fas fa-info-circle"></i> Información General</h3>
                        <p><strong>Código:</strong> ${code}</p>
                        <p><strong>Créditos:</strong> ${credits}</p>
                        <p><strong>Categoría:</strong> ${category}</p>
                        <p><strong>Prerrequisitos:</strong> ${prereq || 'Ninguno'}</p>
                        <p><strong>Estado:</strong> ${completedSubjects.has(code) ? '✅ Completada' : '⏳ Pendiente'}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-book"></i> Descripción</h3>
                        <div id="description-display">
                            <p>${details.description}</p>
                        </div>
                        <div id="description-edit" style="display: none;">
                            <textarea id="description-input" rows="3">${details.description}</textarea>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-target"></i> Objetivos</h3>
                        <div id="objectives-display">
                            <ul>
                                ${details.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>
                        <div id="objectives-edit" style="display: none;">
                            <textarea id="objectives-input" rows="4" placeholder="Escribe cada objetivo en una línea nueva">${details.objectives.join('\n')}</textarea>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-list"></i> Temas Principales</h3>
                        <div id="topics-display">
                            <ul>
                                ${details.topics.map(topic => `<li>${topic}</li>`).join('')}
                            </ul>
                        </div>
                        <div id="topics-edit" style="display: none;">
                            <textarea id="topics-input" rows="4" placeholder="Escribe cada tema en una línea nueva">${details.topics.join('\n')}</textarea>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-user"></i> Docente</h3>
                        <div id="professor-display">
                            <p>${details.professor || 'No especificado'}</p>
                        </div>
                        <div id="professor-edit" style="display: none;">
                            <input type="text" id="professor-input" value="${details.professor}" placeholder="Nombre del docente">
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-clock"></i> Horario</h3>
                        <div id="schedule-display">
                            <p>${details.schedule || 'No especificado'}</p>
                        </div>
                        <div id="schedule-edit" style="display: none;">
                            <input type="text" id="schedule-input" value="${details.schedule}" placeholder="Ejemplo: Lunes, Miércoles 8:00-10:00">
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-lightbulb"></i> Instrucciones</h3>
                        <p><strong>Click izquierdo:</strong> Marcar como completada/pendiente</p>
                        <p><strong>Click derecho:</strong> Ver/editar información detallada</p>
                        <p><strong>Hover:</strong> Resaltar prerrequisitos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Configurar eventos del modal
    setupModalEvents(code);
    
    // Mostrar modal y prevenir scroll del body
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    
    // Enfocar el modal body para permitir scroll con teclado
    setTimeout(() => {
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.focus();
            // Hacer scroll al inicio del contenido
            modalBody.scrollTop = 0;
        }
    }, 100);
}

// Configurar eventos del modal
function setupModalEvents(code) {
    const modal = document.getElementById('subjectModal');
    const closeBtn = modal.querySelector('.close');
    const editBtn = modal.querySelector('#editBtn');
    const saveBtn = modal.querySelector('#saveBtn');
    const cancelBtn = modal.querySelector('#cancelBtn');
    
    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Botones de edición
    editBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });
    
    saveBtn.addEventListener('click', () => {
        saveSubjectEdits(code);
        toggleEditMode(false);
    });
    
    cancelBtn.addEventListener('click', () => {
        toggleEditMode(false);
        // Recargar el modal para descartar cambios
        const subject = document.querySelector(`[data-code="${code}"]`);
        showSubjectDetails(subject);
    });
    
    // Manejar tecla Escape
    const handleEscape = (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Funciones de modal ya integradas en showSubjectDetails y setupModalEvents

// Alternar modo de edición
function toggleEditMode(editing) {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    const displayElements = ['description-display', 'objectives-display', 'topics-display', 'professor-display', 'schedule-display'];
    const editElements = ['description-edit', 'objectives-edit', 'topics-edit', 'professor-edit', 'schedule-edit'];
    
    if (editing) {
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        
        displayElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
        
        editElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'block';
        });
    } else {
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        
        displayElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'block';
        });
        
        editElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
    }
}

// Guardar ediciones de materia
function saveSubjectEdits(code) {
    const description = document.getElementById('description-input').value;
    const objectives = document.getElementById('objectives-input').value.split('\n').filter(obj => obj.trim() !== '');
    const topics = document.getElementById('topics-input').value.split('\n').filter(topic => topic.trim() !== '');
    const professor = document.getElementById('professor-input').value;
    const schedule = document.getElementById('schedule-input').value;
    
    // Actualizar los datos
    if (!subjectDetails[code]) {
        subjectDetails[code] = {};
    }
    
    subjectDetails[code] = {
        ...subjectDetails[code],
        description: description,
        objectives: objectives,
        topics: topics,
        professor: professor,
        schedule: schedule
    };
    
    // Guardar en localStorage
    saveSubjectDetails();
    
    // Mostrar notificación
    showNotification('Información actualizada correctamente', 'success');
    
    // Actualizar la vista
    const subject = document.querySelector(`[data-code="${code}"]`);
    showSubjectDetails(subject);
}

// setupModal ya no es necesario - integrado en setupModalEvents

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
        subject.style.border = '';
        subject.style.backgroundColor = '';
        subject.style.transform = '';
    });
}

// Eliminar función obsoleta ya que ahora usamos updatePrerequisitesStatus()
// function initializePrerequisites() - ELIMINADA

// Eliminar función obsoleta ya que ahora usamos updatePrerequisitesStatus()
// function checkPrerequisites() - ELIMINADA

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

// Funciones para el sistema de materias completadas

// Cargar materias completadas del localStorage
function loadCompletedSubjects() {
    const saved = localStorage.getItem('completedSubjects');
    if (saved) {
        completedSubjects = new Set(JSON.parse(saved));
    }
}

// Guardar materias completadas en localStorage
function saveCompletedSubjects() {
    localStorage.setItem('completedSubjects', JSON.stringify([...completedSubjects]));
}

// Cargar detalles editados de materias del localStorage
function loadSubjectDetails() {
    const saved = localStorage.getItem('subjectDetails');
    if (saved) {
        const savedDetails = JSON.parse(saved);
        // Combinar con los datos por defecto
        Object.keys(savedDetails).forEach(code => {
            if (subjectDetails[code]) {
                subjectDetails[code] = { ...subjectDetails[code], ...savedDetails[code] };
            }
        });
    }
}

// Guardar detalles editados en localStorage
function saveSubjectDetails() {
    localStorage.setItem('subjectDetails', JSON.stringify(subjectDetails));
}

// Alternar estado de completado de una materia
function toggleSubjectCompletion(subject) {
    const code = subject.getAttribute('data-code');
    
    if (completedSubjects.has(code)) {
        completedSubjects.delete(code);
        subject.classList.remove('completed');
        showNotification(`${subject.querySelector('h3').textContent} marcada como pendiente`, 'info');
    } else {
        completedSubjects.add(code);
        subject.classList.add('completed');
        showNotification(`${subject.querySelector('h3').textContent} marcada como completada ✓`, 'success');
    }
    
    saveCompletedSubjects();
    updatePrerequisitesStatus();
    updateStats();
}

// Actualizar estado de prerrequisitos y materias habilitadas
function updatePrerequisitesStatus() {
    allSubjects.forEach(subject => {
        const code = subject.getAttribute('data-code');
        const prereq = subject.getAttribute('data-prereq');
        
        // Limpiar clases previas
        subject.classList.remove('completed', 'available', 'blocked');
        
        if (completedSubjects.has(code)) {
            subject.classList.add('completed');
            subject.title = 'Materia completada ✓';
        } else if (prereq && prereq.trim() !== '') {
            const prereqCodes = prereq.split(',').map(code => code.trim());
            const prereqMet = prereqCodes.every(prereqCode => completedSubjects.has(prereqCode));
            
            if (prereqMet) {
                subject.classList.add('available');
                subject.title = 'Materia disponible para cursar 📚';
            } else {
                subject.classList.add('blocked');
                const pendingPrereqs = prereqCodes.filter(prereqCode => !completedSubjects.has(prereqCode));
                subject.title = `Prerrequisitos pendientes: ${pendingPrereqs.join(', ')} ⚠️`;
            }
        } else {
            // Sin prerrequisitos
            subject.classList.add('available');
            subject.title = 'Materia disponible para cursar 📚';
        }
    });
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Color según tipo
    if (type === 'success') notification.style.backgroundColor = '#27ae60';
    else if (type === 'error') notification.style.backgroundColor = '#e74c3c';
    else notification.style.backgroundColor = '#3498db';
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Funciones para botones de control

// Configurar event listeners para botones de control
function setupControlButtons() {
    document.getElementById('resetBtn').addEventListener('click', resetProgress);
    document.getElementById('exportBtn').addEventListener('click', exportProgress);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importProgress);
}

// Reiniciar todo el progreso
function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
        completedSubjects.clear();
        localStorage.removeItem('completedSubjects');
        localStorage.removeItem('subjectDetails');
        
        // Recargar datos por defecto
        location.reload();
        
        showNotification('Progreso reiniciado correctamente', 'info');
    }
}

// Exportar progreso a archivo JSON
function exportProgress() {
    const data = {
        completedSubjects: [...completedSubjects],
        subjectDetails: subjectDetails,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `malla-curricular-quimica-progreso-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Progreso exportado correctamente', 'success');
}

// Importar progreso desde archivo JSON
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.completedSubjects && Array.isArray(data.completedSubjects)) {
                completedSubjects = new Set(data.completedSubjects);
                saveCompletedSubjects();
            }
            
            if (data.subjectDetails && typeof data.subjectDetails === 'object') {
                Object.keys(data.subjectDetails).forEach(code => {
                    if (subjectDetails[code]) {
                        subjectDetails[code] = { ...subjectDetails[code], ...data.subjectDetails[code] };
                    }
                });
                saveSubjectDetails();
            }
            
            updatePrerequisitesStatus();
            updateStats();
            
            showNotification(`Progreso importado correctamente (${data.exportDate ? new Date(data.exportDate).toLocaleDateString() : 'fecha desconocida'})`, 'success');
        } catch (error) {
            showNotification('Error al importar el archivo. Verifica que sea un archivo válido.', 'error');
        }
    };
    
    reader.readAsText(file);
    
    // Limpiar el input
    event.target.value = '';
}

// Función para obtener estadísticas del progreso
function getProgressStats() {
    const totalSubjects = allSubjects.length;
    const completedCount = completedSubjects.size;
    const availableCount = allSubjects.filter(subject => {
        const code = subject.getAttribute('data-code');
        const prereq = subject.getAttribute('data-prereq');
        
        if (completedSubjects.has(code)) return false;
        
        if (!prereq || prereq.trim() === '') return true;
        
        const prereqCodes = prereq.split(',').map(code => code.trim());
        return prereqCodes.every(prereqCode => completedSubjects.has(prereqCode));
    }).length;
    
    const blockedCount = totalSubjects - completedCount - availableCount;
    
    const totalCredits = allSubjects.reduce((sum, subject) => {
        return sum + parseInt(subject.getAttribute('data-credits') || 0);
    }, 0);
    
    const completedCredits = [...completedSubjects].reduce((sum, code) => {
        const subject = allSubjects.find(s => s.getAttribute('data-code') === code);
        return sum + (subject ? parseInt(subject.getAttribute('data-credits') || 0) : 0);
    }, 0);
    
    return {
        totalSubjects,
        completedCount,
        availableCount,
        blockedCount,
        totalCredits,
        completedCredits,
        progressPercentage: Math.round((completedCount / totalSubjects) * 100)
    };
}

// ==============================================
// MODO EDICIÓN DE MALLA CURRICULAR
// ==============================================

// Variables para modo edición
let isEditMode = false;
let mallaData = {}; // Almacenar estructura de la malla

// Inicializar sistema de edición
function initializeEditMode() {
    loadMallaData();
    setupEditModeEvents();
}

// Cargar datos de la malla desde localStorage o crear estructura inicial
function loadMallaData() {
    const saved = localStorage.getItem('mallaData');
    if (saved) {
        mallaData = JSON.parse(saved);
    } else {
        // Extraer datos actuales del DOM
        extractMallaFromDOM();
    }
}

// Extraer estructura de malla del DOM actual
function extractMallaFromDOM() {
    mallaData = { subjects: {}, semesters: {} };
    
    // Extraer materias existentes
    allSubjects.forEach(subject => {
        const code = subject.getAttribute('data-code');
        const name = subject.querySelector('h3').textContent;
        const credits = parseInt(subject.getAttribute('data-credits'));
        const prereq = subject.getAttribute('data-prereq') || '';
        const category = getSubjectCategory(subject);
        const semester = getSemesterNumber(subject);
        
        mallaData.subjects[code] = {
            name,
            code,
            credits,
            prereq,
            category,
            semester,
            description: subjectDetails[code]?.description || '',
            objectives: subjectDetails[code]?.objectives || [],
            topics: subjectDetails[code]?.topics || [],
            professor: subjectDetails[code]?.professor || '',
            schedule: subjectDetails[code]?.schedule || ''
        };
    });
    
    // Extraer estructura de semestres
    for (let i = 1; i <= 10; i++) {
        mallaData.semesters[i] = {
            number: i,
            title: `${i}° Semestre`,
            subjects: Object.keys(mallaData.subjects).filter(code => 
                mallaData.subjects[code].semester === i
            )
        };
    }
    
    saveMallaData();
}

// Obtener categoría de materia del DOM
function getSubjectCategory(subject) {
    if (subject.classList.contains('basic')) return 'basic';
    if (subject.classList.contains('professional')) return 'professional';
    if (subject.classList.contains('specialization')) return 'specialization';
    if (subject.classList.contains('elective')) return 'elective';
    return 'basic';
}

// Obtener número de semestre del DOM
function getSemesterNumber(subject) {
    const semester = subject.closest('.semester');
    const semesterTitle = semester.querySelector('.semester-title').textContent;
    const match = semesterTitle.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
}

// Guardar datos de malla en localStorage
function saveMallaData() {
    localStorage.setItem('mallaData', JSON.stringify(mallaData));
}

// Configurar eventos para modo edición
function setupEditModeEvents() {
    document.getElementById('editModeBtn').addEventListener('click', toggleEditMode);
    document.getElementById('addSubjectBtn').addEventListener('click', showCreateSubjectModal);
    
    // Modal de edición de materias
    setupEditSubjectModal();
}

// Alternar modo edición
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editModeBtn');
    const addBtn = document.getElementById('addSubjectBtn');
    
    if (isEditMode) {
        document.body.classList.add('edit-mode');
        editBtn.innerHTML = '<i class="fas fa-eye"></i> Modo Vista';
        editBtn.title = 'Salir del modo edición';
        addBtn.style.display = 'block';
        
        // Agregar eventos de edición a materias existentes
        addEditEventListeners();
        showNotification('Modo edición activado. Click en las materias para editarlas', 'info');
    } else {
        document.body.classList.remove('edit-mode');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar Malla';
        editBtn.title = 'Activar modo edición';
        addBtn.style.display = 'none';
        
        // Remover eventos de edición
        removeEditEventListeners();
        showNotification('Modo vista activado', 'info');
    }
}

// Agregar eventos de edición a materias
function addEditEventListeners() {
    allSubjects.forEach(subject => {
        // Clonar elemento para limpiar eventos
        const newSubject = subject.cloneNode(true);
        subject.parentNode.replaceChild(newSubject, subject);
        
        // SOLO agregar evento de edición, sin eventos normales
        newSubject.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showEditSubjectModal(newSubject);
        });
        
        // Mantener estado visual si estaba completada
        const code = newSubject.getAttribute('data-code');
        if (completedSubjects.has(code)) {
            newSubject.classList.add('completed');
        }
    });
    
    // Actualizar referencia a allSubjects
    allSubjects = Array.from(document.querySelectorAll('.subject'));
}

// Remover eventos de edición
function removeEditEventListeners() {
    // Recrear elementos para limpiar TODOS los eventos
    allSubjects.forEach(subject => {
        const newSubject = subject.cloneNode(true);
        subject.parentNode.replaceChild(newSubject, subject);
        
        // Restaurar estado visual si estaba completada
        const code = newSubject.getAttribute('data-code');
        if (completedSubjects.has(code)) {
            newSubject.classList.add('completed');
        }
    });
    
    // Actualizar referencia y SOLO agregar eventos normales
    allSubjects = Array.from(document.querySelectorAll('.subject'));
    
    // Configurar SOLO eventos normales (sin eventos de edición)
    allSubjects.forEach(subject => {
        subject.addEventListener('click', function() {
            showSubjectDetails(this.getAttribute('data-code'));
        });
    });
    
    // Asegurar que los estados se actualicen correctamente
    updatePrerequisitesStatus();
    updateStats();
}

// Configurar modal de edición de materias
function setupEditSubjectModal() {
    const modal = document.getElementById('editSubjectModal');
    const closeBtn = document.getElementById('closeEditModal');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const deleteBtn = document.getElementById('deleteSubjectBtn');
    const form = document.getElementById('subjectForm');
    
    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        clearForm();
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Guardar materia
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveSubjectFromForm();
        closeModal();
    });
    
    // Eliminar materia
    deleteBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
            deleteCurrentSubject();
            closeModal();
        }
    });
}

// Mostrar modal para crear nueva materia
function showCreateSubjectModal() {
    const modal = document.getElementById('editSubjectModal');
    const title = document.getElementById('editModalTitle');
    const deleteBtn = document.getElementById('deleteSubjectBtn');
    
    title.textContent = 'Crear Nueva Materia';
    deleteBtn.style.display = 'none';
    clearForm();
    
    // Establecer valores por defecto
    document.getElementById('subjectSemester').value = '1';
    document.getElementById('subjectCategory').value = 'basic';
    
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    
    // Focus en primer campo
    document.getElementById('subjectName').focus();
}

// Mostrar modal para editar materia existente
function showEditSubjectModal(subject) {
    const modal = document.getElementById('editSubjectModal');
    const title = document.getElementById('editModalTitle');
    const deleteBtn = document.getElementById('deleteSubjectBtn');
    
    const code = subject.getAttribute('data-code');
    const subjectData = mallaData.subjects[code];
    
    title.textContent = 'Editar Materia';
    deleteBtn.style.display = 'block';
    
    // Llenar formulario con datos existentes
    document.getElementById('subjectName').value = subjectData.name;
    document.getElementById('subjectCode').value = subjectData.code;
    document.getElementById('subjectCredits').value = subjectData.credits;
    document.getElementById('subjectSemester').value = subjectData.semester;
    document.getElementById('subjectCategory').value = subjectData.category;
    document.getElementById('subjectPrereq').value = subjectData.prereq;
    document.getElementById('subjectDescription').value = subjectData.description;
    
    // Guardar referencia para edición
    modal.dataset.editingCode = code;
    
    modal.classList.add('show');
    document.body.classList.add('modal-open');
}

// Limpiar formulario
function clearForm() {
    document.getElementById('subjectForm').reset();
    document.getElementById('editSubjectModal').removeAttribute('data-editing-code');
}

// Guardar materia desde formulario
function saveSubjectFromForm() {
    const modal = document.getElementById('editSubjectModal');
    const isEditing = modal.hasAttribute('data-editing-code');
    const editingCode = modal.getAttribute('data-editing-code');
    
    const formData = {
        name: document.getElementById('subjectName').value.trim(),
        code: document.getElementById('subjectCode').value.trim().toUpperCase(),
        credits: parseInt(document.getElementById('subjectCredits').value),
        semester: parseInt(document.getElementById('subjectSemester').value),
        category: document.getElementById('subjectCategory').value,
        prereq: document.getElementById('subjectPrereq').value.trim(),
        description: document.getElementById('subjectDescription').value.trim()
    };
    
    // Validaciones
    if (!formData.name || !formData.code) {
        showNotification('Nombre y código son obligatorios', 'error');
        return;
    }
    
    // Verificar código único (excepto si estamos editando la misma materia)
    if (!isEditing || editingCode !== formData.code) {
        if (mallaData.subjects[formData.code]) {
            showNotification('Ya existe una materia con ese código', 'error');
            return;
        }
    }
    
    if (isEditing) {
        // Editar materia existente
        updateSubject(editingCode, formData);
    } else {
        // Crear nueva materia
        createSubject(formData);
    }
}

// Crear nueva materia
function createSubject(data) {
    // Agregar a mallaData
    mallaData.subjects[data.code] = {
        ...data,
        objectives: [],
        topics: [],
        professor: '',
        schedule: ''
    };
    
    // Agregar a semestre correspondiente
    if (!mallaData.semesters[data.semester].subjects.includes(data.code)) {
        mallaData.semesters[data.semester].subjects.push(data.code);
    }
    
    // Crear elemento DOM
    createSubjectElement(data);
    
    // Guardar y actualizar
    saveMallaData();
    saveSubjectDetails();
    updateAllSubjects();
    
    showNotification(`Materia "${data.name}" creada correctamente`, 'success');
}

// Actualizar materia existente
function updateSubject(oldCode, newData) {
    const oldData = mallaData.subjects[oldCode];
    const oldSemester = oldData.semester;
    
    // Si cambió el código, actualizar referencias
    if (oldCode !== newData.code) {
        // Remover código anterior
        delete mallaData.subjects[oldCode];
        
        // Actualizar prerrequisitos que referencien el código anterior
        Object.keys(mallaData.subjects).forEach(code => {
            const subject = mallaData.subjects[code];
            if (subject.prereq.includes(oldCode)) {
                subject.prereq = subject.prereq.replace(oldCode, newData.code);
            }
        });
        
        // Remover de semestre anterior
        mallaData.semesters[oldSemester].subjects = 
            mallaData.semesters[oldSemester].subjects.filter(code => code !== oldCode);
    }
    
    // Actualizar datos
    mallaData.subjects[newData.code] = {
        ...oldData,
        ...newData
    };
    
    // Si cambió de semestre, mover entre semestres
    if (oldSemester !== newData.semester) {
        if (oldCode === newData.code) {
            mallaData.semesters[oldSemester].subjects = 
                mallaData.semesters[oldSemester].subjects.filter(code => code !== oldCode);
        }
        
        if (!mallaData.semesters[newData.semester].subjects.includes(newData.code)) {
            mallaData.semesters[newData.semester].subjects.push(newData.code);
        }
    }
    
    // Actualizar subjectDetails para modal de detalles
    subjectDetails[newData.code] = {
        name: newData.name,
        description: newData.description,
        objectives: oldData.objectives || [],
        topics: oldData.topics || [],
        professor: oldData.professor || '',
        schedule: oldData.schedule || ''
    };
    
    // Actualizar completedSubjects si el código cambió
    if (oldCode !== newData.code && completedSubjects.has(oldCode)) {
        completedSubjects.delete(oldCode);
        completedSubjects.add(newData.code);
        saveCompletedSubjects();
    }
    
    // Recrear estructura DOM
    recreateCurriculum();
    
    showNotification(`Materia "${newData.name}" actualizada correctamente`, 'success');
}

// Eliminar materia actual
function deleteCurrentSubject() {
    const modal = document.getElementById('editSubjectModal');
    const code = modal.getAttribute('data-editing-code');
    
    if (!code) return;
    
    const subjectData = mallaData.subjects[code];
    
    // Verificar si hay materias que dependen de esta
    const dependentSubjects = Object.keys(mallaData.subjects).filter(subjCode => {
        const subject = mallaData.subjects[subjCode];
        return subject.prereq.includes(code);
    });
    
    if (dependentSubjects.length > 0) {
        const dependentNames = dependentSubjects.map(subjCode => mallaData.subjects[subjCode].name);
        showNotification(`No se puede eliminar: las siguientes materias dependen de esta: ${dependentNames.join(', ')}`, 'error');
        return;
    }
    
    // Eliminar de mallaData
    delete mallaData.subjects[code];
    
    // Remover de semestre
    mallaData.semesters[subjectData.semester].subjects = 
        mallaData.semesters[subjectData.semester].subjects.filter(subjCode => subjCode !== code);
    
    // Remover de completedSubjects
    if (completedSubjects.has(code)) {
        completedSubjects.delete(code);
        saveCompletedSubjects();
    }
    
    // Remover de subjectDetails
    delete subjectDetails[code];
    
    // Recrear DOM
    recreateCurriculum();
    
    showNotification(`Materia "${subjectData.name}" eliminada correctamente`, 'success');
}

// Crear elemento DOM para nueva materia
function createSubjectElement(data) {
    const semester = document.querySelector(`.semester:nth-child(${data.semester})`);
    if (!semester) return;
    
    const subjectsContainer = semester.querySelector('.subjects');
    
    const subjectElement = document.createElement('div');
    subjectElement.className = `subject ${data.category}`;
    subjectElement.setAttribute('data-credits', data.credits);
    subjectElement.setAttribute('data-code', data.code);
    subjectElement.setAttribute('data-prereq', data.prereq);
    
    subjectElement.innerHTML = `
        <h3>${data.name}</h3>
        <p class="credits">${data.credits} créditos</p>
        <p class="code">${data.code}</p>
        ${data.prereq ? `<p class="prereq">Pre: ${data.prereq}</p>` : ''}
    `;
    
    subjectsContainer.appendChild(subjectElement);
}

// Recrear toda la estructura del curriculum
function recreateCurriculum() {
    const curriculumGrid = document.getElementById('curriculumGrid');
    curriculumGrid.innerHTML = '';
    
    // Recrear semestres
    for (let i = 1; i <= 10; i++) {
        const semesterData = mallaData.semesters[i];
        if (semesterData.subjects.length === 0) continue; // Saltar semestres vacíos
        
        const semesterElement = document.createElement('div');
        semesterElement.className = 'semester';
        
        const semesterTitle = document.createElement('h2');
        semesterTitle.className = 'semester-title';
        semesterTitle.textContent = semesterData.title;
        
        const subjectsContainer = document.createElement('div');
        subjectsContainer.className = 'subjects';
        
        // Agregar materias del semestre
        semesterData.subjects.forEach(code => {
            const subjectData = mallaData.subjects[code];
            if (!subjectData) return;
            
            const subjectElement = document.createElement('div');
            subjectElement.className = `subject ${subjectData.category}`;
            subjectElement.setAttribute('data-credits', subjectData.credits);
            subjectElement.setAttribute('data-code', subjectData.code);
            subjectElement.setAttribute('data-prereq', subjectData.prereq);
            
            subjectElement.innerHTML = `
                <h3>${subjectData.name}</h3>
                <p class="credits">${subjectData.credits} créditos</p>
                <p class="code">${subjectData.code}</p>
                ${subjectData.prereq ? `<p class="prereq">Pre: ${subjectData.prereq}</p>` : ''}
            `;
            
            subjectsContainer.appendChild(subjectElement);
        });
        
        semesterElement.appendChild(semesterTitle);
        semesterElement.appendChild(subjectsContainer);
        curriculumGrid.appendChild(semesterElement);
    }
    
    // Actualizar referencias y eventos
    updateAllSubjects();
}

// Actualizar todas las referencias después de cambios
function updateAllSubjects() {
    allSubjects = Array.from(document.querySelectorAll('.subject'));
    
    // Configurar eventos según el modo actual SIN duplicar
    if (isEditMode) {
        // Solo eventos de edición
        allSubjects.forEach(subject => {
            // Limpiar eventos existentes
            const newSubject = subject.cloneNode(true);
            subject.parentNode.replaceChild(newSubject, subject);
            
            // Solo evento de edición
            newSubject.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showEditSubjectModal(newSubject);
            });
            
            // Mantener estado visual
            const code = newSubject.getAttribute('data-code');
            if (completedSubjects.has(code)) {
                newSubject.classList.add('completed');
            }
        });
        allSubjects = Array.from(document.querySelectorAll('.subject'));
    } else {
        // Solo eventos normales
        removeEditEventListeners();
    }
    
    // Actualizar estados
    updatePrerequisitesStatus();
    updateStats();
    saveMallaData();
    saveSubjectDetails();
}

// Exportar malla completa (estructura + progreso)
function exportFullMalla() {
    const data = {
        mallaData: mallaData,
        completedSubjects: [...completedSubjects],
        subjectDetails: subjectDetails,
        exportDate: new Date().toISOString(),
        version: '2.0',
        type: 'full-malla'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `malla-curricular-completa-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Malla completa exportada correctamente', 'success');
}

// Importar malla completa
function importFullMalla(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.type === 'full-malla' && data.mallaData) {
                // Confirmar importación
                if (!confirm('Esto reemplazará completamente tu malla actual. ¿Continuar?')) {
                    return;
                }
                
                // Importar estructura de malla
                mallaData = data.mallaData;
                saveMallaData();
                
                // Importar progreso si existe
                if (data.completedSubjects) {
                    completedSubjects = new Set(data.completedSubjects);
                    saveCompletedSubjects();
                }
                
                // Importar detalles si existen
                if (data.subjectDetails) {
                    subjectDetails = data.subjectDetails;
                    saveSubjectDetails();
                }
                
                // Recrear interfaz
                recreateCurriculum();
                
                showNotification('Malla completa importada correctamente', 'success');
            } else {
                // Intentar importar como progreso solamente
                importProgress({ target: { files: [file] } });
            }
        } catch (error) {
            showNotification('Error al importar el archivo', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Modificar función de importación existente para manejar ambos tipos
const originalImportProgress = importProgress;
importProgress = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.type === 'full-malla') {
                importFullMalla(file);
            } else {
                // Usar función original para progreso
                originalImportProgress(event);
            }
        } catch (error) {
            showNotification('Error al leer el archivo', 'error');
        }
    };
    
    reader.readAsText(file);
    event.target.value = '';
};

// Actualizar función de exportación para incluir opción de malla completa
const originalExportProgress = exportProgress;
exportProgress = function() {
    if (isEditMode) {
        if (confirm('¿Quieres exportar solo el progreso o la malla completa (estructura + progreso)?')) {
            exportFullMalla();
        } else {
            originalExportProgress();
        }
    } else {
        originalExportProgress();
    }
};

// Inicializar modo edición cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se inicialice la app principal
    setTimeout(() => {
        initializeEditMode();
    }, 100);
});

// Actualizar función de reset para incluir malla
const originalResetProgress = resetProgress;
resetProgress = function() {
    const message = isEditMode ? 
        '¿Estás seguro de que quieres reiniciar todo (estructura de malla + progreso)? Esta acción no se puede deshacer.' :
        '¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.';
    
    if (confirm(message)) {
        completedSubjects.clear();
        localStorage.removeItem('completedSubjects');
        localStorage.removeItem('subjectDetails');
        
        if (isEditMode) {
            localStorage.removeItem('mallaData');
        }
        
        location.reload();
    }
};

// Hacer algunas funciones globales para uso en consola
window.mallaCurricular = {
    exportData: exportCurriculumData,
    print: printCurriculum,
    generatePDF: generatePDF,
    suggestNext: suggestNextSubjects,
    showStats: showAdvancedStats,
    calculatePath: calculateCriticalPath
};
