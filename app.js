// Variables and constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./Assets/food.mp3');
const gameOverSound = new Audio('./Assets/gameover.mp3');
const moveSound = new Audio('./Assets/move.mp3');
const strt = document.querySelector('.strt');
let gameLevel = 1;
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };


// Game Functions
function main(cTime) {
    window.requestAnimationFrame(main);

    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = cTime;
    gameEngine();
}

function iscollide(snake) {
    // If snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }  
    
    // If snake bumps into the wall        
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
            
}

function gameEngine() {
    // Part 1: Updating Snake array & Food //
    if(iscollide(snakeArr)) {
        gameOverSound.play();
        music.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        score = 0;
        strt.style.display = "block";
    }

    // If snake has eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score > hi_score_val) {
            hi_score_val = score;
            localStorage.setItem("hi_score", JSON.stringify(hi_score_val));
            hiScoreBox.innerHTML = `Hi-Score: ${hi_score_val}`;
        }


        if(score < 7) {
            speed = 5;

        } else if(score >= 7) {
            speed = 7;

        } else if(score >= 12) {
            speed = 9;

        }else if(score >= 17) {
            speed = 11;

        } else if(score >= 22) {
            speed = 14;

        } else if(score >= 27) {
            speed = 17;

        } else {
            speed = 20;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y +inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    // Part 2: Display Food & snake

    //Display snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0) {
            snakeElement.classList.add("head");
        }else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })


    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


// Main logic
let hi_score = localStorage.getItem('hi_score');
if(hi_score === null) {
    hi_score_val = 0;
    localStorage.setItem("hi_score", JSON.stringify(hi_score_val));
} else {
    hi_score_val = JSON.parse(hi_score);
    hiScoreBox.innerHTML = `Hi-Score: ${hi_score}`; 
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1}; //start the game
    moveSound.play();
    switch (e.key) {
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            strt.style.display = "none";
            break;

        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            strt.style.display = "none";
            break;

        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            strt.style.display = "none";
            break;

        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            strt.style.display = "none";
            break;
    
        default:
            alert("press valid key")
            break;
    }
}) 