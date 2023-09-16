import React from "react";
import './styles/ProgressBar2.css';

function getBarColor(completed, delayed) {
  if (completed - delayed <= 10) {
    return "green";
  } else if (completed - delayed <= 30) {
    return "yellow";
  } else {
    return "red";
  }
}

const ProgressBar2 = ({ liberado, atraso }) => {
  return (
    <div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{
            width: `${liberado != null ? liberado : 0}%`,
          }}
        >
          <span>{liberado ? `${liberado}%` : "0%"}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{
            width: `${atraso ? atraso : 0}%`,
            backgroundColor: getBarColor(liberado, atraso),
          }}
        >
          <span>{atraso ? `${atraso}%` : "0%"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar2;
