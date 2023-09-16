const gridContainer = document.getElementById('grid');
const root = document.documentElement;
const sizeRange = document.getElementById('size'); 
const colorPicker = document.getElementById('color');
const toggleGridButton = document.getElementById('toggle-grid');
const rainbowModeButton = document.getElementById('toggle-rainbow');

let mouseDown = false;
let selectedColor = getComputedStyle(root).getPropertyValue('--selected-color');
let gridToggled = true;
let rainbowMode = false;

let gridContainerSize = getComputedStyle(root).getPropertyValue('--grid-size');
gridContainerSize = parseInt(gridContainerSize.slice(0, gridContainerSize.length - 2));

function generateGrid (gridSize) {
    const blockSize = gridContainerSize / gridSize;
    for (let i = 0; i < gridSize * gridSize; i++) {
        createTile(blockSize);
    }
}

function randomNumber (n) {
    return Math.floor(Math.random() * n);
}

function createTile (size) {
    const gridBlock = document.createElement('div');
    gridBlock.style.height = size + 'px';
    gridBlock.style.width = size + 'px';
    gridBlock.classList.add('grid-block');

    if (gridToggled) {
        gridBlock.classList.add('show-grid');
    }    
    gridContainer.appendChild(gridBlock);
}

function draw (event) {
    if (!mouseDown) return;
    if (rainbowMode) {
        selectedColor = `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`;
    } else {
        selectedColor = colorPicker.value;
    }
    event.target.style.setProperty('--tile-color', selectedColor);
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

function changeCurrentColor (event) {
    const color = event.target.value;
    selectedColor = color;

    root.style.setProperty('--selected-color', color);
}

function toggleGrid () {
    if (gridToggled) {
        toggleGridButton.textContent = 'Show Grid';
        gridToggled = false;
    } else {
        toggleGridButton.textContent = 'Hide Grid';
        gridToggled = true;
    }
    toggleGridButton.classList.toggle('toggled');
    const gridTiles = gridContainer.querySelectorAll('div');
    gridTiles.forEach(tile => {
        tile.classList.toggle('show-grid');
    }); 
}

function toggleRainbowMode () {
    if (rainbowMode) {
        rainbowMode = false;
    } else {
        rainbowMode = true;
    }   
    rainbowModeButton.classList.toggle('toggled');
}

gridContainer.addEventListener('mousedown', (event) => {
    mouseDown = true
    draw(event)
});
gridContainer.addEventListener('mouseup', () => mouseDown = false);
gridContainer.addEventListener('mouseover', draw);
sizeRange.addEventListener('change', changeGridSize)
colorPicker.addEventListener('change', changeCurrentColor);
toggleGridButton.addEventListener('click', toggleGrid);
rainbowModeButton.addEventListener('click', toggleRainbowMode);

generateGrid(sizeRange.value);