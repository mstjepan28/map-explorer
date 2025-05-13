import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

export const MapElement = ({ center, lineCoords }: { center: LatLngExpression; lineCoords: LatLngExpression[] }) => {
  const curPosition = lineCoords[lineCoords.length - 1];

  const getLongLatValue = (coord: LatLngExpression) => {
    if (Array.isArray(coord)) {
      return [coord[0], coord[1]];
    }

    if ("lat" in coord && "lng" in coord) {
      return [coord.lat, coord.lng];
    }

    console.error("Invalid coordinate format", coord);
    return [0, 0];
  };

  const getAveragedOut = (originalList: LatLngExpression[], sampleSize: number) => {
    const coordinateCount = originalList.length;
    if (coordinateCount < sampleSize) {
      return undefined;
    }

    const averagedOut: LatLngExpression[] = [];

    for (let index = 0; index < coordinateCount - sampleSize; index += sampleSize) {
      const sample = lineCoords.slice(index, index + sampleSize);

      const avgLat = sample.reduce((acc, coord) => acc + getLongLatValue(coord)[0], 0) / sampleSize;
      const avgLong = sample.reduce((acc, coord) => acc + getLongLatValue(coord)[1], 0) / sampleSize;

      averagedOut.push([avgLat, avgLong]);
    }

    return averagedOut;
  };

  const averagedOut = useMemo(() => {
    return getAveragedOut(lineCoords, 3);
  }, [lineCoords.length]);

  return (
    <MapContainer center={center} zoom={20} keyboard={false} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lineCoords && <Polyline pathOptions={{ color: "lime" }} positions={lineCoords} />}
      {averagedOut && <Polyline pathOptions={{ color: "green" }} positions={averagedOut} />}

      {center && <Polyline pathOptions={{ color: "blue", weight: 10 }} positions={[center, center]} />}
      {curPosition && <Polyline pathOptions={{ color: "red", weight: 10 }} positions={[curPosition, curPosition]} />}
    </MapContainer>
  );
};
