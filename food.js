// built-in function pickLocation to work out the grid and assign it a random space within that
function pickLocation() {
    // floor function to make sure it's a whole number
    let column = floor(width / grid);
    let row = floor(height / grid);
    let foodMoved;
    // createVector is a quick and easy way to store the x and y and give the food a random spot in the canvas
    // times by grid to align the snake and the food onto the same grid
    do {
        foodMoved = createVector(
            floor(random(1, column - 1)) * grid,
            floor(random(1, row - 1)) * grid
        );
    } while (!validFoodPosition(foodMoved));

    food = foodMoved;
}

function validFoodPosition(foodPos) {
    //check snake
    for (let i = 0; i < snake.length; i++) {
        if (foodPos.x === snake.tail[i].x && foodPos.y === snake.tail[i].y)
            return false;
    }

    // check grid
    let i = floor(foodPos.x / grid);
    let j = floor(foodPos.y / grid);
    if (wallGrid[i][j] === 1) {
        return false;
    }

    return true;
}