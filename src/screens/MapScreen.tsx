import { useState } from "react";
import { MapElement } from "../components/MapElement";
import { useArrows } from "../hooks/useArrows";
import { useLocation } from "../hooks/useLocation";

const ON_MOVE_STEP = 0.00005 as const;

export const MapScreen = () => {
  const [lineCoords, setLineCoords] = useState<[number, number][]>([]);

  useLocation({
    onCoordinatesChange: (coords) => {
      setLineCoords([[coords.latitude, coords.longitude]]);
    },
  });

  const moveHandler = (changeLongBy: number, changeLatBy: number) => {
    const lastPosition = lineCoords[lineCoords.length - 1] ?? [0, 0];

    const newLat = lastPosition[0] + changeLatBy;
    const newLong = lastPosition[1] + changeLongBy;

    setLineCoords((p) => [...p, [newLat, newLong]]);
  };

  useArrows(
    {
      onUp: () => moveHandler(0, ON_MOVE_STEP),
      onDown: () => moveHandler(0, -ON_MOVE_STEP),
      onLeft: () => moveHandler(-ON_MOVE_STEP, 0),
      onRight: () => moveHandler(ON_MOVE_STEP, 0),
    },
    [lineCoords],
  );

  if (lineCoords.length === 0) {
    return;
  }

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-gray-100">
      <MapElement center={[lineCoords[0][0], lineCoords[0][1]]} lineCoords={lineCoords} />
    </div>
  );
};
