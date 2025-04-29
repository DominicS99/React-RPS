import React from 'react';
import './App.css';

const MOVES = ["rock", "paper", "scissors"] as const;
type Move = (typeof MOVES)[number];

const PLAYTYPES = ["player", "computer", "draw"] as const;
type PlayType = (typeof PLAYTYPES)[number];

type GameResults = { wins: number; losses: number; draws: number };

type Props = {
  filename: string;
}
const IconImage: React.FC<Props> = ({ filename }) => {
  const src = `https://morgen.s3.us-west-1.amazonaws.com/icon_${filename}.png`;
  return <img alt={filename} src={src} width="50" height="50"/>;
}

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
        <button className="wiggle-on-hover" onClick={() => handleRound("rock")}>
          <IconImage filename="rock"/>
        </button>
        <button className="wiggle-on-hover" onClick={() => handleRound("paper")}>
          <IconImage filename="paper"/>
        </button>
        <button className="wiggle-on-hover" onClick={() => handleRound("scissors")}>
          <IconImage filename="scissors"/>
        </button>
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
        <span>Computer Move: <IconImage filename={computerMove}/></span>
        <span>Player Move: <IconImage filename={playerMove}/></span>
        <span>{winnerText}</span>
        <span>Wins: {gameResults.wins} || Losses: {gameResults.losses} || Draws: {gameResults.draws}</span>
        <button className="wiggle-on-hover" onClick={() => {setPlayerMove(null); setComputerMove(getRandomMove())}}>New Game</button>
      </div>
    );
  }
}

export default App;

/*
function id<T>(x: T): T {
  return x;
}

function stringify<T>(x: T): string {
  return String(x);
}

function returnSecond<T, U>(x: T, y: U): U[] {
  return [y, y, y];
}
*/