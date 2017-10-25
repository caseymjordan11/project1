const button = $('#button')
button.on('click', startLevel)
const redBox = $('.game #red')
const blueBox = $('.game #blue')
const greenBox = $('.game #green')
const yellowBox = $('.game #yellow')
const nextLevel = $('#nextLevel')
nextLevel.on('click', addLevel)


var order = []


function random() {
  var num = (Math.floor(Math.random() * (3-0+1)) + 0)
  order.push(num)
}



function addLevel () {
  var num = (Math.floor(Math.random() * (3-0+1)) + 0)
  order.push(num)
}



var flash = {
  redFlash: function() {
    redLoad()
    setTimeout(resetRed, 600)
  },
  blueFlash: function(){
    blueLoad()
    setTimeout(resetBlue, 600)
  },
  greenFlash: function() {
    greenLoad()
    setTimeout(resetGreen, 600)
  },
  yellowFlash: function() {
    yellowLoad()
    setTimeout(resetYellow, 600)
  }
}

var keys = Object.keys(flash)
var flashFunc = []
var counter = 0

function flashOne (i) {
  counter += 800
  flashFunc.push((setTimeout(flash[keys[order[i]]],counter)))
}

function startLevel () {
  if (order.length === 0) {
  random()
  random()
  random()
  random()
  for (i=0; i<order.length; i++){
  flashOne(i)}
} else {
  counter = 0
  for (i=0; i<order.length; i++){
  flashOne(i)}
}}



function redLoad(){
  redBox.css('background', 'red')
}
function resetRed(){
  redBox.css('background', 'white')
}

function blueLoad(){
  blueBox.css('background', 'blue')
}
function resetBlue(){
  blueBox.css('background', 'white')
}

function yellowLoad(){
  yellowBox.css('background', 'yellow')
}
function resetYellow(){
  yellowBox.css('background', 'white')
}

function greenLoad(){
  greenBox.css('background', 'green')
}
function resetGreen(){
  greenBox.css('background', 'white')
}

var userInputTracker = []
redBox.on('click', recordClickRed)
blueBox.on('click', recordClickBlue)
greenBox.on('click', recordClickGreen)
yellowBox.on('click', recordClickYellow)

function checkEqual () {
  for (i=0; i<=userInputTracker.length-1; i++) {
    if (parseFloat(userInputTracker[i]) !== parseFloat(order[i])){
      alert('You lose')
      userInputTracker = []
    } else if (userInputTracker.length === order.length && userInputTracker[(userInputTracker.length-1)] === order[(order.length -1)]) {
      alert('you win')
      userInputTracker = []
      break
    }
  }
}

function userInput (val) {
  userInputTracker.push(val)
  checkEqual()
}

function recordClickRed () {
userInput(0)
}

function recordClickBlue () {
userInput(1)
}

function recordClickGreen () {
userInput(2)
}

function recordClickYellow () {
userInput(3)
}
