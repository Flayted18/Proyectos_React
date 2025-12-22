import { Link } from "../Link"

export const Page404 = () => {
  return (
    <>
        <h1>This is not fine. Error 404</h1>
        <img src="https://midu.dev/images/this-is-fine-404.gif" alt="Gif del perro This is Fine quemandose vivo" />
        
        <div>
            <Link to='/'>Ir a la home</Link>
        </div>
    </>
  )
}
