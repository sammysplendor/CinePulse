import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/movieApi";
import { Helmet } from "react-helmet";

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
    return <p>Loading movie...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
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
    dateCreated: movie.release_date || undefined,
    genre: movie.genres?.map((genre) => genre.name),
    aggregateRating: movie.vote_count
      ? {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average,
          ratingCount: movie.vote_count,
          bestRating: 10,
          worstRating: 0,
        }
      : undefined,
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

      <main>
        <h1>{movie.title}</h1>

        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}

        <p>{movie.overview}</p>

        <p>Release date: {movie.release_date || "Unknown"}</p>

        <p>Rating: {movie.vote_average?.toFixed(1) || "N/A"}</p>
      </main>
    </>
  );
};

export default MovieDetails;
