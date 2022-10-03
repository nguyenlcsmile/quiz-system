import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <div className="sidebar">

        </div>
        <div className="app">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App;
