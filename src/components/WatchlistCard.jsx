import styles from "./WatchlistCard.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { Trash2, Play } from "lucide-react";

const WatchlistCard = ({ movie, onRemove, handleWatchTrailer }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.detail}>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${IMAGE_SIZES.poster_sm}${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.text}>
          <p className={styles.title}>
            <b>{movie.title}</b>
          </p>
          <p>{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>

      <div className={styles.cta}>
        <span
          className={
            new Date(movie.release_date).getFullYear() <= currentYear
              ? styles.released
              : styles.comingSoon
          }
        >
          {new Date(movie.release_date).getFullYear() <= currentYear
            ? "Released"
            : "Coming soon"}
        </span>
        <button
          className={styles.trailerBtn}
          onClick={() => handleWatchTrailer(movie)}
        >
          <Play fill="#fff" className={styles.playIcon} /> Trailer
        </button>
        <span onClick={() => onRemove(movie.id)} title="Remove from watchlist">
          <Trash2 className={styles.deleteIcon} />
        </span>
      </div>
    </div>
  );
};

export default WatchlistCard;
