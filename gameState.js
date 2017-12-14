var canvas = document.getElementById('game-canvas');
// Gets a 2D context for the canvas.
var ctx = canvas.getContext('2d'); //rendering context in 2d
ctx.font = '50px Impact';
ctx.fillStyle = "green";
ctx.textAlign = "center";
ctx.fillText("BREAKOUT!", canvas.width/2, canvas.height/2);
ctx.font = '20px Impact';
ctx.fillText('Click Service to Start', canvas.width/2, canvas.height/2 + 40);
