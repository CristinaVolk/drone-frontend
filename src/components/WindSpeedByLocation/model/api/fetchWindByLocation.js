
const apiKey = 'ad66ab359e58ea0d103cdc186c91ff8f';


export async function fetchWindByLocation(lat, lng, location) {

    // NOTE: OpenWeather uses 'q' for city search and returns wind.speed in m/s when units=metric
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=${apiKey}`

    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Location not found. Please check the name and try again.");
        }
        const text = await res.text().catch(() => "");
        throw new Error(`Weather API error (${res.status}). ${text || ""}`.trim());
    }

    const data = await res.json();
    const windSpeedMs = data?.current.wind_speed;

    if (typeof windSpeedMs !== "number") {
        throw new Error("Wind speed data not available for this location.");
    }

    return { location: data?.timezone ?? location, windSpeedMs };
}
