const { conexion } = require("../config/db")

//request => peticion
//response => respuesta

//Crea un nuevo producto
const createProducto = (req, res) => {
    const { Nombre, id_Categoria, id_Proveedor, Imagen, Precio } = req.body
  
    const query = "INSERT INTO Productos (id_Categoria, id_Proveedor, Nombre, Imagen, Precio) VALUES (?,?,?,?,?)"
    
    const values = [id_Categoria, id_Proveedor, Nombre, Imagen, Precio]
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Producto agregado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al agregar el producto",
          status: 404,
          err
        })
      }
    })
  }

//Lee los productos con un procedimiento
//El procedimiento hace la unión (JOIN) de las tablas Proveedores y Categorias para obtener los datos
const readProductos = (req, res) => {
  //Crear procedimiento almacenado listarProductos() en su base de datos
    conexion.query("CALL listarProductos()", (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener los productos",
          status: 404,
          err
        })
      }
    })
}

//Lee un producto especifico
const readProducto = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM Productos WHERE id_Producto = ?"
    const values = [id]
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener el producto",
          status: 404,
          err
        })
      }
    })
}

//Actualiza un producto
const updateProducto = (req, res) => {
    const { id_Producto } = req.params
    const { Nombre, id_Categoria, id_Proveedor, Imagen, Precio } = req.body
  
    const query = "UPDATE Productos SET Nombre = :Nombre, id_Categoria = :id_Categoria, id_Proveedor = :id_Proveedor, Imagen = :Imagen, Precio = :Precio WHERE id_Producto = :id_Producto"
  
    const values = { Nombre, id_Categoria, id_Proveedor, Imagen, Precio, id_Producto } 
    
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Producto actualizado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al actualizar el producto",
          status: 404,
          err
        })
      }
    })
}

//Elimina un producto
const deleteProducto = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM Productos WHERE id_Producto = :id"
    const values = { id }
  
    conexion.query(query, values,  (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Producto eliminado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al eliminar el producto",
          status: 404,
          err
        })
      }
    })
}

//Exporta las funciones para ser importadas en routes
module.exports = { createProducto, readProductos, readProducto, updateProducto, deleteProducto }