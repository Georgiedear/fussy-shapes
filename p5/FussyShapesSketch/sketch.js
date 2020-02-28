let x;
let y;
let outsideRadius = 150;
let insideRadius = 200;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(204);
  x = width / 34;
  y = height / 34;
}

function draw() {
  background(204);
  let numPoints = int(map(mouseX, 0, width, 60, 0));
  let angle = 0;
  let angleStep = 360.0 / numPoints;
  rotateZ(frameCount * 0.01);


  beginShape();
  strokeWeight(4);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    
   
    vertex(px, py,0);
     
  }
  endShape();
}
