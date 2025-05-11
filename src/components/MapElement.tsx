import { MapContainer, Polyline, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export const MapElement = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
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
