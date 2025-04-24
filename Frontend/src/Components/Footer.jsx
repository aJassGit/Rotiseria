import {Nav,Navbar,Container} from "react-bootstrap";
import logo from '../../public/logoPepe.png'
import { FaInstagram,FaFacebook,FaTwitter, FaTiktok} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import '../css/footer.css'
//componente footer
export const Footer = () => {
  return (
    <>
      {/*link a redes sociales de la sangucheria y mas informacion*/}
      <Navbar className="footer">
        <Container className="d-flex flex-wrap">
          <NavLink to="/*" className="http"><FaFacebook /></NavLink> 
          <NavLink to="/*" className="http"><FaInstagram /></NavLink>
          <NavLink to="/*" className="http"><FaTwitter /></NavLink>
          <Link to="/*" className="http"><FaTiktok /></Link>
            <Nav className="me-auto">
              <NavLink to="/*" className={"text-decoration-none text-dark me-3"}>Politica de privacidad</NavLink>
              <NavLink to="/*" className={"text-decoration-none text-dark me-3"}>Defensa del consumidor</NavLink>        
              <NavLink to="/*" className={"text-decoration-none text-dark me-3"}>Contacto</NavLink>
              <NavLink to="/" className={"text-decoration-none text-dark"}>Volver al inicio</NavLink>
            </Nav>
            <div className="me-2">
              <img className="local2" src={logo} />
            </div>
            <div className="copy">
              <small className="">Copyright © 2024. Todos los derechos reservados </small>  
            </div>
          </Container>
      </Navbar>
    </>
  )
}