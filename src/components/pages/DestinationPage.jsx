import { useParams } from "react-router";
import AttractionsContainer from "../containers/AttractionsContainer";
import WeatherWidget from "../containers/WeatherWidget";
import CityInfoContainer from "../containers/CityInfoContainer";

function DestinationPage() {
  const { city } = useParams(); // luam numele orasului din parametrul link-ului pentru a il da ca props componentelor copil

  return (
    <>
      <div className="max-w-[1100px] mx-auto mt-8 mb-8">
        <CityInfoContainer city={city} />
        <AttractionsContainer city={city}></AttractionsContainer>
        <WeatherWidget city={city}></WeatherWidget>
      </div>
    </>
  );
}

export default DestinationPage;
