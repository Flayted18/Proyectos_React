import { useEffect, useState } from "react"
import "./App.css"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`

function App() {  
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  // const [factError, setFactError] = useState()
  
  // para recuperar la cita al cargar la pagina

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => {
      if(!res.ok) throw new Error('Error fetching fact')
      return res.json()
    })
    .then(data => {
      const {fact} = data
        setFact(fact)
      })
  }, [])
    
  // para recuperar la imagen cada vez que cambie la cita
  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ', 3).join(' ')
      
    fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
      .then(res => res.json())
      .then (response => {
      const {url} = response
      setImageUrl(url)
    })    
  }, [fact])

    return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`image extracted using the first three words for ${fact}`}/>}
    </main>
  )
}

export default App
