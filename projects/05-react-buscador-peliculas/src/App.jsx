import { useState } from "react";
// import { useRef } from "react";
import { Movies } from "./components/Movies";
import {useMovies} from "./hooks/useMovies";

function App() {
  const [movieTitle, setMovieTitle] = useState('')
  const {movies} = useMovies(movieTitle)

  const handleSubmit = (event) => {
    event.preventDefault()
    const {query} = Object.fromEntries(
      new FormData(event.target)
    )
    console.log(query)
    setMovieTitle(query)
  }

  return (
    <div className="page">

      <header>
      <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
          name="query"
          placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies}/>
      </main>



    </div>
  )
}

export default App
