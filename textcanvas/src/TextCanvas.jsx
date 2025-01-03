import { useRef, useEffect, useState } from "react";

const TextCanvas = ({
  texts = ["Hello World", "Welcome"],
  fontSize = 30,
  textcolor = "black",
  caretChar = "|",
  displayCaret = true,
}) => {
  const canvasRef = useRef(null);
  const caretRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const animationRef = useRef({ timeouts: [] });

  useEffect(() => {
    console.log(fontSize);
    const canvas = canvasRef.current;
    const caret = displayCaret ? caretRef.current : null;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.font = `${Math.floor(fontSize)}px Arial`;
    console.log(context.font);

    // Calculate maximum width needed for all texts
    const maxWidth = Math.max(
      200,
      ...texts.map((text) => context.measureText(text).width + text.length * 2)
    );
    setCanvasWidth(maxWidth);

    let currentTextIndex = 0;
    const timeouts = animationRef.current.timeouts;

    const animateText = () => {
      const currentText = texts[currentTextIndex];

      const typeText = () => {
        for (let i = 0; i <= currentText.length; i++) {
          const timeout = setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            const displayText = currentText.substring(0, i);
            context.fillText(displayText, 0, fontSize);

            // Update caret position directly
            if (displayCaret && caretRef.current) {
              const caretPosition = context.measureText(displayText).width;
              caret.style.left = `${caretPosition}px`;
            }
          }, i * 150);
          timeouts.push(timeout);
        }

        const pauseTimeout = setTimeout(() => {
          clearText();
        }, currentText.length * 150 + 1500);
        timeouts.push(pauseTimeout);
      };

      const clearText = () => {
        for (let i = currentText.length; i >= 0; i--) {
          const timeout = setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            const displayText = currentText.substring(0, i);
            context.fillText(displayText, 0, fontSize);

            // Update caret position directly
            if (displayCaret && caretRef.current) {
              const caretPosition = context.measureText(displayText).width;
              caret.style.left = `${caretPosition}px`;
            }
          }, (currentText.length - i) * 150);
          timeouts.push(timeout);
        }

        const nextTimeout = setTimeout(() => {
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          animateText();
        }, currentText.length * 150 + 500);
        timeouts.push(nextTimeout);
      };

      typeText();
    };

    animateText();

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      animationRef.current.timeouts = [];
    };
  }, [
    texts,
    fontSize,
    textcolor,
    displayCaret,
    caretChar,
    caretRef,
    canvasRef,
    canvasWidth,
  ]);

  return (
    <div style={{ display: "flex", position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={fontSize + 10}
        style={{
          position: "relative",
        }}
      />

      {displayCaret && (
        <>
          <span
            ref={caretRef}
            style={{
              fontSize: `${fontSize}px`,
              color: textcolor,
              fontWeight: "bold",
              position: "absolute",
              left: "0",
              animation: "blink 1s step-end infinite",
            }}
          >
            {caretChar}
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
          </style>
        </>
      )}
    </div>
  );
};

export default TextCanvas;
