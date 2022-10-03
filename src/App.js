import React from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/HomePage";

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
          <HomePage />
        </div>
      </div>
    </div>
  )
}

export default App;
