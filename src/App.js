import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="col">
            <Reel />
          </div>
        </div>
      </header>
    </div>
  );
}
function Reel() {
  return (
    <div class="scene">
      <div class="carousel">
        <div class="carousel__cell">1</div>
        <div class="carousel__cell">2</div>
        <div class="carousel__cell">3</div>
        <div class="carousel__cell">4</div>
        <div class="carousel__cell">5</div>
  
      </div>
    </div>
  );
}
export default App;
