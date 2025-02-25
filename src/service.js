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


async function createSong() {
  const title = document.getElementById("title").value.trim();
  const group = parseInt(document.getElementById("group").value, 10); // Convertir a número
  const album = document.getElementById("album").value.trim();
  const year = parseInt(document.getElementById("year").value, 10);

  // Validar que todos los campos están llenos
  if (!title || !group || !album || isNaN(year)) {
      console.error("Por favor, completa todos los campos antes de añadir la película.");
      return; 
  }

  const newSong = {
    title: title,
    group: group,
    album: album,
    year: year
  };

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

document.getElementById("song-music_form").addEventListener("submit", async function (event) {
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
              <td>
              <button class="edit-btn"
              data-id="${song.id}" 
              data-title="${song.title}" 
              data-album="${song.year}" 
              data-group="${song.year}" 
              data-year="${song.director}">
              Editar
              </button>
              <button onclick="deleteFilm('${song.id}')">Delete</button></td>
            `;
            tbody.appendChild(row);
          });
        
          console.log("Tabla después de actualizar:", tbody.innerHTML); 
        }
        
        async function upDateSong(id){
          const renameSong = {
          title: document.getElementById("title").value.trim(),
          group: parseInt(document.getElementById("group").value, 10), 
          album: document.getElementById("album").value.trim(),
          year: parseInt(document.getElementById("year").value, 10)
          };
          try {
            const response = await fetch(`API_URL/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(renameSong)
              });
              
              console.log("Película actualizada exitosamente");
              printListMusic(); 
            } catch (error) {
              console.error("Error al actualizar la película:", error);
            }
          }

          async function handleSubmit(event) {
            event.preventDefault();
        
            const id = document.getElementById('songId').value;
            const title = document.getElementById('title').value;
            const group = document.getElementById('group').value;
            const album = document.getElementById('album').value;
            const year = document.getElementById('year').value;
            const songData = { title, group, album, year};
        
            if (id) {
                await updateSong(id, songData); // Si hay ID, se actualiza con PUT
            } else {
                await createSong(songData); // Si no hay ID, se crea con POST
            }
        
            document.getElementById('song-music_form').reset(); // Limpiar formulario
            document.getElementById('songId').value = ""; // Limpiar ID oculto
            printListMusic(); 
        }
        function fillUpdateForm(id, title, group, album, year) {
          document.getElementById('songId').value = id;
          document.getElementById('title').value = title;
          document.getElementById('group').value = group;
          document.getElementById('album').value = album;
          document.getElementById('year').value = year;
      }
     
      document.getElementById("music-table").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.dataset.id;
            deleteFilm(id);
        }
    
        if (event.target.classList.contains("edit-btn")) {
            const id = event.target.dataset.id;
            const title = event.target.dataset.title;
            const album = event.target.dataset.album;
            const group = event.target.dataset.group;
            const year = event.target.dataset.year;
            fillUpdateForm(id, title, album, group, year);
        }
    });
    
    
    document.getElementById('song-music_form').addEventListener('submit', handleSubmit);