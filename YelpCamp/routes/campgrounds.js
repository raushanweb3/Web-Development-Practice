const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas')


// for server side campground form data validation using Joi
const validateCampground = (req, res, next) => {

    const result = campgroundSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.message, 400) //if only a single error.
    } else {
        next();
    }
}



router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

// for getting to the new campground creation page
router.get('/new', catchAsync(async (req, res) => {
    res.render('campgrounds/new');
}))

// for posting the form in the new campground creation page
router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    // const { id } = req.params;
    // const campground = await Campground.findById(id)
    // or shorter
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground })
}))

// for rendering the edit campground
router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

// for taking the inputs from edit campground and updating the database with new data
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}))

// for deleting any given data
router.delete('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id);
    res.redirect(`/campgrounds`)
}))



module.exports = router;