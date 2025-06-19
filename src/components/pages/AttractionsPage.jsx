import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import AttractionsCard from "../containers/AttractionsCard";

const sortOptions = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
];

function AttractionsPage() {
  const itemsPerPage = 9;

  const [customCity, setCustomCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCitySelected, setIsCitySelected] = useState(false);

  const fetchData = async (city) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Tourist_attractions_in_${city}&cmlimit=50&format=json&origin=*`
      );
      const data = await res.json();
      const pages = data.query.categorymembers.filter((item) => item.ns === 0);

      const detailed = await Promise.all(
        pages.map(async (page) => {
          const summaryRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              page.title
            )}`
          );
          return await summaryRes.json();
        })
      );

      const sorted = detailed.sort((a, b) => {
        if (sort === "az") return a.title.localeCompare(b.title);
        if (sort === "za") return b.title.localeCompare(a.title);
        return 0;
      });

      setDestinations(sorted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Wikipedia fetch error:", err);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if (customCity.length >= 2) {
        fetch(`https://photon.komoot.io/api/?q=${customCity}&limit=100`)
          .then((r) => r.json())
          .then((d) => {
            const onlyCities = d.features.filter(
              (f) =>
                f.properties.osm_value === "city" ||
                f.properties.osm_value === "town"
            );
            setSuggestions(onlyCities);
          })
          .catch(console.error);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [customCity]);

  useEffect(() => {
    if (customCity.length > 0) {
      fetchData(customCity.replaceAll(" ", "_"));
    }
  }, [sort]);

  const applyCity = (name) => {
    setCustomCity(name);
    setSuggestions([]);
    setIsCitySelected(true); // ascundem inputul după alegere
    fetchData(name.replaceAll(" ", "_"));
  };

  const resetCitySearch = () => {
    setCustomCity("");
    setSuggestions([]);
    setIsCitySelected(false); // afișăm din nou inputul
    setDestinations([]);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = destinations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  return (
    <div className="min-h-screen px-4 py-8 bg-[var(--bg)] text-[var(--text)] transition-all">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">
          🗺️ Tourist Attractions
          {isCitySelected && <span> in {customCity}</span>}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-8 max-w-3xl mx-auto relative">
        {!isCitySelected && (
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Enter a city (e.g. Bucharest)"
              className="p-2 rounded bg-[var(--card-bg)] text-[var(--text)] shadow-md border border-gray-300 w-full"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-[var(--card-bg)] shadow-lg rounded mt-1 z-10 max-h-48 overflow-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 hover:bg-[var(--accent)] hover:text-white cursor-pointer"
                    onClick={() => applyCity(s.properties.name)}
                  >
                    {s.properties.name}, {s.properties.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isCitySelected && (
          <button
            onClick={resetCitySearch}
            className="px-4 py-2 rounded bg-[var(--card-bg)] text-[var(--text)] border shadow-md hover:shadow-lg transition"
          >
            Search for another city
          </button>
        )}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded bg-[var(--card-bg)] text-[var(--text)] shadow-md border border-gray-300"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort by {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {currentItems.map((place, index) => (
              <AttractionsCard key={index} place={place} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-[var(--card-bg)] text-[var(--text)] border shadow disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-[var(--card-bg)] text-[var(--text)] border shadow disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">No destinations found.</p>
      )}
    </div>
  );
};

export default AttractionsPage;
