import styles from "./MovieCard_2.module.css";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../constants/config";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Modal from "./modal";

const MovieCard_2 = ({ movie, genres }) => {
  const title = movie.title ?? movie?.name ?? "Untitled";
  const date = movie?.release_date ?? movie?.first_air_date;
  const releaseYear = date ? new Date(date).getFullYear() : "N/A";

  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className={styles.cardContainer}>
      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${IMAGE_SIZES.poster_sm}${movie.poster_path}`
            : "/no-image.png"
        }
        alt={title}
        className={styles.poster}
      />

      <p className={styles.movieTitle}>
        <b>{title}</b>
      </p>

      <div className={styles.year}>
        <p>{releaseYear ?? "Unknown"}</p>{" "}
        <ArrowRight
          className={styles.openModal}
          onClick={() => {
            setSelectedMovie(movie);
            setOpenModal(true);
          }}
        />
      </div>

      {openModal && selectedMovie && (
        <Modal
          movie={selectedMovie}
          genres={genres}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default MovieCard_2;
