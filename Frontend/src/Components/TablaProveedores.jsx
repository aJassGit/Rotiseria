import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { URL_GET_PROVEEDORES } from '../constants/constants'
import axios from 'axios'
import { BotonEditarProveedor } from './BotonEditarProveedor'
import { BotonEliminarProveedor } from './BotonEliminarProveedor'
//componente que contendra la tablaprovedores
export const TablaProveedores = () => {
  //haciendo uso del estado
  const [proveedores, setProveedores] = useState([])

  useEffect(() => {
    const obtenerProveedores = async () => {
      const res = await axios.get(URL_GET_PROVEEDORES)
      setProveedores(res.data)
    }
    obtenerProveedores()
  }, [])
  //tabla que contendra los datos de las proveedores 
  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover className='w-75 align-middle text-center'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CUIT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            proveedores.length > 0 ?
            proveedores.map(proveedor => (
              <tr key={proveedor.id_Proveedor}>
                <td>{proveedor.Nombre}</td>
                <td>{proveedor.Apellido}</td>
                <td>{proveedor.CUIT}</td>
                <td>
                  <BotonEditarProveedor id = {proveedor.id_Proveedor} nombre = {proveedor.Nombre} apellido = {proveedor.Apellido}/>
                  <BotonEliminarProveedor 
                  id = {proveedor.id_Proveedor}
                  nombre = {proveedor.Nombre}
                  apellido = {proveedor.Apellido}
                  />
                </td>
              </tr>
            ))
            :
            <tr colSpan='5'>No existen proveedores</tr>
          }
          <tr>
            
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
