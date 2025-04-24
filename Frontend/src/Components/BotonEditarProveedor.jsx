import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { URL_PUT_PROVEEDOR, URL_GET_PROVEEDOR_ESPECIFICO } from '../constants/constants'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { FaPenClip } from "react-icons/fa6";
import Swal from 'sweetalert2'

//componete editarproovedor que recibe datos por props
export const BotonEditarProveedor = ({id, nombre, apellido}) => {
  const { register, handleSubmit } = useForm()

  //haciendo uso del hook navigate
  const navigate = useNavigate()
 
  const [proveedorEspecifico, setProveedorEspecifico] = useState({})
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(id){
      const obtenerProveedorEsp = async () => {
        const res = await axios.get(URL_GET_PROVEEDOR_ESPECIFICO + id)
        setProveedorEspecifico(res.data.results[0])
      }

      obtenerProveedorEsp()
    }
  },[])

  //por medio del envio del formulario confirma si se quieren editar los datos
  const handleSubmitForm = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar a ${nombre} ${apellido}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async(result) => {
      if(result.isConfirmed){
        try {
          const res = await axios.put(URL_PUT_PROVEEDOR + id, {
            Nombre: data.nombre,
            Apellido: data.apellido,
            CUIT: data.CUIT
          })
    
          if(res.data.status === 200){
            Swal.fire({
              title: "Proveedor editado correctamente",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            })
            navigate(0)
          }
        } catch (error) {
          console.error(error)
        }

      }
    })

  }

  return (
    <>
      <Button className="btn btn-primary me-2" onClick={handleShow}>
        <FaPenClip />
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-editar">
        <Modal.Header style={{backgroundColor: "#0D6EFD"}} closeButton>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <Form.Group controlId="name" className='mb-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control defaultValue={proveedorEspecifico.Nombre} {...register("nombre")}  type="text"/>
            </Form.Group>
            <Form.Group controlId="ape" className='mb-3'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control defaultValue={proveedorEspecifico.Apellido} {...register("apellido")} name='apellido' type="text" />
            </Form.Group>
            <Form.Group controlId="cuit" className='mb-3'>
              <Form.Label>Cuit</Form.Label>
              <Form.Control defaultValue={proveedorEspecifico.CUIT} {...register("CUIT")} name='CUIT' type='number'/>
            </Form.Group>
            <Button type="submit">Editar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}