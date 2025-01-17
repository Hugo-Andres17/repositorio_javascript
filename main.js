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


function filtrar(){
    let productoabuscar = prompt ("¿ Que producto buscas ?")

    productoabuscar = productoabuscar.trim().toUpperCase();

    let resultado = lista.filter(function(x) {
        return x.nombre.includes(productoabuscar);
    });


    if (resultado.length > 0) {
        console.table (resultado)
    }else{
        alert("no se encontro lo que buscas")
    }


}

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



