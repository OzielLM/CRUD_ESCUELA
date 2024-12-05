const tablaMaterias = document.getElementById('tablaMaterias').querySelector('tbody');

const materiasPrueba = [
    { nombre: 'Arte' },
    { nombre: 'Matemáticas' },
    { nombre: 'Computación' },
];

if (!localStorage.getItem('materias')) {
    localStorage.setItem('materias', JSON.stringify(materiasPrueba));
}

let materias = JSON.parse(localStorage.getItem('materias')) || [];

function renderizarTabla() {
    tablaMaterias.innerHTML = '';
    materias.forEach((materia, index) => {
        const fila = `
                <td><input type="checkbox"></td>
                <td>${materia.nombre}</td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-primary btn-sm me-4" onclick="editarMateria(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm btn-red" data-bs-toggle="modal" data-bs-target="#eliminarMateria" onclick="eliminarMateria(${index})">Eliminar</button>
                    </div>
                </td>
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
        materias.splice(indexPorEliminar, 1);
        indexPorEliminar = null;
        localStorage.setItem('materias', JSON.stringify(materias));
        renderizarTabla();
        const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarMateria'));
        modal.hide();
    }
});

document.getElementById('botonAgregar').addEventListener('click', function () {
    if (localStorage.getItem('index')) {
        localStorage.removeItem('index');
    }
    window.location.href = 'materiasCM.html';
});

renderizarTabla();