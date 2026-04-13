import { useState } from "react";
import { getMovieTrailer } from "../services/movieapi";

const useWatchTrailer = () => {
  const [trailerURL, setTrailerURL] = useState("");

  const handleWatchTrailer = async (movie) => {
    const trailerKey = await getMovieTrailer(movie.id);
    const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

    trailerKey ? setTrailerURL(trailerUrl) : alert("Trailer not available");
    console.log("Trailer key:", trailerKey);
  };

  return { trailerURL, setTrailerURL, handleWatchTrailer };
};

export default useWatchTrailer;
