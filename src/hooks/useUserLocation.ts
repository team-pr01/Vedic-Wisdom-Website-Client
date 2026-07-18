/* eslint-disable react-hooks/set-state-in-effect */
// hooks/useUserLocation.ts
import { useState, useEffect } from "react";

interface UserLocation {
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    state: string | null;
    country: string | null;
    error: string | null;
    isLoading: boolean;
}

export const useUserLocation = () => {
    const [location, setLocation] = useState<UserLocation>({
        latitude: null,
        longitude: null,
        city: null,
        state: null,
        country: null,
        error: null,
        isLoading: true,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({
                ...prev,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse geocoding to get city, state, country
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    setLocation({
                        latitude,
                        longitude,
                        city: data.city || data.locality || null,
                        state: data.principalSubdivision || null,
                        country: data.countryName || null,
                        error: null,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Failed to get location details:", error);
                    setLocation((prev) => ({
                        ...prev,
                        error: "Failed to get location details",
                        isLoading: false,
                    }));
                }
            },
            (error) => {
                setLocation((prev) => ({
                    ...prev,
                    error: error.message,
                    isLoading: false,
                }));
            },
            { enableHighAccuracy: true }
        );
    }, []);

    return location;
};