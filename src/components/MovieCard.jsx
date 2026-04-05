import styles from "./MovieCard.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { ArrowRight } from "lucide-react";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  if (!movie?.poster_path) return null;

  return (
    <div className={styles.cardContainer}>
      <img
        src={`${IMAGE_BASE_URL}${IMAGE_SIZES.poster_sm}${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <p className={styles.title}>
        <b>{movie.title}</b>
      </p>
      <p>{new Date(movie.release_date).getFullYear()}</p>

      <button onClick={() => onAddToWatchlist(movie)}>
        Watchlist <ArrowRight />
      </button>
    </div>
  );
};

export default MovieCard;
