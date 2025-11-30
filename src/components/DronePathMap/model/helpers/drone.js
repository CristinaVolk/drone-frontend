export const toRad = d => d * Math.PI / 180;
export const toDeg = r => r * 180 / Math.PI;

export const haversine = (a, b) => {
    const R = 6371000; // Earth radius in meters
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const s = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(s)); // distance in meters
};

// Bearing is the direction you need to travel from point A to point B, measured clockwise from north.
// bearingDeg is used to rotate the drone icon so it faces the direction of travel.
// Without this, the drone would move but always point “up,” which looks unrealistic.
export const bearingDeg = (a, b) => {
    const φ1 = toRad(a.lat);
    const φ2 = toRad(b.lat);
    const λ1 = toRad(a.lng);
    const λ2 = toRad(b.lng);

    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

    return (toDeg(Math.atan2(y, x)) + 360) % 360;
};


export const linearInterpolation = (a, b, t)=>
    ({ lat: a.lat + (b.lat - a.lat)*t, lng: a.lng + (b.lng - a.lng)*t });