const gridContainer = document.getElementById('grid-container');
const root = document.documentElement;

let gridContainerSize = getComputedStyle(root).getPropertyValue('--grid-size');
gridContainerSize = parseInt(gridContainerSize.slice(0, gridContainerSize.length - 2));
console.log(gridContainerSize)

function generateGrid (gridSize) {
    const blockSize = gridContainerSize / gridSize;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.height = blockSize + 'px';
        gridBlock.style.width = blockSize + 'px';
        gridBlock.classList.add('grid-block');
        gridContainer.appendChild(gridBlock);
    }
}

generateGrid(16);