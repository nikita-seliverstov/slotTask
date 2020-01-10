import Img3xBAR from "./images/3xBAR.png";
import Img2xBAR from "./images/2xBAR.png";
import ImgBAR from "./images/BAR.png";
import Img7 from "./images/7.png";
import ImgCherry from "./images/Cherry.png";
export const symbols = [
    { name: "3xBAR", img: Img3xBAR},
    { name: "BAR", img: ImgBAR },
    { name: "2xBAR", img: Img2xBAR},
    { name: "7", img: Img7 },
    { name: "Cherry", img: ImgCherry}
  ];

  export const combinations = {
    sameSymbolsAnyLine: {
      "3xBAR": 50,
      BAR: 10,
      "2xBAR": 20,
      "7": 150
    },
    sameSymbolsLineDependent: {
      cherry: {
        top: 2000,
        center: 1000,
        bottom: 4000
      }
    },
    notSameSymbolsAnyLine: {
      cherryAnd7: 75,
      anyBar: 5
    }
  }