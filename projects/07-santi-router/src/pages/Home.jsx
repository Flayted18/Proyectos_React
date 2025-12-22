import { useEffect } from "react"
import { Link } from "../Link"

export default function HomePage (){
  useEffect(() => {
          document.title = `Estás en la Home Page`
      }, [])
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un react router desde cero</p>
      <Link to='/about'>Ir a Sobre Nosotros</Link>
    </>
  )
}