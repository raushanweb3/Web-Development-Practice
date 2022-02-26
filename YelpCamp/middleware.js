//////// defining a middleware to route all routes requiring login ///////

const Campground = require('./models/campground');
const { campgroundSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');
const { reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    // using passport for session
    if (!req.isAuthenticated()) {

        // store the url where the user was trying to go
        req.session.returnTo = req.originalUrl // saving to user session

        req.flash('error', 'Please sign-in to continue!')
        return res.redirect('/login')
    }
    next();
}


// for server side campground form data validation using Joi
module.exports.validateCampground = (req, res, next) => {

    const result = campgroundSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.message, 400) //if only a single error.
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do no have permission to do that!');
        return res.redirect(`/campgrounds/${campground._id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do no have permission to do that!');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

// for server side review form data validation using Joi
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error.message, 400) //if only a single error.
    } else {
        next();
    }
}