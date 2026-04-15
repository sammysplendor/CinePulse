import { useState } from "react";
import { getMovieTrailer } from "../services/movieapi";

const useWatchTrailer = () => {
  const [trailerURL, setTrailerURL] = useState("");

  const handleWatchTrailer = async (movie) => {
    const trailerKey = await getMovieTrailer(movie.id);

    if (!trailerKey) {
      alert("Trailer not available");
      return;
    }

    const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

    setTrailerURL(trailerUrl);
  };

  return { trailerURL, setTrailerURL, handleWatchTrailer };
};

export default useWatchTrailer;
