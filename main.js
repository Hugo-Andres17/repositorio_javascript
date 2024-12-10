function loguear (){

    let identificar = true
    let intentos = 1


    do{

        let usuario = prompt ("ingresa tu usuario")
        

        if (usuario == null || usuario == ""){
            alert ("no escribiste nada, no se puede reconocer el usuario")
            break
        }

        if((usuario == "admin"|| usuario=="hugo") && intentos<=3){
            let contraseña = prompt ("ingresa tu contraseña")
            if (contraseña == null){
                alert ("no ingresaste la contraseña asi que me toca sacarte otra vez")
                break;
            }
            if (contraseña === "12345678"){
                alert("Bienvenido " + usuario)
                identificar = false
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