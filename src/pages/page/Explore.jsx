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
} from "../../services/movieapi";
import Navbar from "../../components/Navbar";
import MovieCard_2 from "../../components/MovieCard_2";
import useWatchlist from "../../hooks/useWatchlist";

const Explore = () => {
  const [searchInput, setSearchInput] = useState("");

  const { addToWatchlist } = useWatchlist();

  const [genres, setGenres] = useState([]);
  const [_selectedGenre, setSelectedGenre] = useState([]);
  const [movies, setMovies] = useState([]);

  const [popular, setPopular] = useState([]);

  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

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
    setSelectedGenre(genreId);

    const movies = await getMovieByGenre(genreId);
    setMovies(movies);
  };

  const handlePopularMovies = async () => {
    const popularMovies = await getPopularMovies();

    setPopular(popularMovies);
  };

  const handleTVSeries = async (e) => {
    const value = e.target.value;

    if (value === "popular") {
      const popularTVSeries = await getTV_popular();
      console.log("Popular TV series:", popularTVSeries);
      setPopularSeries(popularTVSeries);
    }

    if (value === "top rated") {
      const topRatedTVSeries = await getTV_topRated();
      console.log("Top rated TV series:", topRatedTVSeries);
      setTopRatedSeries(topRatedTVSeries);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search movies, actors, genres…"
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

        <button>See Trending Movies</button>
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
        {movies.map((movie) => (
          <MovieCard_2
            key={movie.id}
            movie={movie}
            genres={genres}
            onAddToWatchlist={addToWatchlist}
          />
        ))}

        {popular.map((movie) => (
          <MovieCard_2
            key={movie.id}
            movie={movie}
            genres={genres}
            onAddToWatchlist={addToWatchlist}
          />
        ))}

        {popularSeries.map((movie) => (
          <MovieCard_2
            key={movie.id}
            movie={movie}
            genres={genres}
            onAddToWatchlist={addToWatchlist}
          />
        ))}

        {topRatedSeries.map((movie) => (
          <MovieCard_2
            key={movie.id}
            movie={movie}
            genres={genres}
            onAddToWatchlist={addToWatchlist}
          />
        ))}
      </section>
    </div>
  );
};

export default Explore;
