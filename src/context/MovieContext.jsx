import {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

 const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites,setFavorites]=useState([])
    
    useEffect(()=>{
        const storedFav=localStorage.getItem("favorites")

        if(storedFav) setFavorites(JSON.parse(storedFav))
    },[])
   useEffect(()=>{
       localStorage.setItem("favorites",JSON.stringify(favorites))
   },[favorites])

   const addToFavorites=(movie)=>{setFavorites(prev => [...prev,movie])}

   const removeFromFavorites=(movieId)=>{setFavorites(prev => prev.filter(movie=> movie.id!==movieId))}

   const isFavorites=(movieId)=>{return favorites.some(movie =>movie.id===movieId)}

   const value={
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorites
   }
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
