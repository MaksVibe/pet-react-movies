import "./App.css";
import { fetchSearchFilms, fetchFilms } from "./source/api";
import { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/common/Header";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import { Route } from "react-router-dom";

function App() {
  const [q, setQ] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieIsOpen, setMovieIsOpen] = useState(false);

  const REQUESTS = {
    TRANDING: "/trending/movie/day",
    INFO: `/movie/${movieId}`,
    CREDITS: `/movie/${movieId}/credits`,
    REVIEWS: `/movie/${movieId}/reviews`,
  };

  useEffect(() => {
    const getFilms = async () => {
      setIsLoading(true);
      try {
        const { results } = await fetchFilms(REQUESTS.TRANDING);
        setFilms([...results]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilms();
  }, [REQUESTS.TRANDING]);

  // useEffect(() => {
  //   fetchFilms(REQUESTS.INFO);
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [REQUESTS.INFO])

  const openMovie = (e) => {
    e.preventDefault();
    setMovieIsOpen(true);
    const film = films.find(({ original_title, id }) =>
      original_title === e.target.textContent ? id : false
    );
    setFilm(film);
  };

  const closeMovie = (e) => {
    setMovieIsOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <Route path="/" exact component={HomePage} />
      {!movieIsOpen && (
        <div>
          <HomePage films={films} openMovie={openMovie} />
        </div>
      )}

      {movieIsOpen && <MovieDetailsPage closeMovie={closeMovie} film={film} />}
    </div>
  );
}

export default App;
