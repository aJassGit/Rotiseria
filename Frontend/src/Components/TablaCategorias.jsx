import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { URL_GET_CATEGORIAS } from '../constants/constants'
import axios from 'axios'
import { BotonEliminarCategoria } from './BotonEliminarCategoria'
import { BotonEditarCategoria } from './BotonEditarCategoria'

//componente tablacategoria
export const TablaCategorias = () => {
  //uso del estado
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const obtenerCategorias = async () => {
      const res = await axios.get(URL_GET_CATEGORIAS)
      setCategorias(res.data)
    }
    obtenerCategorias()
  }, [])

  //tabla que contendra los datos de las categorias
  return (
    <div className="d-flex justify-content-center">
      <Table striped bordered hover className='w-75 align-middle text-center'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            categorias.length > 0 ?
            categorias.map(categoria => (
              <tr key={categoria.id_Categoria}>
                <td>{categoria.Nombre}</td>
                <td>{categoria.Descripcion}</td>
                <td>
                  <BotonEditarCategoria id = {categoria.id_Categoria}/>
                  <BotonEliminarCategoria id = {categoria.id_Categoria} 
                  nombre = {categoria.id_Categoria}/>
                </td>
              </tr>
            ))
            :
            <tr colSpan='5'>No existen categorias</tr>
          }
          <tr>
            
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
