import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/games.css';

const Games = () => {
    const gridSize = 20; // Grid size (width & height)
    const initialSnake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
    ]; // Initial snake
    const initialDirection = 'RIGHT'; // Initial movement direction
    const initialFood = { x: 8, y: 8 }; // Initial food position

    const [snake, setSnake] = useState(initialSnake);
    const [direction, setDirection] = useState(initialDirection);
    const [food, setFood] = useState(initialFood);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false); // New state for controlling the start of the game

    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0); // Fetch high score from localStorage

    const handleKeyPress = useCallback((e) => {
        if (gameOver || !gameStarted) return; // Disable controls when game is over or not started

        // Prevent default browser behavior (e.g., scrolling or cursor movement)
        e.preventDefault();

        if (e.key === 'ArrowUp' && direction !== 'DOWN') {
            setDirection('UP');
        } else if (e.key === 'ArrowDown' && direction !== 'UP') {
            setDirection('DOWN');
        } else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
            setDirection('LEFT');
        } else if (e.key === 'ArrowRight' && direction !== 'LEFT') {
            setDirection('RIGHT');
        }
    }, [direction, gameOver, gameStarted]);

    const handleTouchDirection = (newDirection) => {
        if (gameOver || !gameStarted) return;
    
        if (newDirection === 'UP' && direction !== 'DOWN') {
            setDirection('UP');
        } else if (newDirection === 'DOWN' && direction !== 'UP') {
            setDirection('DOWN');
        } else if (newDirection === 'LEFT' && direction !== 'RIGHT') {
            setDirection('LEFT');
        } else if (newDirection === 'RIGHT' && direction !== 'LEFT') {
            setDirection('RIGHT');
        }
    };
    
    // Move the snake
    const moveSnake = useCallback(() => {
        if (gameOver || !gameStarted) return;

        const head = snake[0];
        let newHead;

        // Determine the new head position based on the current direction
        if (direction === 'UP') {
            newHead = { x: head.x, y: head.y - 1 };
        } else if (direction === 'DOWN') {
            newHead = { x: head.x, y: head.y + 1 };
        } else if (direction === 'LEFT') {
            newHead = { x: head.x - 1, y: head.y };
        } else if (direction === 'RIGHT') {
            newHead = { x: head.x + 1, y: head.y };
        }

        // Check for collision with walls
        if (
            newHead.x < 0 ||
            newHead.x >= gridSize ||
            newHead.y < 0 ||
            newHead.y >= gridSize ||
            snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
            setGameOver(true);
            if (score > highScore) {
                setHighScore(score); // Update high score if new high score
                localStorage.setItem('highScore', score); // Save high score to localStorage
            }
            return;
        }

        const newSnake = [newHead, ...snake];

        // Check if the snake eats food
        if (newHead.x === food.x && newHead.y === food.y) {
            setScore(score + 1);
            setFood({
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            });
        } else {
            newSnake.pop(); // Remove the last segment (snake moves forward)
        }

        setSnake(newSnake);
    }, [snake, direction, food, gameOver, score, gameStarted, highScore]);

    // Start the game loop
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        const gameInterval = setInterval(moveSnake, 100); // Move every 100ms

        return () => {
            clearInterval(gameInterval);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress, moveSnake]);

    // Render the grid and snake
    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
                const isFood = food.x === x && food.y === y;
                grid.push(
                    <div
                        key={`${x}-${y}`}
                        className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white',
                            border: '1px solid #ddd',
                        }}
                    />
                );
            }
        }
        return grid;
    };

    // Restart the game
    const restartGame = () => {
        setSnake(initialSnake);
        setDirection(initialDirection);
        setFood(initialFood);
        setGameOver(false);
        setScore(0);
    };

    // Toggle pause and resume the game
    const handlePauseResume = () => {
        if (gameStarted && !gameOver) {
            setGameStarted(false); // Pause the game
        } else if (gameOver) {
            restartGame(); // Restart the game
            setGameStarted(true); // Start the game
        } else {
            setGameStarted(true); // Resume the game
        }
    };

    return (
        <div className='gameMainContainer'>
            <h1>Crazy Snake Game</h1>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 20px)`,
                    gridTemplateRows: `repeat(${gridSize}, 20px)`,
                    gap: '1px',
                    margin: '20px auto',
                    maxWidth: '420px',
                }}
            >
                {renderGrid()}
            </div>
            <div className='gameButonContainer'>
                {!gameStarted && !gameOver && (
                    <button className="btn btn-success" onClick={() => setGameStarted(true)}>Start Game</button>
                )}
                {gameStarted && !gameOver && (
                    <button className="btn btn-warning" onClick={handlePauseResume}>Pause</button>
                )}
                {gameOver && <button className="btn btn-info" onClick={restartGame}>Restart</button>}
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
                {gameOver && <p>Game Over! You hit the wall or yourself!</p>}
            </div>
            <div className='touchControls'>
    <button className="btn btn-primary" onClick={() => handleTouchDirection('UP')}>⬆️</button>
    <div>
        <button className="btn btn-primary" onClick={() => handleTouchDirection('LEFT')}>⬅️</button>
        <button className="btn btn-primary" onClick={() => handleTouchDirection('RIGHT')}>➡️</button>
    </div>
    <button className="btn btn-primary" onClick={() => handleTouchDirection('DOWN')}>⬇️</button>
</div>

        </div>
    );
};

export default Games;
