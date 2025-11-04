const API_KEY = '426c4a4e';


export const searchMovies = async ({search}) => {
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search
  

        return movies?.map(movie => ({
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
        }))

    } catch (Error){
        throw new Error('Error searching movies')
    }
    
}