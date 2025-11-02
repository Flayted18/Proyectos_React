import { useEffect, useState } from "react"

export function useCatImage ({fact}){
  const [imageUrl, setImageUrl] = useState()

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

  return {imageUrl}
}