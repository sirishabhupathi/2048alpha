const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const newGameBtn = document.getElementById('new-game-btn');
let grid = [];
let score = 0;

function createGrid() {
    gridContainer.innerHTML = '';
    grid = [];
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        gridContainer.appendChild(tile);
        grid.push(0);
    }
    addRandomTile();
    addRandomTile();
    updateDisplay();
}

function addRandomTile() {
    const emptyTiles = grid.reduce((acc, val, index) => val === 0 ? [...acc, index] : acc, []);
    if (emptyTiles.length > 0) {
        const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        grid[randomIndex] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateDisplay() {
    const tiles = gridContainer.children;
    for (let i = 0; i < 16; i++) {
        tiles[i].textContent = grid[i] === 0 ? '' : grid[i];
        tiles[i].className = 'tile'; // Reset classes
        if (grid[i] !== 0) {
          tiles[i].classList.add(`tile-${grid[i]}`);
        }
    }
    scoreDisplay.textContent = score;
}

function move(direction) {
    let changed = false;
    let newGrid = [...grid];

    for (let x = 0; x < 4; x++) {
        let row = [];
        for (let y = 0; y < 4; y++) {
            let index;
          switch (direction) {
            case 'up': index = x + y * 4; break;
            case 'down': index = x + (3 - y) * 4; break;
            case 'left': index = y + x * 4; break;
            case 'right': index = (3 - y) + x * 4; break;
          }
            if (grid[index] !== 0) {
                row.push(grid[index]);
            }
        }

        let newRow = [];
        for (let i = 0; i < row.length; i++) {
            if (i < row.length - 1 && row[i] === row[i + 1]) {
                newRow.push(row[i] * 2);
                score += row[i] * 2;
                i++;
                changed = true;
            } else {
                newRow.push(row[i]);
            }
        }

        while (newRow.length < 4) {
            newRow.push(0);
        }

        for (let y = 0; y < 4; y++) {
          let index;
          switch (direction) {
            case 'up': index = x + y * 4; break;
            case 'down': index = x + (3 - y) * 4; break;
            case 'left': index = y + x * 4; break;
            case 'right': index = (3 - y) + x * 4; break;
          }
          if (newGrid[index] !== newRow[y]) {
            changed = true;
          }
            newGrid[index] = newRow[y];
        }
    }

    grid = newGrid;

    if (changed) {
        addRandomTile();
        updateDisplay();
    }
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': move('up'); break;
        case 'ArrowDown': move('down'); break;
        case 'ArrowLeft': move('left'); break;
        case 'ArrowRight': move('right'); break;
    }
});

newGameBtn.addEventListener('click', createGrid);

createGrid();