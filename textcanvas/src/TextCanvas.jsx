import { useRef, useEffect, useState } from "react";

const TextCanvas = ({ text = "Hello World", fontSize = 30 }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(200); // Default width
  const [character, setCharacter] = useState([]);
  const [typeStatus, setTypeStatus] = useState(false);

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
        setCharacter((prev) => [...prev, char]);
        currentX += context.measureText(char).width + 2;
        if (index === text.length - 1) {
          setTypeStatus(true);
        }
      }, index * 150);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [text, fontSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard clause
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px Arial`;
    context.fillStyle = "white";

    let currentX = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    character.forEach((ch, index) => {
      const timeout = setTimeout(() => {
        context.fillText(character.join(""), currentX, 50);
        currentX += context.measureText(character).width + 2;
        setCharacter((prevChars) => prevChars.filter((chr) => chr !== ch));
      }, index * 150);
    });
  }, [typeStatus, text]);

  return <canvas ref={canvasRef} width={canvasWidth} height={100} />;
};

export default TextCanvas;
