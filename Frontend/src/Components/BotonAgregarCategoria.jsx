import { useState } from 'react'
import { Button, Form, Modal} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { URL_POST_CATEGORIA } from '../constants/constants'

//componente agregar cateria que trabaja con un modal
export const BotonAgregarCategoria = () => {

  const [show, setShow] = useState (false);
  const navigate = useNavigate()

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const initialState = {
    nombre: '',
    descripcion: ''
    
  }
  const [datos, setDatos] = useState (initialState);

  const handleChange = (e) => {
    console.log(e.target.name)
    setDatos({
     ...datos,
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const res = await axios.post(URL_POST_CATEGORIA,{
              Nombre: datos.nombre,
              Descripcion: datos.descripcion
          })
          if(res.data.status === 200){
            alert("Categoria agregada correctamente")
            navigate(0)
          }
      } catch (error) {
          console.error(error)
      }
    }

  return (
    <>
      <Button className="boton_agregar mb-4 mx-4" variant="primary" onClick={handleShow}>Agregar Categoria</Button>

      <Modal show={show} onHide={handleClose} className="modal-editar">
        <Modal.Header style={{backgroundColor: "#0D6EFD"}} closeButton>
          <Modal.Title>Agregar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className='mb-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name='nombre' onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="descripcion" className='mb-3'>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control type="text" name='descripcion' onChange={handleChange} required />
            </Form.Group>
            <Button type='submit'>Agregar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}