import { useState, useEffect } from "react";

export const useLocation = () => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestLocation = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates(position.coords);
        },
        (err) => setError(err.message),
      );
    };

    requestLocation();
  }, []);

  return {
    coordinates: coordinates,
    error: error,
  };
};
