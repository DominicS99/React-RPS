import React from 'react';
import './App.css';

type Move = "rock" | "paper" | "scissors";
const MOVES: readonly Move[] = ["rock", "paper", "scissors"];

function getRandomMove() : Move {
  let x = Math.random() * MOVES.length;
  return MOVES[Math.floor(x)];
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const;
  
  return (
    <div style={containerStyle}>
      <span>Computer Move: {computerMove}</span>
    </div>
  );
}

export default App;
