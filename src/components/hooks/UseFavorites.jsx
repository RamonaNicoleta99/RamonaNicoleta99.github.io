import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const [disabled, setDisabled] = useState(false);

  const toggleFavorite = (city) => {
    if (!city || !city.title) return;

    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);

    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (item) => item.title === city.title
      );
      const updated = isAlreadyFavorite
        ? prevFavorites.filter((item) => item.title !== city.title)
        : [...prevFavorites, city];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isCityFavorite = (city) => {
    return favorites.some((item) => item.title === city?.title);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isCityFavorite,
    disabled,
  };
};

export default useFavorites;
