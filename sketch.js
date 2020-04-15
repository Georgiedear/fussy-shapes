'use strict'

let x
let y
let outsideRadius = 130
let insideRadius = 180
let sourceSansFont
let input
let sentiment
let sentimentReady = false
let sentimentInput = ''
let numPoints = 25

function preload() {
  sourceSansFont = loadFont('assets/source-sans-pro/SourceSansPro-Regular.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  input = createInput()
  const inputWidth = 300
  input.position(width / 2 - inputWidth / 2, height - 80)
  input.size(inputWidth, 20)
  input.elt.focus()

  x = width / 40
  y = height / 40

  // Create a new Sentiment method
  sentiment = ml5.sentiment('movieReviews', () => (sentimentReady = true))
}

function draw() {
  background(204)

  if (!sentimentReady) {
    fill(0)
    textFont(sourceSansFont)
    textSize(32)
    textAlign(CENTER)
    return
  }

  // Draw the fussy shapes title.
  fill(0)
  textFont(sourceSansFont)
  textSize(32)
  textAlign(CENTER)
  text('Fussy Shapes', 0, -250)

  // Draw the output text.
  fill(0)
  textFont(sourceSansFont)
  textSize(20)
  text(sentimentInput, 0, 0)

  //Draw the textbox
  fill(0)
  textFont(sourceSansFont)
  textSize(18)
  textAlign(CENTER)
  text('Enter sentences here then hit Enter ', 0, 200)

 //Draw the circle. Got Circle code here: 
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
    sentimentInput = input.value()
    const { score } = sentiment.predict(sentimentInput)
    numPoints = Math.floor(score * 10)
    numPoints = Math.max(numPoints, 3)
    input.value('')
  }
}
