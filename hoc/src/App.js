import {withAddedCode} from "./withAddedCode";

const Text = () => <p>Hello world!</p>;
const StyledText = withAddedCode(Text);

function App() {
  return (
    <StyledText />
  );
}

export default App;
