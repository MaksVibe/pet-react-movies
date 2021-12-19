const API_KEY = "f9b3a8f6c2c6ac6ea45f1e88181f9357";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchSearchFilms = async (q) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}`
  );
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const fetchFilms = async (request) => {
  const res = await fetch(`${BASE_URL}${request}?api_key=${API_KEY}`);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const fetchFilmById = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

export { fetchSearchFilms, fetchFilms, fetchFilmById };

// https://api.themoviedb.org/3/movie/trending/get-trending?api_key=f9b3a8f6c2c6ac6ea45f1e88181f9357
