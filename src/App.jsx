// import "./App.css";
import TextCanvas from "./TextCanvas";
function App() {
  return (
    <TextCanvas
      texts={["Hi...", "Welcome", "To", "Typing Animation"]}
      textcolor="white"
      fontSize={20}
      displayCaret={1}
      caretChar={"|"}
      speeds={{
        type: 500,
        pause: 2000,
        clear: 500,
        delay: 800,
      }}
    />
  );
}

export default App;
