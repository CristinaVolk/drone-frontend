import "./HomePage.css";
import {Link} from "react-router-dom";
import {appRoutes, routesNames} from "../../../shared/constants/router";

export function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">Drone Medical Delivery</h1>
                        <p className="hero-subtitle">
                            Fast. Reliable. Life-Saving. Delivering critical medical supplies when every second counts.
                        </p>
                        <Link to={appRoutes[routesNames.CREATE_ORDER]}
                              className="hero-btn"
                        >
                            Start Your Delivery
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
