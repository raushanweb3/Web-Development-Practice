// including the .env file. Runs by default in development mode
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
// for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


// Router setup
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

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

// using express session while passing a configuration and adding a cookie
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: { // adding fancier options for cookies
        
        // security setup
        httpOnly: true, // more details: 1) lec 489 and 2) https://owasp.org/www-community/HttpOnly

        // cookie expiry date and max age
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //date.now gives values in miliseconds,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig)); // this must be called before calling passport's app.use

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // Using the public directory for static

// using flash for showing popup messages like thank you for registering etc
app.use(flash());


//////////////////////////////////////////////////////////////

// defining passport use
// this comes from - https://www.npmjs.com/package/passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // check passport-local-mongoose docs for details on this - https://www.npmjs.com/package/passport-local-mongoose

passport.serializeUser(User.serializeUser()); // serializeUser() Generates a function that is used by Passport to serialize (store) users into the session
passport.deserializeUser(User.deserializeUser()); // deserializeUser() Generates a function that is used by Passport to deserialize (taking out) users into the session.

///////////////////////////////////////////////////////////////

// defining middleware for flash
// define before any of the route handlers
// and after initializing use passport related commands
app.use((req,res,next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user; // coming from passports
    // console.log(res.locals.currentUser)
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//////////////////////////////////////////////////////////////

// using routers
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

// // testing the passport routes
// app.get('/fakeUser', async (req,res) => {
//     const user = new User({
//         email: 'raushan@yelp.com',
//         username: 'raushannn'
//     })
//     const newUser = await User.register(user, 'chicken');
//     res.send(newUser);
// })

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