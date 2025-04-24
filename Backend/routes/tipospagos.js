const express = require('express')
const tdp = express.Router()

//Importa la funcion del controller
const { readPagos } = require('../controllers/tipospagos')

tdp.get('/obtener-tdp', readPagos)

module.exports = tdp