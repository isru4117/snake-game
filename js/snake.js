const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * rows) * scale,
  y: Math.floor(Math.random() * columns) * scale,
};
let food = {
  x: Math.floor(Math.random() * rows) * scale,
  y: Math.floor(Math.random() * columns) * scale,
};

/*let intialy set the direction snake is moving right*/

let d = "RIGHT";
document.onkeydown = direction;
function direction(event) {
  let key = event.keyCode;
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  }
  if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  }
  if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  }
  if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}
let playGame = setInterval(draw, 100);
function draw(params) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "pink";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "green";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "LEFT") snakeX -= scale;
  if (d == "UP") snakeY -= scale;
  if (d == "RIGHT") snakeX += scale;
  if (d == "DOWN") snakeY += scale;
  if (snakeX >= canvas.width) {
    snakeX = 0;
  }
  if (snakeY >= canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * rows) * scale,
      y: Math.floor(Math.random() * columns) * scale,
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}
