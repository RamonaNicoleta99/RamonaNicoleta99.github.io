import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import eiffel from "../assets/attractions/eiffel.jpg";
import colloseum from "../assets/attractions/colloseum.jpg";
import liberty from "../assets/attractions/liberty.jpg";
import tokyoskytree from "../assets/attractions/tokyoskytree.jpg";
import sagrada from "../assets/attractions/sagrada.jpg";
import tajmahal from "../assets/attractions/tajmahal.jpg";
import bigben from "../assets/attractions/bigben.jpg";
import burjkhalifa from "../assets/attractions/burjkhalifa.jpg";
import sydneyopera from "../assets/attractions/sydneyopera.jpg";

// obiect care contine destinatiile, orasul, captionul si calea catre imaginile din carusel
const images = [
  {
    src: eiffel,
    title: "Eiffel Tower, Paris",
    caption: "Iconic landmark of France.",
    city: "Paris",
  },
  {
    src: colloseum,
    title: "Colosseum, Rome",
    caption: "Ancient Roman gladiator arena.",
    city: "Rome",
  },
  {
    src: liberty,
    title: "Statue of Liberty, New York",
    caption: "Symbol of freedom.",
    city: "New York City",
  },
  {
    src: tajmahal,
    title: "Taj Mahal, India",
    caption: "Mausoleum of eternal love.",
    city: "Agra",
  },
  {
    src: sagrada,
    title: "Sagrada Família, Barcelona",
    caption: "Gaudí's unfinished masterpiece.",
    city: "Barcelona",
  },
  {
    src: tokyoskytree,
    title: "Tokyo Skytree, Tokyo",
    caption: "Tallest tower in the world.",
    city: "Tokyo",
  },
  {
    src: sydneyopera,
    title: "Sydney Opera House, Sydney",
    caption: "Architectural masterpiece.",
    city: "Sydney",
  },
  {
    src: bigben,
    title: "Big Ben, London",
    caption: "Famous clock tower and UK icon.",
    city: "London",
  },
  {
    src: burjkhalifa,
    title: "Burj Khalifa, Dubai",
    caption: "Tallest building in the world.",
    city: "Dubai",
  },
];

// constanta pentru intervalul de tranzitie al caruselului (3s)
const AUTO_INTERVAL = 3000;

export default function DestinationsCarousel() {
  const [startIndex, setStartIndex] = useState(0); // state pentru indexul primului element vizibil
  const [visibleCount, setVisibleCount] = useState(getVisibleCount()); // state pentru numarul de imagini vizibile simultan
  const intervalRef = useRef(null); // memoreaza id-ul intervalului pentru autoslide
  const navigate = useNavigate(); // state de navigare

  function getVisibleCount() {
    // functie pentru calcularea numarului de imagini vizibile in functie de ecran
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 768) return 2;
    return 1;
  }

  const startAutoSlide = () => {
    stopAutoSlide();
    // Porneste un interval care apeleaza functia next() la fiecare AUTO_INTERVAL milisecunde
    // Salvam id-ul intervalului in intervalRef.current pentru a putea fi oprit mai tarziu
    intervalRef.current = setInterval(() => {
      next(); // Trece la urmatoarea imagine
    }, AUTO_INTERVAL);
  };

  const stopAutoSlide = () => {
    // Verificam daca exista un interval activ
    // Daca exista, il oprim folosind clearInterval
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount()); // setam numarul de imagini vizibile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // calculeaza numarul de imagini vizibile la montare

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [visibleCount]); // porneste slide-ul la modificarea state-ului visibileCount

  const next = () => {
    // Crestem indexul elementului de start cu 1 daca mai exista imagini disponibile
    // Daca ajungem la finalul listei, revenim la primul element (resetam indexul la 0)
    setStartIndex((prev) =>
      prev + 1 < images.length - visibleCount + 1 ? prev + 1 : 0
    );
  };

  const prev = () => {
    // Scadem indexul elementului de start cu 1 daca nu suntem deja la inceput
    // Daca suntem la inceputul listei, trecem la ultima imagine vizibila
    setStartIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : images.length - visibleCount
    );
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto py-16 overflow-hidden relative px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        🗺️ Must-See Attractions
      </h1>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(images.length / visibleCount) * 100}%`,
            transform: `translateX(-${(100 / images.length) * startIndex}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="p-3"
              style={{
                width: `${100 / images.length}%`,
              }}
            >
              {/* Pentru fiecare destinatie din array, cream un div*/}
              <div
                className="backdrop-blur-sm bg-[var(--card-bg)] rounded-xl shadow-sm overflow-hidden h-full flex flex-col"
                onMouseEnter={stopAutoSlide}
                onMouseLeave={startAutoSlide}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-[450px] object-cover cursor-pointer"
                  onClick={() =>
                    navigate(`/destinations/${encodeURIComponent(img.city)}`)
                  }
                />
                <div className="p-2 text-center text-lg font-semibold text-[var(--text)]">
                  {img.title}
                </div>
                <div className="p-2 text-center text-lg font-semibold text-[var(--text)]">
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* la apasarea butoanelor laterale se executa functiile prev si next */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full z-10 hover:bg-black/90 text-xl"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full z-10 hover:bg-black/90 text-xl"
      >
        ›
      </button>
    </div>
  );
}
