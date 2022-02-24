const express = require('express');
const router = express.Router({ mergeParams: true }); // otherwise we'd not have params from campground route (since, that is a different route)
const Review = require('../models/review');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const { validateReview } = require('../middleware');

// for adding reviews
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {

    // Using pull operator to delete a single review inside the entire campground array
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })

    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`)

}))

module.exports = router;