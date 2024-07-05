import React, { useState } from "react";

function Input(props) {
  const [value, setValue] = useState(0);

  return (
    <>
      <input type="number" onChange={(e) => setValue(e.target.value)} />
      {props.renderKelvin({ value: Number(value) + 273 })}
      {props.renderFahrenheit({ value: (value * 9) / 5 + 32 })}
    </>
  );
}

function App() {
  const renderKelvin = ({value}) => <div>The value is {value}</div>;
  const renderFahrenheit = ({value}) => <div>The value is {value}</div>;

  return (
    <div className="App">
      <Input renderKelvin={renderKelvin} renderFahrenheit={renderFahrenheit} />
    </div>
  );
}

export default App;
