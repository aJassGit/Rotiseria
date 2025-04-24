const { conexion } = require("../config/db")

//request => peticion
//response => respuesta

//Crea una nueva categoria
const createCategoria = (req,res) => {
    const { Nombre, Descripcion } = req.body
    const query = "INSERT INTO Categorias (Nombre, Descripcion) VALUES (?,?)"
    const values = [Nombre, Descripcion]
    
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Categoria agregada correctamente",
          status: 200,
          results              
        })
      } else {
        res.json({
          error: true,
          message: "Error al agregar el categoria",
          status: 404,
          err      
        })
      }
    })
}

//Muestra todas las categorias
const readCategorias = (req,res) => {
    conexion.query("SELECT * FROM Categorias", (err, results) => {
        if (!err) {
          res.json(results)
        } else {
          res.json({
            error: true,
            message: "Error al obtener las categorias",
            status: 404,
            err
          })
        }
      })
}

//Muestra una categoria especifica
const readCategoria = (req,res) => {
    const { id } = req.params
    const query = "SELECT * FROM Categorias WHERE id_Categoria = ?"
    const values = [id]

    conexion.query(query, values, (err, results) => {
        if (!err) {
        res.json({
          results
        })
        } else {
        res.json({
            error: true,
            message: "Error al obtener categoria especifica",
            status: 404,
            err
        })
        }
    })
}

//Actualizar la categoria
const updateCategoria = (req,res) => {
    const { id_Categoria } = req.params
    const { Nombre, Descripcion } = req.body
    const query = "UPDATE Categorias SET Nombre = :Nombre, Descripcion = :Descripcion WHERE id_Categoria = :id_Categoria"
    const values = {Nombre, Descripcion, id_Categoria}
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Categoria actualizada correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al actualizar la categoria",
          status: 404,
          err         
        })
      }
    })
}

//Elimina la categoria
const deleteCategoria = (req,res) => {
  const { id } = req.params
  const query = "DELETE FROM Categorias WHERE id_Categoria = :id" 
  const values = {id}
  conexion.query(query, values, (err, results) => {
    if (!err) {
      res.json({
        error: false,
        message: "Categoria borrada correctamente",
        status: 200,
        results
      })
    } else {
      res.json({
        error: true,
        message: "Error al borrar la categoria",
        status: 404,
        err
      })
    }
  })
}

//Sirve para exportar las funciones e importarlas en routes
module.exports = { createCategoria, readCategorias, readCategoria, updateCategoria, deleteCategoria}