import { useEffect, useState } from "react";

function CityInfoContainer({ city }) {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

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
          title: data.title,
          description: data.description,
          extract: data.extract,
          image: data.thumbnail?.source,
          url: data.content_urls?.desktop?.page,
        });
      } else {
        setError("No info found for this city.");
      }
    } catch (err) {
      setError("Failed to fetch city info.");
    }
  };

  useEffect(() => {
    if (city) {
      fetchCityInfo(city);
    }
  }, [city]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!info) return <div className="text-gray-400">Loading city info...</div>;

  return (
    <div className="rounded-xl p-6 bg-[var(--card-bg)] text-[var(--card-text)] shadow transition-all">
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
