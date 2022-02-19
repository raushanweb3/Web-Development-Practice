// const franc = require("franc");
// var langs = require('langs');

// require is not working in newer version of franc. Also, can't use import for franc and require for langs. Have to use one.
import { franc, francAll } from 'franc'
import langs from 'langs'
import colors from 'colors'

// Taking input as the sentence instead of hard coding
const inputText = process.argv[2];

try {
    // finding language shortform
    const shortLang = franc(inputText);

    // using langs package to get the name of the function
    const detectedLang = langs.where("3", shortLang);
    console.log(detectedLang.name.cyan); // try running without .name and you will find why I've included .name
} catch (e) {
    const errFound = `This is what went wrong: 
    ------------------------------
    ${e}`;
    console.log(errFound.brightRed)
}
