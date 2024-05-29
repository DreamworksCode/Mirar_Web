"use client";
import React, { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef();
  // const [previousAudioData, setPreviousAudioData] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");

    const numLines = 5;
    const lineSpacing = 5;
    const lineWidth = 35;
    const borderRadius = 18;
    let animationFrameId;

    const draw = () => {
      if(audioData[0]%4===0){
        
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < numLines && i < audioData.length; i++) {
        if (audioData[i] % 3 === 0) {
          audioData[i] = audioData[i] * 1.25;
        }

        const barHeight = (audioData[i] / 300) * height;

        // Calculate positions based on whether the index is even or odd
        const lineCenter =
          i % 2 === 0
            ? (width / numLines) * i + (width / numLines - lineSpacing) / 2
            : width -
              (width / numLines) * (i + 1) +
              (width / numLines - lineSpacing) / 2;
        const startIndex = lineCenter - lineWidth / 2;
        const endIndex = lineCenter + lineWidth / 2;
        const centerX = width;
        const moveFactor = 0.09;
        const movedStartIndex =
          startIndex + (centerX - startIndex) * moveFactor;
        const movedEndIndex = endIndex + (centerX - endIndex) * moveFactor;

        context.fillStyle = "white";
        context.beginPath();
        context.moveTo(movedStartIndex + borderRadius, height - barHeight);
        context.lineTo(movedEndIndex - borderRadius, height - barHeight);
        context.quadraticCurveTo(
          movedEndIndex,
          height - barHeight,
          movedEndIndex,
          height - barHeight + borderRadius
        );
        context.lineTo(movedEndIndex, height - borderRadius);
        context.quadraticCurveTo(
          movedEndIndex,
          height,
          movedEndIndex - borderRadius,
          height
        );
        context.lineTo(movedStartIndex + borderRadius, height);
        context.quadraticCurveTo(
          movedStartIndex,
          height,
          movedStartIndex,
          height - borderRadius
        );
        context.lineTo(
          movedStartIndex,
          height - barHeight + borderRadius
        );
        context.quadraticCurveTo(
          movedStartIndex,
          height - barHeight,
          movedStartIndex + borderRadius,
          height - barHeight
        );
        context.fill();
      }

      // Store the current audioData as the previous state
      // setPreviousAudioData([...audioData]);
        
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup function
    return () => cancelAnimationFrame(animationFrameId);
  }, [audioData]);

  return (
    <canvas
      style={{ height: "100%", width: "100%", margin: "auto" }}
      ref={canvasRef}
    />
  );
};

export default AudioVisualizer;