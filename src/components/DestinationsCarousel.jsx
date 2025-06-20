import { useState, useEffect } from "react";

import eiffel from "../assets/attractions/eiffel.jpg";

const images = [
  {
    src: eiffel,
    caption: "Eiffel Tower, Paris – Iconic landmark of France.",
  },
  {
    src: "/assets/attractions/colosseum.jpg",
    caption: "Colosseum, Rome – Ancient Roman gladiator arena.",
  },
  {
    src: "/assets/attractions/statue_liberty.jpg",
    caption: "Statue of Liberty, New York – Symbol of freedom.",
  },
  {
    src: "/assets/attractions/taj_mahal.jpg",
    caption: "Taj Mahal, India – Mausoleum of eternal love.",
  },
  {
    src: "/assets/attractions/machu_picchu.jpg",
    caption: "Machu Picchu, Peru – Lost city of the Incas.",
  },
  {
    src: "/assets/attractions/christ_redeemer.jpg",
    caption: "Christ the Redeemer, Brazil – Towering statue over Rio.",
  },
  {
    src: "/assets/attractions/great_wall.jpg",
    caption: "Great Wall, China – Longest structure ever built.",
  },
];

const AUTO_INTERVAL = 3000;

export default function DestinationsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 768) return 2;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setStartIndex((prev) =>
      prev + 1 < images.length - visibleCount + 1 ? prev + 1 : 0
    );
  };

  const prev = () => {
    setStartIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : images.length - visibleCount
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [visibleCount]);

  return (
    <div className="w-full max-w-[1600px] mx-auto py-16 overflow-hidden relative px-4">
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
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-[450px] object-cover"
                />
                <div className="p-6 text-center text-lg font-semibold text-[var(--text)]">
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Butoane */}
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
