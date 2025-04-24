import { useState, useEffect } from 'react'
import { TablaCategorias } from "../Components/TablaCategorias"
import { BotonAgregarCategoria } from "../Components/BotonAgregarCategoria"
import { NavbarPagina } from './../Components/NavbarPagina';
import { Footer } from './../Components/Footer';
import { useNavigate } from "react-router-dom";
import { URL_GET_EMPLEADO_ESPECIFICO } from "../constants/constants";
import axios from 'axios'

//pagina que contiene el  admincategorias
export const AdminCategorias = () => {
  // declarando estados y useNavigate
  const [empleado, setEmpleado] = useState({})
  const navigate = useNavigate();
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
      <h2 className='text-center mt-3'>Administración de Categorias</h2>
      <BotonAgregarCategoria/> 
      <TablaCategorias />
      <Footer/>
    </>
  )
}