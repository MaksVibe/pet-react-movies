import { useEffect, useState } from "react";
import s from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(reviews.results);
  }, [reviews.results]);

  return (
    <>
      {(!results.length && (
        <p>We don't have any reviews for this movie...</p>
      )) ||
        results.map(({ id, author, content }) => (
          <ul>
            <li key={id} className={s.ReviewText}>
              <h4>
                Author: <span className={s.ReviwAuthor}>{author}</span>
              </h4>
              <p>{content}</p>
            </li>
          </ul>
        ))}
    </>
  );
};

export default Reviews;
