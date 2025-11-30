import React from "react";
import {Outlet} from "react-router-dom";

import {Footer} from "../../components/Footer/ui/Footer";
import {Navigation} from "../../components/Navigation/ui/Navigation";

import './App.css';

export function App() {
  return (
      <div className="wrapper">
          <Navigation />
          <main className="main-container">
              <h1>Medical Drone Delivery</h1>
              <Outlet />
          </main>
          <Footer />
      </div>
  );
}
