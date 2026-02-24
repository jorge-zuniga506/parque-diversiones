// GET 
async function getAttractions() {
    try {
        const response = await fetch('http://localhost:3001/atracciones');
        const attractions = await response.json();

        return attractions;
    } catch (error) {
        console.error('Error al obtener atracciones:', error);
    }
}

//  POST
async function createAttraction(attraction) {
    try {
        const peticion = await fetch('http://localhost:3001/atracciones' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attraction)
        });
        const respuesta = await peticion.json();
        console.log(respuesta);
        window.location.reload();
        return respuesta;
    } catch (error) {
        console.error('Error al crear:', error);
    }
}


// PUT
async function updateAttraction(id, attraction) {
    try {
        await fetch(`http://localhost:3001/atracciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attraction)
        });
            window.location.reload();
    } catch (error) {
        console.error('Error al actualizar:', error);
    }
}

// DELETE
async function deleteAttraction(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta atracción?')) {
        try {
            await fetch(`http://localhost:3001/atracciones/${id}`, {
                method: 'DELETE'
            });
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
}

    export { getAttractions, createAttraction, deleteAttraction, updateAttraction };