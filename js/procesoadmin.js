let cerrarsesion = () => {
  localStorage.clear();
  window.location.href = "../login.html";
}

let comprobar = () => {
  var privilegios = localStorage.getItem("privilegios");

  if (privilegios) {
    console.log("Privilegios:", privilegios);

    if (privilegios == "Admin") {
      console.log("Sesion iniciada!")
    } else if (privilegios == "User") {
      window.location.href = "../user/mainuser.html";
    } else {
      window.location.href = "../deliverer/maindeliverer.html";
    }
  } else {
    window.location.href = "../../index.html";
    console.log("No se encontraron datos de inicio de sesión en el LocalStorage");
  }
}

function registro_repartidor() {
  const r_user = document.getElementById('username').value;
  const r_email = document.getElementById('email').value;
  const r_contrasena = document.getElementById('password').value;

  if ((r_user || r_email || r_contrasena) == "") {
    alert("Rellene todos los campos para poder registrar al repartidor")
  } else {
    try {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/register_repartidor',
        data: {
          usuario: r_user,
          correo: r_email,
          contraseña: r_contrasena,
        }
      }).then(response => response.text())
      alert("Registro exitoso ");
      document.getElementById('username').value = "";
      document.getElementById('email').value = "";
      document.getElementById('password').value = "";
    } catch (error) {
      console.log(error)
    }
  }
}
/*------------------------------------Registro Productos-----------------------------------------------*/
function registro_producto() {
  const v_nombre = document.getElementById('nombre').value;
  const v_descripcion = document.getElementById('descripcion').value;
  const v_precio = document.getElementById('precio').value;
  const v_cantidad = document.getElementById('cantidad').value;
  const v_url = document.getElementById('url').value;
  console.log(v_url)
  if ((v_nombre || v_descripcion || v_precio || v_cantidad || v_url) == "") {
    alert("Rellene todos los campos para poder registrar")
  } else {
    try {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/register_producto',
        data: {
          nombre: v_nombre,
          descripcion: v_descripcion,
          precio: v_precio,
          cantidad_disponible: v_cantidad,
          url: v_url
        }
      }).then(function (response) {
        alert("REGISTRO EXITOSO");
        document.getElementById('nombre').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('cantidad').value = "";
        document.getElementById('url').value = "";

        lista()
      }).catch(error => console.error('Error:', error));
    } catch (error) {
      console.log(error)
    }
  }
}

/*------------------------------------Tabla Productos-----------------------------------------------*/
inform = {}

function lista() {
  console.log("s")
  let tabla = $('#tablaMostrar').DataTable();


  axios({

    method: 'GET',
    url: 'http://127.0.0.1:5000/mostrarProducto'

  }).then(function (response) {
    console.log(response.data[0].nombre)
    console.log(response.data[0])
    tabla.clear()
    console.log(response.data.length)
    for (let i = 0; i < response.data.length; i++) {
      tabla.row.add([
        response.data[i].nombre,
        response.data[i].descripcion,
        response.data[i].precio,
        response.data[i].cantidad_disponible,
        response.data[i].fecha_registro,
        response.data[i].id
      ]);
    }
    tabla.draw();

    console.log(tabla)

  }).catch(error => console.error('Error:', error));

}