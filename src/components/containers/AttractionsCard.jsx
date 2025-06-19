const AttractionsCard = ({ place }) => {
  if (!place?.content_urls) return null;

  return (
    <div className="bg-[var(--card-bg)] text-[var(--card-text)] rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
      {place.thumbnail?.source && (
        <img
          src={place.thumbnail.source}
          alt={place.title}
          className="w-full h-48 object-cover rounded-xl mb-3"
        />
      )}

      <h2 className="text-lg font-semibold mb-1 line-clamp-2">{place.title}</h2>

      <p className="text-sm line-clamp-4 mb-3">{place.extract}</p>

      <div className="flex justify-between items-center mt-auto">
        <a
          href={place.content_urls?.desktop?.page}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--accent)] font-medium hover:underline"
        >
          Citește mai mult
        </a>
      </div>
    </div>
  );
};

export default AttractionsCard;
