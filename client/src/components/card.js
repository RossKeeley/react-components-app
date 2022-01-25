import React from "react";
import "../styles/card.css";

const Card = ({ colorTheme }) => {
  return (
    <div className="card">
      <div className="card__header"   style={{backgroundColor: "rgb(" + colorTheme + ")"}} >
        <h4 className="card__body">card title</h4>
      </div>
      <div className="card__body">
        body
      </div>
    </div>
  );
};

export default Card;