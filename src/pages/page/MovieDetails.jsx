import styles from "../style/MovieDetails.module.css";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/movieApi";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      const data = await getMovieDetails(id);

      setMovie(data);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.pageLoading}>
          <h1>Loading Movie Details...</h1>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className={styles.page}>
        <div className={styles.pageLoading}>
          <h1>Movie not found.</h1>
          <Link to="/Explore" className={styles.backLink}>
            <span>
              <ArrowLeft size={20} /> Back to Explore
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  const movieTitle = releaseYear
    ? `${movie.title} (${releaseYear})`
    : movie.title;

  const description =
    movie.overview ||
    `Discover ${movie.title} on CinePulse. Explore movie details, ratings, release information, and more.`;

  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: description,
    url: `https://cinepulse-xi.vercel.app/movie/${movie.id}`,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined,
    datePublished: movie.release_date || undefined,
    genre: movie.genres?.map((genre) => genre.name),
  };

  return (
    <>
      <Helmet>
        <title>{movieTitle} | CinePulse</title>

        <meta name="description" content={description} />

        <link
          rel="canonical"
          href={`https://cinepulse-xi.vercel.app/movie/${movie.id}`}
        />

        <meta property="og:title" content={`${movieTitle} | CinePulse`} />

        <meta property="og:description" content={description} />

        <meta property="og:type" content="video.movie" />

        <meta
          property="og:url"
          content={`https://cinepulse-xi.vercel.app/movie/${movie.id}`}
        />

        {movie.backdrop_path && (
          <meta
            property="og:image"
            content={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          />
        )}

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify(movieSchema)}
        </script>
      </Helmet>

      <main className={styles.page}>
        <div className={styles.container}>
          <Link to="/Explore" className={styles.backLink}>
            <span>
              <ArrowLeft size={20} /> Back to Explore
            </span>
          </Link>

          <article className={styles.hero}>
            {movie.poster_path && (
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} movie poster`}
                loading="eager"
              />
            )}

            <div className={styles.content}>
              <h1 className={styles.title}>{movie.title}</h1>

              <div className={styles.meta}>
                <p>{movie.release_date || "Release date unknown"}</p>

                <p>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>

                {movie.runtime && <p>{movie.runtime} min</p>}
              </div>

              <p className={styles.overview}>
                {movie.overview ||
                  `Discover ${movie.title} on CinePulse. Explore movie details, ratings, release information, and more.`}
              </p>

              {movie.genres?.length > 0 && (
                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <p key={genre.id} className={styles.genre}>
                      {genre.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default MovieDetails;
