import { useParams } from "react-router";

const MovieDetailsPage = ({ film, closeMovie }) => {
  const { original_title, vote_average, overview, poster_path, genres } = film;

  console.log(film);
  const vote = vote_average * 10;
  return (
    <div className="Movie-card">
      <button type="button" onClick={closeMovie}>
        Go back
      </button>
      <img src="https://images/hmdb/t" alt="" />
      <h1>{original_title}</h1>
      <p>User Score: {vote}%</p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h3>Genres</h3>
      <p></p>
    </div>
  );
};

export default MovieDetailsPage;
