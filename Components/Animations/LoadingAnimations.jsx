import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";

 

const LoadingAnimation = () => {
  const [animationState, setAnimationState] = useState({
    isStopped: false,
    isPaused: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle animation to create a blinking effect
      setAnimationState((prevState) => ({
        isStopped: !prevState.isStopped,
        isPaused: false,
      }));
    }, 1000);

    return () => clearInterval(interval);
  },[]);

 

  return (
    <div className="animationLoader">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: require("./loading.json"),
        }}
        height={150}
        width={150}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
      />
    </div>
  );
};

export default LoadingAnimation;
