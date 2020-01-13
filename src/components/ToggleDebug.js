import React from "react";
import Toggle from "react-toggle";
function ToogleDebug({debugMode, setDebugMode}) {
  return (
    <>
      <div className="container">
        <label style={{ color: "white" }}>
          Mode selected: {debugMode ? "debug" : "random"}
        </label>
      </div>
      <Toggle
        icons={{
          checked: (
            <span className="toogle-emoji" role="img" aria-label="debug">
              🔧
            </span>
          ),
          unchecked: (
            <span className="toogle-emoji" role="img" aria-label="random">
              🎲
            </span>
          )
        }}
        onChange={() => setDebugMode(!debugMode)}
      />
    </>
  );
}

export default ToogleDebug;