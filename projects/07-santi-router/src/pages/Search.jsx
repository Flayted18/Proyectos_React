import { useEffect } from "react"
import { Link } from "../Link"


export default function SearchPage ({routeParams}) {
    useEffect(() => {
        document.title = `Has buscado ${routeParams.query}`
    }, [])
    
    return (
        <>
            <h4>Has buscado {routeParams.query}</h4>
            <div>
                <Link to='/'>Ir a la home</Link>
            </div>
        </>
    )
}