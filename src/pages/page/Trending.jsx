import styles from "../style/Trending.module.css";
import Navbar from "../../components/Navbar";
import { getTopTrending } from "../../services/movieapi";
import { useState, useEffect } from "react";
import { Play, ArrowRight } from "lucide-react";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../constants/config";
import MovieCard from "../../components/MovieCard";
import useWatchlist from "../../hooks/useWatchlist";

const Trending = ({ handleWatchTrailer }) => {
  const [weekTrending, setWeekTrending] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchMovie = async () => {
      const weekTrendingMovie = await getTopTrending("week");

      setWeekTrending(weekTrendingMovie);

      //  Pick a random movie to display
      if (weekTrendingMovie?.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * weekTrendingMovie.length,
        );
        setFeaturedMovie(weekTrendingMovie[randomIndex]);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <section className={styles.heroContent}>
        <div className={styles.heroTxt}>
          <h1>Trending Movies</h1>
          <p>Discover what everyone is watching and talking about right now.</p>
        </div>

        <div className={styles.heroImageContainer}>
          <h3>Trending this week</h3>

          {featuredMovie && (
            <div
              className={styles.movieDetail}
              style={{
                backgroundImage: featuredMovie
                  ? `url(${IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${featuredMovie.backdrop_path})`
                  : "none",

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className={styles.overlay}>
                <h1>{featuredMovie.title}</h1>
                <p>{featuredMovie.overview}</p>

                <div className={styles.cta}>
                  <button
                    className={styles.trailerBtn}
                    onClick={() => handleWatchTrailer(featuredMovie)}
                  >
                    <Play fill="#fff" className={styles.playIcon} /> Watch
                    Trailer
                  </button>

                  <button
                    onClick={() => addToWatchlist(featuredMovie)}
                    className={styles.watchlistBtn}
                  >
                    Add to Watchlist <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.gridContainer}>
        <h3>Hot right now</h3>

        <div className={styles.moviecardGrid}>
          {weekTrending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trending;
