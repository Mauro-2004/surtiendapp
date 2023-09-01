/*let verificarLogin = (event) => {
  event.preventDefault();

  var usuario = document.getElementById("username").value;
  var contraseña = document.getElementById("password").value;

  for (var i = 0; i < datos.length; i++) {
    if (datos[i].usuario === usuario && datos[i].contraseña === contraseña) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("privilegios", datos[i].privilegios);
      alert("Inicio de sesion exitoso.")
      window.location.href = "../index.html";
      return;
    }
  }

  alert("Credenciales incorrectas. Inténtalo de nuevo.");
}*/

function login() {
  var v_usuario = document.getElementById("username").value;
  var v_contraseña = document.getElementById("password").value;
  if((v_usuario || v_contraseña) == ""){
    alert("Rellene todos los campos para poder registrarse")
   }else{
  try {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/compare',
      data: {
        correo: v_usuario,
        contraseña: v_contraseña
      }
    }).then(function (response) {
      var comprobar = response.data[0].modulo

      if (comprobar == "user") {
        alert("INICIO DE SESION EXITOSO");
        window.location.href = "../html/user/mainuser.html"
        localStorage.setItem("privilegios", "User");
      } else if (comprobar == "Admin") {
        alert("INICIO DE SESION EXITOSO");
        window.location.href = "../html/admin/mainadmin.html",
        localStorage.setItem("privilegios", "Admin");
      } else{
        alert("INICIO DE SESION EXITOSO");
        window.location.href = "../html/deliverer/maindeliverer.html"
        localStorage.setItem("privilegios", "repartidor");
      }
    }

    );

  } catch (error) {
    console.log(error)
  }

  }
}