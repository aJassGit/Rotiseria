const { conexion } = require("../config/db")

//request => peticion
//response => respuesta

//Crea el proveedor
const createProveedor = (req, res) => {
    const { Nombre, Apellido, CUIT } = req.body
    const query ="INSERT INTO Proveedores (Nombre, Apellido, CUIT) VALUES (?,?,?)"
    const values = [ Nombre, Apellido, CUIT ]
    
    conexion.query(query, values, (err, results) => {
        if (!err) {
        res.json({
            error: false,
            message: "Proveedor creado correctamente",
            status: 200,
            results
        })
        } else {
        res.json({
            error: true,
            message: "Error al obtener los proveedores",
            status: 404,
            err
        })
        }
    })
}

//Lee todos los proveedores
const readProveedores = (req, res) => {
    conexion.query("SELECT id_Proveedor, Nombre, Apellido, CONCAT(Nombre, ' ', Apellido) AS Proveedor, CUIT FROM Proveedores", (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener los proveedores",
          status: 404,
          err
        })
      }
    })
}

//Lee un proveedor especifico
const readProveedor = (req, res) => {
  const {id} = req.params;
  const query = "SELECT id_Proveedor, Nombre, Apellido, CONCAT(Nombre, ' ', Apellido) AS Proveedor, CUIT FROM Proveedores WHERE id_Proveedor = :id";
  const values = {id}

  conexion.query(query,values,(err,results) =>{
    if(!err){
      res.json({
        error: false,
        message: "Proveedor obtenido correctamente",
        status: 200,
        results
      }
    )
    }else{
      res.json({
        error: true,
        message: "Error al obtener al Proveedor",
        status: 404,
        err
      })
    }
  })
}

//Actualiza un proveedor
const updateProveedor = (req, res) => {
    const { id_Proveedor } = req.params;
    const { Nombre, Apellido, CUIT } = req.body;
    const query = "UPDATE Proveedores SET Nombre = :Nombre, Apellido = :Apellido, CUIT = :CUIT WHERE id_Proveedor = :id_Proveedor"
    const values = { Nombre, Apellido, CUIT, id_Proveedor }
    conexion.query(query,values,(err,results)=>{
      if(!err){
        res.json({
          error: false,
          message: "Proveedor actualizado correctamente",
          status: 200,
          results
        }
      )
      }else{
        res.json({
          error: true,
          message: "Proveedor no actualizado",
          status: 404,
          err
        })
      }
    })
}

//Elimina un proveedor
const deleteProveedor = (req, res) => {
    const {id} = req.params;
    const query = "DELETE FROM Proveedores WHERE id_Proveedor = :id"

    const values = { id } 

    conexion.query(query,values, (err,results)=>{
        if(!err){
        res.json({
            error: false,
            message: "Proveedor eliminado correctamente",
            status: 200,
            results
        })
        }else{
        res.json({
            error: true,
            message: "Error al eliminar el Proveedor",
            status: 404,
            err
        })
        }
    })
}

//Exporta las funciones para routes
module.exports = { createProveedor, readProveedores, readProveedor, updateProveedor, deleteProveedor}