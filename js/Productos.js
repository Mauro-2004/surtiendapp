
var i = -1
var k = 0
var activo = false
var nombre
function MostrarCatalogoA() {//Lista de entrenadores por parte del usuario

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/mostrarProducto',

    }).then(function (response) {

        j = k

        if (j > 0) {



            k = k - 1
            i = k



            document.getElementById('nombre_producto3').innerText = response.data[k].nombre;
            document.getElementById('precio3').innerText = response.data[k].descripcion;
            document.getElementById('descripcion3').innerText = response.data[k].precio;
            let urlImagen3 = document.getElementById('imagen3').src = response.data[k].url;

            const imagen3 = document.getElementById('imagen3');
            imagen3.setAttribute('src', urlImagen3)


            k = k - 1



            document.getElementById('nombre_producto2').innerText = response.data[k].nombre;
            document.getElementById('precio2').innerText = response.data[k].descripcion;
            document.getElementById('descripcion2').innerText = response.data[k].precio;
            let urlImagen2 = document.getElementById('imagen2').src = response.data[k].url;


            const imagen2 = document.getElementById('imagen2');
            imagen2.setAttribute('src', urlImagen2)




            k = k - 1


            document.getElementById('nombre_producto').innerText = response.data[k].nombre;
            document.getElementById('precio').innerText = response.data[k].descripcion;
            document.getElementById('descripcion').innerText = response.data[k].precio;

            let urlImagen = document.getElementById('imagen1').src = response.data[k].url;


            const imagen = document.getElementById('imagen1');
            imagen.setAttribute('src', urlImagen)
            console.log(imagen)


        }






    }).catch(err => console.log('Error: ', err))

    
}



var NombreHotel = ""
function MostrarCatalogoD() {//Lista de entrenadores por parte del usuario
    console.log("aqui entra2")



    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/mostrarProducto',

    }).then(function (response) {

        if (activo == false) {


            console.log("dfsd")
            let i2 = 0


            document.getElementById('nombre_producto').innerText = response.data[i2].nombre;
            document.getElementById('precio').innerText = response.data[i2].descripcion;
            document.getElementById('descripcion').innerText = response.data[i2].precio;

            let urlImagen = document.getElementById('imagen1').src = response.data[i2].url;


            const imagen = document.getElementById('imagen1');
            imagen.setAttribute('src', urlImagen)
            console.log(imagen)




            i2 = i2 + 1

            document.getElementById('nombre_producto2').innerText = response.data[i2].nombre;
            document.getElementById('precio2').innerText = response.data[i2].descripcion;
            document.getElementById('descripcion2').innerText = response.data[i2].precio;
            let urlImagen2 = document.getElementById('imagen2').src = response.data[i2].url;


            const imagen2 = document.getElementById('imagen2');
            imagen2.setAttribute('src', urlImagen2)






            i2 = i2 + 1


            document.getElementById('nombre_producto3').innerText = response.data[i2].nombre;
            document.getElementById('precio3').innerText = response.data[i2].descripcion;
            document.getElementById('descripcion3').innerText = response.data[i2].precio;
            let urlImagen3 = document.getElementById('imagen3').src = response.data[i2].url;

            const imagen3 = document.getElementById('imagen3');
            imagen3.setAttribute('src', urlImagen3)






            activo = true

        } else {

            j = i

            if (j < 0) {
                i = 2
            }


            while (i + 1 < response.data.length) {
                console.log("HOLA")
                i = i + 1
                k = i



                document.getElementById('nombre_producto').innerText = response.data[i].nombre;
                document.getElementById('precio').innerText = response.data[i].descripcion;
                document.getElementById('descripcion').innerText = response.data[i].precio;

                let urlImagen = document.getElementById('imagen1').src = response.data[i].url;


                const imagen = document.getElementById('imagen1');
                imagen.setAttribute('src', urlImagen)



                i = i + 1

                document.getElementById('nombre_producto2').innerText = response.data[i].nombre;
                document.getElementById('precio2').innerText = response.data[i].descripcion;
                document.getElementById('descripcion2').innerText = response.data[i].precio;
                let urlImagen2 = document.getElementById('imagen2').src = response.data[i].url;


                const imagen2 = document.getElementById('imagen2');
                imagen2.setAttribute('src', urlImagen2)



                i = i + 1




                document.getElementById('nombre_producto3').innerText = response.data[i].nombre;
                document.getElementById('precio3').innerText = response.data[i].descripcion;
                document.getElementById('descripcion3').innerText = response.data[i].precio;
                let urlImagen3 = document.getElementById('imagen3').src = response.data[i].url;

                const imagen3 = document.getElementById('imagen3');
                imagen3.setAttribute('src', urlImagen3)
                break

            }

        }

    }).catch(err => console.log('Error: ', err))


}
