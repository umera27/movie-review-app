
import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'


function MovieCard ({movie}) {

  const {isFavorites,addToFavorites,removeFromFavorites}=useMovieContext()
  const favorite=isFavorites(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        if(favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

  return (
    <div className="movie-card">
        <div className="movie-poster">
           <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}/>
           <div className="movie-overlay">
             <button type="button" className={`favorite-btn ${favorite?"active":"white"}`} onClick={onFavoriteClick}>&#10084;</button>
           </div>
        </div>
        <div className="movie-info">
           <h3>Title:{movie.title}</h3>
           <p>Date:{movie.release_date}</p><br/>
           <p>IMDb :{movie.vote_average}</p>
        </div>
    </div>
  )
}

export default MovieCard