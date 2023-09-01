let cerrarsesion = () => {
    localStorage.clear();
    window.location.href = "../login.html";
}

let comprobar = () => {
    var privilegios = localStorage.getItem("privilegios");

    if (privilegios) {
        console.log("Privilegios:", privilegios);

        if (privilegios == "Admin") {
            window.location.href = "../admin/mainadmin.html";
        } else if (privilegios == "repartidor") {
            window.location.href = "../deliverer/maindeliverer.html";
        } else {
            console.log("Sesion iniciada!")
        }
    } else {
        window.location.href = "../../index.html";
        console.log("No se encontraron datos de inicio de sesión en el LocalStorage");
    }
}
/* ---------------------------------------------catalogo------------------------------------------------- */

var i = -1
var imagenesEntrenador = ["../../img/gym4.jpg", "../../img/gym5.png", "../../img/gym8.jpg"];
var imagenActual = 0;
var k = 0
var activo = false
var nombre
function HotelesVistaAntes() {//Lista de entrenadores por parte del usuario



    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/Hoteles',

    }).then(function (response) {
        /*
         if (i >= response.data.length) {
             i = 0;

         }*/
        //alert(i)//Empieza con 6, y finaliza con 3
        if (imagenActual >= imagenesEntrenador.length) {
            imagenActual = 0;
        }

        j = k

        console.log("final", i)
        if (j > 0) {
            console.log(i)
            console.log("k:", k)





            console.log("1:", k)
            k = k - 1
            i = k
            //   document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre3').innerText = response.data[k].Hotel;
            document.getElementById('direccion3').innerText = response.data[k].Direccion;
            document.getElementById('descripcion3').innerText = response.data[k].Descripcion;
            const V_Valoracion3 = response.data[k].Valoracion;


            contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador3) {
                    document.getElementById((i + 1) + nombre3).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre3).style.color = 'gray';
                }
            }



            k = k - 1


            imagenActual = imagenActual + 1;



            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }


            //document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre2').innerText = response.data[k].Hotel;
            document.getElementById('direccion2').innerText = response.data[k].Direccion;
            document.getElementById('descripcion2').innerText = response.data[k].Descripcion;

            const V_Valoracion2 = response.data[k].Valoracion;


            contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador2) {
                    document.getElementById((i + 1) + nombre2).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre2).style.color = 'gray';
                }
            }




            k = k - 1
            imagenActual = imagenActual + 1;



            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }



            //document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre').innerText = response.data[k].Hotel;
            document.getElementById('direccion').innerText = response.data[k].Direccion;
            document.getElementById('descripcion').innerText = response.data[k].Descripcion;

            const V_Valoracion = response.data[k].Valoracion;


            contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre = 'estrella1';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador) {
                    document.getElementById((i + 1) + nombre).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre).style.color = 'gray';
                }
            }



            //i = k
            imagenActual = imagenActual + 1;


            console.log(i)

            console.log(response)
        }






    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}

function actualizar(nombre) {
    alert("Enviando solicitud al entrenador: " + nombre)

}


var NombreHotel = ""
function HotelesVistaDespues() {//Lista de entrenadores por parte del usuario
    console.log("aqui entra")
    var NombreUsuario = window.localStorage.getItem('nombreUsuario')
    console.log("a a a ", NombreUsuario)



    axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/Hoteles',

    }).then(function (response) {

        if (activo == false) {


            console.log("dfsd")
            let i2 = 0

            ////document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre').innerText = response.data[i2].Hotel;
            // NombreHotel=response.data[i2].Hotel;
            document.getElementById('direccion').innerText = response.data[i2].Direccion;
            document.getElementById('descripcion').innerText = response.data[i2].Descripcion;
            const V_Valoracion = response.data[i2].Valoracion;
            document.getElementById('reserva').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i2].Hotel + '\')">RESERVAR</a>';

            contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre = 'estrella';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador) {
                    document.getElementById((i + 1) + nombre).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre).style.color = 'gray';
                }
            }









            /* `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
             <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;


               cell4.innerHTML = '<a class="btn btn-secondary " onclick="actualizar(\' ' + response.data[i].nombre + ' \')">Enviar solicitud</a>';


                \'   \'    ----- Representa una comilla simple dentro de una cadena delimitada por comillas simples.(?)
                        ----- Esto evita que la comilla se interprete como el fin de la cadena.
            */

            i2 = i2 + 1
            imagenActual = imagenActual + 1;

            //document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre2').innerText = response.data[i2].Hotel;
            document.getElementById('direccion2').innerText = response.data[i2].Direccion;
            document.getElementById('descripcion2').innerText = response.data[i2].Descripcion;
            document.getElementById('reserva2').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i2].Hotel + '\')">RESERVAR</a>';

            const V_Valoracion2 = response.data[i2].Valoracion;


            let contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador2) {
                    document.getElementById((i + 1) + nombre2).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre2).style.color = 'gray';
                }
            }





            i2 = i2 + 1
            imagenActual = imagenActual + 1;


            //document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
            document.getElementById('nombre3').innerText = response.data[i2].Hotel;
            document.getElementById('direccion3').innerText = response.data[i2].Direccion;
            document.getElementById('descripcion3').innerText = response.data[i2].Descripcion;
            document.getElementById('reserva3').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i2].Hotel + '\')">RESERVAR</a>';

            const V_Valoracion3 = response.data[i2].Valoracion;


            let contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
            console.log("s", contador3)
            let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd
            for (let i = 0; i < 5; i++) {
                if (i < contador3) {
                    document.getElementById((i + 1) + nombre3).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                } else {
                    document.getElementById((i + 1) + nombre3).style.color = 'gray';
                }
            }






            imagenActual = imagenActual + 1;
            activo = true //mano ya la dejo hasta aca, q quien esta logeando
        } else {


            console.log("ñ", i)


            if (imagenActual >= imagenesEntrenador.length) {
                imagenActual = 0;
            }

            j = i

            if (j < 0) {
                i = 2
            }

            console.log("j", response.data.length)
            while (i + 1 < response.data.length) {
                console.log("HOLA")
                i = i + 1
                k = i
                ////document.getElementById('imagenEntrenador').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre').innerText = response.data[i].Hotel;
                document.getElementById('direccion').innerText = response.data[i].Direccion;
                document.getElementById('descripcion').innerText = response.data[i].Descripcion;
                const V_Valoracion = response.data[i].Valoracion;
                document.getElementById('reserva').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i].Hotel + '\')">RESERVAR</a>';

                contador = V_Valoracion;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre = 'estrella';//captura el nombre, el numero fue capturado arriba xd
                for (let i = 0; i < 5; i++) {
                    if (i < contador) {
                        document.getElementById((i + 1) + nombre).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre).style.color = 'gray';
                    }
                }








                i = i + 1

                imagenActual = imagenActual + 1;



                if (imagenActual >= imagenesEntrenador.length) {
                    imagenActual = 0;
                }


                //document.getElementById('imagenEntrenador2').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre2').innerText = response.data[i].Hotel;
                document.getElementById('direccion2').innerText = response.data[i].Direccion;
                document.getElementById('descripcion2').innerText = response.data[i].Descripcion;
                const V_Valoracion2 = response.data[i].Valoracion;
                document.getElementById('reserva2').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i].Hotel + '\')">RESERVAR</a>';

                contador2 = V_Valoracion2;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre2 = 'estrella2';//captura el nombre, el numero fue capturado arriba xd
                for (let i = 0; i < 5; i++) {
                    if (i < contador2) {
                        document.getElementById((i + 1) + nombre2).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre2).style.color = 'gray';
                    }
                }



                i = i + 1
                imagenActual = imagenActual + 1;



                if (imagenActual >= imagenesEntrenador.length) {
                    imagenActual = 0;
                }



                //document.getElementById('imagenEntrenador3').src = imagenesEntrenador[imagenActual];
                document.getElementById('nombre3').innerText = response.data[i].Hotel;
                document.getElementById('direccion3').innerText = response.data[i].Direccion;
                document.getElementById('descripcion3').innerText = response.data[i].Descripcion;
                const V_Valoracion3 = response.data[i].Valoracion;
                document.getElementById('reserva3').innerHTML = '<a class="btn btn-primary" onclick="reservar(\'' + NombreUsuario + '\', \'' + response.data[i].Hotel + '\')">RESERVAR</a>';

                contador3 = V_Valoracion3;//captura el primer digito de la id sea desde 1 a 5 dejando estrella
                let nombre3 = 'estrella3';//captura el nombre, el numero fue capturado arriba xd
                for (let i = 0; i < 5; i++) {
                    if (i < contador3) {
                        document.getElementById((i + 1) + nombre3).style.color = '#0d6efd';// Es facil mandarlo a la base de datos
                    } else {
                        document.getElementById((i + 1) + nombre3).style.color = 'gray';
                    }
                }




                imagenActual = imagenActual + 1;


                console.log(i)

                console.log(response)
                break//

            }

        }








    }).catch(err => console.log('Error: ', err))

    document.getElementById("nombre").value = ""
}


function reservar(nombre, hotel) {
    alert(nombre)
    alert(hotel)

    console.log("response")

    axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/Reservar',
        data: {
            Nombre_turista: nombre,
            Nombre_hotel: hotel,
        }
    }).then(function (response) {
        alert("SE HA RESERVADO CON EXITO")
    }).catch(err => console.log('Error: ', err))
}