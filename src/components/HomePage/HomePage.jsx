import { Link } from "react-router-dom";
import s from "../../styles/MoviesList.module.css";

const HomePage = ({ films }) => {
  return (
    <div className="container">
      <h1>Trending today</h1>

      <ul className={s.MoviesList}>
        {films &&
          films.map(({ original_title, id, poster_path }) => (
            <li key={id} className={s.MoviesListItem}>
              <Link to={`movies/${id}`} className={s.MoviesListLink}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt=""
                  width="180"
                />
                <br />
                {original_title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
