// start with a constructor function using an x and a y and an xspeed and yspeed
function Snake() {
    // starts the snake in the centre
    this.x = 300;
    this.y = 200;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    // an array to keep track of the snake length
    this.tail = [];

    mySelect = createSelect();
    mySelect.position(0, 600);
    mySelect.option("Level 1");
    mySelect.option("Level 2");
    mySelect.option("Level 3");
    mySelect.option("Level 4");
    mySelect.option("Level 5");

    mySelect.selected("Level 1");

    // eat function which will receive a position - a vector - for where that food is
    this.eat = function (pos) {
        // if the distance between the position of the snake and the position of the food is less than 1 pixel, it will eat it
        let d = dist(this.x, this.y, pos.x, pos.y);
        // if the snake eats the food, then total should go up by 1
        if (d < 1) {
            this.total++;
            if (this.total > highscore) {
                highscore = this.total;
                localStorage.setItem("Highscore", highscore);
                highscoreP.html("Highscore: " + highscore);
            }
            return true;
        }
        return false;
    };

    // a new function this.direction to use the speed to set the object's direction
    this.direction = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.rip = function () {
        // checks if the snake is intersecting itself by checking every position of the tail array is not the same position as the head
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            // if distance is less than 1, total back to 0
            if (d < 1) {
                this.total = 0;
                this.tail = [];
                this.x = 300;
                this.y = 200;
                this.xspeed = 0;
                this.yspeed = 0;
                background(255, 0, 0);
            }
        }

        let i = floor(this.x / grid);
        let j = floor(this.y / grid);

        if (wallGrid[i][j]) {
            this.total = 0;
            this.tail = [];
            this.x = 300;
            this.y = 200;
            this.xspeed = 0;
            this.yspeed = 0;
            background(255, 0, 0);
        }
    };

    // the snake object needs an update function where the x and y values change based on their speeds
    this.update = function () {
        // if the snake eats the food, the total should go up by one
        if (this.total === this.tail.length) {
            // loops through the array backwards with a decrement of - 1
            for (let i = 0; i < this.tail.length - 1; i++) {
                // draws the new snake tail at tail index i
                this.tail[i] = this.tail[i + 1];
            }
        }
        // shifts the tail down one so that it can move forwards
        // if it eats, the new chunk will be added at the end of the tail
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * grid;
        this.y = this.y + this.yspeed * grid;

        // built-in function constrain to contain the snake within the boundaries of the canvas
        // includes grid so the snake cannot disppear off the border as rectangles are drawn from top-left corner
        this.x = constrain(this.x, 0, width - grid);
        this.y = constrain(this.y, 0, height - grid);
    };

    // draws the snake
    this.show = function () {
        fill(97, 193, 123);
        noStroke();
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, grid, grid);
        }
        rect(this.x, this.y, grid, grid);

        // snake eyes
        fill(0);
        noStroke();
        circle(this.x + 8, this.y + 6, 5);
        circle(this.x + 8, this.y + 14, 5);
    };
}