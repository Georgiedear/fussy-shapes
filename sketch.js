
let x
let y
let outsideRadius = 180
let insideRadius = 230
let sourceSansFont
let input
let sentiment
let sentimentReady = false
let sentimentInput = ''
let numPoints = 50
function preload() {
  sourceSansFont = loadFont('assets/source-sans-pro/SourceSansPro-Regular.otf')
}

function onSentimentReady() {
  sentimentReady = true
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  input = createInput()
  const inputWidth = 300
  input.position(width / 2 - inputWidth / 2, height - 150)
  input.size(inputWidth, 30)

  x = width / 40
  y = height / 40

  // Create a new Sentiment method and passes callback
  sentiment = ml5.sentiment('movieReviews', onSentimentReady)
  input.elt.focus()
}

function draw() {
  background(255,0.8)

  if (!sentimentReady) {
    fill(0)
    textFont(sourceSansFont)
    textSize(3)
    textAlign(CENTER)
    return
  }

  // Draw the fussy shapes title.
  fill(255)
  textFont(sourceSansFont)
  textSize(52)
  textAlign(CENTER)
  text('Fussy Shapes', 0, -350)

  // Draw the output text.
  fill(255)
  textFont(sourceSansFont)
  textSize(25)
  textAlign(LEFT)
  fill(138,141,255)
  text(sentimentInput, 0, 0)

  //Draw the text instructions
  fill(255)
  textFont(sourceSansFont)
  textSize(25)
  textAlign(CENTER)
  text('Welcome to Fussy Shapes! ', 0, -290)
  text('This shape will become smoother or more rugged based on the the sentiment of your sentence. ', 0, -250)
  text('Type sentences here then hit the Enter key. ', 0, 290)

  //Draw the circle. Got Circle code here: https://p5js.org/examples/form-triangle-strip.html
  let angle = 0
  rotate(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  const angleStep = 360.0 / numPoints
  strokeWeight(6)
  stroke(255)
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
    numPoints = Math.max(numPoints, 3) //min number of vertices that can be reached.
    input.value('')
  }
}
