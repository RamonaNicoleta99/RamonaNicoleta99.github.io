import { useEffect, useState } from "react";
import CityInfoContainer from "../containers/CityInfoContainer";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  console.log(favorites);

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
            <CityInfoContainer key={index} city={city.title} />
          ))
        )}
      </div>
    </div>
  );
}
