from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__)
CORS(app)
# Mysql Connection
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'surtiendapp'
mysql = MySQL(app)

# settings A partir de ese momento Flask utilizará esta clave para poder cifrar la información de la cookie
app.secret_key = "mysecretkey"


@cross_origin()
@app.route('/register', methods=['POST'])
def register():
    try:
        if request.method == 'POST':
            user_v = request.json['usuario'] ## id
            direccion_v = request.json['direccion']
            contrasena_v = request.json['contraseña']
            correo_v = request.json['correo']        ## email
            telefono_v = request.json['telefono'] #tele
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO cliente (usuario, direccion, contraseña,correo, telefono) VALUES (%s,%s,%s,%s, %s)",(user_v, direccion_v, contrasena_v, correo_v, telefono_v))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#--------------------------------------------------------------------------------------------------------------------------------------
@cross_origin()
@app.route('/register_repartidor', methods=['POST'])
def register_repartidor():
    try:
        if request.method == 'POST':
            usuario_v = request.json['usuario'] ## nombre
            correo_v = request.json['correo']        ## email
            contrasena_v = request.json['contraseña']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO repartidor (usuario, correo, contraseña) VALUES (%s,%s,%s)",(usuario_v, correo_v, contrasena_v))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
    
#------------------------------------------------------------------------------------------------------------------------------------
@cross_origin()
@app.route('/register_producto', methods=['POST'])
def register_producto():
    try:
        if request.method == 'POST':
            print("wwwwwwwwwwww")
            nombre_v = request.json['nombre'] ## nombre
            descripcion_v = request.json['descripcion']        ## email
            precio_v = request.json['precio']
            cantidad_v = request.json['cantidad_disponible']
            url_v = request.json['url']
            print(url_v)
            fecha_v=  datetime.now()
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO producto (nombre, descripcion, precio, cantidad_disponible, fecha_registro, url) VALUES (%s,%s,%s,%s,%s,%s)",(nombre_v,descripcion_v,precio_v,cantidad_v,fecha_v,url_v))
            mysql.connection.commit()
            return jsonify({"informacion":"Registro exitoso"})
        
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
#------------------------------------------------------------------------------------------------------------------------------------
@cross_origin()
@app.route('/compare', methods=['POST'])
def compare():
    try:
        correo_v = request.json['correo']
        contraseña_v = request.json['contraseña']
        cur = mysql.connection.cursor() #conectar con la base de datos ↓
        cur.execute(("SELECT correo,contraseña FROM cliente WHERE correo=%s and contraseña=%s"),(correo_v, contraseña_v)) #ejecutar el scrip
        rv = cur.fetchall() #consultar todos los registros
        cur.close() # cierra la conexion que abrimos arriba        ↑
        payload = []    #lista o array, arreglo, como quieran decirle
        content = {}    #estructura de tipo objeto
        
        for result in rv:
            content = {'correo': result[0], 'contraseña': result[1], 'modulo':'user'} # numero de valoracion
            payload.append(content)
            
            content = {}
        if not payload: 
            cur = mysql.connection.cursor() #conectar con la base de datos ↓
            cur.execute(('SELECT correo,contraseña FROM admin WHERE correo=%s and contraseña=%s'),(correo_v, contraseña_v)) #ejecutar el scrip
            rv = cur.fetchall() #consultar todos los registros
            cur.close() # cierra la conexion que abrimos arriba        ↑
            payload = []    #lista o array, arreglo, como quieran decirle
            content = {}    #estructura de tipo objeto
        
            for result in rv:
                content = {'correo': result[0], 'contraseña': result[1], 'modulo':'Admin' } # numero de valoracion
                payload.append(content)
                content = {}

                content = {}
        if not payload: 
            cur = mysql.connection.cursor() #conectar con la base de datos ↓
            cur.execute(('SELECT correo,contraseña FROM repartidor WHERE correo=%s and contraseña=%s'),(correo_v, contraseña_v)) #ejecutar el scrip
            rv = cur.fetchall() #consultar todos los registros
            cur.close() # cierra la conexion que abrimos arriba        ↑
            payload = []    #lista o array, arreglo, como quieran decirle
            content = {}    #estructura de tipo objeto
        
            for result in rv:
                content = {'correo': result[0], 'contraseña': result[1], 'modulo':'repartidor' } # numero de valoracion
                payload.append(content)
                content = {}
        return jsonify(payload)
    except Exception as e:

        print(e)
        return jsonify({"informacion":e})
#--------------------------------------------------------------------------------------------------------------------------------------------
@app.route('/mostrarProducto', methods=['GET'])
def mostrarProducto():
    try:
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * from producto')
        rv= cur.fetchall()
        payload=[]
        content={}
        for result in rv:
            content={'id':result[0] ,'nombre':result[1], 'descripcion':result[2], 'precio':result[3], 'cantidad_disponible':result[4], 'fecha_registro':result[5], 'url': result[7]}
            payload.append(content)
            content={}
        mysql.connection.commit()
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-------------------------------------------------------------------------------------------------------
@app.route('/getlist', methods=['GET'])
def getlist():
    try:
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * from producto')
        rv= cur.fetchall()
        cur.close()
        payload=[]
        content={}
        for result in rv:
            content={'id':result[0] ,'nombre':result[1], 'descripcion':result[2], 'precio':result[3], 'cantidad_disponible':result[4], 'fecha_registro':result[5]}
            payload.append(content)
            content={}
        mysql.connection.commit()
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
#-------------------------------------------------------------------------------------------------------
    
if __name__ == '__main__':
    app.run()