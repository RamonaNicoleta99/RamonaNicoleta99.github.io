import { useEffect, useState } from "react";
import FavoritesCityContainer from "../containers/FavoritesCityContainer";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // ASCULTĂ și la modificări ulterioare în localStorage (via StorageEvent sau forțat)
  useEffect(() => {
    const interval = setInterval(() => {
      loadFavorites();
    }, 300); // check periodic (poate fi optimizat cu context sau observer)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 bg-[var(--bg)] text-[var(--text)] transition-all">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <h1 className="text-center text-3xl font-bold mb-6">
          ❤ Your Favorite Cities
        </h1>

        {favorites.length === 0 ? (
          <p className="text-lg italic text-center">
            You haven't added any favorites yet.
          </p>
        ) : (
          favorites.map((city, index) => (
            <FavoritesCityContainer key={index} city={city} />
          ))
        )}
      </div>
    </div>
  );
}
