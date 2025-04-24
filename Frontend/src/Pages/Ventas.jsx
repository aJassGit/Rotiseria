import { useState, useEffect } from 'react'
import { Footer } from '../Components/Footer'
import { ListadoVentas } from '../Components/ListadoVentas'
import { NavbarPagina } from './../Components/NavbarPagina';
import { useNavigate } from "react-router-dom";
import { URL_GET_EMPLEADO_ESPECIFICO } from "../constants/constants";
import axios from 'axios'

export const Ventas = () => {
  const [empleado, setEmpleado] = useState({})
  const navigate = useNavigate();
  let idEmpleado = sessionStorage.getItem('idEmpleado');

  useEffect(() => {
    if(idEmpleado) {
      const obtenerEmpleadoEsp = async () => {
        try {
          const response = await axios.get(`${URL_GET_EMPLEADO_ESPECIFICO}${idEmpleado}`)
          setEmpleado(response.data)
        } catch (error) {
          console.error('Error al obtener empleado específico:', error)
        }
      }

      obtenerEmpleadoEsp()
    }
  }, [])

  useEffect(() => {
    if(!idEmpleado || (idEmpleado && empleado.Rol === "Empleado" || empleado.Rol === "Empleado")) navigate("/login", { replace: true })
  }, [])

  return (
    <>
      <NavbarPagina />
      <ListadoVentas />
      <Footer/>
    </>
  )
}
