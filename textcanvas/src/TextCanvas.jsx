import { useRef, useEffect, useState } from "react";

const TextCanvas = ({
  texts = ["Hello World", "Welcome"],
  fontSize = 30,
  textcolor = "black",
}) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(200);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Arial`;

    // Calculate maximum width needed for all texts
    const maxWidth = Math.max(
      200,
      ...texts.map((text) => context.measureText(text).width + text.length * 2)
    );
    setCanvasWidth(maxWidth);

    const timeouts = [];
    let currentTextIndex = 0;

    const animateText = () => {
      const currentText = texts[currentTextIndex];

      // Type out the text
      const typeText = () => {
        for (let i = 0; i <= currentText.length; i++) {
          const timeout = setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            context.fillText(currentText.substring(0, i), 0, 50);
          }, i * 150);
          timeouts.push(timeout);
        }

        // After typing, wait a bit before clearing
        const pauseTimeout = setTimeout(() => {
          clearText();
        }, currentText.length * 150 + 1000);
        timeouts.push(pauseTimeout);
      };

      // Clear the text character by character
      const clearText = () => {
        for (let i = currentText.length; i >= 0; i--) {
          const timeout = setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            context.fillText(currentText.substring(0, i), 0, 50);
          }, (currentText.length - i) * 150);
          timeouts.push(timeout);
        }

        // After clearing, move to next text
        const nextTimeout = setTimeout(() => {
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          animateText();
        }, currentText.length * 150 + 500);
        timeouts.push(nextTimeout);
      };

      typeText();
    };

    animateText(); //call function to start typing

    // Cleanup function
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [texts, fontSize]);

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <canvas ref={canvasRef} width={canvasWidth} height={100} style={{}} />
      {/* <span
        style={{
          fontSize: "25px",
          color: textcolor,
          position: "absolute",
          marginLeft: "",
          animation: "blink 1s step-end infinite",
        }}
      >
        |
      </span>
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style> */}
    </div>
  );
};

export default TextCanvas;
