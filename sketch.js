let x
let y
let outsideRadius = 150
let insideRadius = 200
let button
let myFont

function preLoad() {

myFont = loadFont('../source-sans-pro/SourceSansPro-Black.otf')

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  input = createInput()
  input.position(width / 2-80, height - 80)

  button = createButton('textGen')
  button.mousePressed(modelReady)
  button.position(input.x + input.width, height -80)

  background(204)
  x = width / 40
  y = height / 40
  fill(0)
  textFont('Georgia')
  textSize(32)
  const text = input.value()
  input.value('')
}

// Create a new Sentiment method
const sentiment = ml5.sentiment('movieReviews', modelReady);
      
// When the model is loaded
function modelReady() {
  // model is ready
  console.log("Model Loaded!");
}

// make the prediction
const prediction = sentiment.predict();

function draw() {
  textFont('Georgia')
  textSize(20)
  text('Fussy Shapes', 100,200)
  background(204)
  let numPoints = int(map(mouseX, 0, width, 60, 0))
  let angle = 0
  rotate(frameCount * 0.01)
  const angleStep = 360.0 / numPoints

  strokeWeight(6)
  fill('rgba(0,0,0,0)')
  beginShape()
  for (let i = 0; i <= numPoints; i++) {
    let px = x + sin(radians(angle)) * outsideRadius
    let py = y + cos(radians(angle)) * outsideRadius
    angle += angleStep
    vertex(px, py, 0)
  }
  endShape(CLOSE)
}

function keyPressed() {
  if (keyCode == ENTER) {

    text('Hi'+prediction, 100, 200)
    fill(0)
    textSize(12)
  }
}
