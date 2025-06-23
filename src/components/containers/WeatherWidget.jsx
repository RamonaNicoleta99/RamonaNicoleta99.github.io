import { useEffect, useState } from "react";
import MapView from "./MapView";

// Funcție simplă de conversie cod meteo → emoji
const weatherEmoji = (code) => {
  const map = {
    0: "☀️", // clear sky
    1: "🌤️", // mainly clear
    2: "⛅", // partly cloudy
    3: "☁️", // overcast
    45: "🌫️", // fog
    48: "🌫️", // fog
    51: "🌦️", // drizzle
    61: "🌧️", // rain
    71: "🌨️", // snow
    80: "🌧️", // rain showers
    95: "⛈️", // thunderstorm
  };
  return map[code] || "☁️";
};

function WeatherForecast7Days({ city }) {
  const [forecast, setForecast] = useState(null); // state de prognoza
  const [error, setError] = useState(null); // state de eroarea in caz de fetch gresit
  const [lat, setLat] = useState(null); // state de latitudine
  const [long, setLong] = useState(null); // state de longitudine

  const getCoords = async (cityName) => {
    // fetch de luare a coordonatelor orasului
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName
      )}&count=1`
    );
    const data = await res.json();
    return data.results?.[0];
  };

  const get7DayForecast = async (lat, lon) => {
    // fetch de luare a prognozei meteo bazat pe latitudine si longitudine
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );
    const data = await res.json();
    return data.daily;
  };

  useEffect(() => {
    async function fetchForecast() {
      try {
        setError(null);
        setForecast(null);
        const location = await getCoords(city); // apelam fetch-ul de coordonate
        setLat(location.latitude); // setam coordonatele cu datele primite din primul fetch
        setLong(location.longitude);
        if (!location) {
          setError("City not found.");
          return;
        }
        const forecastData = await get7DayForecast(
          // apelam fetch-ul de prognoza cu latitudinea si longitudinea obtinute din primul fetch
          location.latitude,
          location.longitude
        );
        setForecast({
          // setam prognoza cu datele obtinute din al doilea
          ...forecastData,
          name: location.name,
          country: location.country,
        });
      } catch (err) {
        setError("Failed to fetch forecast.");
      }
    }

    if (city) fetchForecast();
  }, [city]); // la schimbarea orasului primit ca prop, apelam cele 2 fetchuri si initiem state-urile cu datele corespunzatoare

  if (error) return <div className="text-red-500">{error}</div>;
  if (!forecast)
    return <div className="text-gray-400">Loading forecast...</div>;

  return (
    <>
      <div className="rounded-xl p-6 mx-auto bg-[var(--card-bg)] text-[var(--card-text)] shadow transition-all">
        <h2 className="text-2xl font-bold mb-4">
          📅 7-Day Forecast for {forecast.name}, {forecast.country}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5">
          {/* Folosdin map, parcurgem cele 7 zile si afisam datele legate de prognoza pe acestea */}
          {forecast.time.map((date, index) => (
            <div
              key={date}
              className="bg-[var(--bg)] p-4 rounded-lg text-center shadow-sm"
            >
              <p className="font-semibold text-sm">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="text-4xl my-2">
                {weatherEmoji(forecast.weathercode[index])}
              </div>
              <p className="text-sm">
                ↑ {forecast.temperature_2m_max[index]}°C
              </p>
              <p className="text-sm">
                ↓ {forecast.temperature_2m_min[index]}°C
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Apelam componenta MapView cu propsurile de latitudine si longitudine obtinute din fetch */}
      <MapView lat={lat} lng={long}></MapView>
    </>
  );
}

export default WeatherForecast7Days;
