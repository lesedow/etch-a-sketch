const gridContainer = document.getElementById('grid-container');
const root = document.documentElement;
const sizeRange = document.getElementById('size'); 

let mouseDown = false;

let gridContainerSize = getComputedStyle(root).getPropertyValue('--grid-size');
gridContainerSize = parseInt(gridContainerSize.slice(0, gridContainerSize.length - 2));

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

function draw (event) {
    if (!mouseDown) return;
    event.target.style.backgroundColor = 'black'
}

function isGridBlock (target) {
    return target.classList.contains('grid-block');
}

function updateSizeRangeLabel (event) {
    const sizeRangeValue = event.target.value;
    const sizeRangeLabel = event.target.previousElementSibling;
    sizeRangeLabel.textContent = `Size: ${sizeRangeValue} x ${sizeRangeValue}`
}

function removeCurrentGridTiles() {
    const gridTiles = gridContainer.querySelectorAll('div');
    gridTiles.forEach(tile => {
        gridContainer.removeChild(tile);
    }); 
}

function changeGridSize (event) {
    updateSizeRangeLabel(event);
    removeCurrentGridTiles();
    const sizeRangeValue = event.target.value;

    generateGrid(sizeRangeValue);
}

gridContainer.addEventListener('mousedown', (event) => {
    mouseDown = true
    draw(event)
});
gridContainer.addEventListener('mouseup', () => mouseDown = false);
gridContainer.addEventListener('mouseover', draw);
sizeRange.addEventListener('change', changeGridSize)


generateGrid(16);