import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Square = () => {
  const innerSquareRef = useRef(null);
  const outerSquareRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });

    tl.to([innerSquareRef.current, outerSquareRef.current], {
      duration: 1,
      rotation: 150,
      opacity: 1,
      scaleX: 1.5,
      scaleY: 1.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="outer--div">
      <div className="outerSquare" ref={outerSquareRef}>
        <div className="innerSquare" ref={innerSquareRef} />
      </div>
    </div>
  );
};

export default Square;
