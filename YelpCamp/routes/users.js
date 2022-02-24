const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


///////////////////////Registration Route///////////////////////

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    // res.send(req.body); // for testing purpose

    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);

        // logging in the user after registration
        req.login(registeredUser, err => {
            if (err) return next(err);
            //otherwise do the following
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        }); // requires callback, can't await
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}))


///////////////////////Login Route///////////////////////

router.get('/login', (req, res) => {
    res.render('users/login')
});

const authenticateConfig = {
    failureFlash: true,
    failureRedirect: '/login'
}

router.post('/login', passport.authenticate('local', authenticateConfig), async (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // after saving where to redirect - delete the session saved in return to
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

///////////////////////Logout Route///////////////////////

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out! See you again.')
    res.redirect('/campgrounds');
})

////////////////////////////////////////////////////////

module.exports = router;