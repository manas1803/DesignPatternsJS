export function withAddedCode(Component) {
  return (props) => {
    return (
      <>
        <h1>The header for the code.</h1>
        <Component {...props} />
      </>
    );
  };
}
