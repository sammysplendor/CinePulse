import styles from "../style/Home.module.css";
import { useEffect, useState } from "react";
import { getTopTrending, getTopRated } from "../../services/movieapi";
import { Play, X } from "lucide-react";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../constants/config";
import MovieCard from "../../components/MovieCard";
import useWatchlist from "../../hooks/useWatchlist";
import WatchlistCard from "../../components/WatchlistCard";
import Navbar from "../../components/Navbar";
import useWatchTrailer from "../../hooks/useWatchTrailer";

const Home = () => {
  const [topTrending, setTopTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const trendingMovies = await getTopTrending("day");
      const topRatedMovies = await getTopRated();
      console.log("Top rated movies fetched:", topRatedMovies);

      setTopTrending(trendingMovies);
      setTopRated(topRatedMovies);

      // Pick a random movie for the spotlight
      if (trendingMovies?.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingMovies.length);
        setFeaturedMovie(trendingMovies[randomIndex]);
      }
    };

    fetchMovie();
  }, []);

  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [openWatchlist, setOpenWatchlist] = useState(false);

  const { trailerURL, setTrailerURL, handleWatchTrailer } = useWatchTrailer();

  return (
    <div className={styles.pageContainer}>
      <Navbar onOpenWatchlist={() => setOpenWatchlist(true)} />

      <main>
        <section
          className={styles.heroSection}
          style={{
            backgroundImage: featuredMovie
              ? `url(${IMAGE_BASE_URL}${IMAGE_SIZES.poster_lg}${featuredMovie.backdrop_path})`
              : "/no-image.png",

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.leftContent}>
            <h3>Top Trending Spotlight</h3>

            {featuredMovie && (
              <div className={styles.movieDetail}>
                <h1>{featuredMovie.title}</h1>
                <p>{featuredMovie.overview}</p>
              </div>
            )}

            <button
              className={styles.trailerBtn}
              onClick={() => handleWatchTrailer(featuredMovie)}
            >
              <Play fill="#fff" className={styles.playIcon} /> Watch Trailer
            </button>
          </div>

          {trailerURL && (
            <div
              className={styles.trailerModal}
              onClick={() => setTrailerURL("")}
            >
              <div
                className={styles.videoWrapper}
                onClick={(e) => e.stopPropagation()}
              >
                <X
                  className={styles.closeBtn}
                  onClick={() => setTrailerURL("")}
                />
                <iframe
                  width="100%"
                  height="450"
                  src={trailerURL}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className={styles.rightContent}></div>
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
              />
            ))}
          </div>
        </section>

        <section className={styles.liveFeed}>
          <h3>CinePulse Live Feed</h3>
        </section>
      </aside>
    </div>
  );
};

export default Home;
