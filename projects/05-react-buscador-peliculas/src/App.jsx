import { useEffect, useState, useRef} from "react";
// import { useRef } from "react";
import { Movies } from "./components/Movies";
import {useMovies} from "./hooks/useMovies";
import "./App.css"

function useSearch(){
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if (search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\s+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    
    setError(null)
  }, [search])

  return {search, setSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, loading, ErrorMapping} = useMovies({search, sort})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="page">

      <header>
      <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
          style={{
            border: '1px solid transparent',
            borderColor: error? 'red' : 'transparent'
          }}
          value={search}
          onChange={handleChange}
          name="query"
          placeholder='Avengers, Star Wars, The Matrix...' 
          />
          <input 
          type="checkbox" 
          onChange={handleSort} 
          checked={sort} 
          />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
          {
            loading
            ? <p>Cargando...</p>
            : <Movies movies={movies}/>
          }
          
      </main>



    </div>
  )
}

export default App
