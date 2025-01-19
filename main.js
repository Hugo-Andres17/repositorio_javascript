let titulo = document.createElement("p")
titulo.innerHTML= "<h1>Tercer proyecto</h1>" 

document.body.append(titulo)




const producto = function (nombre,precio,stock){

    this.nombre = nombre.toUpperCase()
    this.precio = precio
    this.stock = stock
}
let producto1 = new producto ("Brahma", 1500000, 6)
let producto2 = new producto ("Quilmes", 2600000, 3)
let producto3 = new producto ("Budwaiser", 240000, 10) 
let producto4 = new producto ("Heineken", 2400, 12) 
let producto5 = new producto ("AndesIpa", 2300, 16) 
let producto6 = new producto ("AmberLager", 2250, 8) 



let lista = [producto1, producto2, producto3, producto4, producto5, producto6]


// Función para filtrar productos por el título
function filtrar(event) {
    event.preventDefault(); // Prevenir el envío del formulario y recarga de la página
    
    // Obtener el valor del campo de búsqueda
    let productoabuscar = document.getElementById("searchInputNavbar").value.trim().toLowerCase();
    
    // Obtener todas las tarjetas de producto
    let cards = document.querySelectorAll(".card");

    // Recorrer todas las tarjetas
    cards.forEach(card => {
        // Obtener el título de cada tarjeta
        let titulo = card.querySelector(".card-title").textContent.trim().toLowerCase();
        
        // Comprobar si el título contiene el texto de búsqueda
        if (titulo.includes(productoabuscar)) {
            card.style.display = "block";  // Mostrar la tarjeta
        } else {
            card.style.display = "none";   // Ocultar la tarjeta
        }
    });
}

// Agregar un "event listener" al formulario de búsqueda
document.querySelector("form[role='search']").addEventListener("submit", filtrar);


function agregar(){

    let nombre= prompt("ingresa el nombre del producto que desea ingresar")
    let precio= prompt("ingresa el precio del producto")
    let stock= prompt("ingresa el stock del producto")


    if(isNaN(precio)|| isNaN(stock)|| nombre ==""){
        alert("no ingresaste el dato solicitado")
        return
    }

    precio = parseFloat (precio)
    stock = parseInt (stock)

    let nuevoproducto = new producto (nombre.toUpperCase(), precio, stock)
    lista.push (nuevoproducto)

    console.table (lista) 
}



