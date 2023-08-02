let cerrarsesion = () => {
    localStorage.clear();
    window.location.href="../login.html";
}

let comprobar = () => {
    var privilegios = localStorage.getItem("privilegios");

    if (privilegios) {
    console.log("Privilegios:", privilegios);

    if (privilegios == "Admin") {
        window.location.href="../admin/mainadmin.html";
    } else if(privilegios == "repartidor") {
        window.location.href="../deliverer/maindeliverer.html";
    } else{
        console.log("Sesion iniciada!")
    }
    } else {
    window.location.href="../../index.html";
    console.log("No se encontraron datos de inicio de sesión en el LocalStorage");
    }
}