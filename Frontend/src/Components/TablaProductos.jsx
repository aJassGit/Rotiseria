/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { BotonEditarProducto } from './BotonEditarProducto';
import { BotonEliminarProducto } from './BotonEliminarProducto'
import { URL_GET_PRODUCTOS } from '../constants/constants';
import axios from 'axios'

//componente de tablaProductos recibiendo datos por props
export const TablaProductos = ({productos, setProductos}) => {
   //haciendo uso del useEffect
  useEffect(() => {
    const obtenerProductos = async () => {
      const respuesta = await axios.get(URL_GET_PRODUCTOS)
      setProductos(respuesta.data[0])
    }

    obtenerProductos()
  }, [])
  //tabla que contendra los datos de las productos
  return (
    <Table striped bordered hover className='gralTablas text-center align-middle'>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre del Producto</th>
          <th>Categoria</th>
          <th>Proveedor</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          productos.length > 0 ?
          productos.sort((a,b) => a.id_Producto - b.id_Producto)
          .map(producto => (
            <tr key={producto.id_Producto}>
              <td>{producto.id_Producto}</td>
              <td>{producto.Nombre}</td>
              <td>{producto.Categoria}</td>
              <td>{producto.Proveedor}</td>
              <td><img src={producto.Imagen} alt={producto.Nombre} style={{height: "150px", width: "150px"}}/></td>
              <td className='text-danger fw-bold'>${producto.Precio}</td>
              <td>
                <BotonEditarProducto id = {producto.id_Producto}/>
                <BotonEliminarProducto 
                  id = {producto.id_Producto}
                  nombre = {producto.Nombre}
                />
              </td>
            </tr>
          ))
          :
          <tr>
            <td colSpan='7' className='text-center'>No se pudieron recuperar los datos en este momento. Intentelo más tarde</td>
          </tr>
        }
      </tbody>
    </Table>
  )
}