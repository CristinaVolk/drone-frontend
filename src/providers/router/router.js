import {createBrowserRouter} from "react-router-dom";

import {appRoutes, routesNames} from "../../shared/constants/router";
import {CreateOrderPagePage} from "../../pages/CreateOrderPage/ui/CreateOrderPage";
import {TrackOrderPagePage} from "../../pages/TrackOrderPage/ui/TrackOrderPage";
import {App} from "../../app/ui/App";


export const router = createBrowserRouter([
    {
        path: appRoutes[routesNames.HOME],
        element: <App />,
        children: [
            {
                path: appRoutes[routesNames.CREATE_ORDER],
                element: <CreateOrderPagePage title={routesNames.CREATE_ORDER} />,
            },
            {
                path: appRoutes[routesNames.TRACK_ORDER],
                element: <TrackOrderPagePage title={routesNames.TRACK_ORDER}  />,
            },
        ],
    },
]);