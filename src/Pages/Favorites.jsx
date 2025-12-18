import { useMovieContext } from "../context/MovieContext";
import Card from "../Components/MovieCard";
import '../css/Favorites.css'

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length>0) {
    return (
      <div className="favorites">
        <div>
          <h2>Your Favorite Movies</h2>
        </div>
        <div className="movies-flex">
          {favorites.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here.</p>
    </div>
  );

}

export default Favorites;
