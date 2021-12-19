import { Link } from "react-router-dom";

const HomePage = ({ films }) => {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {films &&
          films.map(({ original_title, id, poster_path }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                alt=""
                width="60"
              />
              <Link to={`movies/${id}`}>{original_title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;
