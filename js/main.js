let ctx = document.getElementById("mainCanvas").getContext("2d");

let offset = 5; // offset from top and left edge
let squareCoords = new Map();
let shouldStop = false;
drawMap();
console.time("howLong");
let startTime = Date.now();

let mainCanvas = document.querySelector("#mainCanvas");
// addEventListener("mousemove",getMousePos);

function drawMap(){
	if (squareCoords.size >=100){
        console.timeEnd("howLong");
        shouldStop=true;
        let endTime= Date.now();
        let timeSpent=(endTime-startTime)/1000+" seconds.";
        alert("It took " + timeSpent + " to randomly select every square.");
        return;
    }

	ctx.fillStyle = "#ffffff";
  ctx.strokeStyle="#ffffff";
	roundRect(ctx,0,0,800,800,{},true); 

  for (let x = 0;x < 10;x++){
    for (let y = 0;y<10;y++){
    	if (squareCoords.has(x+"-"+y)){
      	ctx.strokeStyle = "#000000";
				ctx.fillStyle = "#000000";
      }
      else{
				ctx.strokeStyle = "#0000ff";
				ctx.fillStyle = "#3333";
      
      }
      roundRect(ctx,(25*x)+offset,(25*y)+offset,20,20,{},true);
    }
  }
	let xRand = getRandom(10);
	let yRand = getRandom(10);
	squareCoords.set(xRand.toString() + "-" + yRand.toString(),{x:xRand,y:yRand});
	ctx.strokeStyle = "rgb(255, 0, 0)";
	ctx.fillStyle = "rgba(255, 255, 0, .5)";

    roundRect(ctx,(25*xRand)+offset,(25*yRand)+offset,20,20,{},true);
    if (!shouldStop){
        setTimeout(drawMap,100);
    }
}

function getRandom(max){
	return Math.floor((Math.random() * max));
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

function getMousePos(evt) {
  
  var rect = mainCanvas.getBoundingClientRect();
  var currentPoint = new Point();
  currentPoint.x = evt.clientX - rect.left;
  currentPoint.y = evt.clientY - rect.top;

  console.log(currentPoint);
  return currentPoint;
}

class Point
{
    constructor (x,y){
    this.x = x;
    this.y = y;
    }
};
