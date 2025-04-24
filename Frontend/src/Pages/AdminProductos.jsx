import { useState, useEffect } from 'react'
import { TablaProductos } from '../Components/TablaProductos'
import { BotonAgregarProducto } from '../Components/BotonAgregarProducto'
import { Filtro } from '../Components/Filtro'
import { NavbarPagina } from './../Components/NavbarPagina';
import { Footer } from './../Components/Footer';
import { useNavigate } from "react-router-dom";
import { URL_GET_EMPLEADO_ESPECIFICO } from "../constants/constants";
import axios from 'axios'
//uso de la page AdminProductos
export const AdminProductos = () => {

  //Creacion de estados y useState correspoondiente
  const [busqueda, setBusqueda] = useState('')
  const [productos, setProductos] = useState([])
  const [empleado, setEmpleado] = useState({})
  const navigate = useNavigate();
 //verifico si el filtro funciona a pesar que el producto se ingrese en mayusculas
  const productosFiltrados = productos.filter(producto => producto.Nombre.toLowerCase().includes(busqueda))

  let idEmpleado = sessionStorage.getItem('idEmpleado');

  useEffect(() => {
    if(idEmpleado) {
      const obtenerEmpleadoEsp = async () => {
        try {
          const response = await axios.get(`${URL_GET_EMPLEADO_ESPECIFICO}${idEmpleado}`)
          setEmpleado(response.data[0])
        } catch (error) {
          console.error('Error al obtener empleado específico:', error)
        }
      }

      obtenerEmpleadoEsp()
    }
  }, [])

  useEffect(() => {
    if(!idEmpleado || (idEmpleado && empleado.Rol === "Empleado")) navigate("/", { replace: true })
  }, [empleado.Rol])
  
  return (
    <>
      <NavbarPagina />
      <h2 className='text-center mt-4'>Administración de Productos</h2>
      <BotonAgregarProducto />
      <Filtro busqueda = {busqueda} setBusqueda={setBusqueda}/>
      <TablaProductos productos = {productosFiltrados} setProductos={setProductos}/>
      <Footer />
    </>
  )
}