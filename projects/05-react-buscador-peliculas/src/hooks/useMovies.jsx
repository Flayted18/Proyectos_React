import responseMovies from "../mocks/withResults.json";
// import noResults from "../mocks/noResults";

// import { useEffect } from "react";

export function useMovies(){

    // const API_KEY = '426c4a4e';
    // useEffect(() => {
    //     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         const {Search} = data;
    //         return Search;
    //     })
    //     const movies = Search
    // }, [movieTitle])
    
    const movies = responseMovies.Search
    
        

    const mappedMovies = movies?.map(movie => ({
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
    }))

    console.log(movies)
  return {movies : mappedMovies}

}