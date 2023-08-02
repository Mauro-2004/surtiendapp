let comprobar = () => {
    var privilegios = localStorage.getItem("privilegios");

    if (privilegios) {
    console.log("privilegios:", privilegios);

    if (privilegios === "Admin") {
        window.location.href="html/admin/mainadmin.html";
    } else if (privilegios == "User") {
        window.location.href="html/user/mainuser.html";
    } else {
        window.location.href="html/deliverer/maindeliverer.html";
    }
    } else {
    console.log("No se encontraron datos de inicio de sesión en el LocalStorage");
    }
}