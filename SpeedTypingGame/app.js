const randomQuoteApiUrl = 'http://api.quotable.io/random'

const qouteDisplayElement = document.getElementById('qouteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

const restartButton = document.getElementById('restartButton')


quoteInputElement.addEventListener('input', () =>{
    const arrayQuote = qouteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let complete = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('wrong')
            complete = false
        } else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('wrong')
        } else {
            characterSpan.classList.add('wrong')
            characterSpan.classList.remove('correct')
            complete = false
        }
    })
    if(complete) {
        renderNewQuote()
    }
})

function getRandomQuote() {
    return fetch(randomQuoteApiUrl)
    .then(response => response.json())
    .then(data =>data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    console.log(quote)
    qouteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        qouteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = `${getTimerMinute()}:${getTimerSecond()%60}`
    }, 1000)
}

function getTimerSecond(){
    return Math.floor((new Date() - startTime)/1000)
}

function getTimerMinute(){
    return Math.floor((new Date() - startTime)/60000)
}

renderNewQuote()