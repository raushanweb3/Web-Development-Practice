const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');

const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const reset = document.querySelector('#reset');

let maxScore = document.querySelector('#maxScore')
let numRounds = 0;

let p1Score = parseInt(p1Display.innerText);
let p2Score = parseInt(p1Display.innerText);


// maxScore.addEventListener('click', function () {
//     let maxScoreNum = parseInt(maxScore.value);    
//     console.log(`Max rounds = ${maxScoreNum}`)
// })


// Player 1s code
p1Button.addEventListener('click', function (e) {
    if (parseInt(maxScore.value) > 0) {
        p1Score += 1;
        p1Display.innerText = p1Score;
    }
    else {p1Button.setAttribute("class", "disabledButton") }

})


// Player 2s code - replicate from player 1
p2Button.addEventListener('click', function (e) {
    p2Score += 1;
    p2Display.innerText = p2Score;
})

reset.addEventListener('click', function (e) {
    p1Score = 0;
    p2Score = 0;
    p1Display.innerText = p1Score;
    p2Display.innerText = p2Score;
})
