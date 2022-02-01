import "./App.css";
import { fetchFilms } from "./source/api";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const MyMovies = lazy(() => import("./components/MyMovies/MyMovies"));
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
  const [errorr, setErrorr] = useState(null);

  const REQUESTS = {
    TRANDING: "/trending/movie/day",
    INFO: `/movie/${movieId}`,
    CREDITS: `/movie/${movieId}/credits`,
    REVIEWS: `/movie/${movieId}/reviews`,
  };

  useEffect(() => {
    const getFilms = async () => {
      try {
        const { results } = await fetchFilms(REQUESTS.TRANDING);
        setFilms([...results]);
      } catch (error) {
        setErrorr(errorr.message);
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
          <Route path="/my-movies" exact>
            <MyMovies />
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
