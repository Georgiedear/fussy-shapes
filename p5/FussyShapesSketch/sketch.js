let x;
let y;
let outsideRadius = 150;
let insideRadius = 200;
let button;


function setup() {
 
  createCanvas(windowWidth, windowHeight, WEBGL);
  input = createInput();
  input.position(width/2, height/2+400);


  button = createButton('textGen').mousePressed(generateText);
  button.position(input.x + input.width, height/2+400);
 
  background(204);
  x = width / 40;
  y = height / 40;

}

function generateText() {

//httpPost(path, [datatype], [data], [callback], [errorCallback])

const path = "http://localhost:8000/query";
const datatype = "json";

const data = {
  prompt: String,
  max_characters: 1024,
  top_p: 1,
  seed: 599, 
};

httpPost(path, datatype, data, gotText, gotError);

const text = input.value();
input.value('');

}

function gotText(data) {

console.log(data);
}
function gotError(error) {
  console.log(error);
  
  }
function draw() {
  background(204);
  let numPoints = int(map(mouseX, 0, width, 60, 0));
  let angle = 0;
  let angleStep = 360.0 / numPoints;
  rotateZ(frameCount * 0.01);


  beginShape();
  noFill();
  strokeWeight(6);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;

    vertex(px, py, 0);
  }
  endShape();
}
