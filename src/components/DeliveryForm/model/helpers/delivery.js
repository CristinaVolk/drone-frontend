export function createPayload(form) {
    return {
        date: form.date || null,
        time: form.time || null,
        requirements: {
            capacity: form.capacity ? Number(form.capacity) : null,
            cooling: form.cooling === "true",
            heating: form.heating === "true",
            maxCost: form.maxCost ? Number(form.maxCost) : null
        },
        delivery: {
            lng: form.lng ? Number(form.lng) : null,
            lat: form.lat ? Number(form.lat) : null
        }
    };
}