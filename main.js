let titulo = document.createElement("p")
titulo.innerHTML= "<h1>Segundo proyecto</h1>" 

document.body.append(titulo)


const producto = function (nombre,precio,stock){

    this.nombre = nombre.toUpperCase()
    this.precio = precio
    this.stock = stock
}
let producto1 = new producto ("samsung s22", 1500000, 6)
let producto2 = new producto ("notebook hp", 2600000, 3)
let producto3 = new producto ("motorola g24", 240000, 10) 



let lista = [producto1, producto2, producto3]


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



