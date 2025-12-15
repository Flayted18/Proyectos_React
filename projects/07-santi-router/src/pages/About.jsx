import { Link } from "../Link"

export default function AboutPage (){
  return (
    <>
      <h1>About</h1>
      <div>
        <img src="https://lepardland.com/wp-content/uploads/2022/06/bigotesgatos-768x474.jpeg" alt="Foto de un gato con bigotes" />
        <p>Hola, me llamo Santiago y estoy creando un clon de React Router</p>
      </div>
      <Link to='/'>Ir a la home</Link>
    </>
  )
}