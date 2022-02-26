const express = require('express');
const router = express.Router({ mergeParams: true }); // otherwise we'd not have params from campground route (since, that is a different route)
const Review = require('../models/review');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { createReview } = require('../controllers/reviews');

// for adding reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;