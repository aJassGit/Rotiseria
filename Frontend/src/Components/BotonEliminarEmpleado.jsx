/* eslint-disable react/prop-types */
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { URL_DELETE_EMPLEADO} from '../constants/constants'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2'
//componente para la eliminacion de empleado usando props
export const BotonEliminarEmpleado= (props) => {
    const { id, nombre, apellido } = props
    const navigate = useNavigate()
    //esperando confirmacion para dar de baja a un empleado
    const handleClick = () => {
        Swal.fire({
            title: `Estas seguro de que quieres eliminar a ${nombre} ${apellido}?`,
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!',
        }).then(async(result)=> {
            if(result.isConfirmed){
                const res = await axios.delete(URL_DELETE_EMPLEADO+ id)     
                
                if(res.data.status === 200){
                    Swal.fire({
                        title: 'Empleado eliminado',
                        text: 'El empleado ha sido eliminado correctamente',
                        icon:'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(0)
                }
            }
        })
    }

  return (
    <Button variant='danger' onClick={() => handleClick(id)}><FaTrash /></Button>
  )
}