import styles from "../style/Trending.module.css";
import Navbar from "../../components/Navbar";
import { getTopTrending } from "../../services/movieApi";
import { useState, useEffect } from "react";
import { Play, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../constants/config";
import MovieCard from "../../components/MovieCard";
import useWatchlist from "../../hooks/useWatchlist";

const Trending = ({ handleWatchTrailer }) => {
  const [weekTrending, setWeekTrending] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchMovie = async () => {
      const weekTrendingMovie = await getTopTrending("week");

      setWeekTrending(weekTrendingMovie);

      //  Start from random movie
      if (weekTrendingMovie?.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * weekTrendingMovie.length,
        );
        setCurrentIndex(randomIndex);
      }
    };

    fetchMovie();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === weekTrending.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? weekTrending.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <Helmet>
        <title>CinePulse - Trending Movies</title>
        <meta
          name="description"
          content="Find trending movies, explore ratings, and discover what to watch next with CinePulse."
        />
      </Helmet>

      <div className={styles.pageContainer}>
        <Navbar />

        <section className={styles.heroContent}>
          <div className={styles.heroTxt}>
            <h1>Trending Movies</h1>

            <p>
              Discover what everyone is watching and talking about right now.
            </p>
          </div>

          <div className={styles.heroImageContainer}>
            <h3>Trending this week</h3>

            <div className={styles.slider}>
              <button className={styles.sliderBtnLeft} onClick={handlePrev}>
                <ChevronLeft />
              </button>

              <button className={styles.sliderBtnRight} onClick={handleNext}>
                <ChevronRight />
              </button>

              {/* ----- SLIDER TRACK ----- */}
              <div
                className={styles.sliderTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {weekTrending.map((movie) => (
                  <div
                    className={styles.movieDetail}
                    style={{
                      backgroundImage: movie
                        ? `url(${IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${movie.backdrop_path})`
                        : "none",

                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className={styles.overlay}>
                      <h1>{movie.title}</h1>
                      <p>{movie.overview}</p>

                      <div className={styles.cta}>
                        <button
                          className={styles.trailerBtn}
                          onClick={() => handleWatchTrailer(movie)}
                        >
                          <Play fill="#fff" className={styles.playIcon} /> Watch
                          Trailer
                        </button>

                        <button
                          onClick={() => addToWatchlist(movie)}
                          className={styles.watchlistBtn}
                        >
                          Add to Watchlist <ArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
    </>
  );
};

export default Trending;
