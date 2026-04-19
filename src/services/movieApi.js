import { api } from "./axiosInstance";

// =============== Fetch Trending =============== //

export const getTopTrending = async (time = "week") => {
  try {
    const response = await api.get(`trending/movie/${time}`);
    return response.data.results || [];
  } catch (error) {
    console.error(
      "Error fetching movie:",
      error.response?.data || error.message,
    );
    return [];
  }
};

// =============== Fetch Top Rated =============== //

export const getTopRated = async () => {
  try {
    const response = await api.get("movie/top_rated");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movie:", error);
    return [];
  }
};

// =============== Fetch Genres =============== //

export const getGenres = async () => {
  try {
    const response = await api.get("genre/movie/list");
    return response.data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const getTVGenres = async () => {
  try {
    const response = await api.get("genre/tv/list");
    return response.data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const getMovieByGenre = async (genreId) => {
  try {
    const response = await api.get(`discover/movie?with_genres=${genreId}`);
    console.log(response.data.results);
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
};

// =============== Fetch Popular movies =============== //

export const getPopularMovies = async () => {
  try {
    const response = await api.get("movie/popular");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// =============== Fetch TV series =============== //

export const getTV_popular = async () => {
  try {
    const response = await api.get("tv/popular");
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const getTV_topRated = async () => {
  try {
    const response = await api.get("tv/top_rated");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// =============== Fetch Trailers =============== //

// export const getMovieTrailer = async (movieId) => {
//   try {
//     const response = await api.get(`movie/${movieId}/videos`);
//     const trailers = response.data.results;

//     const trailer = trailers.find(
//       (video) => video.type === "Trailer" && video.site === "YouTube",
//     );
//     return trailer ? trailer.key : "null";
//   } catch (error) {
//     console.error("Error fetching trailer:", error);
//   }
// };

export const getTrailer = async (id, mediaType = "movie") => {
  try {
    const endpoint =
      mediaType === "tv" ? `tv/${id}/videos` : `movie/${id}/videos`;

    const response = await api.get(endpoint);
    const videos = response.data.results;

    if (!videos || videos.length === 0) return null;

    // Prefer official YouTube trailer
    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );

    // Fallback: any YouTube video
    const fallback = videos.find((video) => video.site === "YouTube");

    return trailer?.key || fallback?.key || null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};
