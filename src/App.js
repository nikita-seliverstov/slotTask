import React from "react";
import "./App.css";
import Img3xBAR from "./images/3xBAR.png";
import Img2xBAR from "./images/2xBAR.png";
import ImgBAR from "./images/BAR.png";
import Img7 from "./images/7.png";
import ImgCherry from "./images/Cherry.png";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container-fluid">
        <div className="row">
          <div className="col">
            
            <Reel />
            </div>
            <div className="col">
            <Reel />
            </div>
            <div className="col">
            <Reel />
            </div>
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
        <div class="carousel__cell"><img className="slotImages"  src={Img3xBAR}></img></div>
        <div class="carousel__cell"><img className="slotImages" src={ImgBAR}></img></div>
        <div class="carousel__cell"><img className="slotImages" src={Img2xBAR}></img></div>
        <div class="carousel__cell"><img className="slotImages" src={Img7}></img></div>
        <div class="carousel__cell"><img className="slotImages" src={ImgCherry}></img></div>
      </div>
    </div>
  );
}
export default App;
