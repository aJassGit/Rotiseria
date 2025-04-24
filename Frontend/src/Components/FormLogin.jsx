import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { URL_LOGIN } from "../constants/constants";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../css/session.css'
//componente de login
export const FormLogin = () => {
    const navigate = useNavigate()
    //Estado inicial
    const initialState = {
        usuario: "",
        contraseña: ""
    }
    const [datos, setDatos] = useState(initialState)

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] :e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(URL_LOGIN, {
                Usuario: datos.usuario,
                Password: datos.contraseña,
            })

            if(res.data.status === 200){
                Swal.fire({
                    icon:'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                sessionStorage.setItem("idEmpleado", res.data.results[0].id_Empleado)
                navigate("/")
            }
            else if(res.data.status === 404){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    text: "Intentelo de nuevo"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        {/*formulario de ingreso de datos para del proyecto */}
        <Form onSubmit={handleSubmit} className="sessionForm">
            <Form.Group controlId="name" className="mb-4">
                <Form.Label className="datosSession">Usuario</Form.Label>
                <Form.Control className="loginInputSession" type="text" placeholder="Ingrese su nombre de usuario" name="usuario" onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="pass">
                <Form.Label className="datosSession">Contraseña</Form.Label>
                <Form.Control className="loginInputSession" type="password" name="contraseña" placeholder="Ingrese su contraseña" onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Button type="submit" className="mt-2 mb-2 botonSession">Iniciar sesion</Button>
            </Form.Group>
            <h6 className='refer mt-3 text-center'><Link className="text-light" to={"/register"}>¿Aún no tienes una cuenta?</Link></h6>
        </Form>
    </>
  )
}