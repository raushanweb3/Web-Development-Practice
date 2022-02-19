const express = require('express');
const router = express.Router({ mergeParams: true }); // otherwise we'd not have params from campground route (since, that is a different route)
const Review = require('../models/review');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas')
const ExpressError = require('../utils/ExpressError');


// for server side review form data validation using Joi
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error.message, 400) //if only a single error.
    } else {
        next();
    }
}

// for adding reviews
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {

    // Using pull operator to delete a single review inside the entire campground array
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)

}))

module.exports = router;