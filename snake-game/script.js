const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
//
const REDRAW_INTERVAL = 10;

const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 200;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    //array body length
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

let snake1 = {
    color: "green",
    ...initHeadAndBody(),
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}

let apple1 = {
    position: initPosition(),
}
let apple2 = {
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x * CELL_SIZE + 10, y * CELL_SIZE + 10, CELL_SIZE/2, 0, 360);
    ctx.fill();
}
function drawHead(ctx, x, y) {
    ctx.fillStyle = "#0b6623";
    ctx.beginPath();
    ctx.arc(x * CELL_SIZE + 10, y * CELL_SIZE + 10, CELL_SIZE/2, 0, 360);
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = "#FFFFFF"; //white
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    
    if (snake1.direction == DIRECTION.RIGHT){
        var eye = [3, 3, 4, -4];
    } else if (snake1.direction == DIRECTION.LEFT){
        var eye = [-3, -3, 4, -4];
    } else if (snake1.direction == DIRECTION.UP){
        var eye = [-4, 4, -3, -3];
    } else if (snake1.direction == DIRECTION.DOWN){
        var eye = [-4, 4, 3, 3];
    }
    ctx.arc(x * CELL_SIZE + 10 + eye[0], y * CELL_SIZE + 10 + eye[2], CELL_SIZE/8, 0, 360);
    ctx.arc(x * CELL_SIZE + 10 + eye[1], y * CELL_SIZE + 10 + eye[3], CELL_SIZE/8, 0, 360);
    ctx.closePath();
    ctx.fill();
}

//draw image
function drawImg(ctx, x, y, img) {
    let images = document.getElementById(img);
    ctx.drawImage(images, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } 
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "15px Arial";
    scoreCtx.fillStyle = "green"
    scoreCtx.fillText("Score : " + snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        //snake head 

        drawHead(ctx, snake1.head.x, snake1.head.y);
        //loop tail
        for (let i = 1; i < snake1.body.length; i++) {
            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }
        // drawCell(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawImg(ctx, apple1.position.x, apple1.position.y, "apple");
        drawImg(ctx, apple2.position.x, apple2.position.y, "apple");

        drawScore(snake1);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake) {
    if ( snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;

        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
    if ( snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;

        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake);
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }

    moveBody(snake);
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        snake1.direction = DIRECTION.LEFT;
    } else if (event.key === "ArrowRight") {
        snake1.direction = DIRECTION.RIGHT;
    } else if (event.key === "ArrowUp") {
        snake1.direction = DIRECTION.UP;
    } else if (event.key === "ArrowDown") {
        snake1.direction = DIRECTION.DOWN;
    }
})

move(snake1);