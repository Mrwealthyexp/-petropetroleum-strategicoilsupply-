import { useCallback, useEffect, useState } from "react";

export type Coordinates = { latitude: number; longitude: number };

export type Personalization = {
  coordinates: Coordinates | null;
  timezone: string | null;
  locale: string;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
};

export function usePersonalization(): Personalization {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not available");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude });
        setLoading(false);
      },
      ({ message }) => {
        setError(message || "Unable to determine location");
        setLoading(false);
      },
      { enableHighAccuracy: false, maximumAge: 300_000, timeout: 10_000 },
    );
  }, []);

  useEffect(() => {
    if (typeof Intl !== "undefined") Intl.DateTimeFormat().resolvedOptions();
  }, []);

  return {
    coordinates,
    timezone: typeof Intl === "undefined" ? null : Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: typeof navigator === "undefined" ? "en-US" : navigator.language,
    loading,
    error,
    requestLocation,
  };
}
