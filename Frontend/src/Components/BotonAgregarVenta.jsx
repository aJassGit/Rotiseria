import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 
import axios from 'axios'
import { URL_GET_PRODUCTOS, URL_GET_EMPLEADOS, URL_GET_TIPOSPAGOS, URL_POST_VENTA } from './../constants/constants';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

//componente de agregar ventsa donde usamos el hook useNavigate
export const BotonAgregarVenta = () => {
  const navigate = useNavigate()

 
  const initialState = {
    empleado: 0,
    tipoPago: 0,
    producto: 0,
    cantidad: null,
    precio: null,
    fecha: ""
  }

   //creando distintos estados
  const [show, setShow] = useState(false);
  const [productos, setProductos] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [tiposPago, setTipoPago] = useState([])
  const [datos, setDatos] = useState(initialState)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(URL_GET_PRODUCTOS);
        const data = await response.json()
        setProductos(data[0])
      } catch (error) {
        console.error('Error:', error);
      }
    }

    obtenerProductos()
  }, [])
  
  useEffect(() => {
    const obtenerEmpleados = async() => {
      try {
        const respuesta = await fetch(URL_GET_EMPLEADOS)
        const data = await respuesta.json()
        setEmpleados(data)
      } catch (error) {
        console.error(error)
      }
    }

    obtenerEmpleados()
  }, [])

  useEffect(() => {
    const obtenerTiposDePago = async () => {
      try {
        const response = await fetch(URL_GET_TIPOSPAGOS);
        const data = await response.json()
        setTipoPago(data)
      } catch (error) {
        console.error('Error:', error);
      }
    }

    obtenerTiposDePago()
  }, [])

  //capturo el valor del input
  const handleInputChange = (e) => {
    //let productoCoincide = productos.filter((prod) => prod.Nombre === e.target.value
    //setPrecio = ({productoCoinide[0].Precio})

    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    })
  }
  //agregar ventas y controla el error con try-catch
  const agregarVentas = async (e) => {
    e.preventDefault()

    try {
      const resp = await axios.post(URL_POST_VENTA, {
        id_Empleado: datos.empleado,
        id_TipoPago: datos.tipoPago,
        id_Producto: datos.producto,
        Cantidad: datos.cantidad,
        Precio: datos.precio,
        Fecha: datos.fecha
      })

      if(resp.data.status === 201){
        Swal.fire({
          icon:'success',
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        navigate(0)
      }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <button className='btn btn-outline-primary mb-2 mx-4' onClick={handleShow}>Agregar Venta</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor: "#0D6EFD"}} closeButton>
          <Modal.Title>Agregar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/*al oprimir en cualquier select nos desplegara un conjunto de opciones*/}
          <form onSubmit={agregarVentas}>
            <div className='mb-4'>
              <label>Producto</label>
              <select className='form-select' name="producto" onChange={handleInputChange}>
                <option disabled selected value="">Seleccione un producto...</option>
                {
                  productos.map(producto => (
                    <option key={producto.id_Producto} value={producto.id_Producto}>{producto.Nombre}</option>
                  ))
                }
              </select>
            </div>
            <div className='mb-4'>
              <label>Empleado</label>
              <select className='form-select' name="empleado" onChange={handleInputChange}>
                <option disabled selected value="">Seleccione un empleado...</option>
                {
                  empleados.map(empleado => (
                    <option key={empleado.id_Empleado} value={empleado.id_Empleado}>{empleado.Empleado}</option>
                  ))
                }
              </select>
            </div>
            <div className='mb-4'>
              <label>Tipo de Pago</label>
              <select className='form-select' name="tipoPago" onChange={handleInputChange}>
                <option disabled selected value="">Seleccione un tipo de pago...</option>
                {
                  tiposPago.map(tipoPago => (
                    <option key={tipoPago.id_TipoPago} value={tipoPago.id_TipoPago}>{tipoPago.Nombre}</option>
                  ))
                }
              </select>
            </div>
            <div className='mb-4'>
              <label>Cantidad a Llevar</label>
              <input type="number" className='form-control' name="cantidad" onChange={handleInputChange}/>
            </div>
            <div className='mb-4'>
              <label>Precio Unitario</label>
              <input type="number" className='form-control' name="precio" onChange={handleInputChange}/>
            </div>
            <div className='mb-4'>
              <label>Fecha</label>
              <input type="date" className='form-control' name="fecha" onChange={handleInputChange}/>
            </div>
            <Button variant="primary" type='submit'>
              Agregar Venta
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}