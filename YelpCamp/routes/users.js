const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister) // Registration Route
    .post(catchAsync(users.register))

const authenticateConfig = {
    failureFlash: true,
    failureRedirect: '/login'
}

router.route('/login')
    .get(users.renderLogin) // Login Route
    .post(passport.authenticate('local', authenticateConfig), users.login) // Login Route

router.get('/logout', users.logout) // Logout Route

module.exports = router;