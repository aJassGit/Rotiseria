/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { URL_PUT_EMPLEADO, URL_GET_EMPLEADO_ESPECIFICO } from '../constants/constants'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { FaPenClip } from "react-icons/fa6";
import Swal from 'sweetalert2'

//compontente editar empleado
export const BotonEditarEmpleado = ({id, nombre, apellido}) => {
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()
 
  //creacion de los estados
  const [empleadoEspecifico, setEmpleadoEspecifico] = useState({})
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(id){
      const obtenerEmpleadoEsp = async () => {
        const res = await axios.get(URL_GET_EMPLEADO_ESPECIFICO + id)
        setEmpleadoEspecifico(res.data[0])
      }

      obtenerEmpleadoEsp()
    }
  },[])
  //consulta para saber si se quiere realizar la edicion
  const handleSubmitForm = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar a ${nombre} ${apellido}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async(result)=> {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(URL_PUT_EMPLEADO + id, {
            Nombre: data.nombre,
            Apellido: data.apellido,
            Usuario: data.usuario,
            Rol: data.rol
          })
    
          if(res.data.status === 200){
            Swal.fire({
              title: "Empleado editado correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
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
          <Modal.Title>Editar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <Form.Group controlId="nombre" className='mb-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control defaultValue={empleadoEspecifico.Nombre} {...register("nombre")}  type="text"/>
            </Form.Group>
            <Form.Group controlId="apellido" className='mb-3'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control defaultValue={empleadoEspecifico.Apellido} {...register("apellido")} name='apellido' type="text" />
            </Form.Group>
            <Form.Group controlId="usuario" className='mb-3'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control defaultValue={empleadoEspecifico.Usuario} {...register("usuario")} name='usuario' type='text'/>
            </Form.Group>
            <Form.Group controlId="rol" className='mb-3'>
              <Form.Label>Rol</Form.Label>
              <Form.Select defaultValue={empleadoEspecifico.Rol} {...register("rol")} name="rol"  className='form-select' >
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit">Editar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}