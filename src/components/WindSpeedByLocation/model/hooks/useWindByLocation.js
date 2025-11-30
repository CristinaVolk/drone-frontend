import {useEffect, useState} from "react";
import {fetchWindByLocation} from "../api/fetchWindByLocation";

export const useWindByLocation = (lat, lng) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWindSpeed() {
            const response = await fetchWindByLocation(lat, lng, 'Edinburgh');
            if (response.location && response.windSpeedMs) {
                setResult({ name: response.location, speedMs: response.windSpeedMs });
            } else {
                setError("Unexpected error.");
            }
        }

        fetchWindSpeed();
    }, [lat, lng]);

    return {
        result,
        error
    }
};