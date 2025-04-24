import axios from 'axios'
import { Button } from 'react-bootstrap'
import { URL_DELETE_CATEGORIA } from '../constants/constants'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";

//componente eliminarcategoria
export const BotonEliminarCategoria = (props) => {
  const { id, nombre } = props

  //uso hook navigate
  const navigate = useNavigate()

  //confirmacion si se quiere realizar la eliminacion
  const handleClick = async () => {
      try {
          if (confirm("Estas seguro que deseas eliminar el producto " + nombre + "?" )){
              const res = await axios.delete(URL_DELETE_CATEGORIA + id)
              navigate(0)
              return res
          }
      } catch (error) {
          console.log(error)
      }
  }

return (
  <Button variant='danger' onClick={() => handleClick(id)}><FaTrash /></Button>
)
}
