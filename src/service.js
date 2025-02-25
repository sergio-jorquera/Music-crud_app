const API_URL= "http://localhost:3000/musica"
document.getElementById("load-music").addEventListener("click", printListMusic);




async function listMusic() {
try { 
const response = await fetch(API_URL);
const data= await response.json();
console.log("Musica obtenida:",data)
return data;

} catch (error) {
    console.error("Error obteniendo musica:", error);
}
}


async function createSong(newSong) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSong)
        });

        if (response.ok) {
            console.log('Canción añadida:', await response.json());
            printListMusic();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById("filmForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    // Obtener valores de los inputs
    const title = document.getElementById("title").value;
    const group = document.getElementById("group").value;
    const album = document.getElementById("album").value;
    const year = document.getElementById("year").value;

    if (!title || !group || !album || !year) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear objeto de nueva canción
    const newSong = { title, group, album, year };

    // Llamar a la función para enviar los datos al servidor
    await createSong(newSong);

    // Limpiar el formulario después de guardar la canción
    document.getElementById("filmForm").reset();
});


async function printListMusic(){
        const playList = await listMusic();
        const tbody = document.querySelector("#music-body");
        if(!tbody){
            console.error("No se encontro el tbody en html");
            return;
        }
        tbody.innerHTML = "";

        playList.forEach((song) => {
            console.log(`Agregando cancion:${song.id}-${song.titulo}`);
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${song.id}</td>
              <td>${song.title}</td>
              <td>${song.group}</td>
              <td>${song.album}</td>
              <td>${song.year}</td>
              <td><button onclick="openEditForm('${song.id}')">Modificar</button></td>
              <td><button onclick="deleteFilm('${song.id}')">Delete</button></td>
            `;
            tbody.appendChild(row);
          });
        
          console.log("Tabla después de actualizar:", tbody.innerHTML); 
        }
        
        