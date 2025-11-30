import {useWindByLocation} from "../model/hooks/useWindByLocation";

import './WindSpeedByLocation.css';

export const WindSpeedByLocation = ({lng, lat}) => {
    const {result, error} = useWindByLocation(lat, lng)

    return (
        <section className="wind-speed-container">
            <h4>Wind speed by location</h4>

            {error && (
                <p className="wind-speed-error">
                    ⚠️ {error}
                </p>
            )}

            {result?.speedMs && (
                <div className="wind-speed-result">
                    <strong>{result.name}</strong>
                    <div>
                        Wind speed:{" "}
                        <span className="wind-speed-value">
                            {result.speedMs.toFixed(2)}  m/s
                        </span>
                    </div>
                </div>
            )}
        </section>
    );
}
