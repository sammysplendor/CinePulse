import styles from "./MovieCard.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  if (!movie?.poster_path) return null;

  return (
    <div className={styles.cardContainer}>
      <Link to={`/movie/${movie.id}`} title="See full detail">
        <img
          src={`${IMAGE_BASE_URL}${IMAGE_SIZES.poster_sm}${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      </Link>
      <Link to={`/movie/${movie.id}`} title="See full detail">
        <p className={styles.title}>
          <b>{movie.title}</b>
        </p>
      </Link>
      <p>{new Date(movie.release_date).getFullYear()}</p>

      <button onClick={() => onAddToWatchlist(movie)}>
        Watchlist <ArrowRight />
      </button>
    </div>
  );
};

export default MovieCard;
