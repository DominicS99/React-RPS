import React from 'react';
import './App.css';

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

function getRandomMove() : Move {
  const idx = Math.floor(Math.random() * MOVES.length);
  return MOVES[idx];
}

function App() {
  const [computerMove, _setComputerMove] = React.useState<Move>(getRandomMove());

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
