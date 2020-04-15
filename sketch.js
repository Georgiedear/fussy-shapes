
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

function onSentimentReady() {
  sentimentReady = true
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  input = createInput()
  const inputWidth = 300
  input.position(width / 2 - inputWidth / 2, height - 90)
  input.size(inputWidth, 20)

  x = width / 40
  y = height / 40

  // Create a new Sentiment method and passes callback
  sentiment = ml5.sentiment('movieReviews', onSentimentReady)
}

function draw() {
  background(255,0.8)

  if (!sentimentReady) {
    fill(0)
    textFont(sourceSansFont)
    textSize(32)
    textAlign(CENTER)
    return
  }

  // Draw the fussy shapes title.
  fill(255)
  textFont(sourceSansFont)
  textSize(32)
  textAlign(CENTER)
  text('Fussy Shapes', 0, -250)

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
  textSize(18)
  textAlign(CENTER)
  text('Welcome to Fussy Shapes! ', 0, -210)
  text('This shape will become smoother or more rugged based on the the sentiment of your sentence. ', 0, -180)
  text('Type sentences here then hit the Enter key. ', 0, 280)

  //Draw the circle. Got Circle code here:
  let angle = 0
  rotate(frameCount * 0.01)
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
    numPoints = Math.max(numPoints, 3)
    input.value('')
  }
}
