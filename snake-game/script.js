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

let MOVE_INTERVAL = 120;


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

function initSnake(color) {
    return{
        color: color,
        ...initHeadAndBody(),
        position: initPosition(),
        direction: initDirection(),
        score: 0,
        level: 1,
    }
}

let snake1 = initSnake("green");

let apple1 = {
    position: initPosition(),
}
let apple2 = {
    position: initPosition(),
}

function initWall(x, y, width, height, color){
    return{
        x: x,
        y: y,
        width: width,
        height: height,
        color:color,
    }
}
let wall1 = initWall(50, 130, 300, 20, "purple");
let wall2 = initWall(50, 200, 300, 20, "purple");
let wall3 = initWall(50, 270, 300, 20, "purple");
let wall4 = initWall(100, 50, 20, 300, "purple");
let wall5 = initWall(280, 50, 20, 300, "purple");

function drawWall(ctx, x, y, width, height, color) {
    ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

function drawLevel(snake) {
    let levelCanvas = document.getElementById("levelBoard");
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "15px Arial";
    levelCtx.fillStyle = "green"
    levelCtx.fillText("Level : " + snake.level, 10, levelCanvas.scrollHeight / 2);
}

function drawSpeed() {
    let speedCanvas = document.getElementById("speedBoard");
    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "15px Arial";
    speedCtx.fillStyle = "green"
    speedCtx.fillText("Speed : " + MOVE_INTERVAL + " ms", 10, speedCanvas.scrollHeight / 2);

}

function drawCell(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.arc(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE/2, 0, 360);
    ctx.fill();
}

//draw image
function drawImg(ctx, x, y, src) {
    var img = new Image();
    img.src = src;
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.beginPath();
    ctx.stroke();
}

function drawHead(ctx, x, y){
    var img = new Image();
    if (snake1.direction == DIRECTION.RIGHT){
        img.src = "asset/headRight.png";
    } else if (snake1.direction == DIRECTION.LEFT){
        img.src = "asset/headLeft.png";
    } else if (snake1.direction == DIRECTION.UP){
        img.src = "asset/headUp.png";
    } else if (snake1.direction == DIRECTION.DOWN){
        img.src = "asset/headDown.png";
    }
    
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
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
            drawImg(ctx, snake1.body[i].x, snake1.body[i].y, "asset/tail.png");
        }
        
        drawImg(ctx, apple1.position.x, apple1.position.y, "asset/apple.png");
        drawImg(ctx, apple2.position.x, apple2.position.y, "asset/apple.png");
        drawScore(snake1);

        drawLevel(snake1);
        if(snake1.level == 2){
            drawWall(ctx, wall1.x, wall1.y, wall1.width, wall1.height, wall1.color);
        }else if(snake1.level == 3){
            drawWall(ctx, wall1.x, wall1.y, wall1.width, wall1.height, wall1.color);
            drawWall(ctx, wall2.x, wall2.y, wall2.width, wall2.height, wall2.color);
        }else if(snake1.level == 4){
            drawWall(ctx, wall1.x, wall1.y, wall1.width, wall1.height, wall1.color);
            drawWall(ctx, wall2.x, wall2.y, wall2.width, wall2.height, wall2.color);
            drawWall(ctx, wall3.x, wall3.y, wall3.width, wall3.height, wall3.color);
        }else if(snake1.level == 5){
            drawWall(ctx, wall4.x, wall4.y, wall4.width, wall4.height, wall4.color);
            drawWall(ctx, wall5.x, wall5.y, wall5.width, wall5.height, wall5.color);
        }

        drawSpeed();
    }, REDRAW_INTERVAL);
}

function level(snake){
    if(snake.score == 5 && snake.level == 1){
        alert("Level 1 Complate!");
        snake.level = 2;
        MOVE_INTERVAL = 100;
    }
    else if(snake.score == 10 && snake.level == 2){
        alert("Level 2 Complate!");
        snake.level = 3;
        MOVE_INTERVAL = 80;
    }
    else if(snake.score == 15 && snake.level == 3){
        alert("Level 3 Complate!");
        snake.level = 4;
        MOVE_INTERVAL = 60;
    }
    else if(snake.score == 20 && snake.level == 4){
        alert("Level 4 Complate!");
        snake.level = 5;
        MOVE_INTERVAL = 40;
    }
    else if(snake.score == 25 && snake.level == 5){
        alert("Game Over, Try Again?");
        snake.level = 1;
        snake.score = 0;
        MOVE_INTERVAL = 120;
    } 
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
    level(snake);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake);
    level(snake);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake);
    level(snake);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake);
    level(snake);
}

function checkCollision(snake) {
    let isCollide = false;
    //this
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < snake.length; j++) {
            for (let k = 1; k < snake[j].body.length; k++) {
                if (snake[i].head.x == snake[j].body[k].x && snake[i].head.y == snake[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        snake1 = initSnake("green");
    }
    return isCollide;
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
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
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

initGame();