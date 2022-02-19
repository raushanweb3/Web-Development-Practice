const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, '/public')))

// set the view engine to ejs
app.set('view engine', 'ejs'); // we don't need to require. Express behind the scene will require it automatically

app.set('views', path.join(__dirname, '/views'))

// By default when creating view engine we need to specify views directory so create that

app.get('/', (req,res) => {
    // res.send('Welcome to my homepage!')
    res.render('home.ejs') // will look by default in the views directory
})

app.get('/rand', (req,res) => {
    const randNum = Math.floor(Math.random() * 10) + 1
    // res.render('random', {rand: randNum}) // Don't need to add the ejs file extension
    res.render('random', { randNum }) // can directly use this as well. change the ejs file with same randNum variable
})

// Intermediate: adding variable to the body of our website and using data.json file
app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit})
    }
    
})

// // Basic adding variable to the body of our website
// app.get('/r/:subreddit', (req,res) => {
//     const { subreddit } = req.params;
//     res.render('subreddit', { subreddit })
// })

// Adding loops for cats
app.get('/catnames', (req,res) => {
    const cats = ['Daisy', 'Kittie', 'Pawie', 'Blocks', 'Catty']
    res.render('catNames' , { cats });
})

app.get('/random', (req,res) => {
    const randNum = Math.floor(Math.random() * 10 + 1);
    res.render('random', { randNum });
})

app.listen(3000, () => {
    console.log('Starting port 3000')
})

