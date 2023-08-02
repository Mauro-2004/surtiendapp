from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

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
@app.route('/update/<id>', methods=['PUT'])
def update_contact(id):
    try:
        user_v = request.json['user']
        telefono_v = request.json['telefono']
        email_v = request.json['email']
        contrasena = request.json['contrasena']
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE registro
        SET nombre = %s,
            correo = %s,
            telefono = %s
        WHERE id = %s
        """, (user_v, email_v, telefono_v, contrasena))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro actualizado"})
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})

#-------------------------------------------------------------------------------------------------------


@app.route('/delete/<id>', methods = ['DELETE'])
def delete_contact(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM registro WHERE id = %s', (id,))
        mysql.connection.commit()
        return jsonify({"informacion":"Registro eliminado"}) 
    except Exception as e:
        print(e)
        return jsonify({"informacion":e})
#-------------------------------------------------------------------------------------------------------
    
if __name__ == '__main__':
    app.run()