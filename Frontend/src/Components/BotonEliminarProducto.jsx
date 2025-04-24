/* eslint-disable react/prop-types */
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { URL_DELETE_PRODUCTO } from '../constants/constants'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2'
//componente para eliminar producto recibiendo datos por props
export const BotonEliminarProducto = (props) => {
    const { id, nombre } = props
    const navigate = useNavigate()
    //usando el hook navigate para navegar
    const handleClick = () => {
        try {
            Swal.fire({
                title: `¿Estás seguro de que quieres eliminar el producto ${nombre}?`,
                text: "No se puede revertir el proceso en caso de eliminar esta producto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#808B96",
                confirmButtonText: "Si, borrar!"
            }).then(async(result)=> {
                if(result.isConfirmed){
                    const res = await axios.delete(URL_DELETE_PRODUCTO + id)
                    
                    if(res.data.status === 200){
                        Swal.fire({
                            title: 'Producto eliminado!',
                            icon:'success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(0)
                    }
                }
            })
        
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <Button variant='danger' onClick={() => handleClick(id)}><FaTrash /></Button>
  )
}
