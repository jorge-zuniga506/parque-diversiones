import { getAttractions, createAttraction, updateAttraction, deleteAttraction } from "../services/atracciones.js";

const API_URL = 'http://localhost:3000/atracciones';

// DOM
const form = document.getElementById('attraction-form');
const listContainer = document.getElementById('attractions-list');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');

// Inputs
const inputId = document.getElementById('attraction-id');
const inputNombre = document.getElementById('nombre');
const inputCategoria = document.getElementById('categoria');
const inputEstado = document.getElementById('estado');
const inputAltura = document.getElementById('altura');
const inputEspera = document.getElementById('espera');

// FUNCIONES

async function renderAttractions() {
    listContainer.innerHTML = '';
    const attractionList = await getAttractions();
    attractionList.forEach((attr) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${attr.nombre}</td>
            <td>${attr.categoria}</td>
            <td>${attr.estado}</td>
            <td>${attr.altura} cm</td>
            <td>${attr.espera}</td>
            <td>
                <button onclick="prepareEdit('${attr.id}')">Editar</button>
                <button onclick="deleteAttraction('${attr.id}')">Eliminar</button>
            </td>
        `;
        listContainer.appendChild(row);
    });
}

renderAttractions();



// Exponer funciones  botones 
window.deleteAttraction = deleteAttraction;
window.prepareEdit = async (id) => {
    // Obtener datos 
    const response = await fetch(`http://localhost:3001/atracciones/${id}`);
    const attr = await response.json();

    // llenar formulario
    inputId.value = attr.id;
    inputNombre.value = attr.nombre;
    inputCategoria.value = attr.categoria;
    inputEstado.value = attr.estado;
    inputAltura.value = attr.altura;
    inputEspera.value = attr.espera;

    // Cambiar botón
    btnSave.textContent = 'Actualizar Atracción';
    btnCancel.style.display = 'inline-block';
};

function resetForm() {
    form.reset();
    inputId.value = '';
    btnSave.textContent = 'Guardar Atracción';
    btnCancel.style.display = 'none';
}

// Eventos 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const attractionData = {
        nombre: inputNombre.value,
        categoria: inputCategoria.value,
        estado: inputEstado.value,
        altura: inputAltura.value,
        espera: inputEspera.value
    };

    const id = inputId.value;
    if (id) {
        updateAttraction(id, attractionData);
    } else {
        createAttraction(attractionData);
    }
});

btnCancel.addEventListener('click', resetForm);


getAttractions();