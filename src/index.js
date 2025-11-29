import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./providers/router/router";

import './index.css';

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found!");
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

