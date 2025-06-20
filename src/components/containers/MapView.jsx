import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapViewer({ lat, lng }) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden mt-8">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={[lat, lng]}>
          <Popup>{`Lat: ${lat}, Lng: ${lng}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapViewer;
