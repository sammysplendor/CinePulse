import styles from "../style/Home.module.css";
import { useEffect, useState } from "react";
import { getTopTrending, getTopRated } from "../../services/movieApi";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../constants/config";
import MovieCard from "../../components/MovieCard";
import useWatchlist from "../../hooks/useWatchlist";
import WatchlistCard from "../../components/WatchlistCard";
import Navbar from "../../components/Navbar";

const Home = ({ handleWatchTrailer }) => {
  const [topTrending, setTopTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const trendingMovies = await getTopTrending("day");
      const topRatedMovies = await getTopRated();

      const updated = trendingMovies.map((item) => ({
        ...item,
        media_type: item.first_air_date ? "tv" : "movie",
      }));

      setTopTrending(updated);
      setTopRated(topRatedMovies);

      // Pick a random movie for the spotlight
      if (trendingMovies?.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        setCurrentIndex(randomIndex);
      }
    };

    fetchMovie();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? topTrending.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === topTrending.length - 1 ? 0 : prev + 1));
  };

  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [openWatchlist, setOpenWatchlist] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <Navbar onOpenWatchlist={() => setOpenWatchlist(true)} />

      <main>
        <section
          className={styles.heroSection}
          style={{
            backgroundImage: topTrending[currentIndex]
              ? `url(${IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${topTrending[currentIndex].backdrop_path})`
              : "/no-image.png",

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.leftContent}>
            <h3>Top Trending Spotlight</h3>

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
                {topTrending.map((movie) => (
                  <div className={styles.slide} key={movie.id}>
                    <div className={styles.movieDetail}>
                      <h1>{movie.title}</h1>
                      <p>{movie.overview}</p>

                      <button
                        className={styles.trailerBtn}
                        onClick={() => handleWatchTrailer(movie)}
                      >
                        <Play fill="#fff" className={styles.playIcon} /> Watch
                        Trailer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.trendingSection}>
          <h3>Trending Now in Real Time</h3>

          <div className={styles.cardGrid}>
            {topTrending.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={addToWatchlist}
              />
            ))}
          </div>
        </section>

        <section className={styles.topRatedSection}>
          <h3>Top Rated Movies</h3>

          <div className={styles.cardGrid}>
            {topRated.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={addToWatchlist}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ========== WATCHLIST SECTION ========== */}
      <aside
        className={`${styles.sidebar} ${openWatchlist ? styles.open : ""}`}
      >
        <section className={styles.watchlistContainer}>
          <h3>
            My Pulse Watchlist
            <button
              className={styles.closeWatchlist}
              onClick={() => {
                setOpenWatchlist(false);
              }}
            >
              Close
            </button>
          </h3>

          <div className={styles.watchlist}>
            {watchlist?.map((movie) => (
              <WatchlistCard
                key={movie.id}
                movie={movie}
                onRemove={removeFromWatchlist}
                handleWatchTrailer={handleWatchTrailer}
              />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Home;
