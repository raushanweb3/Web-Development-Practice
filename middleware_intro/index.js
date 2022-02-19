const express = require('express');
const app = express();
const morgan = require('morgan');

morgan('tiny'); // any of these would work
// morgan('common'); // any of these would work

const verifyPassword = (req,res,next) => {
    const {password} = req.query;
    if( password === 'chickennugget') {
        next();
    } else {
        res.send('Please enter a valid password')
    }
}

app.get('/', (req,res) => {
    res.send('home page');
})

app.get('/dogs', (req,res) => {
    res.send('woof woooofff!!!');
})

app.get('/secret', verifyPassword, (req,res) => {
    res.send("I don't wanna tell you the secret!")
})


app.listen(3000, () => {
    console.log('Listening to port 3000!!')
})