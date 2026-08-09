import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const BASE_URL = "https://cinepulse-xi.vercel.app";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

const sitemapPath = path.resolve("public/sitemap.xml");

if (!API_KEY) {
  throw new Error(
    "TMDB_API_KEY is missing. Add it to your environment variables.",
  );
}

const staticRoutes = ["/", "/Explore", "/Trending", "/movies-to-watch-tonight"];

const endpoints = ["trending/movie/week", "movie/popular", "movie/top_rated"];

const MAX_PAGES = 5;

const fetchMovies = async (endpoint, page) => {
  const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("page", page);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  return data.results || [];
};

const generateSitemap = async () => {
  const movieIds = new Set();

  for (const endpoint of endpoints) {
    for (let page = 1; page <= MAX_PAGES; page++) {
      console.log(`Fetching ${endpoint} - page ${page}`);

      const movies = await fetchMovies(endpoint, page);

      movies.forEach((movie) => {
        if (movie.id) {
          movieIds.add(movie.id);
        }
      });
    }
  }

  const movieRoutes = [...movieIds].map((id) => `/movie/${id}`);

  const routes = [...staticRoutes, ...movieRoutes];

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
  </url>`,
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemap.trim());

  console.log(`Sitemap generated successfully with ${routes.length} URLs.`);
};

generateSitemap().catch((error) => {
  console.error("Failed to generate sitemap:", error);
  process.exit(1);
});
