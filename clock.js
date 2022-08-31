//DOM elements
const buttons = document.querySelectorAll('.btn')
const startBtn = document.getElementById('start')
const finishBtn = document.getElementById('finish')
const clearBtn = document.getElementById('clear')
const message = document.getElementById('message')
let canvas = document.getElementById('canvas')
let canvas1 = document.getElementById('canvas1')


//contexts
let ctx = canvas.getContext('2d')
let ctx1 = canvas1.getContext('2d') 
ctx1.globalAlpha = 0.4


//global time variables
let time = new Date()
let seconds = time.getSeconds()
let minutes = time.getMinutes()
let hours = time.getHours()

//radius for canvas elements
let radius = canvas.height / 2
let radius1 = canvas1.height / 2
ctx.translate( radius, radius )
ctx1.translate( radius1, radius1 )

//drawing clocks functions
function drawClock(){
    drawFace( ctx, radius )
    ctx.clearRect( -radius, -radius, canvas.width, canvas.height)
    drawHands( ctx, radius )
}

function drawSecondClock(){
    drawHands(ctx1, radius1)
}


// logic for drawing clocks
function drawFace( ctx, radius ){
    //drawing face of the clock
    let image = new Image()
    image.addEventListener( 'load', () =>{
        ctx.drawImage( image, -radius, -radius)
    }, false)
    image.src = 'clock.png'
    //drawing small circle
    ctx.beginPath()
    ctx.arc(0, 0, radius * 0.03, 0, 2 * Math.PI)
    ctx.fill()
}

function drawHands( ctx, radius ){
    time = new Date()
    seconds = time.getSeconds()
    minutes = time.getMinutes()
    hours = time.getHours()
    //drawing hours hand
    hours = hours % 12
    hours = ( hours * Math.PI / 6 ) + ( minutes * Math.PI / ( 6 * 60 ) ) + ( seconds * Math.PI / ( 360 * 60 ) )
    drawHand( ctx, hours , radius * 0.5, radius * 0.04, 'black' )

    //drawing minutes hand
    minutes = (minutes * Math.PI / 30 ) + ( seconds * Math.PI / (30 * 60) )
    drawHand( ctx, minutes , radius * 0.8, radius *0.03, 'black' )

    //drawing seconds hand
    seconds = seconds * Math.PI / 30
    drawHand( ctx, seconds, radius * 0.9, radius *0.02, 'red' )
}


function drawHand ( ctx, position, lenght, width, style ){
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.strokeStyle = style
    ctx.moveTo( 0, 0 )
    ctx.rotate( position )
    ctx.lineTo( 0, -lenght )
    ctx.stroke()
    ctx.closePath()
    ctx.rotate( -position )
}

//toggling active buttons
function removeAllButtons (){
    buttons.forEach( button => button.classList.remove('active'))
}

//buttons event listeners
let startTime
let fininshTime
let passedTime

startBtn.addEventListener('click', () =>{
    drawSecondClock()
    removeAllButtons()
    message.innerHTML = 'Time counting has started!  <br>  <small>Click the button to stop the counting</small>'
    buttons[1].classList.add('active')
    startTime = time.getTime()
})

finishBtn.addEventListener('click', () => {
    drawSecondClock()
    removeAllButtons()
    fininshTime = time.getTime() 
    passedTime = fininshTime - startTime
    //converting milliseconds 
    let seconds = Math.floor((passedTime / 1000) % 60)
    let minutes = Math.floor((passedTime / (1000 * 60)) % 60)
    let hours = Math.floor((passedTime / (1000 * 60 * 60)) % 24)
    seconds = (seconds < 10) ? '0' + seconds : seconds 
    minutes = (minutes < 10) ? '0' + minutes : minutes 
    hours = (hours < 10) ? '0' + hours : hours

    message.innerHTML = `Since the previous activation a total of:  <b>${hours} </b> hours, <b> ${minutes}</b> minutes and <b>${seconds}</b> seconds have passed. <br> <small>Click the button to clear the clock and start over</small> `
    buttons[2].classList.add('active')
})


clearBtn.addEventListener('click', () =>{
    ctx1.clearRect( -radius1, -radius1, canvas1.width, canvas1.height)
    removeAllButtons()
    message.innerHTML = ''
    buttons[0].classList.add('active')
})


// on page load start drawing main clock
setInterval( drawClock, 1000)