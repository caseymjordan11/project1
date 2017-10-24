const button = $('#button')
button.on('click', startLevel)
const redBox = $('.game #red')
const blueBox = $('.game #blue')
const greenBox = $('.game #green')
const yellowBox = $('.game #yellow')

function startLevel () {
  redBox.css('background', 'red')
  blueBox.css('background', 'blue')
  yellowBox.css('background', 'yellow')
  greenBox.css('background', 'green')
}
