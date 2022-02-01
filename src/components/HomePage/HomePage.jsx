import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import s from "../../styles/MoviesList.module.css";
import { fetchSearchFilms } from "../../source/api";
import { useState, useEffect } from "react";
import { get, save } from "../services/localStorage";

const QUERY = "query";
const MYMOVIES = "My-movies-list";

const HomePage = ({ films }) => {
  const [q, setQ] = useState("");
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState("");
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!query) return false;
    fetchSearchFilms(query).then(setMovies);
    save(QUERY, q);
  }, [q, query]);

  useEffect(() => {
    const queryLocal = get(QUERY);
    setQuery(queryLocal);
    setQ(queryLocal);
  }, []);

  const handleSubmitInput = (e) => {
    e.preventDefault();
    fetchSearchFilms(q).then(setMovies);
    setQuery(q);
  };

  const handleChange = (e) => {
    setQ(e.target.value.toLowerCase());
  };

  const handleClick = (e) => {
    e.preventDefault();
    const movieId = e.target.parentNode.id;
    console.log(`id`, e.target.parentNode.id);
    save(MYMOVIES, { ...MYMOVIES, movieId });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitInput}>
        <input
          className="MoviesInput"
          type="text"
          value={q}
          placeholder="Search movie"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul className={s.MoviesList}>
        {movies &&
          movies.results.map(({ original_title, id, poster_path }) => (
            <li key={id} id={id}>
              <Link to={`movies/${id}`} className={s.MoviesListLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt=""
                  width="200"
                />

                <p>ID: {id}</p>
                <p>{original_title}</p>
              </Link>
              <button type="button" onClick={handleClick}>
                Add
              </button>
            </li>
          ))}
      </ul>

      {!movies && !q && <h1>Tranding today</h1>}
      <ul className={s.MoviesList}>
        {!movies &&
          films.map(({ original_title, id, poster_path }) => (
            <li key={id} className={s.MoviesListItem} id={id}>
              <Link to={`movies/${id}`} className={s.MoviesListLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt=""
                  width="180"
                />
                <p>ID: {id}</p>
                <p>{original_title}</p>
              </Link>
              <button type="button" onClick={handleClick}>
                Add
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
