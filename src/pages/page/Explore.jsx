import styles from "../style/Explore.module.css";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getGenres,
  getTVGenres,
  getMovieByGenre,
  getPopularMovies,
  getTV_popular,
  getTV_topRated,
  searchMovies,
} from "../../services/movieApi";
import Navbar from "../../components/Navbar";
import MovieCard_2 from "../../components/MovieCard_2";
import useWatchlist from "../../hooks/useWatchlist";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Explore = ({ handleWatchTrailer }) => {
  let navigate = useNavigate();

  const { addToWatchlist } = useWatchlist();

  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const movieGenres = await getGenres();
      const tvGenres = await getTVGenres();

      const combinedGenres = [...movieGenres, ...tvGenres];
      const uniqueGenres = combinedGenres.filter(
        (genre, index, self) =>
          index === self.findIndex((g) => g.id === genre.id),
      );

      setGenres(uniqueGenres);
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = async (genreId) => {
    const movies = await getMovieByGenre(genreId);
    setContent(movies);
  };

  const handlePopularMovies = async () => {
    const popularMovies = await getPopularMovies();

    setContent(popularMovies);
  };

  const handleTVSeries = async (e) => {
    const value = e.target.value;

    if (value === "popular") {
      const popularTVSeries = await getTV_popular();
      console.log("Popular TV series:", popularTVSeries);
      const updated = popularTVSeries.map((item) => ({
        ...item,
        media_type: "tv",
      }));
      setContent(updated);
    }

    if (value === "top rated") {
      const topRatedTVSeries = await getTV_topRated();
      const updated = topRatedTVSeries.map((item) => ({
        ...item,
        media_type: "tv",
      }));
      console.log("Top rated TV series:", updated);
      setContent(updated);
    }
  };

  // ========== Search system logic ========== //
  const [searchInput, setSearchInput] = useState("");
  const [movieGenre, setMovieGenre] = useState([]);

  // Fetch movies and TV series genres and combine them.
  useEffect(() => {
    const fetchAnyMovies = async () => {
      const fetchedGenre = await getGenres();
      const fetchedTVGenre = await getTVGenres();

      const combinedFetchedGenres = [...fetchedGenre, ...fetchedTVGenre];
      const uniqueGenres = [
        ...new Map(combinedFetchedGenres.map((g) => [g.id, g])).values(),
      ];
      setMovieGenre(uniqueGenres);
    };

    fetchAnyMovies();
  }, []);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const searchTerm = searchInput.trim().toLowerCase();

  // Fetch the searched movies using the search API function
  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchTerm) {
        setFilteredMovies([]);
        return;
      }

      const results = await searchMovies(searchTerm);

      // Filter searched genres to avoid appearing twice for series and movies
      const matchedGenres = movieGenre.filter((genre) =>
        genre?.name?.toLowerCase().includes(searchTerm),
      );
      const matchedGenreIds = matchedGenres.map((g) => g.id);

      // Filter the searched title to give either a movie or a series
      const filtered = results.filter((movie) => {
        const title = (movie.title || movie.name || "").toLowerCase();

        const matchesTitle = title.includes(searchTerm);

        const matchesGenre = movie?.genre_ids?.some((id) =>
          matchedGenreIds.includes(id),
        );

        return matchesTitle || matchesGenre;
      });

      // ----- Deduplicate
      const uniqueResults = [
        ...new Map(
          filtered.map((movie) => {
            const title = movie.title || movie.name || "";
            const year =
              movie.release_date?.split("-")[0] ||
              movie.first_air_date?.split("-")[0] ||
              "";

            const mediaType = movie.media_type || "unknown";

            return [`${title}-${year}-${mediaType}`, movie];
          }),
        ).values(),
      ];

      setFilteredMovies(uniqueResults);
    };

    fetchSearch();
  }, [searchTerm, movieGenre]);

  return (
    <>
      <Helmet>
        <title>CinePulse - Explore Movies</title>
        <meta
          name="description"
          content="Find trending movies, explore ratings, and discover what to watch next with CinePulse."
        />
      </Helmet>

      <div className={styles.pageContainer}>
        <Navbar />

        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search movies by titles and genres…"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
        </div>

        {/* =============== HERO SECTION =============== */}

        <section className={styles.heroContent}>
          <div className={styles.heroTxt}>
            <h1>Explore Movies</h1>
            <p>
              Browse by genre, popularity, or TV series to find your next watch.
            </p>
          </div>

          <button onClick={() => navigate("/Trending")}>
            See Trending Movies
          </button>
        </section>

        {/* =============== CATEGORY SECTION =============== */}

        <section className={styles.categoryBar}>
          <select
            name="category"
            onChange={(e) => handleGenreSelect(e.target.value)}
          >
            <option value="">Genre</option>

            {genres.map((genre) => (
              <option
                value={genre.id}
                key={genre.id}
                onClick={() => handleGenreSelect()}
              >
                {genre.name}
              </option>
            ))}
          </select>

          <span className={styles.popular} onClick={handlePopularMovies}>
            Popular
          </span>

          <select name="category" onChange={handleTVSeries}>
            <option value="">TV Series</option>
            <option value="popular">Popular series</option>
            <option value="top rated">Top rated series</option>
          </select>
        </section>

        {/* ========== RESULT DISPLAY SECTION ========== */}

        <section className={styles.resultDisplay}>
          {(searchTerm ? filteredMovies : content).map((movie) => (
            <MovieCard_2
              key={movie.id}
              movie={movie}
              genres={genres}
              onAddToWatchlist={addToWatchlist}
              handleWatchTrailer={handleWatchTrailer}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Explore;
