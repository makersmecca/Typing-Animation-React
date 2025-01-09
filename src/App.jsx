import TextCanvas from "./TextCanvas";
function App() {
  return (
    <TextCanvas
      texts={["Hello..!!", "Welcome", "To", "Typing Animation"]}
      textcolor="#B6FFFA"
      fontSize={50}
      displayCaret={1}
      caretChar={"|"}
      speeds={{
        type: 150, //sets typing speed in milliseconds
        pause: 2000, //sets the duration of pause after a string is typed
        clear: 150, //sets the speed at which the text is cleared
        delay: 1000, //sets the pause duration between one text cleared and the next text being typed
      }}
    />
  );
}

export default App;
