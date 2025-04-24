import { useState, useEffect } from 'react'
import {Nav,Navbar, NavDropdown} from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { URL_GET_EMPLEADO_ESPECIFICO } from './../constants/constants'; 
import logo from '../../public/logoPepe.png'
import axios from 'axios'
import '../css/ventas.css'
import '../css/navbar.css'
//componente navbar 
export const NavbarPagina = () => {
  let idEmpleado = sessionStorage.getItem('idEmpleado')
  const [empleado, setEmpleado] = useState({})

  //uso del hook navigate
  const navigate = useNavigate()

  useEffect(() => {
    if(idEmpleado){
      const obtenerEmpleadoEsp = async () => {
        const resp = await axios.get(`${URL_GET_EMPLEADO_ESPECIFICO}${idEmpleado}`) 
        setEmpleado(resp.data[0])
      }

      obtenerEmpleadoEsp()
    }


  }, [])

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Nav className="me-auto px-5">
          <NavLink className={"me-5 fs-4 text-decoration-none text-light"} to={"/"}>Ventas</NavLink>
          {
            empleado.Rol === "Administrador" ?
            <NavDropdown className="me-5 fs-4"  title="Administracion">
              <NavDropdown.Item onClick={() => navigate("/administracion/productos")}>Productos</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/administracion/empleados")}>Empleados</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/administracion/proveedores")}>Proveedores</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/administracion/categorias")}>Categorias</NavDropdown.Item>
            </NavDropdown>
            :
            null
          }
          <NavLink className={"me-5 fs-4 text-decoration-none text-light"} to={"/login"} onClick={() => sessionStorage.removeItem('idEmpleado')}>Cerrar Sesión</NavLink>
        </Nav>
        <div className="me-2 px-5">
          <img className="local" src={logo} />
        </div>
      </Navbar>
    </>
  )
}