const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('ThisIsMySecretForSigningCookies'));

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`HEY THERE, ${name}!!`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Harley Quinn');
    res.cookie('fisheater', 'Harley Quinn Shrimp');
    res.send('SENT YOU A COOKIE!!!')
})

// Signing cookies
app.get('/getsignedcookies', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    res.send('SIGN your fruit cookie')
})

app.get('/verifyfruit', (req,res) => {
    console.log(req.cookies);
    // res.send(req.cookies);
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log('COOKIE SERVER RUNNING ON 3000!!!');
})