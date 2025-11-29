import React from "react";
import {Outlet} from "react-router-dom";

import {Navigation} from "../../components/Navigation/ui/Navigation";
import './App.css';

export function App() {
  return (
      <>
          <Navigation />
          <div className="main-container">
              <main>
                  <h1>Medical Drone Delivery</h1>
                  <Outlet />
              </main>
          </div>
      </>
  );
}
