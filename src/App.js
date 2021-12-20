import "./App.css";
import { fetchFilms } from "./source/api";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// import AppBar from "./components/AppBar/AppBar";
// import HomePage from "./components/HomePage/HomePage";
// import MoviesPage from "./components/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
// import NotFound from "./components/common/404NotFound";

const AppBar = lazy(() => import("./components/AppBar/AppBar"));
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage")
);
const NotFound = lazy(() => import("./components/common/404NotFound"));

function App() {
  const [movieId, setMovieId] = useState(null);
  const [films, setFilms] = useState([]);
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
      <Suspense fallback={"...loading"}>
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
      </Suspense>
    </div>
  );
}

export default App;
