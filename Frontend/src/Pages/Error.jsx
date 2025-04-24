
import { Link } from 'react-router-dom'
//pagina de eror
export const Error = () => {
  // si la navegacion no es correcta reedirecciona a una pagina erronea.
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <img src="https://th.bing.com/th/id/OIP.Qrrlzb8hYmiXrAziFIQ1uAAAAA?rs=1&pid=ImgDetMain" alt="pagina de error"/>
      </div>
      <h1 className="text-center">Error 404. Página no encontrada</h1>
      <div className="d-flex justify-content-center">
        <Link className='btn btn-primary' to="/">Volver a página principal</Link>
      </div>
    </>
  )
}
