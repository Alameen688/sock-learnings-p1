import "reset-css";
import "./App.scss";
import leftArrow from "./assets/arrow-left.svg";
import rightArrow from "./assets/arrow-right.svg";
import React, { useEffect, useRef, useState } from "react";
import { TweenLite, Power3 } from "gsap";

const testimonials = [
  {
    name: "Julia Cameron",
    title: "Creative Director, VISA",
    image: `${require("./assets/image3.jpg")}`,
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already."
  },
  {
    name: "Mark Jacobs",
    title: "Tech Lead, Google",
    image: `${require("./assets/image.jpg")}`,
    quote:
      "The rebranding has really helped our business. Definitely worth the investment."
  },
  {
    name: "Lisa Bearings",
    title: "Brand Coordinator, Facebook",
    image: `${require("./assets/image2.jpg")}`,
    quote:
      "The service was excellent. Absolutely wonderful! A complete redesign did it for us."
  }
];

function App() {
  const IMAGE_WIDTH = 340;
  let imageList = useRef(null);
  let testimonialList = useRef(null);

  const [state, setState] = useState({
    isActive: 0
  });

  useEffect(() => {
    TweenLite.to(testimonialList.children[0], 0, { opacity: 1 });
  }, []);

  const slideLeft = (index, multiplied = 1, duration = 1) => {
    TweenLite.to(imageList.children[index], duration, {
      x: -IMAGE_WIDTH * multiplied,
      ease: Power3.easeOut
    });
  };

  const slideRight = (index, multiplied = 1, duration = 1) => {
    TweenLite.to(imageList.children[index], duration, {
      x: IMAGE_WIDTH * multiplied,
      ease: Power3.easeOut
    });
  };

  const scale = (index, duration = 1) => {
    TweenLite.from(imageList.children[index], duration, {
      scale: 1.2,
      ease: Power3.easeOut
    });
  };

  const fadeOut = (index, duration = 1) => {
    TweenLite.to(testimonialList.children[index], duration, {
      opacity: 0
    });
  };
  const fadeIn = (index, duration = 1) => {
    TweenLite.to(testimonialList.children[index], duration, {
      opacity: 1,
      delay: 1
    });
  };

  const handlePrevSlide = () => {
    if (state.isActive > 0) {
      for (let i = state.isActive + 1; i > 0; i--) {
        console.log("loop start", i);
        console.log(state.isActive);
        console.log("ans", 1 - state.isActive);
        slideRight(i, 1 - state.isActive || 1);
        console.log("loop end");
      }
      // slideRight(state.isActive, 0);
      // slideRight(state.isActive - 1, 0);

      // slideRight(state.isActive, -1);
      // slideRight(state.isActive - 1, -1);

      // slideRight(state.isActive - 1, 0);
      // slideRight(state.isActive - 2, 0);
      scale(state.isActive - 1);

      // fadeOut(state.isActive);
      // fadeIn(state.isActive + 1);

      setState(prevState => ({
        isActive: prevState.isActive - 1
      }));
    } else {
      setState({
        isActive: imageList.children.length - 1
      });
    }
  };

  const handleNextSlide = () => {
    if (state.isActive < imageList.children.length - 1) {
      for (let i = state.isActive; i < imageList.children.length; i++) {
        slideLeft(i, state.isActive + 1);
      }
      scale(state.isActive + 1);

      fadeOut(state.isActive);
      fadeIn(state.isActive + 1);

      setState(prevState => ({
        isActive: prevState.isActive + 1
      }));
    } else {
      setState({
        isActive: 0
      });
    }
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div onClick={handlePrevSlide} className="arrows left">
          <span>
            <img src={leftArrow} alt="arrow left" />
          </span>
        </div>

        <div className="inner">
          <div className="t-image">
            <ul ref={el => (imageList = el)}>
              {testimonials.map((testimonial, i) => (
                <li className={state.isActive == i ? "active" : null}>
                  <img src={testimonial.image} alt={testimonial.name} />
                </li>
              ))}
            </ul>
          </div>
          <div className="t-content">
            <ul ref={el => (testimonialList = el)}>
              {testimonials.map((testimonial, i) => (
                <li className={state.isActive == i ? "active" : null}>
                  <div className="content-inner">
                    <p className="quote">{testimonial.quote}</p>
                    <h3 className="name">{testimonial.name}</h3>
                    <h4 className="title">{testimonial.title}</h4>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div onClick={handleNextSlide} className="arrows right">
          <span>
            <img src={rightArrow} alt="arrow right" />
          </span>
        </div>
      </div>
    </section>
  );
}

export default App;
