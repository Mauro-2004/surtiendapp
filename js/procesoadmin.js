let cerrarsesion = () => {
    localStorage.clear();
    window.location.href="index.html";
}

let comprobar = () => {
    var privilegios = localStorage.getItem("privilegios");

    if (privilegios) {
    console.log("Privilegios:", privilegios);

    if (privilegios == "Admin") {
        console.log("Sesion iniciada!")
    } else if (privilegios == "User") {
        window.location.href="../user/mainuser.html";
    }else{
        window.location.href="../deliverer/maindeliverer.html";
    }
    } else {
    window.location.href="../../index.html";
    console.log("No se encontraron datos de inicio de sesión en el LocalStorage");
    }
}

function registro_repartidor() {
    const r_user= document.getElementById('username').value;
    const r_email= document.getElementById('email').value;
    const r_contrasena = document.getElementById('password').value;

    if((r_user || r_email || r_contrasena) == ""){
      alert("Rellene todos los campos para poder registrar al repartidor")
    } else {
      try {
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:5000/register_repartidor',
          data: {
            usuario:r_user,
            correo:r_email,
            contraseña:r_contrasena,
          }
        }).then(response => response.text())
          alert("Registro exitoso ");
      } catch (error) {
        console.log(error)
      }
    } 
    }