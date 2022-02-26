const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

//defining separate schema for images so that we can modify the URL and show a smaller image for our thumbnails using cloudinary transformations
const ImageSchema = new Schema({
    url: String,
    filename: String
})

// https://res.cloudinary.com/dpebp7cag/image/upload/w_150/v1645851461/YelpCamp/n5vcwroclgae5ykml3hv.jpg
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
})

const CampgroundSchema = new Schema({
    title: String,
    image: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Middleware to delete all the reviews related to a given campground
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    // console.log('DELETED!!!') // Step 1: check if the middleware is being called
    // console.log(doc) // Step 2: check what was deleted

    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        })
    }

})

module.exports = mongoose.model('Campground', CampgroundSchema);