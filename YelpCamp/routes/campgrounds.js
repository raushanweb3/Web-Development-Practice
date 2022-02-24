const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const Campground = require('../models/campground');

// const passport = require('passport');
// const ExpressError = require('../utils/ExpressError');

//////////////////////////////////////////////////////////////

router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

// for getting to the new campground creation page
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

// for posting the form in the new campground creation page
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id; // for passing on user details to individual campground
    await campground.save();

    //adding a flash message once the campground has been saved
    req.flash('success', 'Successfully created a new campground!')

    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    // const { id } = req.params;
    // const campground = await Campground.findById(id)
    // or shorter
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/show', { campground }) // adding a flash message to be shown
}))

// for rendering the edit campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground });
}))

// for taking the inputs from edit campground and updating the database with new data
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

// for deleting any given data
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully Deleted Campground!');
    res.redirect(`/campgrounds`)
}))



module.exports = router;