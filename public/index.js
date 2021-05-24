
fetch("/api/mesas").then(res => res.jason()).then(function(respuesta){//esto recapitula los datos, siguiente paso¿Qué hacemos con ellos?

for (let i = 0; i < respuesta.contenido.length; i++) {
    parrafo += `<p>Tamaño: ${respuesta.contenido[i].tamaño}</p>`
    parrafo += `<p>Color: ${respuesta.contenido[i].color}</p>`
    parrafo += `<p>Material: ${respuesta.contenido[i].material}</p>`
    parrafo += `<p>patas: ${respuesta.contenido[i].patas}</p>`
}
})
function enviarInfo() {//a esta funcion llamamos cuando le damos al boton
    let tamaño = document.getElementById('tamaño').value;
    let color = document.getElementById('color').value;
    let material = document.getElementById('material').value;
    let patas = parseInt(document.getElementById('patas').value);
    let paquete = [//tiene qe ser un objeto para poder enviarlo a la funcion
        tamaño,
        color,
        material,
        patas
    ];

fetch('/api/anyadir', {//los post tienen que usar los fetch//tiene que estar dentro de la funcion porque lo queremos bajo demanda
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body:JSON.stringify(paquete)//solo lee json
})

.then((res) => res.json())
.then(function(respuesta){
    respuesta.error
    ? document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`

    : document.getElementById("feedback").innerHTML =`<p>Elemento correctamente guardado</p>`
})
}

function modificarInfo() {//a esta funcion llamamos cuando le damos al boton
    let ColorModificar = document.getElementById('ColorModificar').value;
    
fetch(`/api/modificar/${ColorModificar}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
    },
})

.then((res) => res.json())
.then(function(respuesta){
    respuesta.error
    ? document.getElementById("feedback").innerHTML =`<p>Error al modificar el elemento</p>`

    : document.getElementById("feedback").innerHTML =`<p>Elemento correctamente cambiado</p>`
})

}

function eliminarInfo() {//a esta funcion llamamos cuando le damos al boton
    let EliminarPatas = document.getElementById('EliminarPatas').value;

fetch(`/api/borrar/${EliminarPatas}`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json"
    },
})

.then((res) => res.json())
.then(function(respuesta){
    respuesta.error
    ? document.getElementById("feedback").innerHTML =`<p>Error al eliminar el elemento</p>`

    : document.getElementById("feedback").innerHTML =`<p>Elemento correctamente eliminado</p>`
})

}
