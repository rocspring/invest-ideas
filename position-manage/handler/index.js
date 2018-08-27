let list = require('../data/maotai_data.json');

let initAsset = 1000000;
let initPrice = 0;
let initAmount = 0;
let balance = 0;
let amount = 0;
let upRatio = 1.1;
let downRatio = 1.2;
let upPrecent = 0.05;
let downPrecent = 0.1;
let asset = 0;
let nowPrice = 0;
let lastPrice = 0;

list.forEach((item, index) => {
  let itemPrice = item.close;
   
  if (index === 0) {
    initAmount = amount = initAsset / itemPrice;
    initPrice = nowPrice = itemPrice;
    return;
  } 

  // status -1:down 0:steady 1:up
  let status = 0;
  if (itemPrice > nowPrice && itemPrice / nowPrice >= upRatio) {
    status = 1;
  }

  if (itemPrice < nowPrice && nowPrice / itemPrice  >= downRatio) {
    status = -1;
  }

  switch (status) {
    case -1:
      if (balance > 0) {
        if (balance >= amount * downPrecent * itemPrice) {
          balance -= amount * downPrecent * itemPrice;
          amount = amount * (1 + downPrecent);
        } else {
          amount += balance / itemPrice;
          balance = 0;
        }
        nowPrice = itemPrice;
        console.log(item.date + ': down');
        console.log('price:' + nowPrice);
        console.log('balance:' + balance);
        console.log('amount:' + amount);
      }
      break;
    case 1:
      amount = amount * (1 - upPrecent);
      balance += amount * upPrecent * itemPrice;
      nowPrice = itemPrice;
      console.log(item.date + ': up');
      console.log('price:' + nowPrice);
      console.log('balance:' + balance);
      console.log('amount:' + amount);
      break;
    default:
      break;
  }

  lastPrice = item.close;
});

console.log('initAmount:' + initAmount);
console.log('initPrice:' + initPrice);
console.log('noOpAsset:' + initAmount * lastPrice);
console.log('opAmount:' + amount);
console.log('balance:' + balance);
console.log('lastPrice:' + lastPrice);
console.log('opAsset:' + (amount * lastPrice + balance));