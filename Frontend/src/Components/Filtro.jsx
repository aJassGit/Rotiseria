import { Form } from 'react-bootstrap'
//componente de filtro para filtrar productos
export const Filtro = ({busqueda, setBusqueda}) => {

    const handleChange = ({target}) => {
      setBusqueda(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(busqueda)
    }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-4 mx-4'>
          <Form.Control className='w-50 ' type="text" name='buscar' placeholder="Busca un producto!" value={ busqueda } onChange={ handleChange }/>
      </Form.Group>
    </Form>
  )
}
