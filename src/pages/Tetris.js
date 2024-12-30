import React, { useState, useEffect, useCallback } from "react";
import "../assets/css/tetrus.css";
import {
  initializeGame,
  movePiece,
  rotatePiece,
  dropPiece,  // Import the dropPiece function
  lockPiece,
  generateNextPiece,
  clearLines,
  softDrop,
  hardDrop,
  canMovePiece,
  spawnNewPiece,
} from "../assets/js/gameLogic.js";  // Importing necessary game functions

// Create the empty grid
const createEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
};

const Tetris = () => {
  const [grid, setGrid] = useState(createEmptyGrid(20, 10));  // Grid of 20x10
  const [nextBlocks, setNextBlocks] = useState(createEmptyGrid(4, 4)); // Preview grid for the next block
  const [swapBlock, setSwapBlock] = useState(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);

  const [gameState, setGameState] = useState({
    activePiece: null,
    grid,
    nextPiece: null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.activePiece) {
        const updatedState = movePiece(gameState.activePiece, 'down', gameState.grid);
        setGameState(updatedState);
        setGrid(updatedState.grid);
      }
    }, 1000); // Adjust speed with the level
  
    return () => clearInterval(interval);
  }, [gameState, level]);
  
  // Handle key presses
  const handleKeyDown = useCallback((event) => {
    if (!gameState.activePiece) return;
    event.preventDefault();
    let updatedState;
    switch (event.key) {
      case "ArrowLeft":
        updatedState = movePiece(gameState.activePiece, "left", gameState.grid);
        break;
      case "ArrowRight":
        updatedState = movePiece(gameState.activePiece, "right", gameState.grid);
        break;
      case "ArrowDown":
        updatedState = dropPiece(gameState.activePiece, gameState.grid);
        break;
      case "ArrowUp":
        updatedState = rotatePiece(gameState.activePiece, gameState.grid);
        break;
      case " ":
        updatedState = dropPiece(gameState.activePiece, gameState.grid, true);  // Hard drop
        break;
      case "Control":
        if (swapBlock) {
          setGameState((prevState) => ({
            ...prevState,
            activePiece: swapBlock,
            swapBlock: gameState.activePiece,
          }));
          setSwapBlock(gameState.activePiece);
        } else {
          setSwapBlock(gameState.activePiece);
        }
        return;
      default:
        return;
    }
  
    if (updatedState) {
      setGameState(updatedState);
      setGrid(updatedState.grid);  // Update the grid with the new state
    }
  }, [gameState, swapBlock]);
  

 // Game loop: Move down every second
useEffect(() => {
  const interval = setInterval(() => {
    if (gameState.activePiece) {
      const updatedState = dropPiece(gameState.activePiece, gameState.grid);  // Soft drop
      if (updatedState) {
        setGameState(updatedState);
        setGrid(updatedState.grid);
      }
    }
  }, 1000 - level * 100);

  setGameInterval(interval);
  return () => clearInterval(interval);
}, [gameState, level]);

  // Check for lines and game over
  useEffect(() => {
    const { clearedLines, updatedGrid, gameOver } = clearLines(grid);

    if (clearedLines > 0) {
      setScore((prevScore) => prevScore + clearedLines * 100);
      setLines((prevLines) => prevLines + clearedLines);
      setCombo((prevCombo) => prevCombo + 1);

      if (lines % 10 === 0) {
        setLevel((prevLevel) => prevLevel + 1);
      }

      setGrid(updatedGrid);
    }

    if (gameOver) {
      clearInterval(gameInterval);
      alert("Game Over!");
      resetGame();
    }
  }, [grid, lines, gameInterval]);

  // Reset the game
  const resetGame = () => {
    setGrid(createEmptyGrid(20, 10));
    setNextBlocks(createEmptyGrid(4, 4));
    setSwapBlock(null);
    setScore(0);
    setLines(0);
    setLevel(1);
    setCombo(0);
    setGameState({ activePiece: null, grid, nextPiece: null });
  };

  const renderGrid = (grid) => {
    return (
      <div className="grid">
        {grid.flat().map((cell, index) => {
          const isFilled = cell === 1; // Cell is filled if its value is 1
          return (
            <div
              key={index}
              className={`cell ${isFilled ? "filled" : ""}`}
            ></div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div
      id="tetris-container"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ outline: "none" }}
    >
      {/* Game Board */}
      <div id="game-board">{renderGrid(grid, "game-grid")}</div>

      {/* Sidebar */}
      <div id="sidebar">
        {/* Next Block */}
        <div className="sidebar-section">
          <h3>Next</h3>
          {renderGrid(nextBlocks, "next-block")}
        </div>

        {/* Score, Lines, Level, Combo */}
        <div className="sidebar-section stats">
          <p>Score: <span>{score}</span></p>
          <p>Lines: <span>{lines}</span></p>
          <p>Level: <span>{level}</span></p>
          <p>Combo: <span>{combo}</span></p>
        </div>

        {/* Swap Block */}
        <div className="sidebar-section">
          <h3>Swap</h3>
          {swapBlock
            ? renderGrid(swapBlock.shape, "swap-block")
            : renderGrid(createEmptyGrid(4, 4), "swap-block")}
        </div>

        {/* Controls */}
        <div className="controls">
          <h3>Controls</h3>
          <p>Left/Right Arrow: Move Left/Right</p>
          <p>Up Arrow: Rotate Clockwise</p>
          <p>Z: Rotate Counter-Clockwise</p>
          <p>Down Arrow: Soft Drop</p>
          <p>Space: Hard Drop</p>
          <p>Control: Swap</p>
        </div>
      </div>
    </div>
  );
};

export default Tetris;
