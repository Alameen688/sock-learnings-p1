import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { TweenMax, Power3 } from "gsap";

function App() {
  let app = useRef(null);

  let circleYellow = useRef(null);
  let circleRed = useRef(null);
  let circleBlue = useRef(null);

  const [selectedCircle, setSelectedCircle] = useState(false);

  const handleCircleClick = () => {
    if (selectedCircle) {
      TweenMax.to(circleRed, 0.8, {
        width: 75,
        height: 75,
        ease: Power3.easeOut
      });
    } else {
      TweenMax.to(circleRed, 0.8, {
        width: 200,
        height: 200,
        ease: Power3.easeOut
      });
    }
    setSelectedCircle(!selectedCircle);
  };

  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: "visible" } });
    TweenMax.staggerFrom(
      [circleYellow, circleRed, circleBlue],
      0.8,
      {
        opacity: 0,
        x: 40,
        ease: Power3.easeOut
      },
      0.2
    );
  }, []);
  return (
    <div
      ref={el => {
        app = el;
      }}
      className="App"
    >
      <header className="App-header">
        <div className="circle-container">
          <div
            ref={el => {
              circleYellow = el;
            }}
            className="circle yellow"
          ></div>
          <div
            ref={el => {
              circleRed = el;
            }}
            className="circle red"
            onClick={handleCircleClick}
          ></div>
          <div
            ref={el => {
              circleBlue = el;
            }}
            className="circle blue"
          ></div>
        </div>
      </header>
    </div>
  );
}

export default App;
