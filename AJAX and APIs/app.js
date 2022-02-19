// AXIOS using to get headers in APIs

const jokeClick = document.querySelector('button');
const jokeList = document.querySelector('#jokes');
const selectSpan = document.querySelector('span');

// Replacing text with new joke
const jokePrint = async() => {
    const jokeText = await getDadJokes()
    selectSpan.innerText = jokeText
}


// const jokePrint = async() => {
//     const jokeText = await getDadJokes()
//     let newLi = document.createElement('LI')
//     newLi.append(jokeText)
//     jokeList.append(newLi)
// }

const getDadJokes = async () =>{
    const config = {headers: {Accept: 'application/json'}}
    const res = await axios.get('https://icanhazdadjoke.com/', config)
    // console.log(res.data.joke)
    return res.data.joke;
}

jokeClick.addEventListener('click', () => {
    jokePrint()
})

// tellJoke.addEventListener('click', () => {
//     const newLI = document.createElement('LI')
//     newLI.append(jokeText)
//     jokeSec.append(newLI)
// })

// // AXIOS - A library for making HTTP requests

// axios.get ('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then(res => {
//         console.log(res.data.ticker.price)
//     })
//     .catch(err =>{
//         console.log(`Error is: ${err}`)
//     })




// // Using async with fetch api

// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd')
//         const data = await res.json()
//         console.log(data.ticker.price)
//     } catch {
//         console.log('something went wrong!')
//     }
// }

// fetchBitcoinPrice()








// // Fetch API

// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
// .then ( res => {
//     console.log('Response, waiting to parse....', res)
//     return res.json()
// })
// .then( data => {
//     console.log ('data parsed')
//     console.log(data.ticker.price)
//     console.log(data)
// })
// .catch(err => {
//     console.log("oh No", err)
// })