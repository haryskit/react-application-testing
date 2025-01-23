import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/css/games.css';

const Games = () => {
    const gridSize = 20; // Grid size
    const initialSnake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
    ];
    const initialDirection = 'RIGHT';
    const initialFood = { x: 8, y: 8 };

    const [snake, setSnake] = useState(initialSnake);
    const [direction, setDirection] = useState(initialDirection);
    const [food, setFood] = useState(initialFood);
    const [blockedBlocks, setBlockedBlocks] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);

    const [difficulty, setDifficulty] = useState('Easy'); // Difficulty state
    const [speed, setSpeed] = useState(150); // Snake speed

    // Adjust speed and blocks based on difficulty
    useEffect(() => {
        if (difficulty === 'Easy') {
            setSpeed(150);
            setBlockedBlocks([]);
        } else if (difficulty === 'Moderate') {
            setSpeed(100);
            setBlockedBlocks([]);
        } else if (difficulty === 'Hard') {
            setSpeed(150);
            generateBlockedBlocks(); // Generate initial blocked blocks
        }
    }, [difficulty]);

    const generateBlockedBlocks = useCallback(() => {
        const newBlockedBlocks = [];
        for (let i = 0; i < 5; i++) {
            newBlockedBlocks.push({
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            });
        }
        setBlockedBlocks(newBlockedBlocks);
    }, [gridSize]);

    const handleKeyPress = useCallback((e) => {
        if (gameOver || !gameStarted) return;
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

    const moveSnake = useCallback(() => {
        if (gameOver || !gameStarted) return;

        const head = snake[0];
        let newHead;

        if (direction === 'UP') newHead = { x: head.x, y: head.y - 1 };
        if (direction === 'DOWN') newHead = { x: head.x, y: head.y + 1 };
        if (direction === 'LEFT') newHead = { x: head.x - 1, y: head.y };
        if (direction === 'RIGHT') newHead = { x: head.x + 1, y: head.y };

        if (
            newHead.x < 0 ||
            newHead.x >= gridSize ||
            newHead.y < 0 ||
            newHead.y >= gridSize ||
            snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y) ||
            blockedBlocks.some((block) => block.x === newHead.x && block.y === newHead.y) // Check collision with blocked blocks
        ) {
            setGameOver(true);
            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('highScore', score);
            }
            return;
        }

        const newSnake = [newHead, ...snake];

        if (newHead.x === food.x && newHead.y === food.y) {
            setScore(score + 1);
            setFood({
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize),
            });

            if (difficulty === 'Hard') {
                generateBlockedBlocks(); // Regenerate blocked blocks on eating food
            }
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, direction, food, blockedBlocks, gameOver, score, gameStarted, highScore, difficulty, generateBlockedBlocks]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        const gameInterval = setInterval(moveSnake, speed);

        return () => {
            clearInterval(gameInterval);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress, moveSnake, speed]);

    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
                const isFood = food.x === x && food.y === y;
                const isBlocked = blockedBlocks.some((block) => block.x === x && block.y === y);
                grid.push(
                    <div
                        key={`${x}-${y}`}
                        className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''} ${isBlocked ? 'blocked' : ''}`}
                        style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: isSnake
                                ? 'green'
                                : isFood
                                    ? 'red'
                                    : isBlocked
                                        ? 'black'
                                        : 'white',
                            border: '1px solid #ddd',
                        }}
                    />
                );
            }
        }
        return grid;
    };

    const restartGame = () => {
        setSnake(initialSnake);
        setDirection(initialDirection);
        setFood(initialFood);
        setGameOver(false);
        setScore(0);
        setBlockedBlocks([]);
    };

    return (
        <div className="gameMainContainer">
            <h1>Crazy Snake Game</h1>
            <div className='gameButtonContainer'>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="Easy"
                        checked={difficulty === 'Easy'}
                        onChange={() => setDifficulty('Easy')}
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="Moderate"
                        checked={difficulty === 'Moderate'}
                        onChange={() => setDifficulty('Moderate')}
                    />
                    Moderate
                </label>
                <label>
                    <input
                        type="radio"
                        name="difficulty"
                        value="Hard"
                        checked={difficulty === 'Hard'}
                        onChange={() => setDifficulty('Hard')}
                    />
                    Hard
                </label>
            </div>
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
            <div className="gameButtonContainer">
                <p>Score: {score}</p>

                {!gameStarted && !gameOver && (
                    <button className="btn btn-success" onClick={() => setGameStarted(true)}>
                        Start Game
                    </button>
                )}
                {gameStarted && !gameOver && (
                    <button className="btn btn-warning" onClick={() => setGameStarted(false)}>
                        Pause
                    </button>
                )}
                {gameOver && (
                    <button className="btn btn-info" onClick={restartGame}>
                        Restart
                    </button>
                )}

                <p>High Score: {highScore}</p>

                {gameOver && <p>Game Over! You hit a wall, yourself, or a blocked block!</p>}
            </div>
        </div>
    );
};

export default Games;
