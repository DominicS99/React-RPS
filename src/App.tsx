import React from 'react';
import './App.css';

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

const PLAYTYPES = ["player", "computer", "draw"] as const;
type PlayType = (typeof PLAYTYPES)[number];

type GameResults = { wins: number; losses: number; draws: number };

function getRandomMove(): Move {
  const idx = Math.floor(Math.random() * MOVES.length);
  return MOVES[idx];
}

function getWinner(playerMove: Move, computerMove: Move): PlayType {
  const playIdx = MOVES.indexOf(playerMove);
  const compIdx = MOVES.indexOf(computerMove);
  
  if (playIdx === compIdx) return "draw";
  return playIdx === (compIdx + 1) % MOVES.length ? "player" : "computer";
}

function App() {
  const [computerMove, setComputerMove] = React.useState(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [gameResults, setGameResults] = React.useState<GameResults>({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const;

  const handleRound = (move: Move) => {
    setPlayerMove(move);
    const winner = getWinner(move, computerMove);
    if (winner === "player") {
      setGameResults((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (winner === "computer") {
      setGameResults((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setGameResults((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  if (!playerMove) {
    return (
      <div style={containerStyle}>
        <span>Select a move</span>
        <button onClick={() => handleRound("rock")}>Rock</button>
        <button onClick={() => handleRound("paper")}>Paper</button>
        <button onClick={() => handleRound("scissors")}>Scissors</button>
      </div>
    );
  } else {

    const winnerText = {
      player: "Player wins!",
      computer: "Computer wins!",
      draw: "Draw!",
    }[getWinner(playerMove, computerMove)];

    return (
      <div style={containerStyle}>
        <span>Computer Move: {computerMove}</span>
        <span>Player Move: {playerMove}</span>
        <span>{winnerText}</span>
        <span>Wins: {gameResults.wins} || Losses: {gameResults.losses} || Draws: {gameResults.draws}</span>
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