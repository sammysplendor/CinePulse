import { useState, useEffect } from "react";
import { toast } from "sonner";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error("Failed to parse watchlist:", error);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    const exists = watchlist.some((item) => item.id === movie.id);

    if (exists) {
      toast.info("This movie is already in your watchlist.");
      return;
    }

    setWatchlist((prev) => [...prev, movie]);

    toast.success("Movie has been added to your watchlist.");
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };
};

export default useWatchlist;
