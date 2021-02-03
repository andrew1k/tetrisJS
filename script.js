// Begin with variables and constants
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// box of the grid in field width: 320 / 10 = 32
const grid = 32;

// array with tetramino sequence. Empty at the beginning
let tetraminoSequence = [];

// using a 2D array, we monitor what is in each cell of the playing field
// field size 10x20 
var playfield = [];

// array with empty sells
for (let row = -2; row < 20; row++) {
    playfield[row] = row;

    for (let col = 0; col < 10; col++) {
        playfield[col][row] = 0;
    }
}

// make form for each cell
const tetraminos = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ]
};

// colors
const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};

// counter 
let count = 0;
// current cell in game
let tetromino = getNextTetromino();
// to force stop game
let rAF = null;  
// point of the end, at the beginning = false 
let gameOver = false;