import s from "./Cast.module.css";

const Cast = ({ cast }) => {
  return (
    cast && (
      <ul className={s.CastGrid}>
        {cast.cast.map(({ profile_path, id, original_name, character }) => (
          <li key={id} className={s.CastCharacter}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt=""
              width="80"
              className={s.CastImg}
            />
            <h4>{original_name}</h4>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    )
  );
};

export default Cast;
