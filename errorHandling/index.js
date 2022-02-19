const express = require('express');
const AppError = require('./AppError')
const app = express();

// app.use((req,res) => {
//     res.status(404).send('NOT FOUND');
// })

app.get('/', (req, res) => {
    res.send('Home Page: Error Handling');
})

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError('Password Required', 401);
    // res.send('Password required');
    // throw new Error('Password Required!') // Me throwing an error
}

app.get('/secret', verifyPassword, (req, res) => {
    res.send('<h1>Welcome to a secret page</h1>');
})

app.get( '/admin' ,(req,res) => {
    throw new AppError('Admin permissions required', 403)
})

app.get('/error', (req,res) => {
    Chicken.fly(); // Express throws its own error
})

// app.use((err, req,res,next) => {
//     console.log('*******************************************************')
//     console.log('******************ERROR***********************')
//     console.log('*******************************************************')
//     // res.status(500).send('Oh boy! Got an error!')
//     // console.log(err)
//     next(err)
// })

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something Went Wrong'} = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Listening to port 3000: Error Handling!');
})