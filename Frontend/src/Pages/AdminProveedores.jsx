import { useState, useEffect } from 'react'
import { TablaProveedores } from "../Components/TablaProveedores";
import { BotonAgregarProveedor } from "../Components/BotonAgregarProveedor";
import { NavbarPagina } from './../Components/NavbarPagina';
import { Footer } from './../Components/Footer';
import { useNavigate } from "react-router-dom";
import { URL_GET_EMPLEADO_ESPECIFICO } from "../constants/constants";
import axios from 'axios'
//pages AdminProovedores
export const AdminProveedores = () => {
  //haciendo uso del estado y hoock navigate
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
      <h2 className='text-center mt-3 mb-3'>Administración de Proveedores</h2>
      <BotonAgregarProveedor />
      <TablaProveedores />
      <Footer />
    </>
  );
};