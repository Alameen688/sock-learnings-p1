import "reset-css";
import "./App.scss";
import ArrowRight from "./assets/arrow-right.svg";
import ImgBoy from "./assets/boy.webp";
import ImgGirl from "./assets/girl.webp";
import React, { useEffect, useRef, useState } from "react";
import { TimelineLite, TweenMax, Power3 } from "gsap";

function App() {
  let app = useRef(null);
  let images = useRef(null);

  let contents = useRef(null);

  // DELAY ENTIRE TIMELINELITE by .8, making sure the page is visible and ready by then
  const tl = new TimelineLite({ delay: 0.8 });

  useEffect(() => {
    const girlImage = images.firstElementChild;
    const boyImage = images.lastElementChild;

    const headlineFirst = contents.children[0].children[0];
    const headlineSecond = headlineFirst.nextSibling;
    const headlineThird = headlineSecond.nextSibling;

    const contentP = contents.children[1];
    const contentButton = contents.children[2];

    //show entire page section
    TweenMax.to(app, 0, { visibility: "visible" });

    // IMAGES ANIMATION Timeline
    // delay of .2 in a timeline overides how long it should (default is after the prev anim is done) wait before it proceeds to the next anim in the timeline
    // all timelines with the same tag of "set 1" will start at the same time
    tl.from(
      girlImage,
      1.2,
      {
        y: 1200,
        ease: Power3.easeOut
      },
      "set 1"
    )
      .from(
        girlImage.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      )
      .from(
        boyImage,
        1.2,
        {
          y: 1200,
          ease: Power3.easeOut
        },
        0.2
      )
      .from(
        boyImage.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      );

    //CONTENT ANIMATION Timeline
    tl.staggerFrom(
      [headlineFirst.children, headlineSecond.children, headlineThird.children],
      1,
      {
        y: 44,
        ease: Power3.easeIn,
        delay: 0.8
      },
      0.15,
      "set 1"
    )
      .from(contentP, 1, { y: 20, opacity: 0, ease: Power3.easeInOut }, 1.4)
      .from(
        contentButton,
        1,
        { y: 20, opacity: 0, ease: Power3.easeInOut },
        1.6
      );
  }, [tl]);

  return (
    <section
      ref={el => {
        app = el;
      }}
      className="hero"
    >
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div
              ref={el => {
                contents = el;
              }}
              className="hero-content-inner"
            >
              <h1>
                <span className="hero-content-line">
                  <span className="hero-content-line-inner">
                    Relieving the burden
                  </span>
                </span>
                <span className="hero-content-line">
                  <span className="hero-content-line-inner">
                    of disease caused
                  </span>
                </span>
                <span className="hero-content-line">
                  <span className="hero-content-line-inner">
                    by behaviours.
                  </span>
                </span>
              </h1>
              <p>
                Better treats serious cardiometabolic diseases to transform
                lives and reduce healthcare ustilisation through the use of
                digital therapeutics
              </p>
              <div className="btn-row">
                <button className="explore-button">
                  explore
                  <span className="arrow-icon">
                    <img src={ArrowRight} alt="arrow" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-images">
            <div
              ref={el => {
                images = el;
              }}
              className="hero-images-inner"
            >
              <div className="hero-image girl">
                <img src={ImgGirl} alt="girl image" />
              </div>
              <div className="hero-image boy">
                <img src={ImgBoy} alt="boy image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
