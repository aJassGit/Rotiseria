import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_GET_CATEGORIAS, URL_GET_PRODUCTOS, URL_POST_VENTA } from '../constants/constants'
import '../css/asideVentas.css'


export const AsideVentas = () => {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])

  //Para que pueda mutar los valores usamos use state
  const [filtroProductos, setFiltroProductos] = useState([])

  useEffect(() => {
    const obtenerCategorias = async () => {
      const resp = await axios.get(URL_GET_CATEGORIAS)
      setCategorias(resp.data)
    }

    obtenerCategorias()
  }, [])

  useEffect(() => {
    const obtenerProductos = async () => {
      const resp = await axios.get(URL_GET_PRODUCTOS)
      setProductos(resp.data)
    }

    obtenerProductos()
  }, [])

  const filtrarProdCat = (e) => {
    const filtro = categorias.find(categoria => categoria.Nombre === e.target.innerText)
    const productosFiltrados = productos.filter(producto => producto.Categoria === filtro.Nombre)
    setFiltroProductos(productosFiltrados)
  }

  const agregarProductoVenta = async (producto) => {
    console.log(producto)
    let cantidad = prompt("Ingresa la cantidad")
    // const respuesta = axios.post(URL_POST_VENTA, {

    // })
  }
  
  return (
    <div className="bg-primary bg-gradient float-start asideContainer" >
      <div className={filtroProductos.length == 0 ? "d-flex justify-content-center text-center" : "d-flex"}>
        <div className={filtroProductos.length == 0 ? "flex-column align-items sinProductos text-center": "flex-column text-center text-light borderDer w-100"}>
          <h2 className="fst-italic text-center fs-4 me-4">Categorias</h2>
          {
            categorias.map((categoria) => (
              <button className={filtroProductos.length == 0 ? "colorSinProductos btn btn-transparent w-100" : 'btn btn-transparent'} onClick={(e)=> filtrarProdCat(e)} key={categoria.id_Categoria}>{categoria.Nombre}</button>
            ))
          }
        </div>
        <div className={filtroProductos.length == 0 ? "d-none" : "flex-column text-center text-light ms-2 w-100"}>
          <h2 className="fst-italic text-center fs-4">Productos</h2>
          {
            filtroProductos.length > 0 ? 
            filtroProductos.map((producto) => (
              <button onClick={() => agregarProductoVenta(producto)} className='btn btn-outline w-100' key={producto.id_Producto}>{producto.Nombre}</button>
            ))
            :
            <p>No existen productos con esta categoría</p>
          }
        </div>
      </div>
    </div>
  )
}