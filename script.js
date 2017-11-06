$(document).ready(function () {
// To ensure DOM elements are loaded / scope in global variables, use a document.ready
// when using jQuery

const button = $('#button')
const redBox = $('#red')
const blueBox = $('#blue')
const greenBox = $('#green')
const yellowBox = $('#yellow')
// As ids are unique DOM elements by definition, you don't need to add traversal logic
// to your jQuery selectors
const easy = $('#easy')
const medium = $('#medium')
const hard = $('#hard')

var order = []

var keys = Object.keys(flash)
var flashFunc = []
var counter = 0
// ^^^ Best practice is to keep all variable declarations at the top of the file to make
// them apparent. After variable declarations, all functions; then lastly, event listeners


function random() {
  var num = Math.floor(Math.random() * 4)
  order.push(num)
}



function addLevel () {
  var num = (Math.floor(Math.random() * (3-0+1)) + 0)
  order.push(num)
}
// ^^^ the above `addLevel` function seems to be doing the same thing as `random`;
// are both of them neccessary?



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
// ^^^ I would either pull together the above "flash" methods into a `class` with
// the DOM elements that they operate on OR (in consistency with your current organization)
// just have them be top level functions. In either case, think about how you could
// refactor to just have one function / method called `flash` that could conditionally
// flash the related DOM elements based on some parameter

function flashOne (i, count) {
  counter += count
  flashFunc.push((setTimeout(flash[keys[order[i]]],counter)))
}

function startLevel () {
  document.getElementById('button').disabled = true
  document.getElementById('easy').disabled = true
  document.getElementById('medium').disabled = true
  document.getElementById('hard').disabled = true
  // ^^^ either use jQuery everywhere for DOM selection / manipulation or Vanilla JS
  // everywhere for this, but be consistent
  // Also, think about whether or not this operation of setting all buttons `disabled`
  // property can be abstracted into its own function and then simply called here
  // (more DRY and modular)
  if (easy.is(':checked')) {
    if (order.length === 0) {
      random()
      random()
      $('.level').text('Level: '+level)
      for (let i=0; i<order.length; i++){
        // ^^^ use let to scope in `i`
        flashOne(i, 1000)
      }
    } else {
      counter = 0
      for (let i=0; i<order.length; i++){
        flashOne(i, 1000)
      }
    }
  } else if (medium.is(':checked')) {
    if (order.length === 0) {
      random()
      random()
      $('.level').text('Level: '+level)
      for (i=0; i<order.length; i++){
        flashOne(i, 500)
      }
    } else {
      counter = 0
      for (i=0; i<order.length; i++){
        flashOne(i, 500)
      }
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
  }
}
// ^^^ Look at how you could refactor to:
// - Break this large `startLevel` function up into smaller functions that can be called
// from within startLevel
// - Regarding those smaller functions, think about how you could abstract some of the code
// above to be less repetive and instead rely on variable parameters. For example:
//
// } else if (hard.is(':checked')){
//   if (order.length === 0) {
//     random()
//     setLevel('hard')
//     flashSequence()
//   }
// }





function redLoad(){
  redBox.css('opacity', '1')
}
function resetRed(){
  redBox.css('opacity', '.4')
}

// function loadBox (color) {
//   if (color == 'red') {
//     redBox.css('opacity', '1')
//   } else if...
// }
//
// function resetBox (color) {
//   if (color === 'red') {
//     redBox.css('opacity', '.4')
//   } else if...
// }

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

var level = 1
function checkEqual () {
  for (i=0; i<=userInputTracker.length-1; i++) {
    if (parseFloat(userInputTracker[i]) !== parseFloat(order[i])){
      userInputTracker = []
      order = []
      counter = 0
      var score = level
      if (easy.is(':checked') && (score > parseFloat($('#easyScore').text()))){
        $('#easyScore').text(score)
      }
      if (medium.is(':checked') && (score > parseFloat($('#mediumScore').text()))){
        $('#mediumScore').text(score)
      }
      if (hard.is(':checked') && (score > parseFloat($('#hardScore').text()))){
        $('#hardScore').text(score)
      }
      level = 1
      document.getElementById('button').disabled = false
      document.getElementById('easy').disabled = false
      document.getElementById('medium').disabled = false
      document.getElementById('hard').disabled = false

      $('.lose').css('visibility', 'visible')
      $('.game').css('visibility', 'hidden')
      $('.ry').css('visibility', 'hidden')
      $('.gameBack').css('visibility', 'hidden')
      $('.game2').css('visibility', 'hidden')

      $('.level').text('Level: '+level)

    } else if (userInputTracker.length === order.length && userInputTracker[(userInputTracker.length-1)] === order[(order.length -1)]) {
      userInputTracker = []
      level+= 1
      addLevel()
      if (hard.is(':checked')){
      order = []
      for (i=1; i<= level+1; i++){
        addLevel()
      }
    }
    $('.nextLevel').css('visibility', 'visible')
    $('.game').css('visibility', 'hidden')
    $('.ry').css('visibility', 'hidden')
    $('.gameBack').css('visibility', 'hidden')
    $('.game2').css('visibility', 'hidden')
      $('.level').text('Level: '+level)
      document.getElementById('button').disabled = false
      break
    }
  }
}
// ^^^ Break up checkEqual into smaller functions and see if there is overlap with the
// new functions from breaking up `startLevel`

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

function startGame() {
  $('.startPage').css('visibility', 'hidden')
  $('.ry').css('visibility', 'visible')
  $('.game').css('visibility', 'visible')
  $('.gameBack').css('visibility', 'visible')
  $('.game2').css('visibility', 'visible')
}

function clear() {
  $('.lose').css('visibility', 'hidden')
  $('.startPage').css('visibility', 'visible')
}

function clear2() {
  $('.nextLevel').css('visibility', 'hidden')
  $('.ry').css('visibility', 'visible')
  $('.game').css('visibility', 'visible')
  $('.gameBack').css('visibility', 'visible')
  $('.game2').css('visibility', 'visible')
}

// All event listeners together at bottom of script

button.on('click', startLevel)

redBox.on('click', recordClickRed)
blueBox.on('click', recordClickBlue)
greenBox.on('click', recordClickGreen)
yellowBox.on('click', recordClickYellow)

$('.continue').on('click', clear)
$('.continue2').on('click', clear2)
$('.start').on('click', startGame)

})
