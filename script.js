const button = $('#button')
button.on('click', startLevel)
const redBox = $('.game #red')
const blueBox = $('.game #blue')
const greenBox = $('.game #green')
const yellowBox = $('.game #yellow')

var order = []
function random(){
  for (i=0; i<4; i++) {
  var num = Math.floor(Math.random()*4)
  order.push(num)
  }
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

function startLevel () {
  random()
  flash[keys[order[0]]]()
  setTimeout(flash[keys[order[1]]], 800)
  setTimeout(flash[keys[order[2]]], 1500)
  setTimeout(flash[keys[order[3]]], 2200)
  console.log(order)
  order = []
}





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
