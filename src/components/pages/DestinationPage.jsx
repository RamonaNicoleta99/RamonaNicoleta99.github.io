import { useParams } from "react-router";
import AttractionsContainer from "../containers/AttractionsContainer";
import WeatherWidget from "../containers/WeatherWidget";
import CityInfoContainer from "../containers/CityInfoContainer";

function DestinationPage() {
  const { city } = useParams();

  return (
    <>
      <div className="max-w-[1100px] mx-auto mt-8 mb-8">
        <CityInfoContainer city={city} isFetch={true} />
        <AttractionsContainer city={city}></AttractionsContainer>
        <WeatherWidget city={city}></WeatherWidget>
      </div>
    </>
  );
}

export default DestinationPage;
