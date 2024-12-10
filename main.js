function loguear (){

    let identificar = true
    let intentos = 1


    do{

        let usuario = prompt ("ingresa tu usuario").toUpperCase()
        

        if (usuario == null || usuario == ""){
            alert ("no escribiste nada, no se puede reconocer el usuario")
            intentos++
            if(intentos>3){
                alert("superaste la cantidad de intentos")
                break
            }
            
        
        }

        if((usuario === "ADMIN"|| usuario==="HUGO") && intentos<=3){
            let contraseña = parseInt (prompt("ingresa tu contraseña"))
            if (contraseña == null){
                alert ("no ingresaste la contraseña asi que me toca sacarte otra vez")
                break;
            }
            if (contraseña === 12345678){
                alert("Bienvenido " + usuario)
                identificar = false
                sumar()
            }else{
                alert ("contraseña incorrecta")
                intentos++ 
                if(intentos>3){
                    alert("superaste la cantidad de intentos")
                break;}
            }
        }





    }while(identificar)


}

loguear()

function sumar() {

    alert("estas usando la function de sumar, preciona enter para comenzar a sumar ")

let num1 = parseFloat(prompt("ingresa un numero"))
let num2 = parseFloat(prompt("ingresa el segundo numero "))

let resultado = num1 + num2 ;

alert ("el resultado es " + resultado)

}

