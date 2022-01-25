import React, { useState } from "react";
import "./styles/main.css";
import ColorThemeSlider from "./components/ColorThemeSlider.js";
import Card from "./components/card";

const App = () => {
  const [colorTheme, setColorTheme] = useState("255,156,0");

  return (
    <div className="app">
      <div className="header">
        <h1 className="header__title">"I'm going to make them an app they can't refuse"</h1>
        <p className="header__sub-title">- the Appfather</p>
      </div>
      <ColorThemeSlider setColorTheme={setColorTheme} />
      <div className="header-change-theme" style={{backgroundColor: "rgb(" + colorTheme + ")"}}>
        <div className="header-change-theme__logo">
          <h2>Logo</h2>
        </div>
        <div className="header-change-theme__title">
          <h1>header</h1>
        </div>
        <ul className="header-change-theme__nav-list">
          <li className="nav-list__list-item">nav item 1</li>
          <li className="nav-list__list-item">nav item 2</li>
          <li className="nav-list__list-item">nav item 3</li>
        </ul>
      </div>
      <div className="card__container">
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
        <Card colorTheme={colorTheme} />
      </div>
    </div>
  );
};

export default App;