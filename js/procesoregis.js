
function registro() {
 const v_user= document.getElementById('username').value;
 const v_email= document.getElementById('email').value;
 const v_telefono=  document.getElementById('phone').value;
 const v_contrasena = document.getElementById('password').value;
 const v_direccion = document.getElementById('address').value;

 if((v_user || v_email || v_telefono || v_contrasena || v_direccion) == ""){
  alert("Rellene todos los campos para poder registrarse")
 } else{
  try {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/register',
      data: {
        usuario:v_user,
        correo:v_email,
        telefono:v_telefono,
        contraseña:v_contrasena,
        direccion:v_direccion
      }
    }).then(response => response.text())
      .catch(error => console.error('Error:', error));
      alert("REGISTRO EXITOSO");
    window.location.href="../index.html"
  } catch (error) {
    console.log(error)
    }
  }
 }