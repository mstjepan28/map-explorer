import { useState, useEffect } from "react";

export const useLocation = ({
  onCoordinatesChange,
}: {
  onCoordinatesChange: (coordinates: GeolocationCoordinates) => void;
}) => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onCoordinatesChange(position.coords);
        setCoordinates(position.coords);
      },
      (err) => setError(err.message),
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    coordinates: coordinates,
    error: error,
  };
};
