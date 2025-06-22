import { useEffect, useState } from "react";
import useFavorites from "../hooks/UseFavorites";
import { Link } from "react-router";

function FavoritesCityContainer({ city, onFavoritesChange }) {
  const { toggleFavorite, isCityFavorite, disabled } = useFavorites();

  const handleToggle = () => {
    toggleFavorite(city);
  };

  if (!city) return null;

  return (
    <div className="rounded-xl p-6 bg-[var(--card-bg)] text-[var(--card-text)] shadow transition-all relative">
      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 text-xl p-1 hover:scale-110 transition"
        disabled={disabled}
      >
        {isCityFavorite(city) ? "❤" : "➕"}
      </button>
      <h2 className="text-2xl font-bold mb-2">{city.title}</h2>
      {city.description && (
        <p className="italic text-sm mb-2">{city.description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={city.image}
          alt={city.title}
          className="w-full sm:w-64 h-auto object-cover rounded-lg"
        />
        <p className="text-base">{city.extract}</p>
      </div>

      <div className="mt-6">
        <Link
          to={`/destinations/${encodeURIComponent(city.title)}`}
          className="hover:underline underline-offset-4 text-xl"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default FavoritesCityContainer;
