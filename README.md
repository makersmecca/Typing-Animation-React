# Typing-Animation-React

A simple React Typing animation component that takes in certain props for customization.

## Sample usage:

Navigate to "src/TextCanvas.jsx", and copy the "TextCanvas.jsx" component to your src folder. Then use the component in your components like this

```
import TextCanvas from "./TextCanvas";
function FunctionalComponent() {
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
export default FunctionalComponent;

```

## Contribute:

Feel free to create a new PR for updates or fixes. Note that all PR may not be merged.

## License:

Licenses under MIT License.

##

<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true"/>
