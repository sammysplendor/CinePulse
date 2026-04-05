import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/page/Home";
import Explore from "../pages/page/Explore";
import Trending from "../pages/page/Trending";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
