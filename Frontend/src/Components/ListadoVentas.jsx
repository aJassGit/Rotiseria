import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { BotonAgregarVenta } from './BotonAgregarVenta'
import { BotonEditarVenta } from './BotonEditarVenta'
import { BotonEliminarVenta } from './BotonEliminarVenta'
import axios from 'axios'
import { URL_GET_VENTAS } from '../constants/constants'
//componte de listadoventas
export const ListadoVentas = () => {

  //estados independientes 
  const [ventas, setVentas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const listarVentas = async () => {
      const resp = await axios.get(URL_GET_VENTAS)
      if (resp.status === 200) {
        setVentas(resp.data.result[0])
        setTotal(resp.data.total)
      }
    }
    listarVentas()
  }, [])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

    
  let resultados = []

  if(!busqueda){
    resultados = ventas
  }
  else{
    resultados = ventas.filter((venta) => venta.NombreProducto.toLowerCase().includes(busqueda.toLowerCase()))
  }
  // tabla que contiene la informacion de las ventas
  return (
    <>
      <h2 className="text-center mt-3">Listado de Ventas</h2>
      <BotonAgregarVenta />
      <div className='mt-4'>
        <input type="text" className='px-2 py-1 w-25 mx-4 mb-4' onChange={handleInputChange} value={busqueda} placeholder='Buscar una venta...'/>
      </div>
      <div className='d-flex justify-content-center'> 
        <Table striped bordered hover className='w-75 text-center'>
        <thead>
          <tr>
            <th>ID de Venta</th>
            <th>Nombre del Producto</th>
            <th>Empleado</th>
            <th>Cantidad</th>
            <th>Tipo de Pago</th>
            <th>Subtotal</th>
            <th>Fecha de Venta</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            resultados.map(venta => (
              <tr key={venta.id_Venta}>
                <td className='fw-bold'>{venta.id_Venta}</td>
                <td>{venta.NombreProducto}</td>
                <td>{venta.Empleado}</td>
                <td>{venta.Cantidad}</td>
                {
                  venta.TipoPago === "Efectivo" ? 
                  <td className='text-success fw-bold'>{venta.TipoPago}</td>
                  :
                  venta.TipoPago === "Credito" ?
                  <td className='text-warning fw-bold'>{venta.TipoPago}</td>
                  :
                  venta.TipoPago === "Debito" ?
                  <td className='text-danger fw-bold'>{venta.TipoPago}</td>
                  :
                  <td className='text-primary fw-bold'>{venta.TipoPago}</td>
                }
                <td className='text-danger fw-bold'>${venta.Subtotal}</td>
                <td>{venta.Fecha}</td>
                <td>
                  <BotonEditarVenta id = {venta.id_Venta}/>
                  <BotonEliminarVenta 
                  id = {venta.id_Venta}
                />
                </td>
              </tr>
            ))
          }
        </tbody>
        </Table>
      </div>
      <h3 className='text-center'>TOTAL: <strong className='text-danger'>${total}</strong></h3>
      <div className="d-flex justify-content-center mb-3">
        <button className='btn btn-outline-primary' onClick={() => print()}>Imprimir Venta</button>
      </div>
    </>
  )
}