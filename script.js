const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $result_header = document.querySelector('#result-header')
const $time_header = document.querySelector('#time-header')
const $result = document.querySelector('#result')
const $time = document.querySelector('#time')
const $game_time = document.querySelector('#game-time')
const $signUpBtn = document.querySelector('#signUpBtn')
const $signUp = document.querySelector('#signUp')
const $formGroup = document.querySelector('.formGroup')
const $bodyGame = document.querySelector('.bodyGame')
const $appResult = document.querySelector('.app__result')
const $exit = document.querySelector('#exit')
const $btnSort = document.querySelector('#btnSort')
let score = 0
let userName = ''
let personObject = {}
let personArray =  []

$start.addEventListener('click',startGame)

function startGame(){
    $game_time.setAttribute('disabled','true')
    $time.textContent = $game_time.value
    score=0
    $start.classList.add('hide')
    $game.style.backgroundColor = 'white'
    createBox()
    timer()
    $result_header.classList.add('hide')
    $time_header.classList.remove('hide')
    $exit.classList.add('hide')
}

$game_time.addEventListener('input', setTime)

function setTime(){
    $time.textContent = $game_time.value
    $result_header.classList.add('hide')
    $time_header.classList.remove('hide')
}

function endGame(){
    $game.innerHTML=''
    $start.classList.remove('hide')
    $game.style.backgroundColor = '#ccc'
    $result_header.classList.remove('hide')
    $time_header.classList.add('hide')
    $result.textContent = score
    $game_time.removeAttribute('disabled')
    $exit.classList.remove('hide')
    personArray = []
    personObject.name = userName
    personObject.score = score
    personObject.gameTime = $game_time.value
    personObject.totalScore = (score / $game_time.value).toFixed(1)
    personObject.data = new Date().toLocaleString()
    personArray.push(personObject)
    for(i=0;i < personArray.length;i++) {
        $appResult.insertAdjacentHTML('beforeend' , `<div class="user"><h2>${personArray[i].name}</h2><h2>${personArray[i].score}</h2><h2>${personArray[i].gameTime}</h2><h2>${personArray[i].totalScore}</h2><h4 >${personArray[i].data}</h4></div`)
    }
   
    
}

function timer(){
    let $time = document.querySelector('#time')
    let interval = setInterval(function(){
        $time.textContent = (Number($time.textContent)-0.1).toFixed(1)
        if($time.textContent <= 0){
            clearInterval(interval)
            endGame()
        }
    },100)

}

$game.addEventListener('click', clickBox)
function clickBox(event){
    if(event.target.dataset.box){
        createBox()
        score++
    }
}

function createBox(){
    $game.innerHTML=''
    let box = document.createElement('div')
    let sizeBox = getRandom(30,100)
    let left = getRandom(0,300-sizeBox)
    let top = getRandom(0,300-sizeBox)
    box.style.width = box.style.height = sizeBox + 'px'
    box.style.backgroundColor = `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`
    box.style.position = 'absolute'
    box.style.left = left + 'px'
    box.style.top = top + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box',true)

    $game.insertAdjacentElement('afterbegin',box)

}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }



  $signUpBtn.addEventListener('click' , function() {
      if ($signUp.value) {
            console.log("yes")
            $formGroup.classList.add('hide')
            $bodyGame.classList.remove('hide')
            $exit.classList.add('hide')
            userName = $signUp.value
      } else {
          alert("Name")
      }
  })

  $exit.addEventListener('click' , function() {
    $formGroup.classList.remove('hide')
    $bodyGame.classList.add('hide')
  })

