import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { URL_GET_EMPLEADOS } from '../constants/constants'
import axios from 'axios'
import { BotonEliminarEmpleado } from './BotonEliminarEmpleado'
import {BotonEditarEmpleado} from './BotonEditarEmpleado'

//componente de TablaEmpleados
export const TablaEmpleados = () => {
  //haciendo uso de estado y useEffect
  const [empleados, setEmpleados] = useState([])

  useEffect(() => {
    const obtenerEmpleados = async () => {
      const res = await axios.get(URL_GET_EMPLEADOS)
      setEmpleados(res.data)
    }
    obtenerEmpleados()
  }, [])
  //tabla que contendra los datos de las empleados
  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover className='w-75 align-middle text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>          
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleados.length > 0 ?
            empleados.map(empleado => (
              <tr key={empleado.id_Empleado}>
                <td className='fw-bold'>{empleado.id_Empleado}</td>
                <td>{empleado.Nombre}</td>
                <td>{empleado.Apellido}</td>
                <td>{empleado.Usuario}</td>
                {
                  empleado.Rol === "Administrador" ?
                  <td className='text-danger fw-bold fst-italic'>{empleado.Rol}</td>
                  :
                  <td className='text-primary fw-bold fst-italic'>{empleado.Rol}</td>
                }
                <td>
                  <BotonEditarEmpleado id = {empleado.id_Empleado} nombre = {empleado.Nombre} apellido = {empleado.Apellido}/>
                  <BotonEliminarEmpleado 
                  id = {empleado.id_Empleado} 
                  nombre = {empleado.Nombre}
                  apellido = {empleado.Apellido}
                  />
                </td>
              </tr>
            ))
            :
            <tr colSpan='5'>No existen empleados</tr>
          }
          <tr>
            
          </tr>
        </tbody>
      </Table>
    </div>
  )
}