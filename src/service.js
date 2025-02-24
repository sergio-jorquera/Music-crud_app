const API_URL= "http://localhost:3000/musica"
document.getElementById("load-music").addEventListener("click",listMusic);





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
            console.log(`Agregando cancion:${musica.id}-${musica.titulo}`);
            tbody.insertAdjacentElement(
                "beforeen",
                `<tr>
                <td>${musica.id}</td>
                <td>${musica.titulo}</td>
                <td>${musica.grupo}</td>
                <td>${musica.album}</td>
                <td>${musica.año}</td>
                <td><button onclick ="print
                `
            )
        })
        
}