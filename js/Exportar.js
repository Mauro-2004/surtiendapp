function pdf_Producto() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/getlist',

    }).then(function (response) {

        //header=[]
        var body = []
        //var body2=[]

        for (let i = 0; i < response.data.length; i++) {
            body.push([response.data[i].id, response.data[i].nombre, response.data[i].descripcion, response.data[i].precio, response.data[i].cantidad_disponible, response.data[i].fecha_registro]);

        }

        var pdf = new jsPDF();

        pdf.text(20, 20, "Reporte de los productos");

        var columns = ["Id", "Nombre del producto", "Descripcion", "Precio", "Cantidad del producto", "Fecha de registro"];

        pdf.autoTable(columns, body,

            { margin: { top: 25 } }

        );

        pdf.save('Productos.pdf');


    }).catch(err => console.log('Error: ', err))

}