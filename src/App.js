import "./App.css";
import React, { useEffect, useRef } from "react";
import CoverImage from "./images/celebration.jpg";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { TimelineLite, Power2 } from "gsap";

function App() {
  let image = useRef(null);
  let container = useRef(null);
  const imageReveal = CSSRulePlugin.getRule(".image-container::after");

  const tl = new TimelineLite();

  useEffect(() => {
    tl.to(container, 1, { css: { visibility: "visible" } })
      .to(imageReveal, 1.4, { width: "0%", ease: Power2.easeOut })
      .from(image, 1.4, { scale: 1.8, ease: Power2.easeInOut, delay: -1.6 });
  });

  return (
    <section className="main">
      <div ref={el => (container = el)} className="container">
        <div className="image-container">
          <img
            ref={el => (image = el)}
            className="coverImage"
            src={CoverImage}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
