import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import { fetchFilms } from "./source/api";
import React, { useState, useEffect, lazy, Suspense } from "react";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import NotFound from "./components/common/404NotFound";

function App() {
  const [q, setQ] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage films={films} />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:moviesId">
          <MovieDetailsPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
