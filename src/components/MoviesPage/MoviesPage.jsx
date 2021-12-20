import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { fetchSearchFilms } from "../../source/api";
import { Link } from "react-router-dom";
import s from "../../styles/MoviesList.module.css";
import { get, save } from "../services/localStorage";

const MOVIES = "movies";
const QUERY = "query";

const MoviesPage = () => {
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

  const handleChange = (event) => {
    setQ(event.target.value.toLowerCase());
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
            <li key={id}>
              <Link to={`${url}/${id}`} className={s.MoviesListLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt=""
                  width="200"
                />
                {original_title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
