const { conexion } = require('../config/db')

//request => peticion
//response => respuesta

//Lee los tipos de pago 
const readPagos = (req, res) => {
    const query = "SELECT * FROM Tipos_De_pago"

    conexion.query(query, (err, results) => {
        if (err) {
        console.log(err)
        res.status(500).json({ error: 'Error en la consulta' })
        } else {
        res.json(results)
        }
    })
}

//Exporta la funcion
module.exports = { readPagos }