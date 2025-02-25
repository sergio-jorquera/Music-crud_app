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

  