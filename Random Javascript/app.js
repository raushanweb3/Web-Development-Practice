// let maximum = parseInt(prompt("Enter the maximum number: "));

// while (!maximum) {
//     maximum = parseInt(prompt("Please enter a valid number: "));
// }

// //Generating one random number less than or equal to the maximum number
// const targetNum = Math.floor(Math.random() * maximum) +  1

// let guess = prompt("Enter your first guess!")
// let attempts = 1;

// while(parseInt(guess) !== targetNum) {
//     if(guess ==='q') break;

//     attempts++;

//     if (guess < targetNum) {
//         guess = prompt("Too low! Enter a new guess:")
//     }
//     else {
//         guess = prompt("Too high! Enter a new guess:")
//     }
// }

// if (guess ==='q') {
//     console.log("Sad to see you leave!")
// }
// else {
//     console.log(`Congratulations! YOU WIN.`)
//     console.log(`It took you ${attempts} guesses!`)
// }




// For of Loop

// const subreddits = ['cringe','books','chickens','funny','pics','soccer','gum']

// for(let sub of subreddits) {
//     console.log(`visit reddit.com/r/${sub}`)
// }


// // Square of Numbers
// const numbers = [1,2,3,4,5,6,7,8,9]; //DON'T CHANGE THIS LINE PLEASE!

// // WRITE YOUR LOOP BELOW THIS LINE:
// for(let square of numbers) {
//     console.log(square*square)
// }

//  // Iterating over objects / for In loop
//  const testScores = {
//      keenam: 80,
//      damon: 38,
//      jack: 32,
//      dorsey: 98,
//      dwayne: 79,
//      ralph: 45,
//      vonnie: 76,
//  }

// for (let person in testScores) {
//     console.log(`${person} scored ${testScores[person]}`)
// }

// console.log(Object.keys(testScores))
// console.log(Object.values(testScores))
// console.log(Object.entries(testScores))
// console.log((Object.entries(testScores)).length)


// // Creating a simple to-do Command line based app

// let input = prompt("What would you like to do?")

// // saving the input to an array
// const toDo = []

// while(input !== 'quit' && input !== 'q') {

//     if(input === 'new') {
//         let newTodo = prompt("Enter new todo")
//         toDo.push(newTodo)
//         console.log(`${newTodo} was added to your Todo`)
//     }
//     else if ( input === 'list') {
//         console.log('*************')

//         //for of loop won't work as we want to print index as well
//         for (i = 0; i < toDo.length; i++) {
//             console.log(`${i}: ${toDo[i]}`)
//         }

//         console.log('*************')
//     }
//     else if (input === 'delete') {
//         deleteId = prompt("Enter the object ID for the object you want to delete")
//         let deletedItem = toDo.splice(deleteId,1)
//         console.log('*************')
//         console.log(`Deleted ${deletedItem}`)
//         console.log("Your new array is")

//         for (i = 0; i < toDo.length; i++) {
//             console.log(`${i}: ${toDo[i]}`)
//         }

//         console.log('*************')
//     }

//     input = prompt("What would you like to do?")
// }

// console.log("Ok! Thanks for using the Todo")



// Working with functions

// //Simple function with argument

// function greet(firstName) {
//     console.log (`Hello ${firstName}! Welcome to the party.`)
// }


// function inSnakeEyes (number1, number2) {
//     if (number1 ===1 && number2 === 1) {
//         console.log('Snake Eyes!')
//     }
//     else {
//         console.log('Not Snake Eyes!')
//     }
// }


// // returning functions

// function makeBetweenFunction (min, max) {
//     return function (num) {
//         return num >= min && num <= max;
//     }    
// }



// // Methods
// const myMath = {
//     PI: 3.14,
//     square: function (num) {
//         return num * num;
//     },
//     cube(num) { // can also define function
//         return num ** 3;
//     }
// }

// // Methods 2nd exercise
// const square = {
//     area(sides) {
//         return sides * sides;
//     }, 
//     perimeter(sides) {
//         return sides * 4;
//     }
// }


// This in methods

// const cat = {
//     name: 'Billo',
//     age: '5 months',
//     sex: 'male',
//     meow() {
//         console.log(`This cat named - ${this.age} says meow`);
//     }
// }


// const hen = {
//     name: 'Helen',
//     eggCount: 0,
//     layAnEgg() {
//         this.eggCount += 1;
//         return 'EGG'
//     }
// }


// // Some other objects

// const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// const doubles = numbers.map(function(num){
//     return num * 2;
// })
//  // check by putting doubles in the console


// // DO NOT ALTER THE FOLLOWING CODE:
// const fullNames = [{first: 'Albus', last: 'Dumbledore'}, {first: 'Harry', last: 'Potter'}, {first: 'Hermione', last: 'Granger'}, {first: 'Ron', last: 'Weasley'}, {first: 'Rubeus', last: 'Hagrid'}, {first: 'Minerva', last: 'McGonagall'}, {first: 'Severus', last: 'Snape'}];

// // Write your code here

// const firstNames = fullNames.map(function(name) {
//     return name.first;
// })






// // Arrow function

// const isEven = function (num) { // normal function syntax
//     return num % 2 === 0;
// }

// const isEven = (num) => { // normal arrow function
//     return num % 2 === 0;
// }

// const isEven = num => { // can remove paranthesis around the argument only when there's a single argument
//     return num % 2 === 0;
// }

// const isEven = num => ( // can return only one value when using paranthesis
//     num % 2 === 0;
// )

// const isEven = num => num % 2 === 0; // can remove paranthesis if written in a single line 






// // empty argument in an arrow function
// const rollDie = () => {
//     let rollValue = Math.floor(Math.random() * 6 + 1);
//     return rollValue;
// }

// // Another way of writing arrow function called "IMPLICIT RETURNS"
// // Notice I didn't write return and curly brackets are replaced with paranthesis
// const rollDie = () => (
//     Math.floor(Math.random() * 6 + 1) // note this won't work with ";"
// ) // also there should be just one value that is being returned

// // Another smaller way for shorter functions
// const add = (x,y) => x + y

// // Additional code to the above function
// let rollValue = rollDie();
// while (rollValue !== 6) {
//     console.log (rollValue);
//     rollValue = rollDie();
// }
// console.log (`Finally, we got a ${rollValue}`);


// Set Timeout and Set Interval

// // set timeout calls any function after specified time
// setTimeout(() => {
//     console.log('hello');
//     }, 3000);

// // Note this won't work without a function as it will be immediately executed as there is nothing to call just a step for execution
// setTimeout(console.log('not a function'), 3000);

// // setInterval helps to repeat a call at a regular interval
// setInterval( () => {
//     console.log(Math.random())
// }, 1000);

// // Stopping setInterval
// const id = setInterval( () => {
//     console.log(Math.random())
// }, 3000);

// // to start call id in the console
// // to stop call clearInterval(id)


// Filters - creates a new filter basis a criteria.. Remember the output of criteria must be a boolean

// filter exercise
// const validUserNames = (array => {
//     return validUserNames.filter(array.length < 10);    
// }

// myArray = ['sjdjkfdhg','skhdg','shdgkhsghdkgk','kjgdsgkjgdks','jbshd','dhs','dshg','sdgyfegdgi']

// const validUserNames = (array) => {
//     const filteredArray = array.filter(user => {
//         return user.length < 10;
//     })
//     return filteredArray;
// }

// // coding exercise 50
// const allEvents = inputArray => (
//     inputArray.every(num => num % 2 === 0)
// )

// function greet(msg = 'Duh', name) {
//     console.log(`${msg}, ${name}`)
// }


// Spreads - refer MDN docs

// const nums = [1,2,4,67,34,76,65,56,23,76,871,8875,23,89,7]
// console.log(...nums)

// cats = ['kitty', 'queen', 'fluffy', 'billo']
// dogs = ['doggo', 'cuddle', 'mau', 'bow' ]

// console.log(...cats, ...dogs)

// console.log(...'Hello')

// same works for objects as well




// // Argument and Rest 


// function sum() {
//     console.log(arguments) // although the output looks like array, it's not an array
// }
// Remember arguments don't work on arrow functions

// for example let's try to sum things up in the above function
// function sum() {
//     return arguments.reduce ((total,num) => total + num)
// }
// this doesn't work. Because arguments is not an array

// let's now try rest which is done by 3 dots before an argument
// function sum (...num) {
//     return num.reduce((total,currentNum) => total + currentNum)
// }
// collects the rest of the parameters. Like collect the rest of the parameters
// let's see an example
// function raceResults (gold, silver, ...others) {
//     console.log (`Gold goes to ${gold}!`)
//     console.log (`Silver goes to ${silver}!`)
//     console.log (`Thanks everyone for participating: ${others}!`)
// }


// // Destructuring from arrays
// const scores = [7346,2634,54897,58746,1254,67878,1254,4576,4376];
// // Destructuring is order wise. Meaning the first value goes into the first name, second into the second and so on. We can also use 'rest' method along wth destructuring (refer example below)
// const [firstNum, secondNum, ...allOtherNums] = scores;

// Destructuring for objects - more important
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};

// // method one
// const nameOfThePerson = person.firstName;
// const familyName = person.lastName;
// const yearsLivedOnPlanet = person.age;

// console.log(`The name of the person is ${nameOfThePerson}.`);
// console.log(`He belongs to the ${familyName} family.`);
// console.log(`and he has lived ${yearsLivedOnPlanet} years on this planet.`);

// // method two
// const {firstName, lastName, age} = person;
// console.log(`The name of the person is ${nameOfThePerson}.`);
// console.log(`He belongs to the ${familyName} family.`);
// console.log(`and he has lived ${yearsLivedOnPlanet} years on this planet.`);

// // method three
// const {firstName: nameOfThePerson, lastName: familyName, age: yearsLivedOnPlanet} = person;
// console.log(`The name of the person is ${nameOfThePerson}.`);
// console.log(`He belongs to the ${familyName} family.`);
// console.log(`and he has lived ${yearsLivedOnPlanet} years on this planet.`);

// // method four
// const {firstName: nameOfThePerson, lastName: familyName, age: yearsLivedOnPlanet, nickName = 'JD'} = person;
// console.log(`The name of the person is ${nameOfThePerson}.`);
// console.log(`He belongs to the ${familyName} family.`);
// console.log(`and he has lived ${yearsLivedOnPlanet} years on this planet.`);
// console.log(`More commonly known as ${nickName}`);


// Check destructuring objects as well




































