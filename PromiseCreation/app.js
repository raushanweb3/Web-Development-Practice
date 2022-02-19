// // ASYNC + AWAIT + Error handling

// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const delay = Math.random()
//         setTimeout(() => {
//             if(delay > 0.8) {
//                 reject('Connection Timeout')
//             } else {
//                 resolve(`Here's your fake data ${url}`)
//             }
//         }, delay);
//     })
// }

// async function makeTwoRequests() {
//     try {
//         let data1 = await fakeRequest('/page1')
//         let data2 = await fakeRequest('/page2')
//         console.log(data1);
//         console.log(data2);
//     } catch (e) {
//         console.log(`Caught an error ${e}`)
//     }
// }


// // will use ASYNC and AWAIT keywords a lot

// const delayedColorChange = (color, delay) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             document.body.style.backgroundColor = color;
//             resolve();
//         }, delay);
//     })
// }

// async function rainbow() {
//     await delayedColorChange('red', 1000)
//     await delayedColorChange('orange', 1000)
//     await delayedColorChange('yellow', 1000)
//     await delayedColorChange('green', 1000)
//     await delayedColorChange('blue', 1000)
//     await delayedColorChange('indigo', 1000)
//     await delayedColorChange('violet', 1000)
//     console.log('All Done')
// }

// // rainbow().then(() => console.log('End of Rainbow')) // or I can do the following

// async function printRainbow() {
//     await rainbow();
//     console.log('End of Rainbow')
// }









// // ASYNC functions v2

// const login = async(username, password) => {
//     if (!username || !password) throw 'Missing Credentials'
//     if (password ==='raushan') return 'successful'
//     throw 'Invalid Password'
// }

// login('adskhgfkdh','raushan')
//     .then(msg => {
//         console.log(`Logging in ${msg}`)
//     })
//     .catch(err => {
//         console.log(`Error due to ${err}`)
//     })









// ASYNC FUNCTIONS


// const sing = async () => {
//     throw new Error('Oh no, ERROR!') // if we throw an error, promise is rejected
//     // return 'La la la laaaa' // if we return something then the promise is resolved
// }

// sing()
//     .then((data) => {
//         console.log('Promise resolved with: ', data)
//     })
//     .catch((err) => {
//         console.log(`Promise rejected with: ${err}`)
//     })








// // Color change using promise


// const delayedColorChange = (color, delay) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             document.body.style.backgroundColor = color;
//             resolve();
//         }, delay);
//     })
// }


// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('red', 1000))
//     .then(() => delayedColorChange('violet', 1000))
//     .then(() => delayedColorChange('blue', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
    

// // Basic Promise


// const fakeRequest = (url) => {
//     return new Promise((resolve,reject) => {
//         const rand = Math.random()
//         setTimeout(() => {
//             if(rand >0.6) {
//                 resolve('Good one');
//             }
//             reject('Sorry rahega')
//         }, 1000);
//     })
// }

// fakeRequest('/dogs/url/1')
//     .then((data) => {
//         console.log(`Done with the request ${data}`)
//     })
//     .catch((err) => {
//         console.log(`Oh No...${err}`)   
//     })