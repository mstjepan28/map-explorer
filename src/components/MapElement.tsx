import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

export const MapElement = ({ center, lineCoords }: { center: LatLngExpression; lineCoords: LatLngExpression[] }) => {
  const curPosition = lineCoords[lineCoords.length - 1];

  return (
    <MapContainer center={center} zoom={20} keyboard={false} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <div className="z-10">
        {center && <Polyline pathOptions={{ color: "blue", weight: 10 }} positions={[center, center]} />}
        {curPosition && <Polyline pathOptions={{ color: "red", weight: 10 }} positions={[curPosition, curPosition]} />}
      </div>

      {lineCoords && <Polyline pathOptions={{ color: "lime" }} positions={lineCoords} />}
    </MapContainer>
  );
};
