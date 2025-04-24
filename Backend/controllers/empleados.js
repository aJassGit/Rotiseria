const { conexion } = require('../config/db.js')

//request => peticion
//response => respuesta

//Crea un nuevo empleado (register)
const createEmpleados = (req, res) => {
    const { Nombre, Apellido, Usuario, Password } = req.body

    const query = "INSERT INTO Empleados (Nombre, Apellido, Usuario, Password, Rol) VALUES (?,?,?,?, 'Empleado')"
    
    const values = [Nombre, Apellido, Usuario, Password]

    conexion.query(query,values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Empleado agregado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al registrar el empleado",
          status: 404,
          err
        })
      }
    })
}

//Muestra todos los empleados
const readEmpleados = (req, res) => {
    const query = "SELECT id_Empleado, Nombre, Apellido, CONCAT(Nombre, ' ', Apellido) AS Empleado, Usuario, Password, Rol FROM Empleados"
    conexion.query(query, (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener los empleados",
          status: 404,
          err
        })
      }
    })
}

//Muestra un empleado especifico
const readEmpleado = (req, res) => {
    const { id } = req.params
    const query = "SELECT id_Empleado, Nombre, Apellido, CONCAT(Nombre, ' ', Apellido) AS Empleado, Usuario, Password, Rol FROM Empleados WHERE id_Empleado = ?"
    const values = [id]
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener el empleado",
          status: 404,
          err
        })
      }
    })
}

//Obtiene los empleados y compara si el usuario y contraseña coinciden
const login = (req, res) => {
    const { Usuario, Password } = req.body
    const query = "SELECT id_Empleado, Usuario, Password, Rol FROM Empleados WHERE Usuario = ? AND Password = ?"
    const values = [Usuario, Password]
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        if (results.length > 0) {
          res.json({
            error: false,
            message: `Bienvenido ${Usuario}`,
            status: 200,
            results
          })
        } else {
          res.json({
            error: true,
            message: "Usuario o contraseña incorrectos",
            status: 404,
            err
          })
        }
      } else {
        res.json({
          error: true,
          message: "Error al iniciar sesión",
          status: 404,
          err
        })
      }
    })
}

//Actualiza el empleado
const updateEmpleado = (req, res) => {
    const {id_Empleado} = req.params
    const {Nombre, Apellido, Usuario, Rol } = req.body
    const query = "UPDATE Empleados SET Nombre = :Nombre, Apellido = :Apellido, Usuario= :Usuario, Rol = :Rol WHERE id_Empleado = :id_Empleado"
    const values = {Nombre, Apellido, Usuario, Rol, id_Empleado } 
    
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Empleado actualizado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al actualizar el Empleado",
          status: 404,
          err
        })
      }
    }) 
}

//Elimina el empleado
const deleteEmpleado = (req, res) => {
    const {id} = req.params 
    const query = "DELETE FROM Empleados WHERE id_Empleado = ?"
    const values = [id]
    conexion.query(query,values, (err,results)=>{
      if(!err){
        res.json({
          error: false,
          message: "Empleado eliminado correctamente",
          status: 200,
          results
        })
      }else{
        res.json({
          error: true,
          message: "Error al eliminar el empleado",
          status: 404,
          err
        })
      }
    }) 
}

//Exporta las funciones para que en routes sean importadas
module.exports = { createEmpleados, readEmpleados, readEmpleado, login, updateEmpleado, deleteEmpleado}