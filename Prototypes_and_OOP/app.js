// // 'super' functionality
// // 'extends' functionality to remove duplicacy accross classes
class pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating`;
    }
}

class cat extends pet {
    constructor(name, age, livesLeft=9) {
        super(name, age); // super is used to add up components to the constructor
        this.livesLeft = livesLeft;    
    }
    meow() {
        return `${this.name} meows!`;
    }
}

class dog extends pet {
    bark() {
        return `${this.name} says Woof...`
    }
    eat() {
        return `${this.name} eats from here and not from pet.`
    }
}


// // even better method than basic constructor function
// class Colors {
//     constructor(r, g, b, name) { //runs immediately as soon as we call the parent function
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.name = name;
//     }
//     hex() {
//         const { r, g, b } = this;
//         return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//     }
//     // Further simplifying rgb and rgba
//     innerRgb() {
//         const { r, g, b } = this;
//         return `${r}, ${g}, ${b}`;
//     }
//     rgb() {
//         return `rgb(${this.innerRgb()})`;
//     }
//     rgba(a = 1) {
//         return `rgba(${this.innerRgb()}, ${a})`;
//     }

//     // rgb() {
//     //     const { r, g, b } = this;
//     //     return `rgb(${r}, ${g}, ${b})`;
//     // }
//     // rgba(a=1) {
//     //     const { r, g, b } = this;
//     //     return `rgba(${r}, ${g}, ${b}, ${a})`;
//     // }

// }

// const c1 = new Colors(223, 43, 21, 'tomato');


// // Constructor based factory function
// // Avoids the necessity of making functions again and again inside a factory function
// // when we call a function with new, the functions behaves differently. It creates an object on the function
// // new does the following:
//     // - creates a blank, plain JavaScript object
//     // - Links (sets the constructor of) this object to another object
//     // - Passes the newly created object from step 1 as the 'this' context
//     // - Returns this if the function doesn't return its own object
// // example 1:
// // function Color (r,g,b) {  // using capital letter to denote a constructor function. Not a compulsion
// //     this.r = r;
// //     this.g = g;
// //     this.b = b;
// // }
// // Color(234,43,29) // try running this and it'd NOT work
// // new Color(234,43,29) // try running this and it'd work

// // So writing the below function using constructor factory approach
// function Colors(r,g,b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Colors.prototype.rgb = function() {
//     const {r,g,b} = this;
//     return `rgb(${r}, ${g}, ${b})`
// }

// Colors.prototype.hex = function() {
//     const {r,g,b} = this;
//     return '#' + ((1<<24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

// Colors.prototype.rgba = function(a=1.0) {
//     const {r,g,b} = this;
//     return `rgba(${r}, ${g}, ${b}, ${a})`
// }

// color1 = new Colors(0, 68, 255);
// color2 = new Colors(255, 8, 0);

// // General factory function
// function makeColor(r,g,b) {
//     const colors = {};
//     colors.r = r;
//     colors.g = g;
//     colors.b = b;

//     colors.rgb = function () {
//         // const {r,g,b} = this;
//         return `rgb(${r}, ${g}, ${b})`
//     }

//     colors.hex = function () {
//         // const {r,g,b} = this;
//         return '#' + ((1<<24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//     }

//     return colors;
// }