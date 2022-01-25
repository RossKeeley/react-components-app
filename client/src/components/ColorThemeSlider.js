import '../styles/main.css';
import React, {useState, useEffect} from "react";

const ColorThemeSlider = ({ setColorTheme }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [windowWidth, setWindowWidth]   = useState(window.innerWidth);
  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  }

  let gradient = [
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

  const pickHex = (color1, color2, weight) => {
      let p = weight;
      let w = p * 2 - 1;
      let w1 = (w/1+1) / 2;
      let w2 = 1 - w1;
      let rgb = [
          Math.round(color1[0] * w1 + color2[0] * w2),
          Math.round(color1[1] * w1 + color2[1] * w2),
          Math.round(color1[2] * w1 + color2[2] * w2)
      ];
      return rgb;
  }

  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  useEffect(() => {
    console.log(sliderPosition);
    // getSliderPosition(e.target.value);
    let colorRange = []
    gradient.some(( item, index ) => {
        if(sliderPosition <= item[0] && index > 0) {
            colorRange = [index-1,index]
            console.log(sliderPosition);
            return true;
          }
        return null
    });
    
    //Get the two closest colors
    let firstcolor = gradient[colorRange[0]][1];
    let secondcolor = gradient[colorRange[1]][1];
    
    //Calculate ratio between the two closest colors
    let firstColorRatio = sliderWidth*(gradient[colorRange[0]][0]/100);
    let secondColorRatio = sliderWidth*(gradient[colorRange[1]][0]/100)-firstColorRatio;
    let slider = sliderWidth*(sliderPosition/100)-firstColorRatio;
    let ratio = slider/secondColorRatio
    let result = pickHex( secondcolor, firstcolor, ratio );
    setColorTheme(result);
  }, [sliderPosition, setSliderPosition, setColorTheme, sliderWidth]);

  return (
    <div className="color-theme-slider">
      <input 
        type="range" 
        id="slider" 
        className="theme-color-slider" 
        min="0" 
        max="100"
        defaultValue={0}
        onChange={(e) => {
          setSliderPosition(e.target.value);
        }}
      />
    </div>
  );
}

export default ColorThemeSlider;
