import React, { useState } from 'react';
import './App.css';

const cafeAuLait = 4; // 4 seconds to make
const cappuccino = 10; // 10 seconds to make
const expresso = 15; // 15 seconds to make

var ticketQueue = [];
var coffeeCounter = 0;

function App() {
  // state to display in app
  const [ticketCount, setTicketCount] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);

  // Promise to handle timing of drinks
  const timer = (seconds) =>
    new Promise((res) => setTimeout(res, seconds * 1000));

  // Order drink, adding to ticket queue
  const orderDrink = (item) => {
    ticketQueue.push(item);
    setTicketCount(ticketQueue.length);
    makingDrink(item);
  };

  // making the dirnk, waiting given amount of time
  const makingDrink = async (drinkLength) => {
    switch (drinkLength) {
      case cafeAuLait:
        await timer(cafeAuLait);
        break;
      case cappuccino:
        await timer(cappuccino);
        break;
      case expresso:
        await timer(expresso);
        break;
    }
    drinkReady();
  };

  // After drink made, remove from queue and move to coffee counter
  const drinkReady = () => {
    ticketQueue.shift();
    setTicketCount(ticketQueue.length);
    coffeeCounter++;
    setCoffeeCount(coffeeCounter);
    pickUp();
  };

  // Pickup drink every 3 seconds
  const pickUp = async () => {
    await timer(3);
    coffeeCounter--;
    setCoffeeCount(coffeeCounter);
  };

  return (
    <div className="App">
      <div className="count">Select a drink below to order.</div>
      <div className="wrapper">
        <button onClick={() => orderDrink(cafeAuLait)}>Cafe Au Lait</button>
        <button onClick={() => orderDrink(cappuccino)}>Cappuccino</button>
        <button onClick={() => orderDrink(expresso)}>Expresso</button>
      </div>
      <div className="count">
        There are {ticketCount} drinks being prepared.
      </div>
      <div className="count">
        There are {coffeeCount} drinks ready for pickup.
      </div>
    </div>
  );
}

export default App;
