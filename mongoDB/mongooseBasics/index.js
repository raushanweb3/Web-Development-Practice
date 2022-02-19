// Always check the docs on https://mongoosejs.com/

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    console.log("Connection Open!!")
    await mongoose.connect('mongodb://localhost:27017/movieApp'); //using moviesApp database
}

// Defining an object Schema

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

// making model using the schema defined

const Movie = mongoose.model('Movie', movieSchema); // model name should start with capital letter and should be singular

// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });

Movie.insertMany([ // don't need to use .save() when using insertMany
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then(data => {
        console.log('It worked');
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })