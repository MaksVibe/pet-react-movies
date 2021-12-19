import { useRouteMatch } from "react-router-dom";

const MoviesPage = () => {
  const match = useRouteMatch();

  return <h1>Movies Search</h1>;
};

export default MoviesPage;
