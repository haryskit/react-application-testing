export const initializeGame = () => {
    const grid = Array.from({ length: 20 }, () => Array(10).fill(0)); // Initialize 20x10 grid
    const initialPiece = generateNextPiece();  // Initialize the first piece
    const nextPiece = generateNextPiece(); // Next piece preview
    initialPiece.x = 4; // Set x coordinate to 4 (centered on the grid)
    initialPiece.y = 0; // Set y coordinate to 0 (top of the grid)
    return { initialGrid: grid, initialPiece, nextPiece };
  };
  

// Generate a random piece
export const generateNextPiece = () => {
    const pieces = [
        { shape: [[1, 1], [1, 1]] }, // O block (Square)
        { shape: [[1, 1, 1, 1]] },   // I block (Line)
        { shape: [[0, 1, 0], [1, 1, 1]] }, // T block
        { shape: [[1, 0, 0], [1, 1, 1]] }, // L block
        { shape: [[0, 0, 1], [1, 1, 1]] }, // J block
        { shape: [[1, 1, 0], [0, 1, 1]] }, // S block
        { shape: [[0, 1, 1], [1, 1, 0]] }, // Z block
    ];
    return pieces[Math.floor(Math.random() * pieces.length)];
};
export const canMovePiece = (x, y, shape, grid) => {
    if (!shape) {
      console.error('Piece shape is invalid:', shape);
      return false;
    }
  
    return shape.every((row, dy) =>
      row.every((cell, dx) => {
        if (!cell) return true; // Empty cells are always valid
        const newX = x + dx;
        const newY = y + dy;
        return (
          newY >= 0 && newY < grid.length &&
          newX >= 0 && newX < grid[0].length &&
          grid[newY][newX] === 0
        );
      })
    );
  };
  // Function to move the active piece in a given direction
export const movePiece = (activePiece, direction, grid) => {
    let newX = activePiece.x;
    let newY = activePiece.y;
  
    switch (direction) {
      case 'left':
        newX -= 1;
        break;
      case 'right':
        newX += 1;
        break;
      case 'down':
        newY += 1;
        break;
      default:
        break;
    }
  
    // Ensure the new position is within bounds and the move is valid
    if (canMovePiece(newX, newY, activePiece.shape, grid)) {
      activePiece.x = newX;
      activePiece.y = newY;
    }
  
    return { activePiece, grid };
  };
    
  // Function to rotate the active piece
export const rotatePiece = (activePiece, grid) => {
    const newShape = activePiece.shape[0].map((_, i) =>
      activePiece.shape.map((row) => row[i]).reverse()
    );
  
    if (canMovePiece(activePiece.x, activePiece.y, newShape, grid)) {
      activePiece.shape = newShape;
    }
    
    return { activePiece, grid };
  };
  

// Function for soft drop (move down one step)
export const softDrop = (activePiece, grid) => {
    return movePiece(activePiece, 'down', grid);
};

// Function for hard drop (move down until it locks)
export const hardDrop = (activePiece, grid) => {
    while (canMovePiece(activePiece.x, activePiece.y + 1, activePiece.shape, grid)) {
        activePiece.y++;
    }
    grid = lockPiece(activePiece, grid); // Lock the piece at its final position
    const { clearedLines, updatedGrid } = clearLines(grid);
    return { activePiece, grid: updatedGrid, clearedLines };
};
// Lock the piece in place on the grid
export const lockPiece = (activePiece, grid) => {
    activePiece.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell) {
          const xPos = activePiece.x + dx;
          const yPos = activePiece.y + dy;
          if (yPos >= 0 && yPos < grid.length && xPos >= 0 && xPos < grid[0].length) {
            grid[yPos][xPos] = cell; // Lock the cell into the grid
          }
        }
      });
    });
  
    return grid;
  };
  
  

// Function to clear lines after a piece is locked
export const clearLines = (grid) => {
    let clearedLines = 0;
    let updatedGrid = grid.filter((row) => row.some((cell) => cell === 0)); // Remove filled lines
    clearedLines = grid.length - updatedGrid.length;
    updatedGrid = [...Array(clearedLines).fill(Array(10).fill(0)), ...updatedGrid];
    return { clearedLines, updatedGrid };
};

// Function to spawn a new piece
export const spawnNewPiece = (grid) => {
    const newPiece = generateNextPiece();
    if (!canMovePiece(newPiece.x, newPiece.y, newPiece.shape, grid)) {
        return { gameOver: true }; // Game Over if piece can't spawn
    }
    return { activePiece: newPiece, grid };
};

  // Function for soft and hard drop (move down one step or all the way down)
  export const dropPiece = (activePiece, grid, hardDrop = false) => {
    if (!activePiece || !activePiece.shape) {
      console.error('Invalid activePiece:', activePiece);
      return { activePiece, grid };
    }
  
    if (hardDrop) {
      while (canMovePiece(activePiece.x, activePiece.y + 1, activePiece.shape, grid)) {
        activePiece.y++;
      }
      grid = lockPiece(activePiece, grid); // Lock the piece at its final position
      const { clearedLines, updatedGrid } = clearLines(grid);
      return { activePiece, grid: updatedGrid, clearedLines };
    }
  
    if (canMovePiece(activePiece.x, activePiece.y + 1, activePiece.shape, grid)) {
      activePiece.y++; // Move the piece down one step
    } else {
      grid = lockPiece(activePiece, grid); // Lock the piece
      const { clearedLines, updatedGrid } = clearLines(grid);
      return { activePiece, grid: updatedGrid, clearedLines };
    }
  
    return { activePiece, grid };
  };
