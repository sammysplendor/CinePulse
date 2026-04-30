import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/page/Home";
import Explore from "../pages/page/Explore";
import Trending from "../pages/page/Trending";
import MoviesTonight from "../pages/page/MoviesTonight";
import useWatchTrailer from "../hooks/useWatchTrailer";
import TrailerModal from "../components/TrailerModal";

const AppRoutes = () => {
  const { trailerURL, setTrailerURL, handleWatchTrailer } = useWatchTrailer();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home handleWatchTrailer={handleWatchTrailer} />}
        />
        <Route
          path="/Explore"
          element={<Explore handleWatchTrailer={handleWatchTrailer} />}
        />
        <Route
          path="/Trending"
          element={<Trending handleWatchTrailer={handleWatchTrailer} />}
        />
        <Route path="/movies-to-watch-tonight" element={<MoviesTonight />} />
      </Routes>

      <TrailerModal trailerURL={trailerURL} onClose={() => setTrailerURL("")} />
    </BrowserRouter>
  );
};

export default AppRoutes;
