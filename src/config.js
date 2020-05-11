import Img3xBAR from './images/3xBAR.png';
import Img2xBAR from './images/2xBAR.png';
import ImgBAR from './images/BAR.png';
import Img7 from './images/7.png';
import ImgCherry from './images/Cherry.png';
export const symbols = [
  { name: '3xBAR', img: Img3xBAR },
  { name: 'BAR', img: ImgBAR },
  { name: '2xBAR', img: Img2xBAR },
  { name: '7', img: Img7 },
  { name: 'Cherry', img: ImgCherry }
];

export const combinations = {
  sameSymbolsAnyLine: {
    '3xBAR': 50,
    BAR: 10,
    '2xBAR': 20,
    '7': 150
  },
  sameSymbolsLineDependent: {
    Cherry: {
      top: 2000,
      center: 1000,
      bottom: 4000
    }
  },
  notSameSymbolsAnyLine: {
    CherryAnd7: {
      contains: ['Cherry', '7'],
      containsID: [4, 3],
      award: 75
    },
    BAR: {
      contains: ['3xBAR', 'BAR', '2xBAR'],
      containsID: [0, 1, 2],
      award: 5
    }
  }
};
export const pricePerSpin = 1;
export const balanceLimit = 5000;
export const degreesToPutNextSymbolToCenter = -360 / symbols.length;
