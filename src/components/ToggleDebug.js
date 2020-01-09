import React from "react";
import Toggle from "react-toggle";
function ToogleDebug(props) {
  return (
    <>
      <div className="container">
        <label style={{ color: "white" }}>
          Mode selected: {props.debugMode ? "debug" : "random"}
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
        onChange={() => props.setDebugMode(!props.debugMode)}
      />
    </>
  );
}

export default ToogleDebug;