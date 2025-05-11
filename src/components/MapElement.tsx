import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

export const MapElement = ({ center, lineCoords }: { center: LatLngExpression; lineCoords: LatLngExpression[] }) => {
  return (
    <MapContainer center={center} zoom={20} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {center && <Polyline pathOptions={{ color: "blue", weight: 10 }} positions={[center, center]} />}
      {lineCoords && <Polyline pathOptions={{ color: "lime" }} positions={lineCoords} />}
    </MapContainer>
  );
};
