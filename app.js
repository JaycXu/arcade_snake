const patternBorder = 'black';
const patternBackground = 'white';
const snakeColor = 'rgb(71, 100, 80)';
const snakeBorder = 'black';
const foodColor = 'red';
const foodBorder = 'black';
let move_x_step = 10;
let move_y_step = 0;

let snake = [
    {x: 110, y: 20},
    {x: 100, y: 20},
    {x: 90, y: 20},
    {x: 80, y: 20},
    {x: 70, y: 20},
    {x: 60, y: 20},
    {x: 50, y: 20}
]

let foodeatornot = false;
let food = {
    x:null,
    y:null
}

let speed = 0.3;
let delaytime = 500 * speed;


// Get the canvas element
const pattern = document.getElementById("pattern");
// Return a two dimensional drawing context
const pattern_ctx = pattern.getContext("2d");

// use the Start button to start the game and use the Pause button to pause the game
let start = false;
let pause = true;
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const restartButton = document.getElementById("restartButton");
startButton.addEventListener("click", ()=>{
    start = true;
    pause = false;
});
pauseButton.addEventListener("click", ()=>{
    start = false;
    pause = true;
});
main();

document.addEventListener("keydown", move);

// to create a function named main to keep the game running
function main() {
    clearCanvas();
    drawSnake();
    //create food pointer
    foodPointer();
    if(start && !pause){
    startGame();
    }
    setTimeout(()=>{
        if(checkcurrentstate()){
            main();
        }else {
            console.log("oh no, you hit the wall!")
        }
    }, delaytime);
}

// draw a border around the canvas
function clearCanvas (){
    // select the color to fill the drawing
    pattern_ctx.fillStyle = patternBackground;
    // select the color for the border of the canvas
    pattern_ctx.strokeStyle = patternBorder;
    // draw a "filled" rectangle to cover the entire canvas
    pattern_ctx.fillRect(0, 0, pattern.width, pattern.height)
    // draw a "border" around the entire canvas
    pattern_ctx.strokeRect(0, 0, pattern.width, pattern.height)
}

// Draw the snake on the canvas
function drawSnake (){
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    pattern_ctx.fillStyle = snakeColor;
    pattern_ctx.strokeStyle = snakeBorder;
    pattern_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    pattern_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// to get the food anywhere on the canvas randomly but not on the same spot as the snake
function foodPointer() {
    if(!food.x && !food.y){
        food.x = Math.round(Math.random()*490/10)*10;
        food.y = Math.round(Math.random()*490/10)*10;
        let checkOverlay = false;
        for(let i = 0; i < snake.length; i++) {
            if(food.x == snake[i].x && food.y == snake[i].y){
                checkOverlay = true;
            }
        }
        if(checkOverlay){
            foodPointer()
        }else{
            pattern_ctx.fillStyle = foodColor;
            pattern_ctx.strokeStyle = foodBorder;
            pattern_ctx.fillRect(food.x, food.y, 10, 10)
        }
    }else{
        pattern_ctx.fillStyle = foodColor;
        pattern_ctx.strokeStyle= foodBorder;
        pattern_ctx.fillRect(food.x, food.y, 10, 10)
    }
}

function checkcurrentstate(){
    for(var i = 0; i < snake.length; i++){
        let count = 1;
        // end the game if the snake moves off the screen
        if((snake[i].x < 0 || snake[i].x > 490) || (snake[i].y < 0 || snake[i].y > 490)){
            alert("game over, use the Restart button below to start a new gam");
            return false;
        }
        // end the game if the snake moves to itself
        for(var j = i+1; j < snake.length; j++){
            if(JSON.stringify(snake[i]) == JSON.stringify(snake[j])){
                alert("game over, use the Restart button below to start a new game");
                return false;
            }
        }
    }
    return true;
}

// create a function that make the snake grows after it eats the food
function eatFood(newSnakeHead){
    if(newSnakeHead.x == food.x && newSnakeHead.y == food.y){
        foodeatornot = true;
        return true;
    }
    return false;
}

function startGame(){
    const newSnakeHead = {x:snake[0].x+move_x_step, y:snake[0].y+move_y_step};
    snake.unshift(newSnakeHead);
    if(!eatFood(newSnakeHead)){
        snake.pop();
    }else{
        food.x = null;
        food.y = null;
    }
}


// create a function to use arrow keys to move the snake
function move(event){
    // left key
    if(event.keyCode == 37 && move_x_step != 10){
        move_x_step = -10;
        move_y_step = 0;
    }
    // down key
    if(event.keyCode == 38 && move_y_step != 10){
        move_x_step = 0;
        move_y_step = -10;
    }
    // right key
    if(event.keyCode == 39 && move_x_step != -10){
        move_x_step = 10;
        move_y_step = 0;
    }
    // up key
    if(event.keyCode == 40 && move_y_step != -10){
        move_x_step = 0;
        move_y_step = 10;
    }
}