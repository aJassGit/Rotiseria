/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import { URL_PUT_VENTA, URL_GET_EMPLEADOS, URL_GET_TIPOSPAGOS, URL_GET_PRODUCTOS, URL_GET_VENTA } from '../constants/constants'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { FaPenClip } from "react-icons/fa6";
import Swal from 'sweetalert2'

//componente de editarventas
export const BotonEditarVenta = ({id}) => {
  const navigate = useNavigate()
  
  const { register, handleSubmit } = useForm()
  //Creacion de los estados
  const [empleados, setEmpleados] = useState([])
  const [tiposPagos, setTiposPagos] = useState([])
  const [productos, setProductos] = useState([])
  const [ventaEspecifica, setVentaEspecifica] = useState([])
  const [subtotal, setSubtotal] = useState(null)
  const [cantidad, setCantidad] = useState(null)
  const [precio, setPrecio] = useState(null)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Funcion para obtener la venta especifica
  useEffect(() => {
    if(id){
      const obtenerVentaEspecifica = async () => {
        const res = await axios.get(URL_GET_VENTA + id)
        setVentaEspecifica(res.data[0])
        setSubtotal(res.data[0].Subtotal)
        setCantidad(res.data[0].Cantidad)
      }

      obtenerVentaEspecifica()
    }
  },[])


  //Funcion para calcular el precio
  useEffect(() => {
    let precioACalcular = subtotal / cantidad
    setPrecio(precioACalcular)
  }, [cantidad, subtotal])


  //Funcion para obtener los empleados
  useEffect(() => {
    const obtenerEmpleados = async () => {
      const res = await axios.get(URL_GET_EMPLEADOS)
      setEmpleados(res.data)
    }

    obtenerEmpleados()
  }, [])

  //Funcion para obtener los tipos de pagos
  useEffect(() => {
    const obtenerTiposPagos = async () => {
      const res = await axios.get(URL_GET_TIPOSPAGOS)
      setTiposPagos(res.data)
    }

    obtenerTiposPagos()
  }, [])


  //Funcion para obtener los productos
  useEffect(() => {
    const obtenerProductos = async () => {
      const res = await axios.get(URL_GET_PRODUCTOS)
      setProductos(res.data[0])
    }

    obtenerProductos()
  }, [])

  //Funcion para enviar el formulario
  const handleSubmitForm = (data) => {
    Swal.fire({
      title: `¿Estás seguro de que quieres editar esta venta?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
      cancelButtonText: "Cancelar"
    }).then(async(result) => {
      if(result.isConfirmed){
        try {
          const res = await axios.put(URL_PUT_VENTA + id, {
            id_Empleado: data.empleado,
            id_TipoPago: data.tipoPago,
            id_Producto: data.producto,
            Cantidad: data.cantidad,
            Precio: data.precio,
            Fecha: data.fecha
          })
        
          if(res.data.status === 200){
            Swal.fire({
              title: "La venta ha sido editada correctamente!",
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
          <Modal.Title>Editar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Form.Group className='mb-3'>
              <Form.Label>Producto</Form.Label>
              <Form.Select defaultValue={ventaEspecifica.id_Producto} {...register("producto")}  className='form-select' >
                {
                  productos.map(producto => (
                    <option key={producto.id_Producto} value={producto.id_Producto}>{producto.Nombre}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label controlId="empleados">Empleado</Form.Label>
              <Form.Select defaultValue={ventaEspecifica.id_Empleado} {...register("empleado")}  className='form-select'>
                {empleados.map(empleado => (
                  <option key={empleado.id_Empleado} value={empleado.id_Empleado}>{empleado.Empleado}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label controlId="tiposPagos">Tipo de pago</Form.Label>
              <Form.Select defaultValue={ventaEspecifica.id_TipoPago} {...register("tipoPago")} className='form-select'>
                {tiposPagos.map(tipoPago => (
                  <option key={tipoPago.id_TipoPago} value={tipoPago.id_TipoPago}>{tipoPago.Nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="cantidad" className='mb-3'>
              <Form.Label>Cantidad</Form.Label>
              <Form.Control defaultValue={ventaEspecifica.Cantidad} {...register("cantidad")} type="number" />
            </Form.Group>
            <Form.Group controlId="precio" className='mb-3'>
              <Form.Label>Precio unitario</Form.Label>
              <Form.Control defaultValue={precio} {...register("precio")} type='text'/>
            </Form.Group>
            <Form.Group controlId="fecha" className='mb-3'>
              <Form.Label>Fecha de venta</Form.Label>
              <Form.Control defaultValue={ventaEspecifica.Fecha} {...register("fecha")} type='date'/>
            </Form.Group>
            <Button type="submit">Editar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}