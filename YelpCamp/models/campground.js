const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
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

    if(doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews}
        })
    }

})

module.exports = mongoose.model('Campground', CampgroundSchema);