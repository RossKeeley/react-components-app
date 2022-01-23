import './App.css';
import React, {useState, useRef, useEffect} from "react";

const App = () => {
  const sliderRef = useRef(null);
  const headerRef = useRef(null);
  const [colorTheme, setColorTheme] = useState("255,156,0");
  const [sliderPosition, setSliderPosition] = useState(0);
  const [windowWidth, setWindowWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const gradient = [
    [
        0,
        [255,156,0]
        // Add another colour for text to stand out from background
    ],
    [
        28,
        [255,2,0]
    ],
    [
        72,
        [166,7,128]
    ],
    [
        100,
        [5,112,251]
    ]
  ];

  let sliderWidth = windowWidth * 0.3;

  const slide = (e) => {
        setSliderPosition(e.target.value);
        let colorRange = []
        gradient.some(( item, index ) => {
            if(sliderPosition <= item[0]) {
                colorRange = [index-1,index]
                return true;
            }
            // return true;
        });
        
        //Get the two closest colors
        let firstcolor = gradient[colorRange[0]][1];
        let secondcolor = gradient[colorRange[1]][1];
        
        //Calculate ratio between the two closest colors
        let firstcolor_x = sliderWidth*(gradient[colorRange[0]][0]/100);
        let secondcolor_x = sliderWidth*(gradient[colorRange[1]][0]/100)-firstcolor_x;
        let slider_x = sliderWidth*(sliderPosition/100)-firstcolor_x;
        let ratio = slider_x/secondcolor_x
        let result = pickHex( secondcolor, firstcolor, ratio );
        setColorTheme(result);
    };



  const pickHex = (color1, color2, weight) => {
      let p = weight;
      let w = p * 2 - 1;
      let w1 = (w/1+1) / 2;
      let w2 = 1 - w1;
      let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
          Math.round(color1[1] * w1 + color2[1] * w2),
          Math.round(color1[2] * w1 + color2[2] * w2)];
      return rgb;
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="header__title">"I'm going to make them an app they can't refuse"</h1>
        <p className="header__sub-title">- the Appfather</p>
      </div>
      <input 
        type="range" 
        ref={sliderRef} 
        id="slider" 
        className="theme-color-slider" 
        min="0" 
        max="100"
        defaultValue={0}
        onChange={(e) => {
          slide(e);
        }}
      />
      <div className="header-change-theme" ref={headerRef} style={{backgroundColor: "rgb(" + colorTheme + ")"}}>
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
    </div>
  );
}

export default App;
