var canvas = document.getElementById('game-canvas')// Gets a 2D context for the canvas.
var ctx = canvas.getContext('2d'); //creating ctx to store 2d rendering context.
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4; // draws on x
var dy = -4; //draws on y
var paddleH = 30; //paddle height
var paddleW = 80; //paddle width
var paddleX = (canvas.width - paddleW) / 3;
var mario = new Image();//add mario image
var rightKey = false;
var leftKey = false;
var brickRows = 3; //brick rows
var brickCol = 9; // brick columns
var brickW = 38; // brick width
var brickH = 20; // brick height
var brickPadding = 10; //padding between bricks
var brickOffsetTop = 30; // offset from edge
var brickOffsetLeft = 30; //offset from edge
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
  ctx.beginPath(); //
  ctx.arc(x, y, 10, 0, Math.PI * 2); //arc loop to 'draw ball' w/ start angle and end angle or angle to start and finish drawing circle in radians.
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
//draw the paddle
mario.src = 'img/mario.png';
function drawPaddle(){
  ctx.beginPath();
  ctx.drawImage(mario, paddleX, canvas.height - paddleH, paddleW, paddleH);
  ctx.closePath();
}
//draws the bricks
function drawBricks() {
  bricks.forEach(function(brick){
    if(!brick.status) return;
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brickW, brickH); //defining a a rectangle.
    ctx.fillStyle = "#4D658D";
    ctx.fill();
    ctx.closePath();
  });
}
//scoreboard
function drawScore(){
  ctx.font = "20px Press Start 2P";
  ctx.fillStyle = "#4D658D";
  ctx.fillText("Score: "+score, 8, 20);
}
//collision detection and bounce off walls
function collisionDetection() {
  bricks.forEach(function(b) {
    if(!b.status) return;
    var inBricksColumn = x > b.x && x < b.x + brickW,
        inBricksRow = y > b.y && y < b.y + brickH;
    if(inBricksColumn && inBricksRow){
      dy = -dy;
      b.status = 0;
      score++;
      if(score === brickCol*brickRows){
        document.getElementById('status').innerHTML = 'You Broke Out!';
        remove.requestAnimationFrame()
      }
    }
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the highlighted line from ball
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
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
  function gameOver(){
    return hitBottom() && !ballOverPaddle() && restartGame()}
  function hitSideWall(){return x + dx > canvas.width - 10 || x + dx < 10}
  function hitTop(){return y + dy < 10}
  function xOutOfBounds(){return x + dx > canvas.width - 10 || x + dx < 10}
  //paddle control
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
  function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
      paddleX = relativeX - paddleW/2;
    }
  }
  function restartGame() {
    if (window.confirm('Game Over, Click OK to Restart')){
      return window.location.reload()
    }
  }
  //key pressed event
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
  var maxX = canvas.width - paddleW,
      minX = 0,
      paddleDelta = rightKey ? 7 : leftKey ? -7 : 0;
  paddleX = paddleX + paddleDelta;
  paddleX = Math.min(paddleX, maxX);
  paddleX = Math.max(paddleX, minX);
  x += dx; // ball is painted in new postion every update
  y += dy;
  requestAnimationFrame(draw);
}
draw();
