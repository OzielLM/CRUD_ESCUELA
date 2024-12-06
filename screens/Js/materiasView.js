const tablaMaterias = document.getElementById('tablaMaterias').querySelector('tbody');

/*const materiasPrueba = [
    { nombre: 'Arte' },
    { nombre: 'Matemáticas' },
    { nombre: 'Computación' },
];

if (!localStorage.getItem('materias')) {
    localStorage.setItem('materias', JSON.stringify(materiasPrueba));
}*/

let materias = JSON.parse(localStorage.getItem('materias')) || [];
let indexPorEliminar = null;

function renderizarTabla() {
    tablaMaterias.innerHTML = '';
    materias.forEach((materia, index) => {
        const fila = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${materia.nombre}</td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-primary btn-sm me-4" onclick="editarMateria(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm btn-red" data-bs-toggle="modal" data-bs-target="#eliminarMateria" onclick="eliminarMateria(${index})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
        tablaMaterias.innerHTML += fila;
    });
}

function editarMateria(index) {
    localStorage.setItem('index', index);
    window.location.href = 'materiasCM.html';
}

function eliminarMateria(index) {
    indexPorEliminar = index;
}

const botonConfirmarEliminar = document.getElementById('confirmarEliminar');
botonConfirmarEliminar.addEventListener('click', () => {
    if (indexPorEliminar !== null) {
        const materiaEliminada = materias[indexPorEliminar].nombre;

        materias.splice(indexPorEliminar, 1);
        localStorage.setItem('materias', JSON.stringify(materias));

        actualizarMateriasDeAlumnos(materiaEliminada);

        renderizarTabla();

        const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarMateria'));
        modal.hide();

        indexPorEliminar = null;
    }
});

function actualizarMateriasDeAlumnos(materiaEliminada) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    alumnos = alumnos.map((alumno) => {
        return {
            ...alumno,
            materias: alumno.materias.filter((materia) => materia !== materiaEliminada),
            calificaciones: alumno.calificaciones.filter((_, index) => alumno.materias[index] !== materiaEliminada),
        };
    });

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

document.getElementById('botonAgregar').addEventListener('click', function () {
    if (localStorage.getItem('index')) {
        localStorage.removeItem('index');
    }
    window.location.href = 'materiasCM.html';
});

renderizarTabla();