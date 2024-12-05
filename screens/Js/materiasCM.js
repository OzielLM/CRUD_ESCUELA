const formularioMateria = document.getElementById('formularioMateria');
let materias = JSON.parse(localStorage.getItem('materias')) || [];
const index = localStorage.getItem('index');

formularioMateria.addEventListener('submit', function(event) {
    console.log(formularioMateria);
    event.preventDefault();
    const nombre = document.getElementById('nombreMateriaCal').value;

    if(index!=null) {
        materias[index]={ nombre };
        localStorage.setItem("materias", JSON.stringify(materias));
        window.location.href='materiasView.html';
    } else {
        materias.push({ nombre });
        localStorage.setItem("materias", JSON.stringify(materias));
        window.location.href='materiasView.html';
    }
});

if(index!=null) {
    const materia = materias[index];
    document.getElementById('nombreMateriaCal').value = materia.nombre;
}