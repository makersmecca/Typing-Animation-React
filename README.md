# Typing-Animation-React
A simple React Typing animation component that takes in certain props for customization.

Sample usage:

```
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

```
