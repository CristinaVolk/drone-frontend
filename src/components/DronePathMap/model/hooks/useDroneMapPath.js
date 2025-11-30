import {useEffect, useRef, useState} from "react";
import L from "leaflet";

import {bearingDeg, haversine, linearInterpolation} from "../helpers/drone";

const defaultCenter= [55.944, -3.186]; // Edinburgh-ish

const droneIcon = L.icon({
    className: "drone-wrapper",
    html: '<div class="drone"></div>',
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8056/8056407.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

export const useDroneMapPath = (start, end, speedMs) => {
    const [status, setStatus] = useState("PREPARING");
    const wrapperRef = useRef(null);
    const mapDivRef = useRef(null);
    const mapRef = useRef(null);
    const droneRef = useRef(null);
    const rafRef = useRef(null);
    const t0Ref = useRef(null);
    const totalMetersRef = useRef(0);

    useEffect(() => {
        if (!mapDivRef.current || mapRef.current) {
            return;
        }
        // 1) Create map
        const map = L.map(mapDivRef.current, { center: [start.lat, start.lng], zoom: 14 });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        // 2) Path (A→B) and fit
        const path = L.polyline(
            [
                [start.lat, start.lng],
                [end.lat, end.lng]
            ], {
                color: "#0a84ff",
                weight: 4
            }
        ).addTo(map);
        map.fitBounds(path.getBounds(), { padding: [24, 24] });

        const drone = L.marker([start.lat, start.lng], { icon: droneIcon }).addTo(map);

        mapRef.current = map;
        droneRef.current = drone;
        totalMetersRef.current = haversine(start, end);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            map.remove();
            mapRef.current = null;
            droneRef.current = null;
        };
    }, [start, end]);

    // animation
    useEffect(() => {
        if (!mapRef.current || !droneRef.current) {
            return;
        }
        t0Ref.current = null;

        const total = totalMetersRef.current;
        const brg = bearingDeg(start, end);

        setStatus("DISPATCHED");

        const step = ts => {

            if (t0Ref.current == null) {
                t0Ref.current = ts;
            }

            const elapsed = (ts - t0Ref.current) / 1000;
            const traveled = Math.min(elapsed * speedMs, total);
            const t = total ? traveled / total : 1;
            const pos = linearInterpolation(start, end, t);

            droneRef.current.setLatLng([pos.lat, pos.lng]);
            const el = droneRef.current.getElement()?.querySelector(".drone");
            if (el) {
                el.style.transform = `rotate(${brg}deg)`;
            }

            if (t < 1) {
                rafRef.current = requestAnimationFrame(step);
            } else {
                setStatus("DELIVERED");
            }
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [start, end, speedMs]);


    return {
        status,
        wrapperRef,
        mapDivRef
    }
};