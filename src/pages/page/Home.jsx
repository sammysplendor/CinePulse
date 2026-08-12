import styles from "../style/Home.module.css";
import { useEffect, useState } from "react";
import { getTopTrending, getTopRated } from "../../services/movieApi";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../constants/config";
import MovieCard from "../../components/MovieCard";
import useWatchlist from "../../hooks/useWatchlist";
import WatchlistCard from "../../components/WatchlistCard";
import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet";

const Home = ({ handleWatchTrailer }) => {
  const [topTrending, setTopTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);

      try {
        const trendingMovies = await getTopTrending("day");
        // const topRatedMovies = await getTopRated();

        const updated = trendingMovies.map((item) => ({
          ...item,
          media_type: item.first_air_date ? "tv" : "movie",
        }));

        setTopTrending(updated);
        // setTopRated(topRatedMovies);

        // Pick a random movie for the spotlight
        if (trendingMovies?.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingMovies.length);
          setCurrentIndex(randomIndex);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopRated = async () => {
      try {
        const topRatedMovies = await getTopRated();
        setTopRated(topRatedMovies);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTrending();
    fetchTopRated();
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
    <>
      <Helmet>
        <title>CinePulse - Discover Movies</title>
        <meta
          name="description"
          content="Find trending movies, explore ratings, and discover what to watch next with CinePulse."
        />
        <link rel="canonical" href="https://cinepulse-xi.vercel.app/" />

        <meta property="og:title" content="CinePulse - Discover Movies" />

        <meta
          property="og:description"
          content="Discover trending movies, popular films, ratings, and recommendations with CinePulse."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://cinepulse-xi.vercel.app/" />

        <meta
          property="og:image"
          content="https://cinepulse-xi.vercel.app/cinepulse_logo.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className={styles.pageContainer}>
        <Navbar setOpenWatchlist={setOpenWatchlist} />

        <span className={styles.seoSection}>
          <h4>Discover Trending Movies Instantly</h4>
          <small>
            CinePulse helps you find the best movies, explore trending films,
            and discover what to watch next - all in one place.
          </small>
        </span>

        <div className={styles.mainContent}>
          <main>
            <section className={styles.heroSection}>
              {topTrending[currentIndex]?.backdrop_path && (
                <img
                  className={styles.heroBackdrop}
                  src={`${IMAGE_BASE_URL}${IMAGE_SIZES.backdrop}${topTrending[currentIndex].backdrop_path}`}
                  alt=""
                  fetchPriority="high"
                />
              )}

              {loading ? (
                <div className={styles.heroLoading}>
                  <h3>Loading trending movies...</h3>
                </div>
              ) : (
                <div className={styles.leftContent}>
                  <h3>Top Trending Spotlight</h3>

                  <div className={styles.slider}>
                    <button
                      className={styles.sliderBtnLeft}
                      onClick={handlePrev}
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      className={styles.sliderBtnRight}
                      onClick={handleNext}
                    >
                      <ChevronRight />
                    </button>

                    {/* ----- SLIDER TRACK ----- */}
                    <div
                      className={styles.sliderTrack}
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
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
                              <Play fill="#fff" className={styles.playIcon} />{" "}
                              Watch Trailer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className={styles.trendingSection}>
              <h3>Trending Now in Real Time</h3>

              <div className={styles.cardGrid}>
                {topTrending.slice(0, 8).map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddToWatchlist={addToWatchlist}
                    priority={index === 0}
                  />
                ))}
              </div>
            </section>

            <section className={styles.topRatedSection}>
              <h3>Top Rated Movies</h3>

              <div className={styles.cardGrid}>
                {topRated.slice(0, 8).map((movie) => (
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
                {openWatchlist &&
                  watchlist?.map((movie) => (
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
      </div>
    </>
  );
};

export default Home;
