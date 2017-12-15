var canvas = document.getElementById('game-canvas');
// Gets a 2D context for the canvas.
var ctx = canvas.getContext('2d'); //rendering context in 2d
// $('#startButton').click(function () {
//   $('#splashScreen').hide();
//   $('#game-canvas').show();
// });
var startGame = false;
var completed = false;
intro();
function intro() {
  ctx.font = '50px Impact';
  ctx.fillStyle = "green";
  ctx.textAlign = "center";
  ctx.fillText("BREAKOUT!", canvas.width/2, canvas.height/2);
  ctx.font = '20px Impact';
  ctx.fillText('Click Service to Start', canvas.width/2, canvas.height/2 + 40);
}
function togglePause()
{
  if(!paused){
    paused = true;
  } else if (pause) {
    pause = false;
  }
}
windowl.addEventListener('keydown',function(e){
  var key = e.keyCode;{
  if(key === 80)
    togglePause();
  }
});
draw();
if(!paused)
{
  update();
}
// function start(){
//   startGame = true;
//   clearCanvas();
//   setInterval(function() {
//     clearCanvas();
//     loop();
//   }, 1000/30)
// }
// function loop() {
//   console.log('game is running');
// }
// function clearCanvas() {
//   context.clearRect(0, 0, 640, 360);
// }
