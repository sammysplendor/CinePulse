import styles from "./MovieCard_2.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const MovieCard_2 = ({
  movie,
  genres,
  handleWatchTrailer,
  onAddToWatchlist,
}) => {
  const title = movie.title ?? movie?.name ?? "Untitled";
  const date = movie?.release_date ?? movie?.first_air_date;
  const releaseYear = date ? new Date(date).getFullYear() : "N/A";

  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className={styles.cardContainer}>
      <Link to={`/movie/${movie.id}`} title="See full detail">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${IMAGE_SIZES.poster_sm}${movie.poster_path}`
              : "/no-image.png"
          }
          alt={title}
          className={styles.poster}
        />
      </Link>

      <Link to={`/movie/${movie.id}`} title="See full detail">
        <p className={styles.movieTitle}>
          <b>{title}</b>
        </p>
      </Link>

      <div className={styles.year}>
        <p>{releaseYear ?? "Unknown"}</p>{" "}
        <span>
          <p>Preview</p>
          <ArrowRight
            className={styles.openModal}
            onClick={() => {
              setSelectedMovie(movie);
              setOpenModal(true);
            }}
          />
        </span>
      </div>

      {openModal && selectedMovie && (
        <Modal
          movie={selectedMovie}
          genres={genres}
          onClose={() => setOpenModal(false)}
          handleWatchTrailer={handleWatchTrailer}
          onAddToWatchlist={onAddToWatchlist}
        />
      )}
    </div>
  );
};

export default MovieCard_2;
