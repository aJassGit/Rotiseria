const express = require('express')
const proveedores = express.Router()

//Importa las funciones del controller
const { createProveedor, readProveedores, readProveedor, updateProveedor, deleteProveedor } = require("../controllers/proveedores")

proveedores.post("/agregar-proveedor",createProveedor)
proveedores.get("/obtener-proveedores",readProveedores)
proveedores.get("/obtener-proveedor/:id",readProveedor)
proveedores.put("/actualizar-proveedor/:id_Proveedor",updateProveedor)
proveedores.delete("/eliminar-proveedor/:id",deleteProveedor)

module.exports = proveedores
