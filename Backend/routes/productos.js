const express = require('express')
const productos = express.Router()

//Importa las funciones del controller
const { createProducto, readProductos, readProducto, updateProducto, deleteProducto } = require("../controllers/productos.js")

productos.post("/agregar-producto", createProducto)
productos.get("/obtener-productos", readProductos)
productos.get("/obtener-producto/:id", readProducto)
productos.put("/actualizar-producto/:id_Producto", updateProducto)
productos.delete("/eliminar-producto/:id", deleteProducto)

module.exports = productos