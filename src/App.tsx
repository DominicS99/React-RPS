import React from 'react';
import './App.css';

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

function getRandomMove(): Move {
  const idx = Math.floor(Math.random() * MOVES.length);
  return MOVES[idx];
}

function App() {
  const [computerMove, setComputerMove] = React.useState(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const;

  if (!playerMove) {
    return (
      <div style={containerStyle}>
        <button onClick={() => setPlayerMove("rock")}>Rock</button>
        <button onClick={() => setPlayerMove("paper")}>Paper</button>
        <button onClick={() => setPlayerMove("scissors")}>Scissors</button>
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <span>Computer Move: {computerMove}</span>
        <span>Player Move: {playerMove}</span>
        <button onClick={() => {setPlayerMove(null); setComputerMove(getRandomMove())}}>New Game</button>
      </div>
    );
  }
}

export default App;


function id<T>(x: T): T {
  return x;
}

function stringify<T>(x: T): string {
  return String(x);
}

function returnSecond<T, U>(x: T, y: U): U[] {
  return [y, y, y];
}