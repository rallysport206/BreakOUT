var canvas = document.getElementById('game-canvas');
// Gets a 2D context for the canvas.
var ctx = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
var paddleH = 12;
var paddleW = 80;
var paddleX = (canvas.width - paddleW) / 2;
var rightKey = false;
var leftKey = false;
var brickRows = 3;
var brickCol = 9;
var brickW = 38;
var brickH = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
//bricks
var bricks = [];
//column
for(c = 0; c < brickCol; c++){
  //rows
  for(r = 0; r < brickRows; r++){
    bricks.push({
      x: (c * (brickW + brickPadding)) + brickOffsetLeft,
      y: (r * (brickH + brickPadding)) + brickOffsetTop,
      status: 1
    });
  }
}
//draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#8aa52d";
  ctx.fill();
  ctx.closePath();
}
//draw the paddle
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
  ctx.fillStyle = "#8aa52d";
  ctx.fill();
  ctx.closePath();
}
//draw the brick
function drawBricks() {
  bricks.forEach(function(brick){
    if(!brick.status) return;
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brickW, brickH);
    ctx.fillStyle = "#8aa52d";
    ctx.fill();
    ctx.closePath();
  });
}
function drawscore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#8aa52d";
  ctx.fillText("Score: "+score, 8, 20);
}
//collision detection
function collisionDetection() {
  bricks.forEach(function(b) {
    if(!b.status) return;
    var inBricksColumn = x > b.x && x < b.x + brickW,
        inBricksRow = y > b.y && y < b.y + brickH;
    if(inBricksColumn && inBricksRow){
      dy = -dy;
      b.status = 0;
      score++;
      if(score == brickCol*brickRows){
        console.log("You Win!")
      }
    }
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the highlighted line
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
if(hitSideWall())
  dx = -dx;
if(hitTop() || hitPaddle())
  dy = -dy;
if (gameOver())
  document.location.reload();
  var RIGHT_ARROW = 39,
      LEFT_ARROW = 37;
  function hitPaddle(){return hitBottom() && ballOverPaddle()}
  function ballOverPaddle(){return x > paddleX && x < paddleX + paddleW}
  function hitBottom(){return y + dy > canvas.height - 10}
  function gameOver(){return hitBottom() && !ballOverPaddle()}
  function hitSideWall(){return x + dx > canvas.width - 10 || x + dx < 10}
  function hitTop(){return y + dy < 10}
  function xOutOfBounds(){return x + dx > canvas.width - 10 || x + dx < 10}
  function rightPressed(e){return e.keyCode == RIGHT_ARROW}
  function leftPressed(e){return e.keyCode == LEFT_ARROW}
  function keyDown(e){
    rightKey = rightPressed(e);
    leftKey = leftPressed(e);
  }
  function keyUp(e){
    rightKey = rightPressed(e) ? false: rightKey;
    leftKey = leftPressed(e) ? false: leftKey;
  }
  //key pressed event
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
  document.addEventListener("mouseMove", mouseMoveHandler, false);
  function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.brickOffsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
      paddleX = relativeX - paddleW/2;
    }
  }
  var maxX = canvas.width - paddleW,
      minX = 0,
      paddleDelta = rightKey ? 7 : leftKey ? -7 : 0;
  paddleX = paddleX + paddleDelta;
  paddleX = Math.min(paddleX, maxX);
  paddleX = Math.max(paddleX, minX);
  x += dx;
  y += dy;

}
setInterval(draw, 10);
