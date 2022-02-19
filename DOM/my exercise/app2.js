// const input = document.querySelector('#username')
// const heading = document.querySelector('h1')

// input.addEventListener('input', function (e) {
//     heading.innerText = input.value;
// })











// // Prevent Default Exercise

// const product = document.querySelector('#product');
// const qty = document.querySelector('#qty');
// const prodForm = document.querySelector('#prodForm');

// prodForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const addedValue = `${qty.value} ${product.value}`;

//     const newLi = document.createElement('LI');
//     newLi.innerText = addedValue;
//     console.log(newLi);

//     list.append(newLi);

//     product.value = "";
//     qty.value = "";

// })









// // prevent Event to happen - creating ToDo List

// const toDoList = document.querySelector('#toDo');
// const input = document.querySelector('#toDoInput');
// const inputArrays = [];

// toDoList.addEventListener('submit', function (e) {
//     e.preventDefault(); // prevents default behavior

//     // create  a new Li element and assign the value to it
//     const newLi = document.createElement('LI');
//     newLi.innerText = input.value

//     // append the value in the main document
//     allToDos.append(newLi);

        
//     input.value = "";
// })

// const makeRandColor = () => {
//     let r = Math.floor(Math.random() * 255) + 1;
//     let g = Math.floor(Math.random() * 255) + 1;
//     let b = Math.floor(Math.random() * 255) + 1;

//     return `rgb(${r},${g},${b})`
// }

// buttonElement = document.querySelectorAll('button')

// for (let buttons of buttonElement) {
//     buttons.addEventListener('click', () => {
//         buttons.style.backgroundColor = makeRandColor();
//         buttons.style.color = makeRandColor();
//     })

// }


// for (let buttons of buttonElement) {
//     buttons.addEventListener('click', function () { // 'this' doesn't work with arrow function
//         this.style.backgroundColor = makeRandColor();
//         this.style.color = makeRandColor();
//     })
// }



for (let buttons of buttonElement) {
    buttons.addEventListener('click', colorize)
}

function colorize() {
    this.style.backgroundColor = makeRandColor();
    this.style.color = makeRandColor();
}












// for (let buttons in buttonElement) {
    
//     let selectButton = buttonElement[buttons];
//     // selectButton.innerText = `Button ${parseInt(buttons) + 1}`;
    
//     selectButton.addEventListener('click', () => {
//         console.log('hi')
//     })

//     // console.log(selectButton.innerText)


//     // selectButton.addEventListener('click', () => {
//     //     let randomNum = Math.floor(Math.random() * 255) + 1;
//     //     console.log(randomNum)
//     // })
// }


// buttonElement[3].addEventListener('click', () => {
//     let randomNum = Math.floor(Math.random() * 255) + 1;
//     console.log(randomNum)
// })