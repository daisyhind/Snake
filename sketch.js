// Daisy Hind
// Snake
// schoman3 on Freesound for eat_crunchy.mp3

// global variable called snake
let snake;
// global variable called grid so the snake can grow and move
let grid = 20;
let wallGrid = [];

let level = 1;

let levelS;

let food;
let canvasSize = 600;
let score;
let munch;

let highscore = 0;
let highscoreP;

let cellSize = canvasSize / grid;
let numberOfCells;

let mySelect;

let standby = true;
let playing;

function preload() {
  munch = loadSound("snake_munch.mp3");
}

function createWallGrid(level = 1) {
  wallGrid = [];
  numberOfCells = canvasSize / grid;

  if (level === 1) {
    for (let i = 0; i < numberOfCells; i++) {
      wallGrid.push([]);
      for (let j = 0; j < numberOfCells; j++) {
        let x = i * grid;
        let y = j * grid;
        // if (wallGrid[i].push(1)) {
        // } else {
        wallGrid[i].push(0);
        // }
      }
    }
  }

  if (level === 2) {
    for (let i = 0; i < numberOfCells; i++) {
      wallGrid.push([]);
      for (let j = 0; j < numberOfCells; j++) {
        console.log('updating wall grid?');
        let x = i * grid;
        let y = j * grid;
        if (
          (i >= 5 && i <= 11 && j === 15) ||
          (i >= 19 && i <= 25 && j === 15)
        ) {
          wallGrid[i].push(1);
        } else {
          wallGrid[i].push(0);
        }
      }
    }
  }

  if (level === 3) {
    for (let i = 0; i < numberOfCells; i++) {
      wallGrid.push([]);
      for (let j = 0; j < numberOfCells; j++) {
        let x = i * grid;
        let y = j * grid;
        if (
          (i >= 0 && i <= 9 && j === 0) ||
          (i >= 20 && i <= 29 && j === 0) ||
          (i >= 0 && i <= 9 && j === 29) ||
          (i >= 20 && i <= 29 && j === 29) ||
          (j >= 0 && j <= 9 && i === 0) ||
          (j >= 20 && j <= 29 && i === 0) ||
          (j >= 0 && j <= 9 && i === 29) ||
          (j >= 20 && j <= 29 && i === 29)
        ) {
          wallGrid[i].push(1);
        } else {
          wallGrid[i].push(0);
        }
      }
    }
  }
  if (level === 4) {
    for (let i = 0; i < numberOfCells; i++) {
      wallGrid.push([]);
      for (let j = 0; j < numberOfCells; j++) {
        let x = i * grid;
        let y = j * grid;
        if (
          (i >= 0 && i <= 13 && j === 0) ||
          (i >= 17 && i <= numberOfCells - 1 && j === 0) ||
          (i >= 0 && i <= 13 && j === numberOfCells - 1) ||
          (i >= 17 && i <= numberOfCells - 1 && j === numberOfCells - 1) ||
          i === 0 ||
          i === numberOfCells - 1
        ){
          wallGrid[i].push(1);
        } else {
          wallGrid[i].push(0);
        }
      }
    }
  }
  if (level === 5) {
    for (let i = 0; i < numberOfCells; i++) {
      wallGrid.push([]);
      for (let j = 0; j < numberOfCells; j++) {
        let x = i * grid;
        let y = j * grid;
        if (
          i === 0 ||
          j === 0 ||
          i === numberOfCells - 1 ||
          j === numberOfCells - 1
        ) {
          wallGrid[i].push(1);
        } else {
          wallGrid[i].push(0);
        }
      }
    }
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  // snake class
  snake = new Snake();
  // globally changes frame rate to 10 to reflect the low res style of the snake game
  frameRate(10);
  createWallGrid(1);
  pickLocation();

  // score
  score = createP("")
    .position(282, 155)
    .style("font-size: 100px; opacity: 0.3; font-family: Helvetica;");

  highscore = localStorage.getItem("Highscore") || 0;

  highscoreP = createP("Highscore: " + highscore)
    .position(30, 10)
    .style(
      "font-size: 20px; opacity: 0.3; font-family: Helvetica; color: white"
    );
}

function draw() {
  checkSelect();
  console.log('draw');
  background(35);

  if (standby){
    mySelect.style("opacity", 1);
  } else {
    mySelect.style("opacity", 0);

  }

  for (let i = 0; i < numberOfCells; i++) {
    for (let j = 0; j < numberOfCells; j++) {
      let x = i * grid;
      let y = j * grid;
      if (wallGrid[i][j]) {
        fill(207, 253, 137);
        square(x, y, grid);
      }
    }
  }

  // if you eat the food, then you need a new location for the new food
  if (snake.eat(food)) {
    pickLocation();
    munch.play();
  }

  snake.rip();
  snake.update();
  snake.show();

  // draws the apple the same size as the snake
  // apple
  fill(235, 93, 115);
  noStroke();
  rect(food.x, food.y, grid, grid);

  // apple stem
  fill(73, 150, 99);
  noStroke();
  // positions the stems to the apple centre top
  rect(food.x + 7, food.y - 7, 5, 7);

  // score
  score.html("" + snake.total);
  if (snake.total === 10) {
    score.position(250, 155);
  }

  // spacebar speed experiment
  if (keyIsDown(32) === true) {
    frameRate(20);
  }
}

// global event keyPressed which uses the in-built variable keyCode
// sets the direction using an if else loop
function keyPressed() {
  standby = false;

  if (keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}

function checkSelect(){
  let newLevel = mySelect.value();
  newLevel = Number(newLevel);
  if( level != newLevel ){
    level = newLevel;
    wallGrid = [];
    createWallGrid(level);
  }
}