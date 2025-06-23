import { useState } from "react";
import { useEffect } from "react";
import background from "../../assets/home-bg.jpg";
import DestinationsCarousel from "../DestinationsCarousel";
import { useNavigate } from "react-router";
import AboutUs from "../containers/AboutUs";

function HomePage() {
  const [customCity, setCustomCity] = useState(""); // state pentru textul de input
  const [suggestions, setSuggestions] = useState([]); // state care retine sugestiile returnate de fetch
  const navigate = useNavigate(); // hook react pentru navigare intre pagini

  useEffect(() => {
    const timer = setTimeout(() => {
      if (customCity.length >= 2) {
        // daca inputul are mai mult de 2 caractere fetchuim datele
        fetch(`https://photon.komoot.io/api/?q=${customCity}&limit=100`)
          .then((r) => r.json())
          .then((d) => {
            const onlyCities = d.features.filter(
              // filtrare pentru orase
              (f) =>
                f.properties.osm_value === "city" ||
                f.properties.osm_value === "town"
            );
            setSuggestions(onlyCities); // setam sugestiile returnate de fetch si ulterior filtrate
          })
          .catch(console.error);
      } else {
        setSuggestions([]);
      }
    }, 300); // delay de cautare
    return () => clearTimeout(timer);
  }, [customCity]); // apelat cand inputul se schimba

  return (
    <>
      <div
        className="relative h-[70vh] bg-cover"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-white text-center">
          <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">
              🗺️ Search your dream destinations
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 max-w-3xl mx-auto relative">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Enter a city (e.g. Bucharest)"
                className="p-2 rounded bg-[var(--card-bg)] text-[var(--text)] shadow-md border border-gray-300 w-full"
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
              />
              {/* valoarea inputului e data de valoarea state-ului, pe on change schimbam valoarea state-ului */}
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-[var(--card-bg)] shadow-lg rounded mt-1 z-10 max-h-48 overflow-auto">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 hover:bg-[var(--accent)] text-[var(--text)] hover:text-white cursor-pointer"
                      onClick={() =>
                        navigate(`/destinations/${s.properties.name}`)
                      }
                    >
                      {s.properties.name}, {s.properties.country}
                    </li>
                  ))}
                  {/* daca avem sugestii, folosim un map pentru a le afisa intr-o lista. Pe fiecare adaugam navigate la on click */}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <DestinationsCarousel></DestinationsCarousel>
      <AboutUs></AboutUs>
    </>
  );
}

export default HomePage;
