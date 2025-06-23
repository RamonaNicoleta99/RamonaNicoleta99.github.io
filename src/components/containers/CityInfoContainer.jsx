import { useEffect, useState } from "react";
import useFavorites from "../hooks/UseFavorites";

function CityInfoContainer({ city }) {
  const [info, setInfo] = useState(null); // obiect cu infromatii despre orasul curent
  const [error, setError] = useState(null); // state pentru erori, in caz ca orasul nu este gasit pe fetch
  const { toggleFavorite, isCityFavorite, disabled } = useFavorites(); // apelam hook-ul de favorites

  // fetch pentru luarea de informatii despre oras
  const fetchCityInfo = async (cityName) => {
    try {
      setError(null);
      setInfo(null);
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          cityName
        )}`
      );
      const data = await res.json();

      if (data.type === "standard") {
        setInfo({
          // setam informatiile despre oras in state-ul info
          title: data.title,
          description: data.description,
          extract: data.extract,
          image: data.thumbnail?.source,
          url: data.content_urls?.desktop?.page,
        });
      } else {
        setError("No info found for this city."); // in caz ca orasul nu exista pe Wikipedia, stocam in sate-ul de eroare un mesaj corespuznator
      }
    } catch (err) {
      setError("Failed to fetch city info.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchCityInfo(city);
    }
  }, [city]); // cand orasul se schimba, initiem fetch-ul

  const handleToggle = () => {
    // functie de handle care updateaza variabila favorites din local storage folosind functia din hook
    toggleFavorite(info);
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!info) return <div className="text-gray-400">Loading city info...</div>;

  return (
    <div className="rounded-xl p-6 bg-[var(--card-bg)] text-[var(--card-text)] shadow transition-all relative">
      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 text-xl p-1 hover:scale-110 transition"
        disabled={disabled}
      >
        {isCityFavorite(info) ? "❤" : "➕"}
      </button>
      <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
      {info.description && (
        <p className="italic text-sm mb-2">{info.description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        {info.image && (
          <img
            src={info.image}
            alt={info.title}
            className="w-full sm:w-64 h-auto object-cover rounded-lg"
          />
        )}
        <p className="text-base">{info.extract}</p>
      </div>
      {info.url && (
        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-[var(--accent)] underline"
        >
          Read more on Wikipedia →
        </a>
      )}
    </div>
  );
}

export default CityInfoContainer;
