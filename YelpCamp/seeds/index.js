//for seed logic using seeds

const express = require('express');
const cities = require('./cities');
// const imageURLs = require('./imageURLs');
const {places, descriptors} = require('./seedHelpers')
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const Campground = require('../models/campground');

// Mongoose setup
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Creating a sample function that generates a random number less than or equal to the size of array passed into it
const sample = array => array[Math.floor(Math.random() * array.length)];

//getting an image url from unsplash api
const getImage = async () => {
    try {
        const unImage = await axios.get('https://api.unsplash.com/photos/random?client_id=NjHb5CfJSMxnE9MQSFA5WqtZRR8iGva_7lOl01SN_O8&collections=9046579')
        const imageUrl = unImage.data.urls.raw + "&w=1080&dpr=2";
        return imageUrl;
    } catch(err) {
        return `Some error occured:  ${err}`;
    }
}

// // saving image urls in an array
// var imageUrlArray = [];
// //creating an array of "n" image urls. Max api request per hour = 50
// const imgUrls = async () => {
//     const numImages = 2;
//     for (i=0; i< numImages; i++) {
//         imageUrlArray[i] = await getImage();
//     }
//     return imageUrlArray;
// }

// //selecting a random URL from array of n images
// const randomImgUrl = async () => {
//     const random = Math.floor(Math.random() * 2);
//     return imageUrlArray[random];
// }

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<10; i++) {
        const random1000 = Math.floor(Math.random() * 1000 + 1);
        const price = Math.floor(Math.random() * 20 + 1);
        // const randomUrl = Math.floor(Math.random() * 3); // max 10

        const camp = new Campground({
            author: '62176fa53f855959bac257af',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: await getImage(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, dolor iuos, earum numquam perspiciatis error iure hic alias accusantium odit, enim saepe incidunt deleniti provident laboriosam ad aperiam? Magnam veritatis, odio minima voluptas aut unde id. Numquam, dignissimos eaque facere ducimus iure eum, vitae mollitia, eveniet explicabo aut fuga hic?',
            price,
            image: [
                {
                  url: 'https://res.cloudinary.com/dpebp7cag/image/upload/v1645782063/YelpCamp/ayfyh1mzd8bvkcgyj6xx.jpg', 
                  filename: 'YelpCamp/ayfyh1mzd8bvkcgyj6xx'
                },
                {
                  url: 'https://res.cloudinary.com/dpebp7cag/image/upload/v1645782063/YelpCamp/hngcdtkyfumhfbyzkfmt.jpg', 
                  filename: 'YelpCamp/hngcdtkyfumhfbyzkfmt'
                },
                {
                  url: 'https://res.cloudinary.com/dpebp7cag/image/upload/v1645782066/YelpCamp/tmrezip7a0ecwmx900dt.jpg', 
                  filename: 'YelpCamp/tmrezip7a0ecwmx900dt'
                }
              ]
        })
        await camp.save();
    }
}

// connecting to seedDB, updating the model and then closing the connection to seed Database as it is not required once the sample data has been updated
seedDB().then(() => mongoose.connection.close());