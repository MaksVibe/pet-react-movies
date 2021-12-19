import s from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  // We don't have any reviews for this movie
  return (
    reviews &&
    reviews.results.map(({ id, author, content }) => (
      <ul>
        <li key={`${id}`} className={s.ReviewText}>
          <h4>
            Author: <span className={s.ReviwAuthor}>{author}</span>
          </h4>
          <p>{content}</p>
        </li>
      </ul>
    ))
  );
};

export default Reviews;
