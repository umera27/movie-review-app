import Card from "../Components/MovieCard";
import { useState, useEffect,useRef } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import Prison from "/prison break.jpg";
import Spider from "/spider man.jpg";
import Teen from "/teen wolf.jpg";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); 
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const lastSearchQuery=useRef("")

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setPopular(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setLoading(true);
    setIsSearchActive(true); 
    lastSearchQuery.current = searchQuery;

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
      setIsSearchActive(false); 
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  
  const clearSearch = () => {
    setIsSearchActive(false);
    setMovies([]);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {isSearchActive && (
          <button 
            type="button" 
            className="clear-search-button fa-solid fa-arrow-left-long"
            onClick={clearSearch}
          >
          </button>
        )}
      </form>

      
      {!isSearchActive && (
        <div className="movie-hero">
          <div className="hero-title">
            <h1>Find Your Next Favorite Movie</h1>
            <h2>
              Discover trending movies, ratings, and detailed info powered by
              TMDB.
            </h2>
          </div>
          <div className="hero-image">
            <div className="image">
              <img src={Prison} alt="Prison Break" />
            </div>
            <div className="image">
              <img src={Spider} alt="Spider Man" />
            </div>
            <div className="image">
              <img src={Teen} alt="Teen Wolf" />
            </div>
          </div>
        </div>
      )}

      
      {isSearchActive && (
        <>
          <h3 style={{
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            padding: "10px",
          }}>
            Search Results for "{lastSearchQuery.current}"
          </h3>
          
          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : movies.length > 0 ? (
            <div className="movies-flex">
              {movies.map((movie) => (
                <Card movie={movie} key={movie.id} />
              ))}
            </div>
          ) : (
            <div className="no-results" style={{ 
              color: "white", 
              textAlign: "center", 
              padding: "20px" 
            }}>
              No movies found. Try a different search.
            </div>
          )}
        </>
      )}

      
      {(!isSearchActive) && (
        <>
          <h3 style={{
            color: "white",
            textAlign: "center",
            fontSize: "25px",
            padding: "10px",
            marginTop: isSearchActive ? "40px" : "0"
          }}>
            Popular Movies
          </h3>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="movies-flex">
              {popular.map((movie) => (
                <Card movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </>
      )}

        <footer className="footer">
        <div className="footer-container">
           
            <div className="footer-left">
                <div className="footer-logo">
                </div>
                <h4> Discover trending movies, ratings, and detailed info powered by TMDB.</h4>
                <div className="footer-social">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-telegram"></i></a>
                </div>
                
            </div>

          


            <div className="footer-links">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Disclaimer</a></li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© 2025 MovieReview. All Rights Reserved.</p>
        </div>
    </footer>

    </div>
  );
}

export default Home;