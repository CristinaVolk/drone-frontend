import {createBrowserRouter, redirect} from "react-router-dom";

import {appRoutes, routesNames} from "../../shared/constants/router";
import {CreateOrderPagePage} from "../../pages/CreateOrderPage/ui/CreateOrderPage";
import {TrackOrderPagePage} from "../../pages/TrackOrderPage/ui/TrackOrderPage";
import {App} from "../../app/ui/App";
import {HomePage} from "../../pages/HomePage/ui/HomePage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: appRoutes[routesNames.CREATE_ORDER], // "create-order"
                element: <CreateOrderPagePage title={routesNames.CREATE_ORDER} />,
            },
            {
                path: appRoutes[routesNames.TRACK_ORDER], // "track-order/:id"
                element: <TrackOrderPagePage title={routesNames.TRACK_ORDER} />,
            },
        ],
    },
    {
        path: appRoutes[routesNames.HOME], // "/home"
        loader: () => redirect("/"),
    },
]);
