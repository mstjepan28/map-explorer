import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

export const MapElement = ({ center }: { center?: LatLngExpression }) => {
  console.log("MapElement center", center);

  return (
    <MapContainer center={center ?? [0, 0]} zoom={14} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        pathOptions={{ color: "lime" }}
        positions={[
          [51.505, -0.09],
          [51.51, -0.1],
          [51.51, -0.12],
        ]}
      />
    </MapContainer>
  );
};
