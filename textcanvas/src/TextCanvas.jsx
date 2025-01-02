import { useRef, useEffect, useState } from "react";

const TextCanvas = ({ text = "Hello World", fontSize = 30 }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(200); // Default width

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard clause

    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;

    // Calculate and set canvas width
    const textWidth = Math.max(
      200,
      context.measureText(text).width + text.length * 2
    );
    setCanvasWidth(textWidth);

    const timeouts = [];

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px Arial`;
    context.fillStyle = "white";

    let currentX = 0;

    text.split("").forEach((char, index) => {
      const timeout = setTimeout(() => {
        context.fillText(char, currentX, 50);
        currentX += context.measureText(char).width + 2;
      }, index * 150);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [text, fontSize]);

  return <canvas ref={canvasRef} width={canvasWidth} height={100} />;
};

export default TextCanvas;
