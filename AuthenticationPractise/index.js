/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// with login middleware


const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/authenticationPractice');
}

////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

///////////////////////////////////////////////////////////////

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true
}));

///////////////////////////////////////////////////////////////
// setting up login middleware

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

///////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('Home')
})

///////////////////////////////////////////////////////////////
// Register or sign up functionality

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    // we don't want to directly save the password.
    // we'll use bcrypt to just save the hash in our database
    const { password, username } = req.body;

    // const hash = await bcrypt.hash(password, 12);
    // const user = new User({
    //     username,
    //     password: hash
    // })
    // method2: instead of hashing here and then saving, we can add a middleware in user model or schema. The middleware calls performs the hashing just before saving.

    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id; // login cookie data
    res.redirect('/');
})

///////////////////////////////////////////////////////////////
// login functionality

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { password, username } = req.body;
    const foundUser = await User.findAndValidate(username, password)

    // // finding username in our database
    // const user = await User.findOne({ username });
    // const validPwd = await bcrypt.compare(password, user.password);
    // if (user && validPwd) {

    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.render('secret');
    } else {
        res.redirect('/login');
    }
})

///////////////////////////////////////////////////////////////
// setting up the logout functionality

app.post('/logout', (req, res) => {
    // req.session.user_id = null; // method 1 of ending a session
    req.session.destroy(); // another method of ending a session
    res.redirect('/login');
})

///////////////////////////////////////////////////////////////

app.get('/secret', requireLogin, (req, res) => {
    // if (!req.session.user_id) {
    //     return res.redirect('/login'); //returning because we don't want both of these steps to happen at the same time by any chance
    // }
    res.render('secret')
});

app.get('/topsecret', requireLogin, (req, res) => {
    res.send('<h1>Ultra secret information!</h1>')
})

///////////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log('Authentication practice server running on port 3000!!')
})























///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// // without login middleware

// const express = require('express');
// const app = express();
// const User = require('./models/user');
// const path = require('path');
// const bcrypt = require('bcrypt');
// const session = require('express-session');

// // Mongoose
// const mongoose = require('mongoose');
// main().catch(err => console.log(err));
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/authenticationPractice');
// }

// ////////////////////////////////////////////////////////////////

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// ///////////////////////////////////////////////////////////////

// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'notagoodsecret',
//     resave: false,
//     saveUninitialized: true
// }));

// ///////////////////////////////////////////////////////////////

// app.get('/', (req, res) => {
//     res.send('Home')
// })


// ///////////////////////////////////////////////////////////////
// // Register or sign up functionality

// app.get('/register', (req, res) => {
//     res.render('register')
// })

// app.post('/register', async (req, res) => {
//     // we don't want to directly save the password.
//     // we'll use bcrypt to just save the hash in our database
//     const { password, username } = req.body;
//     const hash = await bcrypt.hash(password, 12);
//     const user = new User({
//         username,
//         password: hash
//     })
//     await user.save();
//     req.session.user_id = user._id; // login cookie data
//     res.redirect('/');
// })

// ///////////////////////////////////////////////////////////////
// // login functionality

// app.get('/login', (req, res) => {
//     res.render('login');
// })

// app.post('/login', async (req, res) => {
//     const { password, username } = req.body;

//     // finding username in our database
//     const user = await User.findOne({ username });
//     const validPwd = await bcrypt.compare(password, user.password);

//     if (user && validPwd) {
//         req.session.user_id = user._id;
//         res.render('secret');
//     } else {
//         res.redirect('/login');
//     }
// })

// ///////////////////////////////////////////////////////////////
// // setting up the logout functionality

// app.post('/logout', (req,res) => {
//     // req.session.user_id = null; // method 1 of ending a session
//     req.session.destroy(); // another method of ending a session
//     res.redirect('/login');
// })

// ///////////////////////////////////////////////////////////////

// app.get('/secret', (req, res) => {
//     if (!req.session.user_id) {
//         return res.redirect('/login'); //returning because we don't want both of these steps to happen at the same time by any chance
//     }
//     res.render('secret')
// });

// ///////////////////////////////////////////////////////////////

// app.listen(3000, () => {
//     console.log('Authentication practice server running on port 3000!!')
// })
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////

