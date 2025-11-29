import {Link} from "react-router-dom";
import {appRoutes, routesNames} from "../../../shared/constants/router";

import './Navigation.css';

export const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to={appRoutes[routesNames.HOME]}>{routesNames.HOME}</Link>
            <Link to={appRoutes[routesNames.CREATE_ORDER]}>{routesNames.CREATE_ORDER}</Link>
            <Link to={appRoutes[routesNames.TRACK_ORDER]}>{routesNames.TRACK_ORDER}</Link>
        </nav>
    )
}