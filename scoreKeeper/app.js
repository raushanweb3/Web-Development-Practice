const p1Display = document.querySelector('#p1Display')
const p2Display = document.querySelector('#p2Display')
const resetButton = document.querySelector('#resetButton')
const playTo = document.querySelector('#playTo')

const p1Button = document.querySelector('#p1Button')
const p2Button = document.querySelector('#p2Button')

let winningScore = 0;
let p1Score = 0;
let p2Score = 0;

let isGameOver = false;

p1Button.addEventListener('click', function () {
    if (!isGameOver && playTo.value !== '0') {
        p1Score += 1
        if (p1Score === winningScore) {
            isGameOver = true
            p1Display.classList.add('winnerText')
            p2Display.classList.add('loserText')

            p1Button.setAttribute('disabled', '')
            p2Button.setAttribute('disabled', '')
        }
        p1Display.textContent = p1Score
    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver && playTo.value !== '0') {
        p2Score += 1
        if (p2Score === winningScore) {
            isGameOver = true
            p2Display.classList.add('winnerText')
            p1Display.classList.add('loserText')

            p1Button.setAttribute('disabled', '')
            p2Button.setAttribute('disabled', '')

        }
        p2Display.textContent = p2Score
    }

})

playTo.addEventListener('change', function () {
    winningScore = parseInt(playTo.value)
    resetFunction()
})

resetButton.addEventListener('click', resetFunction)

function resetFunction() {
    p1Score = 0
    p2Score = 0
    p1Display.textContent = p1Score
    p2Display.textContent = p2Score
    isGameOver = false
    p2Display.classList.remove('winnerText', 'loserText')
    p1Display.classList.remove('winnerText', 'loserText')

    p1Button.removeAttribute('disabled', '')
    p2Button.removeAttribute('disabled', '')
}