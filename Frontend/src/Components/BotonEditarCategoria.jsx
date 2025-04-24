import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { URL_PUT_CATEGORIA, URL_GET_CATEGORIA_ESPECIFICA } from '../constants/constants'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { FaPenClip } from "react-icons/fa6";
// componente para editar categoria recibiendo por props el id
export const BotonEditarCategoria = ({id}) => {
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()
  
  const [categoriaEspecifica, setCategoriaEspecifica] = useState({})
  
  //creando los estados
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(id){
      const obtenerCategoriaEsp = async () => {
        const res = await axios.get(URL_GET_CATEGORIA_ESPECIFICA + id)
        setCategoriaEspecifica(res.data.results[0])
      }

      obtenerCategoriaEsp()
    }
  },[])


  //envio del form y lo controla por medio de try-catch
  const handleSubmitForm = async (data) => {
    try {
      const res = await axios.put(URL_PUT_CATEGORIA + id, {
        Nombre: data.nombre,
        Descripcion: data.descripcion
      })

      if(res.data.status === 200){
        alert(res.data.message)
        navigate(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button className="btn btn-primary me-2" onClick={handleShow}>
        <FaPenClip />
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-editar">
        <Modal.Header style={{backgroundColor: "#0D6EFD"}} closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <Form.Group controlId="nombre" className='mb-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control defaultValue={categoriaEspecifica.Nombre} {...register("nombre")}  type="text"/>
            </Form.Group>
            <Form.Group controlId="descripcion" className='mb-3'>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control defaultValue={categoriaEspecifica.Descripcion} {...register("descripcion")} name='descripcion' type="text" />
            </Form.Group>
            <Button type="submit">Editar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}