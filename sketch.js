let x
let y
let outsideRadius = 150
let insideRadius = 200
let button
let myFont

function preload() {
 myFont = loadFont('./assets/source-sans-pro/SourceSansPro-It.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  input = createInput()
  input.position(width / 2, height - 20)

  button = createButton('textGen')
  button.mousePressed(generateText)
  button.position(input.x + input.width, height - 20)

  background(204)
  x = width / 40
  y = height / 40
  fill(0)
  textFont(myFont)
  textSize(32)
}

function generateText() {
  //httpPost(path, [datatype], [data], [callback], [errorCallback])
  const path = 'http://localhost:8000/query'
  const datatype = 'json'

  const data = {
    prompt: '',
    max_characters: 1024,
    top_p: 1,
    seed: 599,
  }

  httpPost(path, datatype, data, gotText, gotError)

  const text = input.value()
  input.value('')
}

function gotText(data) {
  console.log(data)
  text(data, 150, 200)
  fill(0)
  textSize(12)
}

function gotError(error) {
  console.log(error)
}

function draw() {
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
    text(gotText, 120, 200)
  }
}
