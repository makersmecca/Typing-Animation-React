import { useRef, useEffect, useState } from "react";

const TextCanvas = ({
  texts = ["Hello"],
  fontSize = 30,
  textcolor = "black",
  caretChar = "|",
  displayCaret = true,
  speeds = {
    type: 150,
    pause: 1500,
    clear: 150,
    delay: 500,
  },
}) => {
  const canvasRef = useRef(null);
  const caretRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const animationState = useRef({
    timeouts: [],
    currentTextIndex: 0,
    isAnimating: false,
  });

  const [isTyping, setIsTyping] = useState(false);

  // Helper function to clear all timeouts
  const clearAllTimeouts = () => {
    animationState.current.timeouts.forEach((timeout) => clearTimeout(timeout));
    animationState.current.timeouts = [];
  };

  useEffect(() => {
    // console.log(fontSize);
    const canvas = canvasRef.current;
    const caret = displayCaret ? caretRef.current : null;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.font = `${Math.floor(fontSize)}px Arial`;
    // console.log(context.font);

    // Calculate maximum width needed for all texts
    const maxWidth = Math.max(
      200,
      ...texts.map((text) => context.measureText(text).width + text.length)
    );
    setCanvasWidth(maxWidth);

    const animateText = () => {
      clearAllTimeouts();
      const currentText = texts[animationState.current.currentTextIndex];

      const typeText = () => {
        for (let i = 0; i <= currentText.length; i++) {
          const timeout = setTimeout(() => {
            setIsTyping(true);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            const displayText = currentText.substring(0, i);
            context.fillText(displayText, 0, fontSize);

            // Update caret position directly
            if (displayCaret && caretRef.current) {
              const caretPosition = context.measureText(displayText).width;
              caret.style.left = `${caretPosition}px`;
            }
          }, i * speeds.type);
          animationState.current.timeouts.push(timeout);
        }

        const pauseTimeout = setTimeout(() => {
          setIsTyping(false);
          clearText();
        }, currentText.length * speeds.type + speeds.pause);
        animationState.current.timeouts.push(pauseTimeout);
      };

      const clearText = () => {
        for (let i = currentText.length; i >= 0; i--) {
          const timeout = setTimeout(() => {
            setIsTyping(true);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = textcolor;
            const displayText = currentText.substring(0, i);
            context.fillText(displayText, 0, fontSize);

            // Update caret position directly
            if (displayCaret && caretRef.current) {
              const caretPosition = context.measureText(displayText).width;
              caret.style.left = `${caretPosition}px`;
            }
          }, (currentText.length - i) * speeds.clear);
          animationState.current.timeouts.push(timeout);
        }

        const nextTimeout = setTimeout(() => {
          setIsTyping(false);
          animationState.current.currentTextIndex =
            (animationState.current.currentTextIndex + 1) % texts.length;
          animateText();
        }, currentText.length * speeds.clear + speeds.delay);
        animationState.current.timeouts.push(nextTimeout);
      };

      typeText();
    };

    if (!animationState.current.isAnimating) {
      animationState.current.isAnimating = true;
      animateText();
    }

    // Cleanup function
    return () => {
      clearAllTimeouts();
      animationState.current.isAnimating = false;
      animationState.current.currentTextIndex = 0;
    };
  }, [texts, fontSize, textcolor, caretChar, canvasWidth]);

  return (
    <span
      style={{
        display: "flex",
        position: "relative",
        width: canvasWidth,
      }}
    >
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
              fontSize: `${fontSize + 1}px`,
              color: textcolor,
              fontWeight: "bold",
              position: "absolute",
              left: "0",
              animation: `${isTyping && "blink 1s step-end infinite"}`,
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
    </span>
  );
};

export default TextCanvas;
