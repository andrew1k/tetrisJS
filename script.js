// Begin with variables and constants
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// box of the grid in field width: 320 / 10 = 32
const grid = 32;

// array with tetramino sequence. Empty at the beginning
let tetrominoSequence = [];

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
const tetrominos = {
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


// Функция возвращает случайное число в заданном диапазоне
// https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(getRandomInt(1,6)); 

// создаём последовательность фигур, которая появится в игре
function generateSequence() {
    // тут — сами фигуры
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        // случайным образом находим любую из них
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        // помещаем выбранную фигуру в игровой массив с последовательностями
        tetrominoSequence.push(name);
    }
}



function getNextTetromino() {
    // if there is no - generate
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }


    // берём первую фигуру из массива
    const name = tetrominoSequence.pop();
    // сразу создаём матрицу, с которой мы отрисуем фигуру
    const matrix = tetrominos[name];

    // I и O стартуют с середины, остальные — чуть левее
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    // I начинает с 21 строки (смещение -1), а все остальные — со строки 22 (смещение -2)
    const row = name === 'I' ? -1 : -2;

    // вот что возвращает функция 
    return {
        name: name, // название фигуры (L, O, и т.д.)
        matrix: matrix, // матрица с фигурой
        row: row, // текущая строка (фигуры стартуют за видимой областью холста)
        col: col // текущий столбец
    };
}

