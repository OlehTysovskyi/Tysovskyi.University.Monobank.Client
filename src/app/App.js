import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {

  return (
    <div className="body-container">
      <main className="main-container">
        <Outlet />
      </main>

      <Navbar />
    </div>
  );
}

export default App;
