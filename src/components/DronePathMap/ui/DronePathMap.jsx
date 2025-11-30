import "./DroneMapPath.css";
import "leaflet/dist/leaflet.css";
import {useDroneMapPath} from "../model/hooks/useDroneMapPath";

export function DronePathMap(props) {
    const {
        start = { lat: 55.944, lng: -3.206 },
        end   = { lat: 55.9533, lng: -3.1883 },
        speedMs = 12
    } = props;

    const {status, mapDivRef, wrapperRef} = useDroneMapPath(start, end, speedMs);

    const cls= status === "PREPARING"
        ? "status-preparing"
        : status === "DISPATCHED"
            ? "status-dispatched"
            : "status-delivered";

    return (
        <>
            <div className={`status-pill ${cls}`}>Status: <strong>{status}</strong></div>
            <div
                ref={wrapperRef}
                className="map-square-wrapper"
            >
                <div
                    ref={mapDivRef}
                    className="map-fill"
                />
            </div>
        </>
    );
}
