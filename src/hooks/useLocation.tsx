import { useEffect, useRef } from "react";

export const useLocation = ({
  onCoordinatesLoad,
  onCoordinatesChange,
  onError,
}: {
  onCoordinatesLoad: (coordinates: GeolocationCoordinates) => void;
  onCoordinatesChange: (coordinates: GeolocationCoordinates) => void;
  onError?: (error: GeolocationPositionError) => void;
}) => {
  const initCoordinatesSet = useRef(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      if (typeof onError === "function") {
        onError({
          code: 0,
          message: "Geolocation is not supported by this browser",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });
      }

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (initCoordinatesSet.current) {
          onCoordinatesChange(position.coords);
          return;
        }

        onCoordinatesLoad(position.coords);
        initCoordinatesSet.current = true;
      },
      (err) => {
        if (typeof onError === "function") {
          onError(err);
        }
      },
    );
  };

  useEffect(() => {
    requestLocation();
    const intervalId = setInterval(requestLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);
};
