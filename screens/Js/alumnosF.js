document.addEventListener('DOMContentLoaded', () => {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const materias = JSON.parse(localStorage.getItem('materias')) || []; // Lista de materias
    const tablaAlumnos = document.getElementById('tablaAlumnos').querySelector('tbody');
    const botonAgregar = document.getElementById('botonAgregar');

    function renderTabla() {
        tablaAlumnos.innerHTML = '';
        alumnos.forEach((alumno, index) => {
            const fila = `
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.apellidos}</td>
                    <td>${alumno.grado}</td>
                    <td><button class="btn btn-primary" onclick="editarAlumno(${index})">Editar</button></td>
                    <td><button class="btn btn-red" onclick="eliminarAlumno(${index})">Eliminar</button></td>
                </tr>`;
            tablaAlumnos.innerHTML += fila;
        });
    }

    function eliminarAlumno(index) {
        alumnos.splice(index, 1);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
        renderTabla();
    }

    function cargarMateriasChecklist() {
        const checklist = document.getElementById('materiasChecklist');
        checklist.innerHTML = '';
        materias.forEach((materia) => {
            checklist.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="materia-${materia.id}">
                    <label class="form-check-label" for="materia-${materia.id}">${materia.nombre}</label>
                </div>`;
        });
    }

    botonAgregar.addEventListener('click', () => {
        window.location.href = 'alumnosView.html'; // Navegar al formulario
    });

    renderTabla();
    cargarMateriasChecklist();
});
