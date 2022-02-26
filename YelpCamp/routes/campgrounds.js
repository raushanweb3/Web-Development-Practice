const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary') // it will look for index.js file in cloudinary folder
const upload = multer({ storage });


// const passport = require('passport');
// const ExpressError = require('../utils/ExpressError');

/////////////////////////or this more compact version///////////////////////////////

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

    // .post(upload.array('image'), (req, res) => {
    //     console.log(req.body, req.files);
    //     res.send('it worked!')
    // })

router.get('/new', isLoggedIn, campgrounds.renderNewForm) // for getting to the new campground creation page

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.updateCampground)) // can indent them as well
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)) // for rendering the edit campground

/////////////////////////either use this/////////////////////

// router.get('/', catchAsync(campgrounds.index)) // for getting all campground list page

// router.get('/new', isLoggedIn, campgrounds.renderNewForm) // for getting to the new campground creation page

// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground)) // for posting the form in the new campground creation page

// router.get('/:id', catchAsync(campgrounds.showCampground)) // for viewing one campground

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)) // for rendering the edit campground

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground)) // for taking the inputs from edit campground and updating the database with new data

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)) // for deleting any given data

//////////////////////////////////////////////////////////////

module.exports = router;