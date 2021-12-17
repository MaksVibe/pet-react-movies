const HomePage = ({ films, openMovie }) => {
  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {films.map(({ original_title, id }) => (
          <li key={id} onClick={openMovie}>
            <a href="">{original_title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
