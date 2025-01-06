# Typing-Animation-React
A simple React Typing animation component that takes in certain props for customization.

## Sample usage:
Navigate to "src/Components"
Copy the "TextCanvas.jsx" component to your src folder. Then use the component in your components like this

```
import TextCanvas from "./TextCanvas";
function FunctionalComponent() {
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
export default FunctionalComponent;

```
