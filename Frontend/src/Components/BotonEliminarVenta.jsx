/* eslint-disable react/prop-types */
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { URL_DELETE_VENTA} from '../constants/constants'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2'

//componente de eliminarventa que recibe datos por props 
export const BotonEliminarVenta = ({id}) => {
  const navigate = useNavigate()
  //usando el hook navigate para navegar
    //esta funcion se encarga poor medio de try-catch si se eliminara o no el producto
  const handleClick = () => {
      try {
        Swal.fire({
          title: `¿Estás seguro de que quieres eliminar esta venta?`,
          text: "No se puede revertir el proceso en caso de eliminar esta venta",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#808B96",
          confirmButtonText: "Si, borrar!"
        }).then(async(result) => {
          if(result.isConfirmed){
            const resp = await axios.delete(`${URL_DELETE_VENTA}${id}`)
            
            if(resp.data.status === 200){
              Swal.fire({
                title: 'Eliminado!',
                text: 'La venta ha sido eliminada correctamente.',
                icon:'success',
                showConfirmButton:false,
                timer: 1500,
              })

              navigate(0)
            }
          }
        })
      } catch (error) {
          console.log(error)
      }
  }

return (
  <Button variant='danger' onClick={() => handleClick(id)}><FaTrash /></Button>
)
}
