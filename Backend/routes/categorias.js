const express = require('express')
const categorias = express.Router()

//Obtenemos las funciones de nuestros controllers
const { createCategoria, readCategorias, readCategoria, updateCategoria, deleteCategoria } = require("../controllers/categorias")

categorias.post("/agregar-categoria", createCategoria)
categorias.get("/obtener-categorias", readCategorias)
categorias.get("/obtener-categoria/:id", readCategoria)
categorias.put("/actualizar-categoria/:id_Categoria", updateCategoria)
categorias.delete("/eliminar-categoria/:id", deleteCategoria)

module.exports = categorias