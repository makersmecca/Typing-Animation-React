// import "./App.css";
import TextCanvas from "./TextCanvas";
function App() {
  return (
    <TextCanvas
      texts={["Hi...", "Hello...", "Hi There.."]}
      textcolor="white"
      fontSize={20}
      displayCaret={1}
      caretChar={"|"}
    />
  );
}

export default App;
