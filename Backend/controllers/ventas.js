const { conexion } = require('../config/db')

//request => peticion
//response => respuesta

//Crea una nueva venta
const createVenta = (req, res) => {
    const { id_Producto, id_Empleado, id_TipoPago, Cantidad, Precio, Fecha } = req.body;
    let Subtotal = Cantidad * Precio //Realiza la multiplicacion de la cantidad de productos con el precio del mismo
  
    const query = "INSERT INTO Ventas (id_Empleado, id_TipoPago, id_Producto, Cantidad, Subtotal, Fecha) VALUES (?,?,?,?,?,?)"
    const values = [ id_Empleado, id_TipoPago, id_Producto, Cantidad, Subtotal, Fecha ]
  
    conexion.query(query, values, (err, result) => {
      if (err) {
        res.status(500).json({ err })
      } else {
        res.json({ message: 'Venta agregada correctamente', status: 201, result })
      }
    })
}

//Lee todas las ventas
const readVentas = (req, res) => {
    // Crear procedimiento almacenado listarVentas() en su base de datos
    const query = "CALL listarVentas()"
    let total = 0 //Inicializa el total en 0
    
    conexion.query(query, (err, result) => {
        if (err) {
        res.status(500).json({ error: err.message })
        } else {
            // Sumar el total de las ventas
            result[0].forEach(venta => {
                total += venta.Subtotal
            })//Utiliza los subtotal de todas las ventas para generar el total
            res.json({
                result,
                total
            })
        }
    })
}

//Lee una venta
const readVenta = (req, res) => {
    const { id } = req.params
    const query = "SELECT * FROM Ventas WHERE id_Venta = ?"
    const values = [id]
  
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json(results)
      } else {
        res.json({
          error: true,
          message: "Error al obtener la venta",
          status: 404,
          err
        })
      }
    })
}

//Actualiza una venta
const updateVenta = (req, res) => {
    const { id_Venta } = req.params
    const { id_Empleado, id_TipoPago, id_Producto, Cantidad, Precio, Fecha } = req.body
    let Subtotal = Cantidad * Precio //
    
    const query = "UPDATE Ventas SET id_Empleado = :id_Empleado, id_TipoPago = :id_TipoPago, id_Producto = :id_Producto, Cantidad = :Cantidad, Subtotal = :Subtotal, Fecha = :Fecha WHERE id_Venta = :id_Venta"
    const values = {id_Empleado, id_TipoPago, id_Producto, Cantidad, Subtotal, Fecha, id_Venta}
    
    conexion.query(query, values, (err, results) => {
      if (!err) {
        res.json({
          error: false,
          message: "Venta actualizado correctamente",
          status: 200,
          results
        })
      } else {
        res.json({
          error: true,
          message: "Error al actualizar la venta",
          status: 404,
          err
        })
      }
    })
}

//Elimina una venta
const deleteVenta = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM Ventas WHERE id_Venta = ?"
    const values = [id]

    conexion.query(query, values,  (err, results) => {
        if (!err) {
        res.json({
            error: false,
            message: "Venta eliminada correctamente",
            status: 200,
            results
        })
        } else {
        res.json({
            error: true,
            message: "Error al eliminar la venta",
            status: 404,
            err
        })
        }
    })
}

//Exporta las funciones para routes
module.exports = { createVenta, readVentas, readVenta, updateVenta, deleteVenta }