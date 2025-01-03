// import "./App.css";
import TextCanvas from "./TextCanvas";
function App() {
  return (
    <TextCanvas
      texts={["Typing Text", "Is being animated"]}
      textcolor="white"
      displayCaret={0}
      fontSize={20}
    />
  );
}

export default App;
