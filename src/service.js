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
