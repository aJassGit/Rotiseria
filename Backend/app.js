const express = require('express') //Utiliza la dependencia de express
const cors = require('cors') //Utiliza la dependencia de cors
const app = express(); //Decimos que app utilizará express
const PUERTO = 8000

//Requerimos los archivos de rutas
const productos = require('./routes/productos')
const categorias = require('./routes/categorias')
const proveedores = require('./routes/proveedores')
const empleados = require('./routes/empleados')
const ventas = require('./routes/ventas')
const tdp = require('./routes/tipospagos')
require('./config/db') 

app.use(cors())
app.use(express.json())
//Definimos las rutas que seguirá nuestro back-end para las distintas peticiones
app.use('/productos', productos)
app.use('/categorias', categorias)
app.use('/proveedores', proveedores)
app.use('/empleados', empleados)
app.use('/ventas', ventas)
app.use('/tipospagos', tdp)
//Hacemos que abra nuestro puerto y lo utilice
app.listen(PUERTO, () => {
  console.log('Servidor levantado en el puerto ' + PUERTO)
})