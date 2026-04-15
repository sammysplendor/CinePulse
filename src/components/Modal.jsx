import styles from "./Modal.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { Play, ArrowRight } from "lucide-react";

const Modal = ({
  movie,
  genres,
  onAddToWatchlist,
  onClose,
  handleWatchTrailer,
}) => {
  const title = movie?.title ?? movie?.name ?? "Untitled";
  const date = movie?.release_date ?? movie?.first_air_date ?? "Unknown";
  const releaseYear = date ? new Date(date).getFullYear() : "N/A";

  const genreNames = movie?.genre_ids
    ?.map((id) => genres?.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={
            movie?.backdrop_path
              ? `${IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path}`
              : "/no-image.png"
          }
          alt={title}
        />

        <div className={styles.detail}>
          <div className={styles.titleContainer}>
            <p className={styles.movieTitle}>
              <b>{title}</b>
            </p>
          </div>

          <p className={styles.overview}>{movie?.overview}</p>
          <p className={styles.yr_and_genres}>
            {releaseYear ?? "Uknown"} | {genreNames}
          </p>
        </div>

        <div className={styles.cta}>
          <button
            className={styles.trailerBtn}
            onClick={() => handleWatchTrailer(movie)}
          >
            <Play fill="#fff" className={styles.playIcon} /> Watch Trailer
          </button>

          <span
            className={styles.watchlistBtn}
            onClick={() => onAddToWatchlist(movie)}
          >
            Add to Watchlist <ArrowRight />
          </span>

          <button className={styles.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
