var canvas = document.getElementById('game-canvas');
// Gets a 2D context for the canvas.
ctx = canvas.getContext('2d'),
ballR = 10,
x = canvas.width / 2,
y = canvas.height - 30,
dx = 3,
dy = -3,
pongH = 15,
pongW = 80,
pongX = (canvas.width - pongW) / 2,
rightKey = false,
leftKey = false,
brickRows = 3,
brickCol = 9,
brickW = 75,
brickH = 20,
brickPadding = 10,
brickOffsetTop = 30,
brickOffsetLeft = 30;

var bricks = [];
for (i = 0; i < brickCol; i++){
  
}
