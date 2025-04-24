const express = require('express');
const ventas = express.Router();

//Importa las funciones del controller
const { createVenta, readVentas, readVenta, updateVenta, deleteVenta } = require('../controllers/ventas')

ventas.post("/agregar-venta", createVenta)
ventas.get("/listar-ventas", readVentas)
ventas.get("/listar-venta/:id", readVenta)
ventas.put("/actualizar-venta/:id_Venta", updateVenta)
ventas.delete("/eliminar-venta/:id", deleteVenta)

module.exports = ventas