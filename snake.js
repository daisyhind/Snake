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
    mySelect.style('font-size', '20px');
    mySelect.style('padding', '5px 10px');
    mySelect.style('border-radius', '10px');
    mySelect.style('border', 'none');
    mySelect.style('background-color', '#4CAF50');
    mySelect.style('color', 'white');
    mySelect.style('font-family', 'Helvetica');
    mySelect.style('transition', 'opacity 0.3s');
    mySelect.position(width / 2 - 40, 400);

    mySelect.mouseOver(() => {
        mySelect.style('background-color', '#45a049');
    });

    mySelect.mouseOut(() => {
        mySelect.style('background-color', '#4CAF50');
    });


    mySelect.option("Level 1", 1);
    mySelect.option("Level 2", 2);
    mySelect.option("Level 3", 3);
    mySelect.option("Level 4", 4);
    mySelect.option("Level 5", 5);

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

                standby = true;

                // red flash
                background(255, 0, 0);
                createWallGrid(level);
                snake = new Snake();
                pickLocation();
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

        // Wrapping if on level 1 (no border)
        if (level === 1 || level === 2) {
            if (this.x >= width) this.x = 0;
            if (this.x < 0) this.x = width - grid;
            if (this.y >= height) this.y = 0;
            if (this.y < 0) this.y = height - grid;
        } else if (level === 3) {
            // Selective wrap in level 3

            let middleStart = 10 * grid;
            let middleEnd = 20 * grid;

            // Wrap left/right only in vertical middle section
            if (this.y >= middleStart && this.y < middleEnd) {
                if (this.x >= width) this.x = 0;
                if (this.x < 0) this.x = width - grid;
            } else {
                this.x = constrain(this.x, 0, width - grid);
            }

            // Wrap top/bottom only in horizontal middle section
            if (this.x >= middleStart && this.x < middleEnd) {
                if (this.y >= height) this.y = 0;
                if (this.y < 0) this.y = height - grid;
            } else {
                this.y = constrain(this.y, 0, height - grid);
            }

        } else if (level === 4) {
            // Top/bottom wrap in center gap only
            let gapStart = 14 * grid;
            let gapEnd = 16 * grid;

            if (this.x >= gapStart && this.x < gapEnd) {
                if (this.y >= height) this.y = 0;
                if (this.y < 0) this.y = height - grid;
            } else {
                this.y = constrain(this.y, 0, height - grid);
            }

            this.x = constrain(this.x, 0, width - grid);
        } else {
            // Otherwise, constrain movement to inside canvas (for wall collision checking)
            // built-in function constrain to contain the snake within the boundaries of the canvas
            // includes grid so the snake cannot disppear off the border as rectangles are drawn from top-left corner
            this.x = constrain(this.x, 0, width - grid);
            this.y = constrain(this.y, 0, height - grid);
        }

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
        }
    }
}