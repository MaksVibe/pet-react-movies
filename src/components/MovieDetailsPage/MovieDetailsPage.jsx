import { Route } from "react-router-dom";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFilmById, fetchFilms } from "../../source/api";
import s from "./MovieDetailsPage.module.css";
import { useRouteMatch } from "react-router-dom";

const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { url } = useRouteMatch();

  useEffect(() => {
    fetchFilmById(moviesId).then(setMovie);
  }, [moviesId]);

  useEffect(() => {
    fetchFilms(`/movie/${moviesId}/credits`).then(setCast);
  }, [moviesId]);

  useEffect(() => {
    fetchFilms(`/movie/${moviesId}/reviews`).then(setReviews);
  }, [moviesId]);

  return (
    <div className="container">
      <button type="button" className="backBtn">
        Go back
      </button>
      {movie && (
        <>
          <div className={s.MovieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt=""
              className={s.MoviePoster}
              width="200"
            />
            <div className={s.MovieDescription}>
              <h1>{movie.original_title}</h1>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <ul className={s.MovieInfo}>
            <li>
              <NavLink
                to={`${url}/cast`}
                className={s.MovieInfoLink}
                activeClassName={s.ActiveMovieInfoLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}/reviews`}
                className={s.MovieInfoLink}
                activeClassName={s.ActiveMovieInfoLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Route path={`${url}/cast`}>
            <Cast cast={cast} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews reviews={reviews} />
          </Route>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
