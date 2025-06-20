import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import AttractionsCard from "../containers/AttractionsCard";

const sortOptions = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
];

function AttractionsContainer({ city }) {
  const itemsPerPage = 6;
  const [attractions, setattractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);

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

      setattractions(sorted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Wikipedia fetch error:", err);
      setattractions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData(city.replaceAll(" ", "_"));
    }
  }, [city, sort]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = attractions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(attractions.length / itemsPerPage);

  return (
    <div className="min-h-screen px-4 py-8 bg-[var(--bg)] text-[var(--text)] transition-all">
      <div className="flex flex-col items-center gap-4 mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center">
          🗺️ Tourist Attractions in {city}
        </h1>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-md bg-[var(--card-bg)] text-[var(--text)] border border-gray-300 shadow-sm"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[var(--bg)] text-[var(--text)]"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-[var(--card-bg)] text-[var(--text)] border shadow disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">No attractions found.</p>
      )}
    </div>
  );
}

export default AttractionsContainer;
