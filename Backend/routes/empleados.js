const express = require('express')
const empleados = express.Router()

//Llama las funciones de nuestro controller
const { createEmpleados, readEmpleados, readEmpleado, login, updateEmpleado, deleteEmpleado } = require("../controllers/empleados")

empleados.post("/agregar-empleado", createEmpleados)
empleados.get("/obtener-empleados", readEmpleados)
empleados.get("/obtener-empleado/:id", readEmpleado)
empleados.post("/login", login)
empleados.put("/actualizar-empleado/:id_Empleado", updateEmpleado)
empleados.delete("/eliminar-empleado/:id", deleteEmpleado)

module.exports = empleados