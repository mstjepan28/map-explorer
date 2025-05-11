import { MapElement } from "../components/MapElement";
import { useLocation } from "../hooks/useLocation";

export const MapScreen = () => {
  const { coordinates } = useLocation();

  if (!coordinates) {
    return;
  }

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-gray-100">
      <MapElement center={[coordinates?.latitude ?? 0, coordinates?.longitude ?? 0]} />
    </div>
  );
};
