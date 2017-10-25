const button = $('#button')
button.on('click', startLevel)
const redBox = $('.game #red')
const blueBox = $('.game #blue')
const greenBox = $('.game #green')
const yellowBox = $('.game #yellow')
const easy = $('#easy')
const medium = $('#medium')
const hard = $('#hard')
const extreme = $('#extreme')

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
    setTimeout(resetRed, 400)
  },
  blueFlash: function(){
    blueLoad()
    setTimeout(resetBlue, 400)
  },
  greenFlash: function() {
    greenLoad()
    setTimeout(resetGreen, 400)
  },
  yellowFlash: function() {
    yellowLoad()
    setTimeout(resetYellow, 400)
  }
}

var keys = Object.keys(flash)
var flashFunc = []
var counter = 0

function flashOne (i, count) {
  counter += count
  flashFunc.push((setTimeout(flash[keys[order[i]]],counter)))
}

function startLevel () {
  if (easy.is(':checked')) {
    if (order.length === 0) {
    random()
    random()
    $('.level').text('Level: '+level)
    for (i=0; i<order.length; i++){
    flashOne(i, 1000)}
  } else {
    counter = 0
    for (i=0; i<order.length; i++){
    flashOne(i, 1000)}
  }
} else if (medium.is(':checked')) {
  if (order.length === 0) {
  random()
  random()
  $('.level').text('Level: '+level)
  for (i=0; i<order.length; i++){
  flashOne(i, 500)}
  } else {
  counter = 0
  for (i=0; i<order.length; i++){
  flashOne(i, 500)}
  }
} else if (hard.is(':checked')){
  if (order.length === 0) {
  random()
  random()
  $('.level').text('Level: '+level)
  for (i=0; i<order.length; i++){
  flashOne(i, 500)}
} else {
  counter = 0
  for (i=0; i<order.length; i++){
  flashOne(i, 500)}
  }
} else if (extreme.is(':checked')){
  if (order.length === 0) {
  random()
  random()
  $('.level').text('Level: '+level)
  for (i=0; i<order.length; i++){
  flashOne(i)}
} else {
  counter = 0
  for (i=0; i<order.length; i++){
  flashOne(i)}
}
}
}



function redLoad(){
  redBox.css('opacity', '1')
}
function resetRed(){
  redBox.css('opacity', '.4')
}

function blueLoad(){
  blueBox.css('opacity', '1')
}
function resetBlue(){
  blueBox.css('opacity', '.4')
}

function yellowLoad(){
  yellowBox.css('opacity', '1')
}
function resetYellow(){
  yellowBox.css('opacity', '.4')
}

function greenLoad(){
  greenBox.css('opacity', '1')
}
function resetGreen(){
  greenBox.css('opacity', '.4')
}

var userInputTracker = []
redBox.on('click', recordClickRed)
blueBox.on('click', recordClickBlue)
greenBox.on('click', recordClickGreen)
yellowBox.on('click', recordClickYellow)

var level = 1

function checkEqual () {
  for (i=0; i<=userInputTracker.length-1; i++) {
    if (parseFloat(userInputTracker[i]) !== parseFloat(order[i])){
      userInputTracker = []
      order = []
      counter = 0
      level = 1
      $('.level').text('Wrong! You lose. Try Again.')
    } else if (userInputTracker.length === order.length && userInputTracker[(userInputTracker.length-1)] === order[(order.length -1)]) {
      userInputTracker = []
      addLevel()
      level+= 1
      $('.level').text('Level: '+level)
      break
    }
  }
}

function userInput (val) {
  userInputTracker.push(val)
  checkEqual()
}

function recordClickRed () {
  flash.redFlash()
  userInput(0)
}

function recordClickBlue () {
  flash.blueFlash()
  userInput(1)
}

function recordClickGreen () {
  flash.greenFlash()
  userInput(2)
}

function recordClickYellow () {
  flash.yellowFlash()
  userInput(3)
}
