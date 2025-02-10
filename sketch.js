let snake;
let scl = 20;
let food;
let canvasSize = 600;
// let numberOfCells = 30;
// let cellSize = canvasSize / numberOfCells;

function setup() {
  createCanvas(canvasSize, canvasSize);
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let column = floor(width / scl);
  let row = floor(height / scl);
  food = createVector(floor(random(column)) * scl, floor(random(row)) * scl);
}

function draw() {
  background(0);

  if (snake.eat(food)) {
    pickLocation();
  }
  snake.rip();
  snake.update();
  snake.show();

  fill(235, 93, 115);
  noStroke();
  rect(food.x, food.y, scl, scl);

  // apple stem
  fill(73, 150, 99);
  noStroke();
  rect(food.x + 7, food.y - 7, 5, 7);
}

function keyPressed() {
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