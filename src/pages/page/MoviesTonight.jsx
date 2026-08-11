import "../style/MoviesTonight.css";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import {
  getTopTrending,
  getPopularMovies,
  getTopRated,
} from "../../services/movieApi";
import useWatchlist from "../../hooks/useWatchlist";

const MoviesTonight = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const [trending, popular, topRated] = await Promise.all([
          getTopTrending("week"),
          getPopularMovies(),
          getTopRated(),
        ]);

        // Combine all three sources
        const combined = [...trending, ...popular, ...topRated];

        // Remove duplicate movies
        const uniqueMovies = [
          ...new Map(combined.map((movie) => [movie.id, movie])).values(),
        ];

        // Keep the page focused instead of displaying hundreds of movies
        setMovies(uniqueMovies.slice(0, 15));
      } catch (error) {
        console.error("Error fetching Movies Tonight:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies to Watch Tonight | CinePulse</title>

        <meta
          name="description"
          content="Discover movies worth watching tonight with CinePulse. Explore trending, popular, and top-rated movies."
        />

        <link
          rel="canonical"
          href="https://cinepulse-xi.vercel.app/movies-to-watch-tonight"
        />

        <meta
          property="og:title"
          content="Movies to Watch Tonight | CinePulse"
        />

        <meta
          property="og:description"
          content="Discover trending, popular, and top-rated movies worth watching tonight with CinePulse."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://cinepulse-xi.vercel.app/movies-to-watch-tonight"
        />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="seoPage">
        <Navbar />

        <div className="pageContent">
          <h1>Movies to Watch Tonight</h1>

          <p className="pageDescription">
            Looking for something great to watch tonight? Discover a selection
            of trending, popular, and top-rated movies currently worth adding to
            your watchlist.
          </p>

          <section className="movieRecommendations">
            <h2>Tonight's Movie Picks</h2>

            {loading ? (
              <p>Finding movies for you...</p>
            ) : movies.length > 0 ? (
              <div className="movieGrid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddToWatchlist={() => {
                      addToWatchlist;
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>
                We couldn't load movie recommendations right now. Please try
                again later.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default MoviesTonight;
