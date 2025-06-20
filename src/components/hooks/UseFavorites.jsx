import { useState, useEffect } from "react";

const useFavorites = (city) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const [buttonIcon, setButtonIcon] = useState(() => {
    if (!city || !city.title) return "➕";
    return favorites.some((item) => item.title === city.title) ? "❤" : "➕";
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!city || !city.title) return;
    const isFav = favorites.some((item) => item.title === city.title);
    setButtonIcon(isFav ? "❤" : "➕");
  }, [city, favorites]);

  const toggleFavorite = () => {
    if (!city || !city.title) return;

    setDisabled(true); // 👈 dezactivează
    setTimeout(() => setDisabled(false), 5000);

    const updatedFavorites = favorites.some((item) => item.title === city.title)
      ? favorites.filter((item) => item.title !== city.title)
      : [...favorites, city];

    setFavorites(updatedFavorites);
    setButtonIcon(
      updatedFavorites.some((item) => item.title === city.title) ? "❤" : "➕"
    );
  };

  return { buttonIcon, toggleFavorite, disabled };
};

export default useFavorites;
