import { useState } from "react";
import { getTrailer } from "../services/movieApi";

const useWatchTrailer = () => {
  const [trailerURL, setTrailerURL] = useState("");
  const [trailerKey, setTrailerKey] = useState("");

  const handleWatchTrailer = async (item) => {
    const key = await getTrailer(item.id, item.movie_type);

    if (!key) {
      alert("Trailer not available");
      return;
    }

    setTrailerKey(key);

    const trailerUrl = `https://www.youtube.com/embed/${key}`;

    setTrailerURL(trailerUrl);
  };

  return { trailerURL, trailerKey, setTrailerURL, handleWatchTrailer };
};

export default useWatchTrailer;
