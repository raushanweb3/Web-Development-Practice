const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

// Router setup
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

// Mongoose setup
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Yelp database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// using routers
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);


app.get('/', (req, res) => {
    res.render('home');
})

//app.all('*') is used for every request. This will only run when nothing else matches. Also, order of this block of code is very important.
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//handling async errors
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
    // res.send('Oh Boy, something went wrong!')
})

app.listen(3000, () => {
    console.log('Connected to Yelp Camp via Port 3000!!');
})