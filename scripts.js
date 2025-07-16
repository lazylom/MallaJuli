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
    setupModal();
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
    
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = details.name;
    
    modalBody.innerHTML = `
        <div class="modal-info">
            <div class="modal-actions">
                <button id="editBtn" class="btn btn-primary">✏️ Editar Información</button>
                <button id="saveBtn" class="btn btn-success" style="display: none;">💾 Guardar</button>
                <button id="cancelBtn" class="btn btn-secondary" style="display: none;">❌ Cancelar</button>
            </div>
            
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
    `;
    
    // Configurar botones de edición
    setupEditButtons(code);
    
    document.getElementById('subjectModal').style.display = 'block';
}

// Configurar botones de edición en el modal
function setupEditButtons(code) {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    editBtn.addEventListener('click', () => {
        toggleEditMode(true);
    });
    
    saveBtn.addEventListener('click', () => {
        saveSubjectEdits(code);
        toggleEditMode(false);
    });
    
    cancelBtn.addEventListener('click', () => {
        toggleEditMode(false);
    });
}

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

// Hacer algunas funciones globales para uso en consola
window.mallaCurricular = {
    exportData: exportCurriculumData,
    print: printCurriculum,
    generatePDF: generatePDF,
    suggestNext: suggestNextSubjects,
    showStats: showAdvancedStats,
    calculatePath: calculateCriticalPath
};
