const API_URL = "http://localhost:3000/musica";

document.getElementById("load-music").addEventListener("click", printListMusic);

async function listMusic() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Música obtenida:", data);
    return data;
  } catch (error) {
    console.error("Error obteniendo música:", error);
  }
}

async function getOneSong(title) {
  try {
      const response = await fetch(`${API_URL}?title=${title}`);
      if (response.ok) {
          const data = await response.json();
          return data.length > 0 ? data[0] : null; // Devuelve la primera coincidencia si existe
      } else {
          return null;
      }
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}

document.getElementById("confirm-search").addEventListener("click", async () => {
  searchSong();
});

document.getElementById("search-id").addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
      event.preventDefault();
      searchSong();
  }
});

async function searchSong() {
  const title = document.getElementById("search-id").value.trim();
  if (title) {
      const song = await getOneSong(title);
      if (song) {
          printOneSong(song);
      } else {
          alert("Canción no encontrada.");
      }
  }
}

function printOneSong(song) {
  const tbody = document.querySelector("#music-body");

  if (!tbody) {
      console.error("No se encontró el tbody en HTML");
      return;
  }

  tbody.innerHTML = "";

  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${song.id}</td>
      <td>${song.title}</td>
      <td>${song.group}</td>
      <td>${song.album}</td>
      <td>${song.year}</td>
      <td>
          <button class="edit-btn" data-id="${song.id}" 
              data-title="${song.title}" data-group="${song.group}" 
              data-album="${song.album}" data-year="${song.year}">
              Editar
          </button>
          <button class="delete-btn" data-id="${song.id}">Eliminar</button>
      </td>
  `;

  tbody.appendChild(row);

  row.querySelector(".delete-btn").addEventListener("click", function () {
      deleteSong(song.id);
  });

  row.querySelector(".edit-btn").addEventListener("click", function () {
      fillUpdateForm(song.id, song.title, song.group, song.album, song.year);
  });

  console.log("Canción impresa:", song);
}

async function createSong(songData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(songData)
    });

    if (response.ok) {
      console.log('Canción añadida:', await response.json());
      printListMusic();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateSong(id, updatedSong) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSong)
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la canción");
    }

    console.log("Canción actualizada exitosamente");
    printListMusic();
  } catch (error) {
    console.error("Error al actualizar la canción:", error);
  }
}

async function deleteSong(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Error al eliminar la canción");
    }

    console.log(`Canción con ID ${id} eliminada correctamente`);
    printListMusic();
  } catch (error) {
    console.error("Error al eliminar la canción:", error);
  }
}

async function printListMusic() {
  const playList = await listMusic();
  const tbody = document.querySelector("#music-body");

  if (!tbody) {
    console.error("No se encontró el tbody en HTML");
    return;
  }

  tbody.innerHTML = "";

  playList.forEach((song) => {
    console.log(`Agregando canción: ${song.id} - ${song.title}`);
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
                data-album="${song.album}" 
                data-group="${song.group}" 
                data-year="${song.year}">
                Editar
                </button>
                <button class="delete-btn" data-id="${song.id}">Eliminar</button>
            </td>
        `;
    tbody.appendChild(row);
  });

  console.log("Tabla después de actualizar:", tbody.innerHTML);
}

document.getElementById("music-table").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id;
    deleteSong(id);
  }

  if (event.target.classList.contains("edit-btn")) {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const group = event.target.dataset.group;
    const album = event.target.dataset.album;
    const year = event.target.dataset.year;
    fillUpdateForm(id, title, group, album, year);
  }
});

function fillUpdateForm(id, title, group, album, year) {
  document.getElementById('songId').value = id;
  document.getElementById('title').value = title;
  document.getElementById('group').value = group;
  document.getElementById('album').value = album;
  document.getElementById('year').value = year;
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const yearInput = document.getElementById('year').value.trim();

    
    if (!/^\d+$/.test(yearInput)) { 
        alert("El campo Year solo puede contener números enteros positivos.");
        return;
    }

    const id = document.getElementById('songId').value;  
    const title = document.getElementById('title').value.trim();
    const group = document.getElementById('group').value.trim();
    const album = document.getElementById('album').value.trim();
    const year = parseInt(yearInput, 10);

    if (!title || !group || !album || isNaN(year)) {
        alert("Por favor, rellene todos los campos.");
        return;
    }

    const songData = { title, group, album, year };

    if (id) {
        await updateSong(id, songData);
    } else {
        await createSong(songData); 
    }

    document.getElementById('song-music_form').reset();
    document.getElementById('songId').value = ""; 
  
  }
printListMusic();


document.getElementById('song-music_form').addEventListener('submit', handleSubmit);
