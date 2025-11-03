

function App() {
  return (
    <div className="page">
      <header>
      <h1>Buscador de Peliculas</h1>
        <form className='form'>
          <input placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>

        </form>
      </header>

      <main>
        Aqui van los resultados de la busqueda
      </main>



    </div>
  )
}

export default App
