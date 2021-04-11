// Getting the elements from the DOM
const container = document.querySelector(".grid-container");
const sizeInput = document.getElementById('size');
const eraserButton = document.getElementById('eraser');
const changeBtn = document.getElementById('change');

// Tools 
let eraser = false;

// Grid blocks
let gridBlocks = [];

// Generating the grid based on the specified size in px
function createGrid(size) {
	if (gridBlocks.length > 0) {
		for (let block = 0; block < gridBlocks.length; block++) {
			container.removeChild(gridBlocks[block]);
		}

		gridBlocks = [];
	}

	container.style['grid-template-columns'] = `repeat(${size}, 1fr)`;

	for (let i = 0; i < (size * size); i++) {
		const gridBlock = document.createElement('div');
		gridBlock.style.width = `${480 / size}`;
		gridBlock.style.height = `${480 / size}`;
		gridBlock.style.border = '1px solid rgba(0, 0, 0, 0.3)';
		container.appendChild(gridBlock);

		gridBlocks.push(gridBlock);
	}

	checkForClick();

}

// Check for valid size
function checkSize(size) {
	if (typeof size !== 'number' || size <= 0 || size > 60) {
		size = Math.floor(Math.random() * 60);
		sizeInput.value = `${size}`;
	}
	createGrid(size);
}

// Initial size when reloading the page
let size = sizeInput.value;
checkSize(size);

// Placing pixels in the grid
function checkForClick() {
	for (let i = 0; i < gridBlocks.length; i++) {
		gridBlocks[i].addEventListener('click', () => {
			if (!eraser) {
				gridBlocks[i].classList.toggle('blockColor');
			} else {
				gridBlocks[i].classList.remove('blockColor');
				gridBlocks[i].classList.toggle('blockTransparent');
			}
		});
	}
}

// Activate the eraser button
eraserButton.addEventListener('click', () => {
	if (eraser) {
		eraser = false;
		eraserButton.classList.remove('btn-clicked');
	} else {
		eraser = true;
		eraserButton.classList.toggle('btn-clicked');
	}
});

// Check for size changes
changeBtn.addEventListener('click', () => {
	let size = parseInt(sizeInput.value);
	checkSize(size);
});
