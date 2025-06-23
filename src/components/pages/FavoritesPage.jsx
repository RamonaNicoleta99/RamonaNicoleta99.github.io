import { useEffect, useState } from "react";
import FavoritesCityContainer from "../containers/FavoritesCityContainer";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]); // state array pentru stocarea oraselor favorite

  const loadFavorites = () => {
    // functie care seteaza state-ul cu valoarea variabile favorites din local storage
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []); // la montarea componentei, apelam functia de load

  useEffect(() => {
    const interval = setInterval(() => {
      loadFavorites();
    }, 300);

    return () => clearInterval(interval);
  }, []); // use effect care apeleaza functia de load (actualizeaza datele din favorites) la 0.3 secunde

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
        {/* folosim map astfel incat pentru fiecare obiect din favorites, se creeaza o componenta FavoritesCityContainer */}
      </div>
    </div>
  );
}
